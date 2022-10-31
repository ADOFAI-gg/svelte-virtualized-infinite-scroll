<script lang="ts">
  import { onMount } from 'svelte';

  import VirtualizedInfiniteScrollList from '../components/VirtualizedInfiniteScrollList.svelte';

  let container: HTMLDivElement;

  let start: number;
  let end: number;

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

<div>{start} - {end}</div>

<div bind:this={container} class="container">
  <VirtualizedInfiniteScrollList
    bind:startIndex={start}
    bind:endIndex={end}
    itemHeight={128}
    {items}
    scroller={container}
    let:item
  >
    <div class="item">
      {item}
    </div>
  </VirtualizedInfiniteScrollList>
</div>

<style>
  .container {
    height: 540px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow-y: scroll;
    margin-top: 12px;
  }

  .container :global(.item) {
    height: 100%;
    border: 1px solid #f00;
  }
</style>
