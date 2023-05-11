<script lang="ts">
  import { onMount } from 'svelte';

  import VirtualizedInfiniteScrollListNew from '../components/VirtualizedInfiniteScrollList.svelte';

  let items: number[] = [];

  const addItems = () => {
    items = [
      ...items,
      ...new Array(100).fill(undefined).map((_x, i) => items.length + i),
    ];
  };

  onMount(() => {
    addItems();
  });
</script>

<header class="header">
  <h1>Virtualized Infinite Scroll List</h1>

  <button on:click={addItems}>Add 100 items to bottom</button>
</header>

<div class="container">
  <VirtualizedInfiniteScrollListNew
    estimateSize={() => 100}
    {items}
    let:item
    window
  >
    <div class="item">
      {item}
    </div>
  </VirtualizedInfiniteScrollListNew>
</div>

<style>
  .header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
  }

  .container {
    margin-top: 24px;
  }

  .item {
    border: 1px solid #f00;
    box-sizing: border-box;
    height: 100px;
  }
</style>
