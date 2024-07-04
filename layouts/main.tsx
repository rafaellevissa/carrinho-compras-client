import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShoppingCart from "@/components/ShoppingCart";

import "@/styles/globals.css";

type Props = {
  children: any;
};

export default function MainLayout({ children }: Props) {
  return (
    <html>
      <body>
        <div className="bg-[#171717] font-beiruti min-h-screen text-white font-sans">
          <Header />
          <main className="container mx-auto p-4">{children}</main>
          <ShoppingCart emptyText="Your cart is empty." />
          <Footer />
        </div>
      </body>
    </html>
  );
}
