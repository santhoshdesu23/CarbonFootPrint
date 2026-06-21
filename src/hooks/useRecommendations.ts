import { useCarbonStore } from '../store/carbonStore';
import type { Recommendation } from '../types/carbon';

export function useRecommendations(): Recommendation[] {
  return useCarbonStore((state) => state.recommendations);
}
