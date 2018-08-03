import React, { Component } from 'react'
import { connect } from 'react-redux'

class _HeaderBar extends Component {
  render() {
    return (
    <div>HeaderBar</div> )
  }
  /*
      <nav id="navbar" className="navbar navbar-dark navbar-expand-xl">
        <nav className="navbar">
          <Link className="nav-link" to="/">
            <img src="/images/logo.png" width="30" height="30" className="d-inline-block align-top" alt="" />
            TTN Mapper
          </Link>
        </nav>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapsable" aria-controls="navbarCollapsable" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarCollapsable">
          <ul className="navbar-nav">
            <li className="nav-item ">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/leaderboard">Leader Board</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/user">My Data</Link>
            </li>

          </ul>
        </div>
      </nav>
    )
  }*/
}

const mapStateToProps = state => ({
})

const HeaderBar = connect(
  mapStateToProps
)(_HeaderBar)

export default HeaderBar
export { _HeaderBar,  }
