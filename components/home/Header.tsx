"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { links } from "../../lib/navbar-data";
import DesktopNav from "./DesktopNav";
import MobileTopBar from "./MobileTopBar";
import MobileMenu from "./MobileMenu";
import MobileBottomNav from "./MobileBottomNav";
import LoginModal from "./LoginModal";

function Header() {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState("");
	const [isScrolled, setIsScrolled] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
	const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);

	useEffect(() => {
		// Check authentication status
		checkAuthStatus();

		const handleScrollForStyling = () => {
			setIsScrolled(window.scrollY > 50);
		};

		const handleScrollForActiveSection = () => {
			if (pathname !== "/") return;

			const sections = links
				.map((link) => link.hash?.replace("#", ""))
				.filter(Boolean) as string[];

			for (const section of sections) {
				const element = document.getElementById(section);
				if (!element) continue;

				const rect = element.getBoundingClientRect();
				if (rect.top <= 150 && rect.bottom >= 100) {
					setActiveSection("#" + section);
					return;
				}
			}
		};

		handleScrollForStyling();
		handleScrollForActiveSection();

		window.addEventListener("scroll", handleScrollForStyling);
		window.addEventListener("scroll", handleScrollForActiveSection);

		return () => {
			window.removeEventListener("scroll", handleScrollForStyling);
			window.removeEventListener("scroll", handleScrollForActiveSection);
		};
	}, [pathname]);

	const checkAuthStatus = async () => {
		try {
			const response = await fetch("/api/auth/check");
			const data = await response.json();
			setIsAuthenticated(data.authenticated);
		} catch (error) {
			setIsAuthenticated(false);
		}
	};

	const handleLoginSuccess = () => {
		setShowLoginModal(false);
		setIsAuthenticated(true);
	};

	const handleLogout = async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			setIsAuthenticated(false);
		} catch (error) {
			console.error("Logout error:", error);
		}
	};

	return (
		<header className="z-[999] relative">
			<DesktopNav
				activeSection={activeSection}
				hoveredDropdown={hoveredDropdown}
				clickedDropdown={clickedDropdown}
				setHoveredDropdown={setHoveredDropdown}
				setClickedDropdown={setClickedDropdown}
				isScrolled={isScrolled}
				isAuthenticated={isAuthenticated}
				setShowLoginModal={setShowLoginModal}
				handleLogout={handleLogout}
			/>

			<MobileTopBar
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
			/>

			<MobileMenu
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
				activeSection={activeSection}
				clickedDropdown={clickedDropdown}
				setClickedDropdown={setClickedDropdown}
				isAuthenticated={isAuthenticated}
				handleLogout={handleLogout}
				setShowLoginModal={setShowLoginModal}
			/>

			<MobileBottomNav
				activeSection={activeSection}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
			/>

			<LoginModal
				showLoginModal={showLoginModal}
				setShowLoginModal={setShowLoginModal}
				handleLoginSuccess={handleLoginSuccess}
			/>
		</header>
	);
}

export default Header;
