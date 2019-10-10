import React, { Component, Fragment } from 'react';

import Search from './Search.js';
import PokemonSuggestions from './Pokemon-Suggestions.js';

class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                < Search />
                <PokemonSuggestions />
            </Fragment>

        );
    }
}

export default Dashboard;