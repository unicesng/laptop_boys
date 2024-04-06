import os
from typing import List
from flask.json import JSONEncoder
from mailjet_rest import Client
from flask import Flask, request
from openai import AzureOpenAI
from dotenv import dotenv_values
import pymongo
import requests
import re
from bs4 import BeautifulSoup
from bson import ObjectId


config = dotenv_values(".env")
    
client = AzureOpenAI(
    api_key=config["AZURE_OPENAI_API_KEY"],  
    api_version="2024-02-01",
    azure_endpoint = config["AZURE_OPENAI_ENDPOINT"]
    )

mailjet = Client(auth=(config["MJ_APIKEY_PUBLIC"], config["MJ_APIKEY_PRIVATE"]), version='v3.1')

app = Flask(__name__)

DEPLOYMENT_NAME='gpt-35-turbo' 
INSTRUCTIONS = open("./src/training_file.txt", "r").read()
FAKE_INPUT_METRICS = open("./src/input_metrics.txt", "r").read()
DEFAULT_COMPANY = "Fast Retailing"
DEFAULT_TODO = "State the name of the standard. Give me suggestions to improve my company's sustainability practices based on my company's ESG report."
IGNORE_IRRELAVANCE = "REMEMBER THIS: IF THE USER ASKS AN IRRELEVANT QUESTION OR SOMETHING THAT IS NOT RELATED TO ESG, YOU MUST REPLY WITH 'Sorry, unknown request.'"

client = pymongo.MongoClient(config["MONGODB_URI"])
db = client["database"]
company_col = db["company"]

@app.route("/email", methods=["POST"])
def send_email():
    
    data = request.get_json()
    email = data.get("email")
    message = data.get("message")
    html_message = f"<h3>{message}</h3>!"
    email_data = {
          'Messages': [
    {
      "From": {
        "Email": "laptop@eggtive.com",
        "Name": "Me"
      },
      "To": [
        {
          "Email": email,
          "Name": "You"
        }
      ],
      "Subject": "My first Mailjet Email!",
      "TextPart": "Greetings from Mailjet!",
      "HTMLPart": html_message
    }
  ]
}
    result = mailjet.send.create(data=email_data)

    if result.status_code == 200:
        return result.json()
    else:
        return {"error": "Failed to send email"}, result.status_code

@app.route("/recommend", methods=["POST"])
def generate_recommendations():
    data = request.get_json()

    company_name = DEFAULT_COMPANY
    input_metrics = FAKE_INPUT_METRICS
    todo = DEFAULT_TODO

    if data.get("company_name"):
        company_name = data.get("company_name")
    if data.get("input_metrics"):
        input_metrics = data.get("input_metrics")
    if data.get("todo"):
        todo = data.get("todo")

    response = client.chat.completions.create(
        model=DEPLOYMENT_NAME,
        messages=[
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": f"My company is called {company_name}. This is my company's ESG report:\n {input_metrics}"},
            {"role": "user", "content": todo},
            {"role": "system", "content": IGNORE_IRRELAVANCE}
        ],
        temperature=0.01,
    )

    return response.choices[0].message.content

@app.route('/findIndustry/<company>', methods=['GET'])
def findIndustry(company):
    # print(company)
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Content-Type": "text/html; charset=utf-8",
    }
    response = requests.get(f'https://sasb.ifrs.org/wp-json/sasb/v1/sicsSearch?s={company}&locale=en-gb&format=html&page=1&limit=10', headers=headers)
    result = response.text
    result = unicode_to_html(result)
    # return result
    soup = BeautifulSoup(result, 'html.parser')
    td_contents = re.findall(r'<td>(.*?)<', result)
    industries = []
    seen = set()
    for i in range(len(td_contents)):
        if i % 6 == 4 and td_contents[i] not in seen:
            industries.append(td_contents[i])
            seen.add(td_contents[i])
    if len(industries) == 0:
        return ""
    return industries[0]

def unicode_to_html(input):
    return re.sub(r'[\u007F-\uFFFF]', lambda character: "&#" + str(ord(character.group())) + ";", input.replace(" ", ""))

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, ObjectId):
            return str(obj)
        return super().default(obj)

app.json_encoder = CustomJSONEncoder
# Define schema
class Metric:
    def __init__(self, name: str, type: str):
        self.name = name
        self.type = type

class Topic:
    def __init__(self, name, metrics: List[Metric]):
        self.name = name
        self.metrics = metrics


# Define schema
class Industry:
    def __init__(self, name: str, topics: List[Topic]):
        self.name = name
        self.topics = topics

# Define schema
class Company:
    def __init__(self, name: str, revenue: int, email: str, location: str, employees: int, industry: Industry):
        self.name = name
        self.revenue = revenue
        self.email = email
        self.location = location
        self.employees = employees
        self.industry = industry

# Insert data into collections
@app.route('/company', methods=['POST'])
def insert_company():
    data = request.get_json()
    company = Company(data.get("name"), data.get("revenue"), data.get("employees"), data.get("industry"))
    company_col.insert_one(company.__dict__)
    return {"message": "Company inserted successfully"}


@app.route('/company/<id>', methods=['GET'])
def get_company(id):
    company = company_col.find_one({"_id": ObjectId(id)})
    if company is not None:
        return {"company": company}
    else:
        return {"error": "Company not found"}, 404







if __name__ == "__main__":
    app.run(debug=True)
