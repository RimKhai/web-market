<script setup>
import { ref } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'

const props = defineProps({
    data: {
        type: Array,
        default: () => [
            {
                title: 'Option 1'
            },
            {
                title: 'Option 2'
            }
        ]
    },
    defaultTitle: {
        type: String,
        default: 'Select an option'
    },
    selectedDataIndex: {
        type: Number,
        default: 0
    }
})
defineEmits(['onClick'])

const data = ref(props.data)
const selectedData = ref(data.value[props.selectedDataIndex])
</script>

<template>
    <div class="w-full">
        <Listbox v-model="selectedData">
            <div class="relative">
                <ListboxButton
                    class="relative w-full cursor-default rounded-lg bg-violet-700 text-black py-2 px-3 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
                >
                    {{
                        selectedData?.title == 'undefined' ? props.defaultTitle : selectedData.title
                    }}
                </ListboxButton>

                <ListboxOptions
                    class="absolute text-center z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-violet-500 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
                >
                    <ListboxOption
                        v-for="item in data"
                        v-slot="{ active, selected }"
                        :key="item.title"
                        :value="item"
                        as="template"
                        @click="$emit('onClick', selectedData)"
                    >
                        <li
                            :class="[
                                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                                'relative cursor-default select-none py-2 px-3'
                            ]"
                        >
                            <span
                                :class="[
                                    selected ? 'font-medium' : 'font-normal',
                                    'block truncate'
                                ]"
                                >{{ item.title }}</span
                            >
                            <span
                                v-if="selected"
                                class="absolute inset-y-0 left-0 flex items-center px-3 text-amber-600"
                            >
                                <div
                                    class="h-5 w-5"
                                    aria-hidden="true"
                                />
                            </span>
                        </li>
                    </ListboxOption>
                </ListboxOptions>
            </div>
        </Listbox>
    </div>
</template>
