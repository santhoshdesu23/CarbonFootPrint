export type User = {
  id: string;
  name: string;
  email: string;
  householdSize: number;
  city: string;
  preferredUnit: 'metric' | 'imperial';
};
