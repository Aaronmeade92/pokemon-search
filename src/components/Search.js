import React, { Component, Fragment } from 'react';
import superagent from 'superagent';
import Button from '@material-ui/core/Button'


const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

// restyle using material ui

const center = {
    paddingLeft: '40%',
};

const pokeImg = {
    width: '40%',
};

const column = {
    float: 'left',
    width: '30%',
    padding: '2%',
    wordWrap: 'breakWord',
};

const container = {
    paddingLeft: '30%'
};

class Search extends Component {
    state = {
        query: '',
        results: [],
        movesList: [],
        types: [],
        statType: [],
        errorMessage: false,
    };

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        });
    };

    queryAPI = (e) => {
        e.preventDefault();
        superagent.get(`${pokeAPI}` + (this.state.query).toLowerCase())
            .then(response => {
                fetch(response.body.sprites.front_default)
                    .then(sprite => {
                        this.setState({
                            errorMessage: false,
                            results: sprite,
                        });
                    }).then(() => {
                        fetch(response.body.stats)
                            .then(() => {
                                this.setState({
                                    movesList: response.body.stats
                                });
                            });
                    }).then(() => {
                        fetch(response.body.types)
                            .then(() => {
                                this.setState({
                                    types: response.body.types,
                                });
                        });
                    }).then(() => {
                        fetch(response.body.stats)
                            .then(() => {
                                this.setState({
                                    statType: response.body.stats
                                });
                        });
                    });
            }).catch((err) => {
                console.log(err);
                this.setState({
                    errorMessage: true
                });
            });
    };

    render() {

        return (
            <Fragment>
                <div style={center}>
                    <h2>Pokemon Search</h2>

                    <form>
                        <img style={pokeImg} src={this.state.results.url}></img>
                        <br/>
                        <input placeholder='Search...'
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        />
                        < br/>
                        <Button variant='contained' color='primary' onClick={this.queryAPI}>Search</Button>
                        {this.state.errorMessage && <p>Pokemon not found! (Check spelling)</p>}
                    </form> 

                </div>
                    <div style={container}> 
                        <div style={column}>
                        <h2>Pokemon Type</h2>
                            <ul>
                                {this.state.types.map((types, i) => {
                                    return <li key={i}>Type: {types.type.name}</li>
                                })}
                            </ul>
                        </div>

                        <div style={column}>
                        <h2>Pokemon Stats</h2>
                            <ul>
                                {this.state.statType.map((statType, i) => {
                                    return <li key={i}>Stat: {statType.stat.name} <br/> Base Value: {statType.base_stat}</li>
                                })}
                            </ul>
                        </div>
                    </div>
            </Fragment>
        );
    };
};

export default (Search);