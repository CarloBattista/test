import { reactive } from "vue";

export const auth = reactive({
    user: null,
    session: null,
    profile: null,
    is_authenticated: false
});