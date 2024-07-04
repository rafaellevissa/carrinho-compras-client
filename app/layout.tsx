"use client";

import MainLayout from "@/layouts/main";
import ReduxProvider from "@/store/redux-provider";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <ReduxProvider>
        <MainLayout>{children}</MainLayout>
    </ReduxProvider>
  );
}
