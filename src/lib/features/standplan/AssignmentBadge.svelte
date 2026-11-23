<script lang="ts">
  import type { Shift, ShiftAssignment } from '#lib/api/types.js';
  import { Badge } from '#lib/components/ui/badge/index.js';
  import { Pencil } from '@lucide/svelte';
  import ShiftDialog from '#lib/features/standplan/ShiftDialog.svelte';
  import type { StandplanStore } from '#lib/features/standplan/state.svelte.js';

  let {
    shift,
    assignment,
    isAdmin,
    store,
  }: {
    shift: Shift;
    assignment: ShiftAssignment;
    isAdmin: boolean;
    store: StandplanStore;
  } = $props();

  let editingContext = $state<{ shift: Shift; assignment: ShiftAssignment } | null>(null);
  let editDialogOpen = $state(false);

  function openEdit(shift: Shift, assignment: ShiftAssignment) {
    editingContext = { shift, assignment };
    editDialogOpen = true;
  }
</script>

<Badge
  variant="secondary"
  class="group flex h-auto w-full max-w-full items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs leading-snug whitespace-normal"
  onclick={() => isAdmin ? openEdit(shift, assignment) : null}
>
  <div class="min-w-0 flex-1">
    <p class="font-semibold break-words text-foreground">
      {assignment.name}
    </p>
    <p class="text-[11px] font-normal tabular-nums text-muted-foreground break-all">
      {assignment.phoneNumber}
    </p>
  </div>

  {#if isAdmin}
    <div class="flex shrink-0 items-center gap-0.5">
      <Pencil class="h-3.5 w-3.5" />
    </div>
  {/if}
</Badge>

{#if editingContext}
  <ShiftDialog
    {store}
    bind:open={editDialogOpen}
    showTrigger={false}
    shiftId={editingContext.shift.id}
    assignment={editingContext.assignment}
    title="Belegung bearbeiten – {editingContext.shift.title}"
  />
{/if}