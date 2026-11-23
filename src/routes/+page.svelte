<script lang="ts">
  import { getContext } from 'svelte';
  import type { AuthStore } from '#lib/features/auth/auth.svelte.js';
  import LoginCard from '#lib/features/auth/LoginCard.svelte';

  const auth = getContext<AuthStore>('authStore');
</script>

<svelte:head>
  <title>Anmeldung – ECG-Tools</title>
</svelte:head>

<LoginCard {auth} redirectTo="/standplan" />