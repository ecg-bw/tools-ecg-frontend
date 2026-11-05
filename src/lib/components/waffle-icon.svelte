<script lang="ts">
  let { class: className = "" }: { class?: string } = $props();

  const step = 4;
  const coords = [-2, -1, 0, 1, 2];
  const cells = coords.flatMap((i) =>
    coords.map((j) => ({ x: 12 + i * step, y: 12 + j * step })),
  ).filter(({ x, y }) => Math.hypot(x - 12, y - 12) <= 9.5);
</script>

<svg viewBox="0 0 24 24" class={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="11.2" fill="#c98a35" />
  <circle cx="12" cy="12" r="10.4" fill="#eab95f" />
  {#each cells as { x, y }}
    <circle cx={x} cy={y} r="1.5" fill="#c98a35" opacity="0.8" />
  {/each}
  <circle cx="12" cy="12" r="10.4" fill="none" stroke="#f6d58f" stroke-width="0.6" opacity="0.7" />
</svg>
