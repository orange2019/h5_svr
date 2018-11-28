<template>
  <transition name="fade">
    <router-view v-if="isRouterAlive"></router-view>
  </transition>
</template>

<script>
 
  export default {
    data() {
      return {
        // admin : this.$store.state.admin
        isRouterAlive: true
      }
    },
    computed: {
  
    },
    methods: {
    }
  }
</script>


