import {combineReducers} from 'redux';
import dataFavorite from './dataFavorite';
import dataMaster from './dataMaster';

const allReducers = combineReducers({
  dataFavorite,
  dataMaster,
});

export default allReducers;
