"use client";

import { ShoppingCartProvider } from "@/contexts/shopping-cart";
import MainLayout from "@/layouts/main";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <ShoppingCartProvider>
      <MainLayout>{children}</MainLayout>
    </ShoppingCartProvider>
  );
}
