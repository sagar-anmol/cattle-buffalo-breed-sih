# **App Name**: CattleSnap

## Core Features:

- Admin Authentication: Authenticate the admin user with credentials 'admin' and passcode 'thepassword'.
- Image Capture/Upload: Allow the user to upload or capture an image of cattle or buffalo.
- API Request: Send the captured or uploaded image to a mock API endpoint via a client-side POST request. For now it returns the mock breed but is tool to identify the correct breed in a future implementation.
- Breed Identification: Display the breed of the cattle/buffalo based on the API's response.
- Confirmation Step: Prompt the user for confirmation after breed identification.
- Data Sync Simulation: Simulate data syncing with a BPA database after confirmation.
- Navigation Reset: Return the user to the initial authentication page after sync simulation.

## Style Guidelines:

- Primary color: Earthy Green (#6B8E23) to reflect the app's focus on cattle.
- Background color: Light Beige (#F5F5DC) to provide a soft, natural backdrop.
- Accent color: Warm Brown (#A0522D) to highlight key actions and information.
- Font pairing: 'PT Sans' (sans-serif) for both headlines and body text to maintain simplicity and readability.
- Simple, full-screen layout with clear sections for image input, results, and confirmation.
- Use easily understandable icons related to cattle/buffalo identification process.
- Minimal animations such as a loading spinner during API requests.