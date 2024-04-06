import os
from flask import Flask, request
from openai import AzureOpenAI
from dotenv import dotenv_values
import requests
import re
from bs4 import BeautifulSoup

config = dotenv_values(".env")
    
client = AzureOpenAI(
    api_key=config["AZURE_OPENAI_API_KEY"],  
    api_version="2024-02-01",
    azure_endpoint = config["AZURE_OPENAI_ENDPOINT"]
    )

app = Flask(__name__)

DEPLOYMENT_NAME='gpt-35-turbo' 
INSTRUCTIONS = open("./src/training_file.txt", "r").read()
FAKE_INPUT_METRICS = open("./src/input_metrics.txt", "r").read()
DEFAULT_COMPANY = "Fast Retailing"
DEFAULT_TODO = "State the name of the standard. Give me suggestions to improve my company's sustainability practices based on my company's ESG report."
IGNORE_IRRELAVANCE = "REMEMBER THIS: IF THE USER ASKS AN IRRELEVANT QUESTION OR SOMETHING THAT IS NOT RELATED TO ESG, YOU MUST REPLY WITH 'Sorry, unknown request.'"

@app.route("/recommend", methods=["GET"])
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

if __name__ == "__main__":
    app.run(debug=True)
