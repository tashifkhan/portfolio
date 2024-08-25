"use client";

import React, { use } from "react";
import { Cursor, useTypewriter } from "react-simple-typewriter";

type Props = {};

function Hero({}: Props) {
	const [text, count] = useTypewriter({
		words: [
			"I'm Khan Tashif",
			"I'm a Full Stack Developer",
			"I'm a UI/UX Designer",
			"I'm a Web Developer",
		],
		loop: true,
		deleteSpeed: 50,
		typeSpeed: 100,
		delaySpeed: 2000,
	});
	return (
		<>
			<span> Hello, {text}</span>
			<Cursor cursorColor="#F7ABBA" />
		</>
	);
}

export default Hero;
