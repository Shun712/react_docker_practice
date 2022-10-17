import React, {Fragment, useEffect} from "react";

// apis
import {fetchFoods} from "../apis/foods";

import {useParams} from "react-router-dom";

export const Foods = () => {
    const { restaurantsId } = useParams();
    useEffect(() => {
        fetchFoods(1)
            .then((data) =>
                console.log(data)
            )
    }, []);
    return (
        <Fragment>
            フード一覧
            <p>
                restaurantIdは{restaurantsId}です。
            </p>
        </Fragment>
    )
}