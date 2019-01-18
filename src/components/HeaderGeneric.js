import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = styled.div`
  h1 {
    position: relative;
    display: inline-block;
    height: 45px;
    line-height: 45px;
    font-size: 17px;
    letter-spacing: 0.4px;
    color: #fff;
    padding: 0 20px;
  }

  h1 span {
    padding: 0 0 0 5px;
  }

  a {
    text-decoration: none;
  }
`
const NavA = styled.span`
  color: #fff;
  display: inline-block;
  font-size: 17px;
  height: 45px;
  letter-spacing: 0.4px;
  line-height: 45px;
  padding: 0 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  width: 100%;
`
const HeaderGeneric = () => <Header>
  <h1>
    <NavA>
      <Link to={'/'}>
        React Server-Side Rendering Example
      </Link>
    </NavA>
  </h1>
</Header>

export default HeaderGeneric
