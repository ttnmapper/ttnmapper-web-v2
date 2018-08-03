import React from 'react';
import { storiesOf } from '@storybook/react';

import { _DeviceCard } from '../components';

storiesOf('Pages', module)
  .add('device-card', () => <_DeviceCard devId="abc" />)
