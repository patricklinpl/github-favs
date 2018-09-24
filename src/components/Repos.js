import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RepoGrid extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    console.log('The link was clicked.')
  }

  render () {
    return (
      <table className='searchResTable'>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Language</th>
            <th>Latest Tag</th>
            <th />
          </tr>
          {this.props.searchResults.map(repo => (
            <tr>
              <td><a target='_blank' href={repo['html_url']}>{repo['full_name']}</a></td>
              <td>{repo['language']}</td>
              <td>{repo['tag']}</td>
              <td><a href='#' onClick={this.handleClick}>Add</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

RepoGrid.propTypes = {
  searchResults: PropTypes.array.isRequired
}

export default class Repos extends Component {
  render () {
    return (
      <div>
        <br /><br /><br /><br /><br /><br /><br />
        {this.props.searchResults.length > 0 ? <RepoGrid searchResults={this.props.searchResults} /> : <div />}
      </div>
    )
  }
}

Repos.propTypes = {
  searchResults: PropTypes.array.isRequired
}
