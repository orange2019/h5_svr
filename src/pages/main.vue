<template>
<div>
  kxm
</div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  computed: {
  },
  methods: {
    goBack () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}
</script>


