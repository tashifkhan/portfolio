interface ProjectCollection {
	position: number;
	title: string;
	description: string;
	technologies: string[];
	githubLink?: string;
	liveLink?: string;
	playStoreLink?: string;
	status: "Completed" | "In Progress" | "Planned";
}


const projectCollection: ProjectCollection[] = [
	{
		position: 1,
		title: "Crop Mate",
		description: "AI-powered crop management system",
		technologies: ["Next.js", "TypeScript", "Flask", "scikit-learn", "Gen AI"],
		githubLink: "https://github.com/tashifkhan/crop-mate",
		liveLink: "https://crop-mate.tashif.codes/",
		status: "Completed",
	},
	{
		position: 2,
		title: "BiasDetector",
		description:
			"Next.js app in TypeScript for detecting bias in news articles through automated analysis and insights. Implements a web scraping pipeline to collect news articles, stores data in MongoDB, and uses the XgBoost ML model to identify patterns of bias. Features a sleek, intuitive frontend for easy access to results.",
		technologies: ["Next.js", "TypeScript", "MongoDB", "Flask", "Python"],
		githubLink:
			"https://github.com/tashifkhan/Left-Right-News-Classifier-Extension",
		liveLink: "https://bias-detector.tashif.codes/",
		status: "Completed",
	},
	{
		position: 3,
		title: "Designique",
		description:
			"A Next.js / React app that connects designers, manufacturers, and consumers. Features a full-fledged e-commerce portal, anonymous chatting between manufacturers and designers using Socket.IO (with safeguards against sharing personal data), and a support chatbot powered by Gemini's Gen AI API for resolving customer queries.",
		technologies: [
			"React",
			"Next.js",
			"Node.js",
			"MongoDB",
			"JWT",
			"WebRTC",
			"Gen AI",
		],
		githubLink: "https://github.com/tashifkhan/Designique-rideHack24",
		liveLink: "https://designique.tashif.codes/",
		status: "Completed",
	},
	{
		position: 4,
		title: "Crypto Website \n( kalkiyug.in )",
		description: "A website for a crypto company",
		technologies: ["React", "Next.js", "TypeScript", "Node.js", "framer-motion"],
		githubLink: "https://github.com/tashifkhan/CrpytoThingy-website",
		liveLink: "https://kalkiyug.in",
		status: "Completed",
	},
	{
		position: 22,
		title: "JIIT Time Table Simplified (3.5k+ users)",
		description: "A React + Python (Pyoide) WASM app that shows you your timetable you can download it add to your calender directly",
		technologies: ["Python", "Pyoide", "WASM", "Redix(re)", "Google Calender API", "React", "TypeScript"],
		githubLink: "https://github.com/tashifkhan/JIIT-time-table-website",
		liveLink: "https://simple-timetable.tashif.codes/",
		status: "Completed"
	},
	{
		position: 15,
		title: "JIIT Time Table Parser",
		description: "A Python program to show you your timetable from the entire list as well as profrssor's time table",
		technologies: ["Python", "JWT", "Flask", "Redix(re)", "Google Calender API"],
		githubLink: "https://github.com/tashifkhan/JIIT-time-table-parser",
		liveLink: "https://jiit-timetable.tashif.codes/",
		status: "Completed"
	},
	{
		position: 5,
		title: "AI Resume Parser ( microSAAS )",
		description: "A microSAAS platform that organizes resumes and extracts crutial data for the employer and recommends the best candidate for the job openning. As well as recommends the best job profile as per the resume. to the job seeker.",
		technologies: ["Next.js", "TypeScript", "Flask", "JWT", "MongoDB", "streamlit (prototype)"],
		githubLink:"https://github.com/tashifkhan/AI-Resume-Parser",
		status: "In Progress", 
	},
	{
		position: 6,
		title: "Waste Wise",
		description: "A React WebApp, React Native App and a Flask API for waste management and recycling. It takes the user's location and image of the waste and it classifies it into different categories of waste and gives the user the nearest recycling center. and also gives the user instrctions on how to recycle the waste. As well as yt video tutorials. Also a reward system for the user. (social media integration as well as a leaderboard)",
		technologies: ["React", "React Native", "Flask", "JWT", "MongoDB", "GenAI"],
		githubLink: "https://github.com/tashifkhan/waste-wise",
		status: "In Progress",
	},
	{
		position: 9,
		title: "Sophos Auto Login",
		description: "A python script that logs in to the sophos firewall and logs out after a certain time. It uses the selenium library to automate the login and logout process",
		technologies: ["Python", "Automation", "SQLite3"],
		githubLink: "https://github.com/tashifkhan/sophos-auto-login",
		status: "Completed",
	},
	{
		position: 7,
		title: "Paisa Split",
		description: "A React Native App for spliting bills and expenses among friends and family. It uses the user's contacts and the user can add the expenses and the app will split the expenses among the users",
		technologies: ["React Native", "TypeScript", "Node.js", "MongoDB"],
		githubLink: "https://github.com/tashifkhan/PaisaSplit",
		status: "Planned",
	},
	{
		position: 8,
		title: "Paisa Manager",
		description: "A React Native App for managing the user's expenses and income. It uses the user's bank account and the user can add the expenses. The app will categorize the expenses and give the user a detailed report of the expenses and income.",
		technologies: ["React Native", "TypeScript", "Node.js", "SQLlite3"],
		playStoreLink: "/",
		githubLink: "/",
		status: "Planned",
	},
	{
		position: 16,
		title: "WhatsApp Bulk Messaging",
		description: "A Flask-React Local WebApp to bulk message people on whatsapp using a CSV file or custom lsit",
		technologies: ["React", "Flask", "Selenium", "SQLite3", "React Native Desktop"],
		githubLink: "https://github.com/tashifkhan/whatsapp-bulk-messaging-system",
		status: "In Progress"
	},
	{
		position: 10,
		title: "Sophos Auto Login ( Mobile App )",
		description: "A React Native App for the sophos auto login. The user can set the time for the login and logout and the app will automatically login and logout the user from the sophos firewall",
		technologies: ["React Native", "TypeScript", "Node.js", "SQLite3"],
		githubLink: "https://github.com/tashifkhan/sophos-autologin-mobile",
		playStoreLink: "/",
		status: "In Progress",
	},
	{
		position: 11,
		title: "To Do List CLI",
		description: "A CLI tool for managing the user's to-do list.",
		technologies: ["C++","DSA"],
		githubLink: "https://github.com/tashifkhan/todo-cli-cpp-dsa",
		status: "Completed",
	},
	{
		position: 12,
		title: "SplitWise CLI",
		description: "A CLI tool for managing the user's expenses and splitting the bills among friends and family.",
		technologies: ["C++","DSA (Graphs, MST)"],
		githubLink: "https://github.com/tashifkhan/splitwise-cpp-ds-Graphs",
		status: "Completed",
	},
	{
		position: 13,
		title: "Rock Paper Scissors CLI",
		description: "A CLI tool for playing rock paper scissors with the computer & other players",
		technologies: ["Python"],
		githubLink: "https://github.com/tashifkhan/Rock-Paper-S-python",
		status: "Completed",
	},
	{
		position: 14,
		title: "JIIT Buddy 2.0",
		description: "A React Native App Wrapper for JIIT WebPortal",
		technologies: ["React Native", "TypeScript", "Redux ToolKit", "Python Automation (Selenium)", "ASync Storage"],
		githubLink: "https://github.com/tashifkhan/jiit-buddy-2.0",
		playStoreLink: "/",
		status: "In Progress"
	},
	{
		position: 17,
		title: "Snake Game",
		description: "The Classic Snake Game in Python",
		technologies: ["Python", "PyGames", "OOP"],
		githubLink: "https://github.com/tashifkhan/snake-game-python",
		status: "Completed"
	},
	{
		position: 18,
		title: "Password Manager CLI",
		description: "A CLI tool for managing the user's passwords",
		technologies: ["Python"],
		githubLink: "https://github.com/tashifkhan/password-manager-cli",
		status: "Completed"
	},
	{
		position: 19,
		title: "Bank Management System",
		description: "A C program for managing the bank accounts",
		technologies: ["C"],
		githubLink: "https://github.com/tashifkhan/password-manager-cli",
		status: "Completed"
	},
	{
		position: 20,
		title: "Quip Quest",
		description: "A Next.js app which is a combination of Scrible.io and Pysch",
		technologies: ["React", "Next.js", "TypeScript", "Socket.io", "JWT", "MongoDB"],
		githubLink: "https://github.com/tashifkhan/QuipQuest",
		status: "In Progress"
	},
	{
		position: 21,
		title: "Solar Helper",
		description: "A Next.js app for solar panel installation and maintenance",
		technologies: ["React", "Next.js", "TypeScript", "Node.js", "MongoDB"],
		githubLink: "https://github.com/tashifkhan/SolarHelper",
		status: "Planned"
	}
];

export { projectCollection };
