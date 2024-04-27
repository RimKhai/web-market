<script setup>
    import Dropdown from './Drowdown.vue'
    import Typography from '../shared/Typography.vue'
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue'

    const props = defineProps(['item', 'index', 'parentItem'])
</script>

<script>
    export default {
        name: 'NestedListItem',
    }
</script>

<template>
    <Dropdown class="nested-item">
        <template #button>
            <RouterLink
                v-if="'path' in item"
                :to="`/${item.path}/products`"
                class="nested-item__button">
                <Typography
                    tag_name="span"
                    class="nested-item__button">
                    {{ item.title }}
                </Typography>
            </RouterLink>
            <Typography
                v-else
                tag_name="span"
                class="nested-item__button">
                {{ item.title }}
            </Typography>
        </template>
        <template #panel>
            <div class="nested-item__panel">
                <NestedListItem
                    v-for="(child, subIndex) in item.subcategories"
                    v-bind:item="child"
                    :index="subIndex"
                    :key="child.id"
                    :parentItem="item" />
            </div>
        </template>
    </Dropdown>
</template>

<style lang="scss" scoped>
    .nested-item__panel {
        margin-left: 36px;
    }

    .nested-item__button {
        background-color: $primary-surface;
        border-radius: 5px;
    }
</style>
