export const project = {
  "slug": "startup-idea-validator",
  "name": "Startup Idea Validator",
  "tagline": "Turn a startup idea into a scorecard covering market, risk, competitors, and build path.",
  "accent": "#334155",
  "secondary": "#16a34a",
  "persona": "builders validating ideas before burning weeks",
  "repoPitch": "Founder-focused validation pipeline with devil's advocate, competitor scan, ICP hypothesis, build-vs-buy analysis, and scorecard output.",
  "roleFit": "Shows a complete multi-step AI workflow that converts messy input into a structured decision artifact.",
  "inputLabel": "Startup idea",
  "sampleInput": "Mjord: one-click installer for agentic AI tools so non-technical users can run agents locally.",
  "cta": "Validate idea",
  "stages": [
    "Clarify the customer and job-to-be-done",
    "Run devil's advocate critique",
    "Estimate market pull",
    "Map alternatives and competitors",
    "Score execution risk",
    "Recommend next validation experiment"
  ],
  "outputs": [
    {
      "label": "Score",
      "text": "78/100: strong pain, clear founder-market fit, but onboarding trust is the hardest risk."
    },
    {
      "label": "Experiment",
      "text": "Record ten non-technical installs and measure time-to-first-agent under 12 minutes."
    },
    {
      "label": "Positioning",
      "text": "Sell confidence and setup safety, not just one-click convenience."
    }
  ],
  "stack": [
    "TypeScript",
    "Prompt pipeline",
    "Scorecard model",
    "Competitive analysis workflow"
  ],
  "architecture": "Idea -> ICP extractor -> critique agent -> market heuristic -> competitor table -> scorecard -> experiment plan"
} as const;
