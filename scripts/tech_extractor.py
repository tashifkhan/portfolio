from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from get_projects import Response
import dotenv
import os

dotenv.load_dotenv()

tech_sys_prompt = """
You are a technology extraction expert.

Goal
Extract all technologies, frameworks, libraries, languages, databases, and tools 
mentioned in the repository README content. Return them as a single comma-separated 
string with no additional formatting.

Technologies include:
- Programming languages (Python, JavaScript, TypeScript, Java, etc.)
- Frameworks (React, Next.js, FastAPI, Django, Express, etc.)
- Libraries (scikit-learn, pandas, numpy, Chart.js, etc.)
- Databases (PostgreSQL, MongoDB, Redis, etc.)
- Tools and platforms (Docker, AWS, Git, etc.)
- CSS frameworks (Tailwind CSS, Bootstrap, etc.)

Rules:
- Return only a comma-separated list of technology names
- Use standard technology names (e.g., "PostgreSQL" not "postgres")
- No version numbers (e.g., "Python" not "Python 3.9")
- No duplicates
- No explanations or additional text
- If no technologies found, return empty string

Example output: "Python, FastAPI, PostgreSQL, React, Next.js, Docker, AWS"
"""

tech_template = ChatPromptTemplate.from_messages(
    [
        ("system", tech_sys_prompt),
        ("human", "Extract technologies from this repository data: {repo_data}"),
    ]
)

google_api_key = os.getenv("GOOGLE_API_KEY")

model = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.1,
    google_api_key=google_api_key,
)


def gen_tech_stack(repo_data: Response):
    json_repo_data = repo_data.model_dump_json()

    chain = tech_template | model
    res = chain.invoke({"repo_data": json_repo_data})

    print(res.content)

    # Parse comma-separated string into list
    tech_string = res.content.strip()
    if tech_string:
        technologies = [tech.strip() for tech in tech_string.split(",") if tech.strip()]
        languages = repo_data.languages + technologies

        seen = set()
        unique_technologies = []
        for tech in languages:
            if tech.lower() not in seen:
                unique_technologies.append(tech)
                seen.add(tech.lower())
        repo_data.languages = unique_technologies

    return repo_data


if __name__ == "__main__":
    example_repo_data = Response.model_validate(
        {
            "title": "AI-Resume-Parser",
            "live_website_url": "https://ai-resume-parser.vercel.app",
            "languages": [
                "TypeScript",
                "Python",
                "Jupyter Notebook",
                "Dockerfile",
                "CSS",
                "JavaScript",
            ],
            "num_commits": 172,
            "readme": '# AI Resume Analyzer & Job Matching Platform\n\n<div align="center">\n  <img src="./frontend/public/banner-dark.svg" alt="Project Logo" width="150"/>\n</div>\n\n<p align="center">\n  <strong>Connecting talent to opportunity, intelligently.</strong>\n</p>\n\n<p align="center">\n  <a href="#introduction">Introduction</a> \u2022\n  <a href="#key-features">Key Features</a> \u2022\n  <a href="#live-demo">Live Demo</a> \u2022\n  <a href="#tech-stack">Tech Stack</a> \u2022\n  <a href="#getting-started">Getting Started</a> \u2022\n</p>\n\n---\n\n## Introduction\n\nIn today\'s competitive job market, the hiring process is broken for everyone. Recruiters are inundated with an average of **49 applications per job**, making manual screening impossible. Meanwhile, job seekers face the "ATS black box," where **93% of employers** use systems that often reject qualified candidates based on simple formatting.\n\nThis project is an AI-powered, dual-sided platform designed to solve this problem. It provides job seekers with powerful tools for resume analysis and career path prediction, while simultaneously offering employers a curated dashboard of perfectly matched, pre-vetted talent. We transform a chaotic process into an intelligent and efficient ecosystem.\n\n## Key Features\n\n### For Job Seekers (Empowering Your Career)\n\n- **AI-Powered Resume Analysis:** Get instant, actionable feedback on your resume to optimize it for both Applicant Tracking Systems (ATS) and human recruiters.\n- **Career Path Prediction:** Our machine learning models analyze your skills and experience to predict the job fields where you\'ll be most successful.\n- **Multi-Format & Bulk Upload:** Upload a single PDF, TXT, or even a **ZIP file** containing multiple resumes\u2014perfect for managing different versions.\n- **Unlimited & Free Access:** Our core analysis tools are free and unlimited to ensure every job seeker has the resources to succeed.\n\n### For Employers (Streamlining Your Hiring)\n\n- **Intuitive Talent Dashboard:** Access a centralized dashboard of pre-analyzed and ranked candidates, turning a pile of resumes into a prioritized shortlist.\n- **Efficient Bulk Processing:** Save countless hours by uploading hundreds of resumes at once via a single ZIP file. Our system handles the unpacking, parsing, and analysis automatically.\n- **Reduced Time-to-Hire:** Quickly identify the most relevant, high-quality talent to drastically shorten your recruitment cycle and improve the quality of hires.\n\n## Live Demo\n\n[Check out the live platform here!](https://ai-resume-parser.vercel.app/)\n\n<!--  will add a ss here\n<a href="#" target="_blank">\n  <img src=".github/screenshot-dashboard.png" alt="Application Screenshot" />\n</a>\n-->\n\n## Technical Architecture\n\nOur platform is built on a modern, scalable microservices architecture to ensure high performance, security, and maintainability.\n\n<div align="center">\n  <img src="./frontend/public/flowchat.svg" alt="Architecture Diagram" width="800"/>\n</div>\n\n- **Frontend:** A responsive and interactive web application built with **Next.js** and **Tailwind CSS**, providing a seamless user experience.\n- **Backend:** A high-performance API built with **FastAPI (Python)** handles business logic, user authentication, and data processing.\n- **AI/ML Service:** A dedicated microservice orchestrates our AI pipeline using **LangChain**. It leverages **NLP** models (like spaCy) for information extraction, **Machine Learning** models (Scikit-learn) for prediction, and **Generative AI** for nuanced analysis.\n- **Database:** A robust **PostgreSQL** database securely stores all user data, extracted resume information, and predictions.\n- **Deployment:** The entire application is containerized using **Docker** and deployed on a cloud platform like AWS for scalability and reliability.\n\n## Tech Stack\n\n- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion, Chart.js\n- **Backend & Database:** Python, FastAPI, PostgreSQL, SQLAlchemy\n- **AI/ML:** scikit-learn, spaCy, LangChain\n- **Deployment:** Docker, AWS\n\n## Getting Started\n\nTo get a local copy up and running, follow these simple steps.\n\n### Prerequisites\n\nMake sure you have the following installed on your system:\n\n- [Git](https://git-scm.com/)\n- [Python 3.9+](https://www.python.org/downloads/)\n- [bun.sh](https://bun.sh/)\n- [PostgreSQL](https://www.postgresql.org/download/)\n- [Docker Desktop (adviced for better DX)]()\n\n### Installation & Setup\n\n1.  **Clone the repository:**\n\n    ```sh\n    git clone https://github.com/harleenkaur28/AI-Resume-Parser.git\n    cd AI-Resume-Parser\n    ```\n\n2.  **Setup the Backend (FastAPI):**\n\n    ```sh\n    # Navigate to the backend directory\n    cd backend\n\n    # Create and activate a virtual environment\n    python -m venv .venv\n    source .venv/bin/activate  # On Windows, use `venv\\Scripts\\activate`\n\n    # Install dependencies\n    pip install .\n\n    # Create a .env file from the example\n    cp .env.example .env\n    ```\n\n    Now, open the `.env` file and add your PostgreSQL database URL and other environment variables.\n\n3.  **Setup the Frontend (Next.js):**\n\n    ```sh\n    # Navigate to the frontend directory from the root\n    cd frontend\n\n    # Install dependencies\n    npm install\n    ```\n\n### Running the Application\n\n1.  **Start the Backend Server:**\n    From the `/backend` directory, with your virtual environment activated:\n\n    ```sh\n    uvicorn app.main:app --reload\n    ```\n\n    The backend API will be running on `http://127.0.0.1:8000`.\n\n2.  **Start the Frontend Development Server:**\n    From the `/frontend` directory:\n    ```sh\n    npm run dev\n    ```\n    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.\n\n## Team & Acknowledgments\n\nThis project was proudly developed by:\n\n- **Harleen Kaur** - ([GitHub](https://github.com/harleenkaur28)) - Lead, Machine Learning, Backend Development\n- **Tashif Ahmad Khan** - ([GitHub](https://github.com/tashifkhan)) - Full-Stack Development, Designer\n',
        }
    )
    res = gen_tech_stack(example_repo_data)
    print(res.model_dump_json(indent=2))
