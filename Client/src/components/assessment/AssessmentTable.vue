<template>
<table class="table table-sm table-light table-hover bg-light">
    <thead class="table-danger">
        <tr> <!--rows of headings in the table -->
            <th>Email</th>
            <th>Subject</th>
            <th>Test1</th>
            <th>Test2</th>
            <th>Test3</th>
            <th>Test4</th>
            <th>Test5</th>
            <th>Level</th>
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
                <select class="form-control" v-model="search.email.criteria">
                    <option value="" selected>Student Email</option>
                    <option v-for="option in samples" :value="option.id" v-bind:key="option.id">{{ option.email }}</option>
                </select>
            </th>
            <th>
                <select class="form-control" v-model="search.subject.criteria"> 
                    <option value="" selected>Subject</option>
                    <option v-for="option in samples" :value="option.id" v-bind:key="option.id">{{ option.subject }}</option>
                </select>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="%" v-model="search.Test1.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="%" v-model="search.Test2.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="%" v-model="search.Test3.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="%" v-model="search.Test4.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="%" v-model="search.Test5.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Level" v-model="search.examLevel.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Descriptor" v-model="search.descriptor.criteria">
                </div>
            </th>
            <th>
                <button class="btn btn-primary" role="button" aria-pressed="true" v-on:click="getSamples">Find</button>
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
        <tr class="table-danger table-bordered" id="myTable" v-for="row in samples" v-on:click="clickAssessment(row)" :class="{ selected: row.selected }" v-bind:key="row.id" >
            <td>{{ row.email }}</td>
            <td>{{ row.subject }}</td>
            <td>{{ row.Test1 }}</td>
            <td>{{ row.Test2 }}</td>
            <td>{{ row.Test3 }}</td>
            <td>{{ row.Test4 }}</td>
            <td>{{ row.Test5 }}</td>
            <td>{{ row.examLevel }}</td>
            <td>{{ row.descriptor }}</td>

            
            <th>
                <button class="btn btn-success" role="button" aria-pressed="true" v-on:click="findAverage">Average</button>
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
    props: ['assessments', 'subjects', 'users', 'samples'],
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
                Test1: {
                    column: 'Test1',
                    operator: '=',
                    criteria: null
                },
                Test2: {
                    column: 'Test2',
                    operator: '=',
                    criteria: null
                },
                Test3: {
                    column: 'Test3',
                    operator: '=',
                    criteria: null
                },
                Test4: {
                    column: 'Test4',
                    operator: '=',
                    criteria: null
                },
                Test5: {
                    column: 'Test5',
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

        getSamples() {
            // $parent is the parent component (in this case the Syllabus.vue component)
            this.$parent.getSamples(this.search);

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

