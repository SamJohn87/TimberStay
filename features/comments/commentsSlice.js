import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';

const { db } = require('../../firebase.config');

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const querySnapshot = await getDocs(collection(db, 'comments')); //connect to Firestore to get comments collections' documents
        const comments = [];

        querySnapshot.forEach((doc) => {
            comments.push(doc.data()); //import results in array
        });

        return comments;
    }
);

export const postComment = createAsyncThunk(
    'comments/postComment',
    async (payload, { dispatch, getState }) => {

        setTimeout(() => {
            const { comments } = getState();
            payload = { ...payload, date: (new Date()).toISOString(), id: comments.commentsArray.length };
            dispatch(addComment(payload));
        }, 2000);
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState: { isLoading: true, errMess: null, commentsArray: [] },
    reducers: {
        addComment: (state, action) => {
            state.commentsArray.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.commentsArray = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const commentsReducer = commentsSlice.reducer;
export const { addComment } = commentsSlice.actions;