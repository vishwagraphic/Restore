
import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { MetaData } from "../../models/pagination";
import { Product, ProductParams } from "../../models/products";
import { RootState } from "../../store/counterStore";


interface CatalogState{
    productsLoaded: boolean;
    fetchFiltersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsdAdapter = createEntityAdapter<Product>();

const getAxiosParams = (productParams: ProductParams) => {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append("orderBy", productParams.orderBy);
    if(productParams.brands?.length > 0) params.append('brands', productParams.brands.toString());
    if(productParams.types?.length > 0) params.append('types', productParams.types.toString());
    if(productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);

    return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().catalog.productParams)
        try{
           
            const response =  await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData))
            return response.items;
        } catch (err: any) {
            thunkAPI.rejectWithValue({error: err.data})
        }
   }
)

export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId, thunkAPI) => {
        try{
            return await agent.Catalog.details(productId);
        } catch (err: any) {
            thunkAPI.rejectWithValue({error: err.data})
        }
   }
)

export const fetchFiltersAsync = createAsyncThunk(
    "catalog/fetchFiltersAsync",
   async (_, thunkAPI) => {
       try{
            return await agent.Catalog.fetchFilters();
       }catch (err: any) {
            thunkAPI.rejectWithValue({error: err.data})
       }
   }    
)

const initParams = () => {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: "name",
        brands: [],
        types: []
    }
}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsdAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        fetchFiltersLoaded: false,
        status: "idle",
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload}
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        }
    },
    extraReducers: (build => {
        build.addCase(fetchProductsAsync.pending, (state) => {
            state.status = "pendingFetchProducts";
        })
        build.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsdAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.productsLoaded = true;
        })
        build.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = "idle";
        })
        build.addCase(fetchProductAsync.pending, (state) => {
            state.status = "pendingFetchProduct";
        })
        build.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsdAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        })
        build.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action)
            state.status = "idle";

        })
        build.addCase(fetchFiltersAsync.pending, (state) => {
            state.status = "pendingFetchFilters";            
        })
        build.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
            state.status = "idle"
            state.fetchFiltersLoaded = true;
            state.brands = action.payload.brands;
            state.types = action.payload.types
        })
        build.addCase(fetchFiltersAsync.rejected, (state, action) => {
            state.status = "idle";
            console.log(action)
        })
    })
})

export const productSelectors = productsdAdapter.getSelectors((state: RootState) => state.catalog);

export const {setProductParams, resetProductParams, setMetaData} = catalogSlice.actions;