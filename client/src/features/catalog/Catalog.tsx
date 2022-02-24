import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppSelector } from "../../store/counterStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useDispatch();
  const { productsLoaded, status } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading Products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
};
export default Catalog;
