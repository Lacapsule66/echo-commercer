"use client";
import { ModalProvider } from "../context/QuickViewModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import CartProvider from "@/components/Providers/CartProvider";
import { SessionProvider } from "next-auth/react";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <SessionProvider>
        <CartProvider>
          <ModalProvider>
            <PreviewSliderProvider>
              {children}
              <QuickViewModal />
              <CartSidebarModal />
              <PreviewSliderModal />
            </PreviewSliderProvider>
          </ModalProvider>
        </CartProvider>
      </SessionProvider>
    </ReduxProvider>
  );
};

export default Providers;
