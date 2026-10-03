<script lang="ts">
  import favicon from "#lib/assets/favicon.svg";
  import "../app.css";
  import { Button } from "#lib/components/ui/button/index.js";
  import * as ButtonGroup from "#lib/components/ui/button-group/index.js";
  import MoonIcon from "@lucide/svelte/icons/moon";
  import SunIcon from "@lucide/svelte/icons/sun";
  import { toggleMode } from "mode-watcher";
  import * as Avatar from "#lib/components/ui/avatar/index.js";
  import { page } from "$app/state";

  let { children } = $props();

  const links = [
    { name: "Standplan", href: "/standplan" },
    { name: "Statistik", href: "/standplan/statistics" },
    { name: "Dokumente", href: "/standplan/docs" },
  ];
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<header class="flex flex-row place-content-center p-5">
  <nav class="flex place-content-center">
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

    <div class="flex absolute right-5 gap-2">
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
  </nav>
</header>

<section class="flex flex-col place-content-center p-5">
  {@render children()}
</section>
