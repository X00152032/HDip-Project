<!-- Syllabus Page -->
<template>
<div class="subject container-fluid">
    <div class=title> 
        <h5>Add, Edit and Remove Subjects and Syllabus Content</h5> <hr> 
    </div>
    <Syllabus :contentModel="models.contentModel" :subjectModel="models.subjectModel" />
</div>
</template>

<script>
// @ is an alias to /src
// calls in the Syllabus.vue page layout (which contains the form and table)
import Syllabus from '@/components/syllabus/Syllabus.vue';

export default {
    name: 'SyllabusPage',
    props: ['models'],
    components: {
        Syllabus,
    }
}
</script>

<style scoped>

.title{
margin-left:45px;
}

.subject h5{
    text-align: center;
}
</style>