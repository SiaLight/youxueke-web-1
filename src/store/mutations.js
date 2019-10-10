import {
  TEST,
  LOGIN,
  LOGOUT
} from './mutation-types'
import utils from '@/utils'

export default {
  [TEST] (state, { test }) {
    utils
    console.log('test')
  },
  [LOGIN] (state) {
    state.loginState = true
  },
  [LOGOUT] (state) {
    state.loginState = false
  }
}
