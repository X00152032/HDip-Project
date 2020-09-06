<template>
<form @submit.prevent>
    <div class="form-group">
        <label for="firstName">First Name *</label>
        <input class="form-control" placeholder="First Name" id="firstName" v-model="model.firstName" :class="{ error : errorFirstName }" @keyup="validate">
    </div>
    <div class="form-group">
        <label for="lastName">Last Name *</label>
        <input class="form-control" placeholder="Last Name" id="lastName" v-model="model.lastName" :class="{ error : errorLastName }" @keyup="validate">
    </div>
    <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" class="form-control" placeholder="Email" id="email" v-model="model.email" :class="{ error : errorEmail }" @keyup="validate">
    </div>
    <div class="form-group">
        <label for="password">Password *</label>
        <input type="password" class="form-control" id="price" placeholder="Password" v-model="model.password" :class="{ error : errorPassword }" @keyup="validate">
    </div>
    <div class="form-group" id="checkboxes">
        <input type="checkbox" id="role" v-model="model.isAdmin">
        <label for="role"> Admin </label>
        <input type="checkbox" id="role" v-model="model.isAdmin">
        <label for="role"> Staff </label>
        <input type="checkbox" id="role" v-model="model.isAdmin">
        <label for="role"> Student </label>
    </div>
    <div class="form-group">
        <button class="btn btn-primary" v-on:click="addUser" :disabled="!model.isValid">Add</button>
        <button class="btn btn-primary" v-on:click="updateUser" :disabled="!model.isValid">Update</button>
        <button class="btn btn-secondary" v-on:click="resetUser">Reset</button>
    </div>
</form>
</template>

<script>
export default {
    name: 'UserForm',
    props: ['users', 'userModel'],
    data() {
        return {
            model: this.userModel
        }
    },
    computed: {
        errorFirstName() {
            return !this.model.isNew && (!this.model.firstName || this.model.firstName.length < 3);
        },
        errorLastName() {
            return !this.model.isNew && (!this.model.lastName || this.model.lastName.length < 3);
        },
        errorEmail() {
            return !this.model.isNew && !this.validateEmail();
        },
        errorPassword() {
            return !this.model.isNew && !this.validatePassword();
        }
    },
    methods: {
        validate() {
            this.model.isNew = false;
            // returns an array of 1 category e.g. [{ id: 0, categoryName: '' }]
            if (!this.model.firstName || this.model.firstName.length < 3 ||
                !this.model.lastName || this.model.lastName.length < 3 ||
                !this.validateEmail() || !this.validatePassword()) {
                this.model.isValid = false;
            } else {
                this.model.isValid = true;
            }
            return this.model.isValid;
        },
        validateEmail() {
            //eslint-disable-next-line
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(this.model.email).toLowerCase());
        },
        validatePassword() {
            return this.model.password && this.model.password.length > 5;
        },
        addUser() {
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            if (this.model.isAdmin) {
                this.model.role = 'admin';
            } else {
                this.model.role = 'user';
            }
            let newUser = {
                firstName: this.model.firstName,
                lastName: this.model.lastName,
                email: this.model.email,
                password: this.model.password,
                confirm: this.model.confirm,
                role: this.model.role,
            };
            this.$parent.addUser(newUser);
            this.resetUser();
        },
        updateUser() {
            if (!this.model.id) {
                alert('Please select a user to update');
                return; // No user selected
            }
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            if (this.model.isAdmin) {
                this.model.role = 'admin';
            } else {
                this.model.role = 'user';
            }
            let currentUser = {
                id: this.model.id,
                firstName: this.model.firstName,
                lastName: this.model.lastName,
                email: this.model.email,
                password: this.model.password,
                confirm: this.model.confirm,
                role: this.model.role,
            };
            this.$parent.updateUser(currentUser);
            this.resetUser();
        },
        resetUser() {
            this.model.isNew = true;
            this.model.id = null;
            this.model.firstName = null;
            this.model.lastName = null;
            this.model.email = null;
            this.model.password = null;
            this.model.role = null;
            this.model.isAdmin = false;
        },
    },
}
</script>

<style scoped>
#checkboxes {
      text-align:left;
     }

    #checkboxes input{
      margin: 10px 0px 0px 0px;
     }

     #checkboxes label{
       margin: 0px 15px 0px 3px;
     }
</style>
