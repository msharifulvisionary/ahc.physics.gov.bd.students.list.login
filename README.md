# Student Profile Management System

A complete student profile management system with Firebase database and ImageKit image storage.

## Features

- 🔐 Student login system (Roll + 7133 password format)
- 👤 Profile management with image upload
- 📝 Editable student information (name, parents, location, education, contact)
- 🔒 Password change functionality
- 📱 Responsive design
- 🔍 Search and filter students
- 📊 Student statistics

## Setup Instructions

### 1. Frontend Deployment (GitHub Pages)

1. Create a new repository on GitHub
2. Upload the `index.html` file to your repository
3. Go to repository Settings → Pages
4. Select "Deploy from a branch" and choose "main"
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Backend Server (Required for ImageKit)

The ImageKit integration requires a backend server for authentication. You have several options:

#### Option A: Deploy to Vercel (Recommended)

1. Create a new folder for your backend
2. Add the `auth-server.js` and `package.json` files
3. Install Vercel CLI: `npm i -g vercel`
4. Run `vercel` in your backend folder
5. Follow the prompts to deploy
6. Update the `authenticationEndpoint` in `index.html` with your Vercel URL

#### Option B: Deploy to Netlify Functions

1. Create a `netlify/functions/auth.js` file:
\`\`\`javascript
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: 'public_hVAN26ygTqOwXiKvqHBCVcY6jXA=',
    privateKey: 'private_ocuHLfwK9n883Jf7W+xt4TAQGUY=',
    urlEndpoint: 'https://ik.imagekit.io/msharifulvisionary'
});

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }
    
    try {
        const authenticationParameters = imagekit.getAuthenticationParameters();
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authenticationParameters)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Authentication failed' })
        };
    }
};
\`\`\`

2. Update the `authenticationEndpoint` in `index.html` to `https://your-site.netlify.app/.netlify/functions/auth`

### 3. Configuration Updates

After deploying your backend, update these lines in `index.html`:

\`\`\`javascript
// Replace this line:
authenticationEndpoint: "http://www.yourserver.com/auth",

// With your actual backend URL:
authenticationEndpoint: "https://your-backend-url.vercel.app/auth",
\`\`\`

### 4. Firebase Setup

Your Firebase configuration is already included in the code. The system will automatically:
- Create student documents in Firestore when they first log in
- Store profile information and images
- Handle password changes

## Usage

### For Students:
1. Click the "লগইন" button
2. Enter your roll number and password (roll + 7133)
3. Edit your profile information and upload a photo
4. Change your password if needed

### For Visitors:
1. Browse the student list
2. Click on any student card to view their public profile
3. Use search and filters to find specific students

## File Structure

\`\`\`
├── index.html          # Main application file
├── auth-server.js      # Backend authentication server
├── package.json        # Backend dependencies
└── README.md          # This file
\`\`\`

## Security Notes

- Student passwords are stored securely in Firebase
- ImageKit handles secure image uploads
- Profile images are publicly viewable but editing requires authentication
- Default password format: Roll Number + 7133 (e.g., Roll 83 = Password 837133)

## Troubleshooting

### Image Upload Issues
- Ensure your backend server is running and accessible
- Check that the `authenticationEndpoint` URL is correct
- Verify ImageKit credentials are valid

### Firebase Connection Issues
- Check browser console for error messages
- Ensure Firebase configuration is correct
- Verify Firestore rules allow read/write access

### GitHub Pages Issues
- Ensure `index.html` is in the root directory
- Check that GitHub Pages is enabled in repository settings
- Wait a few minutes for changes to propagate

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all URLs and configurations are correct
3. Ensure both frontend and backend are properly deployed
