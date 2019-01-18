import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import HeaderGeneric from './HeaderGeneric'

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`
const MainBody = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow: auto;
  font-size: 15px;

  & > ul {
    display: flex;
    height: 100%;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;

    & > li {
      margin: 3%;
    }
  }

  a {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 30px;
    border: 0;
    background: linear-gradient(180deg,
      rgba(255, 255, 255, 0.75) 0%,
      rgba(255, 255, 255, 0.6) 10%,
      rgba(255, 255, 255, 0.5) 90%,
      rgba(221, 221, 221, 0.65) 100%
    );
    box-shadow: 0 0 10px #768a8f;
    color: #ebf5fc;
    font-size: 15px;
    text-decoration: none;
    text-align: center;
    line-height: 24px;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const Home = ({ items }) => {
  return <Wrap>
    <HeaderGeneric />
    <MainBody>
      <ul>
        {items && items.length > 0 && items.map(item =>
          <li key={'item-' + item.name}>
            <Link to={`${item.url}`}>
              {item.name}
            </Link>
          </li>
        )}
      </ul>
    </MainBody>
  </Wrap>
}
export default Home
