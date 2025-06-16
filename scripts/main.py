import json
import os
import time
from typing import Dict, Any
from get_projects import get_projects, Response
from discription_generator import gen_desc
from status_analyzer import gen_project_status
from tech_extractor import gen_tech_stack


def convert_status_to_readable(status: str) -> str:
    """Convert single character status to readable format"""
    status_map = {"c": "Completed", "w": "Work in Progress", "p": "Planned"}
    return status_map.get(status, "Work in Progress")


def create_project_json(repo_data: Response, location: int) -> Dict[str, Any]:
    """Convert Response object to the required JSON format"""
    return {
        "location": location,
        "title": repo_data.title,
        "description": repo_data.description or "",
        "technologies": repo_data.languages or [],
        "githubLink": f"https://github.com/tashifkhan/{repo_data.title}",
        "liveLink": repo_data.live_website_url or "",
        "status": convert_status_to_readable(repo_data.status or "w"),
    }


def process_all_projects():
    """Fetch all projects and process them with AI functions"""
    print("Fetching projects from GitHub...")
    projects = get_projects("tashifkhan")

    print(f"Found {len(projects)} projects. Processing...")

    # Create data directory if it doesn't exist
    os.makedirs("./data", exist_ok=True)

    processed_projects = []

    for i, project in enumerate(projects):
        print(f"\nProcessing project {i+1}/{len(projects)}: {project.title}")

        try:
            # Generate description using AI with retry logic
            print("  - Generating description...")
            try:
                project = gen_desc(project)
            except Exception as desc_error:
                print(f"    Description generation failed: {str(desc_error)}")
                if "ResourceExhausted" in str(desc_error) or "429" in str(desc_error):
                    print("    Rate limit hit, waiting 60 seconds...")
                    time.sleep(60)
                    try:
                        project = gen_desc(project)
                    except Exception:
                        print("    Retry failed, using original description")

            # Analyze project status with retry logic
            print("  - Analyzing project status...")
            try:
                project = gen_project_status(project)
            except Exception as status_error:
                print(f"    Status analysis failed: {str(status_error)}")
                if "ResourceExhausted" in str(status_error) or "429" in str(
                    status_error
                ):
                    print("    Rate limit hit, waiting 60 seconds...")
                    time.sleep(60)
                    try:
                        project = gen_project_status(project)
                    except Exception:
                        print("    Retry failed, using default status")
                        project.status = "w"  # Default to work in progress

            # Extract tech stack with retry logic
            print("  - Extracting tech stack...")
            try:
                project = gen_tech_stack(project)
            except Exception as tech_error:
                print(f"    Tech stack extraction failed: {str(tech_error)}")
                if "ResourceExhausted" in str(tech_error) or "429" in str(tech_error):
                    print("    Rate limit hit, waiting 60 seconds...")
                    time.sleep(60)
                    try:
                        project = gen_tech_stack(project)
                    except Exception:
                        print("    Retry failed, using original languages")

            # Convert to required format
            project_json = create_project_json(project, i)
            processed_projects.append(project_json)

            # Save individual project JSON file in data directory
            filename = f"{project.title.replace(' ', '_').replace('-', '_')}.json"
            # Remove any invalid characters for filename
            filename = "".join(c for c in filename if c.isalnum() or c in ("_", "."))
            filepath = os.path.join("./data", filename)

            with open(filepath, "w", encoding="utf-8") as f:
                json.dump(project_json, f, indent=2, ensure_ascii=False)

            print(f"  - Saved to {filepath}")

            # Add a small delay between projects to avoid hitting rate limits
            print("  - Waiting 5 seconds before next project...")
            time.sleep(5)

        except Exception as e:
            print(f"  - Error processing {project.title}: {str(e)}")
            # Create basic entry even if processing fails
            project_json = create_project_json(project, i)
            processed_projects.append(project_json)

    # Save all projects in one file in data directory
    all_projects_path = os.path.join("./data", "all_projects.json")
    with open(all_projects_path, "w", encoding="utf-8") as f:
        json.dump(processed_projects, f, indent=2, ensure_ascii=False)

    print(
        f"\n✅ Processing complete! Generated {len(processed_projects)} project files."
    )
    print(f"📄 All projects saved to '{all_projects_path}'")

    return processed_projects


if __name__ == "__main__":
    process_all_projects()
