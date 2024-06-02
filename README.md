# Config Management Backend - Codeway Case

This is the backend service for the Config Management application. It provides a REST API for managing configuration parameters, including country-specific configurations.

## System Functionality

- **Endpoints**:
  - `GET /api/configs`: Retrieve all configurations. Optionally, include a `country` query parameter to fetch country-specific configurations.
  - `POST /api/configs`: Add a new configuration.
  - `PUT /api/configs/:id`: Update an existing configuration. Supports country-specific updates.
  - `DELETE /api/configs/:id`: Delete a configuration. Supports deletion of country-specific configurations.

- **Country-Specific Configurations**:
  - Country-specific configurations can be managed by including a `country` field in the request body. For example, to update or delete a country-specific configuration, include the `country` parameter.

- **Authentication**:
  - Firebase Authentication is used to secure endpoints.
  - Endpoints require a valid Firebase ID token in the `Authorization` header.

- **Database**:
  - Firestore is used to store configuration data.

## Deployment Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yekdagets/config-management-backend.git
   cd config-management-backend
   
**2. Install dependencies:**
npm install

**3.Set up environment variables:**
Create a .env file in the root directory with the following content:

PORT=3000
FIREBASE_API_KEY=your-firebase-api-key
FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
FIREBASE_APP_ID=your-firebase-app-id
FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
FIREBASE_ADMIN_SDK_PRIVATE_KEY=your-private-key
FIREBASE_ADMIN_SDK_CLIENT_EMAIL=your-client-email
FIREBASE_ADMIN_SDK_PROJECT_ID=your-project-id

**4.Run the application locally:**
npm start

**5.Deploy to Heroku:**
heroku create your-backend-app-name
heroku config:set FIREBASE_API_KEY=your-firebase-api-key
heroku config:set FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
heroku config:set FIREBASE_PROJECT_ID=your-firebase-project-id
heroku config:set FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
heroku config:set FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
heroku config:set FIREBASE_APP_ID=your-firebase-app-id
heroku config:set FIREBASE_MEASUREMENT_ID=your-firebase-measurement-id
heroku config:set FIREBASE_ADMIN_SDK_PRIVATE_KEY="$(<path/to/your/serviceAccountKey.json)"
heroku config:set FIREBASE_ADMIN_SDK_CLIENT_EMAIL=your-client-email
heroku config:set FIREBASE_ADMIN_SDK_PROJECT_ID=your-project-id
git push heroku main
