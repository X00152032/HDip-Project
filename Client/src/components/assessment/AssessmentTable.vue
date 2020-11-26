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
            <td>
                <button class="btn btn-warning" role="button" aria-pressed="true" v-on:click="calcPoints()">Points</button>
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
                if (num == 0) //added to stop CBA results affecting Average of all Tests and CBAs.
                    count--;  //decrement count to leave out CBA rows
                else
                    total += num;
                    count++;    //increment count for tests only
        }
        var average = total/count;
        var rounded = Math.round(average * 10) / 10     //round to 1 deciaml place
        if (isNaN(rounded))         //code to catch NaN and display a user-friendly alert.
            alert("Please see the CBA descriptor column for CBA results.");
        else
            alert("This student's average test score is: " + rounded +"%.")
},

        //function to calculate points from dynamic table
        //gets contents of subjects column, level and grade and makes arrays
        
        calcPoints() {    
        var tbl = document.getElementById('myTable');
        const arr= [];
        const pointsArr= [];
        const subjectsArr =[];
        const subjectLevelArr= [];
        var score = 0;

            // array to get Subject Name
            for(var m= 2; m<tbl.rows.length; m++){
                subjectsArr.push(tbl.rows[m].cells[1].innerHTML); }
                // subjectsArr.forEach(element => (element))
             //   console.log(subjectsArr)
                //find index of "Maths" and then use to find Higher or Ord in subject array, e.g. 7
                const mathsIndex = (element) => element == 'Maths';        

            // array to get Higher or Ordinary Level
            for(var k= 2; k<tbl.rows.length; k++){
                subjectLevelArr.push(tbl.rows[k].cells[3].innerHTML); }
                subjectLevelArr.forEach(element => (element));
            // get value of level at index ('Maths') directly using results of mathsIndex
            var valueAtIndex = subjectLevelArr[subjectsArr.findIndex(mathsIndex)];
           // console.log(valueAtIndex)


            // array to get grade (H1, etc)
            for(var i= 2; i<tbl.rows.length; i++){
                arr.push(tbl.rows[i].cells[6].innerHTML); }
            //    console.log(arr)
                arr.forEach(element => (element));
               
            //create array (called pointsArr) to hold points for each grade in the grade array (arr)
                for (i = 0; i < arr.length; i++) {
                if (arr[i] =="H1") {
                    pointsArr.push(100);
        }       else if (arr[i] == "H2") {
                    pointsArr.push(88);
        }       else if (arr[i] == "H3") {
                    pointsArr.push(77);
        }       else if (arr[i] == "H4") {
                    pointsArr.push(66);
        }       else if (arr[i] == "H5") {
                     pointsArr.push(56);
        }       else if (arr[i] == "H6") {
                    pointsArr.push(46);
        }       else if (arr[i] == "H7") {
                    pointsArr.push(37);
        }       else if (arr[i] == "H8") {
                    pointsArr.push(0);
        }       else if (arr[i] =="O1") {
                    pointsArr.push(56);
        }       else if (arr[i] == "O2") {
                    pointsArr.push(46);
        }       else if (arr[i] == "O3") {
                    pointsArr.push(37);
        }       else if (arr[i] == "O4") {
                    pointsArr.push(28);
        }       else if (arr[i] == "O5") {
                    pointsArr.push(12);
        }       else if (arr[i] == "O6") {
                    pointsArr.push(0);
        }       else if (arr[i] == "O7") {
                    pointsArr.push(0);
        }       else if (arr[i] == "O8") {
                    pointsArr.push(0);                   
        }       else if (arr[i] == "F1") {
                    pointsArr.push(20);
        }       else if (arr[i] == "F2") {
                    pointsArr.push(12);
        }}
         
        // sort the points array to order low to high and then remove some to leave top 6 points
             pointsArr.sort(function(a, b){return b-a});
  //           console.log(pointsArr)
            pointsArr.length = 6;
//            console.log(pointsArr)
score = pointsArr.reduce((a, b) => a + b, 0) //add up array and set score to array

//look up yearGroup and see if it's Senior Cycle or not. Give appropriate message.
    for(i= 2; i<tbl.rows.length; i++){
            var year = Number(tbl.rows[i].cells[2].innerHTML); }
   //     console.log(year)
    if (year <= 4) // 4th year or less get no points
        alert("Sorry, no points available.\nThis student is in Year " + year + ", and not in Senior Cycle.")
    
    if (year >= 4.5){  //look up Maths and see if it's honours, then add 25 points if it is.
      // take valueatIndex from above (Higher, Ordinary or foundation) - if Higher then add 25.
                    if (valueAtIndex == "Higher"){
                        score = score + 25;
                         alert("This student has scored " + score + " points at Senior Cycle.\n25 bonus points for Higher-level Maths have been included." )}
                    else
                         alert("This student has scored " + score + " points at Senior Cycle." )
        }},


        deleteAssessment(event, row) {
        // stop showing content if deleted
        event.stopPropagation();
        if (confirm(`Are you sure you want to delete the Assessment "${row.assessmentName}"?`)) {
            this.$parent.deleteAssessment(row.id);
        }
        },
}}
</script>

