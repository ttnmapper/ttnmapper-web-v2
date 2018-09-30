import { updateMapPosition, fetchNewMapData } from '../map-events'
import configureMockStore from 'redux-mock-store'
import { UPDATE_MAP_POSITION, mapConstants } from '../../constants'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const headers = { 'content-type': 'application/json' }
const sampleGateways = { "gateways": ["gw_001", "gw_002", "gw_003"], "error": false }
const sampleGatewayInfo = {
  "details": {
    "description": "sampleDesc",
    "lat": "-10",
    "lon": "20",
    "last_heard": "1535392200",
    "channels": "8",
    "gwaddr": "gw_001"
  },
  "error": false
}

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
      { type: UPDATE_MAP_POSITION, newPosition: newMousePosition }
    ]
    const store = mockStore({})

    store.dispatch(updateMapPosition(newMousePosition))
    expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
  })
})

describe('Map data fetching', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const mapExtent = {
    lats: [-32.9, -33.0],
    longs: [17.5, 17.6],
    zoom: 6
  }
  const dataToFetch = {}
  const knownGateways = []

  it('fetches gateway markers and info', () => {
    fetchMock
      .post('http://localhost:8080/old_api/gwbbox.php', { body: sampleGateways, headers: headers })
      .get('http://localhost:8080/old_api/gwdetails.php?gwaddr=gw_001', { body: sampleGatewayInfo, headers: headers })
      .get('http://localhost:8080/old_api/gwdetails.php?gwaddr=gw_002', { body: sampleGatewayInfo, headers: headers })
      .get('http://localhost:8080/old_api/gwdetails.php?gwaddr=gw_003', { body: sampleGatewayInfo, headers: headers })

    const expectedActions = [
      { type: mapConstants.REQUEST_MAP_GATEWAYS },
      { type: mapConstants.RECEIVE_MAP_GATEWAYS, listOfGateways:sampleGateways.gateways },
      { type: mapConstants.RECEIVE_GATEWAY_DETAILS, gatewayID: "gw_001", gatewayDetails: sampleGatewayInfo},
      { type: mapConstants.RECEIVE_GATEWAY_DETAILS, gatewayID: "gw_002", gatewayDetails: sampleGatewayInfo},
      { type: mapConstants.RECEIVE_GATEWAY_DETAILS, gatewayID: "gw_003", gatewayDetails: sampleGatewayInfo}
    ]
    const store = mockStore({})

    return store.dispatch(fetchNewMapData(mapExtent, dataToFetch, knownGateways)).then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  // it ('fails gracefully if the fetching of visible gateways does not work', () => {
  //   fetchMock
  //     .post('http://localhost:8080/old_api/gwbbox.php', { body: "Error 404", headers: headers })

  //   const expectedActions = [
  //     { type: mapConstants.REQUEST_MAP_GATEWAYS },
  //     { type: mapConstants.RECEIVE_MAP_GATEWAYS_FAILED }
  //   ]
  //   const store = mockStore({})

  //   return store.dispatch(fetchNewMapData(mapExtent, dataToFetch, knownGateways)).then(() => {
  //     expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
  //   })
  // })

  // it ('fetches gateway markers and coverage circles', () => {})
  // it ('fetches gateway markers and radar', () => {})

})
