import React, { Component } from 'react';
import { connect } from "react-redux";

import { addSearchFilter, setContent } from '../../redux/actions/actionCreators';
import { cloneDeep, isEmpty } from "lodash"

export class SearchFilter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      entries:[],
      filteredData:[]
    }
  }

  componentWillMount() {
    this.setState({
      entries: this.props.entries,
    })
  }

  handleFilterChange(event) {
    let value = event.target.value.trim();
    let { entries } = this.state;
    let oldEntries = cloneDeep(entries);

    this.props.addSearchFilter(value);

    const re = new RegExp(value, 'i');

    // let filteredData = filter(this.props.entries, entry => includes(entry, value));
    let filteredData = entries.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.match(re)));
    
    filteredData = !isEmpty(value) ? filteredData : oldEntries;

    this.setState({
      filteredData : filteredData
    },() => this.props.setContent(this.state.filteredData))
  }

  render() {
    return (
      <div className="search-filters">
        <input
          onChange={(event)=> this.handleFilterChange(event)}
          placeholder={"Search name"}
        />
      </div>
    );
  }
};

const SearchMapStateToProp = state => {
  return {
    entries: state.content.entries
  };
};

const SearchMapDispatchToProps = dispatch => {
  return {
    addSearchFilter: (searchTerm) => {
      dispatch(addSearchFilter(searchTerm));
    },
    setContent:(entries) => {
      dispatch(setContent(entries));
    }
  };
};

export default connect(
  SearchMapStateToProp,
  SearchMapDispatchToProps
)(SearchFilter);
