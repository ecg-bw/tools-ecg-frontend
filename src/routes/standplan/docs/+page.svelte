<script lang="ts">
  import { Button } from "#lib/components/ui/button/index.js";
  import * as Card from "#lib/components/ui/card/index.js";
  import DownloadIcon from "@lucide/svelte/icons/download";
  import FileTextIcon from "@lucide/svelte/icons/file-text";

  const docs = [
    {
      name: "Checkliste",
      url: "",
    },
    {
      name: "Kasse",
      url: "",
    },
    {
      name: "Standinfo",
      url: "",
    },
  ];
</script>

<div class="flex flex-col gap-6">
  <div class="flex flex-col gap-2">
    <span class="h-1 w-10 rounded-full bg-destructive"></span>
    <h1 class="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
      Dokumente
    </h1>
    <p class="text-sm text-muted-foreground sm:text-base">
      Unterlagen und Checklisten für den Stand.
    </p>
  </div>

  <Card.Root class="border-border/75 bg-card/90 shadow-sm">
    <Card.Content class="grid gap-3 p-3 sm:p-4">
      {#each docs as doc}
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
              <p class="truncate font-semibold text-foreground">{doc.name}</p>
              <p class="text-xs text-muted-foreground">Stand-Unterlage</p>
            </div>
          </div>
          <a href={doc.url} class="shrink-0">
            <Button
              variant="outline"
              class="gap-2 rounded-lg border-border/80 px-3"
            >
              <DownloadIcon class="size-4" />
              Download
            </Button>
          </a>
        </div>
      {/each}
    </Card.Content>
  </Card.Root>
</div>
