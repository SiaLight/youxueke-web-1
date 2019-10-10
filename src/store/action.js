import {
  LOGIN
} from '@/store/mutation-types'
import utils from '@/utils'
const SHA256 = require('crypto-js/sha256')

export default {
  async login (context, { stuId, password }) {
    return utils.request({
      invoke: utils.api.login,
      params: {
        stuId: stuId,
        password: SHA256(password).toString(),
        avatar: '',
        name: ''
      }
    })
      .then(res => {
        if (res.data.status === 'true') {
          context.commit(LOGIN, {
            stuId: res.data.userInfo.stuId,
            identity: res.data.userInfo.identity
          })
          return Promise.resolve(true)
        } else {
          return Promise.resolve(false)
        }
      })
  }
}
