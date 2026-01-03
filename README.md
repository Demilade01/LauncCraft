# 🚀 Launchcraft

A lightweight web tool that helps founders turn product ideas into clear, conversion-ready landing pages. Answer a few guided questions, and get structured landing page copy ready to use.

![Launchcraft](https://img.shields.io/badge/Launchcraft-v0.1.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

- **🎯 Guided Multi-Step Form** - Answer 5 simple questions about your product
- **⚡ Lightning Fast** - Generate landing page copy in minutes
- **📝 Structured Output** - Get well-organized, conversion-focused copy
- **💾 Auto-Save** - Your progress is automatically saved as you fill the form
- **📤 Multiple Export Formats** - Export as Markdown, HTML, or Plain Text
- **📋 Copy to Clipboard** - One-click copy for all formats
- **🎨 Modern UI** - Beautiful, responsive design with smooth animations
- **🌙 Dark Mode** - Built-in dark mode support

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [Sonner](https://sonner.emilkowal.ski/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd launchcraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### Creating a Landing Page

1. **Start the Form**
   - Click "Get Started Free" on the landing page
   - Or navigate to `/form`

2. **Complete the 5 Steps**
   - **Step 1:** Describe your product (name and description)
   - **Step 2:** Define your target audience
   - **Step 3:** Identify the problem your product solves
   - **Step 4:** Highlight the main benefit
   - **Step 5:** Set your call-to-action

3. **Review & Export**
   - Preview your generated landing page
   - Copy to clipboard or download in your preferred format
   - Export options: Markdown, HTML, or Plain Text

### Export Formats

- **Markdown** - Perfect for documentation sites, GitHub, or Notion
- **HTML** - Ready-to-use HTML with basic styling
- **Plain Text** - Simple text format for any use case

## 📁 Project Structure

```
launchcraft/
├── app/                    # Next.js app directory
│   ├── form/              # Multi-step form page
│   ├── preview/           # Preview and export page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── form/              # Form components
│   │   ├── MultiStepForm.tsx
│   │   └── StepIndicator.tsx
│   ├── landing/           # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   └── ...
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── generators/        # Landing page generator
│   │   └── landingPageGenerator.ts
│   ├── schemas/           # Zod validation schemas
│   │   └── formSchema.ts
│   ├── store/             # Zustand state management
│   │   └── formStore.ts
│   ├── animations.ts      # Framer Motion variants
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## 🧩 Key Components

### Multi-Step Form
- Step-by-step validation with Zod
- Progress indicator
- Auto-save functionality
- Smooth animations between steps

### Landing Page Generator
- Transforms form inputs into structured copy
- Generates hero, problem, solution, audience, and CTA sections
- Multiple export format support

### Preview Page
- Live preview of generated content
- Copy to clipboard functionality
- Download options for all formats
- Edit and regenerate support

## 🎨 Customization

### Adding New Form Fields
1. Update `lib/schemas/formSchema.ts` with new fields
2. Add the field to the appropriate step in `components/form/MultiStepForm.tsx`
3. Update the generator in `lib/generators/landingPageGenerator.ts`

### Styling
The project uses Tailwind CSS v4 with CSS variables for theming. Customize colors in `app/globals.css`.

### Animations
Animation variants are defined in `lib/animations.ts`. Modify or add new variants as needed.

## 📜 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to Other Platforms

Build the project:
```bash
npm run build
```

The `out` directory will contain the static export (if configured) or use the standard Next.js build output.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ for founders and creators
