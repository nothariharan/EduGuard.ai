# EduGuard.ai 🛡️

**An AI-Powered Student Risk Assessment and Management System**

EduGuard.ai is a comprehensive educational management platform designed to identify at-risk students early and provide actionable insights to educators and administrators. Built with Next.js 14, TypeScript, and modern UI components, it offers real-time monitoring, predictive analytics, and intervention management.

## 🌟 Features

### 📊 **Dashboard Overview**
- Real-time student performance metrics
- At-risk student identification and tracking
- Interactive charts and visualizations
- Key performance indicators (KPIs) monitoring

### 👥 **Student Management**
- Comprehensive student profiles with detailed information
- Academic performance tracking (attendance, grades, assignments)
- Fee status monitoring and payment tracking
- Risk level assessment and scoring
- Individual student analytics and trends

### 🚨 **Alert System**
- Automated risk detection based on multiple factors
- Real-time alert generation for critical situations
- Alert categorization (Critical, Warning, Info)
- Mentor and parent notification system
- Action tracking and resolution management

### 📈 **Analytics & Reports**
- Department-wise performance analysis
- Attendance trend monitoring
- Grade distribution insights
- Risk pattern identification
- Customizable report generation
- Export functionality for data analysis

### 🔔 **Notification Center**
- Centralized notification management
- Priority-based notification system
- Read/unread status tracking
- Notification history and archiving

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI Components**: Radix UI, Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system
- **Database**: Ready for PostgreSQL/MySQL/SQLite integration
- **ORM**: Prisma (ready for setup)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nothariharan/EduGuard.ai.git
   cd EduGuard.ai/eduguardai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Configure your environment variables in `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
eduguardai/
├── app/                    # Next.js app directory
│   ├── alerts/            # Alert management pages
│   ├── notifications/     # Notification center
│   ├── reports/          # Analytics and reports
│   ├── students/         # Student management
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   ├── dashboard-*.tsx  # Dashboard-specific components
│   └── ...
├── lib/                 # Utility functions
├── backend/             # Backend services
└── ...
```

## 🎯 Key Components

- **Dashboard**: Main overview with KPIs and charts
- **Student Profiles**: Detailed student information and analytics
- **Alert Management**: Risk detection and notification system
- **Reports**: Comprehensive analytics and insights
- **Notification Center**: Centralized communication hub

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="your_database_url"

# Next.js
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"

# Add other environment variables as needed
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@eduguard.ai or join our community discussions.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Radix UI for accessible components
- Tailwind CSS for utility-first styling
- All contributors who help make EduGuard.ai better