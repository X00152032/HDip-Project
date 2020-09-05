<!-- Login Boxes for top right of pages -->
<template>
<div class="login">
    <!-- If not logged in then show login button -->
    <form v-if="!loggedIn" @submit="login" class="form-inline" id="createAdministrator">
        <div class="row">
            <div class="form-group">
                <input v-model="model.email" type="email" class="form-control" id="email" placeholder="Email" name="email">
            </div>
            <div class="form-group">
                <input v-model="model.password" type="password" class="form-control" id="password" placeholder="Password" name="password">
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </div>
    </form>
    <!-- If logged in then show logout button -->
    <form v-else-if="loggedIn" @submit="logout" class="form-inline" id="createAdministrator">
        <div>
            <button type="submit" class="btn btn-primary">Logout</button>
        </div>
    </form>
    <p v-if="errors.length">
        <b></b> <!-- Enter a message in here if needed, e.g. error-->
        <ul class="list-group">
            <li v-for="error in errors" v-bind:key="error" class="list-group-item list-group-item-danger">{{ error }}</li>
        </ul>
    </p>
</div>
</template>


<style scoped>
/*Scope applies css to this only*/

.login {
    margin-top: 1em;
    margin-right: 1em;
    float: right;
}
</style>

<script>
import axios from 'axios';
import serverDetails from '../constants';
export default {
    name: 'Login',
    mounted() {
        console.log('Component mounted.')
    },
    computed: {
        loggedIn() {
            return sessionStorage.loggedIn === "true";
        }
    },
    //model for the login component
    data() {
        return {
            errors: [],
            model: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        login(event) {
            this.errors = [];
            if (!this.model.email) {
                this.errors.push('Email required.');
            }
            if (!this.model.password) {
                this.errors.push('Password required.');
            } else {
                let url = serverDetails.url;
                let params = {
                    ...serverDetails.params
                };
                let data = {
                    username: this.model.email,
                    password: this.model.password
                }
                axios.post(`${url}login/auth`, data, {
                    params
                }).then((response) => {
                    // A successful login will return a user
                    if (response.data.user != false) {
                        // If a user then record in session storage
                        sessionStorage.loggedIn = "true";
                        sessionStorage.token = response.data.token;
                        // force reload of page
                        location.reload(true);
                    }
                }).catch((err) => {
                    console.log(err.message);
                    if (err.response.status === 401) {
                        alert('Invalid Username or Password Entered');
                    }
                    });
                //}).catch((err) => {
                  //  console.log(err.message);
                //});
            }
            event.preventDefault();
        },
        logout(event) {
            this.errors = [];
            let url = serverDetails.url;
            let params = {
                ...serverDetails.params
            };
            axios.get(`${url}login/logout`, {
                params
            }).then(() => {
                sessionStorage.loggedIn = "false";
                sessionStorage.token = undefined;
                // display message and force reload of page
                alert('Logout Successful')
                //This below reloads homepage..
                window.location.replace('/')
            }).catch((err) => {
                console.log(err.message);
                alert('Logout Unsuccessful - Please try again or close browser')
            });
            event.preventDefault();
        }
    }
}
</script>