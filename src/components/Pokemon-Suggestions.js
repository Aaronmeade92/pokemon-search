import React, { Component, Fragment } from 'react'
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';

import { fetchPokeNames } from '../actions/pokeData-actions.js';
import { pokeAPI } from '../actions/pokeData-actions.js';

class PokemonSuggestions extends Component {

    state = {
        value: '',
        suggestions: [],
    }

    getSuggestions = value => {
            const inputValue = value.trim().toLowerCase();
            const inputLength = inputValue.length;
        
            return inputLength === 0 ? [] : this.state.suggestions.filter(names =>
                names.name.toLowerCase().slice(0, inputLength) === inputValue
            );
        };
        
        getSuggestionValue = suggestion => suggestion.name;
        
        renderSuggestion = suggestion => (
            <div>
                {suggestion.name}
            </div>
        );
    onChange = (e, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
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
        this.setState({ pokeNames: data.results, 
                        loading: false,
                        suggestions: data.results,
                    });
                    
        }
                
    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        return inputLength === 0 ? [] : this.state.pokeNames.filter(names =>
            names.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    render() {

        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Gotta Search them all!',
            value,
            onChange: this.onChange
        };

        return (
           
            <Fragment>
                 <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    S={inputProps}
                />
            </Fragment>
        )};
        
}
const mapStateToProps = state => ({ 
    pokemon: state.dataReducer,
});

const mapDispatchToProps = { 
    fetchPokeNames
 };

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PokemonSuggestions);