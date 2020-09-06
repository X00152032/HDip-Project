<template>
<div>
    <div class="row bg-light text-dark">
        <div class="col-sm-4">
            <UserForm :users="users" :userModel="userModel" />
        </div>
        <div class="col-sm-8 bg-secondary">
            <div class="row row-table">
                <UserTable :users="users" :userModel="userModel" />
            </div>
        </div>
    </div>
    <div class="row" v-show="userModel.id">
        <UserCard :userModel="userModel" />
    </div>
</div>
</template>

<script>
import axios from 'axios';
import UserForm from './UserForm';
import UserTable from './UserTable';
import UserCard from './UserCard';
import serverDetails from '../../constants';

export default {
    name: 'User',
    components: {
        UserForm,
        UserTable,
        UserCard,
    },
    computed: {
        userCount() {
            if (this.users) {
                return this.users.length;
            } else {
                return 0;
            }
        },
    },
    created() {
        // fetch the data when the view is created and the data is
        // already being observed
        this.getUsers();
    },
    data() {
        return {
            loading: false,
            error: null,
            users: null
        }
    },
    methods: {
        addUser(newUser) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {
                ...serverDetails.params
            };
            const api = axios.create({
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.token
                },
                withCredentials: true
            });
            api.post(`${url}user`, newUser, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getUsers();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                    alert(error.response.data.error);
                })
        },
        getUser(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {
                ...serverDetails.params
            };
            // const api = axios.create({
            //     headers: {
            //         'Authorization': 'Bearer ' + sessionStorage.token
            //     },
            //     withCredentials: true
            // });
            axios.get(`${url}user/${id}`, {
                    params
                },
                {
                    withCredentials: true //correct
                })
                .then(response => {
                    this.loading = false;
                    this.userModel.id = response.data.id;
                    this.userModel.firstName = response.data.firstName;
                    this.userModel.lastName = response.data.lastName;
                    this.userModel.email = response.data.email;
                    this.userModel.password = response.data.password;
                    this.userModel.role = response.data.role;
                    if (this.userModel.role === 'admin') {
                        this.userModel.isAdmin = true;
                    } else {
                        this.userModel.isAdmin = false;
                    }
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        getUsers(search, order) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {
                ...serverDetails.params,
                token: sessionStorage.token,
                headers: {
                    'Authorization': "Bearer " + sessionStorage.token,
                    "x-access-token": sessionStorage.token,
                    "Cookie": { jwt: sessionStorage.token }
                },
                credentials: 'include',
                withCredentials: true,
            };
            if (search) {
                params.search = {};
                Object.values(search).forEach((value) => {
                    if (value.criteria) {
                        params.search[value.column] = {
                            column: value.column,
                            operator: value.operator,
                            criteria: value.criteria
                        }
                        console.log(params);
                    }
                });
            }
            if (order && order.column) {
                params.order = order;
            }
            const api = axios.create({
                headers: {
                    'Authorization': `Bearer ${sessionStorage.token}`
                },
                withCredentials: true,
            });
            api.get(`${url}user`, {
                    params
                },
                {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.token,
                    },
                    withCredentials: true //correct
                }
                )
                .then(response => {
                    this.loading = false;
                    this.users = response.data.map((user) => {
                        if (user.role === 'admin') {
                            user.isAdmin = true;
                        } else {
                            user.isAdmin = false;
                        }
                        return user;
                    });
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        updateUser(currentUser) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {
                ...serverDetails.params
            };
            const api = axios.create({
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.token
                },
                withCredentials: true
            });
            api.put(`${url}user`, currentUser, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getUsers();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        deleteUser(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {
                ...serverDetails.params
            };
            const api = axios.create({
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.token
                },
                withCredentials: true
            });
            api.delete(`${url}user/${id}`, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getUsers();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
    },
    props: ['userModel'],
    watch: {
        // call again the method if the route changes
        '$route': 'getUsers'
    },
}
</script>
