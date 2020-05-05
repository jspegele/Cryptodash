export const setTextFilter  = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

export const sortByOrder = () => ({
  type: 'SORT_BY_ORDER'
})

export const sortByName = () => ({
  type: 'SORT_BY_NAME'
})

export const sortByMktCap = () => ({
  type: 'SORT_BY_MKT_CAP'
})

export const sortByPrice = () => ({
  type: 'SORT_BY_PRICE'
})
