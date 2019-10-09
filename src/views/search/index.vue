<template>
  <div>
    <v-row justify="center">
      <v-date-picker v-model="picker" @change="showCourse"></v-date-picker>
    </v-row>
  </div>
</template>

<script>
  export default {
    name: "index",
    data: () => ({
      picker: new Date().toLocaleDateString().replace(/\//g, '-')
    }),
    methods: {
      showCourse (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>

</style>
