<template>
<table class="table table-sm table-light table-hover bg-light">
    <thead class="table-danger">
        <tr> <!--rows of headings in the table -->
            <th>Student Email</th>
            <th>Subject</th>
            <th>Assessment Name</th>
            <th>Level</th>
            <th>Grade</th>
            <th>Descriptor</th>
            <th>
                &nbsp;  <!--needed to continue table line -->
            </th>
            <th>    
                &nbsp;
            </th>
            <th>
                &nbsp;
            </th>
        </tr>
    </thead>
    <thead class="table-danger">
        <tr>
            <th>
                <select class="form-control" v-model="search.subject.criteria"> <!--subject here is the table-->
                    <option value="" selected>User</option>
                    <option v-for="option in assessments" :value="option.id" v-bind:key="option.id">{{ option.email }}</option>
                </select>
            </th>
            <th>
                <select class="form-control" v-model="search.subject.criteria"> <!--subject here is the table-->
                    <option value="" selected>Subject</option>
                    <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>
            </th>
            <th>
                <div style="display:flex;"> <!--Search bar -->
                    <input class="form-control" placeholder="Name" v-model="search.assessmentName.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Description" v-model="search.description.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control search-small" placeholder="Text" v-model="search.text.criteria">
                </div>
            </th>
            <th>
                <button class="btn btn-primary" role="button" aria-pressed="true" v-on:click="getAssessments">Find</button>
            </th>
            <th>
                &nbsp;
            </th>
            <th>
                &nbsp;
            </th>
        </tr>
    </thead>
    <tbody> <!--rows of values in the table -->
        <tr class="table-primary table-bordered" v-for="row in assessments" v-on:click="clickAssessment(row)" :class="{ selected: row.selected }" v-bind:key="row.id" >
            <td>{{ row.assessmentName }}</td>
            <td>{{ row.description }}</td>
            <td>{{ row.text }}</td>
            <td>{{ getSubjectName(row.subjectId) }}</td>
            <td class="delete-icon">
                <a href="javascript:;" v-on:click="deleteAssessment($event, row)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'AssessmentTable',
    props: ['assessments', 'subjects', 'assessmentModel'],
    data: () => {
        return {
            
            // used for search
            search: {
                assessmentName: {
                    column: 'assessmentName',
                    operator: '=',
                    criteria: null
                },
                description: {
                    column: 'description',
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
        clickAssessment(row) {
            this.assessments.forEach((assessment) => {
                assessment.selected = false;
            });
            row.selected = true;
            this.$parent.getAssessment(row.id);
        },
        getAssessments() {
            // $parent is the parent component (in this case the Syllabus.vue component)
            this.$parent.getAssessments(this.search);
        },
        deleteAssessment(event, row) {
            // stop showing content if deleted
            event.stopPropagation();
            if (confirm(`Are you sure you want to delete the Assessment "${row.assessmentName}"?`)) {
                this.$parent.deleteAssessment(row.id);
            }
        },
    },
}
</script>
