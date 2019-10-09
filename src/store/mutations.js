import {
  TEST,
  LOGIN, LOGOUT
} from './mutation-types'

export default {
  [TEST] (state, { test }) {
    console.log('test')
  },
  [LOGIN] (state) {
    state.loginState = true
  },
  [LOGOUT] (state) {
    state.loginState = false
  }
}
