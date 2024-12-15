import { v4 as uuid } from "uuid";

const filtersData = [
  {
    id: uuid(),
    label: "All",
    value: "all",
  },
  {
    id: uuid(),
    label: "Products",
    value: "products",
  },
  {
    id: uuid(),
    label: "Blogs",
    value: "blogs",
  },
];

export default function SearchFilter({ filterValue, setFilterValue }: any) {
  return (
    <div className="flex flex-wrap items-center gap-3.5 bg-white px-10 pb-7.5">
      {filtersData.map((item) => (
        <button
          key={item?.id}
          onClick={() => setFilterValue(item?.value)}
          className={`inline-flex items-center justify-center rounded-lg border px-3.5 py-2.5 text-base font-medium ${
            filterValue === item?.value
              ? "border-blue bg-[#E1E8FF] text-blue"
              : "border-gray-5 bg-white text-dark hover:border-blue hover:bg-[#E1E8FF]"
          }`}
        >
          {item?.label}
        </button>
      ))}
    </div>
  );
}
