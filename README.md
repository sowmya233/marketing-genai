# MarketAI Suite – AI-Powered Sales & Marketing Platform

## Overview

MarketAI Suite is an AI-powered sales and marketing platform that leverages Groq's LLaMA 3.3 70B model to generate marketing campaigns, create personalized sales pitches, and perform intelligent lead qualification. The platform helps businesses make data-driven marketing and sales decisions through fast and accurate AI-powered analysis.

---

## Features

* AI-Generated Marketing Campaigns
* Personalized Sales Pitch Generation
* Intelligent Lead Qualification & Scoring
* Real-Time AI Responses using Groq API
* Modern Responsive User Interface
* Actionable Business Insights

---

## Technology Stack

### Backend

* Python
* Flask
* Groq API
* Requests

### Frontend

* HTML
* CSS
* JavaScript

### AI Model

* LLaMA 3.3 70B via Groq API

---

## Project Modules

### Marketing Campaign Generator

Generates complete marketing strategies including campaign objectives, content ideas, ad copies, and call-to-action recommendations based on product and audience details.

### Sales Pitch Generator

Creates personalized sales pitches including elevator pitches, value propositions, differentiators, and strategic call-to-actions tailored to customer personas.

### Lead Qualification & Scoring

Analyzes lead information such as budget, need, urgency, and authority to generate lead scores, conversion probability, and qualification reasoning.

---

## Installation

### Clone Repository

```bash
git clone https://github.com/sowmya233/marketing-genai.git
cd MarketAI-Suite
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Configure Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

### Run Application

```bash
python app.py
```

Open:

```text
http://localhost:5000
```

---

## Project Workflow

1. User selects a feature.
2. Input data is collected through the web interface.
3. Flask backend processes the request.
4. Prompt is generated dynamically.
5. Groq API processes the prompt using LLaMA 3.3 70B.
6. AI-generated results are returned.
7. Results are displayed in the dashboard.

---

## Applications

* Digital Marketing
* Sales Automation
* Lead Prioritization
* Campaign Planning
* Business Intelligence
* CRM Enhancement

---

## Future Enhancements

* CRM Integration
* PDF/Word Export
* Multi-User Support
* Analytics Dashboard
* Email Campaign Automation
* Advanced Lead Prediction Models

---


---

## License

This project is developed for educational and academic purposes.
