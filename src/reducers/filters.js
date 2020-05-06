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
    case 'SORT_BY_NAME_ASC':
      return {
        ...state,
        sortBy: 'nameAsc'
      }
    case 'SORT_BY_NAME_DESC':
      return {
        ...state,
        sortBy: 'nameDesc'
      }
    case 'SORT_BY_MKT_CAP_ASC':
      return {
        ...state,
        sortBy: 'mktcapAsc'
      }
    case 'SORT_BY_MKT_CAP_DESC':
      return {
        ...state,
        sortBy: 'mktcapDesc'
      }
    case 'SORT_BY_PRICE_ASC':
      return {
        ...state,
        sortBy: 'priceAsc'
      }
    case 'SORT_BY_PRICE_DESC':
      return {
        ...state,
        sortBy: 'priceDesc'
      }
    case 'SORT_BY_CHANGE_ASC':
      return {
        ...state,
        sortBy: 'changeAsc'
      }
    case 'SORT_BY_CHANGE_DESC':
      return {
        ...state,
        sortBy: 'changeDesc'
      }
    default:
      return state;
  }
};