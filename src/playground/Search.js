import React from 'react';
import styled from 'styled-components'
import _ from 'lodash'
import fuzzy from 'fuzzy'
import DashContext from '../context/dash-context'
import {backgroundColor2, fontSize2} from '../styles/Styles';

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`

const SearchInput = styled.input`
  ${backgroundColor2}
  ${fontSize2}
  border: 1px solid; 
  height: 25px; 
  color: #1163c9;
  place-self: center left; 
`

const Search = () => {
  const handleFilter = _.debounce((inputValue, coinList, setFilteredCoins) => {
    let coinSymbols = Object.keys(coinList)
    let coinNames = coinSymbols.map(symbol => coinList[symbol].CoinName)
    let allStringsToSearch = coinSymbols.concat(coinNames)
    let fuzzyResults = fuzzy
      .filter(inputValue, allStringsToSearch, {})
      .map(result => result.string)
    let filteredCoins = _.pickBy(coinList, (result, symbolKey) => {
      let coinName = result.CoinName
      return (_.includes(fuzzyResults, symbolKey) || _.includes(fuzzyResults, coinName))
    })
    setFilteredCoins(filteredCoins)
  }, 500)
  const filterCoins = (e, setFilteredCoins, coinList) => {
    let inputValue = e.target.value
    if(!inputValue) {
      setFilteredCoins(null)
      return
    }
    handleFilter(inputValue, coinList, setFilteredCoins)
  }
  return (
    <DashContext.Consumer>
      {({ setFilteredCoins, coinList }) =>
        <SearchGrid>
          <h2>Search all coins</h2>
          <SearchInput onKeyUp={(e) => filterCoins(e, setFilteredCoins, coinList)} />
        </SearchGrid>
      }
    </DashContext.Consumer>
  )
}

export { Search as default }