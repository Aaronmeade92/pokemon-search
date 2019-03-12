import { FETCH } from '../actions/pokeData-actions.js';

let initialState = [];

export default ( state = initialState, action ) => {

    let {type, payload} = action;

    switch(type) {
        case FETCH: return [...state, ...payload];
        default: return state;
    }
};