import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPokemon } from '../actions/pokeData-actions.js';

import PokemonSuggestions from './Pokemon-Suggestions.js';
import Search from './Search.js';

const center = {
    paddingLeft: '40%',
}
class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                    < Search />
                    {/* < PokemonSuggestions /> */}
            </Fragment>

        );
    }
}

const mapStateToProps = state => ({ 
    pokemon: state.dataReducer,
});

const mapDispatchToProps = { fetchPokemon };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Dashboard);