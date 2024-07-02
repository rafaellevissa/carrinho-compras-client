import Footer from "@/components/Footer";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import InfiniteList from "@/components/InfiniteList";

export default function Home() {
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
    <div className="bg-[#171717] min-h-screen text-white font-sans">
      <Header />
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InfiniteList itemGenerator={productGenerator}>
            {(product, index) => <ProductCard key={index} {...product} />}
          </InfiniteList>
        </div>
      </main>
      <Footer />
    </div>
  );
}
