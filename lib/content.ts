/**
 * Single source of truth for every word on the page.
 * Derived from resume.md — keep them in sync when the resume changes.
 */

export const profile = {
  name: "Mason Keresty",
  role: "Senior Software Engineer",
  focus: ["AI", "Cloud Security", "Platform Engineering"],
  location: "Princeton Junction, NJ",
  region: "us-gov-east-1",
  email: "kerestymason@gmail.com",
  github: "https://github.com/mkeresty",
  linkedin: "https://www.linkedin.com/in/masonkeresty",
  resume: "/Mason-Keresty-Resume.pdf",
  thesis:
    "I build AI systems and the secure cloud platforms they run on — for federal, defense, and research teams who have to prove the whole thing is safe before it ships.",
} as const;

/* ------------------------------------------------------------------ */
/* Selected work                                                       */
/* ------------------------------------------------------------------ */

export type Project = {
  id: string;
  title: string;
  org: string;
  period: string;
  kind: string;
  summary: string;
  details: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    id: "dast",
    title: "Authenticated DAST orchestration",
    org: "Knox Systems",
    period: "2026",
    kind: "distributed systems · appsec",
    summary:
      "Continuous authenticated security scanning across an API, two web applications, and the Kubernetes infrastructure under them — built so that a scan can only ever run against a target someone explicitly authorized, for exactly as long as that authorization lasts.",
    details: [
      "An idempotent Redis and BullMQ orchestrator converts immutable authorization snapshots into Kubernetes Jobs, re-adopts in-flight scans after a restart, and refuses to dispatch at all when queue or cluster state can't be verified.",
      "Distributed admission control with per-target mutual exclusion, global and per-tenant capacity limits, and weighted scan costs. Scope and expiry are enforced at dispatch, with an emergency kill switch and reconciliation for authorization windows that lapse mid-scan.",
      "Scan pods are confined to a dedicated NAT gateway and static egress address behind AWS Network Firewall, with VPC endpoints and NetworkPolicies that deny private ranges and instance metadata outright.",
      "Vulnerabilities only auto-close on positive evidence of surface coverage — absence of a finding is never treated as proof of a fix.",
    ],
    stack: ["TypeScript", "Bun", "Kubernetes", "BullMQ", "Redis", "OWASP ZAP", "AWS Network Firewall"],
  },
  {
    id: "remediation",
    title: "AI remediation workflow",
    org: "Knox Systems",
    period: "2026",
    kind: "llm systems · full-stack",
    summary:
      "An LLM proposes infrastructure fixes for cloud security findings; engineers review, revise, and approve them; the platform executes and streams progress back. The interesting part is everything that keeps a language model from being trusted more than it has earned.",
    details: [
      "A planning pipeline with cloud-provider-specific retrieval that groups related findings by affected resource, validates against schema before anything is persisted, and tracks provenance separately for deterministic rule matches and model-generated content.",
      "Plans route through multi-stage approval with full version history, so every revision between the model's first draft and what actually ran is on the record.",
      "Execution surfaces as a live step-by-step timeline in the browser over Server-Sent Events.",
    ],
    stack: ["NestJS", "TypeScript", "Claude", "Nuxt 3", "PostgreSQL", "Prisma", "SSE"],
  },
  {
    id: "evals",
    title: "Agent evaluation harness",
    org: "Knox Systems",
    period: "2026",
    kind: "llm evaluation · ci",
    summary:
      "Automated quality measurement for the remediation agent. It generates its own test scenarios, runs the agent headlessly, and grades the output with three independent frontier models rather than trusting any single judge.",
    details: [
      "Claude, Gemini, and GPT each judge independently. Numerical results aggregate by median and categorical ones by majority vote, which keeps one model's bad day from moving the score.",
      "Quality dimensions are tracked across releases, and a fast evaluation subset runs on every push.",
      "Extended to analyze failure patterns, validate candidate patches in a sandbox, and revert changes automatically when evaluation results regress.",
    ],
    stack: ["TypeScript", "Claude", "Gemini", "GPT", "GitHub Actions"],
  },
  {
    id: "il5",
    title: "DoD IL5 accreditation baseline",
    org: "Knox Systems",
    period: "2025—2026",
    kind: "infrastructure · compliance",
    summary:
      "Infrastructure-as-code delivery supporting a managed customer's DoD IL5 accreditation across two AWS GovCloud accounts, starting from a gap analysis against FedRAMP High and the DISA Cloud Computing SRG.",
    details: [
      "Partition-aware addressing, FIPS node images and PrivateLink endpoints, a private Kubernetes API, control-plane audit logging, and customer-managed encryption throughout.",
      "A preventive guardrail library — 13 service control policies and one resource control policy, tiered across FedRAMP Moderate, FedRAMP High/IL4, and IL5 — mapped statement by statement to NIST 800-53r5 and DoD CC SRG controls, with the gaps that need detective or procedural controls documented rather than papered over.",
      "Terraform runs inside account-local CodeBuild so credentials, state, and resource identifiers never leave the accreditation boundary. Plan and apply are split across separate projects and IAM roles, which makes required-reviewer approval a precondition for even obtaining apply credentials.",
      "Policy-as-code checks fail the deployment preview when a proposed change violates the accreditation baseline.",
    ],
    stack: ["Terraform", "Terragrunt", "AWS GovCloud", "EKS", "CodeBuild", "IAM", "Argo CD"],
  },
  {
    id: "drip",
    title: "DRIP — duplicate record identification",
    org: "Lockheed Martin",
    period: "2024—2025",
    kind: "machine learning · search",
    summary:
      "A platform that finds duplicate records across systems that were never designed to talk to each other, using transformer embeddings for semantic comparison instead of string matching.",
    details: [
      "Modular ingestion pipelines for SQL, Jira, and Word records, with transformer models integrated through Eland so comparison happens inside Elasticsearch.",
      "Asynchronous processing on Celery and Redis, with a Next.js front end over a FastAPI service.",
      "Its components were later repurposed into centralized Elastic monitoring for Jenkins pipelines, adding alerting, error tracing, and root-cause diagnostics.",
    ],
    stack: ["Next.js", "FastAPI", "Elasticsearch", "Eland", "Celery", "Redis", "Kibana"],
  },
];

/* ------------------------------------------------------------------ */
/* Career, rendered as a plan                                          */
/* ------------------------------------------------------------------ */

export type Op = "add" | "change" | "destroy";

export type Change = {
  op: Op;
  resource: string;
  detail: string;
};

export type Role = {
  org: string;
  title: string;
  period: string;
  place: string;
  changes: Change[];
};

export const roles: Role[] = [
  {
    org: "Knox Systems",
    title: "Senior Software Engineer, AI",
    period: "2026 — present",
    place: "remote",
    changes: [
      {
        op: "add",
        resource: "ai.remediation_workflow",
        detail:
          "Reviewable LLM fix plans, multi-stage approval with version history, live execution timeline.",
      },
      {
        op: "add",
        resource: "ai.planning_pipeline",
        detail:
          "Provider-specific retrieval, findings grouped by resource, schema validation before persistence, provenance tracking.",
      },
      {
        op: "add",
        resource: "ai.eval_harness",
        detail:
          "Generated scenarios, headless agent runs, three independent model judges, median and majority-vote consensus.",
      },
      {
        op: "add",
        resource: "dast.scan_orchestrator",
        detail:
          "Idempotent BullMQ dispatch to Kubernetes Jobs, restart re-adoption, fail-closed on unverifiable state.",
      },
      {
        op: "add",
        resource: "dast.admission_control",
        detail:
          "Per-target mutual exclusion, global and per-tenant capacity limits, weighted scans, kill switch.",
      },
      {
        op: "add",
        resource: "findings.unified_model",
        detail:
          "Cloud-posture and endpoint vendor data merged behind one model with stable cross-vendor identities and an ownership decision tree.",
      },
      {
        op: "change",
        resource: "agent.credentials",
        detail:
          "Mounted secrets → pod-startup workload identity exchange issuing short-lived, job-scoped tokens held in memory.",
      },
      {
        op: "change",
        resource: "frontend.findings_workspace",
        detail:
          "Virtualized infinite scroll, debounced requests, visibility-aware polling, shared Tailwind and shadcn-vue design language.",
      },
      {
        op: "destroy",
        resource: "app.upload_size_ceiling",
        detail: "Evidence uploads converted from in-memory buffering to streaming.",
      },
      {
        op: "destroy",
        resource: "ci.personal_access_tokens",
        detail:
          "Replaced with a GitHub App. Third-party credentials moved to Secrets Manager, stored MFA secrets encrypted with KMS.",
      },
    ],
  },
  {
    org: "Knox Systems",
    title: "Senior DevOps Engineer",
    period: "2025 — 2026",
    place: "remote",
    changes: [
      {
        op: "add",
        resource: "gov.il5_baseline",
        detail:
          "Two GovCloud accounts to DoD IL5: partition-aware addressing, FIPS images, PrivateLink, private Kubernetes API, CMK encryption.",
      },
      {
        op: "add",
        resource: "gov.guardrail_library",
        detail:
          "13 SCPs and one RCP tiered across FedRAMP Moderate, High/IL4, and IL5 — mapped to NIST 800-53r5 and DoD CC SRG.",
      },
      {
        op: "add",
        resource: "tf.module_library",
        detail:
          "~20 reusable modules: networking, VPC peering, EKS, RDS, registries and mirroring, audit, backup, DNS, edge, KMS, storage, logging.",
      },
      {
        op: "add",
        resource: "falcon.self_healing_deploy",
        detail:
          "Reactive CrowdStrike sensor install and self-heal across EKS in 15+ accounts, SSM distribution, Firehose log delivery.",
      },
      {
        op: "add",
        resource: "gitops.app_of_apps",
        detail:
          "Argo CD with project-level resource and destination guardrails over Istio, Karpenter, Kyverno, External Secrets, OTel, ClickHouse, Dagster.",
      },
      {
        op: "add",
        resource: "onboarding.bootstrap",
        detail:
          "One workflow provisions Terraform state, IAM roles, GitHub Environments, and account config. OIDC throughout.",
      },
      {
        op: "change",
        resource: "tf.apply_pipeline",
        detail:
          "Plan and apply split across separate CodeBuild projects and IAM roles — reviewer approval became a precondition for apply credentials.",
      },
      {
        op: "destroy",
        resource: "ci.out_of_boundary_execution",
        detail:
          "Terraform moved into account-local CodeBuild so credentials, state, and identifiers stay inside the accreditation boundary.",
      },
    ],
  },
  {
    org: "Lockheed Martin",
    title: "Developer · DevSecOps Engineer",
    period: "2024 — 2025",
    place: "Moorestown, NJ",
    changes: [
      {
        op: "add",
        resource: "drip.platform",
        detail:
          "ML duplicate-record identification on Next.js, FastAPI, Elasticsearch, and transformer embeddings via Eland.",
      },
      {
        op: "add",
        resource: "elastic.pipeline_monitoring",
        detail:
          "Centralized Jenkins observability with alerting, error tracing, and root-cause diagnostics.",
      },
      {
        op: "add",
        resource: "search.internal_engine",
        detail:
          "Forked SearxNG into an internal search across engineering systems and Confluence, classified and unclassified.",
      },
      {
        op: "add",
        resource: "ci.gitlab_templates",
        detail:
          "Reusable templates for container builds, security scans, and automated testing. Training and workshops for 20+ teams.",
      },
      {
        op: "change",
        resource: "scm.source_control",
        detail:
          "3,000+ repositories migrated Bitbucket → GitLab: feasibility, tooling, Jenkins conversion, credentials, validation, rollout.",
      },
      {
        op: "change",
        resource: "build.infrastructure",
        detail:
          "RHEL 6 → RHEL 8 with updated Maven tooling, Ansible-based checks, and modular build patterns.",
      },
    ],
  },
  {
    org: "Lockheed Martin",
    title: "Developer · Systems Engineer",
    period: "2022 — 2024",
    place: "Moorestown, NJ",
    changes: [
      {
        op: "add",
        resource: "ecsel.web_platform",
        detail:
          "Shipboard inventory system rebuilt on Next.js and RDS with RBAC, session management, and real-time sync for controlled configuration data.",
      },
      {
        op: "add",
        resource: "autocad.extraction_tool",
        detail:
          "Converted drawing metadata into editable Excel templates, cutting manual work per ship configuration.",
      },
      {
        op: "destroy",
        resource: "ecsel.legacy_system",
        detail: "Retired the legacy shipboard inventory application it replaced.",
      },
    ],
  },
  {
    org: "STF Technologies",
    title: "Research Engineer — Nuclear Rheology",
    period: "2020 — 2022",
    place: "Newark, DE",
    changes: [
      {
        op: "add",
        resource: "rheology.neutron_sample_env",
        detail:
          "High-pressure, low-temperature sample chambers under neutron-transparency constraints, validated with 3D CAD and FEA. Patent-backed.",
      },
      {
        op: "add",
        resource: "lab.instrument_control",
        detail:
          "LabVIEW interfaces and Python automation for motion control, synchronized data collection, and beamline integration.",
      },
      {
        op: "add",
        resource: "rheometer.right_angle_gearbox",
        detail:
          "Compact gearbox designed to minimize backlash, friction, and parasitic torque.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Capabilities                                                        */
/* ------------------------------------------------------------------ */

export type Capability = {
  domain: string;
  lead: string;
  items: string[];
};

export const capabilities: Capability[] = [
  {
    domain: "Languages",
    lead: "TypeScript and Python day to day.",
    items: ["TypeScript", "Python", "JavaScript", "Java", "C#", "Groovy", "Bash", "HCL", "YAML"],
  },
  {
    domain: "AI & Search",
    lead: "Agent systems, and the harnesses that prove they work.",
    items: [
      "Anthropic Claude",
      "Vertex AI",
      "Gemini",
      "OpenAI",
      "Model Context Protocol",
      "LangChain",
      "agent planning & evaluation",
      "retrieval pipelines",
      "semantic search",
      "transformer embeddings",
      "OpenSearch",
      "Elasticsearch",
      "Eland",
    ],
  },
  {
    domain: "Backend & Data",
    lead: "Queues, jobs, and schemas that survive a restart.",
    items: [
      "NestJS",
      "FastAPI",
      "Express",
      "Node.js",
      "Bun",
      "Prisma",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "BullMQ",
      "Celery",
      "Dagster",
      "ClickHouse",
      "REST",
      "GraphQL",
      "OpenAPI",
      "Server-Sent Events",
    ],
  },
  {
    domain: "Frontend",
    lead: "Interfaces dense enough for operators, fast enough to stay usable.",
    items: [
      "Nuxt 3",
      "Vue 3",
      "React",
      "Next.js",
      "Solid.js",
      "Tailwind CSS",
      "shadcn-vue",
      "Reka UI",
      "Pinia",
      "TanStack Virtual",
      "Vitest",
      "Playwright",
    ],
  },
  {
    domain: "Cloud & Platform",
    lead: "Commercial and GovCloud, declared in code.",
    items: [
      "AWS",
      "AWS GovCloud",
      "Azure",
      "Google Cloud",
      "EKS",
      "RDS",
      "S3",
      "Lambda",
      "SQS",
      "Cognito",
      "Docker",
      "Kubernetes",
      "Terraform",
      "Terragrunt",
      "Pulumi",
      "Argo CD",
      "Helm",
      "Kustomize",
      "Karpenter",
      "Istio",
      "Kyverno",
      "GitHub Actions",
      "GitLab CI",
      "Jenkins",
    ],
  },
  {
    domain: "Security & Compliance",
    lead: "Accreditation as an engineering problem, not a paperwork one.",
    items: [
      "FedRAMP Moderate & High",
      "DoD IL5",
      "DISA CC SRG",
      "IAM",
      "workload identity",
      "permission boundaries",
      "KMS",
      "Secrets Manager",
      "Network Firewall",
      "WAF",
      "Private CA",
      "DNSSEC",
      "FIPS endpoints",
      "CloudTrail",
      "AWS Backup",
      "S3 Object Lock",
      "Semgrep SAST",
      "OWASP ZAP DAST",
      "OAuth 2.0",
      "SAML",
      "Okta",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Credentials                                                         */
/* ------------------------------------------------------------------ */

export const credentials = [
  {
    label: "Education",
    primary: "B.S. Mechanical Engineering",
    secondary: "University of Delaware · 2020",
  },
  {
    label: "Patent",
    primary: "US Application 63/349,961",
    secondary:
      "Neutron reflectivity-rheology sample environment for investigating materials at air-liquid and liquid-liquid interfaces",
  },
  {
    label: "Certification",
    primary: "Cloud DevOps using Microsoft Azure",
    secondary: "Udacity · 2025",
  },
] as const;
