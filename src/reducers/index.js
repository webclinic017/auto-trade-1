export const initialState = {
  margins: null,
  positions: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MARGINS":
      return { ...state, margins: action.margins };
    case "UPDATE_POSITIONS":
      return { ...state, positions: action.positions };
    default:
      return state;
  }
};
