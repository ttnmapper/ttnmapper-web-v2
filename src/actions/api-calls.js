const host = 'http://localhost:8080'

export const getApplication = () => {
  return host + "/api/v1/application/"
}

export const getApplicationDetail = (app_id) => {

  return host + "/api/v1/application/" + app_id
}

export const getDevices = (app_id) => {
  return host + "/api/v1/application/"+app_id+ "/device/"
}
