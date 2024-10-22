<template>
    <div class="main-container">
        <Sidebar ref="sidebarComponent" />
        <div class="view">
            <Alert v-if="!auth?.profile && false" type="warning" icon="ri-error-warning-line"
                paragraph="Per poter sfruttare al massimo MyAccounts, dovrai prima completare il tuo profilo!"
                btnLabel="Crea">
                <RouterLink to="/account">
                    <button type="button"
                        class="py-1 px-3 rounded-lg flex items-center justify-center hover:bg-blue-700/20 text-blue-700 transition-all duration-150">Crea</button>
                </RouterLink>
            </Alert>
            <div class="relative w-full h-full px-4">
                <div class="max-w-[650px] mx-auto">
                    <div class="w-full rounded-xl px-7 py-4 mt-12 bg-[#FAFAFA] border border-solid border-[#EAEAEA]">
                        <div>
                            <h2 class="text-2xl font-semibold text-center">Il mio account</h2>
                        </div>
                        <div class="w-full flex flex-col">
                            <div
                                class="w-full h-[70px] flex items-center justify-between bg-transparent border-b last:border-none border-solid border-black/20 text-black text-sm font-normal">
                                <div class="flex items-center justify-start">
                                    <h2>Foto</h2>
                                </div>
                                <div class="flex gap-4 items-center justify-end">
                                    <div class="relative h-10 aspect-square rounded-2xl flex items-center justify-center overflow-hidden"
                                        :class="{ 'bg-[#0B53F5]': !auth.profile?.profile_picture }">
                                        <img v-if="auth.profile?.profile_picture" :src="auth.profile?.profile_picture"
                                            alt="Profile picture" class="w-full h-full object-cover">
                                        <span class="uppercase text-[#B1C9FF] font-semibold">{{ auth.profile ?
                                            `${auth.profile?.first_name.charAt(0)}${auth.profile?.last_name.charAt(0)}`
                                            : auth.user?.email.slice(0, 2) }}</span>
                                    </div>
                                    <button type="button"
                                        class="font-semibold pb-1 border-b border-solid border-black/40 hover:border-black">{{
                                            auth.profile ? 'Modifica' : 'Aggiungi' }}</button>
                                    <button v-if="auth.profile" type="button"
                                        class="font-semibold pb-1 border-b border-solid border-black/40 hover:border-black">Elimina</button>
                                </div>
                            </div>
                            <div
                                class="w-full h-[70px] flex items-center justify-between bg-transparent border-b last:border-none border-solid border-black/20 text-black text-sm font-normal">
                                <div class="flex items-center justify-start">
                                    <h2>Nome</h2>
                                </div>
                                <div class="flex gap-4 items-center justify-end">
                                    <span>{{ auth.profile?.first_name }} {{ auth.profile?.last_name }}</span>
                                    <button
                                        @click="toggleModal('name', auth.profile?.first_name, auth.profile?.last_name)"
                                        type="button"
                                        class="font-semibold pb-1 border-b border-solid border-black/40 hover:border-black">{{
                                            auth.profile?.first_name || auth.profile?.last_name ? 'Modifica' : 'Aggiungi'
                                        }}</button>
                                    <button v-if="auth.profile" type="button"
                                        class="font-semibold pb-1 border-b border-solid border-black/40 hover:border-black">Elimina</button>
                                </div>
                            </div>
                            <div
                                class="w-full h-[70px] flex items-center justify-between bg-transparent border-b last:border-none border-solid border-black/20 text-black text-sm font-normal">
                                <div class="flex items-center justify-start">
                                    <h2>Indirizzo email</h2>
                                </div>
                                <div class="flex gap-4 items-center justify-end">
                                    <span>{{ auth.user?.email }}</span>
                                    <button type="button"
                                        class="font-semibold pb-1 border-b border-solid border-black/40 hover:border-black">{{
                                            auth.user?.email ? 'Modifica' : 'Aggiungi' }}</button>
                                    <button v-if="auth.user?.email" type="button"
                                        class="font-semibold pb-1 border-b border-solid border-black/40 hover:border-black">Elimina</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Modal v-if="store.modals.createProfile.name.open">
        <div class="text-black text-2xl font-medium mb-8">Cambia il tuo nome</div>
        <div class="w-full h-full flex flex-col items-center">
            <form @submit.prevent class="relative w-full max-w-[450px]">
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="firstnameBucketInput">Nome</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.createProfile.name.data.first_name" id="firstnameBucketInput"
                            type="text" placeholder="Inserisci il tuo nome"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="lastnameBucketInput">Cognome</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.createProfile.name.data.last_name" id="lastnameBucketInput"
                            type="text" placeholder="Inserisci il tuo cognome"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <ButtonForm @click="actionName(auth.profile)" type="default"
                    :disabled="store.modals.createProfile.name.data.first_name.length === 0"
                    :loading="store.modals.createProfile.name.loading" label="Conferma" />
            </form>
        </div>
    </Modal>
    <Modal v-if="store.modals.updateProfile.name.open">
        <div class="text-black text-2xl font-medium mb-8">Modifica il tuo nome</div>
        <div class="w-full h-full flex flex-col items-center">
            <form @submit.prevent class="relative w-full max-w-[450px]">
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="firstnameBucketInput">Nome</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.updateProfile.name.data.first_name" id="firstnameBucketInput"
                            type="text" placeholder="Inserisci il tuo nome"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="lastnameBucketInput">Cognome</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.updateProfile.name.data.last_name" id="lastnameBucketInput"
                            type="text" placeholder="Inserisci il tuo cognome"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <ButtonForm @click="actionName(auth.profile)" type="default"
                    :disabled="store.modals.updateProfile.name.data.first_name.length === 0"
                    :loading="store.modals.updateProfile.name.loading" label="Conferma" />
            </form>
        </div>
    </Modal>
</template>

<script>
import { supabase } from '../lib/supabase';
import { auth } from '../data/auth';
import { store } from '../data/store';

import Sidebar from '../components/global/Sidebar.vue';
import Alert from '../components/alert/Alert.vue';
import Modal from '../components/modal/Modal.vue';
import ButtonForm from '../components/button/ButtonForm.vue';

export default {
    name: "Account",
    components: {
        Sidebar,
        Alert,
        Modal,
        ButtonForm
    },
    data() {
        return {
            auth,
            store
        }
    },
    methods: {
        toggleModal(type, hasFirstname, hasLastname) {
            if (type === 'name') {
                if (hasFirstname || hasLastname) {
                    this.store.modals.updateProfile.name.open = !this.store.modals.updateProfile.name.open;

                    this.store.modals.updateProfile.name.data = {
                        first_name: this.auth.profile?.first_name,
                        last_name: this.auth.profile?.last_name
                    };
                } else {
                    this.store.modals.createProfile.name.open = !this.store.modals.createProfile.name.open;
                }
            }
        },

        actionName(hasData) {
            if (hasData) {
                this.actionUpdateName();
            } else {
                this.actionSetName();
            }
        },
        async actionSetName() {
            const PROFILE = this.auth.profile;
            const USER_ID = this.auth.user?.id;
            const DATA = this.store.modals.createProfile.name.data;

            this.store.modals.createProfile.name.loading = true;

            try {
                const { error } = await supabase
                    .from('profiles')
                    .insert({ first_name: DATA.first_name, last_name: DATA.last_name, user_id: USER_ID });

                if (!error) {
                    this.$emit('profile-updated');

                    this.store.modals.createProfile.name.open = false;
                    this.store.modals.createProfile.name.data = {
                        first_name: "",
                        last_name: ""
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.modals.createProfile.name.loading = false;
            }
        },
        async actionUpdateName() {
            const USER_ID = this.auth.user?.id;
            const PROFILE_ID = this.auth.profile?.id;
            const DATA = this.store.modals.updateProfile.name.data;

            this.store.modals.updateProfile.name.loading = true;

            try {
                const { error } = await supabase
                    .from('profiles')
                    .upsert(
                        { id: PROFILE_ID, first_name: DATA.first_name, last_name: DATA.last_name, user_id: USER_ID },
                        { onConflict: ['id'] }
                    )
                    .select()
                    .single();

                if (!error) {
                    this.$emit('profile-updated');

                    this.store.modals.updateProfile.name.open = false;
                    this.store.modals.updateProfile.name.data = {
                        first_name: "",
                        last_name: ""
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.modals.updateProfile.name.loading = false;
            }
        },
    }
}
</script>

<style scoped></style>