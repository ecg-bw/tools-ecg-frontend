<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  let { titel } = $props();
</script>

<Dialog.Root>
  <form>
    <Dialog.Trigger
      type="button"
      class={buttonVariants({ variant: "outline" })}
    >
      in Schicht eintragen
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-sm">
      <Dialog.Header>
        <Dialog.Title>{titel}</Dialog.Title>
        <Dialog.Description>
          Bitte Trage deine Kontaktdaten für die Schicht ein.
        </Dialog.Description>
      </Dialog.Header>
      <Field.Group>
        <Field.Field>
          <Label>Name</Label>
          <Input name="name" placeholder="Max Mustermann" />
        </Field.Field>
        <Field.Field>
          <Label>Telefonnummer</Label>
          <Input name="tel" placeholder="+49 1554 9488567" />
        </Field.Field>
      </Field.Group>
      <Dialog.Footer>
        <Dialog.Close
          type="button"
          class={buttonVariants({ variant: "outline" })}
        >
          Abbrechen
        </Dialog.Close>
        <Button type="submit">Speichern</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </form>
</Dialog.Root>
