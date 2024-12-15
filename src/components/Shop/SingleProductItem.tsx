"use client";
import React from "react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import ReviewStar from "./ReviewStar";
import toast from "react-hot-toast";
import CheckoutBtn from "./CheckoutBtn";

const SingleGridItem = ({ item }: { item: any }) => {
  const { openModal } = useModalContext();

  const dispatch = useDispatch<AppDispatch>();

  const { addItem, cartDetails } = useShoppingCart();
  const isAlradyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id.toString() === item._id.toString()
  )
    ? true
    : false;

  const cartItem = {
    id: item._id,
    name: item.name,
    price: item.discountedPrice * 100,
    currency: "usd",
    image: item?.imageURL ? item?.imageURL : "",
    price_id: null,
  };

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // add to cart
  const handleAddToCart = () => {
    // @ts-ignore
    addItem(cartItem);
    toast.success("Product added to cart!");
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        quantity: 1,
      })
    );

    toast.success("Product added to wishlist!");
  };

  return (
    <div className='group'>
      <div className='relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4'>
        <Image
          src={item.imageURL ? item?.imageURL : ""}
          alt={item.name}
          width={250}
          height={250}
        />

        <div className='absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0'>
          <button
            onClick={() => {
              openModal()
              handleQuickViewUpdate()
            }}
            aria-label='button for quick view'
            className='flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue'
          >
            <svg
              className='stroke-current'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.18342 10.1971C1.61681 9.46098 1.3335 9.09291 1.3335 8C1.3335 6.90708 1.61681 6.53901 2.18342 5.80288C3.31481 4.33304 5.21224 2.66666 8.00016 2.66666C10.7881 2.66666 12.6855 4.33304 13.8169 5.80288C14.3835 6.53901 14.6668 6.90708 14.6668 8C14.6668 9.09291 14.3835 9.46098 13.8169 10.1971C12.6855 11.667 10.7881 13.3333 8.00016 13.3333C5.21224 13.3333 3.31481 11.667 2.18342 10.1971Z'
                stroke=''
                strokeWidth='1.5'
              />
              <path
                d='M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z'
                stroke=''
                strokeWidth='1.5'
              />
            </svg>
          </button>

          {isAlradyAdded ? (
            <CheckoutBtn />
          ) : (
            <button
              onClick={() => handleAddToCart()}
              className='inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark'
            >
              Add to cart
            </button>
          )}

          <button
            onClick={() => handleItemToWishList()}
            aria-label='button for favorite select'
            className='flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue'
          >
            <svg
              className="fill-current"
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.97441 12.6072L6.43872 12.0182L5.97441 12.6072ZM7.99992 3.66705L7.45955 4.18715C7.60094 4.33405 7.79604 4.41705 7.99992 4.41705C8.2038 4.41705 8.3989 4.33405 8.54028 4.18715L7.99992 3.66705ZM10.0254 12.6072L10.4897 13.1962L10.0254 12.6072ZM6.43872 12.0182C5.41345 11.21 4.33627 10.4524 3.47904 9.48714C2.64752 8.55082 2.08325 7.47827 2.08325 6.09136H0.583252C0.583252 7.9464 1.3588 9.35863 2.35747 10.4832C3.33043 11.5788 4.57383 12.4581 5.51009 13.1962L6.43872 12.0182ZM2.08325 6.09136C2.08325 4.75098 2.84027 3.63991 3.85342 3.1768C4.81929 2.73529 6.15155 2.82819 7.45955 4.18715L8.54028 3.14695C6.84839 1.38913 4.84732 1.0732 3.22983 1.81256C1.65962 2.53031 0.583252 4.18978 0.583252 6.09136H2.08325ZM5.51009 13.1962C5.84928 13.4636 6.22932 13.7618 6.61834 13.9891C7.00711 14.2163 7.47619 14.4166 7.99992 14.4166V12.9166C7.85698 12.9166 7.65939 12.8601 7.37512 12.694C7.0911 12.528 6.79171 12.2965 6.43872 12.0182L5.51009 13.1962ZM10.4897 13.1962C11.426 12.4581 12.6694 11.5788 13.6424 10.4832C14.641 9.35863 15.4166 7.9464 15.4166 6.09136H13.9166C13.9166 7.47827 13.3523 8.55082 12.5208 9.48714C11.6636 10.4524 10.5864 11.21 9.56112 12.0182L10.4897 13.1962ZM15.4166 6.09136C15.4166 4.18978 14.3402 2.53031 12.77 1.81256C11.1525 1.0732 9.15145 1.38913 7.45955 3.14695L8.54028 4.18715C9.84828 2.82819 11.1805 2.73529 12.1464 3.1768C13.1596 3.63991 13.9166 4.75098 13.9166 6.09136H15.4166ZM9.56112 12.0182C9.20813 12.2965 8.90874 12.528 8.62471 12.694C8.34044 12.8601 8.14285 12.9166 7.99992 12.9166V14.4166C8.52365 14.4166 8.99273 14.2163 9.3815 13.9891C9.77052 13.7618 10.1506 13.4636 10.4897 13.1962L9.56112 12.0182Z'
                fill=''
              />
            </svg>
          </button>
        </div>
      </div>

      <div className='flex items-center gap-2.5 mb-2'>
        <ReviewStar reviews={item.reviews.length} />
        <p className='text-custom-sm'>( {item?.reviews.length || 0} )</p>
      </div>

      <h3 className='font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5'>
        <Link href={item.url}> {item.name} </Link>
      </h3>

      <span className='flex items-center gap-2 font-medium text-lg'>
        <span className='text-dark'>${item.discountedPrice}</span>
        <span className='text-dark-4 line-through'>${item.price}</span>
      </span>
    </div>
  )
};

export default SingleGridItem;
