import React, { Component, Fragment } from 'react';
import superagent from 'superagent';

const pokeAPI = 'https://pokeapi.co/api/v2/pokemon/';

const center = {
    paddingLeft: '40%',
};

const pokeImg = {
    width: '40%',
    paddingRight: '30%'
};

const column = {
    float: 'left',
    width: '25%',
    borderStyle: 'solid',
    borderColor: 'black',
    padding: '3%',
};

const container = {
    padding: '10%',
    paddingLeft: '12%'
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
                        fetch(response.body.moves)
                            .then(() => {
                                this.setState({
                                    movesList: response.body.moves
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
                <h1>Pokemon Search</h1>

                <form>
                    <img style={pokeImg} src={this.state.results.url}></img>
                    <br/>
                    <input placeholder='Search...'
                    ref={input => this.search = input}
                    onChange={this.handleInputChange}
                    />
                    < br/>
                    <button onClick={this.queryAPI}>Search</button>
                    {this.state.errorMessage && <p>Pokemon not found! (Check spelling)</p>}
                </form> 

            </div>

                <div style={container}>
                    <div style={column}>  
                    <h3>Moves List</h3>         
                        <ul>
                            {this.state.movesList.map((moves, i) => {
                                return <li key={i}>Name: {moves.move.name}  </li>
                            })}
                        </ul>
                    </div>

                    <div style={column}>
                    <h3>Pokemon Type</h3>
                        <ul>
                            {this.state.types.map((types, i) => {
                                return <li key={i}>Type: {types.type.name}</li>
                            })}
                        </ul>
                    </div>

                    <div style={column}>
                    <h3>Stats</h3>
                        <ul>
                            {this.state.statType.map((statType, i) => {
                                return <li key={i}>Stat: {statType.stat.name} <br/> Base: {statType.base_stat}</li>
                            })}
                        </ul>
                    </div>
                </div>
                
            </Fragment>
        );
    };
};

export default Search;