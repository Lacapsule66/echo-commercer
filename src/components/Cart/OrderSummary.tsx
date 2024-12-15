import { useAppSelector } from "@/redux/store";
import React from "react";
import { useShoppingCart } from "use-shopping-cart";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useSelector } from "react-redux";

const OrderSummary = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  // const totalPrice = useSelector(selectTotalPrice);
  const { totalPrice, cartDetails, redirectToCheckout } = useShoppingCart();

  async function handleCheckoutClick(event: any) {
    event.preventDefault();
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(cartDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    try {
      const result = await redirectToCheckout(data?.id);
      if (result?.error) {
        console.log(result?.error);
      }
    } catch (error:any) {
      console.log(error?.message);
    }
  }

  return (
    <div className="lg:max-w-[455px] w-full">
      {/* <!-- order list box --> */}
      <div className="bg-white shadow-1 rounded-[10px]">
        <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
          <h3 className="font-medium text-xl text-dark">Order Summary</h3>
        </div>

        <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
          {/* <!-- title --> */}
          <div className="flex items-center justify-between py-5 border-b border-gray-3">
            <div>
              <h4 className="font-medium text-dark">Product</h4>
            </div>
            <div>
              <h4 className="font-medium text-dark text-right">Subtotal</h4>
            </div>
          </div>

          {/* <!-- product item --> */}
          {cartItems.map((item, key) => (
            <div
              key={key}
              className="flex items-center justify-between py-5 border-b border-gray-3"
            >
              <div>
                <p className="text-dark">{item.title}</p>
              </div>
              <div>
                <p className="text-dark text-right">
                  ${item.discountedPrice * item.quantity}
                </p>
              </div>
            </div>
          ))}

          {/* <!-- total --> */}
          <div className="flex items-center justify-between pt-5">
            <div>
              <p className="font-medium text-lg text-dark">Total</p>
            </div>
            <div>
              <p className="font-medium text-lg text-dark text-right">
                 ${ totalPrice && (totalPrice / 100).toFixed(2)}
              </p>
            </div>
          </div>

          {/* <!-- checkout button --> */}
          <button
            onClick={handleCheckoutClick}
            type="submit"
            className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
          >
            Process to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;