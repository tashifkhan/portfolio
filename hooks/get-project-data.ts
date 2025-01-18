import axios from "axios"
import { featuredProjects } from "@/lib/fallback-featured-project-data"
import { projectCollection } from "@/lib/fallback-project-data"


export type Project = {
   _id?: string // or number
   position: number
   title: string
   description: string
   technologies: string[]
   githubLink?: string
   liveLink?: string
   playStoreLink?: string
   status: "Completed" | "In Progress" | "Planned"
}

interface FeaturedProject {
   _id: string;
   title: string;
   imageLink: string;
   description: React.ReactNode;
   technologies: string[];
   githubLink?: string;
   liveLink?: string;
   playstoreLink?: string;
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
      return projectCollection.slice(3)
   }
}

const getFeaturedProjects = async () =>{
   try {
      const response = await axios.get(`${BASE_URL}/api/notable-projects`, {
         timeout: 5000,
         headers: {
            "Accept": "application/json"
         }
      })
      return response.data
   } catch (error) {
      console.error("Failed to fetch projects:", error)
      return featuredProjects
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
      
      if (!response.data || !Array.isArray(response.data)) {
         console.warn("Invalid data format received from API")
         return projectCollection
      }
      
      return response.data
   } catch (error) {
      console.error("Failed to fetch projects:", error)
      return projectCollection
   }
}

export {getOtherProjects,  getProjects, getFeaturedProjects}