import React from "react";
import Image from "next/image";

const ReviewItem = ({ review }: { review: any }) => {
  return (
    <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
      <div className="flex items-center justify-between">
        <a href="#" className="flex items-center gap-4">
          <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
            <Image
              src="/images/users/user-01.jpg"
              alt="author"
              className="w-12.5 h-12.5 rounded-full overflow-hidden"
              width={50}
              height={50}
            />
          </div>

          <div>
            <h3 className="font-medium text-dark">{review?.name}</h3>
            <p className="text-custom-sm">User</p>
          </div>
        </a>

        {/* make the star interactive */}

        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => {
            index += 1;
            return (
              <span
                key={index}
                className={`${
                  index <= (review?.ratings || 0)
                    ? "text-[#FBB040]"
                    : "text-gray-5"
                }`}
              >
                <svg
                  className="fill-current"
                  width="15"
                  height="16"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                    fill=""
                  />
                </svg>
              </span>
            );
          })}
        </div>
      </div>

      <p className="text-dark mt-6">{review?.comment}</p>
    </div>
  );
};

export default ReviewItem;
