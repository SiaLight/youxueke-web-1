<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
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
            <v-toolbar-title>请登陆</v-toolbar-title>
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
  import utils from '@/utils'

  export default {
    name: "index",
    data: () => ({
      stuId: '',
      password: ''
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
        this.$router.push({name: 'home'})
        // if (await this.login({ stuId: this.stuId, password: this.password }))
        //   this.$router.push({name: 'home'})
        // else
        //   alert('学号或密码错误')
      }
    }
  }
</script>

<style scoped>

</style>
