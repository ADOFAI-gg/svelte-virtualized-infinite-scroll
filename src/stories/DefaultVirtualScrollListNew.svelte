<script lang="ts">
  import { onMount } from 'svelte';

  import VirtualizedInfiniteScrollListNew from '../components/VirtualizedInfiniteScrollList.svelte';

  let container: HTMLDivElement;

  let items: number[] = [];

  const addItems = () => {
    items = [
      ...items,
      ...new Array(10000).fill(undefined).map((_x, i) => items.length + i),
    ];
  };

  onMount(() => {
    addItems();
  });
</script>

<h1>Virtualized Infinite Scroll List</h1>

<button on:click={addItems}>Add 10000 items to bottom</button>

<div bind:this={container} class="container">
  {#if container}
    <VirtualizedInfiniteScrollListNew
      estimateSize={() => 100}
      scroller={container}
      {items}
      let:item
    >
      <div class="item">
        {item}
      </div>
    </VirtualizedInfiniteScrollListNew>
  {/if}
</div>

<style>
  .container {
    height: 540px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow-y: scroll;
    margin-top: 12px;
  }

  .container :global(.item) {
    border: 1px solid #f00;
    height: 100px;
  }
</style>
