"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import Link from "next/link";
import { imageBuilder } from "@/sanity/sanity-shop-utils";
import { getProduct } from "@/sanity/sanity-shop-utils";
import { useShoppingCart } from "use-shopping-cart";
import { usePathname } from "next/navigation";
import ReviewStar from "../Shop/ReviewStar";
import toast from "react-hot-toast";
import CheckoutBtn from "../Shop/CheckoutBtn";

// add updated the type here
const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const [product, setProduct] = useState({});
  const dispatch = useDispatch<AppDispatch>();

  const { addItem, cartDetails } = useShoppingCart();
  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);

  const pathUrl = usePathname();

  const isAlradyAdded = Object.values(cartDetails ?? {}).some(
    (cartItem) => cartItem.id.toString() === item._id.toString()
  )
    ? true
    : false;

  const isAlradyWishListed = Object.values(wishlistItems ?? {}).some(
    (wishlistItem) => wishlistItem._id.toString() === item._id.toString()
  )
    ? true
    : false;

  const cartItem = {
    id: item._id,
    name: item.name,
    price: item.discountedPrice * 100,
    currency: "usd",
    image: item?.thumbnails
      ? imageBuilder(item?.thumbnails[0]?.image).url()
      : "",
    price_id: null,
    slug: item?.slug?.current,
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

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...product }));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(item?.slug?.current!);
      setProduct(data);
    };

    fetchProduct();
  }, [setProduct, item.slug]);

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4">
        <Link
          href={`${
            pathUrl.includes("products")
              ? `${item?.slug?.current}`
              : `products/${item?.slug?.current}`
          }`}
        >
          <Image
            src={
              item?.previewImages
                ? imageBuilder(item?.previewImages[0]?.image).url()!
                : ""
            }
            alt={item.name}
            width={250}
            height={250}
          />
        </Link>

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            aria-label="button for quick view"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            <svg
              className="stroke-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.18342 10.1971C1.61681 9.46098 1.3335 9.09291 1.3335 8C1.3335 6.90708 1.61681 6.53901 2.18342 5.80288C3.31481 4.33304 5.21224 2.66666 8.00016 2.66666C10.7881 2.66666 12.6855 4.33304 13.8169 5.80288C14.3835 6.53901 14.6668 6.90708 14.6668 8C14.6668 9.09291 14.3835 9.46098 13.8169 10.1971C12.6855 11.667 10.7881 13.3333 8.00016 13.3333C5.21224 13.3333 3.31481 11.667 2.18342 10.1971Z"
                stroke=""
                strokeWidth="1.5"
              />
              <path
                d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
                stroke=""
                strokeWidth="1.5"
              />
            </svg>
          </button>

          {isAlradyAdded ? (
            <CheckoutBtn />
          ) : (
            <button
              onClick={() => handleAddToCart()}
              className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
            >
              Add to cart
            </button>
          )}

          <button
            onClick={() => handleItemToWishList()}
            aria-label="button for favorite select"
            className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue`}
          >
            {isAlradyWishListed ? (
              <svg
                width="15"
                height="14"
                viewBox="0 0 15 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.27836 1.97248C5.73699 0.593435 4.011 0.40052 2.6122 1.03991C1.13484 1.71522 0.111694 3.2833 0.111694 5.09134C0.111694 6.86836 0.852025 8.22398 1.82284 9.31714C2.60028 10.1926 3.55184 10.9252 4.39224 11.5723C4.58275 11.719 4.76755 11.8613 4.94331 11.9999C5.2848 12.2691 5.65139 12.5561 6.02291 12.7732C6.39427 12.9902 6.8181 13.1666 7.27836 13.1666C7.73863 13.1666 8.16246 12.9902 8.53381 12.7732C8.90533 12.5561 9.27192 12.2691 9.61341 11.9999C9.78917 11.8613 9.97397 11.719 10.1645 11.5723C11.0049 10.9252 11.9564 10.1926 12.7339 9.31714C13.7047 8.22397 14.445 6.86836 14.445 5.09134C14.445 3.2833 13.4219 1.71522 11.9445 1.03991C10.5457 0.40052 8.81973 0.593435 7.27836 1.97248Z"
                  fill="#1C274C"
                />
              </svg>
            ) : (
              <svg
                className="fill-current"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.97441 12.6073L6.43872 12.0183L5.97441 12.6073ZM7.99992 3.66709L7.45955 4.18719C7.60094 4.33408 7.79604 4.41709 7.99992 4.41709C8.2038 4.41709 8.3989 4.33408 8.54028 4.18719L7.99992 3.66709ZM10.0254 12.6073L10.4897 13.1962L10.0254 12.6073ZM6.43872 12.0183C5.41345 11.21 4.33627 10.4524 3.47904 9.48717C2.64752 8.55085 2.08325 7.47831 2.08325 6.0914H0.583252C0.583252 7.94644 1.3588 9.35867 2.35747 10.4832C3.33043 11.5788 4.57383 12.4582 5.51009 13.1962L6.43872 12.0183ZM2.08325 6.0914C2.08325 4.75102 2.84027 3.63995 3.85342 3.17683C4.81929 2.73533 6.15155 2.82823 7.45955 4.18719L8.54028 3.14699C6.84839 1.38917 4.84732 1.07324 3.22983 1.8126C1.65962 2.53035 0.583252 4.18982 0.583252 6.0914H2.08325ZM5.51009 13.1962C5.84928 13.4636 6.22932 13.7618 6.61834 13.9891C7.00711 14.2163 7.47619 14.4167 7.99992 14.4167V12.9167C7.85698 12.9167 7.65939 12.8601 7.37512 12.694C7.0911 12.5281 6.79171 12.2965 6.43872 12.0183L5.51009 13.1962ZM10.4897 13.1962C11.426 12.4582 12.6694 11.5788 13.6424 10.4832C14.641 9.35867 15.4166 7.94644 15.4166 6.0914H13.9166C13.9166 7.47831 13.3523 8.55085 12.5208 9.48717C11.6636 10.4524 10.5864 11.21 9.56112 12.0183L10.4897 13.1962ZM15.4166 6.0914C15.4166 4.18982 14.3402 2.53035 12.77 1.8126C11.1525 1.07324 9.15145 1.38917 7.45955 3.14699L8.54028 4.18719C9.84828 2.82823 11.1805 2.73533 12.1464 3.17683C13.1596 3.63995 13.9166 4.75102 13.9166 6.0914H15.4166ZM9.56112 12.0183C9.20813 12.2965 8.90874 12.5281 8.62471 12.694C8.34044 12.8601 8.14285 12.9167 7.99992 12.9167V14.4167C8.52365 14.4167 8.99273 14.2163 9.3815 13.9891C9.77052 13.7618 10.1506 13.4636 10.4897 13.1962L9.56112 12.0183Z"
                  fill=""
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 mb-2">
        <ReviewStar reviews={item?.reviews?.length} />

        <p className="text-custom-sm">({item.reviews.length})</p>
      </div>

      <h3
        className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link
          href={`${
            pathUrl.includes("products")
              ? `${item?.slug?.current}`
              : `products/${item?.slug?.current}`
          }`}
        >
          {" "}
          {item.name}{" "}
        </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">${item.discountedPrice}</span>
        <span className="text-dark-4 line-through">${item.price}</span>
      </span>
    </div>
  );
};

export default ProductItem;
