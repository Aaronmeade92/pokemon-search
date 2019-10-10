import React, { Component, Fragment } from 'react'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';

import { fetchPokemon } from '../actions/pokeData-actions.js';
import { pokeAPI } from '../actions/pokeData-actions.js';

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.state.pokeNames.filter(names =>
        names.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

class PokemonSuggestions extends Component {

    state = {
        loading: true,
        value: '',
        pokeNames: [],
        suggestions: [this.state.pokeNames],
    }

    onChange = (e, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    async componentDidMount() {
        const url = pokeAPI;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({pokeNames: data.results, loading: false});
    } 

    render() {

        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Gotta Search them all!',
            value,
            onChange: this.onChange
        };

        return (
            // <div>
            //     {this.state.loading || !this.state.pokeNames ? (
            //         <p> 'loading...' </p>
            //     ) : (
            //         <p> {this.state.pokeNames[0].name}</p>
            //     )}
            // </div>
            <Fragment>
                <script src="https://unpkg.com/react-autosuggest/dist/standalone/autosuggest.js"></script>
                 <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    // renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
            </Fragment>
        )};
        
}
const mapStateToProps = state => ({ 
    pokemon: state.dataReducer,
});

const mapDispatchToProps = { fetchPokemon };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PokemonSuggestions);