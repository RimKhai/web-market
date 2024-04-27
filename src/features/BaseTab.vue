<script setup>
    import { ref } from 'vue'
    import {
        TabGroup,
        TabList,
        Tab,
        TabPanels,
        TabPanel,
    } from '@headlessui/vue'

    const props = defineProps(['tabs'])
</script>

<template>
    <div class="w-full sm:px-0">
        <TabGroup>
            <TabList class="flex space-x-2 rounded-xl bg-blue-900/20 p-1">
                <Tab
                    v-for="tab in tabs"
                    as="template"
                    :key="tab"
                    v-slot="{ selected }">
                    <button
                        :class="[
                            'w-full rounded-lg py-2.5 text-sm leading-5',
                            'ring-[#b18fd7] ring-opacity-60 ring-offset-1 ring-offset-[#b18fd7] focus:outline-none focus:ring-2',
                            selected ? 'tab active shadow' : 'tab',
                        ]">
                        {{ tab }}
                    </button>
                </Tab>
            </TabList>

            <TabPanels class="mt-2">
                <slot></slot>
            </TabPanels>
        </TabGroup>
    </div>
</template>

<style lang="scss" scoped>
    .tab {
        background-color: $primary-color;
        transition-duration: 500ms;
        &.active {
            background-color: $accent-color;
        }
        &:hover {
            background-color: rgba($color: $accent-color, $alpha: 0.8);
        }
    }

    .tab_panel {
        background-color: $background-color;
        color: $text-color;
    }
</style>
