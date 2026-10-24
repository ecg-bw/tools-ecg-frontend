<script lang="ts">
  import * as Table from "#lib/components/ui/table/index.js";
  import { Badge } from "#lib/components/ui/badge/index.js";
  import ShiftDialog from "./shift-dialog.svelte";

  let { shifts } = $props();

  function isShiftFull(
    requiredPersons: number,
    persons: { id: number; name: string; phoneNumber: string }[],
  ) {
    let personCount = 0;
    if (persons == null) {
      personCount = 0;
    } else {
      persons.forEach((person) => {
        if (person.name) personCount++;
      });
    }
    if (personCount == requiredPersons) {
      return true;
    }
    return false;
  }
</script>

<!-- {@debug shifts} -->
<div class="flex flex-wrap gap-4 justify-center">
  {#each shifts.days as day}
    <Table.Root class="w-fit">
      <Table.Header>
        <Table.Row>
          <Table.Head class="font-bold text-2xl">
            {day.weekday}
          </Table.Head>
          <Table.Head></Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each day.shifts as shift}
          <Table.Row>
            {#if shift}
              <Table.Cell>
                <p class="font-bold">{shift.title}</p>
                <span>{shift.startTime} - {shift.endTime}</span>
              </Table.Cell>

              <Table.Cell class="flex flex-col gap-2">
                {#if shift.shift_assignments}
                  {#each shift.shift_assignments as person}
                    {#if person.name}
                      <Badge>{person.name}</Badge>
                      <!-- {:else} -->
                      <!-- <Input type="text" placeholder={contactInfo} /> -->
                    {/if}
                  {/each}
                {/if}
                {#if !isShiftFull(shift.required_slots, shift.shift_assignments)}
                  <ShiftDialog
                    shiftId={shift.id}
                    titel="{shift.startTime} - {shift.endTime} ({day.date})"
                  ></ShiftDialog>
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
