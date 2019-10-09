import service from './request'

export const test = params => {
  return service.post('/', params)
}
