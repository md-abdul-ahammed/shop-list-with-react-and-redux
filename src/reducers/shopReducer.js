import {
  SHOPLIST_AREA_AND_CATEGORY,
  SHOPLIST_FILTER,
  SHOPLIST_REQUEST,
  SHOPLIST_SUCCESS,
} from "../constants/constants";

export const shopReducer = (state = { shoplist: [] }, action) => {
  switch (action.type) {
    case SHOPLIST_REQUEST:
      return {
        loading: true,
        shoplist: [],
      };
    case SHOPLIST_SUCCESS:
      return {
        loading: false,
        shoplist: action.payload,
      };

    default:
      return state;
  }
};

export const areaAndCategoryReducer = (
  state = {
    areaAndCategorydata: {
      shopAreas: [
        "Grocery",
        "Butcher",
        "Baker",
        "Chemist",
        "Stationery",
        "shop",
      ],
      shopCategories: [
        "Thane",
        "Pune",
        "Mumbai Suburban",
        "Nashik",
        "Nagpur",
        "Ahmednagar",
        "Solapur",
      ],
    },
  },
  action
) => {
  switch (action.type) {
    case SHOPLIST_AREA_AND_CATEGORY:
      return {
        shoplist: action.payload,
      };

    default:
      return state;
  }
};
