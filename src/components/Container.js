import React from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import api from '../api'
import Home from './Home'
import ItemPage from './ItemPage'

const Footer = styled.div`
  bottom: 0;
  font-size: 14px;
  height: 60px;
  left: 0;
  line-height: 60px;
  position: absolute;
  text-align: center;
  width: 100%;
`
class Container extends React.PureComponent {
  constructor (props) {
    super(props)
    let stateObj = {}
    if (props.pageObj) {
      stateObj.page = props.pageObj.page
      if (props.pageObj.page === 'home') {
        stateObj.items = props.result.items
      } else if (props.pageObj.page === 'item') {
        stateObj.item = props.result.item
      }
    }
    this.state = stateObj
    this.renderHead = this.renderHead.bind(this)
  }
  async componentDidUpdate () {
    const pageObj = api.getPage(this.props.location.pathname)
    let stateObj = {}
    let res
    if (this.state.page !== pageObj.page) {
      stateObj.page = pageObj.page
      if (pageObj.page === 'home' && !this.state.items) {
        res = await api.getItems()
        stateObj.items = res.items
      } else if (pageObj.page === 'item') {
        res = await api.getItem()
        stateObj.item = res.item
      }
      this.setState(stateObj)
    }
  }
  renderFooter () {
    return <Footer>
      <span>React SSR Boilerplate by Azai <span>{new Date().getFullYear()}</span></span>
    </Footer>
  }
  renderHead () {
    const { item } = this.state
    const title = (item && item.name) ? item.name : 'React-SSR'
    const description = (item && item.desc) ? item.desc : 'A React SSR Boilerpate'
    return <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  }
  render () {
    const { item, items, page } = this.state
    return <div>
      {this.renderHead()}
      {page === 'home' && <Home items={items} />}
      {page === 'item' && <ItemPage item={item} />}
      {this.renderFooter()}
    </div>
  }
}

export default Container
