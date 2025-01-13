import axios from "axios"

export type Project = {
   id: number
   title: string
   description: string
   technologies: string[]
   githubLink: string
   liveLink?: string
   playStoreLink?: string
   status: "Completed" | "In Progress" | "Planned"
}

const BASE_URL = ""

const getOtherProjects = async (): Promise<Project[]> => {
   try {
      const response = await axios.get(`${BASE_URL}/api/projects`, {
         timeout: 5000,
         headers: {
            "Accept": "application/json"
         }
      })
      return response.data.slice(3)
   } catch (error) {
      console.error("Failed to fetch projects:", error)
      return []
   }
}

const getProjects = async (): Promise<Project[]> => {
    try {
        const response = await axios.get(`${BASE_URL}/api/projects`, {
            timeout: 5000,
            headers: {
                "Accept": "application/json"
            }
        })
        return response.data
    } catch (error) {
        console.error("Failed to fetch projects:", error)
        return []
    }
}

export {getOtherProjects,  getProjects}