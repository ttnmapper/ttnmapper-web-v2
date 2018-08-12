import React from 'react';
import { storiesOf } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import fetchMock from 'fetch-mock';

import { Devices, DeviceCard } from '../components'
import Provider from './provider'
import {demoApplications, demoDevicesS8hYqYUOxdz7h2HoCQ, demoDevicesoH3BWEmZLRony8B9iJ} from './demoData/data'

const delayWith = (value, delay) => new Promise((resolve) => setTimeout(resolve, delay)).then(() => value);

storiesOf('Components', module)
  .addDecorator(StoryRouter())
  .addDecorator(story => <Provider story={story()} />)
  .add('devices', () => {
    fetchMock
      .restore()
      .get('http://localhost:8080/api/v1/application/', demoApplications)
      .get('http://localhost:8080/api/v1/application/demo-app-S8hYqYUOxdz7h2HoCQ/device/', demoDevicesS8hYqYUOxdz7h2HoCQ)
      .get('http://localhost:8080/api/v1/application/demo-app-oH3BWEmZLRony8B9iJ/device/', demoDevicesoH3BWEmZLRony8B9iJ)
    return <Devices />
  })
  .add('devices (delayed)', () => {
    fetchMock
      .restore()
      .get('http://localhost:8080/api/v1/application/', delayWith(demoApplications, 500))
      .get('http://localhost:8080/api/v1/application/demo-app-S8hYqYUOxdz7h2HoCQ/device/', delayWith(demoDevicesS8hYqYUOxdz7h2HoCQ, 1000))
      .get('http://localhost:8080/api/v1/application/demo-app-oH3BWEmZLRony8B9iJ/device/', delayWith(demoDevicesoH3BWEmZLRony8B9iJ, 1500))
    return <Devices />
  })
  .add('device-card', () => <DeviceCard devID="AAABC" />)
