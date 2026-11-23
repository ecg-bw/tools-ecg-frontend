<script lang="ts">
  import { getContext } from 'svelte';
  import type { StandplanStore } from '#lib/features/standplan/state.svelte.js';
  import type { AuthStore } from '#lib/features/auth/auth.svelte.js';
  import DocumentCard from '#lib/features/files/DocumentCard.svelte';
  import AddDocumentButton from '#lib/features/files/AddDocumentButton.svelte';

  const store = getContext<StandplanStore>('standplanStore');
  const auth = getContext<AuthStore>('authStore');
</script>

<svelte:head>
  <title>Dokumente – Waffelstand</title>
</svelte:head>

<div class="flex flex-col gap-6">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h1 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        Dokumente
      </h1>
      <p class="mt-1 text-sm text-muted-foreground">
        Unterlagen und Checklisten für den Stand.
      </p>
    </div>
    {#if auth.isAdmin}
      <AddDocumentButton {store} />
    {/if}
  </div>

  <div class="rounded-2xl border border-border/75 bg-card p-3 shadow-2xs sm:p-4">
    {#if store.files.length === 0}
      <p class="py-6 text-center text-sm text-muted-foreground">
        Noch keine Dokumente hinterlegt.
      </p>
    {:else}
      <div class="flex flex-col gap-3">
        {#each store.files as file (file.id)}
          <DocumentCard {file} />
        {/each}
      </div>
    {/if}
  </div>
</div>