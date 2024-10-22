<template>
    <div class="fixed z-[500] top-0 md:left-[300px] w-full md:w-[calc(100%-300px)] h-14 flex items-center justify-between bg-[#FAFAFA]">
        <div class="flex items-center justify-start"></div>
        <div class="flex items-center justify-end"></div>
    </div>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';

export default {
    name: "Navbar",
    data() {
        return {
            auth
        }
    }
}
</script>

<style scoped></style>