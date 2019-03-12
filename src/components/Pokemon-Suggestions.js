import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchPokemon } from '../actions/pokeData-actions.js';

class PokemonSuggestions extends Component {

    renderData = () => {
        this.props.fetchPokemon();
    }

    render() {
        return (
            <Fragment>
                <ul>
                    {this.props.pokemon.map(( poke, i) => 
                    <li key={i}> Name: {poke.name} </li>)}
                </ul>
                <button onClick={this.renderData}>show pokemon</button>
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
)(PokemonSuggestions);