<template>
    <div class="btn-ct relative h-14 px-4 py-2 flex gap-4 items-center justify-center rounded-2xl border border-solid border-black/20 hover:border-black/60 cursor-pointer">
        <slot v-if="customIcon"></slot>
        <i v-if="!customIcon && icon" :class="icon"></i>
        <span v-if="label" class="text-black text-base font-medium">{{ label }}</span>
    </div>
</template>

<script>
export default {
    name: "ButtonCta",
    props: {
        customIcon: Boolean,
        icon: String,
        label: {
            type: String,
        }
    }
}
</script>

<style scoped>
.btn-ct{
    transition-property: background-color, border-color;
    transition-duration: 200ms;
    transition-timing-function: ease;
}
</style>