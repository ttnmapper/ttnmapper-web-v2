import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import {About,User,Home, HeaderBar, LeaderBoard} from '../components'
import {_HeaderBar } from '../components/HeaderBar/HeaderBar'

import Provider from './provider'

const loggedInUserState = {
  loggedIn: true,
  userName: "Test User"
}

const loggedOutUserState = {
  loggedIn: false
}

storiesOf('Pages', module)
  .addDecorator(StoryRouter())
  .addDecorator(story => <Provider story={story()} />)
  .add('HeaderBar (logged out)', () =><_HeaderBar userState={loggedOutUserState}/>)
  .add('HeaderBar (logged in)', () => <_HeaderBar userState={loggedInUserState} />)
  .add('About', () => <About />)
  .add('User', () => <User />)
  .add('Home', () => <Home />)
  .add('LeaderBoard', () => <LeaderBoard />)
