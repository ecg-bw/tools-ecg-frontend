<script lang="ts">
  import * as Accordion from "#lib/components/ui/accordion/index.js";
  import * as Tabs from "#lib/components/ui/tabs/index.js";
  import ShiftWeek from "#lib/components/shift-week.svelte";
  import { breakpoints } from "@sveu/browser";
  import { breakpoints_tailwind } from "#lib/utils.js";

  const week = "Wochenende";
  export const breakpoint = breakpoints(breakpoints_tailwind);
  const sme = breakpoint.lte("sm");
</script>

<div class="flex flex-col items-center gap-5">
  <h1 class="text-center font-bold text-3xl">Standplan</h1>
  <Tabs.Root value="overview">
    <Tabs.List variant="line">
      <Tabs.Trigger value="overview">1. {week}</Tabs.Trigger>
      <Tabs.Trigger value="analytics">2. {week}</Tabs.Trigger>
      <Tabs.Trigger value="reports">3. {week}</Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
  <ShiftWeek></ShiftWeek>
</div>

<!-- <div class="flex justify-center">
  {#if $sme}
    <Accordion.Root type="single" value="item-1">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>1. {week}</Accordion.Trigger>
        <Accordion.Content class="flex justify-center"></Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>2. {week}</Accordion.Trigger>
        <Accordion.Content>
          <ShiftWeek></ShiftWeek>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>3. {week}</Accordion.Trigger>
        <Accordion.Content>
          <ShiftWeek></ShiftWeek>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  {:else}
    <Accordion.Root type="multiple" value={["item-1"]}>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>1. {week}</Accordion.Trigger>
        <Accordion.Content class="flex justify-center">
          <ShiftWeek></ShiftWeek>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>2. {week}</Accordion.Trigger>
        <Accordion.Content>
          <ShiftWeek></ShiftWeek>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>3. {week}</Accordion.Trigger>
        <Accordion.Content>
          <ShiftWeek></ShiftWeek>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  {/if}
</div> -->
