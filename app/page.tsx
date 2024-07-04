"use client";

import Card from "@/components/Card";
import InfiniteList from "../components/InfiniteList";

export default function HomePage() {
  const products = [
    {
      name: "1 allu",
      price: "$20.00 USD",
      image: "https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg",
    },
    {
      name: "2 allu",
      price: "$12.00 USD",
      image: "https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg",
    },
    {
      name: "3 allu",
      price: "$12.00 USD",
      image: "https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg",
    },
    {
      name: "4 allu",
      price: "$12.00 USD",
      image: "https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg",
    },
    {
      name: "5 allu",
      price: "$12.00 USD",
      image: "https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg",
    },
    {
      name: "6 allu",
      price: "$12.00 USD",
      image: "https://i.zst.com.br/thumbs/12/31/18/-745569221.jpg",
    },
  ];

  function* productGenerator(index: number, batchSize: number) {
    while (index < products.length) {
      yield products.slice(index, index + batchSize);
    }
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
