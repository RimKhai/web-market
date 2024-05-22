<script setup>
import Typography from '../shared/Typography.vue'
import BaseIcon from '../shared/BaseIcon.vue'

const props = defineProps({
    name: {
        type: String,
        required: true,
    },
    secondName: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <RouterLink
        class="header__person-menu"
        to="/profile"
    >
        <BaseIcon type="profile" />
        <Typography tagName="p">
            {{ `${name} ${secondName}` }}
        </Typography>
    </RouterLink>
</template>

<style lang="scss" scoped>
.header__person-menu {
    display: flex;
    align-items: center;
    gap: 0 4px;
}
</style>
