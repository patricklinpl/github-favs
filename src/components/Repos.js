import React, { Component } from 'react'
import PropTypes from 'prop-types'

const RepoGrid = props => (
  <div>
    <table border='1'>
      <tbody>
        <tr>
          <th>Name</th>
          <th>Language</th>
          <th>Latest Tag</th>
          <th />
        </tr>
        {props.searchResults.map(repo => (
          <tr>
            <td><a href={repo['url']}>{repo['full_name']}</a></td>
            <td>{repo['language']}</td>
            <td>{repo['tag']}</td>
            <td />
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

RepoGrid.propTypes = {
  searchResults: PropTypes.array.isRequired
}

export default class Repos extends Component {
  render () {
    console.log(this.props.searchResults)
    return (
      <div>
        {this.props.searchResults.length > 0 ? <RepoGrid searchResults={this.props.searchResults} /> : <div />}
      </div>
    )
  }
}

Repos.propTypes = {
  searchResults: PropTypes.array.isRequired
}
