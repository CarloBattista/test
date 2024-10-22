<template>
    <div type="button">
        <div class="relative h-10 aspect-square rounded-full flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/15 text-black font-bold">
            <i :class="icon"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: "ButtonIcon",
    props: {
        icon: String
    }
}
</script>

<style scoped></style>