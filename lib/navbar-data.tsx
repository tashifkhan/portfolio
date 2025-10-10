import React from "react";
import {
	TbHome2,
	TbBrandCodepen,
	TbBriefcase,
	TbBulb,
	TbSchool,
	TbAward,
	TbArticle,
	TbMail,
} from "react-icons/tb";

interface SubLink {
	name: string;
	hash: string;
	icon?: React.ReactElement;
}

interface Link {
	name: string;
	hash?: string;
	icon?: React.ReactElement;
	subLinks?: SubLink[];
}

export const links: Link[] = [
	{
		name: "Home",
		hash: "/#hero",
		icon: <TbHome2 />,
	},
	{
		name: "Projects",
		hash: "/#projects",
		icon: <TbBrandCodepen />,
	},
	{
		name: "Blog",
		hash: "/#blog",
		icon: <TbArticle />,
	},
	{
		name: "About Me",
		hash: "/#about",
		icon: <TbBriefcase />,
		subLinks: [
			{
				name: "Experience",
				hash: "/#experience",
				icon: <TbBriefcase />,
			},
			{
				name: "Skills",
				hash: "/#skills",
				icon: <TbBulb />,
			},
			{
				name: "Education",
				hash: "/#education",
				icon: <TbSchool />,
			},
			{
				name: "Recognitions",
				hash: "/#recognitions",
				icon: <TbAward />,
			},
		],
	},
	{
		name: "Contact",
		hash: "/#contact",
		icon: <TbMail />,
	},
];
