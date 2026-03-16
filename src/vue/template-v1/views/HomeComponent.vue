<template>
  <div class="home">
    <h1>{{ title }}</h1>
    <button @click="count++">Count is: {{ count }}</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Hello from SFC!',
      count: 0
    }
  }
}
</script>

<style scoped>
h1 { color: #42b983; }
</style>