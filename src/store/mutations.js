import {
  TEST
} from './mutation-types'

export default {
  [TEST] (state, { test }) {
    console.log('test')
  }
}
