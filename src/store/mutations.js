import {
  TEST,
  LOGIN,
  LOGOUT
} from './mutation-types'

export default {
  [TEST] (state, { test }) {
    console.log('test')
  },
  [LOGIN] (state, { stuId, identity }) {
    state.loginState = true
    state.stuId = stuId
    state.identity = identity
  },
  [LOGOUT] (state) {
    state.loginState = false
    state.stuId = null
    state.identity = null
  }
}
