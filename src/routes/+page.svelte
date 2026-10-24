<script lang="ts">
  import * as Card from "#lib/components/ui/card/index.js";
  import { Button } from "#lib/components/ui/button/index.js";
  import { Input } from "#lib/components/ui/input/index.js";
  import { Label } from "#lib/components/ui/label/index.js";
  import { goto } from "$app/navigation";

  const password = "m48";
  let enteredPassword = $state("");
  let loginError = $state("");

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (enteredPassword !== password) {
      loginError = "Das Passwort ist nicht korrekt.";
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    await goto("/standplan");
  }
</script>

<div class="flex justify-center">
  <Card.Root class="w-full max-w-sm">
    <Card.Header>
      <Card.Title class="text-center">Anmelden</Card.Title>
    </Card.Header>
    <form onsubmit={handleSubmit} class="flex flex-col gap-4">
      <Card.Content>
        <div class="flex flex-col gap-6">
          <div class="grid gap-2">
            <Label for="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              autocomplete="current-password"
              bind:value={enteredPassword}
              aria-invalid={!!loginError}
              required
            />
            {#if loginError}
              <p class="text-sm text-destructive">{loginError}</p>
            {/if}
          </div>
        </div>
      </Card.Content>
      <Card.Footer class="flex-col gap-2">
        <Button type="submit" class="w-full">Anmelden</Button>
      </Card.Footer>
    </form>
  </Card.Root>
</div>
