<template>
<div class="home container-fluid">
     <div class=title> 
        <h2>Edit Users</h2> <hr> 
    </div>
    <User :userModel="models.userModel" />
</div>
</template>

<script>
// @ is an alias to /src
import User from '@/components/user/User.vue';

export default {
    name: 'UserPage',
    props: ['models'],
    components: {
        User,
    }
}
</script>
