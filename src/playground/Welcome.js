import React from 'react';
import DashContext from '../context/dash-context'

const Welcome = () => {
  return (
    <DashContext.Consumer>
      {
        ({ firstVisit }) =>
          firstVisit ? (
            <div>Welcome to CryptoDash, please select your favorite coins to begin. {' '}</div>
          ) : null
      }
    </DashContext.Consumer>
  )
}

export { Welcome as default }
