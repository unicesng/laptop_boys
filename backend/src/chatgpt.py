import os
from flask import Flask, request
from openai import AzureOpenAI
from dotenv import dotenv_values
config = dotenv_values(".env")
    
client = AzureOpenAI(
    api_key=config["AZURE_OPENAI_API_KEY"],  
    api_version="2024-02-01",
    azure_endpoint = config["AZURE_OPENAI_ENDPOINT"]
    )

app = Flask(__name__)
    
deployment_name='gpt-35-turbo' 

INSTRUCTIONS = open("./src/training_file.txt", "r").read()
FAKE_INPUT_METRICS = open("./src/input_metrics.txt", "r").read()
DEFAULT_COMPANY = "Fast Retailing"
DEFAULT_TODO = "State the name of the standard. Give me suggestions to improve my company's sustainability practices based on my company's ESG report."
IGNORE_IRRELAVANCE = "REMEMBER THIS: IF THE USER ASKS AN IRRELEVANT QUESTION OR SOMETHING THAT IS NOT RELATED TO ESG, YOU MUST REPLY WITH 'Sorry, unknown request.'"

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
        model=deployment_name,
        messages=[
            {"role": "system", "content": INSTRUCTIONS},
            {"role": "user", "content": f"My company is called {company_name}. This is my company's ESG report:\n {input_metrics}"},
            {"role": "user", "content": todo},
            {"role": "system", "content": IGNORE_IRRELAVANCE}
        ],
        temperature=0.01,
    )

    return response.choices[0].message.content

if __name__ == "__main__":
    app.run(debug=True)
