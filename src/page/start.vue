<template>
  <div>
      <img src="@/assets/img/start_t.png" class="xz_t" alt="">
      <img src="@/assets/img/start_z.png" class="xz_z" alt="">
  </div>
</template>

<script>
    import Cookies from 'js-cookie'
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
           text: '微信登录中...'
          });
          // var lasturl = localStorage.getItem("lasturl");
          setTimeout(function() {
              var token = Cookies.get('wxtoken');
              var lasturl = Cookies.get('lasturl');
              Cookies.set('wxtoken_',token);
              location.replace("/app/auth/wx?uid="+localStorage.uid+"&code="+token+"&url="+encodeURIComponent(lasturl));
          },1000);

        }
    }
  }
</script>
<style scoped>
  .xz_t{width: 432px;margin: 200px auto;display: block}
  .xz_z{width: 510px;margin: 0 auto;display: block}
</style>
