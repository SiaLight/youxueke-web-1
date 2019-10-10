<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="1"></v-col>
      <v-col cols="4">
        <v-date-picker v-model="picker" @change="showCourse"></v-date-picker>
      </v-col>
      <v-col cols="7"></v-col>
    </v-row>
  </v-container>
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
