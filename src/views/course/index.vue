<template>
  <v-container>
    <v-card>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1">{{ title }}</v-list-item-title>
          <v-list-item-subtitle>{{ lecturer + '  ' + (category === 0 ? '学生讲师课程' : '研讨课程') }}</v-list-item-subtitle>
          <v-list-item-action-text>{{ fullDate + ' ' + location }}</v-list-item-action-text>
        </v-list-item-content>
        <v-list-item-avatar
          tile
          size="80"
          color="gray"
        >
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item class="introduction">
        {{ introduction }}
      </v-list-item>

      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="editPrompt">
          <template v-slot:activator="{ on }">
            <v-btn
              color="red lighted-2"
              text
              @click="editPrompt = true"
              v-if="identity"
            >修改</v-btn>
          </template>
          <v-card>
            <v-card-title
              class="headline"
              primary-title
            >修改课程信息</v-card-title>
            <v-container>
              <v-row>
                <v-col cols="2"></v-col>
                <v-col cols="8">
                  <v-row>
                    <v-text-field
                      prepend-icon="business"
                      placeholder="课程地点"
                      v-model="location"
                    ></v-text-field>
                  </v-row>
                  <v-row justify="space-around" align="center">
                    <v-date-picker v-model="date" locale="zh-cn"></v-date-picker>
                    <v-time-picker v-model="time" locale="zh-cn"></v-time-picker>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" text>确定</v-btn>
              <v-btn color="primary" text @click="cancelHandler">取消</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn text @click="bookHandler">我要预约</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import utils from '@/utils'

  export default {
    name: "index",
    props: {
      courseId: {
        type: Number,
        default: 0
      }
    },
    beforeRouteEnter (to, from, next) {
      utils.request({
        invoke: utils.api.getCourseByID,
        params: {
          courseId: this.courseId
        }
      })
        .then(res => {
          if (res.data.status === 'true') {
            next(vm => {
              utils.fieldMap(res.data.Course, vm, [
                'title',
                'des',
                'lecturer',
                'location',
                'category',
                (from, to) => to.courseId = from.id,
                (from, to) => to.date = from.date.split(' ')[0],
                (from, to) => to.date = from.date.split(' ')[1]
              ])
            })
          } else {
            next({name: 'search'})
          }
        })
    },
    data: () => ({
      editPrompt: false,
      category: 0,
      title: '计算机网络',
      lecturer: '金加宝',
      introduction: '计算机网络是一门令大家很头疼的课程',
      date: '2019-10-10',
      time: '21:00',
      location: '文史楼302',
      _location: '',
      _date: '',
      _time: ''
    }),
    computed: {
      fullDate () {
        return this.date + ' ' + this.time
      },
      ...mapState([
        'identity'
      ])
    },
    methods: {
      bookHandler () {

      },
      cancelHandler () {
        this._location = this.location
        this._date = this.date
        this._time = this.time
        this.editPrompt = false
      }
    }
  }
</script>

<style scoped>
  .introduction {
    text-indent: 2em;
  }
</style>
