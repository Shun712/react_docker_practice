import { REQUEST_STATE } from "../constants";

export const initialState = {
    fetchState: REQUEST_STATE.INITIAL,
    foodsList: [],
};

export const foodsActionTypes = {
    FETCHING: 'FETCHING',
    FETCH_SUCCESS: 'FETCH_SUCCESS'
}

export const foodsReducer = (state, action) => {
    switch (action.type) {
        // API取得中 => fetchStateはLOADINGにスイッチする
        case foodsActionTypes.FETCHING:
            return {
                ...state,
                fetchState: REQUEST_STATE.LOADING
            };
        // API取得完了 => fetchStateをOKにスイッチし、foodsListにデータを入れる
        case foodsActionTypes.FETCH_SUCCESS:
            return {
                fetchState: REQUEST_STATE.OK,
                foodsList: action.payload.foods,
            };
        default:
            throw new Error();
    }
}