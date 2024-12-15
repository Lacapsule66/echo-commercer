import { getCategories } from "@/sanity/sanity-shop-utils";
import { Category } from "@/types/category";
import Link from "next/link";
import { useEffect, useState } from "react";

const CustomSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    title: "Catégories",
  });
  const [categories, setCategories] = useState<Category[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: any) => {
    setSelectedOption(option);
    toggleDropdown();
  };

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event: any) {
      if (!event.target.closest(".dropdown-content")) {
        setIsOpen(!isOpen);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    fetchCategories();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="dropdown-content custom-select relative"
      style={{ width: "200px" }}
    >
      <div
        className={`select-selected whitespace-nowrap ${
          isOpen ? "select-arrow-active" : ""
        }`}
        onClick={toggleDropdown}
      >
        {selectedOption?.title}
      </div>
      <div className={`select-items ${isOpen ? "" : "select-hide"}`}>
        {categories.length > 0 &&
          categories.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionClick(option)}
              className={`select-item ${
                selectedOption === option ? "same-as-selected" : ""
              }`}
            >
              <Link href={`/categories/${option.slug.current}`}>
                {option.title}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomSelect;
