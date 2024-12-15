import React from "react";
import CustomSelect from "./CustomSelect";
import { useHits } from "react-instantsearch";

const TopBar = () => {
    const { hits: products } = useHits();
    
    const shopProducts = products.filter((product) => product.type === "products");

  return (
    <div className="flex flex-wrap items-center gap-4">
      <CustomSelect />

      <p>
        Showing{" "}
        <span className="text-dark">
          {" "}
          {shopProducts.length} of {shopProducts.length}{" "}
        </span>{" "}
        Products
      </p>
    </div>
  );
};

export default TopBar;
