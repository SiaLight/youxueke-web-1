<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="50%"
      Elevation="8"
    >
      <v-container >
        <v-row class="py-2 px-2">
          <v-col class=" align-center" cols="4">
            <v-img
              height="180"
              width="180"
              src="../assets/logo.png"></v-img>
          </v-col>
          <v-col cols="8">
            <p class="title text--primary">
              {{title}}
            </p>
            <P class="subtitle-1 font-weight-light">{{author}}</P>
            <div style="height:40px" class="mt-4">
              <p class="grey-darken-3 des" >
                {{des}}
              </p>
            </div>

            <p class="mt-5"><v-icon class="ml-2">mdi-clock-outline</v-icon>{{date}}</p>
            <p ><v-icon class="ml-2">mdi-map-marker</v-icon>{{location}}</p>
            <P v-if="isCheck" style="color:limegreen">
              已审核
            </P>
            <P v-else style="color:darkred">
              未审核
            </P>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
  export default {
    data: () => ({
      img: '/assets/logo.png',
      title: '计算机网络',
      author: '张同学',
      des: '什么第九版搜第几个爱可登几女aeaeovj奥尔低聚',
      date: '2019-10-12',
      location:'理科大楼',
      isCheck: false
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
