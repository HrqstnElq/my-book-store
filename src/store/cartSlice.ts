import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getBooksDetail} from "api/productApi";

export type Book = {
	bookId: number;
	bookName: string;
	bookImage: string;
	price: number;
	sale: number;
	quantity: number;
};

export const Increment = createAsyncThunk("cart/increment", async (params: {bookId: number}, {rejectWithValue}) => {
	try {
		const result = await getBooksDetail(params.bookId);
		if (result.data.success) {
			return {
				bookId: params.bookId,
				available: result.data.payload.book.available,
			};
		} else {
			return rejectWithValue(result.data.message);
		}
	} catch (err) {
		return rejectWithValue(err);
	}
});

const cartInitial = JSON.parse(localStorage.getItem("cart") || "[]");

const cartSlice = createSlice({
	name: "cart",
	initialState: cartInitial as Book[],
	reducers: {
		Decrement: (state, action: PayloadAction<{bookId: number}>) => {
			var index = state.findIndex((item) => item.bookId === action.payload.bookId);
			if (index > -1 && state[index].quantity > 1) state[index].quantity -= 1;
			localStorage.setItem("cart", JSON.stringify(state));
		},

		AddItem: (state, action: PayloadAction<Book>) => {
			var index = state.findIndex((item) => item.bookId === action.payload.bookId);
			if (index > -1) state[index].quantity += action.payload.quantity;
			else state.push(action.payload);
			localStorage.setItem("cart", JSON.stringify(state));
		},

		UpdateItem: (state, action: PayloadAction<Book>) => {
			var index = state.findIndex((x) => x.bookId === action.payload.bookId);
			state[index] = action.payload;

			localStorage.setItem("cart", JSON.stringify(state));
		},

		RemoveItem: (state, action: PayloadAction<{bookId: number}>) => {
			var index = state.findIndex((x) => x.bookId === action.payload.bookId);
			state.splice(index, 1);
			localStorage.setItem("cart", JSON.stringify(state));
		},

		Clear: (state) => {
			localStorage.removeItem("cart");
			// console.log("1");
			return [];
		},
	},
	extraReducers: {
		[Increment.fulfilled as any]: (state, action) => {
			var index = state.findIndex((item) => item.bookId === action.payload.bookId);

			if (index > -1 && state[index].quantity < action.payload.available) state[index].quantity += 1;
			localStorage.setItem("cart", JSON.stringify(state));
		},
	},
});

const {reducer: cartReducer} = cartSlice;

export default cartReducer;

export const {Clear, UpdateItem, RemoveItem, AddItem, Decrement} = cartSlice.actions;
