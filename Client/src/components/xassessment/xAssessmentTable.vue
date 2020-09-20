<template>
<table class="table table-light table-hover table-sm bg-success">
    <thead class="table-primary">
        <tr> <!--rows of headings in the table -->
            <th>Eamil</th>
            <th>Subject</th>
            <th>Test</th>
            <th>Grade</th>
            <th>Discriptor</th>
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
    <thead class="table-primary">
        <tr>
            <th>
                <select class="form-control" v-model="search.email.criteria">
                    <option value="" selected>Email</option>
                    <option v-for="option in users" :value="option.id" v-bind:key="option.id">{{ option.email }}</option>
                </select>
            </th>
            <th>
                <select class="form-control" v-model="search.subjectId.criteria">
                    <option value="" selected>Subject</option>
                    <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="TestName" v-model="search.testName.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control search-small" placeholder="Grade" v-model="search.grade.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control search-small" placeholder="Discriptor" v-model="search.descriptor.criteria">
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
        <tr class="table-primary table-bordered" v-for="row in contents" v-on:click="clickAssessment(row)" :class="{ selected: row.selected }" v-bind:key="row.id" >
            <td>{{ getEmail(row.appUserId) }}</td>
            <td>{{ getSubjectName(row.subjectId) }}</td>
            <td>{{ row.testName }}</td>
            <td>{{ row.grade }}</td>
            <td>{{ row.descriptor }}</td>
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
    props: ['assessments', 'tests', 'users'],
    data: () => {
        return {
            // used for search
            search: {
                email: {
                    column: 'appUserId',
                    operator: '=',
                    criteria: null
                },
                subject: {
                    column: 'subjectId',
                    operator: '=',
                    criteria: null
                },
                testName: {
                    column: 'testName',
                    operator: '=',
                    criteria: null
                },
                descriptor: {
                    column: 'descriptor',
                    operator: '=',
                    criteria: null
                },
                grade: {
                    column: 'grade',
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
        clickContent(row) {
            this.contents.forEach((content) => {
                content.selected = false;
            });
            row.selected = true;
            this.$parent.getContent(row.id);
        },
        getContents() {
            // $parent is the parent component (in this case the Syllabus.vue component)
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
