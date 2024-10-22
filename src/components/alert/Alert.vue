<template>
    <div class="relative w-full mt-8 px-4">
        <div class="max-w-[880px] mx-auto">
            <div class="w-full p-4 rounded-2xl flex gap-3 flex-col md:flex-row items-end md:items-center justify-between bg-blue-400/20">
                <div class="flex gap-3 items-start md:items-center justify-start">
                    <div v-if="icon" class="relative h-8 aspect-square rounded-lg flex items-center justify-center flex-none text-blue-700">
                        <i :class="icon"></i>
                    </div>
                    <div v-if="paragraph" class="w-full text-blue-700 text-base font-normal">
                        <p>{{ paragraph }}</p>
                    </div>
                </div>
                <div class="flex items-center justify-end">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Alert",
    props: {
        type: {
            type: String,
            default: "default"
        },
        icon: String,
        paragraph: String
    }
}
</script>

<style scoped></style>