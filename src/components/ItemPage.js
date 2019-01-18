import React from 'react'
import styled from 'styled-components'
import HeaderGeneric from './HeaderGeneric'

const Wrap = styled.div`
  height: 100%;
  width: 100%;
`
const MainBody = styled.div`
  font-size: 15px;
  height: 100%;
  left: 0;
  overflow-y: scroll;
  overflow: auto;
  position: absolute;
  top: 0;
  width: 100%;
`
const Content = styled.div`
  margin: 50px auto;
  width: 80%;
`
const ItemPage = ({ item }) => {
  return <Wrap>
    <HeaderGeneric />
    <MainBody>
      <Content>
        <p>{item.name}</p>
        <p>{item.desc}</p>
      </Content>
    </MainBody>
  </Wrap>
}
export default ItemPage
