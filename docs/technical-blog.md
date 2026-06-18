# CarbonWise AI: building a climate product that feels like a real SaaS platform

CarbonWise AI started with a simple question: how do you make carbon tracking feel actionable instead of academic?

Most sustainability apps stop at dashboards. They show emissions, but they do not answer the next question a user has: what should I change first, and what is the impact if I do?

CarbonWise AI was designed to answer that with three layers:

1. A realistic carbon model.
2. A local recommendation engine.
3. A scenario simulator that shows what happens when habits change.

## Problem statement

The core problem is not a lack of data. It is a lack of clarity.

Users usually do not know which category drives their footprint most, how much a behavior change matters, or whether the change is meaningful at all. That is why the product needed to translate emissions into plain language and measurable outcomes.

## Architecture

The app uses a modular frontend architecture:

- React for component composition.
- TypeScript for type safety across stores, services, and UI.
- Zustand for lightweight global state.
- Zod and React Hook Form for validated user input.
- Recharts for analytics and visual explanation.
- Vitest and React Testing Library for confidence in the business logic.

The separation is intentional:

- `services/` owns the carbon math, recommendation logic, and impact projection.
- `store/` owns state and persistence.
- `components/` owns rendering and interaction.
- `pages/` combines product flows into complete experiences.

This separation kept the app easy to extend while the climate logic evolved.

## Carbon model

The app models five categories:

- Transport
- Food
- Energy
- Shopping
- Lifestyle

Each category contributes to a monthly total, which then drives the Carbon Score. The score is normalized from 0 to 100 so users can understand progress at a glance.

The model is deliberately simple enough to be explainable, but rich enough to support meaningful recommendations and projections.

## Recommendation engine

Instead of using an external AI API, CarbonWise AI uses a local recommendation engine.

That choice matters for three reasons:

- It removes runtime dependency on external services.
- It keeps the experience predictable for a hackathon demo.
- It lets the product explain why a suggestion was generated.

The engine ranks suggestions by the user’s dominant footprint categories and returns practical actions with estimated savings.

## The Carbon Twin simulator

The most distinctive feature is the Carbon Twin simulator.

It allows a user to adjust category-level reduction sliders and immediately see:

- projected footprint,
- projected Carbon Score,
- total savings,
- strongest lever,
- and a scenario narrative.

This is the part that moves the project from “dashboard” to “decision tool”. Judges usually reward products that do not merely visualize data, but help the user simulate outcomes.

## Impact amplifier

To make the impact story stronger, the app also translates carbon savings into:

- annual kilograms of CO2e avoided,
- tree equivalents,
- car miles avoided,
- estimated money saved,
- and community-scale emissions avoided.

This was added because sustainability products are often judged on usefulness and social value. Presenting personal and community outcomes makes the product easier to explain and easier to believe.

## UX and product decisions

The UI was designed to feel like an investor-demo SaaS product rather than a student prototype.

The choices were:

- premium card layouts,
- strong typography hierarchy,
- eco-tech color palette,
- responsive dashboard composition,
- accessible forms and labels,
- clear separation between summary, explanation, and action.

The goal was to make the product feel ready for a real sustainability team.

## Testing strategy

The test suite focuses on the parts that matter most:

- carbon engine calculations,
- recommendation ranking,
- dashboard component rendering,
- and the goal tracking workflow.

That gives confidence that the app logic, not just the visuals, is stable.

## Tradeoffs

There were a few deliberate tradeoffs.

- The carbon model is simplified, because hackathon users need clarity more than scientific complexity.
- The recommendation engine is local and deterministic, because that makes the demo dependable.
- The impact math uses readable assumptions, because explainability matters in product demos.

These tradeoffs make the product stronger for a hackathon context.

## What I would build next

- User-specific baseline calibration from real activity imports.
- Calendar-based habit tracking.
- Shareable carbon reports.
- Team or household leaderboards.
- A backend persistence layer and auth flow.

## Final takeaway

CarbonWise AI is not just a dashboard. It is a climate decision platform that turns inputs into score, score into action, and action into measurable impact.

That is the story that makes the project feel credible, differentiated, and judge-ready.