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
            <th>
                <button class="btn btn-primary" role="button" aria-pressed="true" v-on:click="getAssessments">Search</button>
            </th>
       <!--     <th>
                <button class="btn btn-success" role="button" aria-pressed="true" v-on:click="findAverage2">Average</button>
            </th> -->
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
            <td>
                <button class="btn btn-success" role="button" aria-pressed="true" v-on:click="clickButton(row)">Average</button>
            </td>
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


//public static NewCode[] GetAltCode(int altCodeVer, string descrip)
//{
//    var sql = @"select Code, Description, VersionID from Code.CodeLookup where versionid=@vers and description=@description";

//    return ObjectFactory.GetInstance<IDatabaseFactory>().Query<NewCode>(sql, new { vers = altCodeVer, description = descrip, }).ToArray();
//}

//<option v-for="(location, index) in locations" v-bind:value="location.id" v-bind:selected="index === 0">
//  {{ location.from }} - {{ location.to }}
// </option>
            findAverage3() {
                let newAverage = {
                appUserId: this.Model.appUserId,
                totalAv: this.model.totalAv,
        };
                this.$parent.findAverage3(newAverage);
        },

 

            findAverage2() {
            const grades = [80, 77, 88, 95, 68];
            //v-model="search.appUserId.criteria"

           // context.Database.SqlQuery<YourMappingClass>("SELECT * FROM Assessment")

//$allowed = false;
//$sqldata = array(":user"=>$userid,":ipaddress"=>$_SERVER['REMOTE_ADDR']);
//$sql = "SELECT IP_Address FROM ITWhitelist WHERE owner = :user && IP_Address = :ipaddress";
//$result = $conn->query($sql);
//if ($result->num_rows > 0) {
//    while($row = $result->fetch_assoc()) {
//        if($row["IP_Address"] == $_SERVER['REMOTE_ADDR']){
//            $allowed = true;
//            break;
//        }
//    }
//}

//if ($allowed)) {
    //Action for allowed IP Addresses
//} else {
    //Action for all other IP Addresses
//    echo 'You are not authorized here.'; 
//    echo "<br />IP Address: ".$_SERVER['REMOTE_ADDR'];
//    exit;
//}

          //  const returned = SELECT percentage FROM dbo.[Assessment] WHERE appUserId = 3;
            const total = grades.reduce((acc, c) => acc + c, 0);
            const answer = total / grades.length;
            alert ("This student's average score is: " + answer +"%.");
            },

//SELECT percentage
//FROM dbo.[Assessment]
//WHERE appUserId = 3;




//var express = require('express'); 
//var app = express();
//var sql = require("mssql");

// config for your database
//var config = {
//    user: 'sa',
//    password: 'deegii2001060108',
//    server: 'localhost\\MSSQLSERVER', 
//    database: 'sample' 
//};

// connect to your database
//    sql.connect(config, function (err) {

//    if (err) console.log(err);

    // create Request object
//    var request = new sql.Request();

    // query to the database and get the records
//    request.query('select * from tblGender', function (err, result) {

//        if (err) console.log(err)

        // send records as a response
//        console.log(JSON.stringify(result));

//    });
//});
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
}
</script>

