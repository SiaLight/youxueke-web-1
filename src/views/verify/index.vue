<template>
  <course-list :course-list="courseData"></course-list>
</template>

<script>
  import courseList from '@/components/course-list'

  import utils from '@/utils'

  export default {
    name: "index",
    components: { courseList },
    data: () => ({
      courseData: []
    }),
    mounted () {
      utils.request({
        invoke: utils.api.allCourse
      })
        .then(res => {
          this.courseData = res.Course.filter(item => !item.verification)
        })
    }
  }
</script>

<style scoped>

</style>
