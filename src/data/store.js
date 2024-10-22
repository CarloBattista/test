import { reactive } from "vue";

export const store = reactive({
    LANGUAGE: "it-IT",
    THEME: "light",

    modals: {
        createProfile: {
            name: {
                open: false,
                data: {
                    first_name: "",
                    last_name: ""
                },
                loading: false,
            },
        },
        updateProfile: {
            name: {
                open: false,
                data: {
                    first_name: "",
                    last_name: ""
                },
                loading: false,
            },
        },

        createBucket: false,
        updateBucket: {
            open: false,
            data: null,
            loading: false,
        },
        deleteBucket: {
            open: false,
            data: null,
            loading: false,
        },
        createAccount: {
            open: false,
            data: null,
            loading: false,
        },
        updateAccount: {
            open: false,
            data: {
                id: "",
                name: "",
                username: "",
                email: "",
                password: "",
                account_image: "",
                website_url: ""
            },
            loading: false,
        },
        deleteAccount: {
            open: false,
            data: null,
            loading: false,
        }
    },

    buckets: {
        data: null,
        loading: false,
    },

    accounts: {
        data: null,
        loading: false
    },

    views: {
        inBucket: false,
        selectedBucket: null,

        inAccount: false,
        selectedAccount: null,
        accountData: null
    },

    linkCopied: false,
});