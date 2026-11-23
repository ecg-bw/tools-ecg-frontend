<script lang="ts">
  import type { ShiftAssignment } from '#lib/api/types.js';
  import type { StandplanStore } from '#lib/features/standplan/state.svelte.js';
  import * as Dialog from '#lib/components/ui/dialog/index.js';
  import * as Field from '#lib/components/ui/field/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';

  let {
    store,
    shiftId,
    title,
    assignment,
    open = $bindable(false),
    showTrigger = true,
    triggerLabel = 'in Schicht eintragen',
  }: {
    store: StandplanStore;
    shiftId: number;
    title: string;
    assignment?: ShiftAssignment;
    open?: boolean;
    showTrigger?: boolean;
    triggerLabel?: string;
  } = $props();

  let name = $state('');
  let phoneNumber = $state('');

  let nameError = $state('');
  let phoneError = $state('');
  let submitError = $state('');
  let saving = $state(false);

  const phonePattern = /^\+?[0-9\s()./-]+$/;

  $effect(() => {
    if (open) {
      name = assignment?.name ?? '';
      phoneNumber = assignment?.phoneNumber ?? '';
      nameError = '';
      phoneError = '';
      submitError = '';
    }
  });

  function validate(): boolean {
    nameError = name.trim() ? '' : 'Bitte gib deinen Namen ein.';

    const trimmedPhone = phoneNumber.trim();
    const digits = trimmedPhone.replace(/\D/g, '');
    if (!trimmedPhone) {
      phoneError = 'Bitte gib deine Telefonnummer ein.';
    } else if (!phonePattern.test(trimmedPhone) || digits.length < 6) {
      phoneError = 'Bitte gib eine gültige Telefonnummer ein.';
    } else {
      phoneError = '';
    }

    return !nameError && !phoneError;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    submitError = '';
    if (!validate()) return;

    saving = true;
    try {
      const payload = {
        name: name.trim(),
        phoneNumber: phoneNumber.trim(),
      };

      if (assignment) {
        await store.editAssignment(shiftId, assignment.id, payload);
      } else {
        await store.addAssignment(shiftId, payload);
      }

      open = false;
    } catch (error) {
      submitError =
        error instanceof Error
          ? error.message
          : 'Speichern fehlgeschlagen. Bitte versuche es erneut.';
    } finally {
      saving = false;
    }
  }

  async function handleDelete(shiftId: number, assignmentId: number) {
    await store.removeAssignment(shiftId, assignmentId);
  }
</script>

<Dialog.Root bind:open>
  {#if showTrigger}
    <Dialog.Trigger
      type="button"
      class={buttonVariants({
        variant: 'outline',
        class: 'w-full px-2 text-xs whitespace-normal sm:w-auto sm:whitespace-nowrap',
      })}
    >
      {triggerLabel}
    </Dialog.Trigger>
  {/if}

  <Dialog.Content class="sm:max-w-sm">
    <form onsubmit={handleSubmit} novalidate class="grid gap-6">
      <Dialog.Header>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>
          {assignment
            ? 'Aktualisiere die Kontaktdaten für diese Schichtbelegung.'
            : 'Bitte trage deine Kontaktdaten für die Schicht ein.'}
        </Dialog.Description>
      </Dialog.Header>

      <Field.Group>
        <Field.Field data-invalid={!!nameError}>
          <Label for="shift-name">Name</Label>
          <Input
            id="shift-name"
            name="name"
            bind:value={name}
            aria-invalid={!!nameError}
            placeholder="Max Mustermann"
          />
          <Field.Error>{nameError}</Field.Error>
        </Field.Field>

        <Field.Field data-invalid={!!phoneError}>
          <Label for="shift-phone">Telefonnummer</Label>
          <Input
            id="shift-phone"
            name="phoneNumber"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            bind:value={phoneNumber}
            aria-invalid={!!phoneError}
            placeholder="+49 1554 9488567"
          />
          <Field.Error>{phoneError}</Field.Error>
        </Field.Field>
      </Field.Group>

      {#if submitError}
        <Field.Error>{submitError}</Field.Error>
      {/if}

      <Dialog.Footer>
        {#if assignment}
          <Button
            variant="destructive"
            type="button"
            class="sm:mr-auto"
            onclick={() => handleDelete(shiftId, assignment.id)}
          >
            Löschen
          </Button>
        {/if}
        <Dialog.Close
          type="button"
          class={buttonVariants({ variant: 'outline' })}
          disabled={saving}
        >
          Abbrechen
        </Dialog.Close>
        <Button type="submit" disabled={saving}>
          {saving ? 'Speichert …' : 'Speichern'}
        </Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>