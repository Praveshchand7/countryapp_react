import { createSlice } from "@reduxjs/toolkit";
const favourites = localStorage.getItem('favourites') !== null ? JSON.parse(localStorage.getItem('favourites')):[]

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState: {
        favourites,
    },
    reducers:{
        addFavourite(state, action){
            if(state.favourites.some(fav => fav === action.payload)) state.favourites = [...state.favourites]
            state.favourites = [...state.favourites,action.payload]
            localStorage.setItem('favourites', JSON.stringify(state.favourites))
        },
        removeFavourite(state, action) {
            const newArray = [...state.favourites]
            newArray.splice(newArray.findIndex(e => e === action.payload), 1)
            state.favourites = [...newArray]
        },
        clearFavourite(state, action) {
            localStorage.removeItem('favourites')
            state.favourites=[]
        }
    }
})

export const { addFavourite, removeFavourite, clearFavourite } = favouritesSlice.actions

export default favouritesSlice.reducer


