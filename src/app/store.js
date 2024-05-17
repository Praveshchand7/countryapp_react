import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../features/countries/countriesSlice';
import favouriteSlice from '../features/countries/favouritesSlice';

export default configureStore({
  reducer: {
    countries: countriesSlice,
    favourites:favouriteSlice
  },
});
