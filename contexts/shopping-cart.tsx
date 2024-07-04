import { createContext, useState } from "react";

export type ShoppingCartContextType = {
  isShoppingCartOpen: boolean;
  toggleShoppingCart: () => void;
  items: Array<any>;
  isEmpty: boolean;
};

const initialContext: ShoppingCartContextType = {
  isShoppingCartOpen: false,
  toggleShoppingCart: () => {},
  items: [],
  isEmpty: true,
};

export const ShoppingCartContext =
  createContext<ShoppingCartContextType>(initialContext);

export const ShoppingCartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isShoppingCartOpen, setIsShoppingCartOpen] = useState<boolean>(false);

  const toggleShoppingCart = () => setIsShoppingCartOpen((isOpen) => !isOpen);

  const value: ShoppingCartContextType = {
    isShoppingCartOpen,
    toggleShoppingCart,
    items: [
      {
        name: "Produto",
        price: "10.00",
        quantity: "2",
        image: "https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg",
      },
      {
        name: "Produto",
        price: "10.00",
        quantity: "2",
        image: "https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg",
      },
    ],
    isEmpty: false,
  };

  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
