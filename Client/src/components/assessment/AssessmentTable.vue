<template>
<table class="table table-sm table-light table-hover bg-light">
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
                <button class="btn btn-success" role="button" aria-pressed="true" v-on:click="clickButton(row)">Average</button>
            </td>
       <!--  <th>
                <button class="btn btn-success" role="button" aria-pressed="true" v-on:click="findAverage2">Average</button>
            </th> -->
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
         <!--   <th>
                <button class="btn btn-success" role="button" aria-pressed="true" v-on:click="clickButton(row)">Average</button>
            </th>  -->
            <th class="delete-icon">
                <a href="javascript:;" v-on:click="deleteAssessment($event, row)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </th>
   <!--         <th class="btn btn primary" role="button" aria-pressed="true">
                <a href="javascript:;" v-on:click="deleteAssessment($event, row)">
                </a>
            </th> -->
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

        //just some test code for moment - creates random number 35 to 100%
        findAverage() {
               var x = Math.floor(Math.random() * 67)+35;
               alert ("This student's average score for this subject is: " + x +"%.");
        },

//trying code to get average of html table
        myFunction() {
        var table = document.getElementById("myTable");
        var rows = table.rows;

        for (var i = 1; i < rows.length; i++) {
            var cells = rows[i].cells;
            var sum = 0;
            var numbers = 0;
        for (var x = 2; x < (cells.length -1); x++) {
            var cell = cells[x];
            var addme = parseInt(cell.innerHTML);
        if(!isNaN(addme)) {       
            sum += addme;
            numbers++;
       }
        }
       var average = sum / numbers;
        alert ("Student's average score for this Subject is: " + Math.round(average) +"%.");
        }}
    },

            findAverage3() {
                let newAverage = {
                appUserId: this.Model.appUserId,
                totalAv: this.model.totalAv,
        };
                this.$parent.findAverage3(newAverage);
        },

 

            findAverage2() {
            const grades = [80, 77, 88, 95, 68];
            const total = grades.reduce((acc, c) => acc + c, 0);
            const answer = total / grades.length;
            alert ("This student's average score is: " + answer +"%.");
            },





        GetCellValues() {
        var table = document.getElementById('mytable');
        for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            alert(table.rows[r].cells[c].innerHTML);
        }
    }
},


        deleteAssessment(event, row) {
            // stop showing content if deleted
            event.stopPropagation();
            if (confirm(`Are you sure you want to delete the Assessment "${row.assessmentName}"?`)) {
                this.$parent.deleteAssessment(row.id);
            }
        },
}
</script>

