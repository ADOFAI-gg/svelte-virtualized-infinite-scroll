<script lang="ts">
  type T = $$Generic;

  export let scroller: HTMLDivElement;

  export let items: T[];

  $: console.log(items);
</script>

<div>asdf</div>
