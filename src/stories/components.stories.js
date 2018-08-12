import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';

import {About,User,Home, HeaderBar, LeaderBoard} from '../components'

import Provider from './provider'

storiesOf('Pages', module)
  .addDecorator(StoryRouter())
  .addDecorator(story => <Provider story={story()} />)
  .add('HeaderBar', () => <HeaderBar />)
  .add('About', () => <About />)
  .add('User', () => <User />)
  .add('Home', () => <Home />)
  .add('LeaderBoard', () => <LeaderBoard />)
