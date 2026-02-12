from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from groq import Groq

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL = "llama-3.3-70b-versatile"


def clean_json(text):
    return text.replace("```json", "").replace("```", "").strip()


# ---------------- SALES PITCH ----------------
@app.route("/api/pitch", methods=["POST"])
def generate_pitch():
    try:
        data = request.json

        prompt = f"""
Create a high-converting sales pitch in STRICT JSON format.

Product: {data.get('product')}
Persona: {data.get('persona')}
Industry: {data.get('industry')}
Company Size: {data.get('companySize')}
Budget: {data.get('budget')}

Return ONLY JSON:
{{
  "pitch30s": "",
  "valueProp": "",
  "differentiators": [],
  "painPoints": [],
  "cta": "",
  "emailTemplate": "",
  "linkedinTemplate": ""
}}
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        return jsonify({"result": clean_json(response.choices[0].message.content)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- CAMPAIGN ----------------
@app.route("/api/campaign", methods=["POST"])
def generate_campaign():
    try:
        data = request.json

        prompt = f"""
Create a detailed marketing campaign in STRICT JSON format.

Product: {data.get('product')}
Audience: {data.get('audience')}
Platform: {data.get('platform')}
Budget: {data.get('budget')}
Goal: {data.get('goal')}

Return ONLY JSON:
{{
  "objectives": [],
  "strategy": "",
  "contentIdeas": [],
  "adCopies": [],
  "ctaSuggestions": [],
  "estimatedROI": ""
}}
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8
        )

        return jsonify({"result": clean_json(response.choices[0].message.content)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- LEAD SCORING ----------------
@app.route("/api/lead", methods=["POST"])
def score_lead():
    try:
        data = request.json

        prompt = f"""
Evaluate this lead using BANT framework.

Name: {data.get('name')}
Budget: {data.get('budget')}
Need: {data.get('need')}
Urgency: {data.get('urgency')}
Authority: {data.get('authority')}

Return ONLY JSON:
{{
  "score": 0,
  "category": "",
  "reasoning": "",
  "probability": ""
}}
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.5
        )

        return jsonify({"result": clean_json(response.choices[0].message.content)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- PERSONA ----------------
@app.route("/api/persona", methods=["POST"])
def generate_persona():
    try:
        data = request.json

        prompt = f"""
Generate a detailed customer persona in STRICT JSON format.

Product: {data.get('product')}

Return ONLY JSON:
{{
  "name": "",
  "demographics": "",
  "behavior": "",
  "painPoints": "",
  "triggers": "",
  "platforms": []
}}
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8
        )

        return jsonify({"result": clean_json(response.choices[0].message.content)})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- MARKET TRENDS ----------------
@app.route("/api/trends", methods=["POST"])
def generate_trends():
    try:
        data = request.json

        prompt = f"""
Provide latest marketing trends in the {data.get('industry')} industry.

Include:
- Emerging strategies
- Consumer behavior shifts
- Platform growth insights
- Actionable recommendations

Use markdown formatting.
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.9
        )

        return jsonify({"result": response.choices[0].message.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- CHATBOT ----------------
@app.route("/api/chatbot", methods=["POST"])
def chatbot():
    try:
        data = request.json
        message = data.get("message")

        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": "You are an expert Marketing & Sales AI consultant."},
                {"role": "user", "content": message}
            ],
            temperature=0.7
        )

        return jsonify({"result": response.choices[0].message.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- PRODUCT VISION ----------------
@app.route("/api/vision", methods=["POST"])
def generate_vision():
    try:
        data = request.json

        prompt = f"""
You are a senior product strategist.

Create a comprehensive product vision document.

Product: {data.get('product')}
Target Market: {data.get('market')}
Core Value Proposition: {data.get('value')}

Include:
- Vision Statement
- Market Positioning
- Unique Differentiators
- Growth Strategy
- Competitive Advantage
- 3 Year Roadmap

Return structured markdown.
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8
        )

        return jsonify({"result": response.choices[0].message.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- IMAGE ANALYSIS ----------------
@app.route("/api/image", methods=["POST"])
def analyze_image():
    try:
        prompt = """
You are a visual marketing strategist.

Analyze the product image and describe:

1. Visual aesthetics
2. Target audience appeal
3. Brand positioning
4. Suggested social media strategy
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.8
        )

        return jsonify({"result": response.choices[0].message.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ---------------- IMAGE GENERATION ----------------
@app.route("/api/generate-image", methods=["POST"])
def generate_image():
    try:
        data = request.json

        prompt = f"""
Create a detailed AI image generation prompt for:

{data.get('prompt')}

Include:
- Lighting
- Camera angle
- Mood
- Color palette
- Commercial appeal
"""

        response = client.chat.completions.create(
            model=MODEL,
            messages=[{"role": "user", "content": prompt}],
            temperature=0.9
        )

        return jsonify({"image": response.choices[0].message.content})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)
