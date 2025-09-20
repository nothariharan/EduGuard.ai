# EduGuard.ai Deployment Guide

This guide will help you deploy the EduGuard.ai application to Vercel.

## Prerequisites

1. A Vercel account
2. A MySQL database (you can use PlanetScale, Railway, or any MySQL hosting service)
3. Git repository with your code

## Step 1: Database Setup

1. Set up a MySQL database on your preferred hosting service
2. Run the SQL script from `backend/setup_database.sql` to create the required tables
3. Note down your database connection details

## Step 2: Environment Variables

### Frontend Environment Variables (in Vercel Dashboard)
- `NEXT_PUBLIC_API_URL`: Your backend API URL (will be provided after backend deployment)

### Backend Environment Variables (in Vercel Dashboard)
- `DB_HOST`: Your database host
- `DB_USER`: Your database username
- `DB_PASSWORD`: Your database password
- `DB_NAME`: Your database name

## Step 3: Deploy Backend First

1. Go to your Vercel dashboard
2. Create a new project
3. Connect your Git repository
4. Set the **Root Directory** to `backend`
5. Add the backend environment variables
6. Deploy the backend
7. Note the deployment URL (e.g., `https://your-backend.vercel.app`)

## Step 4: Deploy Frontend

1. Create another Vercel project for the frontend
2. Connect the same Git repository
3. Set the **Root Directory** to the project root (not `backend`)
4. Add the frontend environment variable:
   - `NEXT_PUBLIC_API_URL`: Set this to your backend URL from Step 3
5. Deploy the frontend

## Step 5: Update Backend CORS (if needed)

If you encounter CORS issues, you may need to update the CORS configuration in `backend/pysql.py` to include your frontend domain.

## Step 6: Test the Application

1. Visit your frontend URL
2. Test the notifications functionality
3. Verify that data is being saved to your database

## Troubleshooting

### Common Issues:

1. **Database Connection Errors**: Verify your database credentials and ensure the database is accessible from Vercel
2. **CORS Errors**: Check that your backend CORS configuration allows your frontend domain
3. **API URL Issues**: Ensure `NEXT_PUBLIC_API_URL` is correctly set in your frontend environment variables

### Database Options:

- **PlanetScale**: Free tier available, easy setup
- **Railway**: Good for development and small projects
- **AWS RDS**: More robust for production
- **Google Cloud SQL**: Enterprise-grade solution

## File Structure

```
eduguardai/
├── app/                    # Next.js frontend
├── backend/               # Flask backend
│   ├── pysql.py          # Main backend file
│   ├── requirements.txt  # Python dependencies
│   └── setup_database.sql # Database setup script
├── components/           # React components
├── vercel.json          # Vercel configuration
└── env.example          # Environment variables template
```

## Support

If you encounter any issues during deployment, check the Vercel deployment logs and ensure all environment variables are correctly set.
