# Mason Keresty

kerestymason@gmail.com | Princeton Junction, NJ

## Senior Software Engineer | AI, Cloud Security & Platform Engineering

## Summary

Senior software engineer building AI-enabled security products and secure cloud platforms for federal, defense, and research environments. Experienced in full-stack product development, LLM agent systems and evaluation, distributed security-scan orchestration, and FedRAMP and DoD IL5 infrastructure across AWS and AWS GovCloud. Combines hands-on TypeScript and Python engineering with expertise in Kubernetes, infrastructure as code, cloud identity, application security, and technical leadership.

## Technical Skills

**Languages:** TypeScript, Python, JavaScript, Java, C#, Groovy, Bash, HCL, YAML

**AI and Search:** Anthropic Claude, Google Vertex AI and Gemini, OpenAI, Model Context Protocol, LangChain, agent planning and evaluation, retrieval pipelines, semantic search, transformer embeddings, OpenSearch, Elasticsearch, Eland

**Backend and Data:** NestJS, FastAPI, Express.js, Node.js, Bun, Prisma, PostgreSQL, MySQL, Redis, BullMQ, Celery, Dagster, ClickHouse, REST, GraphQL, OpenAPI, Server-Sent Events

**Frontend:** Nuxt 3, Vue 3, React, Next.js, Solid.js, Tailwind CSS, shadcn-vue, Reka UI, Pinia, TanStack Virtual, Vitest, Playwright

**Cloud and Platform:** AWS, AWS GovCloud, Azure, Google Cloud, EKS, RDS, S3, Lambda, SQS, Cognito, Docker, Kubernetes, Terraform, Terragrunt, Pulumi, Argo CD, Helm, Kustomize, Karpenter, Istio, Kyverno, GitHub Actions, GitLab CI, Jenkins

**Security and Compliance:** FedRAMP Moderate and High, DoD IL5, DISA Cloud Computing SRG, IAM, workload identity, permission boundaries, KMS, Secrets Manager, AWS Network Firewall, WAF, Private CA, DNSSEC, FIPS endpoints and AMIs, CloudTrail, AWS Backup, S3 Object Lock, Semgrep SAST, OWASP ZAP DAST, OAuth 2.0, SAML, Okta

## Experience

### Knox Systems | Remote

#### **Senior Software Engineer, AI | 2026–Present**

- Serve as a full-stack and platform engineer for a multi-tenant SaaS platform used by federal agencies to identify, prioritize, and remediate cloud security risks. The platform uses NestJS and TypeScript, Nuxt and Vue, PostgreSQL with Prisma, Redis and BullMQ, Kubernetes, and AWS GovCloud within a FedRAMP boundary.
- Designed and delivered an AI remediation workflow that allows engineers to review and revise LLM-generated infrastructure fix plans, route plans through multi-stage approval with version history, and follow execution through a live step-by-step browser timeline.
- Built the supporting LLM planning pipeline, including cloud-provider-specific retrieval, grouping of related findings by affected resource, schema validation before persistence, and provenance tracking for deterministic rule matches and model-generated content.
- Developed an automated agent-evaluation harness that generates test scenarios, runs the agent headlessly, and uses Claude, Gemini, and GPT as independent judges. Aggregated numerical and categorical results through median scoring and majority-vote consensus, tracked quality dimensions across releases, and added a CI evaluation subset for every push.
- Extended the evaluation workflow to analyze failure patterns, validate patches in a sandbox, and revert changes when evaluation results regress.
- Replaced mounted credentials for agent workloads with a pod-startup workload-identity exchange that issues short-lived, in-memory tokens scoped to individual jobs. Built a cross-partition bridge that allows GovCloud agents to assume narrowly scoped roles in commercial AWS accounts through web identity federation, with server-side scope validation and fail-closed behavior.
- Architected and delivered authenticated dynamic application security testing across the API, two web applications, Kubernetes infrastructure, and a TypeScript and Bun scan-runner service packaged with an OWASP ZAP sidecar.
- Built an idempotent Redis and BullMQ scan orchestrator that converts immutable authorization snapshots into Kubernetes Jobs, re-adopts in-flight scans after restarts, and refuses dispatch when queue or cluster state cannot be verified.
- Implemented distributed concurrency controls with per-target mutual exclusion and global and per-tenant capacity limits, later extending admission to support differently weighted scans. Enforced authorization scope and expiry at dispatch, added an emergency kill switch, and built reconciliation for expired authorization windows with outstanding scans.
- Built the scan runner’s authentication engine, reachability preflight, and coverage gates; delivered job-scoped credentials through ephemeral Kubernetes secrets and restricted callback tokens to their originating scan.
- Designed scan-pod network confinement with a dedicated NAT gateway and static egress address, AWS Network Firewall, VPC endpoints, and Kubernetes NetworkPolicies that deny private-range and instance-metadata access.
- Added rate-limited scan heartbeats, operator APIs, and Server-Sent Events streams for live progress in both web applications. Required positive evidence of surface coverage before automatically closing vulnerabilities.
- Integrated cloud-posture and endpoint-security vendor data into a unified findings model, built an ownership decision-tree service, and redesigned the findings workspace with advanced filtering, configurable columns, trend visualization, SLA-based prioritization, and stable cross-vendor finding identities.
- Improved frontend scalability through virtualized infinite-scroll tables, shared sorting and bulk-selection components, debounced requests, visibility-aware polling, and lazy loading. Created a shared Tailwind and shadcn-vue/Reka UI design language with a live component preview and automated UI review tooling.
- Remediated penetration-test and audit findings involving cross-tenant access, PII exposure, endpoint authorization, secret disclosure, query-string bearer tokens, and session-cookie security. Moved third-party credentials to AWS Secrets Manager, encrypted stored MFA secrets with KMS, added Semgrep and endpoint-authentication checks to CI, and replaced personal access tokens with a GitHub App.
- Converted evidence-file uploads from in-memory buffering to streaming, removing the application’s previous upload-size ceiling.

#### **Senior DevOps Engineer | 2025–2026**

- Delivered and operated FedRAMP-compliant AWS infrastructure for managed federal customers, serving as a technical point of contact for customer stakeholders and internal engineering teams. Led daily scrum activities, coordinated cross-functional delivery, managed sprint priorities, and mentored teammates.
- Designed FedRAMP Moderate infrastructure on Amazon EKS across multiple tenant accounts and supported a serverless ingestion pipeline using Lambda, API Gateway, SQS, Redshift, VPC peering, and shared secrets.
- Implemented encryption, secrets management, cross-region replication, backup, monitoring, and enterprise SAML SSO controls. Delivered development, UAT, and production environments through Terraform, Terragrunt, and GitHub Actions, including scheduled resource pause and resume workflows.
- Designed a reactive CrowdStrike Falcon deployment system that installed and self-healed sensors across EKS clusters in more than 15 AWS accounts. Built reusable Terraform components for EKS, EC2 distribution through Systems Manager, and log delivery through Kinesis Firehose.
- Automated account onboarding by provisioning Terraform state, IAM roles, GitHub Environments, and account configuration through a single bootstrap workflow. Configured GitHub OIDC and authored workflows for account-level and fleet-wide deployments across commercial AWS and AWS GovCloud.
- Led infrastructure-as-code delivery supporting a managed customer’s DoD IL5 accreditation effort across two GovCloud accounts. Produced a gap analysis against FedRAMP High and the DISA Cloud Computing SRG and implemented partition-aware addressing, FIPS node images and PrivateLink endpoints, a private Kubernetes API, control-plane audit logging, and customer-managed encryption.
- Created policy-as-code checks that fail deployment previews when proposed changes violate the accreditation baseline. Designed category-specific IAM permission boundaries for workload, service, CI, and administrative roles, including delegated controls for an in-cluster IAM controller.
- Built a bootstrap-first Terraform architecture for retained and encrypted state, permission boundaries, and deployment roles. Ran Terraform through account-local CodeBuild projects so credentials, state, and resource identifiers remained within the accreditation boundary.
- Separated Terraform plan and apply into different CodeBuild projects and IAM roles, making required-reviewer approval a prerequisite for obtaining apply credentials.
- Built approximately 20 reusable Terraform modules spanning networking, VPC peering, EKS, RDS, container registries and image mirroring, audit, backup, DNS, edge protection, KMS, storage, and logging.
- Delivered an audit and resiliency baseline using CloudTrail, AWS Config, GuardDuty, VPC flow logs, CloudWatch, Route 53 DNSSEC, WAFv2, AWS Network Firewall, AWS Backup, cross-region copy, and vault lock.
- Built an Argo CD app-of-apps GitOps layer with project-level resource and destination guardrails. Supported Istio, Karpenter, Kyverno, External Secrets, certificate and DNS automation, OpenTelemetry, Fluent Bit, ClickHouse, and Dagster.
- Authored a preventive AWS guardrail library organized into FedRAMP Moderate, FedRAMP High/IL4, and DoD IL5 tiers. Wrote 13 service control policies and one resource control policy covering audit protection, identity restrictions, region controls, resource perimeters, encryption, IMDSv2, authorized services, and internet-edge boundaries.
- Mapped policy statements to applicable NIST 800-53 Revision 5 and DoD Cloud Computing SRG controls and documented requirements that required detective or procedural controls instead of preventive policy.
- Validated guardrails against a live accredited environment before attachment, corrected conditional and exemption issues identified from real API activity, and added CI checks for policy syntax, size quotas, and IAM Access Analyzer findings.
- Wrote a dedicated policy restricting a cross-partition bridge account to evidence-collection functions and documented attachment, quota, validation, and rollout procedures.

### Lockheed Martin | Moorestown, NJ

#### **Developer | DevSecOps Engineer | 2024–2025**

- Designed and implemented DRIP, an ML-powered duplicate-record identification platform using Next.js, FastAPI, Elasticsearch, Redis, Celery, Logstash, and Kibana.
- Built modular ingestion pipelines for SQL, Jira, and Word records and integrated transformer models through Eland for semantic comparison in Elasticsearch.
- Developed asynchronous processing with Celery and Redis and repurposed DRIP components into a centralized Elastic monitoring solution for Jenkins pipelines, including alerting, error tracing, and root-cause diagnostics.
- Forked and customized SearxNG to create an internal search engine spanning internal systems, Confluence, and engineering resources in classified and unclassified environments.
- Built a GitLab CI and LLM workflow that used repository metadata to generate README documentation and publish it to internal knowledge bases.
- Led an enterprise migration of more than 3,000 repositories from Bitbucket to GitLab, including feasibility analysis, migration tooling, Jenkins pipeline conversion, credential handling, validation, documentation, and rollout.
- Developed reusable GitLab CI templates for container builds, security scans, and automated testing. Delivered training, onboarding materials, and workshops for more than 20 development teams.
- Modernized legacy build infrastructure from RHEL 6 to RHEL 8 using updated Maven tooling, Ansible-based checks, and modular build patterns.

#### **Developer | Systems Engineer | 2022–2024**

- Re-architected ECSEL 2.0, a legacy shipboard inventory system, as a Next.js web platform backed by Amazon RDS and MySQL.
- Designed authentication, session management, role-based access control, real-time synchronization, and update workflows for controlled ship-configuration data.
- Built an AutoCAD extraction tool that converted drawing metadata into editable Excel templates, reducing manual work for each ship configuration.
- Authored system and configuration-definition documents and created AutoCAD schematics and 3D models supporting hardware integration across naval platforms.
- Participated in technology-evaluation groups focused on assessing and documenting technologies for field deployment.

### STF Technologies | Newark, DE

#### **Research Engineer – Nuclear Rheology | 2020–2022**

- Led engineering work on instrumentation and measurement techniques for fluid viscosity and material properties under extreme conditions using neutron beamlines.
- Designed and fabricated high-pressure, low-temperature sample chambers subject to neutron-transparency constraints, using 3D CAD and finite-element analysis to evaluate pressure, thermal, and beamline requirements.
- Developed LabVIEW interfaces and Python automation for motion control, synchronized data collection, and beamline integration.
- Contributed to patent-backed neutron-compatible rheology technology through prior-art research, component selection, prototyping, and deployment with university and national-laboratory partners.
- Designed a compact right-angle rheometer gearbox to minimize backlash, friction, and parasitic torque, and supported materials development for spacesuit-layer fabric systems.

## Earlier Experience

**Air Liquide | Process Engineering Intern | Newport, DE | 2019–2020**  
Supported production of aerospace air-separation systems and improved manufacturing processes and tooling.

**EDiS Company | Project Management Intern | Wilmington, DE | 2019**  
Supported planning, field coordination, contractor meetings, and budgeting for commercial construction projects involving AstraZeneca and Beebe Hospital.

## Education

**University of Delaware**  
Bachelor of Science in Mechanical Engineering, 2020

## Certifications

**Udacity | Cloud DevOps Using Microsoft Azure | 2025**  
CI/CD, Terraform, Packer, automated testing, cloud deployment, and platform-as-a-service concepts

## Patent

**United States Application No. 63/349,961**  
*Neutron Reflectivity-Rheology Sample Environment for Investigating Materials at Air-Liquid and Liquid-Liquid Interfaces and Methods of Use Thereof*

## Academic Projects

**Senior Design – Norwalt Design Inc. | 2019–2020**  
Engineered a forced-convection solution to a UV-heating issue in manufacturing; the design was adopted across multiple production facilities.

**Junior Design – Siemens | 2018–2019**  
Created a computer-vision prototype using custom image-processing logic to detect faulty bottle caps on a production line.
