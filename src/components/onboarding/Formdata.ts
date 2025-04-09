export interface FormInfo {
  // Stage 1
  country: string;
  state: string;
  city: string;
  address: string;

  // Stage 2
  isStudent: boolean;
  isEmployed: boolean;
  occupation: string;
  incomeRange: string;
  interests: string[];

  // Stage 3
  preferredRentRange: string;
  preferredPropertyTypes: string[];
  moveInDate: Date | null;
  stayDuration: string;
  hasPets: boolean;
  hasChildren: boolean;
  smoking: boolean;
}
