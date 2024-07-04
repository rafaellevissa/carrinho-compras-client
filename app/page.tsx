"use client";

import Card from "@/components/Card";
import InfiniteList from "../components/InfiniteList";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { fetchProductState } from "@/store/productSlice";

type Pagination = {
  page: number;
  take: number;
};

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    take: 10,
  });
  const { isShoppingCartOpen, products, isEmpty } = useAppSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(
      fetchProductState({ page: pagination.page, take: pagination.take })
    );
  }, [dispatch, pagination]);

  function* productGenerator() {
    while (!isEmpty) {
      setPagination({
        page: pagination.page + 1,
        take: pagination.take,
      });

      yield products;
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
            hero={product.thumbnail}
          />
        )}
      </InfiniteList>
    </div>
  );
}
