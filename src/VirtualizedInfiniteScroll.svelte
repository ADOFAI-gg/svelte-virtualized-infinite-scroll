<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";

  type T = $$Generic;

  export let data: T[];

  export let total: number;

  export let threshold = 10;

  export let itemHeight: number | number[];

  export let gap = 0;

  export let scrollContainer: string | HTMLElement;

  let root: HTMLElement;

  $: totalItemHeight =
    typeof itemHeight === "number"
      ? itemHeight
      : itemHeight.length
      ? itemHeight.reduce((a, b) => a + b)
      : 0;

  $: totalHeight =
    (data.length - 1) * totalItemHeight + (gap * (data.length - 1) - gap);

  let scrollY = 0;

  let scroller: HTMLElement;

  const onScroll = () => {
    scrollY = scroller.scrollTop;
  };

  const updateOffset = () => {
    if (top != root.offsetTop) {
      top = root.offsetTop;
    }
  };

  onMount(() => {
    scroller =
      typeof scrollContainer === "string"
        ? document.querySelector(scrollContainer)!
        : scrollContainer;

    scroller.addEventListener("scroll", onScroll);

    scroller.addEventListener("resize", updateOffset);

    scrollY = scroller.scrollTop;

    updateOffset();

    calculate();
  });

  onDestroy(() => {
    if (typeof window !== "undefined") {
      scroller.removeEventListener("scroll", onScroll);

      scroller.removeEventListener("resize", updateOffset);
    }
  });

  let top = 0;

  let startIndex = 0;
  let endIndex = 0;

  $: calculate = () => {
    const offset = Math.max(scrollY - top, 0);
    const start = Math.floor(offset / (totalItemHeight + gap));
    const count = Math.ceil(
      (scrollY - top + scroller.clientHeight - offset) / (totalItemHeight + gap)
    );

    if (startIndex != start) startIndex = start;

    const end = Math.min(start + count, data.length - 1);

    if (endIndex != end) endIndex = end;
  };

  $: {
    if (scroller) {
      calculate();
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

  $: height = (index: number) => {
    if (typeof itemHeight === "number") return itemHeight;

    return itemHeight[index];
  };
</script>

<div>
  <div style="height: {totalHeight}px;" class="relative" bind:this={root}>
    {#each sliced as { item, index } (startIndex + index)}
      <div
        style="height: {height(index)}px; top: {height(index) *
          (startIndex + index) +
          gap * (startIndex + index)}px;"
        class="absolute left-0 w-full"
      >
        <slot {item} />
      </div>
    {/each}
  </div>

  {#if hasMore}
    <slot name="loading" />
  {/if}
</div>
