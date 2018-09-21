import React, { Component } from 'react'
import {searchRepo, getTag} from '../utils/Api'
import Search from '../components/Search'
import Repos from '../components/Repos'

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      query: '',
      searchResults: [],
      favoriteRepos: []
    }
    this.handleSearch = this.handleSearch.bind(this)
    this.queryChange = this.queryChange.bind(this)
  }

  queryChange (state) {
    console.log(state)
  }

  handleSearch (state) {
    return event => {
      event.preventDefault()
      this.setState({ query: state.query })
      searchRepo(state.query).then(result => {
        this.setState({ searchResults:
          result.map(repo => (
            (({ full_name, language, tags_url, url }) => ({ full_name, language, tags_url: getTag(tags_url), url }))(repo))
          )
        })
      })
    }
  }

  render () {
    console.log(this.state.searchResults)
    return (
      <div className='app-container'>
        <div className='header'>
          <h1 style={{ textAlign: 'center' }}> My Github Favorites </h1>
        </div>
        <div className='split left'>
          <h2>Search Bar</h2>
          <Search handleSearch={this.handleSearch} queryChange={this.queryChange} />
          <p>Results</p>
          <Repos />
        </div>
        <div className='split right'>
          <h2>Favs</h2>
          <p>Repos</p>
        </div>
      </div>
    )
  }
}
