import React, { Component } from 'react'
import { connect } from 'react-redux'

class _Home extends Component {
  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const Home = connect(
  mapStateToProps
)(_Home)

export default Home;
export { _Home };
