import React, { Component } from 'react';
import { connect } from "react-redux";

import BodyContainer from "./Body";
import FiltersContainer from "./components/Filters/Filters";

import { DATA_ENTRIES,entryAttr } from "./catalog/constants";
import { setContent } from "./redux/actions/actionCreators";
import './App.css';


class App extends Component {

  componentWillMount () {
    this.props.setContent(this.getEntries());
  }

  getEntries() {
    const entries = [];
    for (let i = 0; i < DATA_ENTRIES; i++) {
      const entry = { id: i };

      Object.keys(entryAttr).forEach(attr => {
        entry[attr] =
          entryAttr[attr][Math.floor(Math.random() * entryAttr[attr].length)];
      });

      entries.push(entry);
    }
    return entries;
  }

  render() {
    return (
      <main className="app">
        <FiltersContainer />
        <BodyContainer />
      </main>
    );
  }
};

const AppMapStateToProps = state => {
  return {
    entries: state.content.entries
  };
};

const AppMapDispatchToProps = dispatch => {
  return {
    setContent: entries => {
      dispatch(setContent(entries));
    }
  };
};

export default connect(AppMapStateToProps, AppMapDispatchToProps)(App);