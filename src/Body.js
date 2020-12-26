import React, { Component } from 'react';
import { connect } from "react-redux";

import { ENTRIES_PER_PAGE, DEFAULT_VALUE } from "./catalog/constants";
import FilterBubblesContainer from "./components/Filters/FilterBubbles";
import PaginationContainer from "./components/Pagination/Pagination";
import SearchFilterContainer from "./components/Search/Search";

import { setContent } from './redux/actions/actionCreators';

import SortComponent from "./components/Sort/Sort";

import CardWrapper from "./common/Card/Card"

import { isEmpty } from "lodash"


/**
 * Components - Container 
 **/
class Wrapper extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortData:[]
    }
  }

  filterEntries() {
    if (isEmpty(this.props.filters)) {
      return this.props.entries;
    }

    return this.props.entries.filter(entry => {
      let matchFilters = true;
      Object.keys(this.props.filters).forEach(filterKey => {
        if (this.props.filters[filterKey].length) {
          matchFilters = this.props.filters[filterKey].includes(
            entry[filterKey].toString()
          )
            ? matchFilters
            : false;
        }
      });
      return matchFilters;
    });
  }

  sortCard(sortKey) {
    const sortData = this.props.entries.sort((a, b) => a[sortKey].localeCompare(b[sortKey]));
    this.setState({
      sortData: sortData
    }, ()=> this.props.setContent(sortData))
  }

  defaultSortByTitle() {
    const sortData = this.props.entries.sort((a, b) => a.name.localeCompare(b.name));
    this.setState({
      sortData: sortData
    }, ()=> this.props.setContent(sortData))
  }

  onChange(event) {
    const sortKey = event.target.value;
    if(sortKey === DEFAULT_VALUE) return this.defaultSortByTitle();
    this.sortCard(sortKey);
  }

  render() {
    const paginationOffset = (this.props.page - 1) * ENTRIES_PER_PAGE;
    const entries = this.filterEntries();
    const paginatedEntries = entries.slice(
      paginationOffset,
      paginationOffset + ENTRIES_PER_PAGE
    );

    return (
      <section className="body">
        <header className="body__header">
          <h2 className="body__header__title">Entries ({paginationOffset + 1}-{paginationOffset + paginatedEntries.length} of {entries.length})</h2>
        </header>
        
        <FilterBubblesContainer />

        <div className="search__wrapper">
          <SearchFilterContainer />
          <SortComponent 
            onChange = {this.onChange.bind(this)}
          />
        </div>


        {paginatedEntries.map(entry => {
          return (
            <CardWrapper 
            key={`col-${entry.id}`}
            {...entry}
          />
          );
        })}

        <PaginationContainer entries={entries} />
      </section>
    );
  }
};

const BodyMapStateToProp = state => {
  return {
    filters: state.filters.filters,
    page: state.pagination.page,
    entries: state.content.entries
  };
};

const SearchMapDispatchToProps = dispatch => {
  return {
    setContent:(entries) => {
      dispatch(setContent(entries));
    }
  };
};

export default connect(BodyMapStateToProp, SearchMapDispatchToProps)(Wrapper);