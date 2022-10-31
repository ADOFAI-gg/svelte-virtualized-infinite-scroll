<script lang="ts">
  export let scroller: HTMLElement | undefined = undefined;

  let isWindow = false;

  let container: HTMLDivElement;

  export { isWindow as window };

  $: scrollElement = isWindow ? document.documentElement : scroller;

  $: listenerSubscription = {
    subscribe: () => {
      const elementToListen = isWindow ? window : scrollElement;

      // eslint-disable-next-line @typescript-eslint/no-empty-function
      if (!elementToListen) return () => {};

      const listener = () => {
        console.log(
          `${scrollElement.scrollTop} - ${
            scrollElement.scrollTop + scrollElement.offsetHeight
          }`
        );
      };

      elementToListen.addEventListener('scroll', listener);

      return () => {
        elementToListen.removeEventListener('scroll', listener);
      };
    },
  };

  $listenerSubscription;
</script>

<div>
  <!-- upper padding -->
  <div />
  <div bind:this={container}>content</div>
  <!-- lower padding -->
  <div />
</div>
