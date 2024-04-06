import os
from openai import AzureOpenAI
from dotenv import dotenv_values
config = dotenv_values(".env")
    
client = AzureOpenAI(
    api_key=config["AZURE_OPENAI_API_KEY"],  
    api_version="2024-02-01",
    azure_endpoint = config["AZURE_OPENAI_ENDPOINT"]
    )

    
deployment_name='gpt-35-turbo' 

instructions = open("./src/chatgpt/training_file.txt", "r").read()
input_metrics = open("./src/chatgpt/input_metrics.txt", "r").read()

# For all possible arguments see https://platform.openai.com/docs/api-reference/chat-completions/create
response = client.chat.completions.create(
    model=deployment_name,
    messages=[
        {"role": "system", "content": instructions},
        {"role": "user", "content": "My company is called Fast Retailing."},
        {"role": "user", "content": input_metrics},
        {"role": "user", "content": "Give me suggestions to improve my company's sustainbility practices"}
    ],
    temperature=0,
)

print(f"{response.choices[0].message.role}: {response.choices[0].message.content}")
