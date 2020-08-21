<!-- Subject Page -->
<template>
<div class="subject container-fluid">
    <div class=title> <h2>Subjects</h2> <hr> </div>
   <!-- Header Image in App.vue -->
    <div class="subjectimages">
            <img alt="Results day" src="../assets/science.jpg">
            <img alt="Results day" src="../assets/exams.jpg">
            <img alt="Results day" src="../assets/results.jpg">
            <br>
        <h5> Here are some of the subjects we offer in St. Raphaela's. Please contact us if you have 
            any quiries about our subject choices.</h5>
      </div>

  <div class="bg-white text-grey" style="text-align: left"> <!--format table-->
        <ol class="ordered-list">
            <SubjectItem :id="item.id" v-for="item in contents" :contentModel="item" :key="item.id" />
        </ol>
    </div>
</div>
</template>


<script>
// @ is an alias to /src
import SubjectItem from '@/components/subject/SubjectItem.vue';
import axios from 'axios';
import serverDetails from '../constants';

export default {
    name: 'SubjectPage',
    components: {
        SubjectItem //load table of subjects
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

.title{
margin-left:45px;
}

.subject{
    text-align: center;
}

.ordered-list {
    padding: 1em;
}

.subjectimages img{
    width:275px;
    height:200px;
    border-radius: 15%;
    image-rendering: optimizeSpeed;
    margin-top:20px;
    margin-bottom:20px;
    margin-left:30px; /*to have the space under the image*/
    margin-right:30px; /*to have the space under the image*/
}

.ordered-list{
text-align:justify 
}

h6{
    text-align: center;
}
</style>
