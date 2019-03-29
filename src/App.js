import React, { Fragment, Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store.js';

import Dashboard from './components/dashboard.js';
import ExpansionPanel from './components/ExpansionPanel.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Fragment>
            <Route exact path='/' component={Dashboard}/>
            <Route exact path='/panel' component={ExpansionPanel}/>
          </Fragment>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
