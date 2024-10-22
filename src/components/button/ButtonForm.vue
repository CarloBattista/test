<template>
    <button type="submit" class="btn w-full h-14 px-4 rounded-2xl flex gap-2 items-center justify-center border border-solid border-transparent"
        :class="[computedButtonClass, { 'cursor-pointer': !disabled, 'cursor-default opacity-40 pointer-events-none': disabled || loading }]">
        <span v-if="loading" class="loader"></span>
        {{ label }}
    </button>
</template>

<script>
export default {
    name: "ButtonForm",
    props: {
        type: {
            type: String,
            default: "default"
        },
        disabled: Boolean,
        loading: Boolean,
        label: String
    },
    data() {
        return {
            defaultClasses: "bg-black text-white",
            outlineClasses: "bg-transparent text-black border-black hover:bg-black/20",
            dangerClasses: "bg-red-600 hover:bg-red-600/80 text-white"
        }
    },
    computed: {
        computedButtonClass() {
            switch (this.type) {
                case "outline":
                    return this.outlineClasses;
                case "danger":
                    return this.dangerClasses;
                default:
                    return this.defaultClasses;
            }
        }
    },
}
</script>

<style scoped>
.btn{
    transition-property: background-color, color;
    transition-timing-function: ease;
    transition-duration: 150ms;
}

.loader {
    width: 22px;
    height: auto;
    aspect-ratio: 1;
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>