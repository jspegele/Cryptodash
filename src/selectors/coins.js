const selectCoins = (coins, { text, sortBy }) => {
  const exactMatches = []
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
      return b.mktCap - a.mktCap
    } else if(sortBy === 'mktcapDesc') {
      return a.mktCap - b.mktCap
    } else if(sortBy === 'priceAsc') {
      return parseFloat(b.price) - parseFloat(a.price)
    } else if(sortBy === 'priceDesc') {
      return parseFloat(a.price) - parseFloat(b.price)
    } else if(sortBy === 'changeAsc') {
      return b.changePctDay - a.changePctDay
    } else if(sortBy === 'changeDesc') {
      return a.changePctDay - b.changePctDay
    }
  })

}

export default selectCoins
