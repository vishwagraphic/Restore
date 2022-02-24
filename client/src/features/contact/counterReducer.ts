export const INCREMENT_COUNTER ="INCREMENT_COUNTER";
export const DECREMENT_COUNTER ="DECREMENT_COUNTER";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: "test"
}

export const counterAction = (action: { type: any; payload?: any; }) => {
    return {
        type: action.type,
        payload: action.payload || 1
    }
}


const counterReducer = (state=initialState, action: any) => {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {...state, data: state.data+action.payload}
        case DECREMENT_COUNTER:
            return {...state, data: state.data-action.payload}
        default:
            return state;
    }
}

export default counterReducer;