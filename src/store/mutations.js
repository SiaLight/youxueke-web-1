import {
  TEST,
  LOGIN,
  LOGOUT,
  PROBE
} from './mutation-types'

export default {
  [TEST] (state, { test }) {
    console.log('test')
  },
  [LOGIN] (state, { stuId, identity }) {
    state.loginState = true
    state.stuId = stuId
    state.identity = identity

    window.localStorage.setItem('stuId', stuId)
    window.localStorage.setItem('identity', identity)
  },
  [LOGOUT] (state) {
    state.loginState = false
    state.stuId = null
    state.identity = null

    window.localStorage.clear()
  },
  [PROBE] (state) {
    let stuId = window.localStorage.getItem('stuId')
    let identity = window.localStorage.getItem('identity')
    if (stuId !== null) {
      state.stuId = stuId
      state.loginState = true
    }
    if (identity !== null) state.identity = parseInt(identity)
  }
}
