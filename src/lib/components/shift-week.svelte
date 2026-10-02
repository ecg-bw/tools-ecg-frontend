<script lang="ts">
  import * as Table from "$lib/components/ui/table";
  import { Input } from "$lib/components/ui/input/index";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import ShiftDialog from "./shift-dialog.svelte";

  const contactInfo = "Vorname Nachname, Tel.";
  const days = [
    {
      day: "Freitag",
      date: "04.12.2026",
      shifts: [
        {
          name: "Aufbau",
          persons: [""],
          time: "11:30-12:00 Uhr",
          info: "Du solltest alles aufbauen.",
        },
        {
          name: "1. Schicht",
          persons: ["", "", ""],
          time: "11:30-14:30 Uhr",
          info: "Du bist für die 1. Schicht eingeteilt.",
        },
        {
          name: "2. Schicht",
          persons: ["", "", ""],
          time: "14:30-17:00 Uhr",
          info: "Du bist für die 2. Schicht eingeteilt.",
        },
        {
          name: "3. Schicht",
          persons: ["", "", ""],
          time: "17:00-20:00 Uhr",
          info: "Du bist für die 3. Schicht eingeteilt.",
        },
        {
          name: "4. Schicht",
          persons: ["", "", ""],
          time: "20:00-22:30 Uhr",
          info: "Du bist für die 4. Schicht eingeteilt.",
        },
        {
          name: "Aufräumen",
          persons: [""],
          time: "21:30-22:30 Uhr",
          info: "Du solltest beim Aufräumen helfen.",
        },
        {
          name: "Teigbeauftragter",
          persons: [""],
          time: "",
          info: "Du bist für den Teig verantwortlich.",
        },
      ],
    },
    {
      day: "Samstag",
      date: "04.12.2026",
      shifts: [
        {
          name: "Aufbau",
          persons: [""],
          time: "10:30-11:00 Uhr",
          info: "Du solltest alles aufbauen.",
        },
        {
          name: "1. Schicht",
          persons: ["", "", ""],
          time: "10:30-13:30 Uhr",
          info: "Du bist für die 1. Schicht eingeteilt.",
        },
        {
          name: "2. Schicht",
          persons: ["", "", ""],
          time: "13:30-16:30 Uhr",
          info: "Du bist für die 2. Schicht eingeteilt.",
        },
        {
          name: "3. Schicht",
          persons: ["", "", ""],
          time: "16:30-19:30 Uhr",
          info: "Du bist für die 3. Schicht eingeteilt.",
        },
        {
          name: "4. Schicht",
          persons: ["", "", ""],
          time: "19:30-22:30 Uhr",
          info: "Du bist für die 4. Schicht eingeteilt.",
        },
        {
          name: "Aufräumen",
          persons: [""],
          time: "21:30-22:30 Uhr",
          info: "Du solltest beim Aufräumen helfen.",
        },
        {
          name: "Teigbeauftragter",
          persons: [""],
          time: "",
          info: "Du bist für den Teig verantwortlich.",
        },
      ],
    },
    {
      day: "Sonntag",
      date: "04.12.2026",
      shifts: [
        {
          name: "Aufbau",
          persons: [""],
          time: "10:30-11:00 Uhr",
          info: "Du solltest alles aufbauen.",
        },
        {
          name: "1. Schicht",
          persons: ["", "", ""],
          time: "10:30-13:30 Uhr",
          info: "Du bist für die 1. Schicht eingeteilt.",
        },
        {
          name: "2. Schicht",
          persons: ["", "", ""],
          time: "13:30-16:30 Uhr",
          info: "Du bist für die 2. Schicht eingeteilt.",
        },
        {
          name: "3. Schicht",
          persons: ["", "", ""],
          time: "16:30-19:30 Uhr",
          info: "Du bist für die 3. Schicht eingeteilt.",
        },
        {
          name: "4. Schicht",
          persons: ["", "", ""],
          time: "19:30-21:00 Uhr",
          info: "Du bist für die 4. Schicht eingeteilt.",
        },
        {
          name: "Aufräumen",
          persons: [""],
          time: "20:00-21:00 Uhr",
          info: "Du solltest beim Aufräumen helfen.",
        },
        {
          name: "Teigbeauftragter",
          persons: [""],
          time: "",
          info: "Du bist für den Teig verantwortlich.",
        },
      ],
    },
  ];
  const maxShiftCount = Math.max(...days.map((day) => day.shifts.length));
</script>

<ScrollArea
  class="rounded-md border whitespace-nowrap"
  orientation="horizontal"
>
  <div class="flex w-max space-x-4 p-4">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          {#each days as day}
            <Table.Head>{day.day}</Table.Head>
            <Table.Head></Table.Head>
          {/each}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each { length: maxShiftCount } as _, shiftIndex}
          <Table.Row>
            {#each days as day}
              {@const shift = day.shifts[shiftIndex]}

              {#if shift}
                <Table.Cell class="font-medium">
                  <p class="font-bold">{shift.name}</p>
                  <span>{shift.time}</span>
                </Table.Cell>

                <Table.Cell class="flex flex-col gap-2">
                  {#each shift.persons as person}
                    {#if person}
                      <Badge>{person}</Badge>
                    {:else}
                      <!-- <Input type="text" placeholder={contactInfo} /> -->
                      <ShiftDialog titel="{shift.time} ({day.date})"
                      ></ShiftDialog>
                    {/if}
                  {/each}
                </Table.Cell>
              {:else}
                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>
              {/if}
            {/each}
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</ScrollArea>
