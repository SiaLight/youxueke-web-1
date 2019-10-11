<template>
  <div>
    <v-row justify="start" class="ml-4">
      <v-col cols="4" sm="3" md="2">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
          @change="changeHandler"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <div class="d-flex justify-center align-center">
    <course-cell v-for="(item, index) in courseList" :key="item.id" :index="index" :item="item"></course-cell>
    </div>
  </div>
</template>

<script>
  import courseCell from '../../components/course-cell.vue'
  import utils from '@/utils'
  export default {
    name: "index",
    data: () => ({
      date: new Date().toLocaleDateString().replace(/\//g, '-'),
      menu2:false,
      courseList:[]
    }),
    components:{courseCell },
    methods: {
      showCourse (e) {
        console.log(e)
      },
      changeHandler (info) {
        utils.request({
          invoke: utils.api.getCourseByDate,
          params: {
            date: info.date
          },
          result: utils.api.GET_COURSE_LIST_BY_DATE
        })
          .then(function (res) {
            this.courseList = []
            this.courseList.push(...res.data.course)
          }.bind(this))
        console.log(this.courseList)
      }
      },
    mounted () {
      console.log('mounted')
      console.log(this)
      this.changeHandler({ date: new Date().toLocaleDateString().replace(/\//g, '-') })
    }

  }
</script>

<style scoped>

</style>
