import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { Product } from "../../models/products";
import { RootState } from "../../store/counterStore";


const productsdAdapter = createEntityAdapter<Product>();

export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (_, thunkAPI) => {
        try{
            return await agent.Catalog.list();
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

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsdAdapter.getInitialState({
        productsLoaded: false,
        status: "idle"
    }),
    reducers: {},
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
    })
})

export const productSelectors = productsdAdapter.getSelectors((state: RootState) => state.catalog);