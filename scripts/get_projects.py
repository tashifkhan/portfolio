import json
from typing import Dict, Any, List
from pydantic import BaseModel
import requests
import base64


class Response(BaseModel):
    title: str
    description: str
    live_website_url: str
    languages: List[str]
    num_commits: int
    readme: str


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

    ress = json.dumps(
        projects,
        indent=2,
    )

    print(ress)


if __name__ == "__main__":

    get_projects("tashifkhan")
