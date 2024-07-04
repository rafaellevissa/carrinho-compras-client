"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  itemGenerator: (index: number, batchSize: number) => Generator;
  children: (item: any, index: number) => React.ReactNode;
};

const InfiniteList = ({ itemGenerator, children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isListAtTheEnd, setIsListAtTheEnd] = useState<boolean>(false);
  const [list, setList] = useState<Array<any>>([]);
  const [index, setIndex] = useState<number>(0);

  const loader = useRef(null);
  const batchSize = 3;

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isLoading) {
          setIsLoading(true);
          loadMore();
        }
      });
    }, options);

    if (loader.current && !isLoading) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, isLoading]);

  const loadMore = () => {
    setTimeout(() => {
      const newItems = itemGenerator(index, batchSize).next().value;
      if (newItems) {
        const newIndex = index + batchSize;
        setIndex(newIndex);
        setList((prevList) => [...prevList, ...newItems]);
      } else {
        setIsListAtTheEnd(true);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <>
      {list.map((item, index) => children(item, index))}
      {isLoading && !isListAtTheEnd && (
        <div className="border border-gray-300 p-4 rounded mb-4 animate-pulse">
          <p className="bg-gray-200 h-8 w-3/4"></p>
          <p className="bg-gray-200 h-4 w-1/2 mt-2"></p>
          <p className="bg-gray-200 h-4 w-2/3 mt-2"></p>
        </div>
      )}
      <div ref={loader}></div>
    </>
  );
};

export default InfiniteList;
