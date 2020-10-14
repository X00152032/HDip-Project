<template>
<div>
    <!-- use the modal component, pass in the properties -->
    <form @submit.prevent>
        <div class="form-group">
            <label for="appUserId"><b>Student Email *</b></label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="appUserId" v-model="model.appUserId">
                    <option v-for="option in users" :value="option.id" v-bind:key="option.id">{{ option.email }}</option>
                </select>
            </span>
        </div>
        <div class="form-group">
            <label for="subjectId"><b>Subject *</b></label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="subjectId" v-model="model.subjectId" :class="{ error : errorSubject }" @change="validate">
                    <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>
            </span>
        </div>
        <div class="form-group">
            <label for="assessmentName"><b>Assessment Name *</b></label>
            <input class="form-control" placeholder="Enter name of Assessment" id="assessmentName" v-model="model.assessmentName" :class="{ error : errorName }" @keyup="validate">
        </div>
        <div class="form-group">
            <label for="percentage"><b>Enter score as a %</b></label>
            <input class="form-control" placeholder="Percentage" id="percentage" v-model="model.percentage" :class="{ error : errorName }" @keyup="validate">
        </div>
        <div class="form-group">
            <b>Please Choose an Exam Level</b><br><br>
            <input type="checkbox" name="choice-Higher" id="choice-Higher">
            <label for="choice-Higher">Higher Level</label>
            <div class="reveal-if-active">
            <label for="grade_Higher">Grade</label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="grade" v-model="model.grade">
                    <option value="blank"></option>
                    <option value="H1">H1</option>
                    <option value="H2">H2</option>
                    <option value="H3">H3</option>
                    <option value="H4">H4</option>
                    <option value="H5">H5</option>
                    <option value="H6">H6</option>
                    <option value="H7">H7</option>
                    <option value="H8">H8</option>                                       
                </select>
            </span>
        </div>
        </div>
        <div class="form-group">
            <input type="checkbox" name="choice-Ordinary" id="choice-Ordinary">
            <label for="choice-Ordinary">Ordinary Level</label>
            <div class="reveal-if-active">
            <label for="grade_Ordinary">Grade</label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="grade" v-model="model.grade">
                    <option value="blank"></option>
                    <option value="O1">O1</option>
                    <option value="O2">O2</option>
                    <option value="O3">O3</option>
                    <option value="O4">O4</option>
                    <option value="O5">O5</option>
                    <option value="O6">O6</option>
                    <option value="O7">O7</option>
                    <option value="O8">O8</option>                                        
                </select>
            </span>
        </div>
    </div>
        <div class="form-group">
            <input type="checkbox" name="choice-Foundation" id="choice-Foundation">
            <label for="choice-Foundation">Foundation Level</label>
            <div class="reveal-if-active">
            <label for="grade_Foundation">Grade</label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="grade" v-model="model.grade">
                    <option value="blank"></option>
                    <option value="F1">F1</option>
                    <option value="F2">F2</option>
                    <option value="F3">F3</option>
                    <option value="F4">F4</option>                                        
                </select>
            </span>
        </div>
        <div class="form-group">
            <label for="Descriptor"><b>Descriptor</b></label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="Descriptor" v-model="model.Descriptor">
                    <option value="blank"></option>
                    <option value="Exceptional">Exceptional</option>
                    <option value="Above Expectations">Above Expectations</option>
                    <option value="In line with Expectations">In line with Expectations</option>
                    <option value="Yet to meet Expectations">Yet to meet Expectations</option>
                    <option value="Not Rated">Not Rated</option>
                <!--  <option v-for="option in assessments" :value="option.id" v-bind:key="option.id">{{ option.descriptor }}</option> -->
                </select>
            </span>
        </div>
        </div>

        <div class="form-group"> <!-- main buttons to run add, update, reset -->
            <button class="btn btn-primary" v-on:click="addAssessment" :disabled="!model.isValid">Add</button>
            <button class="btn btn-primary" v-on:click="updateAssessment" :disabled="!model.isValid">Update</button>
            <button class="btn btn-secondary" v-on:click="resetAssessment">Reset</button>
        </div>
    </form>
</div>
</template>

<script>

export default {
    name: 'AssessmentForm',
    props: ['assessments', 'subjects', 'users', 'assessmentModel', 'userModel'],
    components: {
    },
    computed: {
        errorName() {
            return !this.model.isNew && (!this.model.assessmentName || this.model.assessmentName.length < 3);
        },
        
        errorSubject() {
            return !this.model.isNew && !this.model.subjectId;
        }
    },
    data() {
        return {
            model: this.assessmentModel,
            appUserId: null,
            subjectId: null,
            percentage: null,
            grade: null,
            examLevel: null,
            descriptor: null,
        }

    },
    methods: {
        
        validate() {
            this.model.isNew = false;
            // returns an array of 1 subject e.g. [{ id: 0, subjectName: '' }]
            let subject = this.subjects.filter((subject) => {
                return subject.id == this.model.subjectId;
            });
            if (!this.model.assessmentName || this.model.assessmentName.length < 3 || subject.length === 0) {
                this.model.isValid = false;
            } else {
                this.model.isValid = true;
            }
        },

        addAssessment() {
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            let newAssessment = {
                appUserId: this.model.appUserId,
                subjectId: this.model.subjectId,
                yearGroupId: this.model.yearGroupId,
                assessmentName: this.model.assessmentName,
                examLevel: this.model.examLevel,
                percentage: this.model.percentage,
                descriptor: this.model.descriptor,
                grade: this.model.grade,
            };
            this.$parent.addAssessment(newAssessment);
            this.resetAssessment();
        },
        updateAssessment() {
            if (!this.model.id) {
                alert('Please select Assessment to update');
                return; // No content selected
            }
            if (!this.validate()) {
                return; // Not valid no more processing
            }
                let currentAssessment = {
                id: this.model.id,
                appUserId: this.model.appUserId,
                subjectId: this.model.subjectId,
                yearGroupId: this.model.yearGroupId,
                assessmentName: this.model.assessmentName,
                examLevel: this.model.examLevel,
                percentage: this.model.percentage,
                descriptor: this.model.descriptor,
                grade: this.model.grade,
            };
            this.$parent.updateAssessment(currentAssessment); 
            this.resetAssessment();
        },
        resetAssessment() {
            this.model.isNew = true;
            this.model.isValid = false;
            this.model.id = null;
            this.model.assessmentName = null;
            this.model.examLevel = null;
            this.model.percentage = null;
            this.model.grade = null;
            this.model.descriptor = null;
            this.model.appUserId = null;
            this.model.subjectId = null;
            this.model.yearGroupId = null;
        },
    },
}
</script>

<style scoped>
/*Scope applies css to this only*/

article {
    padding-top: 10px;
    border-bottom: 3px solid rgb(33, 54, 240);
}

.delete-icon {
    color: rgb(201, 21, 21);
    display:inline-block;
    text-align: right;
    padding-top: 5px;
    padding-right: 10px;
}



img {
    margin: 10px;
}

p {
    margin: 8px;
}

#choice-Higher {
text-align:center;
}

#choice-Higher input{
margin: 10px 0px 0px 0px;
}

#choice-Higher label{
margin: 10px 0px 0px 3px;
}

.reveal-if-active {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

input[type="checkbox"]:checked ~ .reveal-if-active {
  opacity: 1;
  max-height: 100px; /* little bit of a magic number :( */
  overflow: visible;
}
</style>