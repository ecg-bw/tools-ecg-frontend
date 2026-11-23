<script lang="ts">
  import { getContext } from 'svelte';
  import type { StandplanStore } from '#lib/features/standplan/state.svelte.js';
  import type { AuthStore } from '#lib/features/auth/auth.svelte.js';
  import * as Tabs from '#lib/components/ui/tabs/index.js';
  import ShiftWeek from '#lib/features/standplan/ShiftWeek.svelte';

  const store = getContext<StandplanStore>('standplanStore');
  const auth = getContext<AuthStore>('authStore');

  let weekends = $derived(store.data.weekends);
  let activeTab = $derived(String(store.selectedWeekendIndex));
</script>

<svelte:head>
  <title>Standplan – Waffelstand</title>
</svelte:head>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-1">
    <h1 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
      Weihnachtsmarkt Standplan
    </h1>
  </div>

  {#if store.error}
    <div class="rounded-xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
      {store.error}
    </div>
  {:else if store.loading && weekends.length === 0}
    <p class="text-sm text-muted-foreground">Standplan wird geladen …</p>
  {:else if weekends.length === 0}
    <p class="text-sm text-muted-foreground">Aktuell sind keine Wochenenden hinterlegt.</p>
  {:else}
    <Tabs.Root
      value={activeTab}
      onValueChange={(val) => {
        const idx = Number(val);
        if (!Number.isNaN(idx)) store.selectWeekend(idx);
      }}
    >
      <Tabs.List
        class="w-full justify-start gap-1 rounded-xl border border-border/70 bg-card p-1 shadow-2xs sm:w-fit"
      >
        {#each weekends as _, i}
          <Tabs.Trigger
            value={String(i)}
            class="min-w-0 rounded-lg px-3 py-2 text-xs whitespace-nowrap sm:px-4 sm:text-sm"
          >
            {i + 1}. Wochenende
          </Tabs.Trigger>
        {/each}
      </Tabs.List>

      {#each weekends as weekend, i}
        <Tabs.Content value={String(i)} class="mt-4">
          <ShiftWeek {weekend} {store} {auth} />
        </Tabs.Content>
      {/each}
    </Tabs.Root>
  {/if}
</div>