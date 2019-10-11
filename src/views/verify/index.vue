<template>
  <div class="d-flex justify-center align-center">
    <course-cell v-for="(item, index) in verifyList" :key="item.id" :index="index" :item="item"></course-cell>
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
      verifyList:[]
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
        invoke: utils.api.verify,
        params: {
          stuId: this.stuId
        },
      })
        .then(function (res) {
          this.verifyList = []
          this.verifyList.push(...res.data.course)
        })
    }

  }
</script>

<style scoped>

</style>
