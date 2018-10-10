import React, { Component } from 'react'
import Promise from 'bluebird'
import { searchRepo, getTag } from '../utils/Api'
import Search from '../components/Search'
import Repos from '../components/Repos'
import Favorites from '../components/Favorites'

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
    this.handleAddFav = this.handleAddFav.bind(this)
    this.handleRmFav = this.handleRmFav.bind(this)
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
    const promises = repos.map(repo => repo.tags_url.then(tag => ({...repo, tag})))
    Promise.all(promises).then((results) => (this.setState({ searchResults: results })))
  }

  handleAddFav (repo) {
    return event => {
      event.preventDefault()
      if (this.state.favoriteRepos.indexOf(repo) < 0) {
        this.setState({favoriteRepos: [...this.state.favoriteRepos, repo]})
      }
    }
  }

  handleRmFav (repo) {
    return event => {
      event.preventDefault()
      const rmIndex = this.state.favoriteRepos.indexOf(repo)
      this.setState({favoriteRepos: this.state.favoriteRepos.filter((repo, i) => i !== rmIndex)})
    }
  }

  render () {
    return (
      <div className='app-container'>
        <div className='header'>
          <h1 style={{ textAlign: 'center', color: 'white' }}> My Github Favorites </h1>
        </div>
        <div className='split left'>
          <div className='searchGrid'>
            <Search handleSearch={this.handleSearch} queryChange={this.queryChange} />
            {this.state.searchResults.length > 0 ? <Repos searchResults={this.state.searchResults} handleAddFav={this.handleAddFav} /> : <div />}
          </div>
        </div>
        <div className='split right'>
          {this.state.favoriteRepos.length > 0 ? <Favorites favoriteRepos={this.state.favoriteRepos} handleRmFav={this.handleRmFav} /> : <div />}
        </div>
      </div>
    )
  }
}
