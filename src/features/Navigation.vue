<script setup>
    import { RouterLink } from 'vue-router'
    import BaseIcon from '../shared/BaseIcon.vue';
    import Typography from '../shared/Typography.vue'

    const props = defineProps({
        data: {
            type: Array,
            required: true,
        },
    })
</script>

<template>
    <nav class="header-navigation">
        <ul class="header-navigation__list">
            <li
                v-for="item in data"
                class="header-navigation__item"
                :key="item.label">
                <RouterLink
                    class="navigation__link"
                    :to="item.link">
                    <BaseIcon
                        :type="item.icon"
                        fill="none" />
                    <Typography
                        tag_name="span"
                        class="navigaion__typography"
                        size="s"
                        >{{ item.label }}</Typography
                    >
                    <span
                        v-if="item.count > 0"
                        class="item__count"
                        >{{ item.count }}</span
                    >
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
    .header-navigation__list {
        display: flex;
        grid-gap: 24px;
    }

    .header-navigation__item {
        list-style: none;
    }

    .navigation__link {
        text-decoration: none;
        display: flex;
        flex-direction: column;
        grid-gap: 8px;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .navigation__link:hover:deep(.typography) {
        color: $accent-color;
    }

    .navigation__link:deep(.typography) {
        transition-duration: 500ms;
    }

    .item__count {
        position: absolute;
        top: 0;
        right: 12px;
        font-size: 10px;
        padding: 2px 4px;
        border-radius: 4px;
        background-color: $accent-color;
    }
</style>
