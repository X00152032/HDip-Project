
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
                <router-link to="/calendar">Calendar</router-link> |                
                <router-link to="/contact">Contact</router-link>

                <span v-show="loggedIn">
                    |   <router-link to="/syllabus">Edit Subjects</router-link> <!-- router has index.js with details-->
                    |   <router-link to="/user">Users</router-link>
                </span>
            </div>
        </div>
        <div class="col float-right">
            <Login />
        </div>
    </div>
        <div class="logo"><img alt="School logo" src="./assets/school-crest-header-new.png"></div> <!--school header-->
    <router-view />
    </body>
  <footer class="footer">
        <p class="cp-text">
    © Copyright 2020 St. Raphaela's Secondary School.
        </p>
        <p><a href="/#/policy" target="_blank">Privacy Policy</a></p>
        <p><a href="/#/contact" target="_blank">Contact Us</a></p>

  </footer>
    </div>
</template>

<script>
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
    width:100%
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

.footer p{
    text-align: center;
}

.footer{
    background:#003ea1; 
    padding:.5%;
    margin-right: 10px;
    margin-left:10px;
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

.cp-text{ color:white;}

</style>