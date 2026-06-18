# Build in Public Log

## Day 1: Problem framing

I started by identifying the gap in most carbon apps: they report emissions, but they do not help users decide what to change first.

The first milestone was to define a product that would be easy to explain in a demo and still useful in the real world.

## Day 2: Architecture decisions

I chose a frontend-first architecture with TypeScript, Zustand, React Hook Form, Zod, and Recharts.

The goal was to make the codebase modular enough to evolve while keeping it lightweight enough for a hackathon build.

## Day 3: Carbon model and score system

I implemented the carbon engine around five categories: transport, food, energy, shopping, and lifestyle.

This let the app compute a Carbon Score and generate category-level recommendations from the same source of truth.

## Day 4: Local AI coach

Instead of connecting to an external AI API, I built a local recommendation engine.

That was important because it kept the demo reliable and made the logic explainable.

## Day 5: Carbon Twin simulator

The biggest product upgrade was the Carbon Twin simulator.

It lets users adjust behavioral levers and see projected emissions, score lift, and savings before committing to a change.

That shifted the product from “reporting” to “decision support”.

## Day 6: Impact amplification

I added impact conversion layers so carbon savings could be explained in terms people immediately understand:

- tree equivalents,
- miles avoided,
- money saved,
- and community-scale emissions avoided.

This was added to strengthen the real-world relevance of the product.

## Day 7: Testing and polish

I wrote tests for the carbon engine, recommendation engine, dashboard components, and goal tracking.

The final polish focused on accessibility, responsive layout, and a premium SaaS-style presentation.

## What I learned

- Product storytelling matters as much as code.
- Judges respond to measurable outcomes.
- Features that explain themselves are easier to demo and easier to trust.
- A local deterministic engine can be more valuable in a hackathon than an external API dependency.

## Demo narrative

If I had to pitch CarbonWise AI in one sentence, I would say:

CarbonWise AI helps users understand their footprint, simulate better choices, and turn everyday behavior into measurable climate impact.

## Next iteration

The next version should add real user baselines, exportable reports, and team-level collaboration so the impact story becomes even stronger.