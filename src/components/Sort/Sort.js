import React, { Component } from 'react';
import { connect } from "react-redux";
import { setContent } from '../../redux/actions/actionCreators';
import "./sort.css"

export class SortComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortData:[]
    }
  }


  render() {
    return (
      <div className="sort-wrapper">
        <div className="form-group">
          <label htmlFor="select1" >Sort By</label>
          <select onChange={(event)=> this.props.onChange(event)} className="form-control">
            <option value="select">Select an Option</option>
            <option value="name">A-Z</option>
            <option value="owner">Owner</option>
            <option value="table">Table</option>
            <option value="tags">Tags</option>
          </select>
        </div>
      </div>
    )
  }
};

const MapStateToProps = state => {
  return {
    entries: state.content.entries
  };
};

const MapDispatchToProps = dispatch => {
  return {
    setContent:(entries) => {
      dispatch(setContent(entries));
    }
  };
};

export default connect(
  MapStateToProps,
  MapDispatchToProps
)(SortComponent);