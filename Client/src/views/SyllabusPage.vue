<!-- Syllabus Page -->
<template>
<div class="subject container-fluid">
    <div class=title> 
        <h2>Edit Subjects and/or Home pages content</h2> <hr> 
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