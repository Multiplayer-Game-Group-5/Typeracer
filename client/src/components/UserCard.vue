<template>
  <div class="col-3">
    <p>{{ user.username }}</p>
    <p>{{ user.points }}</p>
  </div>
</template>

<script>
export default {
  name: 'UserCard',
  props: ['user']
}
</script>

<style>
</style>
