import React, { Component } from 'react'
import { connect } from 'react-redux'

import mapperImage from './mapper_1.png';

class _About extends Component {
  render() {
    return (
      <div className="container textBlock">
        <div className="col" />
        <div className="col-8" >
          <div className="row header-row">
            <h1 className="display-4">About</h1>
          </div>
          <div className="row big-text-field" id="about-text">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate leo est, eget congue
              lacus bibendum nec. Aenean turpis arcu, semper in molestie eget, faucibus a purus. Vestibulum
              ultricies congue erat, vel dapibus lacus dignissim sit amet. Duis eu lacinia metus. Etiam
              vitae eleifend augue, non consectetur purus. Aliquam vitae massa efficitur tellus scelerisque
              posuere non ultrices nunc. Cras dignissim massa metus, ornare varius nunc placerat a.
              Suspendisse scelerisque neque eu nibh suscipit, sed efficitur erat vehicula. Mauris porttitor
              quis nunc vitae pellentesque. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Donec laoreet placerat sem ac euismod. Quisque sit amet mollis massa. In vel vulputate dolor,
              nec fermentum massa.
        </p>
            <div>
              <img src={mapperImage} width="200px" alt="" style={{ float: "right" }} />
              <p>
                Vestibulum at justo metus. Curabitur libero magna, viverra a tellus ac, ultrices faucibus
                neque. Quisque ac leo porttitor diam porta cursus a id tellus. Cras volutpat lacus in turpis
                porttitor posuere sed ac felis. Morbi fermentum quis sapien a malesuada. Aenean ut ex urna.
                Maecenas et elit ante.
        </p>
              <p>
                Vestibulum quis augue eget lectus consectetur feugiat vel ut odio. Praesent ante magna,
                facilisis in odio venenatis, congue venenatis urna. Mauris condimentum odio eget molestie
                semper. Cras in lacus turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                purus ligula, dapibus aliquet elementum quis, semper id nulla. Vivamus quis facilisis massa.
                Suspendisse potenti. Sed vestibulum auctor quam ac bibendum. Phasellus interdum tellus ut elit
                lobortis, eu malesuada lorem pellentesque. Fusce iaculis nisi aliquam consectetur interdum.
                Suspendisse facilisis augue at metus fermentum imperdiet. Proin vulputate semper commodo.
                Phasellus a aliquam nunc.
          </p>
            </div>

            <p>
              Donec maximus felis a nisi interdum, a tempor tortor consectetur. Quisque viverra eros sed
              lectus tristique, a euismod quam sollicitudin. Donec sem ligula, lacinia eget lectus vel,
              convallis dignissim nisl. Vestibulum venenatis bibendum odio, nec vehicula nisl semper vitae.
              Donec efficitur mi in bibendum elementum. Quisque justo arcu, faucibus eu sapien sed,
              scelerisque pellentesque massa. Aliquam massa elit, porttitor sit amet pretium eu, dapibus a
              elit. Maecenas euismod aliquet volutpat.
        </p>
            <p>
              Nulla eget lorem dui. Etiam dignissim pretium mauris in rhoncus. Etiam id volutpat risus. Ut
              eget nibh arcu. Etiam aliquam orci vel dui rhoncus auctor. Vestibulum aliquet metus vel quam
              porttitor, eu tempor mauris blandit. Maecenas eros neque, rutrum eget purus quis, vehicula
              ultricies odio. Quisque euismod sem vitae diam blandit hendrerit. Duis volutpat lacus in
              convallis egestas. Etiam congue fermentum porttitor. Pellentesque at purus vitae ex malesuada
              blandit in nec ante. Morbi quis orci nisi. Aenean porttitor eros quis facilisis convallis.
              Praesent tincidunt nunc quis lacinia fermentum. Pellentesque rhoncus justo quam, a blandit
              tortor tristique vel.
        </p>
            <p>
              Donec iaculis nibh justo, a consequat massa egestas interdum. Praesent aliquam sapien
              ullamcorper risus tincidunt, ut blandit risus lacinia. Mauris eu eros luctus nibh porttitor
              ullamcorper id nec est. Suspendisse et ligula nec nunc malesuada semper. Donec egestas
              molestie ipsum, a facilisis mi efficitur id. Ut porta molestie fermentum. Nam sem purus,
              aliquam et maximus ut, lobortis convallis lorem. Donec dapibus et nibh id aliquam. Nullam
              consequat massa quis risus mattis, porttitor consequat turpis ultrices. Nunc auctor massa
              nulla, in maximus lectus accumsan a. Pellentesque et nisi ornare, viverra risus non, tincidunt
              augue. Ut mollis massa nec risus commodo mollis. Vivamus condimentum, lacus quis maximus
              feugiat, dolor erat dapibus dolor, sit amet tincidunt massa augue et neque. Nulla eu feugiat
              velit. Ut odio lorem, tempor sit amet ultricies nec, ornare nec dolor.
        </p>
            <p>
              Morbi interdum viverra ante, commodo vehicula lorem eleifend nec. Nam quam mauris, aliquet eu
              erat sit amet, rutrum lacinia lorem. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Praesent rutrum et elit non dapibus. Cras rhoncus maximus
              dolor, ac dignissim nisi. Nunc ut metus id diam lacinia dapibus sed vel elit. Nullam vel
              sollicitudin dolor. Pellentesque consectetur quam at luctus ultrices. Nullam vehicula eget
              tortor eget egestas. Phasellus eget finibus dui.
        </p>

          </div>
        </div>
        <div className="col" />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const About = connect(
  mapStateToProps
)(_About)

export default About;
export { _About }
