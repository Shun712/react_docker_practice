import React, {Fragment, useEffect, useReducer} from "react";

// reducers
import {
    initialState as foodsInitialState,
    foodsActionTypes,
    foodsReducer,
} from "../reducers/foods";

// apis
import {fetchFoods} from "../apis/foods";

// constants
import {REQUEST_STATE} from "../constants";

import {useParams} from "react-router-dom";

export const Foods = () => {
    const {restaurantsId} = useParams();
    const [foodsState, dispatch] = useReducer(foodsReducer, foodsInitialState);
    useEffect(() => {
        dispatch({type: foodsActionTypes.FETCHING});
        fetchFoods(restaurantsId)
            .then((data) => {
                dispatch({
                    type: foodsActionTypes.FETCH_SUCCESS,
                    payload: {
                        foods: data.foods
                    }
                });
            })
    }, []);

    return (
        <Fragment>
            {
                foodsState.fetchState === REQUEST_STATE.LOADING ?
                    <Fragment>
                        <p>
                            ロード中...
                        </p>
                    </Fragment>
                    :
                    foodsState.foodsList.map(food =>
                        <div key={food.id}>
                            {food.name}
                        </div>
                    )
            }
        </Fragment>
    )
}