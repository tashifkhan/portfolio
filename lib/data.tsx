import React from "react";
import { HiHome } from "react-icons/hi"
import { BsProjector } from "react-icons/bs"
import { GiSkills } from "react-icons/gi"
import { LuGraduationCap } from "react-icons/lu"
import { GoTrophy } from "react-icons/go"
import { MdOutlineContactMail } from "react-icons/md"


interface Link {
   name: string
   hash?: string
   icon?: React.ReactElement 
}

export const links: Link[] = [
  {
    name: "Home",
    hash: "/",
    icon: <HiHome />
  },
  {
    name: "Projects",
    hash: "/#projects",
    icon: <BsProjector />
  },
  {
    name: "Skills",
    hash: "/#skills",
    icon: <GiSkills />
  },
  {
    name: "Education",
    hash: "/#education",
    icon: <LuGraduationCap />
  },
  {
    name: "Recognistions",
    hash: "/#por",
    icon: <GoTrophy />
  },
  {
    name: "Contact",
    hash: "/#contact",
    icon: <MdOutlineContactMail />
  }
]
