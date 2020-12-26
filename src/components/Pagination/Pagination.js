import React, { Component } from 'react';
import { connect } from "react-redux";
import { setPage } from '../../redux/actions/actionCreators';
import { ENTRIES_PER_PAGE } from "../../catalog/constants";
import { range } from "lodash";

class Pagination extends Component {

  render() {
    if (this.props.entries.length <= ENTRIES_PER_PAGE) {
      return (null);
    }
    
    const pages = this.props.entries.length / ENTRIES_PER_PAGE + 1;
    const displayPages = pages > 10 ? 10 : pages;

    const displayMin = pages > 10
      ? this.props.page - 5 < 1
        ? 1
        : this.props.page - 5
      : 1;
    const displayMax = pages > 10
      ? this.props.page + 5 > pages
        ? pages
        : this.props.page + 5 < displayMin + 10
          ? displayMin + 10
          : this.props.page + 5
      : displayPages;

    return (
      <ul className="pagination">
        <li>
          <button
            type="button"
            className='--prev'
            onClick={e => {
              this.props.setPage(this.props.page - 1);
            }}
            disabled={this.props.page - 1 <= 0}
            >
            Prev
          </button>
        </li>
        {range(
          displayMin,
          displayMax
        ).map((page, i) => {
          return (
            <li
              key = {i + Math.random(page)}
            >
              <button
                type="button"
                className={`${page === this.props.page ? "--active" : ""}`}
                onClick={e => {
                  this.props.setPage(page);
                }}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            className='--next'
            onClick={e => {
              this.props.setPage(this.props.page + 1);
            }}
            disabled={this.props.page + 1 >= this.props.entries.length / ENTRIES_PER_PAGE}
            >
            Next
          </button>
        </li>
      </ul>
    );
  }
};

const PaginationMapStateToProps = state => {
  return {
    page: state.pagination.page
  };
};

const PaginationMapDispatchToProps = dispatch => {
  return {
    setPage: page => {
      dispatch(setPage(page));
    }
  };
};

export default connect(
  PaginationMapStateToProps,
  PaginationMapDispatchToProps
)(Pagination);