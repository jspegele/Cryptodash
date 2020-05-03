import React from 'react'
import styled from 'styled-components'
import DashContext from '../context/dash-context'
import { fontSize1, greenBoxShadow, color3 } from '../styles/Styles'

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize1} 
  padding: 5px;
  cursor: pointer; 
  &:hover {
    ${greenBoxShadow} 
  }
`

export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`

const ConfirmButton = () => {
  return (
    <DashContext.Consumer>
      {({confirmFavorites}) =>
        <CenterDiv>
          <ConfirmButtonStyled onClick={confirmFavorites}>
            Confirm Favorites
          </ConfirmButtonStyled>
        </CenterDiv>
      }
    </DashContext.Consumer>
  )
}

export { ConfirmButton as default}
