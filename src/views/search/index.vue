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
          <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <course></course>
  </div>
</template>

<script>
  import course from '../../components/course-cell.vue'
  export default {
    name: "index",
    data: () => ({
      date: new Date().toLocaleDateString().replace(/\//g, '-'),
      menu2:false
    }),
    components:{course},
    methods: {
      showCourse (e) {
        console.log(e)
      }
    }
  }
</script>

<style scoped>

</style>
