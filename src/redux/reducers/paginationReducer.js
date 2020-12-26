export const pagination = (state = { page: 1 }, action) => {
  switch (action.type) {
    case "SET_PAGE":
      return Object.assign({}, state, { page: action.page });
    default:
      return state;
  }
};