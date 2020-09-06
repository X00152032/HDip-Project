<template>
<div>
    {{ userModel.firstName }} {{ userModel.lastName }} - "{{ userModel.email }}"; ({{ userModel.role }})
</div>
</template>

<script>
export default {
    name: 'UserCard',
    props: ['userModel']
}
</script>
