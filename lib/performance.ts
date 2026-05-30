// Performance Optimization Settings

// Image optimization settings
export const imageOptimizationConfig = {
  // Compress images in production
  quality: 85,
  
  // Use modern formats
  formats: ['image/webp', 'image/avif'],
  
  // Responsive sizes
  sizes: {
    small: 640,
    medium: 1024,
    large: 1920,
  }
}

// Cache revalidation strategies
export const cacheConfig = {
  // Static pages (blog, about, contact, privacy, terms)
  staticPages: 3600, // 1 hour
  
  // Dynamic content (tools listing)
  dynamicContent: 300, // 5 minutes
  
  // Blog posts
  blogPosts: 7200, // 2 hours
  
  // User data
  userData: 60, // 1 minute
}

// Lazy loading configuration
export const lazyLoadConfig = {
  // Enable lazy loading for images
  images: true,
  
  // Blur placeholder for images
  blurDataURL: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  
  // Lazy load threshold
  rootMargin: '50px',
}

// Bundle size optimization
export const bundleOptimization = {
  // Tree-shake unused code
  treeshaking: true,
  
  // Minify CSS/JS
  minify: true,
  
  // Compress responses
  compression: 'gzip',
}
