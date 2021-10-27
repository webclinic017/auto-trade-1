export const initialState = {
  margins: null,
  positions: [],
  signals: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_MARGINS":
      return { ...state, margins: action.margins };
    case "UPDATE_POSITIONS":
      return { ...state, positions: action.positions };
    case "ADD_SIGNAL":
      return { ...state, signals: [...state.signals, action.signal] };
    default:
      return state;
  }
};
