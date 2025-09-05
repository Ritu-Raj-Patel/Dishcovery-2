# Automated Deployment with GitHub Actions

This project is configured with GitHub Actions to automatically deploy to Vercel whenever changes are pushed to the `main` branch.

## Setup Instructions

To enable automated deployment, you need to set up the following secrets in your GitHub repository:

1. Go to your GitHub repository
2. Click on "Settings" tab
3. Click on "Secrets and variables" → "Actions" in the sidebar
4. Click "New repository secret" and add the following secrets:

### Required Secrets

| Secret Name | Description | How to Obtain |
|-------------|-------------|---------------|
| `VERCEL_TOKEN` | Vercel authentication token | Create in Vercel dashboard under Settings → Tokens |
| `VERCEL_ORG_ID` | Vercel organization ID | Found in Vercel dashboard URL or API |
| `VERCEL_PROJECT_ID` | Vercel frontend project ID | Create a new project in Vercel and get the ID from project settings |
| `VERCEL_BACKEND_PROJECT_ID` | Vercel backend project ID | Create a new project in Vercel for backend and get the ID |

## How to Get Vercel Information

1. **Create a Vercel account** at https://vercel.com if you don't have one

2. **Get your Vercel Token**:
   - Go to https://vercel.com/account/tokens
   - Click "Create Token"
   - Give it a name and select scope
   - Copy the token value

3. **Get your Organization ID**:
   - Go to https://vercel.com/dashboard
   - The URL will contain your org ID: `https://vercel.com/dashboard/ORG_ID`
   - Or use the Vercel CLI: `vercel switch` to see your teams

4. **Create Vercel Projects**:
   - Go to https://vercel.com/new
   - Create two projects:
     - One for the frontend (select the `recipe_app/frontend` directory)
     - One for the backend (select the root directory)
   - After creating, go to each project's settings to find the Project ID

## Manual Deployment

You can also manually trigger deployment from the GitHub Actions tab in your repository.

## Local Deployment

If you prefer to deploy manually from your local machine:

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy frontend:
   ```bash
   cd recipe_app/frontend
   vercel --prod
   ```

4. Deploy backend:
   ```bash
   vercel --prod
   ```

The automated deployment will handle all of this for you once the secrets are configured.