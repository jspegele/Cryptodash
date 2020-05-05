const selectCoins = (coins, { text, sortBy }) => {
  const exactMatches = []
  return coins.filter((coin) => {
    const textMatch = coin.symbol.toLowerCase().includes(text.toLowerCase()) || coin.name.toLowerCase().includes(text.toLowerCase())
    return textMatch
  }).sort((a, b) => {
    if(sortBy === 'order') {
      return parseInt(a.sortOrder) > parseInt(b.sortOrder) ? 1 : -1
    } else if(sortBy === 'name') {
      return a.name > b.name ? 1 : -1
    } else if(sortBy === 'mktcap') {
      return b.mktCap - a.mktCap
    } else if(sortBy === 'price') {
      return b.price - a.price
    }
  })

}

export default selectCoins
