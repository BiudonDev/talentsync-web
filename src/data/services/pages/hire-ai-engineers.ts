/**
 * `/hire-ai-engineers/` — DECISIONS.md D1 row 9, `draft: true`.
 *
 * Content source: 02-page-content.md §6. Claim wording: 06-claims-measurement.md.
 *
 * ## Decisions taken here, and what has to change before this page publishes
 *
 * 1. **`draft: true` is deliberate and this page must not be flipped yet.**
 *    D1.1 gates publication on named placements *for the role the page sells*.
 *    There is no AI-engineering placement on record: no LLM application engineer,
 *    no ML platform engineer, no MLOps hire. What exists is two clients who build
 *    AI products — Qualiwise (an AI copilot for product quality) and Barça Mobile
 *    (an AI super app) — staffed with a backend engineer and an architecture/CI-CD
 *    engineer respectively. Both are true, both are on the page, and neither is
 *    an AI-engineering hire.
 *
 * 2. **`evidence` therefore carries ONE entry, not two.** That is what keeps the
 *    gate real: `assertServicePage` refuses `draft: false` under two named
 *    placements, so the guard, not a comment, blocks the flip. Do not pad this
 *    array with the Barça Mobile engagement to get the count up — that placement
 *    is DevOps-scope work and it belongs to `/hire-devops-engineers/`. It is
 *    described in the body of this page as context, which is honest, and it is
 *    not counted as AI evidence, which is also honest.
 *
 * 3. **To publish:** one named client placement of an actual applied-AI role —
 *    LLM application, data, ML platform or MLOps — added to `evidence`, then
 *    `draft: false` here AND in `src/data/routes.ts`. Two lines. Everything else
 *    on this page is finished.
 *
 * 4. **Omitted on purpose:** the Ulrich (Qualiwise) and Tom (Entail AI)
 *    testimonials that §6 asks for. 06-claims-measurement.md rows 19 and 20 hold
 *    both pending full surnames, written permission, and confirmation that the
 *    Entail photo is the person it is attributed to. An unverified endorsement is
 *    a worse liability than a missing one. Entail AI is likewise absent from
 *    `evidence` — row 43 retires the "led technical development" framing and the
 *    replacement wording has no engineer count behind it yet.
 *
 * 5. **`internalLinks` point only at indexed routes.** A draft page may link out;
 *    nothing may link in, and that includes the other two drafts. §6's link to
 *    `/hire-devops-engineers/` is dropped for that reason.
 */

import type { ServicePage } from '../types'

export const hireAiEngineers: ServicePage = {
  slug: 'hire-ai-engineers',
  draft: true,
  label: 'AI Engineers',
  metaTitle: 'Hire AI Engineers in Eastern Europe | TalentSync',
  metaDescription:
    'Hire AI engineers from Eastern Europe: LLM application, data and ML platform engineers who ship production systems, not research prototypes.',
  h1: 'Hire AI Engineers in Eastern Europe',

  answerParagraph:
    'TalentSync places applied AI engineers from Eastern Europe: the people who ship LLM-backed features, build retrieval and evaluation pipelines, and run ML infrastructure in production. We do not place research scientists. Engineers engage on a direct B2B contract with you or hourly through us, and you keep control of architecture and model decisions.',

  whoFor: {
    audience: 'Product teams shipping LLM-backed features into production',
    body: [
      'Engineering leaders who already have a product in front of users and are now adding an AI-backed feature to it — retrieval over their own documents, a copilot inside an existing workflow, a classification or extraction step that used to be manual. You have the domain knowledge and the codebase; what you are missing is someone who has taken this kind of feature past the demo.',
      'It is also a fit if the AI part already works and the operational part does not: no evaluation harness, no cost ceiling, no way to tell whether last week’s prompt change made things better or worse.',
      'It is a poor fit if you want a research hire, if nobody on your side can technically interview the shortlist, or if you want a supplier to own delivery. We add engineers to your team; we do not take the project.',
    ],
  },

  problem: [
    'Every CV now claims LLM experience, and most of it is a weekend tutorial with a vector database bolted on. The signal that used to separate candidates — framework names on a CV — stopped working in 2023, and the average technical screen has not caught up.',
    'The second problem is scope. Teams write a job advert for an "AI engineer" when what they need is a data engineer, or a backend engineer who is unfazed by non-determinism, or an MLOps engineer to make the thing affordable to run. Hiring for the wrong one of those costs a quarter.',
    'An engineer runs our technical interview and it is built around one system the candidate actually shipped, which is the only question a tutorial cannot answer.',
  ],

  sections: [
    {
      id: 'applied-ai-not-research',
      heading: 'Applied AI engineering, not research',
      blocks: [
        {
          kind: 'prose',
          body: [
            'The single most useful thing we can tell you before you brief us is where our network stops. We place engineers who put AI systems into production and keep them running. We do not place people who invent the models those systems call.',
            'That boundary is not modesty. Research and applied engineering are different labour markets with different candidates, different interviews and different price levels, and a recruiter who blurs them will send you an approximation of the person you asked for.',
          ],
        },
        {
          kind: 'cards',
          heading: 'The four roles we place',
          items: [
            {
              title: 'LLM application engineer',
              body: 'Builds the feature: prompt and context assembly, retrieval, tool calling, streaming, guardrails, and the evaluation harness that says whether a change helped. Usually a strong backend engineer first and a model user second.',
            },
            {
              title: 'Data engineer',
              body: 'Owns the pipelines the AI feature reads from — ingestion, chunking, embedding refresh, deduplication, lineage. Most retrieval quality problems are data problems, and this is the person who fixes them.',
            },
            {
              title: 'ML platform / MLOps engineer',
              body: 'Deployment, model and prompt versioning, monitoring, latency budgets, GPU and token cost control, reproducibility. Frequently the role a team actually needs when it thinks it needs a modelling hire.',
            },
            {
              title: 'Backend engineer on an AI product',
              body: 'The rest of the system around the model: APIs, jobs, storage, permissions, billing. On most AI products this is the majority of the code, and it is where a mis-hire is most expensive.',
            },
          ],
        },
        {
          kind: 'list',
          heading: 'Roles we will not pretend to fill',
          items: [
            'Research scientists working on novel architectures or training methods.',
            'Applied scientists whose value is a publication record and a PhD in the field.',
            'Foundation-model training and large-scale distributed training engineers.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'These people exist in Eastern Europe — Poland, Romania and Ukraine all have serious research groups — and they cost a multiple of what an applied engineer costs, on a search that takes months rather than weeks. If that is genuinely what you need, we will say so on the first call instead of sending you the closest applied engineer we have.',
          ],
        },
      ],
    },
    {
      id: 'ai-products-we-have-staffed',
      heading: 'AI products we have staffed',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Two of our named clients build AI products. Qualiwise builds an AI copilot for product quality; we filled a senior backend Python role there and the engineer signed within one week of the brief. Barça Mobile is an AI super app; the engineer we placed on that engagement worked on system architecture and CI/CD for the launch.',
            'Neither of those was an AI-engineering hire, and we are not going to present them as one. They are evidence that we can staff engineering roles inside an AI product company against a real deadline. They are not evidence that we have placed a retrieval engineer or an MLOps specialist. The day we do, that placement will be named here with the same detail as everything else on this site.',
            'Across our five most recent placements — nine engineers for SocialBee, Silvertalent, Qualiwise, Foodamigos and Innovatec — the engineer signed within one to two weeks of the brief. Roles with a narrow stack, a security-clearance requirement or a hard on-site element take longer, and we tell you that at the brief rather than at week three.',
          ],
        },
      ],
    },
    {
      id: 'ai-stacks-in-our-shortlists',
      heading: 'The stacks that actually appear in our shortlists',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Grouped by the role that uses them, because a flat list of forty tool names tells you nothing about whether a candidate can build the thing you need. Python dominates all four groups; the regional pool has depth in it going back well before the current wave.',
          ],
        },
        {
          kind: 'table',
          caption: 'AI roles, the tooling each one works in, and what we probe in the technical interview',
          columns: ['Role', 'What they work in', 'What we probe'],
          rows: [
            {
              label: 'LLM application engineer',
              cells: [
                'FastAPI, LangChain or LlamaIndex, OpenAI and Anthropic APIs, pgvector, Qdrant, Pinecone.',
                'Can they describe their retrieval design without naming a framework, and say what their evaluation set contains.',
              ],
            },
            {
              label: 'Data engineer',
              cells: [
                'Airflow or Dagster, dbt, Spark, PostgreSQL, object storage, embedding refresh jobs.',
                'How they handle a re-embed of a corpus that changed underneath them, and how they detect silent pipeline drift.',
              ],
            },
            {
              label: 'ML platform / MLOps engineer',
              cells: [
                'Kubernetes, Docker, MLflow or Weights & Biases, AWS SageMaker and Bedrock, Azure AI, Triton.',
                'Latency and cost budgets they have actually enforced, and how they rolled a model or prompt version back.',
              ],
            },
            {
              label: 'Modelling-capable engineer',
              cells: [
                'PyTorch, scikit-learn, Hugging Face Transformers, ONNX, classical ML where a model beats a prompt.',
                'When they chose a small fine-tuned model over an API call, and what the trade-off cost them.',
              ],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'We shortlist against your stack, not ours. If you have standardised on Bedrock, on a self-hosted model, or on a vector store nobody blogs about, say so in the brief — it changes who we approach, and it is much cheaper to know at the start.',
          ],
        },
      ],
    },
    {
      id: 'how-we-interview-an-ai-engineer',
      heading: 'How we interview an AI engineer',
      blocks: [
        {
          kind: 'prose',
          body: [
            'One system the candidate shipped, and then we stay there for most of the conversation. Depth on a real system is the only screen that a tutorial cannot survive, and it takes about twenty minutes to find the floor.',
          ],
        },
        {
          kind: 'list',
          heading: 'What the technical interview covers',
          items: [
            'The feature they shipped: who used it, what it replaced, and what "working" was defined as.',
            'Evaluation methodology — what the test set was, who wrote it, and how they knew a change was an improvement rather than a vibe.',
            'The production failure. Every real system has one: hallucination in a user-visible place, a retrieval miss, a cost spike, a latency cliff. What happened, what they measured, what they changed.',
            'A retrieval design explained without leaning on a framework name — chunking, ranking, what gets filtered before the model sees it, and why.',
            'Cost and latency: what the feature costs per request today, and what they did when someone asked for that number to be smaller.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'Engineers who have only assembled tutorials answer the first question well and the second one not at all. They do not reach your shortlist. Take-homes, where we use one, never exceed two hours, because senior people will not spend a weekend on one and the ones who will are not the ones you want.',
          ],
        },
      ],
    },
    {
      id: 'data-access-ip-and-confidentiality',
      heading: 'Data access, IP and confidentiality',
      blocks: [
        {
          kind: 'prose',
          body: [
            'An AI engineer touches your data by definition — that is the job. So settle access before the engagement starts rather than in week three.',
            'The default we work to: a data processing agreement in place before day one, scoped and revocable access to the systems the work actually needs, no production personal data on local machines, and access revoked on the final day of the engagement rather than whenever someone remembers.',
            'IP assignment sits in the engagement contract, and on a direct B2B engagement it is between you and the engineer’s company, which is one of the reasons that model is worth understanding before you sign. Because Moldova sits outside the EU adequacy list, transfers of personal data rely on Standard Contractual Clauses plus a transfer impact assessment. The full mechanics — permanent establishment, VAT reverse charge, the data clauses — are set out on our B2B recruitment page rather than summarised badly here.',
          ],
        },
      ],
    },
    {
      id: 'engaging-an-ai-engineer',
      heading: 'Engaging an AI engineer',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Two models, and the AI-specific version of the choice is about how settled the work is. Direct B2B recruitment suits a feature you have committed to: we source, screen and technically validate the engineer, then step out, and you contract them directly for the long term.',
            'Hourly collaboration suits the case where you are still finding out whether the feature works. The engineer joins your team and is billed for hours worked, with no fixed headcount commitment, which is the honest shape of most first AI projects.',
            'Both are explained in full on their own pages, including what each one means for contracts, invoicing and notice.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'LLM application', items: ['Python', 'FastAPI', 'LangChain', 'LlamaIndex', 'OpenAI API', 'Anthropic API'] },
    { group: 'Retrieval', items: ['pgvector', 'Qdrant', 'Pinecone', 'Elasticsearch'] },
    { group: 'Modelling', items: ['PyTorch', 'Hugging Face', 'scikit-learn', 'ONNX'] },
    { group: 'Data platform', items: ['Airflow', 'Dagster', 'dbt', 'Spark', 'PostgreSQL'] },
    { group: 'ML infrastructure', items: ['Kubernetes', 'Docker', 'MLflow', 'AWS SageMaker', 'AWS Bedrock', 'Azure AI'] },
  ],

  seniorities: [
    {
      label: 'Senior applied AI engineer (5–12 years)',
      detail:
        'The bulk of what we place. Usually five or more years of software engineering with the last one to three on AI systems. The test is a shipped, used, measured feature — not the length of the AI section on the CV.',
    },
    {
      label: 'ML platform / MLOps engineer',
      detail:
        'Deployment, monitoring, reproducibility and cost. Overlaps heavily with the DevOps pool, so we often shortlist the same person against both briefs and let you choose the framing.',
    },
    {
      label: 'Lead / founding AI engineer',
      detail:
        'Sets the technical direction for the AI surface of a product and still writes the code. Rarer, slower to source, and worth briefing us on weeks earlier than you think.',
    },
    {
      label: 'Mid-level',
      detail:
        'Placed only where you already have a senior engineer leading the work. AI features fail quietly, and a mid-level engineer without review is how you find out six weeks late.',
    },
  ],

  coverage: {
    summary:
      'Moldova is our contracting base, but applied-AI depth there is thin and we will not pretend otherwise — for AI roles we source across Romania, Poland, Ukraine and the Baltics as well, where density is far higher. All of it sits in Eastern European Time, UTC+2, so a Western European team gets a full overlapping working day.',
    countries: ['Moldova', 'Romania', 'Poland', 'Ukraine', 'Lithuania', 'Estonia'],
  },

  // Role page — Part 0 keeps BLOCK B and BLOCK C off the role pages; we link out instead.
  engagementModels: [],

  // ONE entry, on purpose. See decision 2 in the file header before adding a second.
  evidence: [
    {
      client: 'Qualiwise',
      role: 'Senior backend developer, Python',
      count: 1,
      outcome:
        'Signed within one week of the brief. Qualiwise builds an AI copilot for product quality, so this is a backend placement inside an AI product company — not an AI-engineering hire, and we do not present it as one.',
      href: '/case-studies/qualiwise/',
    },
  ],

  faqs: [
    {
      question: 'Do you place research scientists or applied engineers?',
      answer:
        'Applied engineers. The people we place ship LLM-backed features, retrieval pipelines, evaluation harnesses and the infrastructure underneath them. If you need someone training foundation models or publishing research, that is a different market at several times the cost, and we will tell you rather than send you an approximation.',
    },
    {
      question: 'What AI stacks do your engineers actually work in?',
      answer:
        'Predominantly Python: FastAPI services, PyTorch where models are trained, LangChain or LlamaIndex where orchestration is needed, and pgvector, Qdrant or Pinecone for retrieval, against OpenAI and Anthropic APIs. On the platform side, Airflow or Dagster, Kubernetes, and AWS Bedrock or SageMaker. We shortlist against your stack, not ours.',
    },
    {
      question: 'How do you assess an AI engineer when every CV claims LLM experience?',
      answer:
        'We ask about one system they shipped and stay there. What did evaluation look like, what was the failure mode in production, what did they measure, what did they change afterwards. Engineers who have only assembled tutorials cannot answer the second question, and they do not reach your shortlist.',
    },
    {
      question: 'Can an AI engineer work with our proprietary data?',
      answer:
        'Yes, under a data processing agreement with scoped, revocable access and no production personal data on local machines. Because Moldova sits outside the EU adequacy list, transfers rely on Standard Contractual Clauses and a transfer impact assessment. The full mechanics are on our B2B recruitment page.',
    },
    {
      question: 'Is there enough AI talent in Moldova specifically?',
      answer:
        'Not in volume, and we will not pretend otherwise. Moldova’s applied-AI pool is small, so for AI roles we source across Romania, Poland, Ukraine and the Baltics as well, where the density is far higher. Moldova is our contracting base and our sourcing depth, not a limit on where we look.',
    },
    {
      question: 'Do you place MLOps and ML platform engineers?',
      answer:
        'Yes, and it is often the role a team actually needs. Model quality rarely blocks a launch; deployment, monitoring, cost control and reproducibility do. These engineers overlap heavily with the DevOps pool, so we frequently shortlist the same person against both briefs and let you choose the framing.',
    },
  ],

  internalLinks: [
    { anchor: 'backend developers', href: '/hire-backend-developers/' },
    { anchor: 'data handling under a B2B contract', href: '/b2b-engineer-recruitment/' },
    { anchor: 'hourly AI capacity', href: '/hourly-engineering-talent/' },
    { anchor: 'where our engineers are based', href: '/technical-recruitment-moldova/' },
    { anchor: 'the Qualiwise engagement', href: '/case-studies/qualiwise/' },
    { anchor: 'how we hire engineers across Eastern Europe', href: '/hire-software-developers-eastern-europe/' },
  ],

  cta: {
    heading: 'Describe the AI feature you are shipping',
    body: 'Bring the feature, not the job title. Half the time the role you need is not the one you were about to post.',
    primary: {
      label: 'Book A Meeting',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: { label: 'Contact us', href: '/contact/' },
  },

  schemaTypes: ['Service'],
  serviceType: 'AI engineer recruitment',
}
