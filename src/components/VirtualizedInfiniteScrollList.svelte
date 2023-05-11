<script lang="ts">
  import { createVirtualizer } from '@tanstack/svelte-virtual';
  import type { Virtualizer } from '@tanstack/virtual-core';
  import type { Readable } from 'svelte/store';
  import VirtualizedScrollListItem from './VirtualizedScrollListItem.svelte';

  type T = $$Generic;

  export let scroller: HTMLDivElement;

  export let estimateSize: () => number;

  let originalItems: T[];

  const virtualizer: Readable<Virtualizer<HTMLDivElement, T>> =
    createVirtualizer({
      getScrollElement: () => scroller,
      count: originalItems.length,
      estimateSize,
    });

  let countUpdated = false;

  $: {
    originalItems.length;
    countUpdated = true;
  }

  $: {
    if (countUpdated) {
      $virtualizer.setOptions({
        ...$virtualizer.options,
        count: originalItems.length,
      });

      $virtualizer.measure();

      countUpdated = false;
    }
  }

  $: items = $virtualizer.getVirtualItems();

  export { originalItems as items };
</script>

<div style="height: {$virtualizer.getTotalSize()}px" class="virtual-container">
  <!-- <div
      style="transform: translateY({items?.[0].start ?? 0}px);"
      class="content"
    > -->
  {#each items as item}
    <VirtualizedScrollListItem {item}>
      <slot item={originalItems[item.index]} />
    </VirtualizedScrollListItem>
  {/each}
  <!-- </div> -->
</div>

<style lang="scss">
  .virtual-container {
    position: relative;
  }
</style>
