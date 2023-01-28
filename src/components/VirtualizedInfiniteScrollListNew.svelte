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

{#if items.length}
  <div
    style="height: {$virtualizer.getTotalSize()}px"
    class="virtual-container"
  >
    <div style="--start-pos: {items[0].start}px;" class="content">
      {#each items as item}
        <VirtualizedScrollListItem {item}>
          <slot item={originalItems[item.index]} />
        </VirtualizedScrollListItem>
      {/each}
    </div>
  </div>
{/if}

<style module lang="scss">
  .virtual-container {
    position: relative;

    .content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      transform: translateY(var(--start-pos));
    }
  }
</style>
