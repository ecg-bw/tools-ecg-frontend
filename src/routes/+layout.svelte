<script lang="ts">
  import favicon from "#lib/assets/favicon.svg";
  import logo from "#lib/assets/Logo_Evangelische_Christusgemeinde.png";
  import "../app.css";
  import { Button } from "#lib/components/ui/button/index.js";
  import * as ButtonGroup from "#lib/components/ui/button-group/index.js";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SunIcon from "@lucide/svelte/icons/sun";
  import { toggleMode } from "mode-watcher";
  import * as Avatar from "#lib/components/ui/avatar/index.js";
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

<header class="flex flex-col place-content-center gap-5">
  <div class="flex w-full items-center justify-between px-5 pt-5">
    <div>
      <!-- logo -->
      <img
        src={logo}
        alt="Evangelische Christusgemeinde Bad Wimpfen Logo"
        class="w-64"
      />
    </div>
    <div class="flex gap-2">
      <Button onclick={toggleMode} variant="outline" size="icon">
        <SunIcon
          class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
        />
        <MoonIcon
          class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
        />
        <span class="sr-only">Toggle theme</span>
      </Button>

      <div class="flex flex-row flex-wrap items-center gap-6 md:gap-12">
        <Avatar.Root>
          <Avatar.Image
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            class="grayscale"
          />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar.Root>
      </div>
    </div>
  </div>
  <Field.Separator />
  <nav class="relative flex place-content-center px-5">
    <ButtonGroup.Root aria-label="Button group">
      {#each links as link}
        <Button
          variant={page.url.pathname === link.href ? "default" : "outline"}
          aria-current={page.url.pathname === link.href ? "page" : undefined}
        >
          <a href={link.href}>{link.name}</a>
        </Button>
      {/each}
    </ButtonGroup.Root>
    <div
      class="absolute top-1/2 right-5 flex -translate-y-1/2 items-center gap-2 rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-amber-900 shadow-sm dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200"
      title="Waffelcount"
    >
      <WaffleIcon class="h-5 w-5" />
      <span class="text-sm font-semibold tabular-nums">
        {waffleCount === null ? "–" : waffleCount.toString()}
      </span>
    </div>
  </nav>
</header>

<section class="flex flex-col place-content-center p-5">
  {@render children()}
</section>
