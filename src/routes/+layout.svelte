<script lang="ts">
  import favicon from "#lib/assets/favicon.svg";
  import logo from "#lib/assets/Logo_Evangelische_Christusgemeinde.png";
  import "../app.css";
  import { Button } from "#lib/components/ui/button/index.js";
  import * as ButtonGroup from "#lib/components/ui/button-group/index.js";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SunIcon from "@lucide/svelte/icons/sun";
  import { ModeWatcher, toggleMode } from "mode-watcher";
  import { page } from "$app/state";
  import * as Field from "#lib/components/ui/field/index.js";
  import WaffleIcon from "#lib/components/waffle-icon.svelte";
  import { onMount } from "svelte";
  import { Api } from "#lib/api.js";

  let { children } = $props();

  const api = new Api();
  let waffleCount = $state<number | null>(null);

  async function loadWaffleCount() {
    try {
      const data = await api.getWafflCount();
      const value = typeof data === "number" ? data : null;
      if (typeof value === "number") waffleCount = value;
    } catch {
      // keep last known value
    }
  }

  onMount(() => {
    loadWaffleCount();
    const interval = setInterval(loadWaffleCount, 5000);
    return () => clearInterval(interval);
  });

  const links = [
    { name: "Standplan", href: "/standplan" },
    // { name: "Statistik", href: "/standplan/statistics" }, // todo: implement statistics page
    { name: "Dokumente", href: "/standplan/docs" },
  ];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />

<header class="border-b border-border/70 bg-card/90 shadow-sm">
  <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6">
    <div class="flex w-full items-center justify-between gap-4">
      <a href="/standplan" aria-label="Zur Standplan-Startseite">
        <img
          src={logo}
          alt="Evangelische Christusgemeinde Bad Wimpfen Logo"
          class="w-48 sm:w-64"
        />
      </a>
      <div class="flex shrink-0 items-center gap-2">
        <Button
          onclick={toggleMode}
          variant="outline"
          size="icon"
          class="rounded-full border-border/80 bg-background/80 shadow-sm"
        >
          <SunIcon
            class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
          />
          <MoonIcon
            class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
        <div
          class="flex items-center gap-2 rounded-full border border-amber-300/80 bg-amber-100/80 px-3.5 py-1.5 text-amber-950 shadow-sm dark:border-amber-700/70 dark:bg-amber-950/50 dark:text-amber-200"
          title="Waffelcount"
        >
          <WaffleIcon class="h-5 w-5" />
          <span class="text-sm font-semibold tabular-nums">
            {waffleCount === null ? "–" : waffleCount.toString()}
          </span>
        </div>
      </div>
    </div>
    <Field.Separator class="opacity-60" />
    <nav
      class="flex flex-col items-center gap-3 sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"
    >
      <ButtonGroup.Root
        aria-label="Hauptnavigation"
        class="flex-wrap sm:col-start-2 sm:justify-self-center"
      >
        {#each links as link}
          <Button
            href={link.href}
            variant={page.url.pathname === link.href ? "default" : "outline"}
            aria-current={page.url.pathname === link.href ? "page" : undefined}
            class="rounded-xl px-4"
          >
            {link.name}
          </Button>
        {/each}
      </ButtonGroup.Root>
    </nav>
  </div>
</header>

<main class="mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8">
  {@render children()}
</main>
