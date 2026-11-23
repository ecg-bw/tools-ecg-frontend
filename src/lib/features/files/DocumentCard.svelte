<script lang="ts">
  import type { FileInfo } from '#lib/api/types.js';
  import { buttonVariants } from '#lib/components/ui/button/index.js';
  import { ExternalLink, FileText } from '@lucide/svelte';

  let { file }: { file: FileInfo } = $props();

  function isSafeHttpUrl(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
      return false;
    }
  }
</script>

<div class="flex items-center justify-between gap-4 rounded-xl border border-border/75 bg-card p-4 transition-colors hover:bg-accent/30">
  <div class="flex min-w-0 items-start gap-3">
    <div class="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary/60 text-muted-foreground">
      <FileText class="h-4 w-4" />
    </div>
    <div class="min-w-0">
      <h3 class="truncate text-sm font-semibold text-foreground">{file.title}</h3>
      <p class="text-xs text-muted-foreground">{file.description}</p>
    </div>
  </div>

  {#if isSafeHttpUrl(file.url)}
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      class={buttonVariants({ variant: 'outline', size: 'sm', class: 'shrink-0 gap-1.5' })}
    >
      <ExternalLink class="h-3.5 w-3.5" />
      <span>Öffnen</span>
    </a>
  {/if}
</div>