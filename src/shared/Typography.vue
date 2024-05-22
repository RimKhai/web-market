<script setup>
import { computed } from 'vue'

const props = defineProps({
    tagName: {
        type: String,
        default: 'p',
    },
    bold: {
        type: Boolean,
        default: false,
    },
    size: {
        type: String,
        default: '',
    },
})

const classes = computed(() => [
    'typography',
    `size_${props.size}`,
    props.bold ? 'bold' : '',
    `tag_${props.tagName}`,
])
</script>

<template>
    <component
        :is="tagName"
        :class="classes"
    >
        <slot></slot>
    </component>
</template>

<style scoped>
.typography {
    font-style: normal;
    line-height: 150%;
}

.size_xs {
    font-size: 12px;
}

.size_s {
    font-size: 16px;
}

.size_m {
    font-size: 18px;
}

.size_l {
    font-size: 24px;
}

.size_xl {
    font-size: 36px;
}

.tag_h1 {
    font-size: 64px;
}

.tag_h2 {
    font-size: 48px;
}

.tag_h3 {
    font-size: 36px;
}

.tag_h4 {
    font-size: 24px;
}

.tag_h5 {
    font-size: 18px;
}

.bold {
    font-weight: 700;
}

@media screen and (max-width: 768px) {
    .size_xs {
        font-size: 8px;
    }

    .size_s {
        font-size: 12px;
    }

    .size_m {
        font-size: 14px;
    }

    .size_l {
        font-size: 20px;
    }

    .size_xl {
        font-size: 32px;
    }

    .tag_h1 {
        font-size: 48px;
    }

    .tag_h2 {
        font-size: 36px;
    }

    .tag_h3 {
        font-size: 24px;
    }

    .tag_h4 {
        font-size: 18px;
    }

    .tag_h5 {
        font-size: 16px;
    }
}
</style>
