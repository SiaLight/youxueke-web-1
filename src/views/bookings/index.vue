<template>
  <div class="d-flex justify-center align-center">
    <course-cell v-for="(item, index) in bookList" :key="item.id" :index="index" :item="item"></course-cell>
  </div>
</template>

<script>
  import courseCell from '../../components/course-cell.vue'
  import utils from '@/utils'
  import {mapState} from "vuex";
  export default {
    name: "index",
    components:{courseCell},
    data: () => ({
      bookList:[]
    }),
    methods: {

    },
    computed:{
      ...mapState([
        'stuId'
      ])
    },
    mounted() {
      utils.request({
        invoke: utils.api.bookingList,
        params: {
          stuId: this.stuId
        },
      })
        .then(function (res) {
          this.bookList = []
          this.bookList.push(...res.data.course)
        })
    }

  }
</script>

<style scoped>

</style>
