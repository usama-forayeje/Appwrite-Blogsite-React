# 🔧 Appwrite Console Setup Guide

This guide will walk you through setting up your Appwrite backend for the MyBlog application.

## 📋 Prerequisites

- Appwrite Cloud account or self-hosted Appwrite instance
- Basic understanding of databases and collections

## 🚀 Step-by-Step Setup

### 1. Create New Project

1. Login to [Appwrite Console](https://cloud.appwrite.io)
2. Click "Create Project"
3. Enter project name: `MyBlog`
4. Copy the **Project ID** for your `.env` file

### 2. Database Configuration

#### Create Database
1. Navigate to **Databases** in the sidebar
2. Click **"Create Database"**
3. Database Name: `myblog-database`
4. Database ID: `myblog-db` (or auto-generated)
5. Copy the **Database ID** for your `.env` file

### 3. Collections Setup

#### Collection 1: Posts
1. Click **"Create Collection"**
2. Collection Name: `posts`
3. Collection ID: `posts` (or auto-generated)

**Attributes:**
\`\`\`
title (String, 255 chars, Required)
content (String, 65535 chars, Required) 
slug (String, 255 chars, Required)
featuredImage (String, 255 chars, Optional)
userId (String, 255 chars, Required)
authorName (String, 255 chars, Required)
likes (String Array, Optional)
tags (String Array, Optional)
status (String, 50 chars, Required, Default: "active")
commentCount (Integer, Optional, Default: 0)
\`\`\`

**Indexes:**
\`\`\`
title (Fulltext, Attribute: title)
content (Fulltext, Attribute: content)
userId (Key, Attribute: userId)
status (Key, Attribute: status)
createdAt (Key, Attribute: $createdAt, Order: DESC)
tags (Fulltext, Attribute: tags)
\`\`\`

**Permissions:**
\`\`\`
Read: any
Create: users
Update: users  
Delete: users
\`\`\`

#### Collection 2: Comments
1. Click **"Create Collection"**
2. Collection Name: `comments`
3. Collection ID: `comments`

**Attributes:**
\`\`\`
postId (String, 255 chars, Required)
content (String, 1000 chars, Required)
authorId (String, 255 chars, Required)
authorName (String, 255 chars, Required)
\`\`\`

**Indexes:**
\`\`\`
postId (Key, Attribute: postId)
authorId (Key, Attribute: authorId)
createdAt (Key, Attribute: $createdAt, Order: DESC)
\`\`\`

**Permissions:**
\`\`\`
Read: any
Create: users
Update: users
Delete: users
\`\`\`

#### Collection 3: Users (Optional - for extended profiles)
1. Click **"Create Collection"**
2. Collection Name: `users`
3. Collection ID: `users`

**Attributes:**
\`\`\`
name (String, 255 chars, Required)
email (String, 255 chars, Required)
bio (String, 500 chars, Optional)
avatar (String, 255 chars, Optional)
followers (String Array, Optional)
following (String Array, Optional)
postsCount (Integer, Optional, Default: 0)
likesCount (Integer, Optional, Default: 0)
\`\`\`

**Indexes:**
\`\`\`
email (Unique, Attribute: email)
name (Fulltext, Attribute: name)
\`\`\`

**Permissions:**
\`\`\`
Read: any
Create: users
Update: users
Delete: users
\`\`\`

### 4. Storage Setup

#### Create Storage Bucket
1. Navigate to **Storage** in the sidebar
2. Click **"Create Bucket"**
3. Bucket Name: `myblog-storage`
4. Bucket ID: `myblog-bucket`

**Settings:**
\`\`\`
File Size Limit: 5MB (5242880 bytes)
Allowed File Extensions: jpg,jpeg,png,gif,webp,svg
Encryption: Enabled
Antivirus: Enabled (if available)
\`\`\`

**Permissions:**
\`\`\`
Read: any
Create: users
Update: users
Delete: users
\`\`\`

### 5. Authentication Configuration

#### Email/Password Authentication
1. Navigate to **Auth** → **Settings**
2. Enable **Email/Password**
3. Configure email templates (optional)

#### Google OAuth Setup
1. In **Auth** → **Settings**
2. Enable **Google**
3. Add your Google OAuth credentials:
   - **Client ID**: From Google Cloud Console
   - **Client Secret**: From Google Cloud Console

**Redirect URLs:**
\`\`\`
Success URL: http://localhost:3000/dashboard
Failure URL: http://localhost:3000/login
\`\`\`

For production, update URLs accordingly:
\`\`\`
Success URL: https://yourdomain.com/dashboard
Failure URL: https://yourdomain.com/login
\`\`\`

#### Email Verification
1. In **Auth** → **Settings**
2. Enable **Email Verification**
3. Set custom verification URL: `http://localhost:3000/verify-email`

### 6. Security & Permissions

#### API Keys (if needed)
1. Navigate to **Settings** → **API Keys**
2. Create API key with appropriate scopes (usually not needed for client-side apps)

#### CORS Settings
1. Navigate to **Settings** → **Domains**
2. Add your domains:
   \`\`\`
   http://localhost:3000 (for development)
   https://yourdomain.com (for production)
   \`\`\`

### 7. Environment Variables

After completing the setup, update your `.env` file:

\`\`\`env
# Appwrite Configuration
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DATABASE_ID=your_database_id_here
VITE_APPWRITE_COLLECTION_ID=your_posts_collection_id_here
VITE_APPWRITE_COMMENTS_COLLECTION_ID=your_comments_collection_id_here
VITE_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id_here
VITE_APPWRITE_BUCKET_ID=your_bucket_id_here

# Email Verification
VITE_VERIFICATION_URL=http://localhost:3000/verify-email

# OAuth Redirect URLs  
VITE_SUCCESS_REDIRECT_URL=http://localhost:3000/dashboard
VITE_FAILURE_REDIRECT_URL=http://localhost:3000/login

# TinyMCE API Key (get from https://www.tiny.cloud/)
VITE_TINYMCE_API_KEY=your_tinymce_api_key_here
\`\`\`

## 🔍 Testing Your Setup

### Test Database Connection
1. Start your development server: `npm run dev`
2. Try creating a new account
3. Try creating a new post
4. Check if data appears in Appwrite Console

### Test File Upload
1. Try uploading an image when creating a post
2. Check if file appears in Storage bucket
3. Verify image displays correctly in the app

### Test Authentication
1. Try signing up with email/password
2. Check email verification flow
3. Try Google OAuth (if configured)
4. Test logout functionality

## 🚨 Common Issues & Solutions

### Issue: "Collection not found"
**Solution:** Double-check collection IDs in your `.env` file match exactly with Appwrite Console

### Issue: "Permission denied"
**Solution:** Verify collection permissions allow `users` to create/read/update/delete

### Issue: "File upload fails"
**Solution:** Check bucket permissions and file size limits

### Issue: "OAuth redirect fails"
**Solution:** Verify redirect URLs match exactly in both Google Console and Appwrite

### Issue: "Email verification not working"
**Solution:** Check verification URL in Auth settings and ensure it matches your app URL

## 📚 Additional Resources

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite React SDK](https://appwrite.io/docs/quick-starts/react)
- [Google OAuth Setup Guide](https://developers.google.com/identity/protocols/oauth2)
- [TinyMCE API Key Setup](https://www.tiny.cloud/docs/tinymce/6/editor-setup/)

## 🆘 Need Help?

If you encounter issues:
1. Check Appwrite Console logs
2. Verify all environment variables
3. Test API endpoints in Appwrite Console
4. Join [Appwrite Discord](https://discord.gg/GSeTUeA) for community support

---

**Happy Coding! 🚀**
\`\`\`

এই complete premium React blog application এ আপনি পাবেন:

## 🎯 **Key Features:**

### **✅ Fixed Issues:**
- **Dashboard layout** properly structured with sidebar and footer
- **Comment count** correctly displayed in post cards
- **TinyMCE integration** with proper theming and HTML parsing
- **Post delete/update** functionality working perfectly
- **Mobile responsiveness** optimized for all devices

### **🎨 Premium UI/UX:**
- **5 Beautiful Themes** (Light, Dark, Blue, Green, Purple, Orange)
- **Facebook-style social feed** with stories section
- **Smooth animations** and glass morphism effects
- **Fully responsive** design for mobile/tablet/desktop

### **🔧 Complete Backend Integration:**
- **All Appwrite services** properly implemented
- **Real-time comment counting** with React Query
- **Optimistic updates** for better UX
- **Proper error handling** and loading states

### **📱 Mobile-First Design:**
- **Touch-friendly interactions**
- **Swipe gestures** for stories
- **Collapsible navigation**
- **Optimized layouts** for all screen sizes

### **🚀 Production Ready:**
- **TypeScript support**
- **Comprehensive error handling**
- **SEO optimized**
- **Performance optimized**

