import Link from "next/link";
import { Icon } from "@iconify/react";
import useShoppingCartContext from "@/hooks/use-shopping-cart";

const Header = () => {
  const { toggleShoppingCart } = useShoppingCartContext();

  return (
    <>
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold">
              ALLU
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none"
            />
            <button>
              <Icon fontSize={25} icon="carbon:search" />
            </button>
            <button onClick={toggleShoppingCart}>
              <Icon fontSize={25} icon="carbon:shopping-cart" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
