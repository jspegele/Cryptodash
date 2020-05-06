export const setTextFilter  = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

export const sortByOrder = () => ({
  type: 'SORT_BY_ORDER'
})

export const sortByNameAsc = () => ({
  type: 'SORT_BY_NAME_ASC'
})

export const sortByNameDesc= () => ({
  type: 'SORT_BY_NAME_DESC'
})

export const sortByMktCapAsc = () => ({
  type: 'SORT_BY_MKT_CAP_ASC'
})

export const sortByMktCapDesc = () => ({
  type: 'SORT_BY_MKT_CAP_DESC'
})

export const sortByPriceAsc = () => ({
  type: 'SORT_BY_PRICE_ASC'
})

export const sortByPriceDesc = () => ({
  type: 'SORT_BY_PRICE_DESC'
})

export const sortByChangeAsc = () => ({
  type: 'SORT_BY_CHANGE_ASC'
})

export const sortByChangeDesc = () => ({
  type: 'SORT_BY_CHANGE_DESC'
})
