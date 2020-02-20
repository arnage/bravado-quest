<template>
  <div id="app" :class="$style.app">
    <UsersList />
  </div>
</template>

<script>
import UsersList from './components/UsersList.vue'

export default {
  components: {
    UsersList
  }
}
</script>

<style module>
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap');

  .app {
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #EEEEEE;
    font-style: normal;
    font-weight: normal;
    font-family: "Roboto";
  }
</style>