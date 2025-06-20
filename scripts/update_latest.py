#!/usr/bin/env python3
"""
Mini version of main.py that processes the latest N projects and adds them to MongoDB via API.
Usage: python update_latest.py <number_of_projects>
"""

import sys
import json
import time
import requests
import os
from typing import Dict, Any, List
from get_projects import get_projects, Response
from discription_generator import gen_desc
from status_analyzer import gen_project_status
from tech_extractor import gen_tech_stack


def convert_status_to_readable(status: str) -> str:
    """Convert single character status to readable format"""
    status_map = {"c": "Completed", "w": "Work in Progress", "p": "Planned"}
    return status_map.get(status, "Work in Progress")


def create_project_json(repo_data: Response, position: int) -> Dict[str, Any]:
    """Convert Response object to the required JSON format for MongoDB"""
    return {
        "position": position,
        "title": repo_data.title,
        "description": repo_data.description or "",
        "technologies": repo_data.languages or [],
        "githubLink": f"https://github.com/tashifkhan/{repo_data.title}",
        "liveLink": repo_data.live_website_url or "",
        "status": convert_status_to_readable(repo_data.status or "w"),
    }


def process_project_with_ai(project: Response, retry_delay: int = 60) -> Response:
    """Process a single project with AI functions and retry logic"""
    print(f"  - Generating description...")
    try:
        project = gen_desc(project)
    except Exception as desc_error:
        print(f"    Description generation failed: {str(desc_error)}")
        if "ResourceExhausted" in str(desc_error) or "429" in str(desc_error):
            print(f"    Rate limit hit, waiting {retry_delay} seconds...")
            time.sleep(retry_delay)
            try:
                project = gen_desc(project)
            except Exception:
                print("    Retry failed, using original description")

    print(f"  - Analyzing project status...")
    try:
        project = gen_project_status(project)
    except Exception as status_error:
        print(f"    Status analysis failed: {str(status_error)}")
        if "ResourceExhausted" in str(status_error) or "429" in str(status_error):
            print(f"    Rate limit hit, waiting {retry_delay} seconds...")
            time.sleep(retry_delay)
            try:
                project = gen_project_status(project)
            except Exception:
                print("    Retry failed, using default status")
                project.status = "w"  # Default to work in progress

    print(f"  - Extracting tech stack...")
    try:
        project = gen_tech_stack(project)
    except Exception as tech_error:
        print(f"    Tech stack extraction failed: {str(tech_error)}")
        if "ResourceExhausted" in str(tech_error) or "429" in str(tech_error):
            print(f"    Rate limit hit, waiting {retry_delay} seconds...")
            time.sleep(retry_delay)
            try:
                project = gen_tech_stack(project)
            except Exception:
                print("    Retry failed, using original languages")

    return project


def add_project_to_mongodb(project_data: Dict[str, Any], api_base_url: str) -> bool:
    """Add a single project to MongoDB via the API"""
    try:
        # You'll need to set up authentication token if required
        # For now, assuming the API endpoint accepts direct POST
        headers = {
            "Content-Type": "application/json",
            # Add authentication headers if needed:
            # 'Authorization': f'Bearer {os.getenv("API_TOKEN")}'
        }

        response = requests.post(
            f"{api_base_url}/api/projects",
            json=project_data,
            headers=headers,
            timeout=30,
        )

        if response.status_code == 201:
            print(f"    ✅ Successfully added '{project_data['title']}' to MongoDB")
            return True
        elif response.status_code == 401:
            print(f"    ❌ Authentication failed. Check API credentials.")
            return False
        else:
            print(
                f"    ❌ Failed to add '{project_data['title']}' to MongoDB. Status: {response.status_code}"
            )
            print(f"    Response: {response.text}")
            return False

    except requests.exceptions.RequestException as e:
        print(f"    ❌ Network error adding '{project_data['title']}': {str(e)}")
        return False
    except Exception as e:
        print(f"    ❌ Unexpected error adding '{project_data['title']}': {str(e)}")
        return False


def process_latest_projects(
    num_projects: int, api_base_url: str = "portfolio.tashifc.codes"
) -> None:
    """Fetch and process the latest N projects, then add them to MongoDB"""
    print(f"🚀 Fetching latest {num_projects} projects from GitHub...")

    try:
        all_projects = get_projects("tashifkhan")

        if not all_projects:
            print("❌ No projects found!")
            return

        # Get the latest N projects (assuming they're already sorted by recency)
        latest_projects = all_projects[:num_projects]

        print(
            f"📦 Found {len(all_projects)} total projects. Processing latest {len(latest_projects)}..."
        )

        processed_count = 0
        failed_count = 0

        for i, project in enumerate(latest_projects):
            print(
                f"\n📝 Processing project {i+1}/{len(latest_projects)}: {project.title}"
            )

            try:
                # Process project with AI
                processed_project = process_project_with_ai(project)

                # Convert to required format
                project_json = create_project_json(processed_project, i)

                # Add to MongoDB via API
                print(f"  - Adding to MongoDB...")
                success = add_project_to_mongodb(project_json, api_base_url)

                if success:
                    processed_count += 1
                else:
                    failed_count += 1

                # Add delay between projects to avoid rate limits
                if i < len(latest_projects) - 1:
                    print(f"  - Waiting 5 seconds before next project...")
                    time.sleep(5)

            except Exception as e:
                print(f"  ❌ Error processing {project.title}: {str(e)}")
                failed_count += 1
                continue

        print(f"\n🎉 Processing complete!")
        print(f"✅ Successfully processed: {processed_count}")
        print(f"❌ Failed: {failed_count}")
        print(f"📊 Total: {processed_count + failed_count}")

    except Exception as e:
        print(f"❌ Critical error: {str(e)}")
        sys.exit(1)


def main():
    """Main function to handle command line arguments"""
    if len(sys.argv) != 2:
        print("Usage: python update_latest.py <number_of_projects>")
        print("Example: python update_latest.py 5")
        sys.exit(1)

    try:
        num_projects = int(sys.argv[1])
        if num_projects <= 0:
            print("❌ Number of projects must be greater than 0")
            sys.exit(1)
    except ValueError:
        print("❌ Please provide a valid number")
        sys.exit(1)

    # You can override the API base URL with environment variable
    api_base_url = os.getenv("API_BASE_URL", "portfolio.tashifc.codes")

    print(f"🎯 Target: Process latest {num_projects} projects")
    print(f"🔗 API Base URL: {api_base_url}")

    process_latest_projects(num_projects, api_base_url)


if __name__ == "__main__":
    main()
