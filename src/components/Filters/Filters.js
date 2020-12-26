import React, { Component } from 'react';
import { connect } from "react-redux";
import { entryAttr } from "../../catalog/constants";
import { snakeCase } from "lodash"

import { addFilter,removeFilter,setPage } from '../../redux/actions/actionCreators';

export class Filters extends Component {
  updateFilter(name, e) {
    if (e.target.checked) {
      this.props.addFilter(name, e.target.value);
    } else {
      this.props.removeFilter(name, e.target.value);
    }
    
    this.props.resetPage();
  }

  render() {
    return (
      <div className="filters">
        <header className="filters__header">
          <h2 className="filters__header__title">Filters</h2>
        </header>
        <div className="filters__inner">

          {Object.keys(entryAttr)
            .filter(attr => attr !== "name" && attr !== "tags" && attr !== "rows" && attr !== "columns" && attr !== "owner" && attr!== "description")
            .map((attr, i) => {
              return (
                <div key={`filter-${i}`} className="filters__filter">
                  <h3 className="filters__filter__title">{attr}</h3>
                  <ul>
                    {entryAttr[attr].map((attrValue, attrValueKey) => {
                      const inputId = snakeCase(attr + attrValue);
                      const checked = this.props.filters[attr]
                        ? this.props.filters[attr].includes(attrValue.toString())
                        : false;
                      return (
                        <li key={`${attrValue}-${attrValueKey}`}>
                          <input
                            type="checkbox"
                            id={inputId}
                            value={attrValue}
                            name={attrValue}
                            checked={checked}
                            onChange={e => {
                              this.updateFilter(attr, e);
                            }}
                          />
                          <label htmlFor={inputId}>{attrValue}</label>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
};

const FiltersMapStateToProps = state => {
  return {
    filters: state.filters.filters
  };
};

const FiltersMapDispatchToProps = dispatch => {
  return {
    addFilter: (name, value) => {
      dispatch(addFilter(name, value));
    },
    removeFilter: (name, value) => {
      dispatch(removeFilter(name, value));
    },
    resetPage: () => {
      dispatch(setPage(1));
    }
  };
};

export default connect(
  FiltersMapStateToProps,
  FiltersMapDispatchToProps
)(Filters);