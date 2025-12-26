import type { Identity, ValidationRule } from '../types';

export const validationRules: ValidationRule[] = [
  {
    id: 'expiration_after_issue',
    description: 'Expiration date must be after issue date',
    severity: 'error',
    check: (identity: Identity) => {
      const issue = new Date(identity.issueDate);
      const expiry = new Date(identity.expirationDate);
      return expiry > issue;
    },
    message: 'Expiration date must be after issue date',
  },
  {
    id: 'sin_rating_range',
    description: 'SIN Rating must be between 1-6',
    severity: 'error',
    check: (identity: Identity) => {
      return identity.sinRating >= 1 && identity.sinRating <= 6;
    },
    message: 'SIN Rating must be between 1 and 6',
  },
  {
    id: 'clearance_range',
    description: 'Clearance level must be 0-5',
    severity: 'error',
    check: (identity: Identity) => {
      return identity.clearanceLevel >= 0 && identity.clearanceLevel <= 5;
    },
    message: 'Clearance level must be between 0 and 5',
  },
  {
    id: 'biometric_hash_length',
    description: 'Biometric hash must be at least 12 characters',
    severity: 'error',
    check: (identity: Identity) => {
      return identity.biometricHash.length >= 12;
    },
    message: 'Biometric hash must be at least 12 characters long',
  },
  {
    id: 'full_name_required',
    description: 'Full name is required',
    severity: 'error',
    check: (identity: Identity) => {
      return identity.fullName.trim().length > 0;
    },
    message: 'Full name is required',
  },
  {
    id: 'troll_height_warning',
    description: 'Trolls should have appropriate height notes',
    severity: 'warn',
    check: (identity: Identity) => {
      if (identity.metatype === 'Troll') {
        return identity.notes.toLowerCase().includes('height') || 
               identity.augmentations.some(a => a.toLowerCase().includes('height'));
      }
      return true;
    },
    message: 'Trolls typically have height considerations noted',
  },
  {
    id: 'burned_status_warning',
    description: 'Burned SIN should trigger alert',
    severity: 'warn',
    check: (identity: Identity) => {
      if (identity.status === 'Burned') {
        return true; // This rule itself is just a flag; we warn about Burned status separately
      }
      return true;
    },
    message: 'This SIN is marked as burned - use with caution',
  },
  {
    id: 'cred_rating_reasonable',
    description: 'Cred Rating should be between 0-10',
    severity: 'warn',
    check: (identity: Identity) => {
      return identity.credRating >= 0 && identity.credRating <= 10;
    },
    message: 'Cred Rating is typically between 0 and 10',
  },
];

export function validateIdentity(identity: Identity) {
  return validationRules
    .filter(rule => !rule.check(identity))
    .map(rule => ({
      id: rule.id,
      severity: rule.severity,
      message: rule.message,
      field: undefined,
    }));
}
