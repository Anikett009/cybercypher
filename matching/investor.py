import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
import os
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Set API Key
PILOTERR_API_KEY = os.getenv("Piloterr_API_KEY")
PILOTERR_BASE_URL = "https://piloterr.com/api/v2/crunchbase"

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

def get_relevant_funding(text_input):
    """Get relevant Crunchbase funding based on text input"""
    url = f"{PILOTERR_BASE_URL}/funding_rounds"
    headers = {
        "Content-Type": "application/json",
        "x-api-key": PILOTERR_API_KEY
    }
    params = {
        "query": text_input,
        "days_since_announcement": 30,
        "investment_type": "seed"
    }

    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        return {"error": str(e)}

@app.route('/api/investors', methods=['POST'])
def fetch_investors():
    data = request.json
    text_input = data.get("query")
    
    if not text_input:
        return jsonify({"error": "Query parameter is required"}), 400

    funding_data = get_relevant_funding(text_input)
    return jsonify(funding_data)

if __name__ == "__main__":
    app.run(debug=True)
