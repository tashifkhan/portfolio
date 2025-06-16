import React from "react";
import {
	TbHome2,
	TbBrandCodepen,
	TbBulb,
	TbSchool,
	TbAward,
	TbMail,
} from "react-icons/tb";

interface Link {
	name: string;
	hash?: string;
	icon?: React.ReactElement;
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
		name: "Recognistions",
		hash: "/#por",
		icon: <TbAward />,
	},
	{
		name: "Contact",
		hash: "/#contact",
		icon: <TbMail />,
	},
];
