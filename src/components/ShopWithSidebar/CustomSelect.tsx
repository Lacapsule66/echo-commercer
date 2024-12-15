import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const CustomSelect = ({ path = "shop" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const options = [
    { label: "Latest Products", value: "?date=desc" },
    { label: "Old Products", value: "?date=asc" },
    { label: "Best Selling", value: "?sort=popular" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const router = useRouter();

  // Function to close the dropdown when a click occurs outside the component

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    setIsOpen(!isOpen);
    router.push(option.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // @ts-ignore
      if (selectRef.current && !selectRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // Add a click event listener to the document
    document.addEventListener("click", handleClickOutside);

    if (path.includes("top-popular")) {
      setSelectedOption(options[2]);
    }

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="custom-select custom-select-2 flex-shrink-0 relative"
      ref={selectRef}
    >
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.label}
      </div>
      <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
        {options.slice(1).map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`select-item ${
              selectedOption === option ? "same-as-selected" : ""
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSelect;
