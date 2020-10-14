<template>
<table class="table table-sm table-light table-hover bg-light">
    <thead class="table-danger">
        <tr> <!--rows of headings in the table -->
            <th>Email</th>
            <th>Subject</th>
           <!-- <th>Percentage</th>
            <th>Level</th>
            <th>Grade</th>
            <th>Descriptor</th> -->
            <th>
                &nbsp;  <!--needed to continue table line-->
            </th> 
            <th>    
                &nbsp;
            </th>
            <th>
                &nbsp;
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
                <select class="form-control" v-model="search.email.criteria"> <!--subject here is the table-->
                    <option value="" selected>Student Email</option>
                    <option v-for="option in users" :value="option.id" v-bind:key="option.id">{{ option.email }}</option>
                </select>
            </th>
            <th>
                <select class="form-control" v-model="search.subject.criteria"> <!--subject here is the table-->
                    <option value="" selected>Subject</option>
                    <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>
            </th>
     <!--       <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Percentage" v-model="search.percentage.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Level" v-model="search.examLevel.criteria">
                </div>
            </th>
             <th>
                <div style="display:flex;"> 
                    <input class="form-control" placeholder="Grade" v-model="search.grade.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Descriptor" v-model="search.descriptor.criteria">
                </div>
            </th> -->
            <th>
                <button class="btn btn-primary" role="button" aria-pressed="true" v-on:click="warn">Find Test Average</button>
            </th>
            <th>
                &nbsp;
            </th>
            <th>
                &nbsp;
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
        <tr class="table-primary table-bordered" v-for="row in assessment" v-on:click="clickAssessment(row)" :class="{ selected: row.selected }" v-bind:key="row.id" >
            <td>{{ getUserEmail(row.appUserId) }}</td>
            <td>{{ getSubjectName(row.subjectId) }}</td>
            <td>{{ row.percentage }}</td>
            <td>{{ row.examLevel }}</td>
            <td>{{ row.grade }}</td>
            <td>{{ row.descriptor }}</td>

            <td class="delete-icon">
                <a href="javascript:;" v-on:click="deleteAssessment($event, row)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </td>
   <!--         <td class="btn btn primary" role="button" aria-pressed="true">
                <a href="javascript:;" v-on:click="deleteAssessment($event, row)">
                </a>
            </td> -->
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'AssessmentTable',
    props: ['assessments', 'subjects', 'users'],
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
                percentage: {
                    column: 'percentage',
                    operator: '=',
                    criteria: null
                },
                examLevel: {
                    column: 'examLevel',
                    operator: '=',
                    criteria: null
                },
                grade: {
                    column: 'grade',
                    operator: '=',
                    criteria: null
                },
                descriptor: {
                    column: 'descriptor',
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
        getAppUserId(appUserId) {
            let appUserIds = this.users.filter((email) => {
                return appUserId.email === email;
            });
            return appUserIds[0].id || null;
        },
        getUserEmail(appUserId) {
            let email = this.users.filter((email) => {
                return email.id == appUserId;
            });
            return email[0].email || '';
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
        //just some test code for moment
        warn() {
               var x = Math.floor((Math.random() * 101));

               alert ("This student's Average Score for this Subject is: " + x +"%.");
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
