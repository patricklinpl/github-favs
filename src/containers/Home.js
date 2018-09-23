import React, { Component } from 'react'
import Promise from 'bluebird'
import { searchRepo, getTag } from '../utils/Api'
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
    this.queryChange = this.queryChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleTags = this.handleTags.bind(this)
  }

  queryChange () {
    this.setState({ searchResults: [] })
  }

  handleSearch (query) {
    return event => {
      event.preventDefault()
      this.setState({ query: query })
      searchRepo(query).then(result => {
        const filteredRes = result.map(repo => ((({ full_name, language, tags_url, html_url }) => ({ full_name, language, tags_url: getTag(tags_url), html_url }))(repo)))
        this.handleTags(filteredRes)
      })
    }
  }

  handleTags (repos) {
    var promises = repos.map(repo => 
      repo.tags_url.then(tag => ({...repo, tag}))
    )
    Promise.all(promises).then((results) => {
      this.setState({ searchResults: results })
    })
  }

  render () {
    return (
      <div className='app-container'>
        <div className='header'>
          <h1 style={{ textAlign: 'center' }}> My Github Favorites </h1>
        </div>
        <div className='split left'>
          <h2>Search Bar</h2>
          <Search handleSearch={this.handleSearch} queryChange={this.queryChange} />
          <p>Results</p>
          {this.state.searchResults.length > 0 ? <Repos searchResults={this.state.searchResults} /> : <div />}
        </div>
        <div className='split right'>
          <h2>Favs</h2>
          <p>Repos</p>
        </div>
      </div>
    )
  }
}
