<template>
    <!-- <Navbar /> -->
    <div class="main-container">
        <Sidebar ref="sidebarComponent" />
        <div class="view">
            <Alert v-if="!auth?.profile" type="warning" icon="ri-error-warning-line"
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
                        <div v-if="!store.views.selectedAccount || !store.accounts.data">
                            <h2 class="text-2xl font-semibold text-center">Seleziona un account!</h2>
                        </div>
                        <div v-else-if="store.views.selectedAccount || store.accounts.data?.length >= 1">
                            <div class="relative w-full px-4 flex gap-3 items-center justify-between">
                                <div class="flex gap-3 items-center justify-start">
                                    <div
                                        class="relative h-14 aspect-square rounded-lg flex items-center justify-center overflow-hidden bg-black">
                                        <img v-if="store.views.accountData?.accounts.account_image" src="" alt=""
                                            draggable="false" class="w-full h-full object-cover hidden">
                                        <span v-else-if="!store.views.accountData?.accounts.account_image"
                                            class="text-white text-2xl uppercase">{{
                                                store.views.accountData?.accounts.name.slice(0, 2) }}</span>
                                    </div>
                                    <span class="text-2xl font-semibold">{{ store.views.accountData?.accounts.name
                                        }}</span>
                                </div>
                                <div class="flex gap-3 items-center justify-end">
                                    <button @click="store.modals.updateAccount.open = !store.modals.updateAccount.open"
                                        type="button"
                                        class="relative px-3 py-1 h-8 aspect-square rounded-xl flex gap-2 items-center justify-center border border-solid bg-black/5 hover:bg-black/10 border-black">
                                        <i class="ri-pencil-line"></i>
                                    </button>
                                    <button @click="store.modals.deleteAccount.open = !store.modals.deleteAccount.open"
                                        type="button"
                                        class="relative px-3 py-1 h-8 aspect-square rounded-xl flex gap-2 items-center justify-center border border-solid bg-red-600/5 hover:bg-red-600/10 border-red-600">
                                        <i class="ri-delete-bin-5-line"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="relative w-full mt-7">
                                <FieldCredentials v-if="store.views.accountData?.accounts.username" type="cred"
                                    :credHidden="false" label="nome utente"
                                    :data="store.views.accountData?.accounts.username" />
                                <FieldCredentials v-if="store.views.accountData?.accounts.email" type="cred"
                                    :credHidden="false" label="email" :data="store.views.accountData?.accounts.email" />
                                <FieldCredentials v-if="store.views.accountData?.accounts.password" type="cred"
                                    :credHidden="true" label="password"
                                    :data="store.views.accountData?.accounts.password" />
                            </div>
                            <div class="relative w-full mt-7">
                                <FieldCredentials v-if="store.views.accountData?.accounts.website_url" type="link"
                                    :credHidden="false" label="sito web"
                                    :data="store.views.accountData?.accounts.website_url" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MiniAlert label="Copiato!" />
    <Modal v-if="store.modals.createBucket">
        <div class="w-full h-full flex flex-col items-center">
            <div class="relative h-[156px] aspect-square rounded-full mb-10 bg-black"></div>
            <form @submit.prevent class="relative w-full max-w-[450px]">
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="nameBucketInput">Nome cassaforte</label>
                    <div class="relative w-full h-14">
                        <input v-model="bucket.name" id="nameBucketInput" type="text"
                            placeholder="Inserisci un nome per la tua cassaforte"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <ButtonForm @click="actionCreateBucket" type="default" :disabled="bucket.name.length === 0"
                    :loading="this.bucket.loading" label="Crea cassaforte" />
            </form>
        </div>
    </Modal>
    <Modal v-if="store.modals.updateBucket.open">
        <div class="w-full h-full flex flex-col items-center">
            <div class="flex gap-3 flex-col mb-9">
                <h2 class="text-2xl font-semibold">Modifica la cassaforte?</h2>
                <!-- <p>Se procedi con la modifica della cassaforte, l'azione sarà irreversibile.</p> -->
            </div>
            <div class="w-full flex gap-1 flex-col mb-6">
                <label for="nameBucketInput">Nome cassaforte</label>
                <div class="relative w-full h-14">
                    <input v-model="bucket.name" id="nameBucketInput" type="text"
                        placeholder="Inserisci un nome per la tua cassaforte"
                        class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                </div>
            </div>
            <form @submit.prevent class="relative w-full max-w-[450px] flex gap-4">
                <ButtonForm @click="store.modals.updateBucket.open = false" type="outline" :disabled="false"
                    :loading="false" label="Annulla" />
                <ButtonForm @click="actionUpdateBucket" type="danger" :disabled="false"
                    :loading="store.modals.updateBucket.loading" label="Modifica cassaforte" />
            </form>
        </div>
    </Modal>
    <Modal v-if="store.modals.deleteBucket.open">
        <div class="w-full h-full flex flex-col items-center">
            <div class="flex gap-3 flex-col mb-9">
                <h2 class="text-2xl font-semibold">Sei sicuro di voler eliminare la cassaforte?</h2>
                <p>Se procedi con l'eliminazione della cassaforte perderai tutti gli account al suo interno, l'azione
                    sarà irreversibile.</p>
            </div>
            <form @submit.prevent class="relative w-full max-w-[450px] flex gap-4">
                <ButtonForm @click="store.modals.deleteBucket.open = false" type="outline" :disabled="false"
                    :loading="false" label="Annulla" />
                <ButtonForm @click="handleDeleteBucket" type="danger" :disabled="false"
                    :loading="store.modals.deleteBucket.loading" label="Elimina cassaforte" />
            </form>
        </div>
    </Modal>

    <Modal v-if="store.modals.createAccount.open">
        <div class="w-full h-full flex flex-col items-center">
            <div class="image relative h-[156px] aspect-square rounded-full mb-10 bg-black cursor-pointer">
            </div>
            <form @submit.prevent class="relative w-full max-w-[450px]">
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="nameAccountInput">Nome</label>
                    <div class="relative w-full h-14">
                        <input v-model="account.name" id="nameAccountInput" type="text"
                            placeholder="Inserisci un nome per il tuo account"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="emailAccountInput">Email</label>
                    <div class="relative w-full h-14">
                        <input v-model="account.email" id="emailAccountInput" type="email"
                            placeholder="Inserisci la mail del tuo account"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="passwordAccountInput">Password</label>
                    <div class="relative w-full h-14">
                        <input v-model="account.password" id="passwordAccountInput" type="password"
                            placeholder="Inserisci la mail del tuo account"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <ButtonForm @click="actionCreateAccount" type="default" :disabled="account.name.length === 0"
                    :loading="store.modals.createAccount.loading" label="Aggiungi account" />
            </form>
        </div>
    </Modal>
    <Modal v-if="store.modals.updateAccount.open">
        <div class="w-full h-full flex flex-col items-center">
            <form @submit.prevent class="relative w-full max-w-[450px]">
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="nameAccountInput">Nome</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.updateAccount.data.name" id="nameAccountInput" type="text"
                            placeholder="Inserisci un nome per il tuo account"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="usernameAccountInput">Nome utente</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.updateAccount.data.username" id="usernameAccountInput" type="text"
                            placeholder="Inserisci il tuo nome utente"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="emailAccountInput">Email</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.updateAccount.data.email" id="emailAccountInput" type="email"
                            placeholder="Inserisci il tuo indirizzo email"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="passwordAccountInput">Password</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.updateAccount.data.password" id="passwordAccountInput"
                            type="password" placeholder="Inserisci la tua password"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <div class="w-full flex gap-1 flex-col mb-6">
                    <label for="websiteAccountInput">Sito web</label>
                    <div class="relative w-full h-14">
                        <input v-model="store.modals.updateAccount.data.website_url" id="websiteAccountInput"
                            type="text" placeholder="Inserisci il sito web"
                            class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none">
                    </div>
                </div>
                <ButtonForm @click="actionUpdateAccount" type="default" :disabled="false"
                    :loading="store.modals.updateAccount.loading" label="Modifica account" />
            </form>
        </div>
    </Modal>
    <Modal v-if="store.modals.deleteAccount.open">
        <div class="w-full h-full flex flex-col items-center">
            <div class="flex gap-3 flex-col mb-9">
                <h2 class="text-2xl font-semibold">Sei sicuro di voler eliminare l'account?</h2>
                <p>Se procedi con l'eliminazione dell'account perderai tutto, l'azione sarà irreversibile.</p>
            </div>
            <form @submit.prevent class="relative w-full max-w-[450px] flex gap-4">
                <ButtonForm @click="store.modals.deleteAccount.open = false" type="outline" :disabled="false"
                    :loading="false" label="Annulla" />
                <ButtonForm @click="actionDeleteAccountOnBucket(store.views.accountData)" type="danger"
                    :disabled="false" :loading="store.modals.deleteAccount.loading" label="Elimina account" />
            </form>
        </div>
    </Modal>
</template>

<script>
import { supabase } from '../lib/supabase';
import { auth } from '../data/auth';
import { store } from '../data/store';
import { v4 as uuidv4 } from 'uuid';

import Sidebar from '../components/global/Sidebar.vue';
import Navbar from '../components/global/Navbar.vue';
import Alert from '../components/alert/Alert.vue';
import MiniAlert from '../components/alert/MiniAlert.vue';
import Modal from '../components/modal/Modal.vue';
import ButtonForm from '../components/button/ButtonForm.vue';
import FieldCredentials from '../components/field/FieldCredentials.vue';

export default {
    name: "Home",
    components: {
        Sidebar,
        Navbar,
        Alert,
        MiniAlert,
        Modal,
        ButtonForm,
        FieldCredentials
    },
    data() {
        return {
            auth,
            store,
            bucket: {
                name: "",
                bucket_image: "",
                loading: false
            },
            account: {
                name: "",
                username: "",
                email: "",
                password: "",
                account_image: "",
                website_url: "",
                selected_image: null
            },

            preview_profile_pic: null,
            path_profile_pic: null,
        }
    },
    computed: {
        profileFreezed() {
            const profile = this.auth.profile?.is_freezed;

            if (!profile) {
                return false;
            } else return true;
        },
        profileCompleted() {
            const profile = this.auth.profile;

            if (!profile?.first_name || !profile?.last_name) {
                return false;
            } else return true;
        },
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];

            if (file && file.type.startsWith('image/')) {
                this.store.modals.createProfile.data.selectedFile = file;
                this.uploadImage(file);
            } else {
                console.error("Il file selezionato non è un'immagine valida");
            }
        },
        async uploadImage(file) {
            const USER_ID = this.auth.user.id;

            if (!file) {
                return false;
            }

            const uniqueFileName = `${uuidv4()}.${file.name.split('.').pop()}`;
            const path = `public/users/${USER_ID}/profile_pictures/${uniqueFileName}`;

            try {
                const { data, error } = await supabase
                    .storage
                    .from('images')
                    .upload(path, file, {
                        cacheControl: '3600',
                        upsert: true
                    });

                if (!error) {
                    /* console.log(data); */
                    this.getPublicUrl(path);
                    this.path_profile_pic = path;
                }
            } catch (e) {
                console.error(e);
            }
        },
        async getPublicUrl(path) {
            if (!path) {
                return false;
            }

            try {
                const { data, error } = supabase
                    .storage
                    .from('images')
                    .getPublicUrl(path);

                if (!error) {
                    this.preview_profile_pic = data.publicUrl;
                }
            } catch (e) {
                console.error(e);
            }
        },
        async actionCompleteProfile() {
            const USER_ID = this.auth.user.id;
            const dataProfile = this.store.modals.createProfile.data;
            const profile_picture = this.preview_profile_pic;

            this.store.modals.createProfile.loading = true;
            this.store.modals.createProfile.created_code = true;

            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .insert({
                        first_name: dataProfile.first_name,
                        last_name: dataProfile.last_name,
                        profile_picture: profile_picture,
                        user_id: USER_ID
                    });

                if (!error) {
                    /* console.log(data); */
                    this.store.modals.createProfile.open = false;
                    this.store.modals.createProfile.data = {
                        first_name: "",
                        last_name: "",
                        profile_picture: "",
                        selectedFile: null,
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.modals.createProfile.loading = false;
                this.store.modals.createProfile.created_code = null;
            }
        },

        async actionCreateBucket() {
            this.bucket.loading = true;

            try {
                const { data, error } = await supabase
                    .from('buckets')
                    .insert({ name: this.bucket.name, bucket_image: this.bucket?.bucket_image })
                    .select();

                if (!error && data.length > 0) {
                    const bucketId = data[0].id; // Ottieni l'ID del bucket
                    await this.addBucketToProfile(bucketId);

                    localStorage.setItem('selected_bucket_id', bucketId);
                    this.store.views.inBucket = true;
                    this.store.views.selectedBucket = bucketId;

                    this.store.modals.createBucket = false;
                    this.bucket = {
                        name: "",
                        bucket_image: "",
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.bucket.loading = false;
            }
        },
        async addBucketToProfile(bucketId) {

            const PROFILE_ID = this.auth.profile.id;
            const BUCKET_ID = bucketId;

            try {
                const { error } = await supabase
                    .from('profile_buckets')
                    .insert({ profile_id: PROFILE_ID, bucket_id: BUCKET_ID });

                if (!error) {
                    /* console.log("Bucket aggiunto al profilo correttamente!"); */
                    this.$refs.sidebarComponent.getBuckets();
                }
            } catch (e) {
                console.error(e);
            }
        },
        async handleDeleteBucket() {
            try {
                this.$refs.sidebarComponent.actionDeleteBucketOnProfile();
            } catch (e) {
                console.error(e);
            }
        },
        async actionUpdateBucket() {
            const BUCKET_ID = this.store.modals.updateBucket.data;

            this.store.modals.updateBucket.loading = true;

            try {
                const { error } = await supabase
                    .from('buckets')
                    .upsert({ id: BUCKET_ID, name: this.bucket.name, bucket_image: this.bucket.bucket_image })
                    .select()
                    .single();

                if (!error) {
                    this.$refs.sidebarComponent.getBuckets();

                    this.store.modals.updateBucket.open = false;
                    this.bucket = {
                        name: "",
                        bucket_image: "",
                    }
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.modals.updateBucket.loading = false;
            }
        },
        async actionCreateAccount() {
            const SELCTED_BUCKET_ID = this.store.views.selectedBucket?.toString();
            this.store.modals.createAccount.loading = true;

            try {
                const { data, error } = await supabase
                    .from('accounts')
                    .insert({
                        name: this.account.name,
                        username: this.account.username,
                        email: this.account.email,
                        password: this.account.password,
                        account_image: this.account.account_image,
                        website_url: this.account.website_url
                    })
                    .select();

                if (!error) {
                    const ACCOUNT_ID = data[0].id;
                    this.addAccountToBucket(SELCTED_BUCKET_ID, ACCOUNT_ID);

                    localStorage.setItem('selected_account_id', ACCOUNT_ID);
                    this.store.views.inAccount = true;
                    this.store.views.selectedAccount = ACCOUNT_ID;

                    this.store.modals.createAccount.open = false;
                    this.account = {
                        name: "",
                        username: "",
                        email: "",
                        password: "",
                        account_image: "",
                        website_url: "",
                        selected_image: null
                    };
                } else {
                    console.error(error);
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.modals.createAccount.loading = false;
            }
        },
        async addAccountToBucket(SELCTED_BUCKET_ID, ACCOUNT_ID) {
            if (!SELCTED_BUCKET_ID && !ACCOUNT_ID) {
                return false;
            };

            try {
                const { error } = await supabase
                    .from('bucket_accounts')
                    .insert({ bucket_id: SELCTED_BUCKET_ID, account_id: ACCOUNT_ID });

                if (!error) {
                    /* console.log("Account aggiunto al bucket correttamente!"); */
                    this.$refs.sidebarComponent.getAccounts();
                }
            } catch (e) {
                console.error(e);
            }
        },
        async getSelectedAccount() {
            const SAVED_ACCOUNT_ID = localStorage.getItem('selected_account_id');

            if (!SAVED_ACCOUNT_ID) {
                return false;
            }

            try {
                const { data, error } = await supabase
                    .from('bucket_accounts')
                    .select('*, accounts(*)')
                    .eq('account_id', SAVED_ACCOUNT_ID)
                    .single();

                if (!error) {
                    /* console.log(data) */
                    this.store.views.accountData = data;
                }
            } catch (e) {
                console.error(e);
            }
        },
        async actionUpdateAccount() {
            const ACCOUNT_ID = this.store.modals.updateAccount.data.id;
            const DATA = this.store.modals.updateAccount.data;

            this.store.modals.updateAccount.loading = true;

            try {
                const { error } = await supabase
                    .from('accounts')
                    .upsert({ id: ACCOUNT_ID, name: DATA.name, username: DATA.username, email: DATA.email, password: DATA.password, account_image: DATA.account_image, website_url: DATA.website_url })
                    .select()
                    .single();

                if (!error) {
                    this.getSelectedAccount();
                    this.store.modals.updateAccount.open = false;
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.modals.updateAccount.loading = false;
            }
        },
        async actionDeleteAccountOnBucket(account) {
            const ACCOUNT_ID = account.account_id;
            const BUCKET_ID = account.bucket_id;

            this.store.modals.deleteAccount.loading = true;

            try {
                const { error } = await supabase
                    .from('bucket_accounts')
                    .delete()
                    .eq('bucket_id', BUCKET_ID)
                    .eq('account_id', ACCOUNT_ID)
                    .single();

                if (!error) {
                    this.actionDeleteAccount(ACCOUNT_ID);
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.modals.deleteAccount.loading = false;
            }
        },
        async actionDeleteAccount(ACCOUNT_ID) {
            try {
                const { error } = await supabase
                    .from('accounts')
                    .delete()
                    .eq('id', ACCOUNT_ID)
                    .single();

                if (!error) {
                    this.$refs.sidebarComponent.getAccounts();
                    localStorage.removeItem('selected_account_id');
                    this.store.modals.deleteAccount.open = false;
                    this.store.views.selectedAccount = null;
                    this.store.views.inAccount = false;
                }
            } catch (e) {
                console.error(e);
            }
        },
    },
    mounted() {
        this.getSelectedAccount();
    },
    watch: {
        'store.views.selectedAccount': {
            handler: function (value) {
                this.getSelectedAccount();
            },
        },
        'store.modals.updateAccount.open': {
            handler: function (value) {
                if (value) {
                    this.store.modals.updateAccount.data = {
                        id: this.store.views?.accountData?.accounts?.id,
                        name: this.store.views?.accountData?.accounts?.name,
                        username: this.store.views?.accountData?.accounts?.username,
                        email: this.store.views?.accountData?.accounts?.email,
                        password: this.store.views?.accountData?.accounts?.password,
                        account_image: this.store.views?.accountData?.accounts?.account_image,
                        website_url: this.store.views?.accountData?.accounts?.website_url
                    }
                } else {
                    this.store.modals.updateAccount.data = {
                        id: "",
                        name: "",
                        username: "",
                        email: "",
                        password: "",
                        account_image: "",
                        website_url: ""
                    }
                }
            },
        },
    }
}
</script>

<style scoped></style>
