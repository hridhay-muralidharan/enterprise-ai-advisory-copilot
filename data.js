window.COPILOT_WORKSTREAMS = [
  "Opportunity Diagnosis",
  "Workflow Discovery",
  "Data And Systems",
  "Knowledge And Policy",
  "Solution Architecture",
  "Agent Role Design",
  "Orchestration",
  "Governance",
  "Deployment And Adoption",
  "Value And Readiness"
];

window.COPILOT_STEPS = [
  {
    title: "Client AI ambition enters intake",
    readiness: 18,
    label: "Opportunity framed",
    prompt: "A business sponsor wants to use GenAI to reduce manual effort in a high-volume service workflow. The early ask is broad: improve response speed, reduce handoffs, and make frontline teams more consistent.",
    response: "The input needs advisory intake. The co-pilot converts the ambition into target workflow, business pain, users, baseline metrics, sponsor ownership, and value hypothesis.",
    affected: ["Opportunity Diagnosis", "Workflow Discovery", "Value And Readiness"],
    select: "Opportunity Diagnosis",
    updates: {
      "Opportunity Diagnosis": {
        status: "in_discovery",
        note: "AI ambition translated into opportunity definition.",
        logged: ["Target area: high-volume service workflow.", "Business goals: faster responses, fewer handoffs, more consistent frontline execution."],
        missing: ["Named workflow owner.", "Current volume and cycle time.", "Cost of delay or rework.", "Baseline quality metric."],
        risks: ["The team may chase a demo ahead of clear workflow value proof."],
        questions: ["Which exact workflow is painful enough, frequent enough, and measurable enough for an AI pilot?"]
      },
      "Workflow Discovery": {
        status: "missing_evidence",
        note: "Workflow still too broad.",
        missing: ["Trigger.", "Start and end state.", "Actors.", "Systems used.", "Decision points.", "Exception paths."],
        questions: ["What happens from request intake to resolution today?"]
      },
      "Value And Readiness": {
        status: "missing_evidence",
        note: "No baseline yet.",
        missing: ["Baseline effort.", "Baseline cycle time.", "Baseline quality.", "Adoption target."],
        risks: ["Missing baseline metrics can shift pilot evaluation toward demo usefulness over production value."]
      }
    }
  },
  {
    title: "Workflow map reveals exceptions",
    readiness: 29,
    label: "Workflow shape emerging",
    prompt: "Discovery shows three common paths: routine requests, policy-sensitive exceptions, and cases requiring manager approval. Teams use the official process, informal notes, and side-channel escalation.",
    response: "The co-pilot separates the happy path from exception paths. The real workflow includes informal knowledge and approval logic, which affects agent scope, orchestration, governance, and adoption.",
    affected: ["Workflow Discovery", "Knowledge And Policy", "Orchestration", "Governance"],
    select: "Workflow Discovery",
    updates: {
      "Workflow Discovery": {
        status: "retry_needed",
        note: "Exception paths now define scope.",
        logged: ["Paths identified: routine requests, policy-sensitive exceptions, manager approval cases.", "Informal notes and side-channel escalation affect real operations."],
        missing: ["Exception frequency.", "Approval thresholds.", "Handoff rules.", "Informal knowledge sources."],
        risks: ["Automating the documented process can miss informal escalation paths."],
        questions: ["Which exceptions should be automated, assisted, routed, or excluded?"]
      },
      "Knowledge And Policy": {
        status: "missing_evidence",
        note: "Tacit knowledge needs capture.",
        logged: ["Informal notes and local operating rules influence decisions."],
        missing: ["Approved policy sources.", "Subject-matter expert review.", "Rules that must be deterministic."],
        questions: ["Which rules are official policy, and which are team habits that need validation?"]
      },
      "Orchestration": {
        status: "missing_evidence",
        note: "Branches and handoffs required.",
        missing: ["Branch logic.", "Escalation path.", "Approval handoff payload.", "State preservation."]
      },
      "Governance": {
        status: "at_risk",
        note: "Policy-sensitive paths need control.",
        risks: ["Policy exceptions may require review before the AI system can act or recommend."]
      }
    }
  },
  {
    title: "Data and system reality constrains design",
    readiness: 41,
    label: "Feasibility scoped",
    prompt: "IT confirms the workflow touches CRM, ticketing, document repositories, email, and a legacy approval system. Read access is likely available for some systems. Write access and identity permissions require a longer approval path.",
    response: "The co-pilot narrows the first release. The pilot starts with read-heavy assistance, structured drafting, routing recommendations, and handoff summaries while write actions remain gated.",
    affected: ["Data And Systems", "Solution Architecture", "Agent Role Design", "Deployment And Adoption"],
    select: "Data And Systems",
    updates: {
      "Data And Systems": {
        status: "missing_evidence",
        note: "Multi-system workflow mapped.",
        logged: ["Systems: CRM, ticketing, document repositories, email, legacy approval system.", "Read access likely available for some systems."],
        missing: ["System owners.", "Field-level permissions.", "Freshness requirements.", "Identity model.", "Write-access approval path."],
        risks: ["Pilot scope may expand ahead of write-permission and identity-control approval."],
        questions: ["Which systems are required for v1, and which can be simulated or routed through human review?"]
      },
      "Solution Architecture": {
        status: "in_discovery",
        note: "Architecture should be read-heavy first.",
        decisions: ["Design v1 around read, retrieve, draft, summarize, classify, and route before autonomous writes."]
      },
      "Agent Role Design": {
        status: "at_risk",
        note: "Actions depend on permissions.",
        missing: ["Allowed tools.", "Denied tools.", "Review-required actions."],
        risks: ["Safe AI role design depends on explicit system permissions."]
      },
      "Deployment And Adoption": {
        status: "missing_evidence",
        note: "Tool placement pending.",
        missing: ["Primary user workspace.", "Integration sequence.", "Support owner."]
      }
    }
  },
  {
    title: "Knowledge grounding becomes the real work",
    readiness: 48,
    label: "Knowledge risk visible",
    prompt: "Subject-matter experts say the AI needs current policy, historical cases, escalation norms, approval thresholds, reusable client-context notes, and expert judgment.",
    response: "The co-pilot stops treating knowledge as document upload. It maps which knowledge is retrievable context, which is policy, which is case precedent, and which is judgment that needs review or codification.",
    affected: ["Knowledge And Policy", "Solution Architecture", "Governance", "Value And Readiness"],
    select: "Knowledge And Policy",
    updates: {
      "Knowledge And Policy": {
        status: "retry_needed",
        note: "Knowledge sources need classification.",
        logged: ["Needed knowledge: policy, historical cases, escalation norms, approval thresholds, client-context notes."],
        missing: ["Source ownership.", "Update cadence.", "Policy approval process.", "Examples for evaluation.", "Expert-review workflow."],
        risks: ["The system may retrieve documents while missing the right business rule or judgment boundary."],
        questions: ["What knowledge can be retrieved, what must be encoded as rules, and what must stay under expert review?"]
      },
      "Solution Architecture": {
        status: "ready_for_review",
        note: "RAG plus rules plus review.",
        decisions: ["Use retrieval for context, explicit rules for approval thresholds, and human review for ambiguous judgment."]
      },
      "Governance": {
        status: "missing_evidence",
        note: "Policy ownership needed.",
        missing: ["Policy sign-off owner.", "Content update governance.", "Exception approval path."]
      }
    }
  },
  {
    title: "AI role is bounded deliberately",
    readiness: 57,
    label: "Co-pilot role defined",
    prompt: "The team asks whether the AI should resolve cases directly. Advisory proposes a narrower v1: intake summarization, policy-aware retrieval, recommended next action, draft response, approval packet, and escalation summary.",
    response: "The co-pilot defines AI as a bounded workflow actor. It can assist decisions, prepare artifacts, and route cases while final approval stays with accountable owners.",
    affected: ["Agent Role Design", "Solution Architecture", "Orchestration", "Governance"],
    select: "Agent Role Design",
    updates: {
      "Agent Role Design": {
        status: "ready_for_review",
        note: "Bounded assistance role defined.",
        logged: ["AI role: intake summarization, policy-aware retrieval, recommended next action, draft response, approval packet, escalation summary."],
        decisions: ["V1 will support assisted resolution and approval preparation with accountable case closure."],
        missing: ["Confidence thresholds.", "Forbidden actions.", "Human review triggers.", "Prompt and evaluation examples."]
      },
      "Orchestration": {
        status: "missing_evidence",
        note: "Handoffs still need design.",
        missing: ["Approval packet format.", "Escalation summary format.", "State transitions for returned cases."]
      },
      "Governance": {
        status: "ready_for_review",
        note: "Accountability remains human-led.",
        decisions: ["Final approval stays with accountable owners for v1."]
      }
    }
  },
  {
    title: "Orchestration exposes delivery complexity",
    readiness: 63,
    label: "Integration dependencies clear",
    prompt: "Delivery review finds that cases can bounce between frontline teams, managers, and specialist reviewers. Each handoff needs context, reason codes, SLA status, and a record of AI-generated recommendations.",
    response: "The co-pilot moves orchestration to the center. Production value depends on state, handoff payloads, approvals, retries, and auditability across the workflow.",
    affected: ["Orchestration", "Deployment And Adoption", "Governance", "Value And Readiness"],
    select: "Orchestration",
    updates: {
      "Orchestration": {
        status: "ready_for_review",
        note: "Handoff model defined.",
        logged: ["Handoffs require context, reason codes, SLA status, and AI recommendation record."],
        decisions: ["Treat workflow state and handoff payload as launch-critical design objects."],
        missing: ["Returned-case path.", "SLA breach path.", "Reviewer feedback loop."],
        risks: ["Good AI outputs lose production value when handoff state is lost."]
      },
      "Deployment And Adoption": {
        status: "missing_evidence",
        note: "User workspace matters.",
        missing: ["Where handoff summaries appear.", "Training plan.", "Pilot support model."],
        risks: ["A separate tool can reduce adoption when daily work happens inside the existing operating workflow."]
      },
      "Governance": {
        status: "ready_for_review",
        note: "Auditability tied to orchestration.",
        missing: ["Audit log schema.", "Recommendation traceability."]
      }
    }
  },
  {
    title: "Governance gates the pilot",
    readiness: 58,
    label: "Governance gate active",
    prompt: "Risk review asks for access boundaries, audit logs, review rules, data retention, model-output disclaimers, incident handling, and a clear split between recommendation, preparation, and action.",
    response: "The co-pilot lowers readiness until governance requirements are explicit. Governance changes what the AI can do, who reviews it, and how the workflow is deployed.",
    affected: ["Governance", "Agent Role Design", "Data And Systems", "Deployment And Adoption"],
    select: "Governance",
    updates: {
      "Governance": {
        status: "blocked",
        note: "Governance requirements must be resolved.",
        logged: ["Risk requirements: access boundaries, audit logs, review rules, data retention, output disclaimers, incident handling."],
        missing: ["Risk owner sign-off.", "Audit event fields.", "Human review matrix.", "Data retention policy.", "Incident response path."],
        risks: ["Pilot launch may be blocked if autonomy and accountability are unclear."],
        questions: ["Which outputs can be advisory, which require review, and which actions are prohibited in v1?"]
      },
      "Agent Role Design": {
        status: "retry_needed",
        note: "Role boundaries depend on review rules.",
        missing: ["Recommendation vs preparation vs action boundary."]
      },
      "Data And Systems": {
        status: "at_risk",
        note: "Access model needs approval.",
        missing: ["Role-based access mapping.", "Data retention and logging rules."]
      },
      "Deployment And Adoption": {
        status: "at_risk",
        note: "Pilot launch depends on governance clearance.",
        risks: ["Delivery timeline may slip if governance is handled after build."]
      }
    }
  },
  {
    title: "Deployment plan moves from demo to operating change",
    readiness: 70,
    label: "Deployment plan shaped",
    prompt: "The pilot owner agrees to launch with two teams, limited case types, read-heavy system access, required manager approval for sensitive cases, weekly quality review, and in-workflow handoff summaries.",
    response: "The co-pilot moves the project toward a scoped pilot candidate. The design now has limited users, limited workflows, bounded permissions, review gates, quality loops, and workflow placement.",
    affected: ["Deployment And Adoption", "Governance", "Orchestration", "Value And Readiness"],
    select: "Deployment And Adoption",
    updates: {
      "Deployment And Adoption": {
        status: "ready_for_review",
        note: "Scoped rollout plan defined.",
        logged: ["Pilot scope: two teams, limited case types, read-heavy access, manager approval for sensitive cases, weekly quality review, in-workflow handoff summaries."],
        decisions: ["Launch as a constrained operating pilot with bounded automation scope."],
        missing: ["Pilot calendar.", "Training assets.", "Support rota.", "Success review cadence."]
      },
      "Governance": {
        status: "ready_for_review",
        note: "Governance controls reflected in rollout.",
        decisions: ["Sensitive cases require manager approval during pilot."]
      },
      "Orchestration": {
        status: "ready_for_review",
        note: "Workflow placement is clear.",
        decisions: ["Handoff summaries must appear inside the operating workflow."]
      }
    }
  },
  {
    title: "Value proof becomes balanced",
    readiness: 82,
    label: "Pilot candidate",
    prompt: "The sponsor wants productivity gain as the main metric. Advisory adds cycle time, first-pass quality, escalation quality, user adoption, review overturn rate, compliance exceptions, and rework within seven days.",
    response: "The co-pilot marks this as a scoped pilot candidate. The scorecard tests productivity, quality, risk, adoption, and readiness for expansion.",
    affected: ["Value And Readiness", "Opportunity Diagnosis", "Governance", "Deployment And Adoption"],
    select: "Value And Readiness",
    updates: {
      "Opportunity Diagnosis": { status: "approved", note: "Opportunity is bounded and measurable." },
      "Workflow Discovery": { status: "approved", note: "Core paths and exceptions are mapped." },
      "Data And Systems": { status: "ready_for_review", note: "Pilot is scoped around available access." },
      "Knowledge And Policy": { status: "ready_for_review", note: "Policy and expert review remain launch gates." },
      "Solution Architecture": { status: "approved", note: "Architecture fits a read-heavy assisted workflow." },
      "Agent Role Design": { status: "approved", note: "AI role is bounded." },
      "Orchestration": { status: "ready_for_review", note: "Handoff and review loops are defined." },
      "Governance": { status: "ready_for_review", note: "Governance controls are explicit launch gates." },
      "Deployment And Adoption": { status: "ready_for_review", note: "Rollout plan is constrained and reviewable." },
      "Value And Readiness": {
        status: "pilot_candidate",
        note: "Balanced pilot scorecard defined.",
        logged: ["Metrics: productivity gain, cycle time, first-pass quality, escalation quality, adoption, review overturn rate, compliance exceptions, rework within seven days."],
        decisions: ["Proceed only as a scoped pilot with explicit review gates and balanced value metrics."],
        missing: ["Final acceptance thresholds.", "Baseline measurement window."],
        risks: ["Productivity-only scoring can hide quality, risk, and adoption problems."],
        questions: ["What threshold would justify expansion beyond the scoped pilot?"]
      }
    }
  }
];
