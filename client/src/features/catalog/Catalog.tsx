import { Product } from "../../models/products";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../layout/LoadingComponent";

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading Products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
export default Catalog;
