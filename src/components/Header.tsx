import React, { useState, useRef, useEffect } from "react";
import { CategoryType } from "../types";
import { ChevronDown } from "lucide-react";

interface HeaderProps {
  activeCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onGoHome: () => void;
  onOpenSearch: () => void;
  onOpenSubscribe?: () => void;
  onOpenAccount?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  onGoHome,
  onOpenSearch,
  onOpenAccount
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 7 primary categories visible in main menu
  const primaryCategories: CategoryType[] = [
    "For You",
    "International",
    "National",
    "Sports",
    "Politics",
    "Tech",
    "Science"
  ];

  const dropdownCategories: CategoryType[] = [
    "Auto",
    "Videos",
    "Polls"
  ];

  const isDropdownActive = dropdownCategories.includes(activeCategory);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-[#e2e2e2] sticky top-0 z-50 shadow-md">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        <div className="flex items-center gap-6 lg:gap-10">
          <button 
            onClick={onGoHome}
            className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tighter text-[#1a1c1c] hover:opacity-90 transition-opacity text-left cursor-pointer"
          >
            Kinetic Ledger
          </button>

          {/* Desktop Tab Menu: 7 Primary Categories + Dropdown */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5">
            {primaryCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`text-[12px] tracking-wider font-bold uppercase transition-colors cursor-pointer py-1 whitespace-nowrap ${
                    isActive
                      ? "text-[#bc000b] border-b-2 border-[#bc000b]"
                      : "text-[#5f5e5e] hover:text-[#bc000b]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}

            {/* Dropdown Menu for remaining categories */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`text-[12px] tracking-wider font-bold uppercase transition-colors cursor-pointer py-1 flex items-center gap-1.5 whitespace-nowrap px-2 rounded-md ${
                  isDropdownActive
                    ? "text-[#bc000b] bg-[#fff5f5] border-b-2 border-[#bc000b]"
                    : "text-[#5f5e5e] hover:text-[#1a1c1c] hover:bg-[#f5f5f5]"
                }`}
              >
                <span>{isDropdownActive ? activeCategory.toUpperCase() : "MORE OPTIONS"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-[#e2e2e2] rounded-xl shadow-md py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-[#888] uppercase tracking-wider border-b border-[#eeeeee] mb-1">
                    MORE CATEGORIES
                  </div>
                  {dropdownCategories.map((cat) => {
                    const isSelected = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => {
                          onSelectCategory(cat);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#fff0f0] transition-colors flex items-center justify-between cursor-pointer ${
                          isSelected ? "text-[#bc000b] bg-[#fff0f0] font-semibold" : "text-[#1a1c1c]"
                        }`}
                      >
                        <span>{cat}</span>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#bc000b]" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenSearch}
            title="Search insights"
            className="p-2 text-[#5f5e5e] hover:text-[#1a1c1c] hover:bg-[#eeeeee] rounded-full transition-colors cursor-pointer flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
            <span className="hidden xl:inline text-xs text-[#5f5e5e] font-medium pr-1">Search insights...</span>
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Category Navigation Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-[#eeeeee] gap-2 no-scrollbar">
        {primaryCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`text-[12px] font-bold uppercase tracking-wider whitespace-nowrap px-3.5 py-1.5 rounded-full cursor-pointer ${
              activeCategory === cat ? "bg-[#bc000b] text-white" : "bg-[#f2f2f2] text-[#5f5e5e]"
            }`}
          >
            {cat}
          </button>
        ))}
        {/* Mobile Dropdown Select */}
        <select
          value={isDropdownActive ? activeCategory : ""}
          onChange={(e) => {
            if (e.target.value) {
              onSelectCategory(e.target.value as CategoryType);
            }
          }}
          className={`text-[12px] font-bold uppercase tracking-wider whitespace-nowrap px-3.5 py-1.5 rounded-full border cursor-pointer ${
            isDropdownActive
              ? "bg-[#bc000b] text-white border-[#bc000b]"
              : "bg-[#f2f2f2] text-[#5f5e5e] border-[#e2e2e2]"
          }`}
        >
          <option value="" disabled>MORE ▾</option>
          {dropdownCategories.map((cat) => (
            <option key={cat} value={cat} className="text-[#1a1c1c] bg-white">
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};
