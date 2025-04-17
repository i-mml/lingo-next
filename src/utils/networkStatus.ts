// Utility to detect network status and handle offline synchronization

// Network status detection and event management
export const NetworkStatus = {
  isOnline: typeof navigator !== "undefined" ? navigator.onLine : true,

  // Event listeners
  onlineListeners: [] as Array<() => void>,
  offlineListeners: [] as Array<() => void>,

  // Initialize network detection
  init() {
    if (typeof window === "undefined") return;

    window.addEventListener("online", this.handleOnline.bind(this));
    window.addEventListener("offline", this.handleOffline.bind(this));

    // Initial status check
    this.isOnline = navigator.onLine;
  },

  // Handle online event
  handleOnline() {
    this.isOnline = true;
    this.onlineListeners.forEach((listener) => listener());

    // Try to sync offline data when we're back online
    this.syncOfflineData();
  },

  // Handle offline event
  handleOffline() {
    this.isOnline = false;
    this.offlineListeners.forEach((listener) => listener());
  },

  // Subscribe to online event
  subscribeToOnline(callback: () => void) {
    this.onlineListeners.push(callback);
    return () => {
      this.onlineListeners = this.onlineListeners.filter(
        (listener) => listener !== callback
      );
    };
  },

  // Subscribe to offline event
  subscribeToOffline(callback: () => void) {
    this.offlineListeners.push(callback);
    return () => {
      this.offlineListeners = this.offlineListeners.filter(
        (listener) => listener !== callback
      );
    };
  },

  // Clean up event listeners
  cleanup() {
    if (typeof window === "undefined") return;

    window.removeEventListener("online", this.handleOnline.bind(this));
    window.removeEventListener("offline", this.handleOffline.bind(this));
  },

  // Sync offline data when connection is restored
  async syncOfflineData() {
    try {
      const offlineActions = this.getPendingOfflineActions();
      if (!offlineActions || offlineActions.length === 0) return;

      // Process each offline action sequentially
      for (const action of offlineActions) {
        await this.processOfflineAction(action);
      }

      // Clear processed actions
      this.clearProcessedOfflineActions();
    } catch (error) {
      console.error("Error syncing offline data:", error);
    }
  },

  // Get pending offline actions from local storage
  getPendingOfflineActions() {
    try {
      const offlineActionsJson = localStorage.getItem("offlineActions");
      return offlineActionsJson ? JSON.parse(offlineActionsJson) : [];
    } catch (error) {
      console.error("Error retrieving offline actions:", error);
      return [];
    }
  },

  // Process a single offline action
  async processOfflineAction(action: any) {
    try {
      // Implementation would depend on the type of actions your app needs to handle
      switch (action.type) {
        case "UPDATE_FLASHCARD_STATUS":
          // Example: Call an API to update flashcard status
          // await api.updateFlashcardStatus(action.data);
          break;

        case "SAVE_USER_PROGRESS":
          // Example: Call an API to save user progress
          // await api.saveUserProgress(action.data);
          break;

        default:
          console.warn("Unknown offline action type:", action.type);
      }
    } catch (error) {
      console.error("Error processing offline action:", error);
      // Re-queue failed actions for next sync attempt
      this.reQueueFailedAction(action);
    }
  },

  // Re-queue a failed action
  reQueueFailedAction(action: any) {
    const failedActions = this.getFailedActions();
    failedActions.push({
      ...action,
      retryCount: (action.retryCount || 0) + 1,
      lastAttempt: new Date().toISOString(),
    });

    localStorage.setItem("failedOfflineActions", JSON.stringify(failedActions));
  },

  // Get failed actions
  getFailedActions() {
    try {
      const failedActionsJson = localStorage.getItem("failedOfflineActions");
      return failedActionsJson ? JSON.parse(failedActionsJson) : [];
    } catch (error) {
      console.error("Error retrieving failed actions:", error);
      return [];
    }
  },

  // Clear processed offline actions
  clearProcessedOfflineActions() {
    localStorage.removeItem("offlineActions");
  },

  // Add an action to the offline queue
  queueOfflineAction(actionType: string, actionData: any) {
    if (!actionType) return;

    const offlineActions = this.getPendingOfflineActions();
    offlineActions.push({
      type: actionType,
      data: actionData,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem("offlineActions", JSON.stringify(offlineActions));
  },
};

// Initialize network detection on module load in client side
if (typeof window !== "undefined") {
  NetworkStatus.init();
}

// Hook to use network status in React components
export function useNetworkStatus() {
  if (typeof window === "undefined") {
    return { isOnline: true };
  }

  return {
    isOnline: NetworkStatus.isOnline,
    subscribeToOnline: NetworkStatus.subscribeToOnline.bind(NetworkStatus),
    subscribeToOffline: NetworkStatus.subscribeToOffline.bind(NetworkStatus),
    queueOfflineAction: NetworkStatus.queueOfflineAction.bind(NetworkStatus),
  };
}
