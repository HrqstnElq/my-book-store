import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userApi} from "api/userApi";

export const getMe = createAsyncThunk("user/getMe", async (params, thunkApi) => {
	// thunkApi.dispatch()
	const currentUser = await userApi.getMe();
	return currentUser;
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		current: {},
		loading: false,
		error: "",
	},
	reducers: {},
	extraReducers: {
		[getMe.pending as any]: (state) => {
			state.loading = true;
		},
		[getMe.rejected as any]: (state, action) => {
			state.loading = false;
			state.error = action.error;
		},
		[getMe.fulfilled as any]: (state, action) => {
			state.loading = false;
			state.current = action.payload;
		},
	},
});

const {reducer: userReducer} = userSlice;

export default userReducer;
