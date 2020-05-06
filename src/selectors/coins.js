const selectCoins = (coins, { text, sortBy }) => {
  return coins.filter((coin) => {
    const textMatch = coin.symbol.toLowerCase().includes(text.toLowerCase()) || coin.name.toLowerCase().includes(text.toLowerCase())
    return textMatch
  }).sort((a, b) => {
    if(sortBy === 'order') {
      return parseInt(a.sortOrder) > parseInt(b.sortOrder) ? 1 : -1
    } else if(sortBy === 'nameAsc') {
      return a.name > b.name ? 1 : -1
    } else if(sortBy === 'nameDesc') {
      return b.name > a.name ? 1 : -1
    } else if(sortBy === 'mktcapAsc') {
      return a.mktCap - b.mktCap
    } else if(sortBy === 'mktcapDesc') {
      return b.mktCap - a.mktCap
    } else if(sortBy === 'priceAsc') {
      return a.price - b.price
    } else if(sortBy === 'priceDesc') {
      return b.price - a.price
    } else if(sortBy === 'changeAsc') {
      return a.changePctDay - b.changePctDay
    } else if(sortBy === 'changeDesc') {
      return b.changePctDay - a.changePctDay
    }
  })

}

export default selectCoins
