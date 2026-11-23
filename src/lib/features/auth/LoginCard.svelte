<script lang="ts">
  import type { AuthStore } from './auth.svelte';
  import { goto } from '$app/navigation';
  import * as Card from '#lib/components/ui/card/index.js';
  import { Button } from '#lib/components/ui/button/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Lock } from '@lucide/svelte';

  let {
    auth,
    redirectTo = '/standplan',
  }: {
    auth: AuthStore;
    redirectTo?: string;
  } = $props();

  let password = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!password.trim()) {
      auth.error = 'Bitte gib das Zugangspasswort ein.';
      return;
    }

    const ok = await auth.login(password);
    if (ok) {
      password = '';
      await goto(redirectTo);
    }
  }
</script>

<Card.Root class="w-full max-w-sm border-border/75 bg-card shadow-sm">
  <Card.Header class="space-y-1 text-center">
    <div
      class="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
    >
      <Lock class="h-5 w-5" />
    </div>
    <Card.Title class="text-xl font-semibold tracking-tight">
      Standplan Login
    </Card.Title>
    <Card.Description>
      Bitte melde dich mit dem Gemeinde-Passwort an.
    </Card.Description>
  </Card.Header>

  <Card.Content>
    <form onsubmit={handleSubmit} class="space-y-4">
      <div class="space-y-2">
        <Label for="standplan-password">Passwort</Label>
        <Input
          id="standplan-password"
          class="text-center"
          type="password"
          autocomplete="current-password"
          bind:value={password}
          placeholder="****"
          required
        />
      </div>

      {#if auth.error}
        <p class="text-sm font-medium text-destructive">{auth.error}</p>
      {/if}

      <Button type="submit" class="w-full" disabled={auth.loading}>
        {auth.loading ? 'Anmelden …' : 'Anmelden'}
      </Button>
    </form>
  </Card.Content>
</Card.Root>