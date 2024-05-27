<script setup>
import Dropdown from './Drowdown.vue'
import Typography from '../shared/Typography.vue'
import { RouterLink } from 'vue-router'

defineProps({
    item: {
        type: Object,
        default: () => {}
    },
    index: {
        type: Number,
        default: -1
    },
    parentItem: {
        type: Object,
        default: () => {}
    }
})
</script>

<script>
export default {
    name: 'NestedListItem'
}
</script>

<template>
    <Dropdown class="nested-item">
        <template #button>
            <RouterLink
                v-if="'path' in item"
                :to="`/${item.path}/products`"
                class="nested-item__button"
            >
                <Typography
                    tag-name="span"
                    class="nested-item__button"
                >
                    {{ item.title }}
                </Typography>
            </RouterLink>
            <Typography
                v-else
                tag-name="span"
                class="nested-item__button"
            >
                {{ item.title }}
            </Typography>
        </template>
        <template #panel>
            <div class="nested-item__panel">
                <NestedListItem
                    v-for="(child, subIndex) in item.subcategories"
                    :key="child.id"
                    :item="child"
                    :index="subIndex"
                    :parent-item="item"
                />
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
