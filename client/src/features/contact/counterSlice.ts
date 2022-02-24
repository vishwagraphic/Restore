import { createSlice } from "@reduxjs/toolkit"
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from "./counterReducer";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: "test"
}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        counterAction: (state, action) => {
            switch(action.payload.type) {
                case(INCREMENT_COUNTER):
                    state.data += action.payload.payload;
                    break;
                case(DECREMENT_COUNTER):
                     state.data -= action.payload.payload;
                     break
                default: 
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    state.data;
                    break
            }
             
           
        },
    }
})

export const {counterAction} = counterSlice.actions;