"use client";

import Card from "@/components/Card";
import InfiniteList from "../components/InfiniteList";
import { RootState, useAppSelector } from "@/store/store";

export default function HomePage() {
  const { isShoppingCartOpen, products, isEmpty } = useAppSelector(
    (state: RootState) => state.product
  );

  function* productGenerator(index: number, batchSize: number) {
    // while (index < products.length) {
    //   yield products.slice(index, index + batchSize);
    // }
    yield products;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <InfiniteList itemGenerator={productGenerator}>
        {(product, index) => (
          <Card
            key={index}
            title={product.name}
            subtitle={product.price}
            hero={product.image}
          />
        )}
      </InfiniteList>
    </div>
  );
}
