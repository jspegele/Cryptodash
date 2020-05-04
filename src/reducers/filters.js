const filtersReducerDefaultState = {
  text: '',
  sortBy: 'order'
}

export default (state = filtersReducerDefaultState, action) => {
  switch(action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_ORDER':
      return {
        ...state,
        sortBy: 'order'
      }
    case 'SORT_BY_NAME':
      return {
        ...state,
        sortBy: 'name'
      }
    case 'SORT_BY_MKT_CAP':
      return {
        ...state,
        sortBy: 'mktcap'
      }
    case 'SET_START_Price':
      return {
        ...state,
        sortBy: 'price'
      }
    default:
      return state;
  }
};