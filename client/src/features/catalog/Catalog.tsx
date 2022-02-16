import { Product } from "../../models/products";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import axios from "axios";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
export default Catalog;
