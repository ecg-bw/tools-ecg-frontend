<script lang="ts">
  import * as Dialog from '#lib/components/ui/dialog/index.js';
  import { Button, buttonVariants } from '#lib/components/ui/button/index.js';
  import { Input } from '#lib/components/ui/input/index.js';
  import { Label } from '#lib/components/ui/label/index.js';
  import { Plus } from '@lucide/svelte';
  import type { StandplanStore } from '../standplan/state.svelte';

  let dialogOpen = $state(false);
  let title = $state('');
  let description = $state('');
  let url = $state('');
  let errorMsg = $state('');
  let saving = $state(false);

  let { store }: { store: StandplanStore } = $props();

  async function handleCreateFile(e: SubmitEvent) {
    e.preventDefault();
    errorMsg = '';

    if (!title.trim() || !description.trim() || !url.trim()) {
      errorMsg = 'Bitte Titel, Beschreibung und URL angeben.';
      return;
    }

    saving = true;
    try {
      await store.addFile({
        title: title.trim(),
        description: description.trim(),
        url: url.trim(),
     });
    } catch {
      errorMsg = 'Dokument konnte nicht gespeichert werden.';
    } finally {
      saving = false;
    }
  }
</script>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger
    type="button"
    class={buttonVariants({ variant: 'outline', size: 'sm', class: 'gap-1.5' })}
    >
    <Plus class="h-4 w-4" />
    <span>Dokument hinzufügen</span>
    </Dialog.Trigger>

    <Dialog.Content class="sm:max-w-md">
    <form onsubmit={handleCreateFile} class="grid gap-4">
        <Dialog.Header>
        <Dialog.Title>Neues Dokument verlinken</Dialog.Title>
        <Dialog.Description>
            Füge einen Leitfaden, eine Checkliste oder ein weiteres Dokument hinzu.
        </Dialog.Description>
        </Dialog.Header>

        <div class="grid gap-2">
        <Label for="doc-title">Titel</Label>
        <Input id="doc-title" bind:value={title} placeholder="Hygienekonzept 2026" required />
        </div>

        <div class="grid gap-2">
        <Label for="doc-desc">Beschreibung</Label>
        <Input
            id="doc-desc"
            bind:value={description}
            placeholder="Wichtige Richtlinien für den Standbetrieb"
            required
        />
        </div>

        <div class="grid gap-2">
        <Label for="doc-url">URL</Label>
        <Input
            id="doc-url"
            type="url"
            bind:value={url}
            placeholder="https://example.com/datei.pdf"
            required
        />
        </div>

        {#if errorMsg}
        <p class="text-sm font-medium text-destructive">{errorMsg}</p>
        {/if}

        <Dialog.Footer>
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