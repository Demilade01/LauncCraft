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
  cta: {
    text: string;
    type: string;
  };
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
    cta: {
      text: ctaText,
      type: ctaType,
    },
  };
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

## ${content.audience.title}

${content.audience.description}

---

## Ready to Get Started?

[${content.cta.text}](#)
`;
}

export function generateHTML(content: LandingPageContent): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${content.hero.headline}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        h1 { font-size: 3rem; margin-bottom: 1rem; }
        h2 { font-size: 2rem; margin: 2rem 0 1rem; }
        p { margin-bottom: 1rem; font-size: 1.1rem; }
        .cta-button { display: inline-block; padding: 1rem 2rem; background: #000; color: #fff; text-decoration: none; border-radius: 0.5rem; margin: 2rem 0; }
        .cta-button:hover { background: #333; }
        section { margin: 4rem 0; padding: 2rem 0; border-top: 1px solid #eee; }
    </style>
</head>
<body>
    <div class="container">
        <section class="hero">
            <h1>${content.hero.headline}</h1>
            <p>${content.hero.subheadline}</p>
            <a href="#" class="cta-button">${content.hero.ctaText}</a>
        </section>

        <section class="problem">
            <h2>${content.problem.title}</h2>
            <p>${content.problem.description}</p>
        </section>

        <section class="solution">
            <h2>${content.solution.title}</h2>
            <p>${content.solution.description}</p>
            <h3>Key Benefit</h3>
            <p>${content.solution.benefit}</p>
        </section>

        <section class="audience">
            <h2>${content.audience.title}</h2>
            <p>${content.audience.description}</p>
        </section>

        <section class="cta">
            <h2>Ready to Get Started?</h2>
            <a href="#" class="cta-button">${content.cta.text}</a>
        </section>
    </div>
</body>
</html>`;
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

${content.audience.title}

${content.audience.description}

---

Ready to Get Started?

${content.cta.text}
`;
}

