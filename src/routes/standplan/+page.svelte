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

<div class="flex flex-col items-center gap-5">
  <Tabs.Root value="overview">
    <Tabs.List variant="line">
      <Tabs.Trigger value="overview">1. {week}</Tabs.Trigger>
      <Tabs.Trigger value="analytics">2. {week}</Tabs.Trigger>
      <Tabs.Trigger value="reports">3. {week}</Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
  <ShiftWeek shifts={shifts}></ShiftWeek>
</div>