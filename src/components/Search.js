import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Search extends Component {
  constructor (props) {
    super(props)
    this.state = { query: '' }
    this.setQuery = this.setQuery.bind(this)
  }

  setQuery (event) {
    this.setState({ query: event.target.value })
    this.props.queryChange(event.target.value)
  }

  render () {
    return (
      <div className='form'>
        <form onSubmit={this.props.handleSearch(this.state)}>
          <div>
            <input type='text' id='searchBar' value={this.state.query} onChange={this.setQuery} required />
            <input className='btn' type='submit' value='Submit' />
          </div>
        </form>
      </div>
    )
  }
}

Search.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  queryChange: PropTypes.func.isRequired
}
