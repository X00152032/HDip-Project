
<!-- Just nav bar and style here really at the moment -->
<template>

<div id="app" class="container-fluid">
    <div class="row" style="margin-bottom:1em;"> <!-- margin between header and nav bar -->
        <div class="col">
            <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link> |
                <router-link to="/admissions">Admissions</router-link>

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
        <div><img alt="School logo" src="./assets/school-crest-header.png"><hr></div> <!--school header-->
    <router-view />
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
}
#nav a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 1.3em;
}
#nav a.router-link-exact-active {
    color: #1c3bc4;
}
</style>