// SET_TEXT_FILTER
export const setTextFilter  = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// SORT_BY_ORDER
export const sortByOrder = () => ({
  type: 'SORT_BY_ORDER'
})

// SORT_BY_NAME
export const sortByName = () => ({
  type: 'SORT_BY_NAME'
})

// SORT_BY_MKT_CAP
export const sortByMktCap = () => ({
  type: 'SORT_BY_MKT_CAP'
})

// SORT_BY_PRICE
export const sortByPrice = () => ({
  type: 'SORT_BY_PRICE'
})