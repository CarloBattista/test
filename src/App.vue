<template>
  <div>
    <RouterView />
  </div>
</template>

<script>
import { supabase } from './lib/supabase'

export default {
  name: "App"
}
</script>

<style scoped></style>