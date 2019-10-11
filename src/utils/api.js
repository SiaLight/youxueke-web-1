import { service } from './request'

export const test = params => {
  return service.post('/', params)
}

export const login = params => {
  return service.post('/user/login', params)
}

export const bookingList = params => {
  return service.post('/booking/list', params)
}

export const findBook = params => {
  return service.post('/booking/findCourseByStu', params)
}

export const booking = params => {
  return service.post('/booking/add', params)
}

export const getCourseByDate = params => {
  return service.post('/course/findCourseByDate', params)
}

export const getCourseByID = params => {
  return service.post('/course/findCourseById', params)
}

export const addCourse = params => {
  return service.post('/course/add', params)
}

export const verify = params => {
  return service.post('/course/verify', params)
}

export const changeLocation = params => {
  return service.post('/course/changeLocation', params)
}

export const changeDate = params => {
  return service.post('/course/changeDate', params)
}

export const getPosted = params => {
  return service.post('/release/findCourseByTea', params)
}

export const allCourse = params => {
  return service.post('/course/list', params)
}
