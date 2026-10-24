<script lang="ts">
  import * as Dialog from "#lib/components/ui/dialog/index.js";
  import * as Field from "#lib/components/ui/field/index.js";
  import { Button, buttonVariants } from "#lib/components/ui/button/index.js";
  import { Input } from "#lib/components/ui/input/index.js";
  import { Label } from "#lib/components/ui/label/index.js";
  import { refreshAll } from "$app/navigation";
  import { Api } from "#lib/api.js";

  let { titel, shiftId } = $props();
  let open = $state(false);

  let name = $state("");
  let phoneNumber = $state("");

  let nameError = $state("");
  let phoneError = $state("");
  let submitError = $state("");
  let saving = $state(false);

  const phonePattern = /^\+?[0-9\s()./-]+$/;

  function validate() {
    nameError = name.trim() ? "" : "Bitte gib deinen Namen ein.";

    const digits = phoneNumber.replace(/\D/g, "");
    if (!phoneNumber.trim()) {
      phoneError = "Bitte gib deine Telefonnummer ein.";
    } else if (!phonePattern.test(phoneNumber.trim())) {
      phoneError = "Ungültige Telefonnummer.";
    } else {
      phoneError = "";
    }

    return !nameError && !phoneError;
  }

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    submitError = "";
    if (!validate()) return;

    saving = true;
    try {
      const api = new Api();
      await api.addShiftAssignment(shiftId, name.trim(), phoneNumber.trim());
      await refreshAll();
      name = "";
      phoneNumber = "";
      open = false;
    } catch {
      submitError = "Speichern fehlgeschlagen. Bitte versuche es erneut.";
    } finally {
      saving = false;
    }
  }
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger
    type="button"
    class={buttonVariants({
      variant: "outline",
      class: "w-full px-2 text-xs whitespace-normal sm:w-auto sm:whitespace-nowrap",
    })}
  >
    in Schicht eintragen
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-sm">
    <form onsubmit={handleSubmit} novalidate class="grid gap-6">
      <Dialog.Header>
        <Dialog.Title>{titel}</Dialog.Title>
        <Dialog.Description>
          Bitte Trage deine Kontaktdaten für die Schicht ein.
        </Dialog.Description>
      </Dialog.Header>
      <Field.Group>
        <Field.Field data-invalid={!!nameError}>
          <Label>Name</Label>
          <Input
            name="name"
            bind:value={name}
            aria-invalid={!!nameError}
            placeholder="Max Mustermann"
          />
          <Field.Error>{nameError}</Field.Error>
        </Field.Field>
        <Field.Field data-invalid={!!phoneError}>
          <Label>Telefonnummer</Label>
          <Input
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
      <Field.Error>{submitError}</Field.Error>
      <Dialog.Footer>
        <Dialog.Close
          type="button"
          class={buttonVariants({ variant: "outline" })}
        >
          Abbrechen
        </Dialog.Close>
        <Button type="submit" disabled={saving}>Speichern</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
