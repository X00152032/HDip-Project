<template>
<div>
    <!-- use the modal component, pass in the properties -->
    <SubjectDialog v-if="showSubjectDialog" @close="showSubjectDialog = false" :subjectId="model.subjectId">
        <h3 slot="header">Add/Edit Subject</h3>
    </SubjectDialog>

<!-- the form itself -->
    <form @submit.prevent>
        <div class="form-group">
            <label for="contentName">Content Name *</label>
            <input class="form-control" placeholder="Name of Content" id="contentName" v-model="model.contentName" :class="{ error : errorName }" @keyup="validate">
        </div>
        <div class="form-group">
            <label for="contentDescription">Description</label>
            <input class="form-control" placeholder="Description of Content" id="description" v-model="model.description">
        </div>
        <div class="form-group">
            <label for="text">Text *</label>
            <input type="form-control" class="form-control" placeholder="Your text here" id="text" v-model="model.text">
        </div>
        <div class="form-group">
            <label for="subjectId">Subject *</label> <!-- drop-down box option -->
            <span class="form-inline" style="display:flex;">
                <select class="form-control" style="flex-grow:1;" id="subjectId" v-model="model.subjectId" :class="{ error : errorSubject }" @change="validate">
                    <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>
                <button class="btn btn-primary" @click="addSubject()">
                    <font-awesome-icon icon="plus-square" /></button>
                <button class="btn btn-primary" @click="updateSubject()" :disabled="!this.model.subjectId">
                    <font-awesome-icon icon="pen-square" /></button>
                <button class="btn btn-primary" @click="deleteSubject()" :disabled="!this.model.subjectId">
                    <font-awesome-icon icon="minus-square" /></button>
            </span>
        </div>
        <div class="form-group"> <!-- upload picture option -->
            <label for="files">Picture</label> &nbsp; &nbsp;
            <input type="file" id="files" name="files" multiple @change="onFileSelected">
        </div>

        
        <div class="form-group"> <!-- main buttons to run add, update, reset -->
            <button class="btn btn-primary" v-on:click="addContent" :disabled="!model.isValid">Add</button>
            <button class="btn btn-primary" v-on:click="updateContent" :disabled="!model.isValid">Update</button>
            <button class="btn btn-secondary" v-on:click="resetContent">Reset</button>
        </div>
    </form>
</div>
</template>

<script>
import SubjectDialog from '../SubjectDialog'; //call in subject dialog to add/edit/remove etc 

export default {
    name: 'SyllabusForm',
    props: ['contents', 'subjects', 'contentModel'],
    components: {
        SubjectDialog,
    },
    computed: {
        errorName() {
            return !this.model.isNew && (!this.model.contentName || this.model.contentName.length < 3);
        },
        
        errorSubject() {
            return !this.model.isNew && !this.model.subjectId;
        }
    },
    data() {
        return {
            model: this.contentModel,
            showSubjectDialog: false,
            subjectId: null,
            files: [],
        }
    },
    methods: {
        onFileSelected(event) {
            this.files = event.target.files;
        },
        addSubject() {
            this.model.subjectId = null;
            this.showSubjectDialog = true;
        },
        updateSubject() {
            this.showSubjectDialog = true;
        },
        deleteSubject() {
            let subject = this.subjects.filter((subject) => {
                return subject.id == this.model.subjectId;
            });
            if (confirm(`Are you sure you want to do delete the Subject "${subject[0].subjectName}"?`)) {
                this.$parent.deleteSubject(this.model.subjectId);
                this.model.subjectId = null;
            }
        },
        validate() {
            this.model.isNew = false;
            // returns an array of 1 subject e.g. [{ id: 0, subjectName: '' }]
            let subject = this.subjects.filter((subject) => {
                return subject.id == this.model.subjectId;
            });
            if (!this.model.contentName || this.model.contentName.length < 3 || subject.length === 0) {
                this.model.isValid = false;
            } else {
                this.model.isValid = true;
            }
            return this.model.isValid;
        },
        addContent() {
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            let newContent = {
                subjectId: this.model.subjectId,
                contentName: this.model.contentName,
                description: this.model.description,
                text: this.model.text,
            };
            this.$parent.addContent(newContent, this.files);
            this.resetContent();
        },
        updateContent() {
            if (!this.model.id) {
                alert('Please select Content to update');
                return; // No content selected
            }
            if (!this.validate()) {
                return; // Not valid no more processing
            }
            let currentContent = {
                id: this.model.id,
                subjectId: this.model.subjectId,
                contentName: this.model.contentName,
                description: this.model.description,
                text: this.model.text,
            };
            this.$parent.updateContent(currentContent, this.files);
            this.resetContent();
        },
        resetContent() {
            this.model.isNew = true;
            this.model.isValid = false;
            this.model.id = null;
            this.model.subjectId = null;
            this.model.contentName = null;
            this.model.description = null;
            this.model.text = null;
            this.files = [];
        },
    },
}
</script>

<style scoped>
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
</style>
