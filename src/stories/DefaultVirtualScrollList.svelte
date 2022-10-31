<script lang="ts">
  import VirtualizedInfiniteScrollList from '../components/VirtualizedInfiniteScrollList.svelte';

  let container: HTMLDivElement;
</script>

<h1>Virtualized Infinite Scroll List</h1>

<div bind:this={container} class="container">
  <VirtualizedInfiniteScrollList scroller={container} />
</div>

<style>
  .container {
    height: 360px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    overflow-y: scroll;
  }
</style>
