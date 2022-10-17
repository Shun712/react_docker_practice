import axios from 'axios';
import {restaurantsIndex} from "../urls/index";

export const fetchRestaurants = () => {
    return axios.get(restaurantsIndex)
        .then(res => {
            console.log(res.data);
            return res.data
        })
        .catch((e) => console.log(e));
}