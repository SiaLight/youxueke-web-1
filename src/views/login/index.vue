<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="10">
        <v-alert
          type="warning"
          border="left"
          colored-border
          elevation="3"
          transition="scale-transition"
          dense
          dismissible
        >注意不要输入其他同学的学号</v-alert>
      </v-col>
      <v-col cols="10">
        <v-alert
          type="warning"
          border="left"
          colored-border
          elevation="3"
          transition="scale-transition"
          dense
          dismissible
        >如果学号输入错误请联系辅导员老师</v-alert>
      </v-col>
      <v-col cols="10">
        <v-alert
          type="warning"
          border="left"
          colored-border
          elevation="3"
          transition="scale-transition"
          dense
          dismissible
        >优学课小程序版即将推出</v-alert>
      </v-col>
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-avatar size="48" class="mr-4">
              <img
                :src="require('@/assets/logo.png')"
                alt="logo"
              >
            </v-avatar>
            <v-toolbar-title>登陆优学课</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                label="请输入学号"
                name="login"
                prepend-icon="person"
                type="text"
                v-model="stuId"
              ></v-text-field>

              <v-text-field
                id="password"
                label="密码"
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn color="primary" @click="loginHandler">登陆</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex'
  import courseList from '@/components/course-list'
  export default {
    name: "index",
    components: {courseList},
    data: () => ({
      stuId: '',
      password: '',
    }),
    methods: {
      ...mapMutations([
        'LOGIN'
      ]),
      ...mapActions([
        'login'
      ]),
      async loginHandler () {
         this.LOGIN()
        // this.$router.push({name: 'search'})
        if (await this.login({ stuId: this.stuId, password: this.password }))
          this.$router.push({name: 'search'})
        else
          alert('学号或密码错误')
      }
    }
  }
</script>

<style scoped>

</style>
