<template> 
<!--This sets up the syllabus page with the form and table and this is called by the Syllabuspage.vue-->
<div>
    <div class="row bg-light text-dark">
        <div class="col-sm-4">
            <AssessmentForm :contents="contents" :subjects="subjects" :contentModel="contentModel" />
        </div>
        <div class="col-sm-8 bg-secondary">
            <div class="row row-table">
                <AssessmentTable :contents="contents" :subjects="subjects" />
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
        contentCount() {
            if (this.contents) {
                return this.contents.length;
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
            contents: null,
        }
    },
    methods: {
        getData() {
            this.error = null;
            this.loading = true;
            axios.all([this.getSubjects(), this.getContents()])
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                });
        },
        //add picture(s) and assign to contentId
        addPictures(contentId, files) {
            const fd = new FormData();
            fd.append('contentId', contentId);
            for (let i = 0; i < files.length; i++) {
                fd.append('files[' + i + ']', files[i], files[i].name);
            }
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}picture`, fd, {
                params
            }).then((result) => {
                console.log(result);
            }).catch(err => {
                console.log(err);
            });
        },
        //delete a subject
        deleteSubject(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.delete(`${url}subject/${id}`, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getSubjects();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                    alert(error.response.data);
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
        //add content to the database
        addContent(newContent, files) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.post(`${url}content`, newContent, {
                    params
                })
                .then((res) => {
                    this.addPictures(res.data.id, files);
                    this.getContents();
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        //calls list of content and returns according to model
        getContent(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.get(`${url}content/${id}`, {
                    params
                })
                .then(response => {
                    this.loading = false;
                    this.contentModel.id = response.data.id;
                    this.contentModel.contentName = response.data.contentName;
                    this.contentModel.description = response.data.description;
                    this.contentModel.text = response.data.text;
                    this.contentModel.HomepageArticle = response.data.HomepageArticle;
                    this.contentModel.picture = response.data.picture;
                    this.contentModel.subjectId = response.data.subjectId;
                    this.contentModel.isValid = true;
                    console.log('promise has resolved', response.data);
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        getContents(search, order) {
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
            axios.get(`${url}content`, {
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
        //delete content according to Id
        deleteContent(id) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.delete(`${url}content/${id}`, {
                    params
                })
                .then(() => {
                    this.loading = false;
                    this.getContents();
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
        //update content using the update button (put)
        updateContent(currentContent, files) {
            this.error = null;
            this.loading = true;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            axios.put(`${url}content`, currentContent, {
                    params
                })
                .then(() => {
                    this.addPictures(currentContent.id, files);
                    this.getContents();
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                    this.error = error.toString();
                    console.log(error);
                })
        },
    },
    props: ['contentModel'],
    watch: {
        // If the route changes call the model again
        '$route': 'getData'
    },
}
</script>
