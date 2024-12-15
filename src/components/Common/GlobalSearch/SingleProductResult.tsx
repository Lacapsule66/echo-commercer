import ReviewStar from "@/components/Shop/ReviewStar";
import Image from "next/image";
import Link from "next/link";
import { Highlight } from "react-instantsearch";

export default function SingleProductResult({
  hit,
  showImage = false,
  setSearchModalOpen,
  isProduct,
}: any) {
  return (
    <div className="result-template group mb-2 w-full rounded-xl bg-white p-4 hover:bg-gray-2">
      <Link
        onClick={() => setSearchModalOpen(false)}
        className="flex items-center"
        href={hit?.objectID || hit?.url}
      >
        {showImage && hit?.imageURL && (
          <div
            className={`relative overflow-hidden rounded-lg border border-gray-3 bg-gray-2 ${
              isProduct
                ? "w-[120px] h-[110px]"
                : "aspect-[2/1] w-full max-w-[200px]"
            }`}
          >
            <Image src={hit?.imageURL} alt={hit?.name} layout="fill" />
          </div>
        )}
        <div className="ml-3 w-full">
          <h4 className="text-base font-semibold text-dark duration-300 group-hover:text-blue sm:text-lg">
            <Highlight attribute="name" hit={hit} />
          </h4>

          {!isProduct ? (
            <div>
              <Highlight
                className="mt-2 line-clamp-2 text-sm leading-normal text-body-color"
                attribute="shortDescription"
                hit={hit}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className=" border-r-2 border-gray-3 pr-3">
                <span className="text-dark">${hit?.discountedPrice}</span> <span className="text-dark-4 line-through">${hit?.price}</span>
              </div>
              <div className="flex items-center gap-2">
                {/* @ts-ignore */}
                <ReviewStar rating={hit?.reviews} />{" "}
                <span>({hit?.reviews.length})</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
