import { REQUEST_STATE } from "../constants";

export const initialState = {
    fetchState: REQUEST_STATE.INITIAL,
    restaurantsList: [],
};

export const restaurantsActionTypes = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const restaurantsReducer = (state, action) => {
    switch (action.type) {
        // API取得中 => fetchStateはLOADINGにスイッチする
        case restaurantsActionTypes.FETCHING:
            return {
                ...state,
                fetchState: REQUEST_STATE.LOADING
            };
        // API取得完了 => fetchStateをOKにスイッチし、restaurantsListにデータを入れるx
        case restaurantsActionTypes.FETCH_SUCCESS:
            return {
                fetchState: REQUEST_STATE.OK,
                restaurantsList: action.payload.restaurants,
            };
        default:
            throw new Error();
    }
}