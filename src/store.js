import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { areaAndCategoryReducer, shopReducer } from "./reducers/shopReducer";

const reducer = combineReducers({
  shopList: shopReducer,
  areaAndCategories: areaAndCategoryReducer,
});

const middleware = [thunk];
let initialState = {};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
