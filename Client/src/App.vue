
<!-- Just nav bar and style here really at the moment -->
<template>
<div id="app" class="container-fluid">
    <body>
    <div class="row" style="margin-bottom:1em;"> <!-- margin between header and nav bar -->
        <div class="col">
            <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/admissions">Admissions</router-link> |
                <router-link to="/subject">Subjects</router-link> | <!-- router has index.js with details-->
            <span v-show="loggedIn">
                <router-link to="/syllabus">Edit-Subjects</router-link> |
                <router-link to="/user">Users</router-link> |
            </span>
                <router-link to="/calendar">Calendar</router-link> |                
                <router-link to="/contact">Contact Us</router-link>
            </div>
        </div>
        <div class="col float-right">
            <Login />
        </div>
    </div>
        <div class="logo"><img alt="School logo" src="./assets/school-crest-header-new.png"> <!--school header-->
    </div>

<!-- Floating Social Media bar Starts -->

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<div class="float-sm">
  <div class="fl-fl float-fb">
    <i class="fa fa-facebook" aria-hidden="true"></i>
    <a href="https://www.facebook.com/StRaphaelasSecondarySchool/" target="_blank">Facebook</a>
  </div>
  <div class="fl-fl float-ig">
    <i class="fa fa-instagram" aria-hidden="true"></i>
    <a href="https://www.instagram.com/straphaelas/?hl=en" target="_blank">Instagram</a>
  </div>
    <div class="fl-fl float-schoolwise">
    <i class="fa fa-university" aria-hidden="true"></i>
    <a href="https://straphaelas.myschoolwise.com/Login?returnurl=%2f" target="_blank">SchoolWise</a>
  </div>
    <div class="fl-fl float-office">
    <i class="fa fa-windows" aria-hidden="true"></i>
    <a href="https://login.microsoftonline.com" target="_blank">Office 365</a>
  </div>

</div>
<!-- Floating Social Media bar Ends -->

    <router-view />
    </body>
  <footer class="footer">
        <div class="rightrow">
          <p class="contact"><a href="/#/contact" target="_blank">Contact Us</a></p>
        <div class="column2">
            <a href="/#/contact" target="_blank">
            <img alt="contact us" src="./assets/contact_icon_awesome.jpg" width="38" height="46">
            </a>
        </div>
        <p class="policy"><a href="/#/policy" target="_blank">Privacy Policy</a></p>
        <div class="column2">
            <a href="/#/policy" target="_blank">
            <img alt="privacy policy" src="./assets/privacy_icon.jpg" width="38" height="46">
            </a>
        </div>
        </div>


        <div class="row">
        <div class="column">
            <a href="https://www.facebook.com/StRaphaelasSecondarySchool/" target="_blank">
            <img alt="facebook link" src="./assets/f_icon.jpg" width="38" height="46">
            </a>
        </div>
        <div class="column">
            <a href="https://www.instagram.com/straphaelas/?hl=en" target="_blank">
            <img alt="instagram link" src="./assets/instagram_icon.jpg" width="38" height="46">
            </a>
        </div>
        <div class="column">
            <a href="https://straphaelas.myschoolwise.com/Login?returnurl=%2f" target="_blank">
            <img alt="instagram link" src="./assets/schoolwise_icon.jpg" width="38" height="46">
            </a>
        </div>
        <div class="column">
            <a href="https://login.microsoftonline.com" target="_blank">
            <img alt="instagram link" src="./assets/office_icon.jpg" width="38" height="46">
            </a>
        </div>
    </div>
    <div class="copyright">
        <p class="cp-text">
            © Copyright 2020 St. Raphaela's Secondary School.
        </p>
    </div>
  </footer>
    </div>
</template>

<script>
document.title = "St. Raphaela's Secondary School"
// @ is an alias to /src
import Login from '@/components/Login.vue'
//login has been imported and export it
export default {

    components: {
        Login
    },
    data() {
        return {
            loading: false,
            users: null,
            error: null,
        }
    },
    computed: {
        loggedIn() {
            return sessionStorage.loggedIn === "true";
        }
    },
}

</script>

<style>

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
#nav {
    text-align: left;
    padding-top: 1.3em;
    padding-left: 1.3em
}
#nav a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 1.3em;
}
#nav a.router-link-exact-active {
    color: #003ea1;
}

.logo{
    width:100%;
}

.logo img{
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  display: block;
}

html, body {
  height: 100%;
}
body {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1 0 auto;
}

/* Floating Social Media Icons*/

.fl-fl {
  background: #003ea1;
  letter-spacing: 1.5px;
  padding: 3px;
  width: 16%;
  position: fixed;
  right: -13%;
  z-index: 1000;
  font: normal normal 23px Arial;
  -webkit-transition: all .3s ease;
  -moz-transition: all .3s ease;
  -ms-transition: all .3s ease;
  -o-transition: all .3s ease;
  transition: all .3s ease;
}

.fa {
  color: white;
  padding: 10px 0;
  width: 40px;
  margin-left: 5px;
}

.float-sm a:hover {
color: white;
text-decoration: none;
}

.fl-fl:hover {
  right: 0;
}

.fl-fl a {
  color: white;
  text-decoration: none;
  text-align: left;
  line-height: 43px;
  vertical-align: top;
}

.float-fb {
  top: 346px;
  background: #003ea1;
}

.float-fb:hover {
  top: 346px;
  background: #a91424;
}


.float-ig {
  top: 396px;
  background: #003ea1;
}

.float-ig:hover {
  top: 396px;
  background: #a91424;
}

.float-schoolwise {
  top: 446px;
  background: #003ea1;
}

.float-schoolwise:hover {
  top: 446px;
  background: #a91424;
}

.float-office {
  top: 496px;
  background: #003ea1;
}

.float-office:hover {
  top: 496px;
  background: #a91424;
}

/*  Yellow colour in crest = #beb632
    Red Colour in crest = #a91424 
*/
/*Footer settings*/

.footer p{
    text-align: center;
}

.footer{
    background:#003ea1; 
    padding: 5px;
    margin-right: 10px;
    margin-left:10px;
    padding-bottom: 5px;
    flex-shrink: 0;}

/* unvisited link */
.footer a:link {
  color: white;
}

/* visited link */
.footer a:visited {
color: white;
text-decoration: none;
}

/* mouse over link */
.footer a:hover {
color: white;
text-decoration: underline;
}

/* selected link */
.footer a:active {
color: white;
text-decoration: none;
}

/* copyright text */
.cp-text{ 
color:white;
margin-left:218px;
margin-bottom:10px;
}

/* policy text */
.policy{
color:white;
float:right;
margin-right:2%;
margin-top:60px;
}

/* contact us text */
.contact{ 
color:white;
float:right;
margin-right:2%;
margin-top:60px;
}


/* format the social links in footer */
.column {
  float: left;
  width: 1.5%;
  margin-left:40px;
  margin-top: 10px;
}

/*to change the image on hover - for red colour*/ 
.column:hover {
opacity: .8;
-webkit-filter: invert(40%) grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2);
filter: grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);
}

.column2 {
  float: right;
  width: 0%;
  margin-right:0px;
  margin-top: 10px;
}

/*to change the image on hover - for red colour*/ 
.column2:hover {
opacity: .8;
-webkit-filter: invert(40%) grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(400%) contrast(2);
filter: grayscale(100%) brightness(50%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8);
}


/* Clear floats after image containers */
.row::after {
  content: "";
  clear: both;
  display: table;
}

</style>