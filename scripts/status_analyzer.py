from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from get_projects import Response
import dotenv
import os

dotenv.load_dotenv()

status_sys_prompt = """
You are a project status analysis expert.

Goal  
Analyze a GitHub repository and determine its project status based on the content,
README, commit activity, and overall state. Classify the project into one of three
categories and return only a single character:

Categories:
- "c" = Completed: Project is finished, stable, and ready for use
- "w" = Work in Progress: Project is actively being developed
- "p" = Planned: Project is in early stages or planning phase

Analysis criteria:
- Look for completion indicators: deployment links, comprehensive documentation, 
  stable version tags, "complete" or "finished" mentions
- Look for WIP indicators: TODO sections, "under development", recent commits,
  incomplete features, development branches
- Look for planning indicators: minimal code, mostly documentation, 
  "coming soon", concept descriptions, early prototypes

Source data analysis:
- title: Project name and any status indicators
- live_website_url: If present and working, likely completed
- languages: More languages might indicate more development
- num_commits: Higher commits suggest active/completed development
- readme: Primary source for status determination

Return only one character: "c", "w", or "p"
No explanations, no additional text, just the single character.
"""

status_template = ChatPromptTemplate.from_messages(
    [
        ("system", status_sys_prompt),
        ("human", "Analyze the project status for this repository: {repo_data}"),
    ]
)

google_api_key = os.getenv("GOOGLE_API_KEY")

model = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    temperature=0.1,
    google_api_key=google_api_key,
)


def gen_project_status(repo_data: Response):
    json_repo_data = repo_data.model_dump_json()

    chain = status_template | model
    res = chain.invoke({"repo_data": json_repo_data})

    print(f"Status analysis result: {res.content}")

    # Extract single character status
    status = res.content.strip().lower()
    if status not in ["c", "w", "p"]:
        # Default to 'w' if response is unclear
        status = "w"

    # Add status field to repo_data
    if hasattr(repo_data, "status"):
        repo_data.status = status
    else:
        # If status field doesn't exist, add it as a dynamic attribute
        setattr(repo_data, "status", status)

    return repo_data


if __name__ == "__main__":
    # Test with completed project
    completed_project = Response.model_validate(
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
            "readme": """# AI Resume Analyzer & Job Matching Platform

## Live Demo
[Check out the live platform here!](https://ai-resume-parser.vercel.app/)

## Features
- Complete AI-powered resume analysis
- Live deployment available
- Comprehensive documentation
- Full tech stack implementation

## Getting Started
Complete installation and setup instructions provided.
""",
        }
    )

    print("=== Testing Completed Project ===")
    completed_res = gen_project_status(completed_project)
    print(f"Status: {getattr(completed_res, 'status', 'Not found')}")

    # Test with work in progress project
    wip_project = Response.model_validate(
        {
            "title": "My-Development-App",
            "live_website_url": None,
            "languages": ["JavaScript", "React"],
            "num_commits": 45,
            "readme": """# My Development App

## Current Status
This project is currently under development.

## TODO
- [ ] Add authentication system
- [ ] Implement user dashboard
- [ ] Add payment integration
- [ ] Write comprehensive tests
- [ ] Deploy to production

## Recent Updates
- Added user registration
- Implemented basic routing
- Working on database integration

Still working on core features and functionality.
""",
        }
    )

    print("\n=== Testing Work in Progress Project ===")
    wip_res = gen_project_status(wip_project)
    print(f"Status: {getattr(wip_res, 'status', 'Not found')}")

    # Test with planned project
    planned_project = Response.model_validate(
        {
            "title": "Future-Project-Concept",
            "live_website_url": None,
            "languages": [],
            "num_commits": 2,
            "readme": """# Future Project Concept

## Overview
This repository contains the initial concept and planning for a future project.

## Planned Features
- Will include mobile app development
- Planning to use React Native
- Considering Firebase for backend
- Might add AI integration

## Status
Currently in planning phase. Coming soon!

## Ideas
- User authentication
- Real-time notifications
- Data visualization
- Cross-platform compatibility

Implementation will begin once planning is complete.
""",
        }
    )

    print("\n=== Testing Planned Project ===")
    planned_res = gen_project_status(planned_project)
    print(f"Status: {getattr(planned_res, 'status', 'Not found')}")
