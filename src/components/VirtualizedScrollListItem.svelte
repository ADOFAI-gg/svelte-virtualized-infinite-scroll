<script lang="ts">
  import type { VirtualItem } from '@tanstack/virtual-core';

  type T = $$Generic;

  export let item: VirtualItem<T>;

  let el: HTMLDivElement;

  // @ts-expect-error mistake?
  $: item.measureElement(el);
</script>

<div
  bind:this={el}
  style="position: absolute; left: 0; top: 0; width: 100%; transform: translateY({item.start}px);"
>
  <slot />
</div>
