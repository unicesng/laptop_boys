from json import JSONEncoder
import os
from typing import List
from mailjet_rest import Client
from flask import Flask, request, jsonify
from openai import AzureOpenAI
from dotenv import dotenv_values
import pymongo
import requests
import re
from flask_cors import CORS
from bs4 import BeautifulSoup
from bson import ObjectId


config = dotenv_values(".env")
    
openAiClient = AzureOpenAI(
    api_key=config["AZURE_OPENAI_API_KEY"],  
    api_version="2024-02-01",
    azure_endpoint = config["AZURE_OPENAI_ENDPOINT"]
    )

mailjet = Client(auth=(config["MJ_APIKEY_PUBLIC"], config["MJ_APIKEY_PRIVATE"]), version='v3.1')

app = Flask(__name__)
CORS(app)

DEPLOYMENT_NAME='gpt-35-turbo' 
INSTRUCTIONS = open("./src/training_file.txt", "r").read()
FAKE_INPUT_METRICS = open("./src/input_metrics.txt", "r").read()
DEFAULT_COMPANY = "Fast Retailing"
DEFAULT_TODO = "State the name of the company and the standard. Give me suggestions to improve my company's sustainability practices based on my company's ESG report. I want you to split the segments of your answer into a JSON format like this: {company, standard, recommend:{standardDisclosureTopic:{category, description}}, overall}"
DEFAULT_FEEDBACK = "State the name of the company and the standard. Give me feedback for my company's ESG performance. Break it down based on the Sustainability Disclosure Topics & Metrics from the Standards. On top of the description, include a [CATEGORY] next to the name of the topic, where CATEGORY can be 'BAD', 'OK', 'GOOD'. I want you to split the segments of your answer into a JSON format like this: {company, standard, feedback:{standardDisclosureTopic:{category, description}}, overall}."
IGNORE_IRRELAVANCE = "REMEMBER THIS: IF THE USER ASKS AN IRRELEVANT QUESTION OR SOMETHING THAT IS NOT RELATED TO ESG, YOU MUST REPLY WITH 'Sorry, unknown request.'"

client = pymongo.MongoClient(config["MONGODB_URI"], tls=True, tlsAllowInvalidCertificates=True)
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

    response = openAiClient.chat.completions.create(
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

@app.route("/feedback", methods=["POST"])
def generate_feedback():
    data = request.get_json()

    company_name = DEFAULT_COMPANY
    input_metrics = FAKE_INPUT_METRICS
    todo = DEFAULT_FEEDBACK

    if data.get("company_name"):
        company_name = data.get("company_name")
    if data.get("input_metrics"):
        input_metrics = data.get("input_metrics")
    if data.get("todo"):
        todo = data.get("todo")

    response = openAiClient.chat.completions.create(
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
    return industries[0].replace('&amp;', " & ")

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
    def to_dict(self):
        return {
            "name": self.name,
            "type": self.type
        }

class Topic:
    def __init__(self, name, metrics: List[Metric]):
        self.name = name
        self.metrics = metrics
    def to_dict(self):
        return {
            "name": self.name,
            "metrics": [metric.to_dict() for metric in self.metrics]
        }

class Standard:
    def __init__(self, name: str, topics: List[Topic]):
        self.name = name
        self.topics = topics
    def to_dict(self):
        return {
            "name": self.name,
            "topics": [topic.to_dict() for topic in self.topics]
        }

# Define schema
class Industry:
    def __init__(self, name: str, standards: List[Standard]):
        self.name = name
        self.standards = standards

INDUSTRY_DATA = {
    "Electric Utilities & Power Generators": {
        "standards": [
            Standard(
                name="SASB",
                topics=[
                    Topic(
                        name="Greenhouse Gas Emissions & Energy Resource Planning",
                        metrics=[
                            Metric(name="(1) Gross global Scope 1 emissions, percentage covered under (2) emissions limiting regulations and (3) emissions reporting regulations", type="Quantitative"),
                            Metric(name="Greenhouse gas (GHG) emissions associated with power deliveries", type="Quantitative"),
                            Metric(name="Discussion of long- and short-term strategy or plan to manage Scope 1 emissions, emissions reduction targets, and an analysis of performance against those targets", type="Discussion and Analysis"),
                        ]
                    ),
                    Topic(
                        name="Air Quality",
                        metrics=[
                            Metric(name="Air emissions of the following pollutants: (1) NOx (excluding N2O), (2) SOx, (3) particulate matter (PM10), (4) lead (Pb), and (5) mercury (Hg); percentage of each in or near areas of dense population",type="Quantitative"),
                            Metric(name="Number of incidents of non-compliance associated with air quality permits, standards and regulations", type="Quantitative"),
                            Metric(name="Description of air quality risks and discussion of strategies and practices to mitigate those risks", type="Discussion and Analysis")
                        ]
                    ),
                    Topic(
                        name="Water Management",
                        metrics=[
                            Metric(name="(1) Total water withdrawn, (2) total water consumed; percentage of each in regions with High or Extremely High Baseline Water Stress", type="Quantitative"),
                            Metric(name="Number of incidents of non-compliance associated with water quality permits, standards and regulations", type="Quantitative"),
                            Metric(name="Description of water management risks and discussion of strategies and practices to mitigate those risks", type="Discussion and Analysis")
                        ]
                    )
                ]
            )
        ]
    },
    "Apparel, Accessories & Footwear": {
        "standards": [
            Standard(
                name="SASB",
                topics=[
                    Topic(
                        name="Management of Chemicals in Products",
                        metrics=[
                            Metric(name="Discussion of processes to maintain compliance with restricted substances regulations", type="Discussion and Analysis"),
                            Metric(name="Discussion of processes to assess and manage risks or hazards associated with chemicals in products", type="Discussion and Analysis"),
                        ]
                    ),
                    Topic(
                        name="Environmental  Impacts in the the Supply Chain",
                        metrics=[
                            Metric(name="Percentage of (1) Tier 1 supplier facilities and (2) supplier facilities beyond Tier 1 that have completed the Sustainable Apparel Coalition’s Higg Facility Environmental Module (Higg FEM) assessment or an equivalent environmental data assessment", type="Quantitative"),
                            Metric(name="Percentage of (1) Tier 1 supplier facilities and (2) supplier facilities beyond Tier 1 that have been audited to a labour code of conduct, (3) percentage of total audits conducted by a third-party auditor", type="Quantitative"),
                            Metric(name="(1) Priority non-conformance rate and (2) associated corrective action rate for suppliers’ labour code of conduct audits", type="Quantitative"),
                            Metric(name="Description of the greatest (1) labour and (2) environmental, health and safety risks in the supply chain", type="Discussion and Analysis"),
                            Metric(name="List of priority raw materials; for each priority raw material: (2) environmental or social factor(s) most likely to threaten sourcing, (3) discussion on business risks or opportunities associated with environmental or social factors and (4) management strategy for addressing business risks and opportunities", type="Discussion and Analysis"),
                            Metric(name="(1) Amount of priority raw materials purchased, by material, and (2) amount of each priority raw material that is certified to a third-party environmental or social standard, by standard", type="Quantitative")
                        ]
                    ),
                    Topic(
                        name="Labour  Conditions in  the Supply  Chain",
                        metrics=[
                            Metric(name="Percentage of products that have an environmental or social impact assessment at each stage of the product lifecycle", type="Quantitative"),
                            Metric(name="Discussion of the greatest environmental or social risks in the product lifecycle", type="Discussion and Analysis"),
                            Metric(name="Description of the business risks or opportunities associated with environmental or social factors in the product lifecycle and the management strategy for addressing business risks and opportunities", type="Discussion and Analysis")
                        ]
                    ),
                    Topic(
                        name="Raw Material Sourcing",
                        metrics=[
                            Metric(name="List of priority raw materials; for each priority raw material: (2) environmental or social factor(s) most likely to threaten sourcing, (3) discussion on business risks or opportunities associated with environmental or social factors and (4) management strategy for addressing business risks and opportunities", type="Discussion and Analysis"),
                            Metric(name="(1) Amount of priority raw materials purchased, by material, and (2) amount of each priority raw material that is certified to a third-party environmental or social standard, by standard", type="Quantitative")
                        ]
                    )
                ]
            )
        ]
    }
}

# Define schema
class CompanyBuilder:
    def __init__(self):
        self.company = Company()

    def with_name(self, name: str):
        self.company.name = name
        return self

    def with_email(self, email: str):
        self.company.email = email
        return self

    def with_location(self, location: str):
        self.company.location = location
        return self

    def with_employees(self, employees: int):
        self.company.employees = employees
        return self

    def with_revenue(self, revenue: int):
        self.company.revenue = revenue
        return self

    def with_industry(self, industry: Industry):
        self.company.industry = industry
        return self

    def build(self):
        return self.company


class Company:
    def __init__(self):
        self.name = None
        self.email = None
        self.location = None
        self.employees = None
        self.revenue = None
        self.industry = None

# Insert data into collections
@app.route('/company', methods=['POST'])
def insert_company():
    data = request.get_json()
    print(data)
    company_name = data.get("name")
    revenue = data.get("revenue")
    employees = data.get("employees")
    email = data.get("email")
    industry_name = data.get("industry").get("name")
    industry_data = INDUSTRY_DATA.get(industry_name, {})
    industry_data = {key: [standard.to_dict() for standard in standards] for key, standards in industry_data.items()}

    location = data.get("location")
    company = (CompanyBuilder()
           .with_name(company_name)
           .with_email(email)
           .with_location(location)
           .with_employees(employees)
           .with_revenue(revenue)
           .with_industry(industry_data)
           .build())
    company_col.insert_one(company.__dict__)
    
    return {"message": "Company inserted successfully"}


@app.route('/company/<id>', methods=['GET'])
def get_company(id):
    company = company_col.find_one({"_id": ObjectId(id)})
    if company is not None:
        company['_id'] = str(company['_id'])
        return {"company": company}
    else:
        return {"error": "Company not found"}, 404







if __name__ == "__main__":
    app.run(debug=True)
