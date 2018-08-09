import {applicationsDetails, applicationsGeneral} from '../applications'

describe('Application Reducer', () => {
  it ('should return the initial state', () => {

    expect(applicationsDetails(undefined, {}))
    .toEqual([])

    expect(applicationsGeneral(undefined, {}))
    .toEqual({last_updated: null, state: "none"})
  })
})
