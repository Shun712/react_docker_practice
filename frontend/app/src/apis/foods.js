import axios from 'axios';
import {foodsIndex} from "../urls/index";

export const fetchFoods = (restaurantId) => {
    return axios.get(foodsIndex(restaurantId))
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch((e) => console.log(e));
}