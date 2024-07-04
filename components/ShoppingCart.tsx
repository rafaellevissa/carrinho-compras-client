import { Icon } from "@iconify/react";
import useShoppingCartContext from "@/hooks/use-shopping-cart";
import Sidebar from "./Sidebar";

type ShoppingCartEmptyProps = {
  text: string;
};

const ShoppingCartEmpty = ({ text }: ShoppingCartEmptyProps) => (
  <p className="text-sm">{text}</p>
);

type ShoppingCartItemProps = {
  image: string;
  name: string;
  price: number;
  quantity: number;
};

const ShoppingCartItem = ({
  image,
  name,
  price,
  quantity,
}: ShoppingCartItemProps) => (
  <div className="relative flex items-center mb-4 border-b border-neutral-600 pb-4">
    <button className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-3/4 mt-1 ml-0 text-white hover:text-red-500 focus:outline-none z-10">
      <Icon icon="iconamoon:close-circle-1-fill" fontSize={25} />
    </button>
    <div className="mr-4">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 rounded-md object-cover"
      />
    </div>
    <div className="flex-1">
      <h3 className="text-md font-medium">{name}</h3>
    </div>
    <div className="flex flex-col items-end">
      <span className="p-1 bg-blue-500 text-sm font-medium me-2 rounded dark:bg-blue-500">
        <p>${price}</p>
      </span>
      <span className="text-sm mt-2">
        <p>Quantity: {quantity}</p>
      </span>
    </div>
  </div>
);

type Props = {
  emptyText: string;
};

export default function ShoppingCart({ emptyText }: Props) {
  const { isShoppingCartOpen, toggleShoppingCart, items, isEmpty } =
    useShoppingCartContext();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Sidebar
      isOpen={isShoppingCartOpen}
      title="Shopping Cart"
      onClose={toggleShoppingCart}
    >
      <div className="flex flex-col h-full">
        <div
          className="flex-grow overflow-y-auto p-4"
          style={{ maxHeight: "calc(100vh - 160px)" }}
        >
          {items.map((item, index) => (
            <ShoppingCartItem key={index} {...item} />
          ))}

          {isEmpty && <ShoppingCartEmpty text={emptyText} />}
        </div>
        <div className="fixed bottom-0 left-0 right-0 bg-[#171717] p-4 border-t border-neutral-600 z-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-lg font-medium">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {}}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </Sidebar>
  );
}
