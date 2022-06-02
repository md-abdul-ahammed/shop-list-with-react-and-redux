import {
  SHOPLIST_AREA_AND_CATEGORY,
  SHOPLIST_REQUEST,
  SHOPLIST_SUCCESS,
} from "../constants/constants";

export const shopList = (data) => async (dispatch) => {
  try {
    dispatch({ type: SHOPLIST_REQUEST });
    dispatch({ type: SHOPLIST_SUCCESS, payload: data });
  } catch (error) {}
};

export const getAllAreaAndCategory = () => async (dispatch) => {
  try {
    dispatch({ type: SHOPLIST_AREA_AND_CATEGORY });
  } catch (error) {}
};
