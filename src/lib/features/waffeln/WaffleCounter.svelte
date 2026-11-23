<script lang="ts">
  import type { StandplanStore } from '#lib/features/standplan/state.svelte.js';
  import { Cookie } from '@lucide/svelte';

  let {
    store,
  }: {
    store: StandplanStore;
  } = $props();

  let updating = $state(false);
</script>

<button
  type="button"
  disabled={updating}
  title="Waffel-Zähler um 1 erhöhen"
  aria-label="Waffel-Zähler erhöhen (aktuell {store.waffelnTotal})"
  class="group inline-flex items-center gap-2 rounded-full border border-amber-400/70 bg-amber-100/90 px-3.5 py-1.5 text-sm font-semibold text-amber-950 shadow-xs transition-all hover:border-amber-500 hover:bg-amber-200/80 active:scale-[0.98] disabled:opacity-60 dark:border-amber-500/40 dark:bg-amber-950/60 dark:text-amber-200 dark:hover:bg-amber-900/70"
>
  <Cookie class="h-4 w-4 text-amber-600 dark:text-amber-400" />
  <span class="tabular-nums">{store.waffelnTotal}</span>
  <!--<Plus class="h-3.5 w-3.5 opacity-70 transition-transform group-hover:rotate-90" />-->
</button>