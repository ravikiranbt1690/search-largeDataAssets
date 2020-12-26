import { pull } from "lodash"

export const filters = (state = { filters: {} }, action) => {
  switch (action.type) {
    case "ADD_FILTER":
      let currentAddFilter =
        state.filters[action.name] && state.filters[action.name].length
          ? state.filters[action.name]
          : [];
      currentAddFilter.push(action.value);
      const newAddState = Object.assign({}, state.filters, {
        [action.name]: currentAddFilter
      });
      return Object.assign({}, state, { filters: newAddState });
    case "REMOVE_FILTER":
      let currentRemoveFilter =
        state.filters[action.name] && state.filters[action.name].length
          ? state.filters[action.name]
          : [];
      currentRemoveFilter = pull(currentRemoveFilter, action.value);

      const newRemoveState = Object.assign({}, state.filters, {
        [action.name]: currentRemoveFilter
      });
      return Object.assign({}, state, { filters: newRemoveState });
    case "CLEAR_FILTERS":
      return Object.assign({}, state, { filters: {} });
    default:
      return state;
  }
};