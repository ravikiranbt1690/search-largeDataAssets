export const addFilter = (name, value) => {
  return {
    type: "ADD_FILTER",
    name,
    value
  };
};

export const addSearchFilter = (searchTerm) => {
  return {
    type: "ADD_SEARH_FILTER",
    searchTerm
  };
};

export const removeFilter = (name, value) => {
  return {
    type: "REMOVE_FILTER",
    name,
    value
  };
};

export const clearFilters = () => {
  return {
    type: "CLEAR_FILTERS"
  };
};

export const setPage = page => {
  return {
    type: "SET_PAGE",
    page
  };
};

export const setContent = entries => {
  return {
    type: "SET_CONTENT",
    entries
  };
};