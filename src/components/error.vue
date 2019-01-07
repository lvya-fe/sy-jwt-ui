<template>
  <div>
    <msg :title="cs" :description="description" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>



<script>
  import { Msg, Divider, XButton } from 'vux'

  export default {
    components: {
      Msg,
      Divider,
      XButton
    },
    name: 'error',
    created(){

    },
    methods: {
      changeIcon () {
        if (!this.icon || this.icon === 'success') {
          this.icon = 'warn'
          return
        }
        if (this.icon === 'warn') {
          this.icon = 'info'
          return
        }
        if (this.icon === 'info') {
          this.icon = 'waiting'
          return
        }
        if (this.icon === 'waiting') {
          this.icon = 'success'
        }
      }
    },
    data () {
      return {
        description: this.$route.params.msg,
        icon: 'warn'
      }
    }
  }
</script>
