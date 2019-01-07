<template>
  <div>
      <img src="@/assets/img/start_t.png" class="xz_t" alt="">
      <img src="@/assets/img/start_z.png" class="xz_z" alt="">
  </div>
</template>

<script>

  import qs from 'qs';
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
          this.$vux.loading.show({
           text: '微信登陆中..'
          });
          setTimeout(function goto() {
            location.replace("/app/auth/wx?uid="+localStorage.uid+"&code="+localStorage.token);
          },2000);
           
        }
    }
  }
</script>
<style scoped>
  .xz_t{width: 432px;margin: 200px auto;display: block}
  .xz_z{width: 510px;margin: 0 auto;display: block}
</style>
