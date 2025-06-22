import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export const useSwipeTabs = (initialTab: string = "overview", hasGithubLink: boolean = false) => {
	const [currentTab, setCurrentTab] = useState<string>(initialTab);

	const handleSwipeLeft = () => {
		const tabs = ["overview", "tech", "readme"];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex < tabs.length - 1) {
			const nextTab = tabs[currentIndex + 1];
			// Only allow navigation to README tab if githubLink exists
			if (nextTab === "readme" && !hasGithubLink) {
				return;
			}
			setCurrentTab(nextTab);
		}
	};

	const handleSwipeRight = () => {
		const tabs = ["overview", "tech", "readme"];
		const currentIndex = tabs.indexOf(currentTab);
		if (currentIndex > 0) {
			setCurrentTab(tabs[currentIndex - 1]);
		}
	};

	const swipeHandlers = useSwipeable({
		onSwipedLeft: handleSwipeLeft,
		onSwipedRight: handleSwipeRight,
		delta: 50, // Minimum swipe distance
		swipeDuration: 500, // Maximum swipe duration
	});

	return {
		currentTab,
		setCurrentTab,
		swipeHandlers,
	};
}; 