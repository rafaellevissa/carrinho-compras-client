"use client";

import { ShoppingCartProvider } from "@/contexts/shopping-cart";
import MainLayout from "@/layouts/main";
import ReduxProvider from "@/store/redux-provider";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <ReduxProvider>
      <ShoppingCartProvider>
        <MainLayout>{children}</MainLayout>
      </ShoppingCartProvider>
    </ReduxProvider>
  );
}
