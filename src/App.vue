<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      v-if="loginState"
    >
      <v-list dense>
        <v-list-item-group v-model="activeIndex">
          <v-list-item @click="$router.push({ name: 'search' })">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>查找课程</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'bookings' })">
            <v-list-item-action>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>已约课程</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'verify' })">
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>审核课程</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="$router.push({ name: 'home' })">
            <v-list-item-action>
              <v-icon>mdi-settings</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>我的信息</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-dialog
            v-model="logoutPrompt"
            width="500"
          >
            <template v-slot:activator="{ on }">
              <v-btn block @click="logoutPrompt = true">注销</v-btn>
            </template>

            <v-card>
              <v-card-title
                class="headline grey lighten-2"
                primary-title
              >
                提示
              </v-card-title>

              <v-card-text>确定要退出吗？</v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn
                  color="primary"
                  text
                  @click="logoutPrompt = false"
                  >
                  取消
                </v-btn>
                <v-btn
                  color="primary"
                  text
                  @click="logoutHandler"
                >
                  确认
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
      v-if="loginState"
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" style="color:white"></v-app-bar-nav-icon>
      <v-toolbar-title style="color:white">优学课</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-btn
      title="发布课程"
      bottom
      color="primary"
      dark
      fab
      fixed
      right
      @click="addCoursePrompt = !addCoursePrompt"
      v-if="loginState"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="addCoursePrompt"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          发布课程
        </v-card-title>
        <v-container>
          <v-row>
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row align="center">
                <v-text-field
                  prepend-icon="mdi-contact"
                  placeholder="课程名称"
                  v-model="title"
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="business"
                placeholder="主讲人姓名"
                v-model="trueName"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                placeholder="主讲人手机号码"
                v-model="phone"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-radio-group v-model="category" row>
                <v-radio label="普通课程" :value="0"></v-radio>
                <v-radio label="研讨课" :value="1"></v-radio>
              </v-radio-group>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mail"
                placeholder="上课地点"
                v-model="location"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-date-picker v-model="date" locale="zh-cn"></v-date-picker>
            </v-col>
            <v-col cols="6">
              <v-time-picker v-model="time" locale="zh-cn"></v-time-picker>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="notes"
                placeholder="课程介绍"
                v-model="introduction"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-file-input
                placeholder="请上传课程的简介图片"
                v-model="image"
                @change="imageUpload"
              >
              </v-file-input>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            text
            color="primary"
            @click="addCoursePrompt = false"
          >取消</v-btn>
          <v-btn
            text
            @click="addCourseHandler"
          >确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import utils from '@/utils'

export default {
  name: 'App',
  components: {},
  computed: {
    ...mapState([
      'loginState',
      'stuId',
      'identity'
    ]),
    activeIndex () {
      if (this.$route.path === '/search') return 0
      else if (this.$route.path === '/bookings') return 1
      else if (this.$route.path === '/verify') return 2
      else if (this.$route.path === '/home') return 3
      else return null
    }
  },
  data: () => ({
    drawer: null,
    addCoursePrompt: false,
    logoutPrompt: false,
    title: '',
    trueName: '',
    phone: '',
    introduction: '',
    date: '',
    time: '',
    location: '',
    image: null,
    category: 1
  }),
  created () {
    this.$vuetify.theme.dark = false
  },
  methods: {
    ...mapMutations([
      'LOGOUT'
    ]),
    logoutHandler () {
      this.LOGOUT()
      this.$router.push({ name: 'login' })
      this.logoutPrompt = false
    },
    addCourseHandler () {
      if (this.category === 0 && this.identity !== 1) {
        alert('学生导师才可以发布此类课程')
        return
      }
      this.addCoursePrompt = false
      utils.request({
        invoke: utils.api.addCourse,
        params: {
          title: this.title,
          des: this.introduction,
          stuId: this.stuId,
          location: this.location,
          date: this.date + ' ' + this.time,
          category: this.category,
          trueName: this.trueName,
          phone: this.phone
        }
      })
    },
    imageUpload (e) {
      console.log(e)
    }
  }
}
</script>
