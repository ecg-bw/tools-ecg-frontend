<script lang="ts">
  import { Button, Root } from "$lib/components/ui/button";
  import * as ButtonGroup from "$lib/components/ui/button-group";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index";
  import * as Accordion from "$lib/components/ui/accordion/index";
  import ShiftWeek from "$lib/components/shift-week.svelte";

  const week = "Wochenende";
</script>

<header>
  <nav class="flex place-content-center p-5">
    <ButtonGroup.Root class="dark" aria-label="Button group">
      <Button>Standplan</Button>
      <Button>Statistik</Button>
      <Button>Dokumente</Button>
    </ButtonGroup.Root>
  </nav>
</header>

<section class="flex flex-col place-content-center p-5">
  <h1 class="text-center font-bold text-2xl">Standplan</h1>
  <Accordion.Root type="multiple">
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
</section>
