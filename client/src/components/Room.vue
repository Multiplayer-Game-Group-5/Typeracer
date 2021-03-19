<template>
  <div>
    <div class="card width-100">
      <p>{{ room.roomName }}</p>
      <button class="btn btn-info" @click.prevent="joinRoom(room.roomName)">
      JoinRoom
      </button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
