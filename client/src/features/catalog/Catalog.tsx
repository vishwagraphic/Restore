import { Product } from "../../models/products";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "test", price: 200 },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
export default Catalog;
