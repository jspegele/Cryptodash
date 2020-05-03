import React from 'react';
import styled, { css } from 'styled-components'
import DashContext from '../context/dash-context'

const ControlButtonElem = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  outline: none;
  margin-left: 30px;
  padding: 0 3px 6px 3px;
  text-align: center;
  ${props => props.active && css`
    border-bottom: 2px solid #5666D5;
  `}
  ${props => props.hidden && css`
    display: none;
  `}
`

const ControlButton = ({ name }) => {
  const toProperCase = (lower) => (
    lower.charAt(0).toUpperCase() + lower.substr(1)
  )
  return (
    <DashContext.Consumer>
      {({firstVisit, page, setPage}) => (
        <ControlButtonElem
          type="button"
          id={name}
          active={page === name}
          onClick={()=> setPage(name)}
          hidden={firstVisit && name === 'dashboard'}
        >
          {toProperCase(name)}
        </ControlButtonElem>
        )}
    </DashContext.Consumer>
  )
}

export { ControlButton as default }