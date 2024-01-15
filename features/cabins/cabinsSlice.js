import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchCabins = createAsyncThunk(
    'cabins/fetchCabins',
    async () => {
        const response = await fetch(`${baseUrl}cabins`);
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        return data;
    }
);

const cabinsSlice = createSlice({
    name: 'cabins',
    initialState: { isLoading: true, errMess: null, cabinsArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCabins.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCabins.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.cabinsArray = action.payload;
            })
            .addCase(fetchCabins.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const cabinsReducer = cabinsSlice.reducer;