# Svelte Virtualized Infinite Scroll

Virtualized infinite scroll component for Svelte.

## Features

- Custom scroll elements
- Variable heights

## Installation

```bash
yarn add @adofai-gg/svelte-virtualized-infinite-scroll
```

## Usage

```html
<script lang="ts">
  import VirtualizedScroll from "@adofai-gg/svelte-virtualized-infinite-scroll";

  let totalCount = 100000;

  let data = [
    /*...*/
  ];

  const loadMore = () => {
    // ...
  };

  let scrollContainer: HTMLElement;
</script>
<div bind:this={scrollContainer}>
    <VirtualizedScroll {data} itemHeight={100} let:item on:more={(e) => loadMore(e.detail.offset)} total={totalCount} {scrollContainer}>
        <div>
            {item.something}
        </div>
    </VirtualizedScroll>
</div>
```

## Reference

### Props

| Prop            | Type        | Description                                                                           |
| --------------- | ----------- | ------------------------------------------------------------------------------------- |
| data            | Array<T>    | The array of data for the list                                                        |
| gap             | number      | The spacing between the elements                                                      |
| scrollContainer | HTMLElement | The element to capture scroll                                                         |
| threshold       | number      | `more` event is called when the rest rest items are less then this value(default: 10) |

### Events

| Event | Details            | Description                           |
| ----- | ------------------ | ------------------------------------- |
| more  | { offset: number } | Called when scroll reaches the bottom |
