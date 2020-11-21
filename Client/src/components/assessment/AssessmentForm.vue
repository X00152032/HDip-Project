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
            <label for="yearGroup"><b>Year Group</b></label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="yearGroup" v-model="model.yearGroup">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                <!--  <option v-for="option in assessments" :value="option.id" v-bind:key="option.id">{{ option.descriptor }}</option> -->
                </select>
            </span>
        </div>
        
        <div class="form-group">
          <label for="subjectId"><b>Subject *</b></label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="subjectId" v-model="model.subjectId" :class="{ error : errorSubject }">
                  <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>
            </span>
        </div>
        
        <div class="form-group">
            <label for="assessmentName"><b>Assessment Name *</b></label>
            <input class="form-control" placeholder="Enter name of Assessment" id="assessmentName" v-model="model.assessmentName" :class="{ error : errorName }" @keyup="validate">
        </div>

    <div class="Test" id="checkboxes" name="Test"> <!-- open div for all of Test or CBA -->
          <b>Please Choose an Assessment Type</b><br>
            <input type="checkbox" id="assessmentType" v-model="model.isTest" v-on:click="TestSelected()">
              <label><b>Test</b></label>
                <div class="reveal-if-active"> <!-- open div to reveal all under Test -->
                  
                  
                  <div class="form-group">
                    <label for="percentage"><b>Enter score as a %</b></label>
                      <input class="form-control" placeholder="Percentage" id="percentage" v-model="model.percentage" :class="{ error : errorName }">
                  </div>
              
         
          <div class="form-group" id="checkboxes">
              <b>Please Choose a Subject Level</b><br>
                <input type="radio" name="radio" id="subjectLevelHigher" v-model="model.isHigher">
                  <label>Higher Level</label>
                      <div class="reveal-if-active">
                        <label>Grade</label> <!-- drop-down box option -->
                                <span class="form-inline" style="display:flex;">
                                    <select class="form-control" style="flex-grow:1;" id="gradeHigh" v-model="model.grade">
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

              <div class="form-group" id="checkboxes">
                <input type="radio" name="radio" id="subjectLevelOrdinary" v-model="model.isOrdinary">
                    <label>Ordinary Level</label>
                        <div class="reveal-if-active">
                          <label>Grade</label> <!-- drop-down box option -->
                            <span class="form-inline" style="display:flex;">
                              <select class="form-control" style="flex-grow:1;" id="gradeOrd" v-model="model.grade">
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
                            
              <div class="form-group" id="checkboxes">
                <input type="radio" name="radio" id="subjectLevelFoundation" v-model="model.isFoundation">
                    <label>Foundation Level</label>
                        <div class="reveal-if-active">
                          <label>Grade</label> <!-- drop-down box option -->
                            <span class="form-inline" style="display:flex;">
                              <select class="form-control" style="flex-grow:1;" id="gradeFound" v-model="model.grade">
                                <option value="blank"></option>
                                <option value="F1">F1</option>
                                <option value="F2">F2</option>
                                <option value="F3">F3</option>
                                <option value="F4">F4</option>                                        
                              </select>
                            </span>
                        </div>
              </div>
 </div> <br>    <!-- close ,div reveal-if-active> -->
        <div class="CBA" id="checkboxes" name="CBA">        
          <input type="checkbox" id="assessmentType" v-model="model.isCBA" v-on:click="CbaSelected()">
              <label><b>CBA</b></label><br>
                <div class="reveal-if-active">
        <div class="form-group">
            <label for="descriptor"><b>Descriptor</b></label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="descriptor" v-model="model.descriptor">
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
                </div></div>
        <br>
        <div class="form-group"> <!-- main buttons to run add, update, reset -->
            <button class="btn btn-primary" v-on:click="addAssessment" :disabled="!model.isValid">Add</button>
            <button class="btn btn-primary" v-on:click="updateAssessment" :disabled="!model.isValid">Update</button>
            <button class="btn btn-danger" v-on:click="resetAssessment">Reset</button>
        </div>
        <div> <h4><b>Choose the criteria required in Search, and then press Average</b></h4> </div>
    </form>
</div>
</template>

<script>
export default {
  name: "AssessmentForm",
  props: ["assessments", "subjects", "users", "assessmentModel", "userModel", "contentModel"],
  computed: {
    errorName() {
      return (
        !this.model.isNew &&
        (!this.model.assessmentName || this.model.assessmentName.length < 3)
      );
    },

    errorSubject() {
      return !this.model.isNew && !this.model.subjectId;
    }

  },
  data() {
    return {
      model: this.assessmentModel,
      appUserId: null,
      yearGroup: null,
      subjectId: null,
      subjectLevel: null,
      assessmentName: null,
      assessmentType: null,
      percentage: null,
      grade: null,
      descriptor: null,
    }
  },

  methods: {
    validate() {
     this.model.isNew = false;
            if (!this.model.assessmentName || this.model.assessmentName.length < 3) {
                this.model.isValid = false;
            } else {
                this.model.isValid = true;
            }
            return this.model.isValid;
        },
     //use this to clear the fields in other assessment type if type is changed/selected
    TestSelected(){
      this.model.descriptor = null;
      this.model.isTest = true;
      this.model.isCBA = false;
      },

     //use this to clear the fields in other assessment type if type is changed/selected
    CbaSelected(){
      this.model.subjectLevel = null;
      this.model.percentage = null;
      this.model.grade = null;
      this.model.descriptor = null;
      this.model.isTest = false;
      this.model.isCBA = true;
    },


    addAssessment() {
      if (!this.validate()) {
        return; // Not valid no more processing
      }
      if (this.model.isTest) {
        this.model.assessmentType = "Test";
      } else if (this.model.isCBA) {
        this.model.assessmentType = "CBA";
      } else {
        alert("Please select an Assessment Type");
        return;
      }

      if (this.model.isHigher) {
        this.model.subjectLevel = "Higher";
      } 
      else if (this.model.isOrdinary) {
        this.model.subjectLevel = "Ordinary";
      }
      else if (this.model.isFoundation) {
        this.model.subjectLevel = "Foundation";
        return;
      }

      let newAssessment = {
        appUserId: this.model.appUserId,
        yearGroup: this.model.yearGroup,
        subjectId: this.model.subjectId,
        subjectLevel: this.model.subjectLevel,
        assessmentName: this.model.assessmentName,
        assessmentType: this.model.assessmentType,
        percentage: this.model.percentage,
        grade: this.model.grade,
        descriptor: this.model.descriptor,
      };
      this.$parent.addAssessment(newAssessment);
      this.resetAssessment();
    },



      updateAssessment() {
      if (!this.model.id) {
        alert("Please select Assessment to update");
        return; // No content selected
      }
      if (!this.validate()) {
        return; // Not valid no more processing
      }

      if (this.model.isTest) {
        this.model.assessmentType = "Test",
        this.model.isCBA = false;
      } else if (this.model.isCBA) {
        this.model.assessmentType = "CBA",
        this.model.isTest = false;
      } else {
        alert("Please select an Assessment Type");
        return;
      }
      if (this.model.isHigher) {
        this.model.subjectLevel = "Higher";
      } 
      else if (this.model.isOrdinary) {
        this.model.subjectLevel = "Ordinary";
      }
      else if (this.model.isFoundation) {
        this.model.subjectLevel = "Foundation";
        return;
      }

      
      let currentAssessment = {
        id: this.model.id,
        appUserId: this.model.appUserId,
        yearGroup: this.model.yearGroup,
        subjectId: this.model.subjectId,
        subjectLevel: this.model.subjectLevel,
        assessmentName: this.model.assessmentName,
        assessmentType: this.model.assessmentType,
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
      //
      this.model.appUserId = null;
      this.model.yearGroup = null;
      this.model.subjectId = null;
      this.model.subjectLevel = null;
      this.model.assessmentName = null;
      this.model.assessmentType = null;
      this.model.percentage = null;
      this.model.grade = null;
      this.model.descriptor = null;
      this.model.isHigher = false;
      this.model.isOrdinary = false;
      this.model.isFoundation = false;
      this.model.isTest = false;
      this.model.isCBA = false;
    },
  },
};
</script>

<style scoped>
/*Scope applies css to this only*/

article {
  padding-top: 10px;
  border-bottom: 3px solid rgb(33, 54, 240);
}

.delete-icon {
  color: rgb(201, 21, 21);
  display: inline-block;
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

h4 {
    text-align: right;
}

#checkboxes {
  text-align: left;
}

#checkboxes input {
  margin: 0px 0px 0px 10px;
}

#checkboxes label {
  margin: 0px 0px 0px 10px;
}

.reveal-if-active {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

input[type="checkbox"]:checked ~ .reveal-if-active {
  opacity: 1;
  max-height: 600px; /* little bit of a magic number :( */
  overflow: visible;
}

input[type="radio"]:checked ~ .reveal-if-active {
  opacity: 1;
  max-height: 600px; /* little bit of a magic number :( */
  overflow: visible;
}

#subjectLevel {
  text-align: left;
}

#subjectLevel input {
  margin: 5px 5px 0px 0px;
}

#subjectLevel label {
  margin: 5px 0px 0px 3px;
}

input[type=checkbox] ~ div.CBA {display:block}
input[type=checkbox]:checked ~ div.CBA {display:none}


</style>