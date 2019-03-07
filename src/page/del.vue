<template>
  <div>
      <img src="@/assets/img/start_t.png" class="xz_t" alt="">
      <img src="@/assets/img/start_z.png" class="xz_z" alt="">
  </div>
</template>

<script>

  import qs from 'qs';
  import Cookies from 'js-cookie';
  import { Loading } from 'vux'
  export default {
    data(){
      return{
      }
    },
    components: {
      Loading
    },
    created(){
      this.loadData();
    },
    methods:{
        loadData(){
            localStorage.clear();
            Cookies.set('wxtoken',"0");
        }
    }
  }
</script>
<style scoped>
  .xz_t{width: 432px;margin: 200px auto;display: block}
  .xz_z{width: 510px;margin: 0 auto;display: block}
</style>
