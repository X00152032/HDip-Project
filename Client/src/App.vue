
<!-- Just nav bar and style here really at the moment -->
<template>

<div id="app" class="container-fluid">
    <div class="row" style="margin-bottom:1em;"> <!-- margin between header and nav bar -->
        <div class="col">
            <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/syllabus">Subjects</router-link> <!-- router has index.js with details-->
            </div>
        </div>
    </div>
        <div><img alt="School logo" src="./assets/school-crest-header.png"><hr></div> <!--school header-->
    <router-view />
</div>
</template>



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
