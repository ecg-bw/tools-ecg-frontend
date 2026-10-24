<script lang="ts">
  import * as Accordion from "#lib/components/ui/accordion/index.js";
  import * as Tabs from "#lib/components/ui/tabs/index.js";
  import ShiftWeek from "#lib/components/shift-week.svelte";
  import { breakpoints } from "@sveu/browser";
  import { breakpoints_tailwind } from "#lib/utils.js";

  let { data } = $props();

  let shifts = $derived(data.shifts);

  const week = "Wochenende";
  export const breakpoint = breakpoints(breakpoints_tailwind);
  const sme = breakpoint.lte("sm");
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <h1
      class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
    >
      Weihnachtsmarkt Standplan
    </h1>
  </div>
  <Tabs.Root value="overview">
    <Tabs.List
      class="w-full justify-start gap-1 rounded-xl border border-border/70 bg-card p-1 shadow-sm sm:w-fit"
    >
      <Tabs.Trigger
        value="overview"
        class="min-w-0 rounded-lg px-0.5 py-2 text-[11px] whitespace-nowrap sm:px-4 sm:text-sm"
      >
        1. {week}
      </Tabs.Trigger>
      <Tabs.Trigger
        value="analytics"
        class="min-w-0 rounded-lg px-0.5 py-2 text-[11px] whitespace-nowrap sm:px-4 sm:text-sm"
      >
        2. {week}
      </Tabs.Trigger>
      <Tabs.Trigger
        value="reports"
        class="min-w-0 rounded-lg px-0.5 py-2 text-[11px] whitespace-nowrap sm:px-4 sm:text-sm"
      >
        3. {week}
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
  <ShiftWeek {shifts}></ShiftWeek>
</div>
