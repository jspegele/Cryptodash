import React from 'react'
import styled from 'styled-components'
import ControlButton from './ControlButton'

const Logo = styled.div`
  font-size: 1.5em;
`

const Bar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
`

const AppBar = () => (
  <Bar>
    <Logo> CryptoDash </Logo>
    <div>
      <ControlButton active name="dashboard"/>
      <ControlButton name="settings"/>
    </div>
  </Bar>
)

export { AppBar as default }
