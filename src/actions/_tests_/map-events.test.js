import {updateMapPosition, fetchNewMapData} from '../map-events'
import configureMockStore from 'redux-mock-store'
import { UPDATE_MAP_POSITION } from '../../constants'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Map events handler', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('responds to mouse events', () => {
    const newMousePosition = {
      lat: 34.097,
      long: -15.768,
      zoom: 6
    }

    // Only test that the application fetching works
    const expectedActions = [
      { type: UPDATE_MAP_POSITION, newPosition: newMousePosition}
    ]
    const store = mockStore({})

    store.dispatch(updateMapPosition(newMousePosition))
    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))

  })

})


describe ('Map data fetching', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const mapExtent = {
    lats: [-32.9, -33.0],
    longs: [17.5, 17.6],
    zoom: 6
  }

  it ('fetches gateway markers and info', () => {
    const expectedActions = [
      {}
    ]

    store.dispatch(updateMapPosition(newMousePosition))
    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
  })

  // it ('fetches gateway markers and coverage circles', () => {})
  // it ('fetches gateway markers and radar', () => {})

})
