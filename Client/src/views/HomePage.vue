<!-- Home Page -->
<template>
<div class="home container">
   <!-- <img alt="School Crest" src="../assets/raphs-header.jpg"> -->
    <Welcome msg="Welcome to our School" leader=""/> <!-- / is important-->
      <div class="images">
            <img alt="School aerial picture" src="../assets/aerial.jpg">
            <img alt="girls with books" src="../assets/books.jpg">
            <img alt="students as heores" src="../assets/heroes.jpg">
      </div>
    <div class="bg-white text-grey" style="text-align: left"> <!--format table-->
        <ol class="ordered-list">
            <SyllabusItem :id="item.id" v-for="item in contents" :contentModel="item" :key="item.id" />
        </ol>
    </div>
    <div class="footer">
            <img alt="vsware link" src="../assets/vsware.png">
            <img alt="easypaments" src="../assets/easypayments.jpg">
            <img alt="caremonkey" src="../assets/caremonkey.png">
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import SyllabusItem from '@/components/syllabus/SyllabusItem.vue';
import Welcome from '@/components/Welcome.vue';
import axios from 'axios';
import serverDetails from '../constants';

export default {
    name: 'HomePage',
    components: {
        Welcome, //load message 
        SyllabusItem //load table of subjects
    },
    created() {
      this.getContents();
    },
    data() {
      return {
        contents: null,
      }
    },
    methods: {
        getContents() {
          this.error = null;
          this.loading = true;
          let url = serverDetails.url;
          let params = {...serverDetails.params};
          axios.get(`${url}content`, {
                  params
              })
              .then(response => {
                  this.loading = false;
                  this.contents = response.data;
                  console.log('promise has resolved', response.data);
              })
              .catch(error => {
                  this.loading = false;
                  this.error = error.toString();
                  console.log(error);
              })
        },
    }
}
</script>

<style scoped>
.home {
    text-align: center;
}
.ordered-list {
    padding: 1em;
}

.images{
 image-rendering: optimizeSpeed;
}

.footer{
text-align: center;}
</style>
