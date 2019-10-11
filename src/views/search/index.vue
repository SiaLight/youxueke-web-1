<template>
  <div>
    <v-row justify="start" class="ml-4">
      <v-col cols="12" sm="6" md="4">
        <v-menu
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              prepend-icon="event"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="pickHandler"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <course-list :course-list="courseData"></course-list>
  </div>
</template>

<script>
  import courseList from '@/components/course-list'

  import utils from '@/utils'

  export default {
    name: "index",
    data: () => ({
      date: new Date().toLocaleDateString().replace(/\//g, '-'),
      menu2:false,
      courseData: []
    }),
    components:{ courseList },
    methods: {
      pickHandler (e) {
        this.menu2 = false
        console.log(e)
        this.getCourse(e)
      },
      getCourse (date) {
        utils.request({
          invoke: utils.api.getCourseByDate,
          params: {
            date: date
          }
        })
          .then(res => {
            if (res.status === 'true') this.courseData = res.Course
            else this.courseData = []
          })
      }
    },
    mounted () {
      this.getCourse(new Date().toLocaleDateString().replace(/\//g, '-').split(' ')[0])
    }
  }
</script>

<style scoped>

</style>
