import algoliasearch from "algoliasearch";
import React, { useEffect, useRef, useState } from "react";
import { InstantSearch, SearchBox } from "react-instantsearch";
import Results from "./Results";
import SearchFilter from "./SearchFilter";

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_PROJECT_ID as string;
const algoliaSearchApiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY as string;
const algoliaIndexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX as string;

const algoliaClient = algoliasearch(algoliaAppId, algoliaSearchApiKey);

const GlobalSearchModal = (props: any) => {
  const { searchModalOpen, setSearchModalOpen, currentFilter } = props;
  const [filterValue, setFilterValue] = useState(currentFilter || "all");

  // handle ClickOutside
  const ref = useRef(null);
  useEffect(() => {
    function handleClickOutside() {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchModalOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <>
      {searchModalOpen ? (
        <div
          className={`backdrop-filter-sm visible fixed left-0 top-0 z-[99999] flex min-h-screen w-full justify-center bg-[#000]/40 px-4 py-8 sm:px-8`}
        >
          <div
            ref={ref}
            className="shadow-7 relative w-full max-w-[1280px] scale-100 transform rounded-[15px] bg-white transition-all"
          >
            <button
              onClick={() => setSearchModalOpen(false)}
              className="text-body absolute -right-6 -top-6 z-[9999] flex h-11.5 w-11.5 items-center justify-center rounded-full border-2 border-stroke bg-white hover:text-dark"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.9983 10.586L17.9483 5.63603L19.3623 7.05003L14.4123 12L19.3623 16.95L17.9483 18.364L12.9983 13.414L8.04828 18.364L6.63428 16.95L11.5843 12L6.63428 7.05003L8.04828 5.63603L12.9983 10.586Z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <div className="h-auto max-h-[calc(100vh-70px)] overflow-y-auto rounded-b-[15px]">
              <InstantSearch
                insights={false}
                searchClient={algoliaClient}
                indexName={algoliaIndexName}
              >
                <SearchBox
                  placeholder="Type anything to search..."
                  classNames={{
                    root: "rounded-t-[15px] bg-white p-10 pb-3",
                    form: "sticky top-0 z-[999]",
                    input:
                      "flex h-[56px] w-full items-center rounded-lg border border-gray-3 pl-12 pr-6 outline-none duration-300 focus:border-primary",
                    submitIcon:
                      "absolute left-0 top-0 w-[56px] h-[56px] flex items-center justify-center p-5",
                    reset: "hidden",
                    resetIcon: "hidden",
                    loadingIndicator: "hidden",
                    loadingIcon: "hidden",
                  }}
                />

                <SearchFilter
                  filterValue={filterValue}
                  setFilterValue={setFilterValue}
                />

                <div className="bg-white p-10 pt-7.5">
                  {/* <EmptyState /> */}
                  <div className="flex flex-wrap -mx-4">
                    <Results
                      {...props}
                      filterValue={filterValue}
                      setFilterValue={setFilterValue}
                    />
                  </div>
                </div>
              </InstantSearch>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GlobalSearchModal;
