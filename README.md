# 🚀 MyBlog - Premium Social Media Blog Platform

A modern, feature-rich social media blog platform built with React, featuring real-time interactions, beautiful UI, and comprehensive content management.

![MyBlog Preview](https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop)

## ✨ Features

### 🎨 **Premium UI/UX**
- **Multiple Themes**: Light, Dark, Blue, Green, Purple, Orange
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion powered interactions
- **Glass Morphism**: Modern glass effects and backdrop blur
- **Social Media Layout**: Facebook-inspired feed design

### 📱 **Social Features**
- **Stories Section**: Create and view stories with animated rings
- **Interactive Feed**: Like, comment, share, and bookmark posts
- **Real-time Notifications**: Pulse animations for new activities
- **User Profiles**: Complete profile management with stats
- **Follow System**: Follow/unfollow other users

### 📝 **Content Management**
- **Rich Text Editor**: TinyMCE with custom theming
- **Image Upload**: Drag & drop image support
- **Tag System**: Organize posts with tags
- **Search & Filter**: Advanced search and filtering options
- **Draft System**: Save posts as drafts

### 🔐 **Authentication**
- **Email/Password**: Secure authentication
- **Google OAuth**: One-click Google sign-in
- **Email Verification**: Secure account verification
- **Password Reset**: Forgot password functionality

### 🏗️ **Technical Features**
- **React 18**: Latest React with hooks
- **React Router**: Client-side routing
- **React Query**: Advanced data fetching and caching
- **Zustand**: Lightweight state management
- **Appwrite**: Backend-as-a-Service
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **ShadCN UI**: Beautiful component library

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, ShadCN UI
- **State Management**: Zustand, React Query
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Backend**: Appwrite
- **Rich Text**: TinyMCE
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Appwrite account

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/myblog.git
cd myblog
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Environment Setup**
\`\`\`bash
cp .env.example .env
\`\`\`

4. **Configure environment variables**
\`\`\`env
# Appwrite Configuration
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_posts_collection_id
VITE_APPWRITE_COMMENTS_COLLECTION_ID=your_comments_collection_id
VITE_APPWRITE_USERS_COLLECTION_ID=your_users_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id

# Email Verification
VITE_VERIFICATION_URL=http://localhost:3000/verify-email

# OAuth Redirect URLs
VITE_SUCCESS_REDIRECT_URL=http://localhost:3000/dashboard
VITE_FAILURE_REDIRECT_URL=http://localhost:3000/login

# TinyMCE API Key
VITE_TINYMCE_API_KEY=your_tinymce_api_key
\`\`\`

5. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

## 📋 Appwrite Setup Guide

### 1. Create Appwrite Project
1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project
3. Copy your Project ID

### 2. Database Setup

#### Create Database
1. Go to Databases → Create Database
2. Name: `myblog-database`
3. Copy Database ID

#### Create Collections

**Posts Collection:**
\`\`\`json
{
  "name": "posts",
  "attributes": [
    {"key": "title", "type": "string", "size": 255, "required": true},
    {"key": "content", "type": "string", "size": 65535, "required": true},
    {"key": "slug", "type": "string", "size": 255, "required": true},
    {"key": "featuredImage", "type": "string", "size": 255, "required": false},
    {"key": "userId", "type": "string", "size": 255, "required": true},
    {"key": "authorName", "type": "string", "size": 255, "required": true},
    {"key": "likes", "type": "string", "array": true, "required": false},
    {"key": "tags", "type": "string", "array": true, "required": false},
    {"key": "status", "type": "string", "size": 50, "required": true, "default": "active"},
    {"key": "commentCount", "type": "integer", "required": false, "default": 0}
  ],
  "indexes": [
    {"key": "title", "type": "fulltext", "attributes": ["title"]},
    {"key": "content", "type": "fulltext", "attributes": ["content"]},
    {"key": "userId", "type": "key", "attributes": ["userId"]},
    {"key": "status", "type": "key", "attributes": ["status"]},
    {"key": "createdAt", "type": "key", "attributes": ["$createdAt"], "orders": ["desc"]}
  ],
  "permissions": [
    "read(\"any\")",
    "create(\"users\")",
    "update(\"users\")",
    "delete(\"users\")"
  ]
}
\`\`\`

**Comments Collection:**
\`\`\`json
{
  "name": "comments",
  "attributes": [
    {"key": "postId", "type": "string", "size": 255, "required": true},
    {"key": "content", "type": "string", "size": 1000, "required": true},
    {"key": "authorId", "type": "string", "size": 255, "required": true},
    {"key": "authorName", "type": "string", "size": 255, "required": true}
  ],
  "indexes": [
    {"key": "postId", "type": "key", "attributes": ["postId"]},
    {"key": "authorId", "type": "key", "attributes": ["authorId"]},
    {"key": "createdAt", "type": "key", "attributes": ["$createdAt"], "orders": ["desc"]}
  ],
  "permissions": [
    "read(\"any\")",
    "create(\"users\")",
    "update(\"users\")",
    "delete(\"users\")"
  ]
}
\`\`\`

**Users Collection:**
\`\`\`json
{
  "name": "users",
  "attributes": [
    {"key": "name", "type": "string", "size": 255, "required": true},
    {"key": "email", "type": "string", "size": 255, "required": true},
    {"key": "bio", "type": "string", "size": 500, "required": false},
    {"key": "avatar", "type": "string", "size": 255, "required": false},
    {"key": "followers", "type": "string", "array": true, "required": false},
    {"key": "following", "type": "string", "array": true, "required": false},
    {"key": "postsCount", "type": "integer", "required": false, "default": 0},
    {"key": "likesCount", "type": "integer", "required": false, "default": 0}
  ],
  "indexes": [
    {"key": "email", "type": "unique", "attributes": ["email"]},
    {"key": "name", "type": "fulltext", "attributes": ["name"]}
  ],
  "permissions": [
    "read(\"any\")",
    "create(\"users\")",
    "update(\"users\")",
    "delete(\"users\")"
  ]
}
\`\`\`

### 3. Storage Setup
1. Go to Storage → Create Bucket
2. Name: `myblog-storage`
3. Set permissions:
   - Read: `any`
   - Create: `users`
   - Update: `users`
   - Delete: `users`
4. File size limit: 5MB
5. Allowed file extensions: `jpg,jpeg,png,gif,webp`

### 4. Authentication Setup
1. Go to Auth → Settings
2. Enable Email/Password
3. Enable Google OAuth:
   - Add your Google Client ID and Secret
   - Set redirect URLs:
     - Success: `http://localhost:3000/dashboard`
     - Failure: `http://localhost:3000/login`

### 5. Get TinyMCE API Key
1. Go to [TinyMCE](https://www.tiny.cloud/)
2. Create account and get API key
3. Add to environment variables

## 📱 Mobile Responsiveness

The application is fully responsive with:
- **Mobile-first design**
- **Touch-friendly interactions**
- **Optimized layouts for all screen sizes**
- **Swipe gestures for stories**
- **Collapsible navigation**

## 🎨 Theming

Choose from multiple beautiful themes:
- **Light Theme**: Clean and minimal
- **Dark Theme**: Easy on the eyes
- **Blue Theme**: Professional and modern
- **Green Theme**: Fresh and natural
- **Purple Theme**: Creative and vibrant
- **Orange Theme**: Warm and energetic

## 🔧 Development

### Available Scripts
\`\`\`bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
\`\`\`

### Project Structure
\`\`\`
src/
├── api/                 # API services
│   └── appwrite/       # Appwrite services
├── components/         # React components
│   ├── ui/            # UI components
│   ├── shared/        # Shared components
│   └── providers/     # Context providers
├── hooks/             # Custom hooks
├── layout/            # Layout components
├── pages/             # Page components
├── store/             # State management
├── lib/               # Utilities
├── schema/            # Validation schemas
└── config/            # Configuration
\`\`\`

## 🚀 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

### Vercel
1. Build the project: `npm run build`
2. Upload `dist` folder to Vercel
3. Configure environment variables

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io) - Backend as a Service
- [ShadCN UI](https://ui.shadcn.com) - Beautiful components
- [TinyMCE](https://www.tiny.cloud) - Rich text editor
- [Framer Motion](https://www.framer.com/motion) - Animations
- [Lucide](https://lucide.dev) - Beautiful icons

## 📞 Support

For support, email usamaforayaje@gmail.com or join our Discord community.

---

**Made with ❤️ by Usama Forayaje**
