export type Metatype = 'Human' | 'Elf' | 'Ork' | 'Troll' | 'Dwarf' | 'Other';
export type Status = 'Valid' | 'Suspended' | 'Burned';
export type Severity = 'error' | 'warn';
export type Theme = 'Neon Rain' | 'Red Samurai' | 'Arcology' | 'Street Doc' | 'Black ICE';
export type CornerStyle = 'sharp' | 'rounded' | 'chamfer';

export interface Identity {
  id: string;
  fullName: string;
  alias: string;
  metatype: Metatype;
  nationality: string;
  corporateAffiliation: string;
  sinRating: number;
  credRating: number;
  dateOfBirth: string;
  issueDate: string;
  expirationDate: string;
  address: string;
  licenseTags: string[];
  biometricHash: string;
  clearanceLevel: number;
  uniqueId: string;
  notes: string;
  languages: string[];
  augmentations: string[];
  status: Status;
  portraitImage?: string;
  emblem?: string;
  includeQRCode: boolean;
  includeBarcode: boolean;
  theme: Theme;
  accentColor: string;
  cornerStyle: CornerStyle;
  showHologram: boolean;
  glitchIntensity: number;
}

export interface ValidationIssue {
  id: string;
  severity: Severity;
  message: string;
  field?: keyof Identity;
}

export interface ValidationRule {
  id: string;
  description: string;
  severity: Severity;
  check: (identity: Identity) => boolean;
  message: string;
}

export interface Template {
  name: string;
  description: string;
  getIdentity: () => Identity;
  theme: Theme;
}
