<!-- Content for the Home page that is called dynamically -->
<template> <!--formatting for message and leader-->
  <div class="hello">
    <h2>{{ msg }}</h2> <!-- message and leader written in Homepage.vue -->
    <p>{{ leader }}</p>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: ['msg', 'leader']
}
</script>

<style scoped>
/*Scope applies css to this only*/

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
