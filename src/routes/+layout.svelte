<script lang="ts">
  import favicon from "#lib/assets/favicon.ico";
  import logo from "#lib/assets/Logo_Evangelische_Christusgemeinde.png";
  import logoDark from "#lib/assets/Logo_Christusgemeinde_weiß.png";
  import "../app.css";

  import { setContext } from "svelte";
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { ModeWatcher } from "mode-watcher";

  import { Button } from "#lib/components/ui/button/index.js";
  import * as ButtonGroup from "#lib/components/ui/button-group/index.js";
  import * as Field from "#lib/components/ui/field/index.js";
  import LogOutIcon from "@lucide/svelte/icons/log-out";

  import { AuthStore } from "#lib/features/auth/auth.svelte.js";
  import { StandplanStore } from "#lib/features/standplan/state.svelte.js";
  import WaffleCounter from "#lib/features/waffeln/WaffleCounter.svelte";
  import ModeToggle from "#lib/features/ModeToggle.svelte";

  let { children } = $props();

  const auth = new AuthStore();
  const store = new StandplanStore({
    standplan: { weekends: [] },
    waffelnTotal: 0,
    files: [],
  });

  setContext("authStore", auth);
  setContext("standplanStore", store);

  const isLoginPage = $derived(page.url.pathname === "/");

  async function loadAllData() {
    try {
      await Promise.all([
        store.refreshStandplan(),
        store.refreshWaffeln(),
        store.refreshFiles(),
      ]);
    } catch {
      // Letzten bekannten Stand beibehalten
    }
  }

  function handleLogout() {
    auth.logout();
    void goto("/");
  }

  // Zentraler Route-Guard: "/" ist Login, alle anderen Routen sind geschützt
  $effect(() => {
    if (!auth.ready) return;

    if (isLoginPage && auth.isAuthenticated) {
      void goto("/standplan");
    } else if (!isLoginPage && !auth.isAuthenticated) {
      void goto("/");
    }
  });

  // Daten erst laden, wenn eingeloggt
  $effect(() => {
    if (!auth.ready || !auth.isAuthenticated) return;

    void loadAllData();

    const interval = setInterval(() => {
      void store.refreshWaffeln().catch(() => {});
    }, 5000);

    return () => clearInterval(interval);
  });

  const links = [
    { name: "Standplan", href: "/standplan" },
    { name: "Dokumente", href: "/standplan/docs" },
  ];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <title>ECG-Tools</title>
</svelte:head>

<ModeWatcher />

<header
  class={isLoginPage
    ? "absolute inset-x-0 top-0 z-10 border-b border-border/70 bg-card/90 shadow-sm"
    : "border-b border-border/70 bg-card/90 shadow-sm"}
>
  <div class="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:px-6">
    <div class="flex w-full items-center justify-between gap-4">
      <a href={auth.isAuthenticated ? "/standplan" : "/"} aria-label="Zur Standplan-Startseite">
        <img
          src={logo}
          alt="Evangelische Christusgemeinde Bad Wimpfen Logo"
          class="w-48 sm:w-64 dark:hidden"
        />
        <img
          src={logoDark}
          alt="Evangelische Christusgemeinde Bad Wimpfen Logo"
          class="hidden w-48 sm:w-64 dark:block"
        />
      </a>
      <div class="flex shrink-0 items-center gap-2">
        <ModeToggle />
        {#if !isLoginPage && auth.isAuthenticated}
          <WaffleCounter {store} />
          <Button
            variant="outline"
            size="icon"
            onclick={handleLogout}
            aria-label="Abmelden"
            title="Abmelden"
            class="rounded-full border-border/80 bg-background/80 shadow-sm"
          >
            <LogOutIcon class="h-4 w-4" />
          </Button>
        {/if}
      </div>
    </div>

    {#if !isLoginPage && auth.isAuthenticated}
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
    {/if}
  </div>
</header>

<main
  class={isLoginPage
    ? "mx-auto flex min-h-svh w-full max-w-6xl flex-col items-center justify-center px-4 py-8"
    : "mx-auto flex w-full max-w-6xl flex-col px-4 py-6 sm:px-6 sm:py-8"}
>
  {#if isLoginPage || (auth.ready && auth.isAuthenticated)}
    {@render children()}
  {/if}
</main>