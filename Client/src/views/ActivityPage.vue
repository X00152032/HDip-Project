<template>
<div class="subject container-fluid">
    <div class=title> 
        <h2>Choose your Activities</h2> <hr> 
    </div>
    <Activity :activityModel="models.activityModel" />
</div>
</template>


<script>
// @ is an alias to /src
import Activity from '@/components/activity/Activity.vue';

export default {
    name: 'ActivityPage',
    props: ['models'],
    components: {
        Activity,
    }
}
</script>
