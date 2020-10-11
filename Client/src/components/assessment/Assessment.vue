<template> 
<!--This sets up the assessment page with the form and table and this is called by the AssessmentPage.vue-->
<div>
    <div class="row bg-light text-dark">
        <div class="col-sm-10">
            <AssessmentForm :levels="levels" :assessments="assessments" :subjects="subjects" :users="users" :assessmentModel="assessmentModel" :userModel="userModel" :levelModel="levelModel"/>
        </div>
        <div class="col-sm-12 bg-secondary">
            <div class="row row-table">
                <AssessmentTable :assessments="assessments" :subjects="subjects" :users="users"/>
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
        assessmentCount() {
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
            subjects: null,
            assessments: null,
            users: null,
            levels:null,
        }
    },
    methods: {
        getData() {
            this.error = null;
            this.loading = true;
            axios.all([this.getSubjects(), this.getAssessments(), this.getUsers(), this.getLevels()])
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                });
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
                    this.subjects = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

            //get list of subjects
        getLevels() {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}ExamLevel`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.subjects = response.data;
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

                        }else if (user.role === 'staff') {
                            user.isStaff = true;
                        
                        }else if (user.role === 'student') {
                            user.isStudent = true;}
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
        //add content to the database
        addAssessment(newAssessment) {  //removed ,files
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}assessment`, newAssessment, {
                    params
                })
                .then(() => { //removed res
                   // this.addPictures(res.data.id, files);
                    this.getAssessments();
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        //calls list of assessments and returns according to model
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
                    this.assessmentModel.id = response.data.id;
                    this.assessmentModel.assessmentName = response.data.assessmentName;
                    this.assessmentModel.level = response.data.level;
                    this.assessmentModel.percentage = response.data.percentage;
                    this.assessmentModel.grade = response.data.grade;
                    this.assessmentModel.descriptor = response.data.descriptor;
                    this.assessment.appUserId = response.data.appUserId;
                    this.assessmentModel.yearGroupId = response.data.yearGroupId;
                    this.assessmentModel.subjectId = response.data.subjectId;
                    this.assessmentModel.isValid = true;
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
                    this.contents = response.data;
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
        //update content using the update button (put)
        updateAssessment(currentAssessment) {    //deleted ,files
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.put(`${url}assessment`, currentAssessment, {
                    params
                })
                .then(() => {
                //    this.addPictures(currentAssessment.id, files);
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
    props: ['assessmentModel', 'userModel'],
    watch: {
        // If the route changes call the model again
        '$route': 'getData'
    },
}
</script>
