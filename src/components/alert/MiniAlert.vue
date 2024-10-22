<template>
    <div :class="{ 'show': store.linkCopied }" class="alert-container fixed z-[999] top-0 left-0 w-full flex items-center justify-center pointer-events-none">
        <div class="alert py-2 px-4 rounded-xl mt-4 flex items-center justify-center bg-white shadow-md shadow-black/10 text-black text-base font-medium">{{ label }}</div>
    </div>
</template>

<script>
import { store } from '../../data/store';

export default {
    name: "MiniAlert",
    props: {
        label: String,
    },
    data() {
        return {
            store
        }
    }
}
</script>

<style scoped>
.alert-container{
    transform: translateY(-100%);
    opacity: 0;

    transition-property: transform, opacity;
    transition-duration: 200ms;
    transition-timing-function: ease;
}

.alert-container.show{
    transform: translateY(0%);
    opacity: 1;
}
</style>