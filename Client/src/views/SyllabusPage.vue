<!-- Syllabus Page -->
<template>
<div class="syllabus container-fluid"> <!-- call models (based on db tables) to page --> 
<h4>Add, Edit and Remove Subjects and Syllabus Content - visible when logged in as Teacher/Admin</h4>
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
