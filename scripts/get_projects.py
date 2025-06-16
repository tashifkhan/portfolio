import json
from typing import List, Optional
from pydantic import BaseModel
import requests
import base64


class Response(BaseModel):
    title: str
    description: Optional[str] = None
    live_website_url: Optional[str] = None
    languages: Optional[List[str]] = []
    num_commits: int
    readme: Optional[str] = None
    status: Optional[str] = (
        None  # "c" = completed, "w" = work in progress, "p" = planned
    )


def get_projects(github_username: str) -> List[Response]:
    res = requests.get(f"https://github-stats.tashif.codes/{github_username}/repos")

    if res.status_code != 200:
        raise Exception(
            f"Failed to fetch projects for {github_username}. Status code: {res.status_code}"
        )

    projects = res.json()

    for project in projects:
        if "readme" in project and project["readme"] is not None:
            try:
                project["readme"] = base64.b64decode(project["readme"]).decode("utf-8")
            except Exception:
                project["readme"] = ""

    # Convert to Response objects
    response_objects = []
    for project in projects:
        response_obj = Response(
            title=project.get("title", "Unknown Project"),
            description=project.get("description"),
            live_website_url=project.get("live_website_url"),
            languages=project.get("languages", []),
            num_commits=project.get("num_commits", 0),
            readme=project.get("readme"),
            status=project.get("status"),
        )
        response_objects.append(response_obj)

    return response_objects


if __name__ == "__main__":

    get_projects("tashifkhan")
