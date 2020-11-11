<template>
<table class="table table-sm table-light table-hover bg-light" id="myTable">
    <thead class="table-danger" id="myTable">
        <tr> <!--rows of headings in the table -->
            <th>Email</th>
            <th>Subject</th>
            <th>Year</th>
            <th>Subject Level</th>
            <th>Exam type</th>
            <th>Percentage</th>
            <th>Grade</th>
            <th>Descriptor</th> 
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
                <select class="form-control" v-model="search.appUserId.criteria">
                    <option value="" selected>Student Email</option>
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
                    <input class="form-control" placeholder="Year Group" v-model="search.yearGroup.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Level" v-model="search.subjectLevel.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Type" v-model="search.assessmentType.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="%" v-model="search.percentage.criteria">
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
            </th>
            <td>
                <button class="btn btn-primary" role="button" aria-pressed="true" v-on:click="getAssessments">Search</button>
            </td>
            <td>
                <button class="btn btn-danger" v-on:click="resetSearch">Reset</button>
            </td>
            <td>
                <button class="btn btn-success" role="button" aria-pressed="true" v-on:click="calcAverage">Average</button>
            </td>
        </tr>
    </thead>
    <tbody> <!--rows of values in the table -->
        <tr class="table-danger table-bordered" id="" v-for="row in assessments" v-on:click="clickAssessment(row)" :class="{ selected: row.selected }" v-bind:key="row.id" >
            <td>{{ getEmail(row.appUserId) }}</td>
            <td>{{ getSubjectName(row.subjectId) }}</td>
            <td>{{ row.yearGroup }}</td>
            <td>{{ row.subjectLevel }}</td>
            <td>{{ row.assessmentType }}</td>
            <td>{{ row.percentage }}</td>
            <td>{{ row.grade }}</td>
            <td>{{ row.descriptor }}</td>
            <th>
                &nbsp;
            </th>
            <th>
                &nbsp;
            </th>
            <th class="delete-icon">
                <a href="javascript:;" v-on:click="deleteAssessment($event, row)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </th>
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
                appUserId: {
                    column: 'appUserId',
                    operator: '=',
                    criteria: null
                },
                subjectId: {
                    column: 'subjectId',
                    operator: '=',
                    criteria: null
                },
                yearGroup: {
                    column: 'yearGroup',
                    operator: '=',
                    criteria: null
                },
                subjectLevel: {
                    column: 'subjectLevel',
                    operator: '=',
                    criteria: null
                },
                assessmentName: {
                    column: 'assessmentName',
                    operator: '=',
                    criteria: null
                },
                assessmentType: {
                    column: 'assessmentType',
                    operator: '=',
                    criteria: null
                },
                percentage: {
                    column: 'percentage',
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
        getAssessmentId(name) {
            let assessmentIds = this.assessments.filter((assessment) => {
                return assessment.assessmentName === name;
            });
            return assessmentIds[0].id || null;
        },
        getAssessmentName(assessmentId) {
            let assessment = this.assessments.filter((assessment) => {
                return assessment.id == assessmentId;
            });
            return assessment[0].assessmentName || '';
        },
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
        getEmail(appUserId) {
            let appUser = this.users.filter((appUser) => {
                return appUser.id == appUserId;
            });
            return appUser[0].email || '';
        },
        clickAssessment(row) {
            this.assessments.forEach((assessment) => {
                assessment.selected = false;
            });
            row.selected = true;
            this.$parent.getAssessment(row.id);
        },
        clickButton(row) {
            this.assessments.forEach((assessment) => {
                assessment.selected = false;
            });
            row.selected = true;
            this.$parent.getAverage(row.id);
        },
        getAssessments() {
            // $parent is the parent component (in this case the assessment.vue component)
            this.$parent.getAssessments(this.search, this.sortItem);

        },
        sortClick(column) {
            this.sortItem.column = column;
            if (this.sortItem.direction === 'asc') {
                this.sortItem.direction = 'desc';
                this.getAssessments();
            } else {
                this.sortItem.direction = 'asc';
                this.getAssessments();
            }
        },
        //added after request from a teacher - beta tester in school - resets table data and search boxes 
        resetSearch() {
        this.search.appUserId.criteria = "";
        this.search.subjectId.criteria = "";
        this.search.yearGroup.criteria = "";
        this.search.subjectLevel.criteria = "";
        this.search.assessmentName.criteria = "";
        this.search.assessmentType.criteria = "";
        this.search.percentage.criteria = "";
        this.search.grade.criteria = "";
        this.search.descriptor.criteria = "";
        this.$parent.getData();
        },
 
        //function to calculate average from dynamic table
        //gets contents of percentage column and checks each row to finally calculate and round average
        calcAverage() {    
        var tbl = document.getElementById('myTable');
        var count = 0;
        var total = 0;
            for(var i= 2; i<tbl.rows.length; i++){
                var num = Number(tbl.rows[i].cells[5].innerHTML);
                total += num;
                count++;
        }
        console.log(total/count);
        var average = total/count;
        var rounded = Math.round(average * 10) / 10
        alert("Student's average score is: " + rounded +"%.")
},


        deleteAssessment(event, row) {
        // stop showing content if deleted
        event.stopPropagation();
        if (confirm(`Are you sure you want to delete the Assessment "${row.assessmentName}"?`)) {
            this.$parent.deleteAssessment(row.id);
        }
        },
}}
</script>

