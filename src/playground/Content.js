import React from 'react'
import DashContext from '../context/dash-context'

const Content = (props) => (
  <DashContext.Consumer>
    {({ coinList, prices, firstVisit }) => {
      if (!coinList) {
        return <div>Loading Coins</div>
      }
      if(!firstVisit && !prices) {
        return <div>Loading Prices</div>
      }
      return <div>{ props.children }</div>
    }}
  </DashContext.Consumer>
)

export default Content
