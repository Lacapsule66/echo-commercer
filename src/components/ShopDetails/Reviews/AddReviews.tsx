"use client";

import toast from "react-hot-toast";
import React, { useState } from "react";

const AddReviews = ({ productID, reviews, setReviews }: any) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const [state, setState] = useState({
    comment: "",
    name: "",
    email: "",
    productID,
    ratings: rating,
  });

  const handleChange = (e: any) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (state.comment === "" || state.name === "" || state.email === "") {
      toast.error("Please fill all the fields");
      return;
    }

    const data = await fetch("/api/review/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...state, ratings: rating }),
    });

    const res: any = await data.json();
    setReviews([...reviews, res.review]);
    setState({
      comment: "",
      name: "",
      email: "",
      productID: 0,
      ratings: 0,
    });
  };

  return (
    <div className="max-w-[550px] w-full">
      <form onSubmit={handleSubmit}>
        <h2 className="font-medium text-2xl text-dark mb-3.5">Add a Review</h2>

        <p className="mb-6">
          Your email address will not be published. Required fields are marked *
        </p>

        <div className="flex items-center gap-3 mb-7.5">
          <span>Your Rating*</span>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, index) => {
              index += 1;
              return (
                <button
                  type="button"
                  key={index}
                  onClick={() => setRating(index)}
                  onMouseEnter={() => setHover(index)}
                  onMouseLeave={() => setHover(rating)}
                >
                  <span
                    className={`cursor-pointer ${
                      index <= (hover || rating)
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
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
          <div className="mb-5">
            <label htmlFor="comment" className="block mb-2.5">
              Comment
            </label>

            <textarea
              onChange={handleChange}
              value={state.comment}
              name="comment"
              id="comment"
              rows={5}
              required
              placeholder="Your review"
              className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
            ></textarea>

            <span className="flex items-center justify-between mt-2.5">
              <span className="text-custom-sm text-dark-4">Maximum</span>
              <span className="text-custom-sm text-dark-4">0/250</span>
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 sm:gap-7.5 mb-5.5">
            <div>
              <label htmlFor="name" className="block mb-2.5">
                Name
              </label>

              <input
                onChange={handleChange}
                type="text"
                name="name"
                id="name"
                placeholder="Your name"
                required
                value={state.name}
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-2.5">
                Email
              </label>

              <input
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                placeholder="Your email"
                value={state.email}
                required
                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full py-2.5 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
          >
            Submit Reviews
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviews;
