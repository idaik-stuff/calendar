<template>
  <div id="app">
    <Calendar language="es"></Calendar>
  </div>
</template>

<script>
import Calendar from 'v-year-calendar';

//IIB
import 'v-year-calendar/locales/v-year-calendar.es';

export default {
  name: 'App',
  components: {
    Calendar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
