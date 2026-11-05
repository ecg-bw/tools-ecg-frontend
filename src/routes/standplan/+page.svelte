<script lang="ts">
  import * as Accordion from "#lib/components/ui/accordion/index.js";
  import * as Tabs from "#lib/components/ui/tabs/index.js";
  import ShiftWeek from "#lib/components/shift-week.svelte";
  import { breakpoints } from "@sveu/browser";
  import { breakpoints_tailwind } from "#lib/utils.js";
  import { onMount } from "svelte";
  import { shiftsStore, loadShifts } from "#lib/shifts-store.svelte.js";

  let shifts = $derived(shiftsStore.data);
  let loadError = $derived(shiftsStore.error);

  const week = "Wochenende";
  export const breakpoint = breakpoints(breakpoints_tailwind);
  const sme = breakpoint.lte("sm");

  onMount(loadShifts);
</script>

<svelte:head>
  <title>Standplan - ECG-Tools</title>
</svelte:head>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h1
      class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
    >
      Weihnachtsmarkt Standplan
    </h1>
  </div>
  {#if loadError}
    <p class="text-destructive">{loadError}</p>
  {:else if !shifts}
    <p class="text-muted-foreground">Standplan wird geladen …</p>
  {:else}
    <Tabs.Root value="0">
      <Tabs.List
        class="w-full justify-start gap-1 rounded-xl border border-border/70 bg-card p-1 shadow-sm sm:w-fit"
      >
        {#each shifts.weekends as _, i}
          <Tabs.Trigger
            value={String(i)}
            class="min-w-0 rounded-lg px-0.5 py-2 text-[11px] whitespace-nowrap sm:px-4 sm:text-sm"
          >
            {i + 1}. {week}
          </Tabs.Trigger>
        {/each}
      </Tabs.List>

      {#each shifts.weekends as weekend, i}
        <Tabs.Content value={String(i)}>
          <ShiftWeek {weekend}></ShiftWeek>
        </Tabs.Content>
      {/each}
    </Tabs.Root>
  {/if}
</div>
