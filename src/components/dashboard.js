import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchPokemon } from '../actions/pokeData-actions.js';

import Search from './Search.js';

class Dashboard extends Component {

    render() {
        return (
            <Fragment>
                    < Search />
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