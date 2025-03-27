import { create } from 'zustand';

type LayoutType = 'grid' | 'list';
type StoriesLayoutType = 'vertical' | 'horizontal';

interface LayoutState {
  postLayout: LayoutType;
  storiesLayout: StoriesLayoutType;
  setPostLayout: (layout: LayoutType) => void;
  setStoriesLayout: (layout: StoriesLayoutType) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  postLayout: 'grid',
  storiesLayout: 'horizontal',
  setPostLayout: (layout) => set({ postLayout: layout }),
  setStoriesLayout: (layout) => set({ storiesLayout: layout }),
}));
