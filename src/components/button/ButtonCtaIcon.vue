<template>
    <div class="bt-cont relative" :class="{ 'pointer-events-none opacity-50 cursor-default': disabled }">
        <button class="btn relative h-6 aspect-square rounded-md flex items-center justify-center cursor-pointer text-[#CFCFCF] hover:text-[#4A4A4A] text-xl transition-colors duration-150">
            <i :class="icon"></i>
        </button>
        <div v-if="!disabled && hasTooltip" class="tooltip absolute z-[999] px-2 py-1 rounded-lg bg-black text-white whitespace-nowrap"
            :class="{ 'tr': ttPosition === 'tr' }">
            <span>{{ ttLabel }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "ButtonctaIcon",
    props: {
        disabled: Boolean,
        icon: String,
        hasTooltip: Boolean,
        ttPosition: String,
        ttLabel: String
    }
}
</script>

<style scoped>
.tooltip{
    opacity: 0;
    pointer-events: none;
    transition-property: transform, opacity;
    transition-duration: 200ms;
    transition-timing-function: ease;
    transition-delay: 400ms;
}

.tooltip::after{
    content: "";
    display: block;
    width: 0px;
    height: 0px;
    position: absolute;
    border-top: .55em solid rgb(0, 0, 0);
    border-left: .60em solid transparent;
    border-right: .60em solid transparent;
    transform: translate(-50%);
    top: 85%;
}

.tooltip.tr{
    top: 0;
    right: 0;
    transform: translateY(calc(-100% - 0rem)) translateX(5%);
}

.tooltip.tr::after{
    right: 1%;
}

.bt-cont:hover .tooltip{
    opacity: 1;
}

.bt-cont:hover .tooltip.tr{
    transform: translateY(calc(-100% - .5rem)) translateX(5%);
}
</style>