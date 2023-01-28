import VirtualizedInfiniteScrollList from '../components/VirtualizedInfiniteScrollList.svelte';

import DefaultVirtualScrollList from './DefaultVirtualScrollList.svelte';
import DefaultVirtualScrollListSpaced from './DefaultVirtualScrollListSpaced.svelte';

export default {
  title: 'Virtualized Infinite Scroll List',
  component: VirtualizedInfiniteScrollList,
};

export const Default = () => ({
  Component: DefaultVirtualScrollList,
});

export const WithSpacing = () => ({
  Component: DefaultVirtualScrollListSpaced,
});
