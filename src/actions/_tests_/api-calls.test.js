import {getApplication, getApplicationDetail, getDevices} from '../api-calls'

it ('getApplication works', () => {
  expect(getApplication()).toEqual("http://localhost:8080/api/v1/application/")
})

it ('getApplicationDetail works', () => {
  expect(getApplicationDetail("5GHY6")).toEqual("http://localhost:8080/api/v1/application/5GHY6")
})

it ('getDevices works', () => {
  expect(getDevices("5GHY6")).toEqual("http://localhost:8080/api/v1/application/5GHY6/device/")
})

