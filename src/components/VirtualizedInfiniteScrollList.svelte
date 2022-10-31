<script lang="ts">
  // eslint-disable-next-line no-undef
  type T = $$Generic;

  export let itemHeight: number;

  // export let itemSpacing = 0;

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

    const from = Math.max(Math.floor(scrollElement.scrollTop / itemHeight), 0);

    const to = Math.max(
      Math.ceil(
        (scrollElement.scrollTop + scrollElement.offsetHeight) / itemHeight
      ),
      items.length
    );

    if (startIndex !== from) startIndex = from;
    if (endIndex !== to) endIndex = to;

    const offset = itemHeight * startIndex;

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

  $: toRender = items.slice(startIndex, endIndex);

  $listenerSubscription;
</script>

<div
  bind:this={container}
  class="virtualized-list-container"
  style="height: {itemHeight * items.length}px;"
>
  <div class="virtualized-list-content" style="margin-top: {contentOffset}px;">
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
  }
</style>
