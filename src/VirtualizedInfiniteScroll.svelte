<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount, tick } from "svelte";

  type T = $$Generic;

  export let data: T[];

  export let total: number;

  export let threshold = 10;

  export let scrollContainer: string | HTMLElement;

  let mounted: boolean = false;

  let root: HTMLElement;

  $: if (mounted) refresh(data, scroller.clientHeight);

  let averageHeight = 0;

  let scroller: HTMLElement;

  export let table: boolean = false;

  async function onScroll() {
    const oldStart = startIndex;

    for (let v = 0; v < rows.length; v++) {
      const row = rows[v];
      if (!row) break;
      heightMap[startIndex + v] = row.offsetHeight;
    }

    let i = 0;
    let y = 0;

    const scrollTop = scroller.scrollTop;

    const offset =
      root.getBoundingClientRect().y + scroller.scrollTop + window.scrollY;

    while (i < data.length) {
      const rowHeight = heightMap[i];

      if (y + rowHeight > scrollTop - offset) {
        startIndex = i;
        top = y;

        break;
      }

      y += rowHeight;
      i += 1;
    }

    while (i < data.length) {
      y += heightMap[i];
      i += 1;

      if (y > scrollTop + scroller.clientHeight) break;
    }

    endIndex = i;

    const remaining = data.length - endIndex;

    averageHeight = y / endIndex;

    while (i < data.length) heightMap[i++] = averageHeight;

    bottom = remaining * averageHeight;

    if (startIndex < oldStart) {
      await tick();

      let expected = 0;
      let actual = 0;

      for (let i = 0; i < oldStart; i++) {
        if (rows[i - startIndex]) {
          expected += heightMap[i];
          actual += rows[i - startIndex].offsetHeight;
        }
      }

      const d = actual - expected;

      scroller.scrollTo(scroller.scrollLeft, scrollTop + d);
    }
  }

  onMount(() => {
    scroller =
      typeof scrollContainer === "string"
        ? document.querySelector(scrollContainer)!
        : scrollContainer;

    scroller.addEventListener("scroll", onScroll);

    scrollY = scroller.scrollTop;

    window.addEventListener("resize", onScroll);

    mounted = true;
  });

  onDestroy(() => {
    scroller?.removeEventListener("scroll", onScroll);

    if (typeof window !== "undefined") {
      window.removeEventListener("resize", onScroll);
    }

    mounted = false;
  });

  let top = 0;
  let bottom = 0;

  let startIndex = 0;
  let endIndex = 0;

  let rows: HTMLElement[] = [];

  const heightMap: number[] = [];

  async function refresh(items: T[], viewportHeight: number) {
    const scrollTop = scroller.scrollTop;

    await tick();

    let contentHeight = top - scrollTop;

    let i = startIndex;

    while (contentHeight < viewportHeight && i < items.length) {
      let row = rows[i - startIndex];

      if (!row) {
        endIndex = i + 1;

        await tick();

        row = rows[i - startIndex];
      }

      if (!row) return;

      const rowHeight = (heightMap[i] = row.offsetHeight);

      contentHeight += rowHeight;

      i++;
    }
  }

  $: hasMore = total > data.length;

  const dispatch = createEventDispatcher();

  $: {
    if (endIndex > data.length - threshold && hasMore) {
      dispatch("more", { offset: data.length });
    }
  }

  $: sliced = data
    .slice(startIndex, endIndex)
    .map((x, i) => ({ item: x, index: i }));
</script>

{#if table}
  <tbody bind:this={root}>
    <tr style="height: {top}px;" />
    {#each sliced as { item, index } (startIndex + index)}
      <tr bind:this={rows[index]}>
        <slot {item} />
      </tr>
    {/each}
    <tr style="height: {bottom}px;" />
  </tbody>
{:else}
  <div>
    <div
      class="flex flex-col"
      bind:this={root}
      style="padding-top: {top}px; padding-bottom: {bottom}px;"
    >
      {#each sliced as { item, index } (startIndex + index)}
        <virtual-list-item style="display: block;" bind:this={rows[index]}>
          <slot {item} />
        </virtual-list-item>
      {/each}
    </div>

    {#if hasMore}
      <slot name="loading" />
    {/if}
  </div>
{/if}
