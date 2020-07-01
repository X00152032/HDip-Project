<template>
<table class="table table-dark table-hover bg-secondary">
    <thead>
        <tr> <!--rows of headings in the table -->
            <th>Name</th>
            <th>Description</th>
            <th>Text</th>
            <th>Subject</th>
            <th>
                &nbsp;  <!--needed to continue table line -->
            </th>
            <th>    
                &nbsp;
            </th>
            <th>
                &nbsp;
            </th>
        </tr>
    </thead>
    <thead>
        <tr>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Name" v-model="search.contentName.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control" placeholder="Description" v-model="search.description.criteria">
                </div>
            </th>
            <th>
                <div style="display:flex;">
                    <input class="form-control search-small" placeholder="Text" v-model="search.text.criteria">
                </div>
            </th>
            <th>
                <select class="form-control" v-model="search.subject.criteria">
                    <option value="" selected>Subject</option>
                    <option v-for="option in subjects" :value="option.id" v-bind:key="option.id">{{ option.subjectName }}</option>
                </select>
            </th>
            <th>
                <button class="btn btn-primary" v-on:click="getContents">Find</button>
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
        <tr v-for="row in contents" v-on:click="clickContent(row)" :class="{ selected: row.selected }" v-bind:key="row.id" >
            <td>{{ row.contentName }}</td>
            <td>{{ row.description }}</td>
            <td>{{ row.text }}</td>
            <td>{{ getSubjectName(row.subjectId) }}</td>
            <td class="delete-icon">
                <a href="javascript:;" v-on:click="deleteContent($event, row)">
                    <font-awesome-icon icon="minus-circle" />
                </a>
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
export default {
    name: 'SyllabusTable',
    props: ['contents', 'subjects'],
    data: () => {
        return {
            // used for search
            search: {
                contentName: {
                    column: 'contentName',
                    operator: '=',
                    criteria: null
                },
                description: {
                    column: 'description',
                    operator: '=',
                    criteria: null
                },
                text: {
                    column: 'text',
                    operator: '=',
                    criteria: null
                },
                subject: {
                    column: 'subjectId',
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
        clickContent(row) {
            this.contents.forEach((content) => {
                content.selected = false;
            });
            row.selected = true;
            this.$parent.getContent(row.id);
        },
        getContents() {
            // $parent is the parent component (in this case the Syllabus.vue component)
            this.$parent.getContents(this.search);
        },
        deleteContent(event, row) {
            // stop propagation of the event to the table row
            event.stopPropagation();
            if (confirm(`Are you sure you want to delete the Content "${row.contentName}"?`)) {
                this.$parent.deleteContent(row.id);
            }
        },
    },
}
</script>
