import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {fetchApplications} from '../fetch-data'
import { REQUEST_APPLICATIONS, RECEIVE_APPLICATIONS, RECEIVE_APPLICATIONS_FAILED, REQUEST_DEVICES, RECEIVE_DEVICES} from '../../constants'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  const sampleDevices = [{"devices":{"dev_id":"test"}}]

  it('creates RECEIVE_APPLICATIONS when applications has been fetched', () => {
    fetchMock
      .getOnce('http://localhost:8080/api/v1/application/', { body: [{"app_id": "demo-app-S8hYqYUOxdz7h2HoCQ"}], headers: { 'content-type': 'application/json' } })
      .getOnce('http://localhost:8080/api/v1/application/demo-app-S8hYqYUOxdz7h2HoCQ/device/', { body: sampleDevices, headers: { 'content-type': 'application/json' } })


    const expectedActions = [
      { type: REQUEST_APPLICATIONS },
      { type: RECEIVE_APPLICATIONS, data: [{"app_id": "demo-app-S8hYqYUOxdz7h2HoCQ"}]},
      { type: REQUEST_DEVICES, data: {"app_id": "demo-app-S8hYqYUOxdz7h2HoCQ"}}
    ]
    const store = mockStore({ todos: [] })

    return store.dispatch(fetchApplications()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
