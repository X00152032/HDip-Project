<template> 
<!--This sets up the Assessments page with the form and table and this is called by the AssessmentPage.vue-->
<div>
    <div class="row bg-light text-dark">
        <div class="col-sm-4">
            <AssessmentForm :subjects="subjects" :tests="tests" :appUser="appUser" :assessments="assessments" :assessmentModel="assessmentModel" />
        </div>
        <div class="col-sm-8 bg-secondary">
            <div class="row row-table">
                <AssessmentTable :tests="tests" :appUser="appUser" :assessments="assessments" :subjects="subjects"/>
            </div>
        </div>
    </div>
</div>
</template>

<script>
//import all required components
import axios from 'axios';
import serverDetails from '../../constants';
import AssessmentForm from './AssessmentForm';
import AssessmentTable from './AssessmentTable';

export default {
    name: 'Assessment',
    components: {
        AssessmentForm,
        AssessmentTable,
    },
    computed: {
        AssessmentCount() {
            if (this.assessments) {
                return this.assessments.length;
            } else {
                return 0;
            }
        },
    },
    created() {
        // fetch the data when the view is made
        this.getData();
    },
    data() {
        return {
            loading: false,
            error: null,
            assessments: null,
            appUser: null,
            tests: null,
            subjects: null,
        }
    },
    methods: {
        getData() {
            this.error = null;
            this.loading = true;
            axios.all([this.getAssessments(), this.getTests(), this.getAppUser(), this.getSubjects()])
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                });
        },
        //delete a test
        deleteTest(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.delete(`${url}test/${id}`, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getTests();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                    alert(error.response.data);
                })
        },
        //get list of tests
        getTests() {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}test`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.appUser = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

//get list of Users
        getAppUsers() {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}user`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.appUser = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

        //get list of subjects
        getSubjects() {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}subject`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.appUser = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },


        //add assessment to the database
        addAssessment(newAssessment) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}assessment`, newAssessment, {
                    params
                })
                .then(() => {
                    this.getAssessments();
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        //calls list of test and returns according to model
        getAssessment(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}assessment/${id}`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.testModel.id = response.data.id;
                    this.testModel.testName = response.data.testName;
                    this.testModel.level = response.data.level;
                    this.testModel.percentage = response.data.percentage;
                    this.testModel.grade = response.data.grade;
                    this.testModel.descriptor = response.data.descriptor;
                    this.testModel.subjectId = response.data.subjectId;
                    this.testModel.appUserId = response.data.appUserId;
                    this.testModel.isValid = true;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        getAssessments(search, order) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
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
            axios.get(`${url}assessment`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.tests = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        //delete assessment according to Id
        deleteAssessment(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.delete(`${url}assessment/${id}`, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getAssessments();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

        //update test using the update button (put)
        updateAssessment(currentAssessment) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.put(`${url}assessment`, currentAssessment, {
                    params
                })
                .then(() => {
                    this.getAssessments();
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
    },
    props: ['assessmentModel'],
    watch: {
        // If the route changes call the model again
        '$route': 'getData'
    },
}
</script>
