<template>
  <div>
    <v-hover v-slot:default="{hover}" open-delay="200" >


    <v-card
      class="mx-auto"
      max-width="60%"
      :elevation="hover ? 16 : 2"
    >
      <v-container >
        <v-row >
          <v-col class=" align-center" cols="4">
            <v-img
              height="180"
              width="180"
              src="../assets/logo.png"></v-img>
          </v-col>
          <v-col cols="8">
            <router-link tag="a" :to="{ path: '/course/' + courseId }" class="title">
              {{title}}
            </router-link>
            <P class="subtitle-1 font-weight-light">{{lecturer}}</P>
            <div style="height:40px" class="mt-4">
              <p class="grey-darken-3 des" >
                {{des}}
              </p>
            </div>

            <p class="mt-5"><v-icon >mdi-clock-outline</v-icon>{{date}}<v-icon class="ml-2">mdi-map-marker</v-icon>{{location}}</p>
            <P v-if="verification" style="color:limegreen">
              已审核
            </P>
            <P v-else style="color:darkred">
              未审核
            </P>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    </v-hover>
  </div>
</template>
<script>
  export default {
    name: 'course-cell',
    props: {
      courseId: Number,
      title: String,
      img: String,
      des: String,
      lecturer: String,
      date: String,
      location: String,
      verification: Number
    },
    data: () => ({
    })
  }
</script>

<style scoped>
  .des{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
