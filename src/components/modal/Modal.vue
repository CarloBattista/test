<template>
    <div class="modal-container fixed z-[800] top-0 left-0 w-full h-screen flex items-center justify-center px-[5%] py-[20%] md:px-[15%] md:py-[8%] bg-black/50">
        <div class="modal relative w-full max-w-[600px] h-auto rounded-2xl px-[6%] py-[5%] bg-white">
            <ButtonIcon @click="closeModal" icon="ri-close-large-line" class="absolute top-[3%] right-[3%]" />
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { store } from '../../data/store';

import ButtonIcon from '../button/ButtonIcon.vue';

export default {
    name: "Modal",
    components: {
        ButtonIcon
    },
    data() {
        return {
            store
        }
    },
    methods: {
        closeModal() {
            if (this.store.modals.createBucket) {
                this.store.modals.createBucket = false;
            }

            if (this.store.modals.updateBucket.open) {
                this.store.modals.updateBucket.open = false;
            }

            if (this.store.modals.deleteBucket.open) {
                this.store.modals.deleteBucket.open = false;
            }

            if (this.store.modals.createAccount.open) {
                this.store.modals.createAccount.open = false;
            }

            if (this.store.modals.updateAccount.open) {
                this.store.modals.updateAccount.open = false;
            }

            if (this.store.modals.deleteAccount.open) {
                this.store.modals.deleteAccount.open = false;
            }

            if (this.store.modals.createProfile.name.open) {
                this.store.modals.createProfile.name.open = false;
            }

            if (this.store.modals.updateProfile.name.open) {
                this.store.modals.updateProfile.name.open = false;
            }
        }
    }
}
</script>

<style scoped></style>