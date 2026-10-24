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
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
  {#each shifts.days as day}
    <Table.Root
      class="table-fixed overflow-hidden rounded-2xl border border-border/75 bg-card shadow-sm"
    >
      <Table.Header>
        <Table.Row>
          <Table.Head
            colspan={2}
            class="border-b border-border/70 bg-secondary/70 px-5 py-4 text-lg font-semibold tracking-tight text-primary"
          >
            {day.weekday}
          </Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each day.shifts as shift}
          <Table.Row>
            {#if shift}
              <Table.Cell
                class="w-[42%] whitespace-normal px-3 py-4 align-top sm:px-4"
              >
                <p class="break-words font-semibold leading-snug text-foreground">
                  {shift.title}
                </p>
                <span
                  class="mt-1 block text-xs tabular-nums text-muted-foreground sm:text-sm"
                >
                  {shift.startTime} - {shift.endTime}
                </span>
              </Table.Cell>

              <Table.Cell
                class="whitespace-normal px-3 py-4 align-top sm:px-4"
              >
                <div class="flex flex-col items-stretch gap-1.5">
                  {#if shift.shift_assignments}
                    {#each shift.shift_assignments as person}
                      {#if person.name}
                        <Badge
                          variant="secondary"
                          class="h-auto w-full max-w-full flex-col items-start gap-0.5 whitespace-normal break-words rounded-lg px-2.5 py-1.5 text-left text-xs leading-snug"
                        >
                          <span class="font-semibold">{person.name}</span>
                          <span
                            class="text-[11px] font-normal tabular-nums text-muted-foreground"
                          >
                            {person.phoneNumber}
                          </span>
                        </Badge>
                      {/if}
                    {/each}
                  {/if}
                </div>
                {#if !isShiftFull(shift.required_slots, shift.shift_assignments)}
                  <div class="mt-2">
                    <ShiftDialog
                      shiftId={shift.id}
                      titel="{shift.startTime} - {shift.endTime} ({day.date})"
                    ></ShiftDialog>
                  </div>
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
