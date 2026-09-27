<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Input } from "$lib/components/ui/input/index";
  import * as Accordion from "./ui/accordion";
  import ShiftDay from "./shift-day.svelte";

  const contactInfo = "Vorname Nachname, Tel.";

  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

  type Artwork = {
    artist: string;
    art: string;
  };

  const works: Artwork[] = [
    {
      artist: "Ornella Binni",
      art: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
    },
    {
      artist: "Tom Byrom",
      art: "https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80",
    },
    {
      artist: "Vladimir Malyavko",
      art: "https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80",
    },
  ];
</script>

<!-- <Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Freitag</Accordion.Trigger>
    <Accordion.Content>
      <ShiftDay></ShiftDay>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Samstag</Accordion.Trigger>
    <Accordion.Content>
      <ShiftDay></ShiftDay>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Sonntag</Accordion.Trigger>
    <Accordion.Content>

    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root> -->

<ScrollArea
  class="rounded-md border whitespace-nowrap"
  orientation="horizontal"
>
  <div class="flex w-max space-x-4 p-4">
    {#each works as artwork (artwork.artist)}
      <ShiftDay></ShiftDay>
      <!-- <figure class="shrink-0">
        <div class="overflow-hidden rounded-md">
          <img
            src={artwork.art}
            alt="Photo by {artwork.artist}"
            class="aspect-[3/4] h-fit w-fit object-cover"
            width={300}
            height={400}
          />
        </div>
        <figcaption class="pt-2 text-xs text-muted-foreground">
          Photo by
          <span class="font-semibold text-foreground">
            {artwork.artist}
          </span>
        </figcaption>
      </figure> -->
    {/each}
  </div>
</ScrollArea>
