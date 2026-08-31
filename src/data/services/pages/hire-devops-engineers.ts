/**
 * `/hire-devops-engineers/` — DECISIONS.md D1 row 10, `draft: true`.
 *
 * Content source: 02-page-content.md §8. Claim wording: 06-claims-measurement.md.
 *
 * ## Decisions taken here, and what has to change before this page publishes
 *
 * 1. **`draft: true`, but this is the closest of the three to publishable.** The
 *    Barça Mobile engagement is a genuinely DevOps-scoped placement — system
 *    architecture and CI/CD for a consumer launch with a fixed external date —
 *    and §8 is right that no competitor's Eastern Europe DevOps page has a named
 *    consumer launch behind it. What is missing is only the second one. D1.1
 *    wants two named placements and there is one.
 *
 * 2. **`evidence` carries ONE entry.** `assertServicePage` refuses `draft: false`
 *    under two, which is the intended behaviour: the guard blocks the flip, not
 *    this comment. Do not add the Qualiwise or SocialBee placements to reach the
 *    count — they are backend and full-stack hires and they belong to the pages
 *    that sell those roles.
 *
 * 3. **To publish:** one more named DevOps, SRE or platform placement in
 *    `evidence`, then `draft: false` here AND in `src/data/routes.ts`. The
 *    ML-platform overlap noted in the seniorities block is the likeliest source —
 *    an MLOps placement counts here as well as on the AI page.
 *
 * 4. **The downloads figure is cut, not softened.** D7 and 06-claims row 10: the
 *    "1.5M downloads in the first three months" line has no public linkable source
 *    and is a client product metric, not a TalentSync result. §8 permits it only
 *    with a source, so this page describes launch scale without a number. Every
 *    sentence about Barça Mobile states the ENGINEER's scope; none of them implies
 *    TalentSync delivered the platform.
 *
 * 5. **The §8 meta description is rewritten.** It ended "Shortlist in days, not
 *    weeks" — a bare speed claim, which D7 forbids and 06-claims row 7 puts behind
 *    a substantiated SLA. The replacement carries the stack instead. No
 *    `{{TOKEN}}` is used: the export validator fails on any that survive.
 *
 * 6. **`internalLinks` point only at indexed routes.** §8's link to
 *    `/hire-ai-engineers/` is dropped — a draft page must receive no inbound
 *    links, and that includes links from the other drafts.
 */

import type { ServicePage } from '../types'

export const hireDevopsEngineers: ServicePage = {
  slug: 'hire-devops-engineers',
  draft: true,
  label: 'DevOps Engineers',
  metaTitle: 'Hire DevOps Engineers in Eastern Europe | TalentSync',
  metaDescription:
    'Hire DevOps, SRE and platform engineers from Eastern Europe: CI/CD, Terraform, Kubernetes, AWS and Azure, on direct B2B or hourly part-time terms.',
  h1: 'Hire DevOps Engineers in Eastern Europe',

  answerParagraph:
    'TalentSync places DevOps, platform and SRE engineers from Eastern Europe who own CI/CD, infrastructure-as-code, observability and cloud cost. Our DevOps engineer on the Barça Mobile engagement worked on system architecture and CI/CD for a consumer launch. Engineers engage on a direct B2B contract with you or hourly, including part-time, which suits teams without full-time platform work.',

  whoFor: {
    audience: 'Product engineering teams that ship faster than their pipeline allows',
    body: [
      'Teams of roughly ten to sixty engineers where deployment has quietly become one person’s second job. The symptoms are consistent: releases cluster on Tuesday afternoons because nobody wants to deploy before a weekend, the staging environment drifted from production a year ago, and the one person who understands the Terraform state is on holiday.',
      'Also teams with a launch in front of them — a date set by marketing, a partner or an app store — who need someone who has shipped under a deadline that cannot move.',
      'It is a poor fit if you want a managed service provider to own your infrastructure. We place an engineer into your team, under your architecture decisions; we do not take over the estate.',
    ],
  },

  problem: [
    'DevOps hiring goes wrong at the job description, before anyone is interviewed. Three genuinely different jobs — DevOps, SRE, platform engineering — get written into one advert, and the shortlist that comes back is a compromise between all three.',
    'The second failure is scale mismatch. A team of twenty hires a platform engineer from a company of eight hundred, and gets an internal developer platform nobody asked for while deploys are still scary.',
    'The third is the part-time blind spot. Most product teams under thirty engineers have a full-time platform problem and a part-time platform workload, so they either over-hire or keep not hiring. There is a third answer and almost nobody offers it.',
  ],

  sections: [
    {
      id: 'devops-sre-platform',
      heading: 'DevOps, SRE and platform engineering are not the same hire',
      blocks: [
        {
          kind: 'prose',
          body: [
            'These three titles are used interchangeably in job adverts and they describe three different jobs, with three different candidate pools. Getting the distinction right before you write the brief is the single highest-leverage thing you can do, and it costs you one conversation.',
            'The quickest route to the right answer is to describe the symptom rather than the title. Each of these roles has a symptom that points to it.',
          ],
        },
        {
          kind: 'table',
          caption: 'The three roles, what each one owns, and the symptom that points to it',
          columns: ['Role', 'What it actually owns', 'The symptom that points to it'],
          rows: [
            {
              label: 'DevOps engineer',
              cells: [
                'Making shipping safe and repeatable: pipelines, environments, infrastructure-as-code, release mechanics, the boring reliability of the path from commit to production.',
                '"Deploys are scary." Releases are batched, manual steps survive in a wiki page, and rollback is a plan rather than a button.',
              ],
            },
            {
              label: 'Site reliability engineer',
              cells: [
                'Reliability as a measured target: SLOs and error budgets, alerting that means something, the incident process, capacity and load, post-incident review.',
                '"We page too much." Alerts fire nightly, most are ignored, and nobody can say what last quarter’s availability actually was.',
              ],
            },
            {
              label: 'Platform engineer',
              cells: [
                'Internal tooling other teams build on: golden paths, service templates, self-service environments, shared observability and policy.',
                '"Every team builds its own pipeline." The same problem is being solved in four repositories, four slightly different ways.',
              ],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'As a rough guide: small teams need the first, teams with real uptime commitments to customers need the second, and teams above roughly forty engineers start to need the third. Hiring the third before you have the first is the most common and most expensive version of this mistake.',
            'Tell us the symptom on the first call and we will tell you which of the three we are sourcing, and how many days a week of it you need.',
          ],
        },
      ],
    },
    {
      id: 'the-barca-mobile-launch',
      heading: 'The Barça Mobile launch',
      blocks: [
        {
          kind: 'prose',
          body: [
            'The DevOps engineer we placed on the Barça Mobile engagement worked on system architecture and CI/CD for the launch. That is the engineer’s scope, stated precisely: TalentSync placed an engineer into the team, we did not build the product, and we are not going to describe someone else’s platform as our delivery.',
            'What made it a useful proving ground is the shape of the work rather than any headline number. A consumer launch tied to a named brand has a date set outside engineering, which changes every technical decision underneath it.',
          ],
        },
        {
          kind: 'list',
          heading: 'What launch-scale DevOps means concretely',
          items: [
            'A release cadence that has to hold under a hard external date, with the last safe deployment window agreed in advance rather than discovered.',
            'Rollback designed before launch day, tested, and fast enough that using it is not itself a decision requiring a meeting.',
            'Load headroom planned for a first-day curve that looks nothing like organic growth, plus the ability to tell saturation from a bug at two in the morning.',
            'Environment parity that actually holds, because the first hour after launch is the worst possible time to discover a config difference.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'The same engagement covered the MVNO integration between Barça Mobile and the Orange network — carrier-side systems with their own release calendar and their own failure modes. Engineers with telecom or regulated-integration backgrounds are rarer than general platform engineers and take longer to source, so brief us earlier when that is the requirement.',
            'If you have a launch date, tell us the date before you tell us the stack. It changes who we approach.',
          ],
        },
      ],
    },
    {
      id: 'tooling-we-screen-for',
      heading: 'Tooling we screen for',
      blocks: [
        {
          kind: 'prose',
          body: [
            'Grouped by function, with a note on how deep the regional pool actually is for each. The second column is the part most vendor pages leave out, and it is the part that determines how long your search takes.',
          ],
        },
        {
          kind: 'table',
          caption: 'Tooling by function, and how common each is in the Eastern European pool',
          columns: ['Function', 'What we screen for', 'Depth in the regional pool'],
          rows: [
            {
              label: 'CI/CD',
              cells: [
                'GitHub Actions, GitLab CI, Jenkins, Argo CD, Azure Pipelines.',
                'Deep. GitLab CI is unusually strong in the region; Jenkins experience is common but often legacy, which matters if you are migrating off it.',
              ],
            },
            {
              label: 'Infrastructure as code',
              cells: [
                'Terraform, OpenTofu, Ansible, CloudFormation, Pulumi.',
                'Terraform is near-universal at senior level. Pulumi is rare and adds weeks to a search.',
              ],
            },
            {
              label: 'Orchestration',
              cells: [
                'Kubernetes, Helm, ECS, Nomad, service meshes.',
                'Kubernetes is standard. Nomad and service-mesh depth are genuinely scarce — expect a longer search or a plan to train.',
              ],
            },
            {
              label: 'Cloud',
              cells: [
                'AWS, Azure, GCP, plus Hetzner and OVH for cost-sensitive workloads.',
                'AWS is the most common. Azure is strong where enterprise and .NET work dominates. GCP is noticeably thinner.',
              ],
            },
            {
              label: 'Observability',
              cells: [
                'Prometheus, Grafana, Datadog, OpenTelemetry, Loki, ELK.',
                'Good depth on the open-source side. OpenTelemetry experience skews to engineers who have run a migration to it.',
              ],
            },
            {
              label: 'Secrets and policy',
              cells: [
                'Vault, cloud-native secret managers, OPA, image scanning, SBOM and supply-chain controls.',
                'Thinner, and worth asking about explicitly if you have compliance obligations rather than assuming it comes with the seniority.',
              ],
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'We match against the stack you run rather than proposing a migration in week one. If part of your estate is unfashionable, that is normal and it is not a screening problem — an engineer who has kept an old pipeline alive has usually seen more failure modes than one who has only worked greenfield.',
          ],
        },
      ],
    },
    {
      id: 'part-time-devops',
      heading: 'Part-time DevOps: when one day a week is the right answer',
      blocks: [
        {
          kind: 'prose',
          body: [
            'A product team of ten to thirty engineers usually has a full-time platform problem and a part-time platform workload. Hiring full-time for it means either paying a senior engineer to be under-used, or watching them invent work to fill the week — and inventing platform work is how you end up with an internal platform nobody asked for.',
            'One or two fixed days a week, with a named engineer who stays with you, covers a surprising amount. The constraint is that it has to be predictable: the same days, the same person, agreed in advance.',
          ],
        },
        {
          kind: 'cards',
          heading: 'What one to two days a week can and cannot cover',
          items: [
            {
              title: 'Realistically owned',
              body: 'Pipelines and release mechanics, infrastructure-as-code and its drift, alerting that is worth waking up for, cloud cost, access and secrets hygiene, and the runbooks your team reads at 3am.',
            },
            {
              title: 'Possible with planning',
              body: 'A bounded migration — one cloud account, one cluster upgrade, one CI platform move — scheduled across several weeks with your team taking the review load rather than the keyboard.',
            },
            {
              title: 'Not covered, and we will say so',
              body: 'A 24/7 on-call rota, incident command during a multi-hour outage, or an immediate response inside your working hours on the four days they are not with you. One person is not a rota.',
            },
          ],
        },
        {
          kind: 'prose',
          body: [
            'This is the engagement most often quoted hourly, because the shape of the work is a known number of days rather than a headcount commitment. Teams frequently start at two days a week during a migration and settle at one.',
          ],
        },
      ],
    },
    {
      id: 'production-access-for-a-contract-engineer',
      heading: 'Production access for a contract engineer',
      blocks: [
        {
          kind: 'prose',
          body: [
            'This is the objection that kills these engagements, usually raised late by someone who was not in the hiring conversation. Settle it in the contract, before the engineer starts.',
          ],
        },
        {
          kind: 'list',
          heading: 'What we recommend you require, in writing',
          items: [
            'Least-privilege access scoped to the work in front of the engineer, granted per system rather than per person, and reviewed when the scope changes.',
            'A documented break-glass procedure — who approves elevated access, for how long, and what gets logged when it is used.',
            'Audit logging on for the engineer’s accounts from day one, with the logs going somewhere the engineer cannot edit.',
            'Named accounts only. No shared credentials, no team logins, no exceptions for the contractor because provisioning is slow.',
            'Revocation on the final day of the engagement, as a checklist item owned by someone on your side rather than an intention.',
            'The confidentiality, data processing and IP terms in the engagement contract, not in an email thread.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'An engineer who expects blanket root access on day one is a signal, not a convenience. The senior candidates in our shortlists usually ask about your access model before you ask about theirs, and treat a tight one as evidence the team is worth joining.',
          ],
        },
      ],
    },
    {
      id: 'how-we-vet-a-devops-engineer',
      heading: 'How we vet a DevOps engineer',
      blocks: [
        {
          kind: 'prose',
          body: [
            'An incident walkthrough, not a quiz. Trivia about a flag in a YAML file is searchable; how someone behaved during an outage they owned is not.',
          ],
        },
        {
          kind: 'list',
          heading: 'What the technical interview covers',
          items: [
            'One outage they personally owned: what the first five minutes looked like, who they told, and what they did before they understood the cause.',
            'What the actual fix was, as opposed to the mitigation — and how long the gap between the two lasted.',
            'What changed afterwards: the alert, the runbook, the guardrail, the deleted step. An incident that changed nothing was not owned.',
            'A short infrastructure-as-code review — reading someone else’s Terraform and saying what will break, which is most of the job.',
            'A rollback question. What their rollback path was, whether it was tested, and when they last used it in anger.',
          ],
        },
        {
          kind: 'prose',
          body: [
            'We reject candidates who cannot describe a rollback, and candidates whose incident story is entirely about the previous team’s mistakes. Neither is a knowledge gap; both predict how the person behaves at 3am, which is when this hire matters.',
            'An engineer runs this interview, not a recruiter.',
          ],
        },
      ],
    },
  ],

  stacks: [
    { group: 'CI/CD', items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Argo CD'] },
    { group: 'Infrastructure as code', items: ['Terraform', 'OpenTofu', 'Ansible', 'Pulumi'] },
    { group: 'Orchestration', items: ['Kubernetes', 'Helm', 'Docker', 'ECS'] },
    { group: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'Hetzner'] },
    { group: 'Observability', items: ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry'] },
    { group: 'Security and policy', items: ['Vault', 'OPA', 'Trivy', 'SBOM tooling'] },
  ],

  seniorities: [
    {
      label: 'Senior DevOps / platform engineer (5–12 years)',
      detail:
        'The bulk of what we place. The test is ownership: has this person been the one accountable when a deploy failed, and did the system get better afterwards rather than just fixed.',
    },
    {
      label: 'Site reliability engineer',
      detail:
        'Screened differently — SLOs they set and defended, an incident process they ran, and a pager they actually carried. Smaller pool, and worth briefing us on early.',
    },
    {
      label: 'ML platform / MLOps engineer',
      detail:
        'Substantial overlap with this pool. Deployment, monitoring, reproducibility and GPU or token cost. We often shortlist the same person against a DevOps brief and an ML platform brief.',
    },
    {
      label: 'Part-time senior',
      detail:
        'A senior engineer on one or two fixed days a week. The same seniority bar, a smaller pool, because it suits engineers who deliberately run a portfolio of clients.',
    },
  ],

  coverage: {
    summary:
      'Engineers are sourced across Eastern Europe and are based mainly in Moldova and Romania, with Poland, Bulgaria and Ukraine in the wider pool. Eastern European Time is UTC+2, so a Western European team gets a complete overlapping working day — which matters more for platform work than for most roles, because incidents do not wait for a handover.',
    countries: ['Moldova', 'Romania', 'Poland', 'Bulgaria', 'Ukraine'],
  },

  // Role page — Part 0 keeps BLOCK B and BLOCK C off the role pages; we link out instead.
  engagementModels: [],

  // ONE entry, on purpose. See decision 2 in the file header before adding a second.
  evidence: [
    {
      client: 'Barça Mobile',
      role: 'DevOps engineer, system architecture and CI/CD',
      count: 1,
      outcome:
        'Worked on system architecture and CI/CD for the launch, and on the MVNO integration with the Orange network. That is the engineer’s scope; TalentSync placed the engineer and did not deliver the platform.',
      href: '/case-studies/barca-mobile/',
    },
  ],

  faqs: [
    {
      question: 'What is the difference between a DevOps engineer, an SRE and a platform engineer?',
      answer:
        'Roughly: a DevOps engineer makes shipping safe and repeatable, an SRE owns reliability targets and the incident process, and a platform engineer builds the internal tooling other teams use. Small teams need the first, teams with real uptime commitments need the second, and teams above roughly forty engineers need the third.',
    },
    {
      question: 'Will a contract DevOps engineer get production access?',
      answer:
        'That is your decision and it should be deliberate. Our default is least-privilege access scoped to the work, a documented break-glass procedure, audit logging on, and revocation on the final day of the engagement. Engineers who expect blanket root access on day one are a signal, not a convenience.',
    },
    {
      question: 'Do you place engineers who have handled a launch spike?',
      answer:
        'Yes. On the Barça Mobile engagement the DevOps engineer we placed worked on system architecture and CI/CD for a consumer launch with a fixed external date. Launch work is a distinct screen: we look for rollback design, load headroom planning and experience shipping under a deadline that cannot move.',
    },
    {
      question: 'Which cloud and tooling experience should we expect?',
      answer:
        'AWS is the most common in the regional pool, Azure is strong where enterprise and .NET work dominates, GCP is thinner. Terraform and Kubernetes are near-universal at senior level; Pulumi, Nomad and service meshes are rarer and lengthen a search. We match to your stack rather than proposing a migration.',
    },
    {
      question: 'Can one part-time DevOps engineer cover a small product team?',
      answer:
        'Often yes. A team of ten to thirty engineers usually has a full-time platform problem but a part-time platform workload, and one or two days a week can own pipelines, infrastructure-as-code and alerting. It cannot cover a 24/7 on-call rota, and we will not sell you that it can.',
    },
    {
      question: 'How do you vet a DevOps engineer?',
      answer:
        'We walk through an incident they personally owned: what the first five minutes looked like, what they actually did, what the fix was, and what changed afterwards. Then a short infrastructure-as-code review. Candidates who cannot describe a rollback, or who blame the previous team, do not reach your shortlist.',
    },
  ],

  internalLinks: [
    { anchor: 'backend developers', href: '/hire-backend-developers/' },
    { anchor: 'part-time and hourly engagement', href: '/hourly-engineering-talent/' },
    { anchor: 'contracting the engineer directly', href: '/b2b-engineer-recruitment/' },
    { anchor: 'where our engineers are based', href: '/technical-recruitment-moldova/' },
    { anchor: 'the Eastern European market', href: '/tech-recruitment-eastern-europe/' },
    { anchor: 'the Barça Mobile engagement', href: '/case-studies/barca-mobile/' },
  ],

  cta: {
    heading: 'Tell us what breaks when you deploy',
    body: 'Describe the symptom. We will tell you on the call whether you need DevOps, SRE or platform — and how many days a week.',
    primary: {
      label: 'Book A Meeting',
      href: 'https://calendly.com/talentsync-meeting/30min',
      external: true,
    },
    secondary: { label: 'Contact us', href: '/contact/' },
  },

  schemaTypes: ['Service'],
  serviceType: 'DevOps engineer recruitment',
}
