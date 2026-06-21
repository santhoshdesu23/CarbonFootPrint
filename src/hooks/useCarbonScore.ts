import { useCarbonStore } from '../store/carbonStore';

export function useCarbonScore() {
  return useCarbonStore((state) => state.profile.carbonScore);
}
