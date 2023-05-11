import VirtualizedInfiniteScrollList from '../components/VirtualizedInfiniteScrollList.svelte';

import DefaultVirtualScrollList from './DefaultVirtualScrollList.svelte';
import WindowVirtualScrollList from './WindowVirtualScrollList.svelte';

export default {
  title: 'Virtualized Infinite Scroll List',
  component: VirtualizedInfiniteScrollList,
};

export const Default = () => ({
  Component: DefaultVirtualScrollList,
});

export const WindowScroller = () => ({
  Component: WindowVirtualScrollList,
});
