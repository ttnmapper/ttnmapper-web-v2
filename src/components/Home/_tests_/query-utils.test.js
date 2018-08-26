import {parseCoordsFromQuery} from '../query-utils'

describe('Query parsing', () => {
  it ('parses query correctly', () => {
    const basicInput = "?lat=15&long=13&zoom=5"
    const expectedResult = {lat:"15", long:"13",zoom:"5"}

    expect(parseCoordsFromQuery(basicInput)).toEqual(expectedResult)
  })
})
