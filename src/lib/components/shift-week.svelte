<script lang="ts">
  import * as Table from "#lib/components/ui/table/index.js";
  import { Badge } from "#lib/components/ui/badge/index.js";
  import ShiftDialog from "./shift-dialog.svelte";
  import { convertDate, convertTime, getDaysUntil } from "#lib/utils.js";
  import { USER_LANGUAGE, CRITICAL_DAYS } from "#lib/index.js";

  let { weekend } = $props();

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

<!-- {@debug shifts} -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
  {#each weekend.days as day}
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
  {/each}
</div>
