import superagent from 'superagent';

export const FETCH = 'pokemon/FETCH';

export const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

export const fetch = (name) => ({
    type: FETCH,
    payload: name,
});


export const fetchPokeNames = () => {
    return dispatch => {
        superagent.get(`${pokeAPI}`).then(response => {
            dispatch(fetch(response.body.results));
            console.log(response.body.results)
        }).catch((err) => {
            console.log(err);
        });
    };
}