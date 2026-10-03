<script lang="ts">
  import * as Table from "#lib/components/ui/table/index.js";
  import { ScrollArea } from "#lib/components/ui/scroll-area/index.js";
  import { Badge } from "#lib/components/ui/badge/index.js";
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
          persons: ["Paul Wennes", "Ben Müller", "Lara Larson"],
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

  function isShiftFull(persons: string[]) {
    let personCount = 0;
    persons.forEach((person) => {
      if (person) personCount++;
    });
    if (personCount == persons.length) {
      return true;
    }
    return false;
  }
</script>

<div class="flex flex-wrap gap-4 justify-center">
  {#each days as day}
    <Table.Root class="w-fit">
      <Table.Header>
        <Table.Row>
          <Table.Head>{day.day}</Table.Head>
          <Table.Head></Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each day.shifts as shift}
          <Table.Row>
            {#if shift}
              <Table.Cell>
                <p class="font-bold">{shift.name}</p>
                <span>{shift.time}</span>
              </Table.Cell>

              <Table.Cell class="flex flex-col gap-2">
                {#each shift.persons as person}
                  {#if person}
                    <Badge>{person}</Badge>
                    <!-- {:else} -->
                    <!-- <Input type="text" placeholder={contactInfo} /> -->
                  {/if}
                {/each}
                {#if !isShiftFull(shift.persons)}
                  <ShiftDialog titel="{shift.time} ({day.date})"></ShiftDialog>
                {/if}
              </Table.Cell>
            {:else}
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
            {/if}
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  {/each}
</div>
