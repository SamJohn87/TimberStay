import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export const fetchCabins = createAsyncThunk(
    'cabins/fetchCabins',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'cabins')); //connect to Firestore to get cabins collections' documents
        const cabins = [];

        querySnapshot.forEach((doc) => {
            cabins.push(doc.data()); //import results in array
        });

        cabins.sort((a, b) => a.id - b.id); //sort result by cabin id

        return cabins;
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