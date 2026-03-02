import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', {
  state: () => ({
    isLoading: true,
    loadingProgress: 0,
  }),

  actions: {
    startLoading() {
      this.isLoading = true
      this.loadingProgress = 0
    },

    setProgress(progress: number) {
      this.loadingProgress = Math.min(100, Math.max(0, progress))
    },

    completeLoading() {
      this.isLoading = false
      this.loadingProgress = 100
    },
  },
})
