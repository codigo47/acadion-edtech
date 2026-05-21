/**
 * Email validation library
 * Comprehensive email validation following RFC 5322 standards
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates email format using a comprehensive regex pattern
 * @param email - The email address to validate
 * @returns ValidationResult object with validation status and error message
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  // Trim whitespace
  const trimmedEmail = email.trim();

  // Check minimum length
  if (trimmedEmail.length < 3) {
    return {
      isValid: false,
      error: 'Email is too short'
    };
  }

  // Check maximum length (RFC 5321)
  if (trimmedEmail.length > 254) {
    return {
      isValid: false,
      error: 'Email is too long'
    };
  }

  // Comprehensive email regex pattern
  // This pattern validates:
  // - Local part (before @): letters, numbers, dots, hyphens, underscores
  // - Domain part (after @): valid domain with TLD
  const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(trimmedEmail)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  // Additional validations
  const [localPart, domain] = trimmedEmail.split('@');

  // Check local part length (RFC 5321)
  if (localPart.length > 64) {
    return {
      isValid: false,
      error: 'Email username is too long'
    };
  }

  // Check for consecutive dots
  if (trimmedEmail.includes('..')) {
    return {
      isValid: false,
      error: 'Email cannot contain consecutive dots'
    };
  }

  // Check if starts or ends with dot
  if (localPart.startsWith('.') || localPart.endsWith('.')) {
    return {
      isValid: false,
      error: 'Email username cannot start or end with a dot'
    };
  }

  // Check domain has at least one dot
  if (!domain.includes('.')) {
    return {
      isValid: false,
      error: 'Email domain must include a valid extension'
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates that a string is not empty
 * @param value - The string to validate
 * @param fieldName - The name of the field for error messages
 * @returns ValidationResult object
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || value.trim() === '') {
    return {
      isValid: false,
      error: `${fieldName} is required`
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates that at least one option is selected from an array
 * @param values - Array of selected values
 * @param fieldName - The name of the field for error messages
 * @returns ValidationResult object
 */
export function validateArrayNotEmpty(values: string[], fieldName: string): ValidationResult {
  if (!values || values.length === 0) {
    return {
      isValid: false,
      error: `Please select at least one ${fieldName}`
    };
  }

  return {
    isValid: true
  };
}

/**
 * Validates a name field (first name or last name)
 * @param name - The name to validate
 * @param fieldName - The name of the field for error messages
 * @returns ValidationResult object
 */
export function validateName(name: string, fieldName: string): ValidationResult {
  const requiredValidation = validateRequired(name, fieldName);
  if (!requiredValidation.isValid) {
    return requiredValidation;
  }

  const trimmedName = name.trim();

  // Check minimum length
  if (trimmedName.length < 2) {
    return {
      isValid: false,
      error: `${fieldName} must be at least 2 characters`
    };
  }

  // Check maximum length
  if (trimmedName.length > 50) {
    return {
      isValid: false,
      error: `${fieldName} is too long`
    };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s'-]+$/;
  if (!nameRegex.test(trimmedName)) {
    return {
      isValid: false,
      error: `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`
    };
  }

  return {
    isValid: true
  };
}
