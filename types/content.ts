export type Project = {
    _id?: string
    position: number  // Changed from location to match existing hooks
    title: string
    description: string
    technologies: string[]
    status: "Completed" | "In Progress" | "Planned"
    githubLink?: string
    liveLink?: string
    playstoreLink?: string
    createdAt: Date
    updatedAt: Date
}

export type NotableProject = {
    _id?: string;
    title: string;
    imageLink: string;
    description: React.ReactNode;
    technologies: string[];
    githubLink?: string;
    liveLink?: string;
    playstoreLink?: string;
}

export type Education = {
    _id?: string
    title: string // e.g., "B.Tech (ECE)", "CBSE XII"
    institution: string
    score: string // e.g., "CGPA: 7.3", "94.6%"
    duration: string // e.g., "Sept 2022 - June 2026", "2022"
    createdAt?: Date
    updatedAt?: Date
}

export type Responsibility = {
    _id?: string
    title: string
    organization: string
    duration: string
    type: "treasurer" | "executive" | "secretary" | "mentor"
    createdAt?: Date
    updatedAt?: Date
}

export type BaseSkill = {
    _id?: string
    name: string
    createdAt?: Date
    updatedAt?: Date
}

export type ProgrammingLanguage = BaseSkill & {
    type: "language"
    icon: string
}

export type Framework = BaseSkill & {
    type: "framework"
    description: string
}

export type Tool = BaseSkill & {
    type: "tool"
    icon: string
    description: string
}

export type SoftSkill = BaseSkill & {
    type: "softSkill"
    icon: string
    category: "Soft Skills" | "Other Avocations"
}

export type Skill = ProgrammingLanguage | Framework | Tool | SoftSkill
export type CollageData = Education | Responsibility
export type Socials = {
    _id?: string
    InstaID: string
    LeetCodeID: string
    GithubID: string
    LinkedInID: string
    TwitterID: string
    ResumeLink: string
    createdAt?: Date
    updatedAt?: Date
}
