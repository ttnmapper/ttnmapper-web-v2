import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { fetchApplications, fetchApplicationDevices } from '../fetch-data'
import { REQUEST_APPLICATIONS, RECEIVE_APPLICATIONS, RECEIVE_APPLICATIONS_FAILED, REQUEST_DEVICES, RECEIVE_DEVICES, RECEIVE_DEVICES_FAILED } from '../../constants'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const headers = { 'content-type': 'application/json' }
const testApplications = [{"app_id": "testAppID"}]
const testAppID = "testAppID"
const testDevices = [{ "devices": { "dev_id": "testDevice" } }]
const malformedAnswer = "System error"

describe('Application data fetching', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('performs basic data flow to fetch applications and devices', () => {
    // Use getOnce, it is only supposed to ask once
    fetchMock
      .getOnce('http://localhost:8080/api/v1/application/', { body: testApplications, headers: headers })
      .getOnce('http://localhost:8080/api/v1/application/'+testAppID+'/device/', { body: testDevices, headers: headers})

    // Only test that the application fetching works
    const expectedActions = [
      { type: REQUEST_APPLICATIONS },
      { type: RECEIVE_APPLICATIONS, data: [{ "app_id": testAppID }] },
    ]
    const store = mockStore({})

    return store.dispatch(fetchApplications()).then(() => {
      expect(store.getActions()).toEqual(expect.arrayContaining(expectedActions))
    })
  })

  it('fails gracefully when responses are invalid', () => {
    fetchMock
      .get('http://localhost:8080/api/v1/application/', { body: malformedAnswer, headers: headers })

    const expectedActions = [
      { type: REQUEST_APPLICATIONS },
      { type: RECEIVE_APPLICATIONS_FAILED},
    ]
    const store = mockStore({})

    return store.dispatch(fetchApplications()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})


describe('Device data fetching', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  /*
  Check that the basic dat a can be fetched and returned
  */
  it('performs basic data flow to fetch devices', () => {
    fetchMock
      .getOnce('http://localhost:8080/api/v1/application/'+testAppID+'/device/', { body: testDevices, headers: headers})

    const expectedActions = [
      { type: REQUEST_DEVICES, data: { "app_id": testAppID } },
      { type: RECEIVE_DEVICES, data: { "testDevice": testDevices[0] } }
    ]
    const store = mockStore({})

    return store.dispatch(fetchApplicationDevices(testAppID)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  /*
  Check that the code responds correctly to bad answers from the server
  */
  it('fails gracefully when responses are invalid', () => {
    fetchMock
    .getOnce('http://localhost:8080/api/v1/application/'+testAppID+'/device/', { body: malformedAnswer, headers: headers})

    const expectedActions = [
      { type: REQUEST_DEVICES, data: {"app_id": testAppID}},
      { type: RECEIVE_DEVICES_FAILED}
    ]
    const store = mockStore({})

    return store.dispatch(fetchApplicationDevices(testAppID)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

/*
describe('async data fetching flow', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('performs entire data flow', () => {
    fetchMock
      .getOnce('http://localhost:8080/api/v1/application/', { body: [{"app_id": "demo-app-S8hYqYUOxdz7h2HoCQ"}], headers: { 'content-type': 'application/json' } })
      .getOnce('http://localhost:8080/api/v1/application/demo-app-S8hYqYUOxdz7h2HoCQ/device/', { body: {"empty": "data"}, headers: { 'content-type': 'application/json' } })


    const expectedActions = [
      { type: REQUEST_APPLICATIONS },
      { type: RECEIVE_APPLICATIONS, data: [{"app_id": "demo-app-S8hYqYUOxdz7h2HoCQ"}]},
      { type: REQUEST_DEVICES, data: {"app_id": "demo-app-S8hYqYUOxdz7h2HoCQ"}},
      { type: RECEIVE_DEVICES_FAILED}
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(fetchApplications()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})*/
