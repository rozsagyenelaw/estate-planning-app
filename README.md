# Estate Planning Application

A professional, comprehensive estate planning document automation system built with React, Firebase, and Tailwind CSS. This application streamlines the creation of living trusts, wills, powers of attorney, and related estate planning documents.

## 🌟 Features

### Complete Document Suite
- **Living Trusts** (Single & Joint)
- **Trust Certificates**
- **Pour Over Wills**
- **Durable Power of Attorney**
- **Healthcare Power of Attorney**
- **Advanced Healthcare Directives**
- **HIPAA Authorizations**

### Smart Form System
- ✅ **12 Comprehensive Form Sections**
- ✅ **Autocomplete** for names, addresses, and phone numbers
- ✅ **Auto-formatting** for phone numbers, SSN, and zip codes
- ✅ **Auto-save** every 30 seconds to local storage
- ✅ **Real-time validation** and calculations
- ✅ **Dynamic lists** with add/remove functionality
- ✅ **Collapsible sections** for better UX
- ✅ **Responsive design** (mobile, tablet, desktop)

### Key Capabilities
- Toggle between **single and joint trusts**
- Support for **restatements** of existing trusts
- **Age-based and event-based** distributions
- **Percentage validation** (ensures totals equal 100%)
- **Autocomplete from previous entries**
- **Empty states** with clear calls-to-action
- **Color-coded sections** for easy identification

## 📋 Form Sections

1. **Trust Type Configuration**
   - Single vs. Joint selection
   - Restatement option

2. **Client Information**
   - Full demographic and contact information
   - Separate sections for client and spouse

3. **Living Trust Name**
   - Auto-generated or custom name

4. **Children**
   - Dynamic list with birthdays and relationships

5. **Successor Trustees**
   - Priority-ordered list with contact info
   - Joint trustee options

6. **Specific Distribution**
   - Age-based or event-based distributions
   - Multiple age milestones per distribution
   - Lapse options

7. **Residuary Distribution**
   - Even split or custom percentages
   - Distribution type options (Outright/Guardian/Needs Trust)
   - Real-time percentage validation

8. **General Needs Trust**
   - Special needs provisions
   - Age restrictions and conditions

9. **Charitable Distribution**
   - Organization details and Tax ID
   - Amount or percentage options

10. **Pour Over Will Representatives**
    - Separate lists for client and spouse

11. **Guardians**
    - Priority-ordered with contact information
    - Joint guardian options

12. **Durable Power of Attorney**
    - Financial and legal representatives
    - Separate for client and spouse

13. **Healthcare Power of Attorney**
    - Healthcare decision makers
    - Full contact information required

14. **Anatomical Gifts**
    - Five gift type options
    - Educational information included

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rozsagyenelaw/estate-planning-app.git
   cd estate-planning-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Firebase configuration:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🔥 Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

2. Enable the following services:
   - **Authentication** (Email/Password)
   - **Firestore Database**
   - **Storage**

3. Copy your Firebase configuration to `.env`

4. Set up Firestore security rules (example):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       match /forms/{formId} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

## 📦 Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS 3** - Styling framework
- **Firebase** - Backend services
  - Authentication
  - Firestore (database)
  - Storage (file storage)
- **React Hook Form** - Form state management
- **jsPDF** - PDF generation
- **date-fns** - Date utilities

## 🎨 Project Structure

```
estate-planning-app/
├── src/
│   ├── components/
│   │   ├── common/           # Reusable UI components
│   │   ├── forms/            # Form components
│   │   │   └── sections/     # Form section components
│   │   └── layout/           # Layout components
│   ├── context/              # React context (state management)
│   ├── services/             # Firebase, API services
│   ├── utils/                # Utility functions
│   │   ├── validation.js     # Form validation
│   │   ├── formatters.js     # Data formatting
│   │   └── constants.js      # App constants
│   ├── App.jsx
│   └── main.jsx
├── .env.example              # Environment variable template
├── netlify.toml              # Netlify deployment config
├── tailwind.config.js        # Tailwind CSS configuration
├── vite.config.js            # Vite configuration
└── package.json
```

## 🌐 Deployment

### Netlify Deployment

1. **Connect to Netlify**
   - Push your code to GitHub
   - Connect your GitHub repository to Netlify

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Add environment variables**
   - Go to Netlify dashboard → Site settings → Environment variables
   - Add all `VITE_*` variables from your `.env` file

4. **Deploy**
   - Netlify will automatically deploy on every push to `main`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder to your hosting provider

## 🔒 Security Features

- Environment variables for sensitive data
- Firebase security rules
- Input sanitization
- SSN encryption capability
- HTTPS-only in production
- Security headers configured

## 📝 Document Generation

The application includes placeholder document generators. To add your custom templates:

1. Update `src/services/documentGenerator.js`
2. Replace placeholder functions with your template logic
3. Use jsPDF for PDF generation
4. Access form data via the `formData` parameter

Example:
```javascript
export const generateLivingTrust = async (formData) => {
  const doc = new jsPDF();

  // Add your template content here
  doc.setFontSize(20);
  doc.text('LIVING TRUST', 105, 20, { align: 'center' });

  // Access form data
  doc.text(`Trust Name: ${formData.trustName}`, 20, 40);

  return doc;
};
```

## 🛠️ Customization

### Adding New States

Update `src/utils/constants.js`:
```javascript
export const US_STATES = [
  { value: 'CA', label: 'California' },
  { value: 'NY', label: 'New York' },
  // Add more states
];
```

### Modifying Form Fields

1. Update constants in `src/utils/constants.js`
2. Modify form sections in `src/components/forms/sections/`
3. Update context in `src/context/FormContext.jsx`

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with Tailwind CSS
- Powered by Firebase

## 📞 Support

For questions or support, please open an issue on GitHub.

---

**Made with ❤️ for streamlining estate planning documentation**
