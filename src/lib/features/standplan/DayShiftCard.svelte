<script lang="ts">
  import type { Day, Shift, ShiftAssignment } from '#lib/api/types.js';
  import type { StandplanStore } from '#lib/features/standplan/state.svelte.js';
  import * as Table from '#lib/components/ui/table/index.js';
  import { Collapsible } from 'bits-ui';
  import AssignmentBadge from './AssignmentBadge.svelte';
  import ShiftDialog from './ShiftDialog.svelte';
  import { convertDate, convertTime, convertWeekday, getDaysUntil } from '#lib/utils.js';
  import { USER_LANGUAGE } from '#lib/index.js';
    import type { AuthStore } from '../auth/auth.svelte';

  let {
    day,
    store,
    auth,
    open = $bindable(true),
  }: {
    day: Day;
    store: StandplanStore;
    auth: AuthStore;
    open?: boolean;
  } = $props();

  function getAssignedCount(shift: Shift): number {
    return shift.shift_assignments?.filter((p) => Boolean(p.name?.trim())).length ?? 0;
  }

  function getShiftStatus(shift: Shift, date: string) {
    const remainingSlots = Math.max(0, shift.required_slots - getAssignedCount(shift));
    const isFull = remainingSlots === 0;
    const isCritical = shift.criticalFlag === 1;
    const isUrgent = shift.criticalFlag === 2;

    const rowClass = isFull
      ? 'bg-emerald-500/5'
      : isCritical
        ? 'bg-amber-500/10'
        : isUrgent
          ? 'bg-rose-500/10'
          : '';

    const infoClass = isFull
      ? 'mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400'
      : isCritical
        ? 'mt-1 text-xs font-medium text-amber-700 dark:text-amber-400'
        : isUrgent
          ? 'mt-1 text-xs font-medium text-rose-700 dark:text-rose-400'
          : 'mt-1 text-xs text-muted-foreground';

    return { remainingSlots, isFull, isCritical, isUrgent, rowClass, infoClass };
  }
</script>

<Collapsible.Root
  bind:open
  class="overflow-hidden rounded-2xl border border-border/75 bg-card shadow-sm transition-all duration-200"
>
  <Collapsible.Trigger
    class="flex w-full items-center justify-between bg-secondary/70 px-5 py-4 text-left font-semibold tracking-tight text-primary transition-colors hover:bg-secondary/90"
  >
    <div class="text-lg">
      {convertWeekday(day.dayOfWeek, USER_LANGUAGE)}
      <span class="ml-2 text-sm font-normal text-muted-foreground">
        {convertDate(day.date, USER_LANGUAGE)}
      </span>
    </div>
    <span
      class="text-xs text-muted-foreground transition-transform duration-200"
      class:rotate-180={open}
    >
      ▼
    </span>
  </Collapsible.Trigger>

  <Collapsible.Content>
    <Table.Root class="table-fixed border-t border-border/70">
      <Table.Body>
        {#each day.shifts as shift (shift.id)}
          {@const status = getShiftStatus(shift, day.date)}
          <Table.Row class={status.rowClass}>
            <Table.Cell class="w-[42%] px-3 py-4 align-top whitespace-normal sm:px-4">
              <p class="font-semibold leading-snug break-words text-foreground">
                {shift.title}
              </p>
              <span class="mt-1 block text-xs text-muted-foreground tabular-nums sm:text-sm">
                {convertTime(shift.startTime, USER_LANGUAGE)} - {convertTime(
                  shift.endTime,
                  USER_LANGUAGE
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

            <Table.Cell class="px-3 py-4 align-top whitespace-normal sm:px-4">
              <div class="flex flex-col items-stretch gap-1.5">
                {#each shift.shift_assignments ?? [] as person (person.id)}
                  {#if person.name}
                    <AssignmentBadge
                      shift={shift}
                      assignment={person}
                      isAdmin={auth.isAdmin}
                      store={store}
                    />
                  {/if}
                {/each}
              </div>

              {#if !status.isFull}
                <div class="mt-2">
                  <ShiftDialog
                    {store}
                    shiftId={shift.id}
                    title="{convertTime(shift.startTime, USER_LANGUAGE)} - {convertTime(
                      shift.endTime,
                      USER_LANGUAGE
                    )} ({convertDate(day.date, USER_LANGUAGE)})"
                  />
                </div>
              {/if}
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Collapsible.Content>
</Collapsible.Root>