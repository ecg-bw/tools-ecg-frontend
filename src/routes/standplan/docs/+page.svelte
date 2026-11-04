<script lang="ts">
  import { Button } from "#lib/components/ui/button/index.js";
  import * as Card from "#lib/components/ui/card/index.js";
  import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
  import FileTextIcon from "@lucide/svelte/icons/file-text";
  import XIcon from "@lucide/svelte/icons/x";

  import { onMount } from "svelte";
  import { Api, type StandplanFile } from "#lib/api.js";

  let files = $state<StandplanFile[]>([]);
  let loading = $state(true);
  let error = $state(false);
  let openDoc = $state<StandplanFile | null>(null);

  onMount(async () => {
    try {
      files = await new Api().getFiles();
    } catch (e) {
      console.error(e);
      error = true;
    } finally {
      loading = false;
    }
  });
</script>

<div class="flex flex-col gap-6">
  {#if openDoc}
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between gap-2">
        <p class="min-w-0 truncate text-lg font-semibold text-foreground">
          {openDoc.title}
        </p>
        <div class="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            class="gap-2"
            href={openDoc.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLinkIcon class="size-4" />
            <span class="hidden sm:inline">Neuer Tab</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            class="gap-2"
            onclick={() => (openDoc = null)}
          >
            <XIcon class="size-4" />
            Schließen
          </Button>
        </div>
      </div>
      <iframe
        src={openDoc.url}
        title={openDoc.title}
        class="h-[75dvh] w-full rounded-xl border border-border/75 bg-card shadow-sm"
      ></iframe>
    </div>
  {:else}
    <div class="flex flex-col gap-2">
      <h1
        class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Dokumente
      </h1>
      <p class="text-sm text-muted-foreground sm:text-base">
        Unterlagen und Checklisten für den Stand.
      </p>
    </div>

    <Card.Root class="border-border/75 bg-card/90 shadow-sm">
      <Card.Content class="grid gap-3 p-3 sm:p-4">
        {#if loading}
          <p class="text-sm text-muted-foreground">Dokumente werden geladen…</p>
        {:else if error}
          <p class="text-sm text-destructive">
            Dokumente konnten nicht geladen werden.
          </p>
        {/if}
        {#each files as doc (doc.id)}
          <div
            class="flex items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/70 p-3 transition-colors hover:bg-secondary/50 sm:gap-4 sm:p-4"
          >
            <div class="flex min-w-0 items-center gap-3">
              <span
                class="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-primary"
              >
                <FileTextIcon class="size-5" />
              </span>
              <div class="min-w-0">
                <p class="truncate font-semibold text-foreground">
                  {doc.title}
                </p>
                <p class="text-xs text-muted-foreground">{doc.description}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              class="gap-2"
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <!-- <Button
            variant="outline"
            class="shrink-0 gap-2 rounded-lg border-border/80 px-3"
            onclick={() => (openDoc = doc)}
          > -->
              <ExternalLinkIcon class="size-4" />
              Öffnen
            </Button>
          </div>
        {/each}
      </Card.Content>
    </Card.Root>
  {/if}
</div>
