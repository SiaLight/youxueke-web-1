<template>
  <div class="d-flex justify-center">
      <v-container>
        <v-row dense>
          <v-col v-for="item in courseList" cols="12" :key="item.id">
            <course-cell
              :key="item.id"
              :title="item.title"
              :lecturer="item.trueName"
              :course-id="item.id"
              :location="item.location"
              :date="item.date"
              :verification="item.verification"
              :img="item.img"
              :des="item.des"
            ></course-cell>

          </v-col>
        </v-row>
      </v-container>

  </div>

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
