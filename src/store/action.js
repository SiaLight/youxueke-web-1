import {
  LOGIN
} from '@/store/mutation-types'
import utils from '@/utils'

export default {
  async login (context, { stuId, password }) {
    return utils.request({
      invoke: utils.api.login,
      params: {
        stuId: stuId,
        password: password
      }
    })
      .then(res => {
        if (res.data === 'true') {
          context.commit(LOGIN)
          return Promise.resolve(true)
        } else {
          return Promise.resolve(false)
        }
      })
  }
}
