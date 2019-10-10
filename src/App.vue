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
          <v-btn block @click="logoutHandler">注销</v-btn>
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
      @click="dialog = !dialog"
      v-if="loginState"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          <v-row>
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row align="center">
                <v-avatar
                  size="40px"
                  class="mr-4"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="business"
                placeholder="Company"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mail"
                placeholder="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="phone"
                placeholder="(000) 000 - 0000"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="notes"
                placeholder="Notes"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            text
            color="primary"
          >More</v-btn>
          <div class="flex-grow-1"></div>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel</v-btn>
          <v-btn
            text
            @click="dialog = false"
          >Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {},
  computed: {
    ...mapState([
      'loginState'
    ]),
    activeIndex () {
      if (this.$route.path === '/home') return 2
      else if (this.$route.path === '/search') return 0
      else if (this.$route.path === '/verify') return 1
      else return 0
    }
  },
  data: () => ({
    drawer: null,
    dialog: false
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
    }
  }
}
</script>
