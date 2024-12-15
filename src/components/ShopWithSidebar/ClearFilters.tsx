"use client";
import React from "react";
import { useClearRefinements } from "react-instantsearch";

const ClearFilters = (props: any) => {
  const { refine } = useClearRefinements(props);
  return (
    <div className="bg-white shadow-1 rounded-lg py-4 px-5">
      <div className="flex items-center justify-between">
        <p>Filters:</p>
        <button className="text-blue" onClick={() => refine()}>
          Clean All
        </button>
      </div>
    </div>
  );
};

export default ClearFilters;
