import superagent from 'superagent';

export const FETCH = 'pokemon/FETCH';

const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

export const fetch = (name) => ({
    type: FETCH,
    payload: name,
});

export const fetchPokemon = () => {
    return dispatch => {
        superagent.get(`${pokeAPI}`).then(response => {        
                console.log(response.body.results);
                dispatch(fetch(response.body.results));
        }).catch((err) => {
            console.log(err);
        });
    };
};
