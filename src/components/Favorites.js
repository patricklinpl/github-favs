import React, { Component } from 'react'
import PropTypes from 'prop-types'

const FavGrid = props => (
  <table className='favTable'>
    <tbody>
      <tr>
        <th>Name</th>
        <th>Language</th>
        <th>Latest Tag</th>
        <th />
      </tr>
      {props.favoriteRepos.map(repo => (
        <tr>
          <td><a href={repo['html_url']}>{repo['full_name']}</a></td>
          <td>{repo['language']}</td>
          <td>{repo['tag']}</td>
          <td><span className="removeFav" onClick={this.props.handleRmFav(repo)}>Remove</span></td>
          <td />
        </tr>
      ))}
    </tbody>
  </table>
)

FavGrid.propTypes = {
  favoriteRepos: PropTypes.array.isRequired,
  handleRmFav: PropTypes.func.favoriteRepos
}

export default class Favorites extends Component {
  render () {
    return (
      <div>
        {this.props.favoriteRepos.length > 0 ? <FavGrid favoriteRepos={this.props.favoriteRepos} /> : <div />}
      </div>
    )
  }
}

Favorites.propTypes = {
  favoriteRepos: PropTypes.array.isRequired,
  handleRmFav: PropTypes.func.favoriteRepos
}
