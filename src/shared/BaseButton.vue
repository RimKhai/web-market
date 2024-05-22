<script setup>
import { computed } from 'vue'
import Typography from './Typography.vue'

const $props = defineProps({
    color: {
        type: String,
        default: 'primary',
    },
    decoration: {
        type: String,
        default: 'default',
    },
    size: {
        type: String,
        default: 'm',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const classes = computed(() => [
    'button',
    `size_${$props.size}`,
    $props.color,
    $props.decoration,
    $props.disabled ? 'disabled' : '',
])
</script>

<template>
    <button
        :class="classes"
        :disabled="disabled"
    >
        <Typography
            class="button__typography"
            tagName="span"
        >
            <slot></slot>
        </Typography>
    </button>
</template>

<style lang="scss" scoped>
.button {
    transition-duration: 500ms;
    cursor: pointer;
    &:hover {
        background-color: $accent-color;
    }
}

.size_s {
    width: 60px;
    height: 30px;
    border: 0px;
    border-radius: 12px;
    .button__typography {
        font-size: 10px;
    }
}

.size_m {
    height: 40px;
    border: 0px;
    border-radius: 16px;
    padding: 8px;
    .button__typography {
        font-size: 12px;
    }
}

.size_l {
    width: 150px;
    height: 60px;
    border: 0px;
    border-radius: 20px;
    padding: 12px;
    .button__typography {
        font-size: 18px;
    }
}

.primary {
    background-color: $primary-color;
}

.secondary {
    background-color: $secondary-color;
}

.error {
    background-color: $pallete-error;
}

.success {
    background-color: $pallete-success;
}

.disabled {
    background-color: $pallete-disabled;
    cursor: default;
}

.outline {
    border: 2px solid $text-color;
}
.none {
    background-color: transparent;
    transition-duration: 500ms;
}

.none .button__typography {
    transition-duration: 500ms;
    color: $text-color;
}

.none:hover {
    background-color: transparent;
    color: $accent-color;
}

.none:hover .button__typography {
    color: $accent-color;
}

@media screen and (max-width: 768px) {
    .size_m {
        width: 60px;
        height: 30px;
        border: 0px;
        border-radius: 12px;
        padding: 2px;
        .button__typography {
            font-size: 8px;
        }
    }

    .size_l {
        width: 80px;
        height: 40px;
        border: 0px;
        border-radius: 16px;
        padding: 3px;
        .button__typography {
            font-size: 12px;
        }
    }
}
</style>
