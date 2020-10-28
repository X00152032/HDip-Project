<!-- Assessment Page -->
<template>
<div class="subject container-fluid">
    <div class=title> 
        <h2>Assessments</h2> <hr> 
    </div>
    <Assessment :contentModel="models.contentModel" :subjectModel="models.subjectModel" :assessmentModel="models.assessmentModel" />
</div>
</template>

<script>
// @ is an alias to /src
// calls in the Assessment.vue page layout (which contains the form and table)
import Assessment from '@/components/assessment/Assessment.vue';


export default {
    name: 'AssessmentPage',
    props: ['models'],
    components: {
        Assessment
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