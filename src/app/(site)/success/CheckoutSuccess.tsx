"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useShoppingCart } from "use-shopping-cart";
import { useSession } from "next-auth/react";

const CheckoutSuccess = () => {
  const { clearCart } = useShoppingCart();
  const [loading, setLoading] = React.useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      clearCart();
    }, 1000);
  }, []);

  return (
    <section className="overflow-hidden py-20 bg-gray-2">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {loading ? (
          <>
            <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
              <div className="text-center">
                <h2 className="font-bold text-blue text-4xl lg:text-[45px] lg:leading-[57px] mb-5">
                  Successful!
                </h2>

                <h3 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                  Order Placed Successfully!
                </h3>

                <p className="max-w-[491px] w-full mx-auto mb-7.5">
                  Wait a second while we save the order. You will receive an
                  email with details of your order.
                </p>

                <div className="flex justify-center gap-5">
                  <svg
                    width="56px"
                    height="56px"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    x="128"
                    y="128"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g fill="currentColor">
                      <path
                        fill="currentColor"
                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      >
                        <animateTransform
                          attributeName="transform"
                          dur="0.75s"
                          repeatCount="indefinite"
                          type="rotate"
                          values="0 12 12;360 12 12"
                        />
                      </path>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
              <div className="text-center">
                <h2 className="font-bold text-blue text-4xl lg:text-[45px] lg:leading-[57px] mb-5">
                  Successful!
                </h2>

                <h3 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                  Order Placed Successfully!
                </h3>

                <p className="max-w-[491px] w-full mx-auto mb-7.5">
                  Sign In with & Track the order. If you are not already Signed
                  Up use the purchase email to Sign up.
                </p>

                <div className="flex justify-center gap-5">
                  <Link
                    href={`${session?.user ? "/my-account" : "/signin"}`}
                    className="inline-flex items-center gap-2 font-medium text-white bg-blue-light py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
                  >
                    <svg
                      className="fill-current"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6654 9.37502C17.0105 9.37502 17.2904 9.65484 17.2904 10C17.2904 10.3452 17.0105 10.625 16.6654 10.625H8.95703L8.95703 15C8.95703 15.2528 8.80476 15.4807 8.57121 15.5774C8.33766 15.6742 8.06884 15.6207 7.89009 15.442L2.89009 10.442C2.77288 10.3247 2.70703 10.1658 2.70703 10C2.70703 9.83426 2.77288 9.67529 2.89009 9.55808L7.89009 4.55808C8.06884 4.37933 8.33766 4.32586 8.57121 4.42259C8.80475 4.51933 8.95703 4.74723 8.95703 5.00002L8.95703 9.37502H16.6654Z"
                        fill=""
                      />
                    </svg>
                    {`${session?.user ? "Account" : "Sign In"}`}
                  </Link>

                  <Link
                    href="/shop-with-sidebar"
                    className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
                  >
                    Continue Shopping
                    <svg
                      className="fill-current rotate-180"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.6654 9.37502C17.0105 9.37502 17.2904 9.65484 17.2904 10C17.2904 10.3452 17.0105 10.625 16.6654 10.625H8.95703L8.95703 15C8.95703 15.2528 8.80476 15.4807 8.57121 15.5774C8.33766 15.6742 8.06884 15.6207 7.89009 15.442L2.89009 10.442C2.77288 10.3247 2.70703 10.1658 2.70703 10C2.70703 9.83426 2.77288 9.67529 2.89009 9.55808L7.89009 4.55808C8.06884 4.37933 8.33766 4.32586 8.57121 4.42259C8.80475 4.51933 8.95703 4.74723 8.95703 5.00002L8.95703 9.37502H16.6654Z"
                        fill=""
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CheckoutSuccess;
