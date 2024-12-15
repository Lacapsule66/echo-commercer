"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import Link from "next/link";

export const Wishlist = () => {
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        {wishlistItems.length > 0 ? (
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
              <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
              <button className="text-blue">Clear Wishlist Cart</button>
            </div>

            <div className="bg-white rounded-[10px] shadow-1">
              <div className="w-full overflow-x-auto">
                <div className="min-w-[1170px]">
                  {/* <!-- table header --> */}
                  <div className="flex items-center py-5.5 px-10">
                    <div className="min-w-[83px]"></div>
                    <div className="min-w-[387px]">
                      <p className="text-dark">Product</p>
                    </div>

                    <div className="min-w-[205px]">
                      <p className="text-dark">Unit Price</p>
                    </div>

                    <div className="min-w-[265px]">
                      <p className="text-dark">Stock Status</p>
                    </div>

                    <div className="min-w-[150px]">
                      <p className="text-dark text-right">Action</p>
                    </div>
                  </div>

                  {/* <!-- wish item --> */}
                  {wishlistItems.map((item, key) => (
                    <SingleItem item={item} key={key} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-20">
            <h2 className="font-medium text-dark text-2xl text-center pb-5">
              Your wishlist is empty!
            </h2>
            <Link
              href="/shop-with-sidebar"
              className="w-96 mx-auto flex justify-center font-medium text-white bg-blue py-[13px] px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </section>
    </>
  );
};
