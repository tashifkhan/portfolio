import React from "react";

type Link = {
  name: string;
  hash?: string;
};

export const links: Link[] = [
  {
    name: "Home",
    hash: "#",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Education",
    hash: "#education",
  },
  {
    name: "Recognistions",
    hash: "#por",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
];
