import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

export const fetchPartners = createAsyncThunk(
    'partners/fetchPartners',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'partners')); //connect to Firestore to get partners collections' documents
        const partners = [];

        querySnapshot.forEach((doc) => {
            partners.push(doc.data()); //import results in array
        });

        return partners;
    }
);

const partnersSlice = createSlice({
    name: 'partners',
    initialState: { isLoading: true, errMess: null, partnersArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPartners.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchPartners.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.partnersArray = action.payload;
            })
            .addCase(fetchPartners.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const partnersReducer = partnersSlice.reducer;