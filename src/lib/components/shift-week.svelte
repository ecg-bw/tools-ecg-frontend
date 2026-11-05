<script lang="ts">
  import * as Table from "#lib/components/ui/table/index.js";
  import { Badge } from "#lib/components/ui/badge/index.js";
  import ShiftDialog from "./shift-dialog.svelte";
  import {
    convertDate,
    convertTime,
    convertWeekday,
    getDaysUntil,
  } from "#lib/utils.js";
  import { USER_LANGUAGE, CRITICAL_DAYS } from "#lib/index.js";
  import { Collapsible } from "bits-ui";

  let { weekend } = $props();

  let openDays = $state<Record<number, boolean>>({});

  function getAssignedCount(
    persons:
      | { id: number; name: string; phoneNumber: string }[]
      | null
      | undefined,
  ) {
    return persons?.filter((person) => person.name).length ?? 0;
  }

  function getShiftStatus(
    shift: { required_slots: number; shift_assignments?: any[] | null } | null,
    date: string,
  ) {
    if (!shift) return null;

    const remainingSlots = Math.max(
      0,
      shift.required_slots - getAssignedCount(shift.shift_assignments),
    );
    const isFull = remainingSlots === 0;
    const daysUntil = getDaysUntil(date);
    const isCritical = !isFull && daysUntil >= 0 && daysUntil <= CRITICAL_DAYS;

    const rowClass = isFull
      ? "bg-emerald-500/5"
      : isCritical
        ? "bg-amber-500/10"
        : "";
    const infoClass = isFull
      ? "mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
      : isCritical
        ? "mt-1 text-xs font-medium text-amber-700 dark:text-amber-400"
        : "mt-1 text-xs text-muted-foreground";

    return { remainingSlots, isFull, isCritical, rowClass, infoClass };
  }
</script>

<!-- WICHTIG: items-start sorgt dafür, dass eingeklappte Karten oben einrasten und nicht die Höhe der anderen Spalten erzwingen -->
<div class="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
  {#each weekend.days as day, index}
    {@const isOpen = openDays[index] ?? true}
    <Collapsible.Root
      open={isOpen}
      onOpenChange={(open) => (openDays[index] = open)}
      class="overflow-hidden rounded-2xl border border-border/75 bg-card shadow-sm transition-all duration-200"
    >
      <!-- Kopfzeile als Trigger -->
      <Collapsible.Trigger
        class="flex w-full items-center justify-between bg-secondary/70 px-5 py-4 text-left font-semibold tracking-tight text-primary transition-colors hover:bg-secondary/90"
      >
        <div class="text-lg">
          {convertWeekday(day.dayOfWeek, USER_LANGUAGE)}
          <span class="ml-2 text-sm font-normal text-muted-foreground">
            {convertDate(day.date, USER_LANGUAGE)}
          </span>
        </div>
        <!-- Pfeil-Symbol mit sanfter Rotation -->
        <span
          class="text-xs text-muted-foreground transition-transform duration-200"
          class:rotate-180={isOpen}
        >
          ▼
        </span>
      </Collapsible.Trigger>

      <!-- Inhalt -->
      <Collapsible.Content>
        <Table.Root class="table-fixed border-t border-border/70">
          <Table.Body>
            {#each day.shifts as shift}
              {@const status = getShiftStatus(shift, day.date)}
              <Table.Row class={status?.rowClass}>
                {#if shift && status}
                  <Table.Cell
                    class="w-[42%] whitespace-normal px-3 py-4 align-top sm:px-4"
                  >
                    <p
                      class="break-words font-semibold leading-snug text-foreground"
                    >
                      {shift.title}
                    </p>
                    <span
                      class="mt-1 block text-xs tabular-nums text-muted-foreground sm:text-sm"
                    >
                      {convertTime(shift.startTime, USER_LANGUAGE)} - {convertTime(
                        shift.endTime,
                        USER_LANGUAGE,
                      )}
                    </span>
                    <p class={status.infoClass}>
                      {#if status.isFull}
                        Schicht voll
                      {:else}
                        Noch {status.remainingSlots} Helfer benötigt
                      {/if}
                    </p>
                  </Table.Cell>

                  <Table.Cell class="whitespace-normal px-3 py-4 align-top sm:px-4">
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
                    {#if !status.isFull}
                      <div class="mt-2">
                        <ShiftDialog
                          title="{convertTime(
                            shift.startTime,
                            USER_LANGUAGE,
                          )} - {convertTime(
                            shift.endTime,
                            USER_LANGUAGE,
                          )} ({convertDate(day.date, USER_LANGUAGE)})"
                          shiftId={shift.id}
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
      </Collapsible.Content>
    </Collapsible.Root>
  {/each}
</div>