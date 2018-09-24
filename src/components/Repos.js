import React, { Component } from 'react'
import PropTypes from 'prop-types'

class RepoGrid extends Component {
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
              <td><span className="fav" onClick={this.props.handleAddFav(repo)}>Add</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

RepoGrid.propTypes = {
  searchResults: PropTypes.array.isRequired,
  handleAddFav: PropTypes.func.isRequired
}

export default class Repos extends Component {
  render () {
    return (
      <div>
        <br /><br /><br /><br /><br /><br /><br />
        {this.props.searchResults.length > 0 ? <RepoGrid searchResults={this.props.searchResults} handleAddFav={this.props.handleAddFav} /> : <div />}
      </div>
    )
  }
}

Repos.propTypes = {
  searchResults: PropTypes.array.isRequired,
  handleAddFav: PropTypes.func.isRequired
}
