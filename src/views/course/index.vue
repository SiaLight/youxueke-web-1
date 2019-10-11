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
        <v-dialog v-if="identity === 3 && verification === 0" v-model="editPrompt">
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
                      v-model="locationCopy"
                    ></v-text-field>
                  </v-row>
                  <v-row justify="space-around" align="center">
                    <v-date-picker v-model="dateCopy" locale="zh-cn"></v-date-picker>
                    <v-time-picker v-model="timeCopy" locale="zh-cn"></v-time-picker>
                  </v-row>
                </v-col>
              </v-row>
            </v-container>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="primary" text @click="alterHandler">确定</v-btn>
              <v-btn color="primary" text @click="cancelHandler">取消</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="bookPrompt" v-if="identity !== 3 && !booked && verification" >
          <template v-slot:activator="{ on }">
            <v-btn text @click="bookPrompt = true">我要预约</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">请输入你的信息</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
<!--                    <v-text-field label="学号" v-model="bookerId"></v-text-field>-->
                    <v-text-field label="手机号码" v-model="bookerPhone"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="bookPrompt = false">取消</v-btn>
              <v-btn color="blue darken-1" text @click="bookHandler">预约</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn disabled text v-if="identity !== 3 && booked">您已预约过此课程</v-btn>
        <v-btn disabled text v-if="identity !== 3 && !verification">此课程尚未通过审核</v-btn>
        <v-btn text v-if="identity === 3 && verification === 0" @click="verifyHandler">通过</v-btn>
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
      courseId: String
    },
    beforeRouteEnter (to, from, next) {
      utils.request({
        invoke: utils.api.getCourseByID,
        params: {
          courseId: parseInt(to.params.courseId)
        }
      })
        .then(res => {
          if (res.status === 'true') {
            next(vm => {
              utils.fieldMap(res.Course, vm, [
                'title',
                'des:introduction',
                'trueName:lecturer',
                'category',
                'id:courseId',
                'verification',
                (from, to) => to.date = to.dateCopy = from.date.split(' ')[0],
                (from, to) => to.time = to.timeCopy = from.date.split(' ')[1],
                (from, to) => to.location = to.locationCopy = from.location
              ])

              utils.request({
                invoke: utils.api.findBook,
                params: {
                  stuId: vm.stuId
                }
              })
                .then(res => {
                  if (res.Course.some(item => item.id === parseInt(to.params.courseId))) vm.booked = true
                })
            })
          } else {
            next({name: 'search'})
          }
        })
    },
    data: () => ({
      editPrompt: false,
      bookPrompt: false,
      category: 0,
      title: '',
      lecturer: '',
      introduction: '',
      date: '',
      time: '',
      location: '',
      locationCopy: '',
      dateCopy: '',
      timeCopy: '',
      bookerId: '',
      bookerPhone: '',
      booked: ''
    }),
    computed: {
      fullDate () {
        return this.date + ' ' + this.time
      },
      ...mapState([
        'stuId',
        'identity'
      ])
    },
    methods: {
      bookHandler () {
        utils.request({
          invoke: utils.api.booking,
          params: {
            stuId: this.stuId,
            courseId: parseInt(this.courseId),
            phone: this.bookerPhone
          }
        })
          .then(res => {
            if (res === true) {
              this.bookPrompt = false
              this.$router.replace({ name: 'search' })
            } else alert('预约失败')
          })
      },
      cancelHandler () {
        this.locationCopy = this.location
        this.dateCopy = this.date
        this.timeCopy = this.time
        this.editPrompt = false
      },
      verifyHandler () {
        utils.request({
          invoke: utils.api.verify,
          params: {
            courseId: parseInt(this.courseId)
          }
        })
          .then(res => {
            if (res === true) this.$router.replace({ name: 'verify' })
            else alert('通过失败')
          })
      },
      alterHandler () {
        if (this.locationCopy !== this.location) {
          utils.request({
            invoke: utils.api.changeLocation,
            params: {
              courseId: parseInt(this.courseId),
              location: this.locationCopy
            }
          })
            .then(res => {
              if (res === true) {
                this.location = this.locationCopy
              } else alert('地点修改失败')
            })
        }

        if (this.time !== this.timeCopy || this.date !== this.dateCopy) {
          utils.request({
            invoke: utils.api.changeDate,
            params: {
              courseId: this.courseId,
              date: this.dateCopy + ' ' + this.timeCopy
            }
          })
            .then(res => {
              if (res === true) {
                this.date = this.dateCopy
                this.time = this.timeCopy
              } else alert('时间修改失败')
            })
        }

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
