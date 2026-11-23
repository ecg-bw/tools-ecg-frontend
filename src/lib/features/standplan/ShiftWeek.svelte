<script lang="ts">
  import type { Weekend } from '#lib/api/types.js';
  import type { StandplanStore } from '#lib/features/standplan/state.svelte.js';
  import type { AuthStore } from '../auth/auth.svelte';
  import DayShiftCard from './DayShiftCard.svelte';

  let {
    weekend,
    store,
    auth,
  }: {
    weekend: Weekend;
    store: StandplanStore;
    auth: AuthStore;
  } = $props();

  let openDays = $state<Record<number, boolean>>({});
</script>

<!-- items-start verhindert, dass ein offener Tag andere Spalten künstlich streckt -->
<div class="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
  {#each weekend.days as day (day.id)}
    <DayShiftCard
      {day}
      {store}
      {auth}
      bind:open={
        () => openDays[day.id] ?? true,
        (value) => (openDays[day.id] = value)
      }
    />
  {/each}
</div>