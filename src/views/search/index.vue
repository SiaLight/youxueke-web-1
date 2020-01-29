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
      courseData: [
          {
              id: 1,
              title: '操作系统',
              trueName: '张同学',
              location: '理科大楼',
              date: '2019-12-12',
              verification: true,
              img:'../assets/logo.png',
              des:'速度滑冰  三人同行染色体和 素人特工任务提供'
          },
          {
              id: 1,
              title: '操作系统',
              trueName: '张同学',
              location: '理科大楼',
              date: '2019-12-13',
              verification: true,
              img:'../assets/logo.png',
              des:'速度滑冰  三人同行染色体和 素人特工任务提供'
          }
    ]
    }),
    components:{ courseList },
    methods: {
      pickHandler (e) {
        this.menu2 = false
        console.log(e)
        this.getCourse(e)
      },
        changeHandler(){

        },
      getCourse (date) {
      //   utils.request({
      //     invoke: utils.api.getCourseByDate,
      //     params: {
      //       date: date
      //     }
      //   })
      //     .then(res => {
      //       if (res.status === 'true') this.courseData = res.Course
      //       else this.courseData = []
      //     })
     }
    },
    mounted () {
      this.getCourse(new Date().toLocaleDateString().replace(/\//g, '-').split(' ')[0])
    }

  }
</script>

<style scoped>

</style>
