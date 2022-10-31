<script lang="ts">
  // eslint-disable-next-line no-undef
  type T = $$Generic;

  export let itemHeight: number;

  export let itemSpacing = 0;

  export let items: T[];

  export let scroller: HTMLElement | undefined = undefined;

  let isWindow = false;

  let container: HTMLDivElement;
  let contentOffset = 0;

  export let startIndex = 0;
  export let endIndex = 0;

  export { isWindow as window };

  $: scrollElement = isWindow ? document.documentElement : scroller;

  $: onScroll = async () => {
    if (!container || !scrollElement) return;

    let from = scrollElement.scrollTop;

    let to = scrollElement.scrollTop + scrollElement.offsetHeight;

    const start = Math.max(Math.floor(from / (itemHeight + itemSpacing)), 0);

    const end = Math.min(
      Math.ceil(to / (itemHeight + itemSpacing)),
      items.length
    );

    if (startIndex !== start) startIndex = start;
    if (endIndex !== end) endIndex = end;

    let offset = itemHeight * startIndex;

    if (itemSpacing && startIndex) {
      const gap = itemSpacing * startIndex - itemSpacing;

      offset += gap;
    }

    if (contentOffset !== offset) contentOffset = offset;
  };

  $: listenerSubscription = {
    subscribe: () => {
      const elementToListen = isWindow ? window : scrollElement;

      if (!elementToListen)
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        return () => {};

      elementToListen.addEventListener('scroll', onScroll);

      return () => {
        elementToListen.removeEventListener('scroll', onScroll);
      };
    },
  };

  $: {
    if (items.length) {
      onScroll();
    }
  }

  $: {
    if (itemSpacing) {
      onScroll();
    }
  }

  $: toRender = items.slice(startIndex, endIndex);

  $listenerSubscription;
</script>

<div
  bind:this={container}
  class="virtualized-list-container"
  style="height: {itemHeight * items.length}px;"
>
  <div
    class="virtualized-list-content"
    style="margin-top: {contentOffset}px; gap: {itemSpacing}px;"
  >
    {#each toRender as item}
      <div style="height: {itemHeight}px;">
        <slot {item} />
      </div>
    {/each}
  </div>
</div>

<style>
  .virtualized-list-container {
    position: relative;
  }

  .virtualized-list-content {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
