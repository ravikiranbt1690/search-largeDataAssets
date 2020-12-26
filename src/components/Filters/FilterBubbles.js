import React, { Component } from 'react'
import { connect } from "react-redux";
import { snakeCase } from "lodash"

import { removeFilter,setPage, clearFilters } from '../../redux/actions/actionCreators';

export class FilterBubbles extends Component {
  render() {
    const allFilters = Object.keys(
      this.props.filters
    ).reduce((filters, filterKey) => {
      if (this.props.filters[filterKey]) {
        this.props.filters[filterKey].forEach(filter => {
          filters.push({
            name: filterKey,
            value: filter
          });
        });
      }
      return filters;
    }, []);
    return (
      <ul className="filter-bubbles">
        {allFilters.map(filter => {
          const filterId = snakeCase(`filter-${filter.name}-${filter.value}`);
          return (
            <li key={filterId}>
              <span>{filter.name}: </span>
              {filter.value}
              <button
                type="button"
                onClick={e => {
                  this.props.removeFilter(filter.name, filter.value);
                }}
              >
                +
              </button>
            </li>
          );
        })}
        {!!allFilters.length && (
          <li className="filters-bubbles__clear-all">
            <button type="button" onClick={this.props.clearFilters}>
              Clear All
            </button>
          </li>
        )}
      </ul>
    );
  }
};

const FilterBubbleMapStateToProps = state => {
  return {
    filters: state.filters.filters
  };
};

const FilterBubbleMapDispatchToProps = dispatch => {
  return {
    removeFilter: (name, value) => {
      dispatch(setPage(1));
      dispatch(removeFilter(name, value));
    },
    clearFilters: () => {
      dispatch(setPage(1));
      dispatch(clearFilters());
    }
  };
};

export default connect(
  FilterBubbleMapStateToProps,
  FilterBubbleMapDispatchToProps
)(FilterBubbles);
