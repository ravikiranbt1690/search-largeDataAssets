export const content = (state = { entries: [], searchFilters:{} }, action) => {
  switch (action.type) {
    case "SET_CONTENT":
      return { ...state,  entries: action.entries };
    default:
      return state;
  }
};
