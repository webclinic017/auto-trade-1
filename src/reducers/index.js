export const initialState = {
  margins: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MARGINS":
      return { ...state, margins: action.margins };
    default:
      return state;
  }
};
