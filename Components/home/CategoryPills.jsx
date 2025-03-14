"use client"

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Main category tabs at the top
const MainCategoryTabs = ({ activeMainCategory, setActiveMainCategory }) => {
  const categories = [
    {
      id: "game",
      label: "Game",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
    },
    {
      id: "sports",
      label: "Sports",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex justify-center space-x-2 sm:space-x-4 py-4 sm:py-6 px-2">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`
            flex items-center px-3 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base text-white font-medium transition-all duration-300
            ${
              activeMainCategory === category.id
                ? "bg-green-500 text-white"
                : "bg-transparent border border-green-500 text-green-500 hover:bg-green-500/10"
            }
          `}
          onClick={() => setActiveMainCategory(category.id)}
        >
          {category.icon}
          {category.label}
          <ChevronRight className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      ))}
    </div>
  );
};

// Sub-category pills with auto-scrolling
const CategoryPills = ({ activeCategory, setActiveCategory }) => {
  const categories = [
    "Esports",
    "Gaming",
    "Football",
    "Basketball",
    "Racing",
    "Tennis",
    "Tournaments",
    "Live Events",
    "Streaming",
    "Entertainment",
  ];

  const scrollContainerRef = useRef(null);
  const [autoScrollActive, setAutoScrollActive] = useState(true);
  const [scrollDirection, setScrollDirection] = useState("right");
  const [isHovering, setIsHovering] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check if scrolling arrows should be visible
  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Show left arrow if scrolled to right
    setShowLeftArrow(container.scrollLeft > 10);
    
    // Show right arrow if there's content to scroll to
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  // Manual scroll function for arrow buttons
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      // Smaller scroll amount on mobile
      const baseScrollAmount = window.innerWidth < 640 ? 120 : 200;
      const scrollAmount = direction === "left" ? -baseScrollAmount : baseScrollAmount;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });

      // Pause auto-scroll for a moment when manually scrolling
      setAutoScrollActive(false);
      setTimeout(() => {
        setAutoScrollActive(true);
        checkScrollPosition();
      }, 5000);
    }
  };

  // Auto-scrolling logic
  useEffect(() => {
    if (!autoScrollActive || isHovering) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const autoScrollInterval = setInterval(() => {
      // Check if we need to change direction
      if (
        scrollDirection === "right" &&
        container.scrollLeft >=
          container.scrollWidth - container.clientWidth - 10
      ) {
        setScrollDirection("left");
        checkScrollPosition();
      } else if (scrollDirection === "left" && container.scrollLeft <= 10) {
        setScrollDirection("right");
        checkScrollPosition();
      }

      // Perform the scroll
      const scrollAmount = scrollDirection === "left" ? -2 : 2;
      container.scrollLeft += scrollAmount;
    }, 30);

    return () => clearInterval(autoScrollInterval);
  }, [autoScrollActive, scrollDirection, isHovering]);

  // Add scroll event listener to update arrow visibility
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    container.addEventListener('scroll', checkScrollPosition);
    // Initial check
    checkScrollPosition();
    
    return () => {
      container.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  return (
    <div className="relative max-w-full sm:max-w-screen-xl mx-auto py-2 sm:py-4 px-2 sm:px-4">
      <div className="flex items-center">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-black border border-green-500/30 text-white hover:bg-green-500/20 z-10 mr-1 sm:mr-3 flex-shrink-0"
            aria-label="Scroll left"
          >
            <ChevronLeft size={16} className="sm:size-18" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto scroll-smooth gap-2 sm:gap-3 py-1 sm:py-2 mx-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onTouchStart={() => setIsHovering(true)}
          onTouchEnd={() => {
            setIsHovering(false);
            setTimeout(() => checkScrollPosition(), 100);
          }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`whitespace-nowrap px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium 
            transition-all ${
              activeCategory === category
                ? "bg-green-500 text-white"
                : "bg-transparent border border-green-500/40 text-white hover:border-green-500"
            }`}
              onClick={() => {
                setActiveCategory(category);
                setAutoScrollActive(false);
                setTimeout(() => {
                  setAutoScrollActive(true);
                  checkScrollPosition();
                }, 5000);
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-black border border-green-500/30 text-white hover:bg-green-500/20 z-10 ml-1 sm:ml-3 flex-shrink-0"
            aria-label="Scroll right"
          >
            <ChevronRight size={16} className="sm:size-18" />
          </button>
        )}
      </div>
    </div>
  );
};

// Full component that combines both category UI elements
const GameCategories = () => {
  const [activeMainCategory, setActiveMainCategory] = useState("game");
  const [activeCategory, setActiveCategory] = useState("Gaming");

  return (
    <div className="w-full bg-black text-white">
      <MainCategoryTabs
        activeMainCategory={activeMainCategory}
        setActiveMainCategory={setActiveMainCategory}
      />
      <CategoryPills
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </div>
  );
};

export default GameCategories;