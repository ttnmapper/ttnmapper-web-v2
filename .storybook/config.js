import { configure } from '@storybook/react';
import '../src/styling/styling'

// Import other files that would usually be loaded via the html
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'open-iconic/font/css/open-iconic.css'
import 'leaflet/dist/leaflet.css'

const req = require.context('../src/stories', true, /\.stories\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
