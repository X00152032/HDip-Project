<!-- Home Page -->
<template>
<div class="home container-fluid">
   <!-- <img alt="School Crest" src="../assets/raphs-header.jpg"> -->
    <Welcome msg="Welcome to our School" leader=""/><hr>
      <div class="images">
            <img alt="School aerial picture" src="../assets/aerial.jpg">
            <img alt="Girls with books" src="../assets/books.jpg">
            <img alt="Students as heores" src="../assets/heroes.jpg">
      </div>
    <div class="bg-white text-grey" style="text-align: left"> <!--format table-->
        <ol class="ordered-list">
            <SyllabusItem :id="item.id" v-for="item in contents" :contentModel="item" :key="item.id" />
        </ol>
    </div>
    <div class="footer">
            <a href="https://straphaelas.app.vsware.ie/" target="_blank"><img src="../assets/vsware.png" alt="vsware link" style="width:175px;height:175px;"></a>
            <a href="https://pay.easypaymentsplus.com/feepay1v2.aspx?id=447" target="_blank"><img src="../assets/easypayments.jpg" alt="easypayments" style="width:175px;height:175px;"></a>
            <a href="https://eu.operoo.com/users/sign_in?no_redirect&rf=au" target="_blank"><img src="../assets/operoo.png" alt="Operoo link" style="width:215px;height:100px;"></a>
            <a href="https://www.surveymonkey.com/r/BJPMK3C" target="_blank"><img src="../assets/shield_my_school.jpg" alt="Report bullying link" style="width:175px;height:175px;"></a>

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

.images img{
    image-rendering: optimizeSpeed;
     border-radius: 15%;
    margin-top:20px; /*to have the space above the image*/
    margin-bottom:20px; /*to have the space under the image*/
    margin-left:20px; /*to have the space under the image*/
    margin-right:20px; /*to have the space under the image*/
        
}

.ordered-list{
text-align:justify 
}

.footer a>img
{
    border-radius: 15%;
    margin-top:20px; /*to have the space above the image*/
    margin-bottom:20px; /*to have the space under the image*/
    margin-left:20px; /*to have the space under the image*/
    margin-right:20px; /*to have the space under the image*/

}

.footer{
text-align: center;}
</style>
