<template>
<div>
    <!-- use the modal component, pass in the properties -->
    <AssessmentDialog v-if="showAssessmentDialog" @close="showAssessmentDialog = false" :subjectId="subjectId" :testId="model.testId" :appUserId="model.appUserId">
        <h3 slot="header">Add/Edit Tests</h3>
    </AssessmentDialog>

<!-- the form itself -->
    <form @submit.prevent>
        <div class="form-group">
            <label for="appUserId">User *</label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="appUserId" v-model="model.appUserId" :class="{ error : errorAppUser }" @change="validate">
                    <option v-for="option in appUser" :value="option.id" v-bind:key="option.id">{{ option.email }}</option>
                </select>

        <div class="form-group">
            <label for="subjectId">Subject *</label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="subjectId" v-model="model.subjectId" :class="{ error : errorSubject }" @change="validate">
                    <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>

        <div class="form-group">
            <label for="testId">Tests *</label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="testId" v-model="model.testId" :class="{ error : errorTest }" @change="validate">
                    <option v-for="option in tests" :value="option.id" v-bind:key="option.id">{{ option.testName }}</option>
                </select>
                <button class="btn btn-primary" @click="addTest()">
                    <font-awesome-icon icon="plus-square" /></button>
                <button class="btn btn-primary" @click="updateTest()" :disabled="!this.model.testId">
                    <font-awesome-icon icon="pen-square" /></button>
                <button class="btn btn-primary" @click="deleteTest()" :disabled="!this.model.testId">
                    <font-awesome-icon icon="minus-square" /></button>
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
import AssessmentDialog from '../AssessmentDialog'; //call in test dialog to add/edit/remove etc 

export default {
    name: 'AssessmentForm',
    props: ['appUser', 'tests', 'assessmentModel'],
    components: {
        AssessmentDialog,
    },
    computed: {
        errorAppUser() {
            return !this.model.isNew && !this.model.appUserId;
        },
        errorSubject() {
            return !this.model.isNew && !this.model.subjectId;
        },
        errorTest() {
            return !this.model.isNew && !this.model.testId;
        }
    },
    data() {
        return {
            model: this.AssessmentModel,
            showTestDialog: false,
            appUserId: null,
            subjectId: null,
            testId: null,
        }
    },
    methods: {
        addTest() {
            this.model.testId = null;
            this.showTestDialog = true;
        },
        updateTest() {
            this.showTestDialog = true;
        },
        deleteTest() {
            let test = this.tests.filter((test) => {
                return test.id == this.model.testId;
            });
            if (confirm(`Are you sure you want to do delete the Test "${test[0].testName}"?`)) {
                this.$parent.deleteTest(this.model.testId);
                this.model.testId = null;
            }
        },
        validate() {
            this.model.isNew = false;
            // returns an array of 1 test e.g. [{ id: 0, testName: '' }]
            let test = this.tests.filter((test) => {
                return test.id == this.model.testId;
            });
            if (!this.model.testName || this.model.testName.length < 3 || test.length === 0) {
                this.model.isValid = false;
            } else {
                this.model.isValid = true;
            }
            return this.model.isValid;
        },

        addAssessment() {
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            let newAssessment = {
                appUserId: this.model.appUserId,                
                subjectId: this.model.subjectId,
                testId: this.model.testId,
                testName: this.model.testName,
                level: this.model.level,
                percentage: this.model.percentage,
                grade: this.model.grade,
                descriptor: this.model.descriptor,
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
                testId: this.model.testId,
                testName: this.model.testName,
                level: this.model.level,
                percentage: this.model.percentage,
                grade: this.model.grade,
                descriptor: this.model.descriptor,
            };
            this.$parent.updateAssessment(currentAssessment);
            this.resetAssessment();
        },
        resetAssessment() {
            this.model.isNew = true;
            this.model.isValid = false;
            this.model.id = null;
            this.model.appUserId = null;
            this.model.subjectId = null;
            this.model.testId = null;
            this.model.testName = null;
            this.model.level = null;
            this.model.percentage = null;
            this.model.grade = null;
            this.model.descriptor = null;
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

#checkboxes {
text-align:left;
}

#checkboxes input{
margin: 10px 0px 0px 0px;
}

#checkboxes label{
margin: 10px 0px 0px 3px;
}
</style>