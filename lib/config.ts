/**
 * Application configuration constants
 * Centralizes all magic numbers and configuration values
 */

/**
 * File upload constraints
 */
export const FILE_UPLOAD = {
  /** Maximum file size in bytes (5MB) */
  MAX_SIZE: 5 * 1024 * 1024,
  /** Allowed MIME types for image uploads */
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png'],
  /** Maximum title length for projects */
  MAX_TITLE_LENGTH: 120,
} as const

/**
 * Pagination settings
 */
export const PAGINATION = {
  /** Default page size for public project listing */
  DEFAULT_PAGE_SIZE: 12,
  /** Maximum allowed page size */
  MAX_PAGE_SIZE: 100,
  /** Page size for admin dashboard */
  ADMIN_PAGE_SIZE: 24,
} as const

/**
 * Database connection settings
 */
export const DATABASE = {
  /** MongoDB connection pool size */
  MAX_POOL_SIZE: 10,
  /** Server selection timeout in milliseconds */
  SERVER_SELECTION_TIMEOUT: 5000,
  /** Socket timeout in milliseconds */
  SOCKET_TIMEOUT: 45000,
  /** GridFS bucket name for project thumbnails */
  GRIDFS_BUCKET_NAME: 'project_thumbnails',
} as const

/**
 * Session settings
 */
export const SESSION = {
  /** Session max age in seconds (7 days) */
  MAX_AGE: 7 * 24 * 60 * 60,
} as const
