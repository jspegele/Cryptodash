import React from 'react';
import DashContext from '../context/dash-context'

const Page = ({ name, children }) => (
  <DashContext.Consumer>
    {({page}) => {
      if(page !== name) {
        return null
      }
      return <div>{ children }</div>
      }
    }
  </DashContext.Consumer>
)

export default Page
