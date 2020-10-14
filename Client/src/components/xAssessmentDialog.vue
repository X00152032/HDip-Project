
<!-- The dialog window for editting the Assessments option in form -->
<template>
<!-- https://vuejs.org/v2/examples/modal.html -->
<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <slot name="header">
                    </slot>
                </div>

                <form @submit.prevent>
                    <div class="modal-body">
                        <slot name="body">
                            <div class="form-group">
                                <label for="subjectName">Subject Name</label>
                                <input class="form-control" placeholder="Name of Subject" id="subjectName" v-model="subjectName">
                            </div>
                            <div class="form-group">
                                <label for="description">Description</label>
                                <input class="form-control" placeholder="Description" id="description" v-model="description">
                            </div>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <div class="form-group">
                                <button class="btn btn-secondary modal-default-button" @click="$emit('close')">Cancel</button>
                                <button class="btn btn-primary modal-default-button" @click="addUpdateSubject();">Add/Edit</button>
                            </div>
                        </slot>
                    </div>
                </form>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import axios from 'axios';//promise-based HTTP client makes HTTP requests to fetch or save data
import serverDetails from '../constants';

export default {
    name: 'SubjectDialog',
    props: ['subjectId'],
    data() {
        return {
            subjectName: null,
            description: null
        }
    },
    mounted() {
        if (this.subjectId) {
            this.getSubject(this.subjectId);
        }
    },
    methods: {
        addUpdateSubject() {
            if (this.subjectId) {
                this.updateSubject();
            } else {
                this.addSubject();
            }
        },
        addSubject() {
            if (this.subjectName === null) {
                alert('Please provide a Subject name');
                return true;
            }
            this.error = null;
            this.loading = true;
            let newSubject = {
                subjectName: this.subjectName,
                description: this.description || ''
            }
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}subject`, newSubject, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.$parent.$parent.getSubjects();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
            this.$emit('close');
        },
        updateSubject() {
            if (this.subjectName === null) {
                alert('Please provide a Subject name');
                return true;
            }
            this.error = null;
            this.loading = true;
            let newSubject = {
                id: this.subjectId,
                subjectName: this.subjectName,
                description: this.description || ''
            }
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.put(`${url}subject`, newSubject, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.$parent.$parent.getSubjects();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
            this.$emit('close');
        },
        getSubject(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}subject/${id}`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.subjectName = response.data.subjectName;
                    this.description = response.data.description;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
    }
};
</script>

<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #003ea1;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>
