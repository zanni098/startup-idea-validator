# Startup Idea Validator

Turn a startup idea into a scorecard covering market, risk, competitors, and build path.

This repository is part of Asad Jehan Zeb's AI workflow engineering portfolio for freelance AI automation roles, especially the Mindrift AI Workflow Engineer track. It is designed to show how an LLM product can be structured as a repeatable workflow instead of a one-off chat prompt.

## Live demo

After GitHub Pages is enabled for this repository, the demo is available at:

`https://zanni098.github.io/startup-idea-validator/`

The hosted demo runs as a browser-safe simulation so it can be reviewed without private API keys. The architecture is ready to connect to real providers by adding the environment variables shown in `.env.example`.

## What it demonstrates

- Founder-focused validation pipeline with devil's advocate, competitor scan, ICP hypothesis, build-vs-buy analysis, and scorecard output.
- Clear prompt-chain stages that can be tested and improved independently.
- Structured outputs that are suitable for downstream automation.
- A production-facing UI that explains the workflow by letting a reviewer run the pipeline.
- Documentation written for a client, hiring manager, or technical reviewer.

## Workflow

1. Clarify the customer and job-to-be-done
2. Run devil's advocate critique
3. Estimate market pull
4. Map alternatives and competitors
5. Score execution risk
6. Recommend next validation experiment

## Why this matters for Mindrift

Shows a complete multi-step AI workflow that converts messy input into a structured decision artifact.

Mindrift's Tendem-style work depends on reliable multi-step automations: data comes in messy, gets enriched, passes through prompt frameworks, returns structured artifacts, and improves through evaluation. This project is intentionally built around that pattern.

## Tech stack

- TypeScript
- Prompt pipeline
- Scorecard model
- Competitive analysis workflow

## Architecture

```text
Idea -> ICP extractor -> critique agent -> market heuristic -> competitor table -> scorecard -> experiment plan
```

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment

Copy `.env.example` to `.env.local` if you want to connect live APIs. The public demo does not require these values.

## Deployment

This repo includes `.github/workflows/pages.yml`. On every push to `main`, GitHub Actions builds the Vite app and deploys `dist/` to GitHub Pages.

If Pages is not active yet:

1. Open repository settings.
2. Go to Pages.
3. Set source to GitHub Actions.
4. Re-run the `Deploy GitHub Pages` workflow.

## About Asad

Asad Jehan Zeb is a project manager and developer from Mardan, Pakistan. He led E-study card from idea to product, generating roughly $50,000 in revenue through government education digitalization work, and is building Mjord, an agentic AI installation service for non-technical users.

This project exists to make that AI workflow experience visible in public GitHub form.
