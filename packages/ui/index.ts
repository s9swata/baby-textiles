// Shared UI utilities and components
// Currently re-exports from web app - expand with truly shared code later

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ')
}
