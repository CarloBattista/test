<template>
    <div
        class="fixed z-[500] top-0 left-0 hidden md:flex md:w-[300px] max-w-[300px] h-screen px-[22px] py-9 flex-col justify-start border-r border-solid border-[#EAEAEA] bg-[#FAFAFA] overflow-hidden">
        <!-- Profile section start -->
        <div @click="dpdMenuProfileOpen = !dpdMenuProfileOpen" ref="dpdMenu"
            class="relative w-full h-14 p-2 rounded-xl flex gap-3 items-center flex-none cursor-pointer hover:bg-[#F1F1F1] transition-colors duration-150">
            <div
                class="h-full aspect-square rounded-2xl flex items-center justify-center flex-none overflow-hidden bg-[#0B53F5] text-[#B1C9FF] font-semibold">
                <img v-if="auth.profile?.profile_picture" :src="auth.profile?.profile_picture" alt="Profile picture"
                    draggable="false" class="w-full h-full object-cover">
                <span v-else-if="auth.profile && !auth.profile?.profile_picture" class="uppercase">{{ auth.profile?.first_name.charAt(0) }}{{ auth.profile?.last_name.charAt(0) }}</span>
                <span v-else-if="!auth.profile" class="uppercase">{{ auth.user?.email.slice(0, 2) }}</span>
            </div>
            <div class="flex flex-col">
                <h2 class="w-[150px] text-base font-semibold text-ellipsis">{{ auth.profile ? `${auth.profile?.first_name} ${auth.profile?.last_name}` : auth.user?.email }}</h2>
                <p v-if="auth.profile" class="text-xs font-normal">{{ auth.profile?.is_subscription ? 'Plus' : 'Gratuito' }}</p>
            </div>

            <Transition name="slide-fade">
                <div v-if="dpdMenuProfileOpen"
                    class="dpd-menu absolute z-[999] top-full mt-2 left-0 w-full min-h-[50px] rounded-xl p-2 bg-white border border-solid border-[#EAEAEA] origin-top-left">
                    <div class="w-full h-full flex gap-1 flex-col">
                        <RouterLink to="/account" class="w-full h-10 py-1 px-3 rounded-lg flex items-center justify-between hover:bg-[#EAEAEA] text-black text-sm transition-colors duration-150">
                            <div class="flex gap-2 items-center justify-start">
                                <div class="h-full flex items-center justify-center">
                                    <i class="ri-user-3-line"></i>
                                </div>
                                <span>Account</span>
                            </div>
                            <div class="flex items-center justify-end"></div>
                        </RouterLink>
                        <div @click="actionSignout" class="w-full h-10 py-1 px-3 rounded-lg flex items-center justify-between hover:bg-[#EAEAEA] text-black text-sm transition-colors duration-150">
                            <div class="flex gap-2 items-center justify-start">
                                <div class="h-full flex items-center justify-center">
                                    <i class="ri-door-open-line"></i>
                                </div>
                                <span>Esci</span>
                            </div>
                            <div class="flex items-center justify-end"></div>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <!-- Profile section end -->

        <!-- Buckets section start -->
        <div class="w-full mt-12">
            <div class="w-full flex items-center justify-between pb-3 mb-3 border-b border-solid border-[#ECECEC]">
                <h2 class="text-black text-xl font-semibold">Casseforti</h2>
                <div class="flex gap-2 items-center justify-end">
                    <ButtonCtaIcon @click="store.modals.createBucket = !store.modals.createBucket" icon="ri-add-line"
                        :hasTooltip="true" ttPosition="tr" ttLabel="Crea una cassaforte" />
                </div>
            </div>
            <div v-if="store.buckets.data?.length === 0 || store.buckets.data === null"
                class="w-full flex flex-col items-center justify-center text-center text-sm font-normal text-balance">
                <p>Non hai ancora cassaforti. <button @click="store.modals.createBucket = !store.modals.createBucket"
                        type="button" class="text-blue-600 hover:underline">Aggiungine una!</button></p>
            </div>
            <div class="w-full flex gap-3 items-center">
                <Splide :options="options">
                    <SplideSlide v-for="(bucket, bucketIndex) in store.buckets.data" :key="bucketIndex">
                        <div @click="toBucket(bucket)"
                            class="bucket relative flex gap-1 flex-col justify-between flex-none w-[200px] max-w-[200px] h-24 p-3 rounded-xl bg-[#F1F1F1] cursor-pointer"
                            :class="{ 'bucket-selected': bucket.bucket_id?.toString() === store.views.selectedBucket?.toString() }">
                            <div class="w-full flex items-start justify-between">
                                <div
                                    class="relative h-9 aspect-square rounded-lg flex items-center justify-center bg-black overflow-hidden">
                                    <img class="w-full h-full object-cover"
                                        src="https://app.1password.com/images/all-vaults.png" alt="" loading="lazy"
                                        draggable="false">
                                </div>
                                <div class="flex gap-2 items-center justify-end">
                                    <div @click="openModalUpdateBucket(bucket)"
                                        class="relative h-6 aspect-square rounded-md flex items-center justify-center cursor-pointer text-[#CFCFCF] hover:text-[#4A4A4A] text-base hover:bg-[#dcdcdc] transition-colors duration-150">
                                        <i class="ri-more-2-line"></i>
                                    </div>
                                    <div @click="openModalDeleteBucket(bucket)"
                                        class="relative h-6 aspect-square rounded-md flex items-center justify-center cursor-pointer text-red-600 text-base hover:bg-red-100 transition-colors duration-150">
                                        <i class="ri-delete-bin-5-line"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full flex items-center justify-start">{{ bucket.buckets.name }}</div>
                        </div>
                    </SplideSlide>
                </Splide>
            </div>
        </div>
        <!-- Buckets section end -->

        <!-- Accounts section start -->
        <div class="w-full mt-12">
            <div class="w-full flex items-center justify-between pb-3 mb-3 border-b border-solid border-[#ECECEC]">
                <div v-if="!search.open" class="w-full flex items-center justify-between">
                    <h2 class="text-black text-xl font-semibold">Account</h2>
                    <div class="flex gap-2 items-center justify-end">
                        <ButtonCtaIcon @click="search.open = !search.open"
                            :disabled="store.buckets.data?.length === 0 || !store.views.selectedBucket || !store.views.inBucket"
                            icon="ri-search-line" :hasTooltip="true" ttPosition="tr" ttLabel="Cerca un account" />
                        <ButtonCtaIcon @click="store.modals.createAccount.open = !store.modals.createAccount.open"
                            :disabled="store.buckets.data?.length === 0 || !store.views.selectedBucket || !store.views.inBucket"
                            icon="ri-add-line" :hasTooltip="true" ttPosition="tr" ttLabel="Aggiungi un account" />
                    </div>
                </div>
                <div v-else-if="search.open" class="relative w-full">
                    <input @input="debounceSearch" v-model="search.query" type="text" placeholder="Cerca..."
                        class="w-full bg-transparent outline-none">
                    <div @click="search.open = false"
                        class="absolute top-0 right-0 h-6 aspect-square rounded-md flex items-center justify-center cursor-pointer text-[#CFCFCF] hover:text-[#4A4A4A] text-xl transition-colors duration-150">
                        <i class="ri-close-large-line"></i>
                    </div>
                </div>
            </div>
            <div v-if="!store.views.selectedBucket"
                class="w-full flex flex-col items-center justify-center text-center text-sm font-normal text-balance">
                <p>Seleziona una cassaforte prima.</p>
            </div>
            <div v-else-if="store.buckets.data?.length === 0"
                class="w-full flex flex-col items-center justify-center text-center text-sm font-normal text-balance">
                <p>Devi prima creare una cassaforte!</p>
            </div>
            <div v-else-if="thereAreNoAccounts"
                class="w-full flex flex-col items-center justify-center text-center text-sm font-normal text-balance">
                <p>Non hai ancora account in questa cassaforte. <button
                        @click="store.modals.createAccount.open = !store.modals.createAccount.open" type="button"
                        class="text-blue-600 hover:underline">Aggiungine uno!</button></p>
            </div>
            <div class="w-full flex flex-col h-[calc(56px*8)] overflow-y-auto">
                <div v-for="(accounts, letter) in store.accounts.data" :key="letter">
                    <div class="w-full px-2 mt-6 mb-1 text-black/50 text-sm font-normal uppercase">
                        <span>{{ letter }}</span>
                    </div>
                    <div @click="toAccount(account)" v-for="(account, accountIndex) in accounts" :key="accountIndex"
                        class="account relative w-full h-14 rounded-xl p-2 flex items-center justify-between flex-none hover:bg-[#F1F1F1] transition-colors duration-150 cursor-pointer overflow-hidden"
                        :class="{ 'bg-[#F1F1F1] account-selected': account.account_id?.toString() === store.views.selectedAccount?.toString() }">
                        <div class="h-full flex gap-2 items-center justify-start">
                            <div
                                class="h-full aspect-square rounded-lg flex items-center justify-center bg-black text-white uppercase overflow-hidden">
                                <img v-if="account.accounts.account_image" class="w-full h-full object-cover"
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/1024px-Netflix_icon.svg.png"
                                    alt="" loading="lazy" draggable="false">
                                <span v-else-if="!account.accounts.account_image">{{ account.accounts.name.slice(0, 2)
                                    }}</span>
                            </div>
                            <div class="flex flex-col w-[190px]">
                                <h2 class="text-base font-medium text-ellipsis">{{ account.accounts.name }}</h2>
                                <p class="text-xs font-normal text-ellipsis">{{ account.accounts.email }}</p>
                            </div>
                        </div>
                        <div class="h-full flex items-center justify-end"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Accounts section end -->
    </div>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';
import { store } from '../../data/store';
import { Splide, SplideSlide } from '@splidejs/vue-splide';

import ButtonCtaIcon from '../button/ButtonCtaIcon.vue';

export default {
    name: "Sidebar",
    components: {
        Splide,
        SplideSlide,
        ButtonCtaIcon
    },
    data() {
        return {
            auth,
            store,
            dpdMenuProfileOpen: false,
            banksHidden: false,
            search: {
                open: false,
                query: "",
                results: false,
                loading: false,
                code: ""
            },
            debouncedSearchAccounts: null
        }
    },
    computed: {
        thereAreNoAccounts() {
            if (typeof this.store.accounts.data === 'object' && this.store.accounts.data !== null) {
                // Ottiene tutte le lettere (chiavi) dell'oggetto
                const letters = Object.keys(this.store.accounts.data);

                // Verifica se almeno una lettera ha account
                return letters.every(letter => {
                    // Controlla se la lettera ha un array e se è vuoto
                    return !Array.isArray(this.store.accounts.data[letter]) || this.store.accounts.data[letter].length === 0;
                });
            }
            // Ritorna true se store.accounts.data non è un oggetto valido
            return true;
        }
    },
    methods: {
        async actionSignout() {
            try {
                const { error } = await supabase.auth.signOut()

                if (!error) {
                    this.$router.push({ name: 'login' });
                    localStorage.removeItem('selected_bucket_id');
                    localStorage.removeItem('selected_account_id');
                }
            } catch (e) {
                console.error(e);
            }
        },
        async getBuckets() {
            const PROFILE_ID = this.auth.profile?.id;

            this.store.buckets.loading = true;

            try {
                const { data, error } = await supabase
                    .from('profile_buckets')
                    .select('*, buckets(*)')
                    .eq('profile_id', PROFILE_ID);

                if (!error) {
                    /* console.log(data); */
                    this.store.buckets.data = data;
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.buckets.loading = false;
            }
        },
        async getAccounts() {
            const SELCTED_BUCKET_ID = this.store.views.selectedBucket?.toString();

            if (!SELCTED_BUCKET_ID) {
                return false;
            };

            this.store.accounts.loading = true;

            try {
                const { data, error } = await supabase
                    .from('bucket_accounts')
                    .select('*, accounts(*)')
                    .eq('bucket_id', SELCTED_BUCKET_ID);

                if (!error) {
                    this.store.accounts.data = this.filterAndGroupAccounts(data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.accounts.loading = false;
            }
        },
        async searchAccounts(query) {
            if (!query) {
                this.getAccounts();
                return;
            }

            const SELECTED_BUCKET_ID = this.store.views.selectedBucket.toString();

            this.search.loading = true;

            try {
                const { data, error } = await supabase
                    .from('bucket_accounts')
                    .select('*, accounts(*)')
                    .eq('bucket_id', SELECTED_BUCKET_ID)
                    .ilike('accounts.name', `%${query}%`);

                if (!error) {
                    this.store.accounts.data = this.filterAndGroupAccounts(data);
                }
            } catch (e) {
                this.search.results = false;
                console.error(e);
            } finally {
                this.search.loading = false;
            }
        },
        openModalDeleteBucket(bucket) {
            if (bucket) {
                this.store.modals.deleteBucket.open = !this.store.modals.deleteBucket.open;
                this.store.modals.deleteBucket.data = bucket.bucket_id;
            }
        },
        openModalUpdateBucket(bucket) {
            if (bucket) {
                this.store.modals.updateBucket.open = !this.store.modals.updateBucket.open;
                this.store.modals.updateBucket.data = bucket.bucket_id;
            }
        },
        async actionDeleteBucketOnProfile() {
            const PROFILE_ID = this.auth.profile?.id;
            const BUCKET_ID = this.store.modals.deleteBucket.data;

            if (!PROFILE_ID || !BUCKET_ID) {
                return false;
            }

            this.store.modals.deleteBucket.loading = true;

            try {
                const { error } = await supabase
                    .from('profile_buckets')
                    .delete()
                    .eq('profile_id', PROFILE_ID)
                    .eq('bucket_id', BUCKET_ID)
                    .single();

                if (!error) {
                    this.actionDeleteBucket(BUCKET_ID);
                    this.store.modals.deleteBucket.open = false;
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.store.modals.deleteBucket.loading = false;
            }
        },
        async actionDeleteBucket(BUCKET_ID) {
            try {
                const { error } = await supabase
                    .from('buckets')
                    .delete()
                    .eq('id', BUCKET_ID)
                    .single();

                if (!error) {
                    /* console.log("Ok"); */
                    this.getBuckets();
                }
            } catch (e) {
                console.error(e);
            }
        },
        toBucket(bucket) {
            const BUCKET_ID = bucket.bucket_id;

            if (bucket) {
                this.store.views.inBucket = true;
                this.store.views.selectedBucket = BUCKET_ID;

                localStorage.setItem('selected_bucket_id', BUCKET_ID);
            }
        },
        toAccount(account) {
            const ACCOUNT_ID = account.account_id;

            if (account) {
                this.store.views.inAccount = true;
                this.store.views.selectedAccount = ACCOUNT_ID;

                localStorage.setItem('selected_account_id', ACCOUNT_ID);
            }
        },

        debounceSearch() {
            clearTimeout(this.debouncedSearchTimeout);

            this.debouncedSearchTimeout = setTimeout(() => {
                this.searchAccounts(this.search.query);

                if (this.store.accounts.data.length >= 1) {
                    this.search.results = true;
                    this.search.code = "ok";
                } else if (this.store.accounts.data.length === 0) {
                    this.search.results = false;
                    this.search.code = "empty";
                }
            }, 400);
        },
        filterAndGroupAccounts(accounts) {
            const sortedAccounts = accounts
                .filter(account => account.accounts && account.accounts.name)
                .sort((a, b) => {
                    return a.accounts.name.localeCompare(b.accounts.name);
                });

            const groupedAccounts = sortedAccounts.reduce((acc, account) => {
                const firstLetter = account.accounts.name.charAt(0).toUpperCase();
                if (!acc[firstLetter]) {
                    acc[firstLetter] = [];
                }
                acc[firstLetter].push(account);
                return acc;
            }, {});

            return groupedAccounts;
        },
        handleClickOutside(event) {
            const dpdMenu = this.$refs.dpdMenu;
            if (this.dpdMenuProfileOpen && dpdMenu && !dpdMenu.contains(event.target)) {
                this.dpdMenuProfileOpen = false;
            }
        },
    },
    watch: {
        'auth.profile': {
            handler: function (value) {
                this.getBuckets();
                this.getAccounts();
            },
        },
        'store.views.selectedBucket': {
            handler: function (value) {
                this.getAccounts();
            },
        },
    },
    setup() {
        const options = {
            rewind: false,
            pagination: false,
            arrows: false,
            drag: true,
            type: 'center',
            gap: '1rem',
        };
        return { options };
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
}
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 250ms cubic-bezier(.47,1.64,.41,.8);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px) scale(.8);
    opacity: 0;
}

.bucket::before,
.account::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    border-radius: .75rem;
    pointer-events: none;
    border-width: 2px;
    border-style: solid;
    border-color: #0B53F5;
    display: none;
}

.bucket.bucket-selected::before,
.account.account-selected::before {
    display: block;
}

.splide__slide {
    width: max-content !important;
}
</style>
