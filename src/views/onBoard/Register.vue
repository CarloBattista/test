<template>
    <div class="onboard-container">
        <div class="w-full h-full flex">
            <section class="w-full md:w-2/4 h-full">
                <div class="w-full h-full px-[6%] md:px-[15%] flex flex-col justify-center">
                    <div class="flex gap-4 flex-col mb-8">
                        <h2 class="text-black text-3xl font-normal">Ciao, <span class="font-semibold">Benvenuto!</span>
                        </h2>
                        <p class="text-black/60 text-sm font-normal">Siamo felici di vederti.</p>
                        <div class="flex gap-3 items-center mt-4">
                            <ButtonCta :customIcon="true" icon="" label="Google" class="w-full">
                                <svg height="26" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M60.16 32.6667C60.16 30.5867 59.9733 28.5867 59.6267 26.6667H32V38.0267H47.7867C47.0933 41.68 45.0133 44.7734 41.8933 46.8534V54.24H51.4133C56.96 49.12 60.16 41.6 60.16 32.6667Z"
                                        fill="#4285F4" />
                                    <path
                                        d="M32 61.3333C39.92 61.3333 46.56 58.72 51.4133 54.24L41.8933 46.8533C39.28 48.6133 35.9467 49.68 32 49.68C24.3733 49.68 17.8933 44.5333 15.5733 37.6H5.81334V45.1733C10.64 54.7466 20.5333 61.3333 32 61.3333Z"
                                        fill="#34A853" />
                                    <path
                                        d="M15.5733 37.5733C14.9867 35.8133 14.64 33.9467 14.64 32C14.64 30.0533 14.9867 28.1867 15.5733 26.4267V18.8533H5.81334C3.81334 22.8 2.66667 27.2533 2.66667 32C2.66667 36.7467 3.81334 41.2 5.81334 45.1467L13.4133 39.2267L15.5733 37.5733Z"
                                        fill="#FBBC05" />
                                    <path
                                        d="M32 14.3467C36.32 14.3467 40.16 15.84 43.2267 18.72L51.6267 10.32C46.5333 5.57335 39.92 2.66669 32 2.66669C20.5333 2.66669 10.64 9.25335 5.81334 18.8534L15.5733 26.4267C17.8933 19.4934 24.3733 14.3467 32 14.3467Z"
                                        fill="#EA4335" />
                                </svg>
                            </ButtonCta>
                            <ButtonCta :customIcon="true" icon="" label="Apple" class="w-full">
                                <svg height="26" viewBox="0 0 53 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_12_2)">
                                        <path
                                            d="M50.4384 21.8176C50.0672 22.1056 43.5136 25.7984 43.5136 34.0096C43.5136 43.5072 51.8528 46.8672 52.1024 46.9504C52.064 47.1552 50.7776 51.552 47.7056 56.032C44.9664 59.9744 42.1056 63.9104 37.7536 63.9104C33.4016 63.9104 32.2816 61.3824 27.2576 61.3824C22.3616 61.3824 20.6208 63.9936 16.64 63.9936C12.6592 63.9936 9.8816 60.3456 6.688 55.8656C2.9888 50.6048 0 42.432 0 34.6752C0 22.2336 8.0896 15.6352 16.0512 15.6352C20.2816 15.6352 23.808 18.4128 26.464 18.4128C28.992 18.4128 32.9344 15.4688 37.7472 15.4688C39.5712 15.4688 46.1248 15.6352 50.4384 21.8176ZM35.4624 10.2016C37.4528 7.84 38.8608 4.5632 38.8608 1.2864C38.8608 0.832 38.8224 0.3712 38.7392 0C35.5008 0.1216 31.648 2.1568 29.3248 4.8512C27.5008 6.9248 25.7984 10.2016 25.7984 13.5232C25.7984 14.0224 25.8816 14.5216 25.92 14.6816C26.1248 14.72 26.4576 14.7648 26.7904 14.7648C29.696 14.7648 33.3504 12.8192 35.4624 10.2016Z"
                                            fill="black" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_12_2">
                                            <rect width="52.096" height="64" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </ButtonCta>
                        </div>
                    </div>
                    <div
                        class="separator-text relative w-full flex gap-6 items-center justify-center text-center whitespace-nowrap mb-8">
                        <div class="relative w-full h-[1px] bg-black/40"></div>
                        <span class="text-black/40 text-sm font-normal">Oppure continua con</span>
                        <div class="relative w-full h-[1px] bg-black/40"></div>
                    </div>
                    <form @submit.prevent class="w-full flex gap-2 flex-col">
                        <div class="w-full flex gap-1 flex-col">
                            <label for="emailInput">Email</label>
                            <div class="relative w-full h-14">
                                <input v-model="user.email" id="emailInput" type="email"
                                    placeholder="Inserisci il tuo indirizzo email"
                                    class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none"
                                    :class="{ 'bg-red-600/5 border-red-600': error.email }">
                            </div>
                            <p class="w-full mt-2 px-2 text-sm text-black/50 font-normal">{{ error.email }}</p>
                        </div>
                        <div class="w-full flex gap-1 flex-col">
                            <label for="passwordInput">Password</label>
                            <div class="relative w-full h-14">
                                <input v-model="user.password" id="passwordInput"
                                    :type="!passwordIsVisible ? 'password' : 'text'" min="6"
                                    placeholder="Crea una password"
                                    class="w-full h-full px-4 rounded-2xl bg-black/5 border border-solid border-black/20 outline-none"
                                    :class="{ 'bg-red-600/5 border-red-600': error.password }">
                                <div v-if="user.password.length" @click="passwordIsVisible = !passwordIsVisible"
                                    class="absolute top-0 right-4 h-full flex items-center justify-center cursor-pointer">
                                    <i v-if="!passwordIsVisible" class="ri-eye-line"></i>
                                    <i v-else class="ri-eye-off-line"></i>
                                </div>
                            </div>
                            <ul class="w-full mt-2 flex flex-col px-2 text-xs md:text-sm text-black/50 font-normal whitespace-nowrap">
                                <li v-if="user.password.length" v-for="(requirement, index) in passwordRequirements" :key="index" :class="passwordMeetsRequirement(requirement) ? 'text-green-600' : 'text-black/50'">
                                    <i :class="passwordMeetsRequirement(requirement) ? 'ri-check-line' : 'ri-error-warning-line'"></i>
                                    {{ requirement.text }}
                                </li>
                            </ul>
                        </div>
                        <div class="w-full">
                            <ButtonForm @click="actionRegister" :disabled="false" :loading="loading" label="Continua" />
                            <p class="w-full flex gap-1 mt-4 items-center justify-center text-sm font-normal">Hai già un
                                account? <RouterLink to="/login" class="font-medium hover:underline">Accedi
                                </RouterLink>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
            <section class="w-2/4 h-full hidden md:block bg-black">
                <img class="w-full h-full object-cover" src="https://plus.unsplash.com/premium_photo-1681487746049-c39357159f69?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGFzc3dvcmR8ZW58MHx8MHx8fDA%3D" alt="protected" draggable="false">
            </section>
        </div>
    </div>
</template>

<script>
import { supabase } from '../../lib/supabase';
import { auth } from '../../data/auth';

import ButtonCta from '../../components/button/ButtonCta.vue';
import ButtonForm from '../../components/button/ButtonForm.vue';

export default {
    name: "Register",
    components: {
        ButtonCta,
        ButtonForm
    },
    data() {
        return {
            auth,
            user: {
                email: "",
                password: ""
            },
            error: {
                email: null,
                password: null
            },
            loading: false,
            passwordIsVisible: false,
            passwordRequirements: [
                { text: "La password è obbligatoria", test: password => password.length > 0 },
                { text: "La password deve avere una lunghezza minima di 6 caratteri", test: password => password.length >= 6 },
                { text: "La password deve avere almeno un carattere speciale", test: password => /[!@#$%^&*(),.?":{}|<>]/.test(password) },
                { text: "La password deve avere almeno un numero", test: password => /\d/.test(password) }
            ]
        }
    },
    methods: {
        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },
        validatePassword(password) {
            const minLength = 6;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            return password.length >= minLength && hasUpperCase && hasLowerCase && hasSymbol;
        },
        passwordMeetsRequirement(requirement) {
            return requirement.test(this.user.password);
        },
        validateFields() {
            this.error.email = null;
            this.error.password = null;

            if (!this.user.email) {
                this.error.email = "La mail è obbligatoria.";
            } else if (!this.validateEmail(this.user.email)) {
                this.error.email = "Inserisci un indirizzo email valido.";
            }

            if (!this.user.password) {
                this.error.password = "La password è obbligatoria.";
            } else if (!this.passwordRequirements.every(requirement => requirement.test(this.user.password))) {
                this.error.password = "La password non rispetta i requisiti minimi.";
            }

            return !this.error.email && !this.error.password;
        },
        async actionRegister() {
            if (!this.validateFields()) {
                return;
            }

            this.loading = true;

            try {
                const { data, error } = await supabase.auth.signUp({
                    email: this.user.email,
                    password: this.user.password,
                });

                if (!error) {
                    const userId = data.user.id;
                    this.auth.is_authenticated = true;
                    this.createStartProfile(userId);
                }
            } catch (e) {
                console.error(e);
            } finally {
                this.loading = false;
            }
        },
        async createStartProfile(userId) {
            try {
                const { error } = await supabase
                    .from('profiles')
                    .insert({ is_subscription: false, is_freezed: false, user_id: userId });

                if (!error) {
                    console.log("Profilo aggiornato!");
                }
            } catch (e) {
                console.error(e);
            }
        }
    }
}
</script>

<style scoped></style>