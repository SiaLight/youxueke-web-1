<template>
  <v-list>
    <v-list-item>
      <course-cell
        v-for="item in courseList"
        :key="item.courseId"
        :title="item.title"
        :lecturer="item.lecturer"
        :course-id="item.courseId"
        :location="item.location"
        :date="item.date"
        :verification="item.verification"
        :img="item.img"
      ></course-cell>
    </v-list-item>
  </v-list>
</template>

<script>
  import courseCell from '@/components/course-cell'

  export default {
    name: "course-list",
    components: { courseCell },
    props: {
      courseList: {
        type: Array,
        default: []
      }
    }
  }
</script>

<style scoped>

</style>
