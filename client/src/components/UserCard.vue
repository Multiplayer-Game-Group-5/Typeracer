<template>
  <div class="col-3">
    <div class="card">
      <div class="card-header">
        {{ user.username }}
      </div>
      <div>
        <div class="mt-1">
          Score:
        </div>
        <div class="mb-1">
          {{ user.points }}
        </div>
      </div>
    </div>
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
