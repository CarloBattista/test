<template>
  <div>
    <RouterView @profile-updated="getProfile" />
  </div>
</template>

<script>
import { supabase } from './lib/supabase';
import { auth } from './data/auth';
import { store } from './data/store';

export default {
  name: "App",
  data() {
    return {
      auth,
      store
    }
  },
  methods: {
    async getUser() {
      if (this.auth.user) {
        return; // Esci se l'utente è già stato caricato
      }

      try {
        const { data, error } = await supabase.auth.getUser()

        if (!error) {
          this.auth.user = data.user;
          this.auth.is_authenticated = true;
          this.getSession();
          this.getProfile();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getSession() {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (!error) {
          this.auth.session = data.session;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getProfile() {
      const userId = this.auth.user?.id;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (!error) {
          this.auth.profile = data;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getRemoveAuth() {
      const authData = localStorage.getItem('sb-jmsqmwcpdooqtnrjqhum-auth-token');

      if (!authData) {
        this.auth.user = null;
        this.auth.session = null;
        this.auth.profile = null;

        this.$router.push({ name: 'login' });
      }
    },
    restoreBucketStorage() {
      const savedBucketId = localStorage.getItem('selected_bucket_id');

      if (savedBucketId) {
        this.store.views.inBucket = true;
        this.store.views.selectedBucket = savedBucketId;
      } else {
        this.store.views.inBucket = false;
        this.store.views.selectedBucket = null;
        localStorage.removeItem('selected_bucket_id');
      }
    },
    restoreAccountStorage() {
      const savedAccountId = localStorage.getItem('selected_account_id');

      if (savedAccountId) {
        this.store.views.inAccount = true;
        this.store.views.selectedAccount = savedAccountId;
      } else {
        this.store.views.inAccount = false;
        this.store.views.selectedAccount = null;
        localStorage.removeItem('selected_account_id');
      }
    }
  },
  mounted() {
    this.getUser();
    this.getRemoveAuth();
    this.restoreBucketStorage();
    this.restoreAccountStorage();
  },
  watch: {
    'auth.user': {
      handler: function (value) {
        this.getUser();
        this.getSession();
        this.restoreBucketStorage();
        this.restoreAccountStorage();
        this.getRemoveAuth();
      },
    },
    'auth.profile': {
      immediate: true,
      handler: function (value) {
        this.getUser();
        this.getRemoveAuth();
      },
    },
    'store.buckets.data': {
      immediate: true,
      handler: function (value) {
        if (value?.length === 0) {
          localStorage.removeItem('selected_bucket_id');
          localStorage.removeItem('selected_account_id');
          this.store.views.inBucket = false;
          this.store.views.selectedBucket = null;
          this.store.views.inAccount = false;
          this.store.views.selectedAccount = null;
        }
      },
    },
    'store.accounts.data': {
      immediate: true,
      handler: function (value) {
        if (value?.length === 0) {
          localStorage.removeItem('selected_account_id');
        }
      },
    },
    'store.modals.createProfile.created_code': {
      handler: function (value) {
        this.getProfile();
      },
    },
  }
}
</script>

<style scoped></style>