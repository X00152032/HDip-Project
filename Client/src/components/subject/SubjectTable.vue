<template>
<div class="subject">
   <!-- Header Image in App.vue -->
   <h2>Subjects</h2>
    <hr>
    <div class="subjectimages">
            <img id= 1 alt="Study Science" src="../../assets/science.jpg">
            <img id= 2 alt="Exam Hall" src="../../assets/exams.jpg">
            <img id= 3 alt="Results Day" src="../../assets/results.jpg">
      </div>
        <p>Here at St. Raphaela's we pride ourselves on our great range of subject choices. 
            <br>
            In First Year the students have the option to try many subjects and then choose the ones they would like to continue studying in Second Year.
            In Transition Year the students try many new exciting subjects such as Japanese, Russian, Radio broadcasting, song 
            making, recording and much more.<br>
            Finally for the Leaving Certificate we offer many subjects including Applied Maths, Chemistry, Physics, many Languages, Business, Accounting and Computer Science. 
        </p>
         <h4><b>Please choose a subject from the Dropdown box for more information.</b></h4>

    <table class="table table-responsive w-auto text-nowrap">
        <tr>
                <th><h5>Subject</h5></th>
                <select class="form-control" v-model="search.subject.criteria">
                    <option value="" selected>Subject</option>
                    <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>
            <th>
                <button class="btn btn-primary" v-on:click="getContents">Find</button>
            </th>
            
        </tr>
    <tbody> <!--rows of values in the table -->
        <tr v-for="row in contents" v-on:click="clickContent(row)" :class="{ selected: row.selected }" v-bind:key="row.id" >
            <td>{{ getSubjectName(row.subjectId) }}</td>
            <td>{{ row.contentName }}</td>
            <td>{{ row.text }}</td>
        </tr>
    </tbody>
</table>
</div>
</template>

<script>
export default {
     
    name: 'SubjectTable',
    props: ['contents', 'subjects'],
    data: () => {
        return {
            // used for search
            search: {
                contentName: {
                    column: 'contentName',
                    operator: '=',
                    criteria: null
                },
                text: {
                    column: 'text',
                    operator: '=',
                    criteria: null
                },
                subject: {
                    column: 'subjectId',
                    operator: '=',
                    criteria: null
                },
            },
         };
    },
    methods: {
        getSubjectId(name) {
            let subjectIds = this.subjects.filter((subject) => {
                return subject.subjectName === name;
            });
            return subjectIds[0].id || null;
        },
        getSubjectName(subjectId) {
            let subject = this.subjects.filter((subject) => {
                return subject.id == subjectId;
            });
            return subject[0].subjectName || '';
        },
        getContents() {
            // $parent is the parent component (in this case the Subject.vue component)
            this.$parent.getContents(this.search);
        },
        deleteContent(event, row) {
            // stop showing content if deleted
            event.stopPropagation();
            if (confirm(`Are you sure you want to delete the Content "${row.contentName}"?`)) {
                this.$parent.deleteContent(row.id);
            }
        },
    },
}
</script>


<style scoped>
/*Scope applies css to this only*/

.subject {
    align-content: center;
    text-align: justify;
    background-color: white;
}

.form-control {
    width:100%;
}

.table{
    position: relative;
    width:145%;
    background-color: white;
    padding-top: 2%;
    padding-right: 2%;
}

.table tr{ width:auto;
    background-color: white;
    padding-top: 2%;
    padding-right: 2%;
}

.table td {
    width:auto;
    background-color: white;
    padding-top: 2%;
    padding-right: 2%;
    border-bottom: 2px solid rgb(33, 54, 240);
}

.p{
    text-align: justify;
}

.subjectimages img{
    width:275px;
    height:200px;
    border-radius: 15%;
    image-rendering: optimizeSpeed;
    margin-top:20px;
    margin-bottom:20px;
    margin-left:20px; 
    margin-right:20px;
}

h2 {
    text-align: center;
}


.ordered-list{
text-align:justify 
}

.footer{
text-align: center;}
</style>

