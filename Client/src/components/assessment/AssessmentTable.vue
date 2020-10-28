<template>
<table class="table table-sm table-light table-hover bg-light">
    <thead class="table-danger">
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
                &nbsp;  <!--needed to continue table line-->
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
                    <input class="form-control" placeholder="Year Group" v-model="search.yearGroupId.criteria">
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
            <th>
                <button class="btn btn-primary" role="button" aria-pressed="true" v-on:click="getAssessments">Search</button>
            </th>
            <th>
                <button class="btn btn-success" role="button" aria-pressed="true" v-on:click="findAverage">Average</button>
            </th>
            <th>
                &nbsp;
            </th>
        </tr>
    </thead>
    <tbody> <!--rows of values in the table -->
        <tr class="table-danger table-bordered" id="" v-for="row in assessments" v-on:click="clickAssessment(row)" :class="{ selected: row.selected }" v-bind:key="row.id" >
            <td>{{ getEmail(row.appUserId) }}</td>
            <td>{{ getSubjectName(row.subjectId) }}</td>
            <td>{{ row.yearGroupId }}</td>
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
                yearGroupId: {
                    column: 'yearGroupId',
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
        getAssessments() {
            // $parent is the parent component (in this case the assessment.vue component)
            this.$parent.getAssessments(this.search);

        },

        //just some test code for moment - creates random number 35 to 100%
        findAverage() {
               var x = Math.floor(Math.random() * 67)+35;
               alert ("This student's average score for this subject is: " + x +"%.");
        },
//trying code to get average of html table
//        myFunction() {
//        var table = document.getElementById("myTable");
//        var rows = table.rows;
//
//        for (var i = 1; i < rows.length; i++) {
//            var cells = rows[i].cells;
//            var sum = 0;
//            var numbers = 0;
//        for (var x = 2; x < (cells.length -1); x++) {
//            var cell = cells[x];
//            var addme = parseInt(cell.innerHTML);
//        if(!isNaN(addme)) {       
//            sum += addme;
//            numbers++;
//       }
//        }
//       var average = sum / numbers;
//        alert ("Student's average score for this Subject is: " + Math.round(average) +"%.");
//        }}
//    },

        deleteAssessment(event, row) {
            // stop showing content if deleted
            event.stopPropagation();
            if (confirm(`Are you sure you want to delete the Assessment "${row.assessmentName}"?`)) {
                this.$parent.deleteAssessment(row.id);
            }
        },
    }
}
</script>

