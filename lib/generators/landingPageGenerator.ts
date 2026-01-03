import type { FormData } from "@/lib/schemas/formSchema";

export interface LandingPageContent {
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  problem: {
    title: string;
    description: string;
  };
  solution: {
    title: string;
    description: string;
    benefit: string;
  };
  audience: {
    title: string;
    description: string;
  };
  features: string[];
  cta: {
    text: string;
    type: string;
  };
}

// Extract features from product description
function extractFeatures(description: string): string[] {
  const sentences = description.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const features = sentences.slice(0, 3).map(s => s.trim());
  return features.length > 0 ? features : ["Powerful and intuitive", "Built for modern teams", "Scalable and reliable"];
}

export function generateLandingPage(data: FormData): LandingPageContent {
  const { productName, productDescription, targetAudience, problemStatement, mainBenefit, ctaText, ctaType } = data;

  return {
    hero: {
      headline: `${productName}: ${mainBenefit.split('.')[0]}`,
      subheadline: productDescription,
      ctaText: ctaText,
    },
    problem: {
      title: "The Problem",
      description: problemStatement,
    },
    solution: {
      title: `Introducing ${productName}`,
      description: productDescription,
      benefit: mainBenefit,
    },
    audience: {
      title: "Built For You",
      description: targetAudience,
    },
    features: extractFeatures(productDescription),
    cta: {
      text: ctaText,
      type: ctaType,
    },
  };
}

export function generateCSS(): string {
  return `/* Modern Landing Page Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --primary: #2563eb;
  --primary-dark: #1e40af;
  --secondary: #64748b;
  --text: #1e293b;
  --text-light: #64748b;
  --bg: #ffffff;
  --bg-light: #f8fafc;
  --border: #e2e8f0;
  --gradient-start: #2563eb;
  --gradient-end: #7c3aed;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Navigation */
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border);
  z-index: 1000;
  padding: 1rem 0;
}

nav .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary);
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 0 4rem;
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(-30px, -30px) rotate(180deg); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.hero h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.8;
}

/* Buttons */
.btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  text-decoration: none;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.btn-secondary {
  background: white;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-secondary:hover {
  background: var(--primary);
  color: white;
}

/* Sections */
section {
  padding: 6rem 0;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
}

.section-subtitle {
  font-size: 1.25rem;
  color: var(--text-light);
  text-align: center;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.section-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Problem Section */
.problem {
  background: var(--bg-light);
}

.problem-content {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}

/* Solution Section */
.solution {
  background: white;
}

.benefit-box {
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(124, 58, 237, 0.1));
  padding: 2rem;
  border-radius: 1rem;
  margin-top: 2rem;
  border-left: 4px solid var(--primary);
}

.benefit-box h3 {
  color: var(--primary);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

/* Features Section */
.features {
  background: var(--bg-light);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: var(--text-light);
}

/* Audience Section */
.audience {
  background: white;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
  color: white;
  text-align: center;
  padding: 6rem 0;
}

.cta-section h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1rem;
  color: white;
}

.cta-section p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-section .btn {
  background: white;
  color: var(--primary);
}

.cta-section .btn:hover {
  background: var(--bg-light);
}

/* Footer */
footer {
  background: var(--text);
  color: white;
  padding: 3rem 0;
  text-align: center;
}

footer p {
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hero {
    padding: 6rem 0 3rem;
  }

  section {
    padding: 4rem 0;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .problem-content,
  .benefit-box {
    padding: 1.5rem;
  }
}

/* Smooth Scroll */
html {
  scroll-behavior: smooth;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeInUp 0.6s ease-out;
}
`;
}

export function generateHTML(content: LandingPageContent, includeCSS: boolean = true): string {
  const cssContent = includeCSS ? `<style>${generateCSS()}</style>` : `<link rel="stylesheet" href="styles.css">`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${content.hero.subheadline}">
    <meta property="og:title" content="${content.hero.headline}">
    <meta property="og:description" content="${content.hero.subheadline}">
    <meta property="og:type" content="website">
    <title>${content.hero.headline}</title>
    ${cssContent}
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="container">
            <div class="logo">${content.hero.headline.split(':')[0]}</div>
            <ul class="nav-links">
                <li><a href="#problem">Problem</a></li>
                <li><a href="#solution">Solution</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#cta">Get Started</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>${content.hero.headline}</h1>
            <p>${content.hero.subheadline}</p>
            <a href="#cta" class="btn">${content.hero.ctaText}</a>
        </div>
    </section>

    <!-- Problem Section -->
    <section id="problem" class="problem">
        <div class="container">
            <h2 class="section-title">${content.problem.title}</h2>
            <div class="problem-content">
                <p>${content.problem.description}</p>
            </div>
        </div>
    </section>

    <!-- Solution Section -->
    <section id="solution" class="solution">
        <div class="container">
            <h2 class="section-title">${content.solution.title}</h2>
            <div class="section-content">
                <p>${content.solution.description}</p>
                <div class="benefit-box">
                    <h3>Key Benefit</h3>
                    <p>${content.solution.benefit}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
        <div class="container">
            <h2 class="section-title">Why Choose Us</h2>
            <p class="section-subtitle">Everything you need to succeed</p>
            <div class="features-grid">
                ${content.features.map((feature, index) => `
                <div class="feature-card fade-in">
                    <div class="feature-icon">${index + 1}</div>
                    <h3>Feature ${index + 1}</h3>
                    <p>${feature}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Audience Section -->
    <section id="audience" class="audience">
        <div class="container">
            <h2 class="section-title">${content.audience.title}</h2>
            <div class="section-content">
                <p>${content.audience.description}</p>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section id="cta" class="cta-section">
        <div class="container">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied users today</p>
            <a href="#" class="btn">${content.cta.text}</a>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${content.hero.headline.split(':')[0]}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
}

export function generateMarkdown(content: LandingPageContent): string {
  return `# ${content.hero.headline}

${content.hero.subheadline}

[${content.hero.ctaText}](#)

---

## ${content.problem.title}

${content.problem.description}

---

## ${content.solution.title}

${content.solution.description}

### Key Benefit

${content.solution.benefit}

---

## Features

${content.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

---

## ${content.audience.title}

${content.audience.description}

---

## Ready to Get Started?

[${content.cta.text}](#)
`;
}

export function generatePlainText(content: LandingPageContent): string {
  return `${content.hero.headline}

${content.hero.subheadline}

${content.hero.ctaText}

---

${content.problem.title}

${content.problem.description}

---

${content.solution.title}

${content.solution.description}

Key Benefit: ${content.solution.benefit}

---

Features:
${content.features.map((f, i) => `${i + 1}. ${f}`).join('\n')}

---

${content.audience.title}

${content.audience.description}

---

Ready to Get Started?

${content.cta.text}
`;
}
