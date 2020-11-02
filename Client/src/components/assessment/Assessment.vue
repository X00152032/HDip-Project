<template> 
<!--This sets up the assessment page with the form and table and this is called by the AssessmentPage.vue-->
<div>
    <div class="row bg-light text-dark">
        <div class="col-sm-10">
            <AssessmentForm :assessments="assessments" :subjects="subjects" :users="users" :assessmentModel="assessmentModel"/>
        </div>
        <div class="col-sm-12 bg-secondary">
            <div class="row row-table">
                <AssessmentTable :subjects="subjects" :users="users" :assessments="assessments" :assessmentModel="assessmentModel"/>
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
        }
    },
    methods: {
        getData() {
            this.error = null;
            this.loading = true;
            axios.all([this.getSubjects(), this.getAssessments(), this.getUsers()])
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                });
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
                    this.assessments = response.data;
                    console.log('promise has resolved', response.data);
                })    
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },

        //add Assessment to the database
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
                        this.assessmentModel.appUserId = response.data.appUserId;
                        this.assessmentModel.yearGroup = response.data.yearGroup;                    
                        this.assessmentModel.subjectId = response.data.subjectId;
                        this.assessmentModel.assessmentName = response.data.assessmentName;
                        if (this.assessmentModel.assessmentType === 'Test') {
                            this.assessmentModel.isTest = true;
                        }else if (this.assessmentModel.assessmentType === 'CBA') {
                            this.assessmentModel.isCBA = true;   }  
                        this.assessmentModel.assessmentType = response.data.assessmentType;
                        if ((this.assessmentModel.subjectLevel === 'Higher') && (this.assessmentModel.subjectType === 'Test')){
                                ((this.assessmentModel.isHigher = true) && (this.assessmentModel.isHigher2 = false));

                            }else if ((this.assessmentModel.subjectLevel === 'Higher') && (this.assessmentModel.subjectType === 'CBA')){
                                ((this.assessmentModel.isHigher = false) && (this.assessmentModel.isHigher2 = true));
                        
                            }else if ((this.assessmentModel.subjectLevel === 'Ordinary') && (this.assessmentModel.subjectType === 'Test')){
                                ((this.assessmentModel.isOrdinary = true) && (this.assessmentModel.isOrdinary2 = false));

                            }else if ((this.assessmentModel.subjectLevel === 'Ordinary') && (this.assessmentModel.subjectType === 'CBA')){
                                ((this.assessmentModel.isOrdinary = false) && (this.assessmentModel.isOrdinary2 = true));

                            }else if ((this.assessmentModel.subjectLevel === 'Foundation') && (this.assessmentModel.subjectType === 'Test')){
                                ((this.assessmentModel.isFoundation = true) && (this.assessmentModel.isFoundation2 = false));

                            }else if ((this.assessmentModel.subjectLevel === 'Foundation') && (this.assessmentModel.subjectType === 'CBA')){
                                ((this.assessmentModel.isFoundation = false) && (this.assessmentModel.isFoundation2 = true));}
                        this.assessmentModel.subjectLevel = response.data.subjectLevel;
                        this.assessmentModel.percentage = response.data.percentage;
                        this.assessmentModel.grade = response.data.grade;
                        this.assessmentModel.descriptor = response.data.descriptor;
                        this.assessmentModel.isValid = true;
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
                    this.subjects = response.data;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        //get list of Users
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
        // If the route changes, call the model again
        '$route': 'getData'
    },
}
</script>
