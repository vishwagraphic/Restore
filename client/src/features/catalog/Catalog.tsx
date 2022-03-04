import ProductList from "./ProductList";
import LoadingComponent from "../../layout/LoadingComponent";
import { useAppSelector } from "../../store/counterStore";
import {
  fetchFiltersAsync,
  fetchProductsAsync,
  productSelectors,
  setProductParams,
} from "./catalogSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import ProductSort from "./ProductSort";
import ProductFilter from "./ProductFilter";
import AppPagination from "../../components/AppPagination";

const Catalog = () => {
  const products = useAppSelector(productSelectors.selectAll);
  const dispatch = useDispatch();
  const {
    productsLoaded,
    fetchFiltersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    if (!productsLoaded) {
      dispatch(fetchProductsAsync());
    }
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!fetchFiltersLoaded) {
      dispatch(fetchFiltersAsync());
    }
  }, [dispatch, fetchFiltersLoaded]);

  const sortOptions = [
    { value: "name", label: "Alphabetical" },
    { value: "priceDesc", label: "Price - Hight to Low" },
    { value: "price", label: "Price - Low to High" },
  ];

  if (!fetchFiltersLoaded)
    return <LoadingComponent message="Loading Products..." />;
  return (
    <>
      <Grid container columnSpacing={4} rowSpacing={2}>
        <Grid item xs={3}>
          <Paper sx={{ mb: 2 }}>
            <ProductSearch />
          </Paper>
          <Paper sx={{ mb: 2, pl: 2 }}>
            <ProductSort sortOptions={sortOptions} />
          </Paper>
          <Paper sx={{ mb: 2, pl: 2 }}>
            <ProductFilter
              items={brands}
              checked={productParams.brands}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ brands: items, pageNumber: 1 }))
              }
            />
          </Paper>
          <Paper sx={{ mb: 2, pl: 2 }}>
            <ProductFilter
              items={types}
              checked={productParams.types}
              onChange={(items: string[]) =>
                dispatch(setProductParams({ types: items, pageNumber: 1 }))
              }
            />
          </Paper>
        </Grid>

        <Grid item xs={9}>
          <ProductList products={products} />
        </Grid>
        <Grid item xs={3}></Grid>
        <Grid item xs={9}>
          {metaData && (
            <AppPagination
              metaData={metaData}
              onPageChange={(page: number) =>
                dispatch(setProductParams({ pageNumber: page }))
              }
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};
export default Catalog;
