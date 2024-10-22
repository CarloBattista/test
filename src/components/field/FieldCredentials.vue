<template>
    <div
        class="field-cred group relative w-full h-16 px-4 flex items-center cursor-pointer border border-solid border-[#EAEAEA]">
        <div class="flex flex-col">
            <h3 class="text-[#0B53F5] text-sm font-normal">{{ label }}</h3>
            <h2 class="text-base font-medium">{{ credHidden ? '••••••••••••' : data }}</h2>

            <div v-if="type === 'cred' && credHidden"
                class="absolute top-0 right-4 h-full flex gap-1 items-center justify-center group-hover:hidden">
                <span class="text-sm">{{ passwordStrength }}</span>
                <circle-progress empty-color="#e6e6e6" :percent="passwordStrengthPercentage" :fill-color="strokeColor"
                    :size="26" :border-width="4" :border-bg-width="4" />
            </div>
        </div>
        <div v-if="type === 'cred'" @click="copyToClipboard(data)"
            class="clp absolute top-0 left-0 w-full h-full px-6 flex items-center justify-end uppercase bg-[#0B53F5]/20 opacity-0 group-hover:opacity-100 transition-all duration-150">
            copia</div>
        <div v-else-if="type === 'link'" @click="openLink(data)"
            class="clp absolute top-0 left-0 w-full h-full px-6 flex items-center justify-end uppercase bg-[#0B53F5]/20 opacity-0 group-hover:opacity-100 transition-all duration-150">
            apri</div>
    </div>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';
import { store } from '../../data/store';
import zxcvbn from 'zxcvbn';
import CircleProgress from "vue3-circle-progress";

import "vue3-circle-progress/dist/circle-progress.css";

export default {
    name: "FieldCredentials",
    components: {
        CircleProgress
    },
    props: {
        type: String,
        credHidden: Boolean,
        label: String,
        data: String
    },
    data() {
        return {
            auth,
            store,
            passwordStrength: "Terribile",
            strokeColor: '#d91616',
            passwordStrengthPercentage: 0,
        }
    },
    methods: {
        getPasswordStrength(password) {
            const result = zxcvbn(password);
            this.passwordStrengthPercentage = (result.score + 1) * 20;

            const strengths = ['Terribile', 'Debole', 'Sufficiente', 'Buona', 'Molto buona', 'Fantastica'];
            this.passwordStrength = strengths[result.score];
            this.updateStrokeColor(result.score);

            return this.passwordStrength;
        },

        updateStrokeColor(score) {
            const colors = ['#d91616', '#d98416', '#e0cf14', '#94cc10', '#49ad24', '#1cfa07'];
            this.strokeColor = colors[score];
        },

        copyToClipboard(text) {
            if (!text) {
                return false;
            }

            this.getPassword();

            navigator.clipboard.writeText(text).then(() => {
                this.store.linkCopied = true;

                setTimeout(() => {
                    this.store.linkCopied = false;
                }, 1000);

                return true;
            }).catch(err => {
                this.store.linkCopied = false;
                return false;
            });
        },
        openLink(link) {
            if (!link) {
                return false;
            }

            window.open(link, '_blank');
        },

        async getPassword() {
            const ACCOUNT_ID = localStorage.getItem('selected_account_id');
            const USER_ID = this.auth?.user.id;

            try {
                const { data, error } = await supabase
                    .from('bucket_accounts')
                    .select('accounts(*)')
                    .eq('account_id', ACCOUNT_ID)
                    .single();

                if (!error) {
                    console.log(data?.accounts?.password)
                }
            } catch (e) {
                console.error(e);
            }
        }
    },
    watch: {
        data: {
            immediate: true,
            handler(newVal) {
                if (this.type === 'cred') {
                    this.passwordStrength = this.getPasswordStrength(newVal);
                }
            }
        }
    },
}
</script>

<style scoped>
.field-cred:first-child,
.field-cred:first-child .clp {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
}

.field-cred:last-child,
.field-cred:last-child .clp {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
}
</style>