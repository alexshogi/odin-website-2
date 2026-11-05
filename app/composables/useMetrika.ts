export function useMetrika() {
  const { public: { ymId } } = useRuntimeConfig();
  const id = Number(ymId);

  function reachGoal(goal: string, params?: Record<string, unknown>) {
    if (import.meta.client && id > 0) {
      window.ym?.(id, 'reachGoal', goal, params);
    }
  }

  return { reachGoal };
}
