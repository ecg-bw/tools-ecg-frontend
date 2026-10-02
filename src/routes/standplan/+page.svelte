<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index";
  import ShiftWeek from "$lib/components/shift-week.svelte";

  const week = "Wochenende";
</script>

<h1 class="text-center font-bold text-2xl">Standplan</h1>
<Accordion.Root type="multiple" value="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>1. {week}</Accordion.Trigger>
    <Accordion.Content>
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
