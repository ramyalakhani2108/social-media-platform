export interface User {
  id: string;
  username: string;
  name: string;
  avatar_url: string;
  isVerified: boolean;
}

export interface SuggestedUser extends User {
  // Additional suggested user specific fields can be added here
}
