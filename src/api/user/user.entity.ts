export interface User {
  // Identificatori Unici
  id?: string;

  // Informazioni Personali di Base
  firstName: string;
  lastName: string;
  picture: string;
  birthDate?: Date | string | null;
  gender?: string | null;

  // Informazioni sull'Indirizzo (Opzionale)
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

  // Preferenze
  preferredLanguage?: string | null;
  timeZone?: string | null;

  // Stato Utente
  isActive: boolean;
  status?: string | null;
  role: string;

  // Timestamp di Attività
  createdAt: Date | string;
  updatedAt?: Date | string | null;
  lastLogin?: Date | string | null;

  // Token
  resetPasswordToken?: string | null;
  resetPasswordExpires?: Date | string | null;
}
