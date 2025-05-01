export interface User {
  // Unique ID
  id?: string;

  // Base Info
  firstName: string;
  lastName: string;
  picture?: string;
  birthDate?: Date | string | null;
  gender?: string | null;

  // Preference
  preferredLanguage?: string | null;
  timeZone?: string | null;

  // Authentication Info
  isActive: boolean;
  status?: string | null;
  role: string;

  // Security Info
  createdAt: Date | string;
  updatedAt?: Date | string | null;
  lastLogin?: Date | string | null;
  lastLoginIp?: string | null;
  allowedIps?: string[] | null;

  // Token
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | string | null;

  // Address Info
  addressInfo?: {
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
    location: {
      latitude: number | null;
      longitude: number | null;
    };
  };
}
