export const industries = [
  {
    id: "real-estate",
    name: "Real Estate",
    shortName: "Real Estate OS",
    accent: "#059669",
    headline: "Turn every property inquiry into a coordinated sales journey.",
    story:
      "A buyer messages at night, asks for a 3BHK, disappears, comes back with financing questions, and wants a viewing. Xizo keeps that journey alive. It answers instantly, qualifies the buyer, matches properties, books the visit, reminds everyone, and hands the human agent a prepared opportunity.",
    problem:
      "Real estate teams do not lose only because of weak demand. They lose when leads sit unanswered, follow-ups are forgotten, property matching is manual, and deal documents are scattered.",
    promise: "AI handles volume. Humans handle value.",
    metrics: [
      ["New leads", "1,284"],
      ["Qualified", "436"],
      ["Viewings", "182"],
      ["Pipeline", "Rs 8.4Cr"]
    ],
    workflow: ["Lead arrives", "AI responds", "Qualify buyer", "Match property", "Book viewing", "Follow up", "Documents", "Closing"],
    agents: [
      {
        id: "reception",
        name: "AI Receptionist",
        category: "Lead Management",
        problem: "Prospects arrive from WhatsApp, portals, phone, ads, and the website, but staff are not always available.",
        solution: "Answers instantly, collects customer details, identifies buyer/renter/seller intent, and routes the conversation.",
        inputs: ["Website inquiry", "WhatsApp message", "Phone lead", "Campaign source"],
        outputs: ["Lead record", "First response", "Sales route", "Qualification task"],
        tools: ["CRM", "WhatsApp", "Email", "Voice"],
        position: { x: 70, y: 170 }
      },
      {
        id: "qualification",
        name: "Lead Qualification",
        category: "Sales",
        problem: "Sales teams cannot tell which leads are ready to buy and which ones need nurture.",
        solution: "Captures budget, location, property type, timeline, financing status, and buying motivation.",
        inputs: ["Budget", "Location", "Timeline", "Financing", "Property type"],
        outputs: ["Lead score", "Buyer profile", "Sales alert", "CRM update"],
        tools: ["CRM", "Sales playbook", "Calendar"],
        position: { x: 250, y: 96 }
      },
      {
        id: "matching",
        name: "Property Recommendation",
        category: "Property Intelligence",
        problem: "Agents spend time searching listings manually and can miss relevant alternatives.",
        solution: "Ranks available properties by requirements, availability, amenities, lifestyle, commute, and budget.",
        inputs: ["Buyer profile", "Property database", "Availability", "Amenities"],
        outputs: ["Shortlist", "Match reasons", "Alternatives", "Viewing options"],
        tools: ["Property database", "CRM", "Maps"],
        position: { x: 445, y: 170 }
      },
      {
        id: "scheduler",
        name: "Viewing Scheduler",
        category: "Appointments",
        problem: "Scheduling viewings needs back-and-forth between buyer, agent, property, and calendar.",
        solution: "Finds compatible slots, books viewings, sends directions, and reminds the customer and agent.",
        inputs: ["Customer availability", "Agent calendar", "Property availability"],
        outputs: ["Booked viewing", "Calendar event", "Reminder sequence", "Agent brief"],
        tools: ["Calendar", "WhatsApp", "Maps"],
        position: { x: 620, y: 282 }
      },
      {
        id: "documents",
        name: "Document Processor",
        category: "Transactions",
        problem: "Deals stall when agreements, IDs, disclosures, and approvals are missing or scattered.",
        solution: "Classifies documents, extracts key fields, tracks missing items, and routes exceptions for review.",
        inputs: ["Uploaded documents", "Deal checklist", "Buyer data", "Seller data"],
        outputs: ["Document checklist", "Missing item alert", "Extracted fields"],
        tools: ["Document storage", "CRM", "Email"],
        position: { x: 445, y: 418 }
      },
      {
        id: "closing",
        name: "Closing Coordinator",
        category: "Transaction Management",
        problem: "Buyers, sellers, agents, lawyers, lenders, and inspectors create too many manual handoffs.",
        solution: "Tracks deadlines, responsibilities, missing steps, approvals, and the final closing checklist.",
        inputs: ["Offer status", "Agreement status", "Deadlines", "Stakeholders"],
        outputs: ["Closing checklist", "Task owners", "Escalations", "Status update"],
        tools: ["CRM", "Calendar", "Documents"],
        position: { x: 250, y: 418 }
      }
    ]
  },
  {
    id: "healthcare",
    name: "Healthcare",
    shortName: "Healthcare OS",
    accent: "#0891b2",
    headline: "Automate the work around patient care while clinicians stay in control.",
    story:
      "A patient asks for a cardiologist appointment, mentions insurance, and still needs intake forms. Xizo answers, collects details, checks scheduling, prepares insurance workflow support, and escalates anything clinical to authorized staff.",
    problem:
      "Healthcare teams are overloaded by calls, intake, registration, appointment reminders, insurance checks, referrals, billing questions, and follow-ups.",
    promise: "AI handles the workflow. Healthcare professionals handle the care.",
    metrics: [
      ["Patients", "1,284"],
      ["Appointments", "246"],
      ["Confirmed", "218"],
      ["Pending tasks", "43"]
    ],
    workflow: ["Patient inquiry", "AI reception", "Intake", "Triage support", "Scheduling", "Insurance", "Clinical handoff", "Follow-up"],
    agents: [
      {
        id: "reception",
        name: "Healthcare Receptionist",
        category: "Patient Access",
        problem: "Patients call and message across many channels, creating missed calls and front-desk overload.",
        solution: "Answers common questions, identifies requests, collects basics, books appointments, and routes safely.",
        inputs: ["Patient message", "Clinic hours", "Service directory", "Doctor availability"],
        outputs: ["Answered inquiry", "Appointment path", "Staff handoff"],
        tools: ["Patient portal", "Calendar", "SMS", "Voice"],
        position: { x: 70, y: 170 }
      },
      {
        id: "intake",
        name: "Patient Intake",
        category: "Registration",
        problem: "Appointments start late because forms, history, insurance details, or documents are incomplete.",
        solution: "Collects structured information before the visit and prepares a staff-ready summary.",
        inputs: ["Patient profile", "Reason for visit", "Insurance details", "Required forms"],
        outputs: ["Completed intake", "Missing item alert", "EHR-ready summary"],
        tools: ["Forms", "EHR/EMR", "Document storage"],
        position: { x: 250, y: 96 }
      },
      {
        id: "triage",
        name: "Triage Support",
        category: "Clinical Support",
        problem: "Patient routing needs safety boundaries and should not become autonomous diagnosis.",
        solution: "Collects information under approved protocols and escalates urgent or clinical cases.",
        inputs: ["Symptoms", "Protocol rules", "Patient context", "Urgency signals"],
        outputs: ["Routing recommendation", "Clinical handoff", "Audit log"],
        tools: ["Protocol library", "EHR/EMR", "Staff notifications"],
        position: { x: 445, y: 170 }
      },
      {
        id: "scheduler",
        name: "Appointment Scheduler",
        category: "Operations",
        problem: "Booking, rescheduling, reminders, location, and prep instructions create repeated admin work.",
        solution: "Coordinates patient, doctor, department, location, and calendar availability.",
        inputs: ["Patient request", "Provider calendar", "Department", "Location"],
        outputs: ["Booked appointment", "Reminder sequence", "Prep instructions"],
        tools: ["Calendar", "EHR/EMR", "SMS"],
        position: { x: 620, y: 282 }
      },
      {
        id: "insurance",
        name: "Insurance Verification",
        category: "Revenue Operations",
        problem: "Insurance verification and prior authorization can delay appointments and billing.",
        solution: "Tracks coverage, eligibility, copays, required documents, and authorization status.",
        inputs: ["Insurance details", "Appointment type", "Payer rules"],
        outputs: ["Verification status", "Authorization tracker", "Staff note"],
        tools: ["Insurance portal", "Billing system", "EHR/EMR"],
        position: { x: 445, y: 418 }
      },
      {
        id: "follow-up",
        name: "Post-Visit Follow-Up",
        category: "Patient Engagement",
        problem: "Patients miss instructions, follow-up bookings, preventive reminders, or feedback requests.",
        solution: "Sends approved communications and routes patient responses back to the care team.",
        inputs: ["Visit status", "Approved templates", "Care-plan reminders"],
        outputs: ["Follow-up message", "Reminder", "Feedback request", "Staff task"],
        tools: ["Patient portal", "SMS", "Calendar"],
        position: { x: 250, y: 418 }
      }
    ]
  },
  {
    id: "professional-services",
    name: "Professional Services",
    shortName: "Services OS",
    accent: "#4f46e5",
    headline: "Run the operational side of a service business from lead to invoice.",
    story:
      "A prospect asks for an automation project. Xizo qualifies the request, schedules the meeting, prepares a brief, drafts scope, creates a proposal, starts onboarding after approval, tracks project work, and prepares billing.",
    problem:
      "Service firms sell expertise, but their teams spend too much time on lead qualification, meeting notes, proposals, onboarding, project updates, billing, and renewals.",
    promise: "AI manages the repetitive workflow. Experts deliver the expertise.",
    metrics: [
      ["Open leads", "146"],
      ["Proposals", "31"],
      ["Projects", "24"],
      ["Utilization", "78%"]
    ],
    workflow: ["Lead", "Qualification", "Meeting", "Proposal", "Contract", "Onboarding", "Project", "Invoice", "Renewal"],
    agents: [
      {
        id: "qualification",
        name: "Lead Qualification",
        category: "Sales",
        problem: "Partners and senior teams waste time on prospects who are not a fit.",
        solution: "Scores prospects by industry, budget, timeline, decision-maker access, and complexity.",
        inputs: ["Inquiry", "Company details", "Budget", "Timeline"],
        outputs: ["Fit score", "Meeting recommendation", "CRM update"],
        tools: ["CRM", "Website chat", "Calendar"],
        position: { x: 70, y: 170 }
      },
      {
        id: "meeting",
        name: "Meeting Intelligence",
        category: "Meetings",
        problem: "Decisions, requirements, and next steps get buried in meeting notes.",
        solution: "Creates pre-meeting briefs, summaries, decisions, action items, and CRM updates.",
        inputs: ["Calendar event", "CRM history", "Transcript", "Client docs"],
        outputs: ["Brief", "Summary", "Action items", "Follow-up draft"],
        tools: ["Calendar", "CRM", "Docs"],
        position: { x: 250, y: 96 }
      },
      {
        id: "proposal",
        name: "Proposal Generator",
        category: "Sales Automation",
        problem: "Proposal creation is slow and inconsistent across clients.",
        solution: "Drafts proposals from requirements, templates, deliverables, pricing, assumptions, and case studies.",
        inputs: ["Meeting summary", "Template library", "Scope", "Pricing model"],
        outputs: ["Proposal draft", "Scope summary", "Pricing table"],
        tools: ["Docs", "CRM", "Knowledge base"],
        position: { x: 445, y: 170 }
      },
      {
        id: "onboarding",
        name: "Client Onboarding",
        category: "Delivery",
        problem: "After the contract is signed, kickoff, documents, access, and project setup are manually recreated.",
        solution: "Builds onboarding checklists, requests documents, creates projects, and books kickoff.",
        inputs: ["Signed contract", "Client info", "Project scope", "Access needs"],
        outputs: ["Onboarding plan", "Document requests", "Project workspace"],
        tools: ["Project tool", "Calendar", "Docs"],
        position: { x: 620, y: 282 }
      },
      {
        id: "project",
        name: "Project Manager",
        category: "Delivery",
        problem: "Project updates are fragmented across task boards, chat, meetings, and documents.",
        solution: "Tracks milestones, blockers, tasks, dependencies, and client update drafts.",
        inputs: ["Project plan", "Task board", "Milestones", "Client requests"],
        outputs: ["Status update", "Risk alert", "Task changes"],
        tools: ["Project management", "Slack", "Docs"],
        position: { x: 445, y: 418 }
      },
      {
        id: "billing",
        name: "Invoice Generation",
        category: "Finance",
        problem: "Billing is delayed when finance has to reconcile contracts, milestones, and time manually.",
        solution: "Prepares invoice drafts from contracts, milestones, time entries, and payment terms.",
        inputs: ["Contract", "Milestones", "Time entries", "Deliverables"],
        outputs: ["Invoice draft", "Missing info alert", "Payment reminder"],
        tools: ["Accounting", "Project system", "CRM"],
        position: { x: 250, y: 418 }
      }
    ]
  },
  {
    id: "finance-insurance",
    name: "Finance & Insurance",
    shortName: "Finance OS",
    accent: "#0369a1",
    headline: "Automate financial workflows while authorized experts control decisions.",
    story:
      "A customer applies for a business loan and uploads statements. Xizo collects the application, checks KYC completeness, classifies documents, prepares risk support, routes the case to authorized review, and keeps the customer updated.",
    problem:
      "Financial-services teams handle repetitive customer support, KYC, applications, document processing, claims, renewals, collections, and risk escalations.",
    promise: "Automate the work. Control the risk. Empower your people.",
    metrics: [
      ["Applications", "2,841"],
      ["Documents", "624"],
      ["Claims", "173"],
      ["Fraud alerts", "26"]
    ],
    workflow: ["Customer", "Support", "KYC", "Application", "Documents", "Risk support", "Human review", "Status update"],
    agents: [
      {
        id: "support",
        name: "Financial Support",
        category: "Customer Service",
        problem: "Support teams repeat the same account, loan, policy, payment, and application status answers.",
        solution: "Answers routine questions, opens service requests, and routes sensitive account changes.",
        inputs: ["Customer request", "Account context", "Policy data"],
        outputs: ["Support answer", "Service request", "Escalation"],
        tools: ["CRM", "Core system", "Policy admin"],
        position: { x: 70, y: 170 }
      },
      {
        id: "kyc",
        name: "KYC Compliance",
        category: "Onboarding",
        problem: "KYC stalls when documents are missing, unclear, or inconsistent.",
        solution: "Collects identity information, checks completeness, flags mismatches, and routes exceptions.",
        inputs: ["Customer data", "ID documents", "KYC policy", "Risk indicators"],
        outputs: ["KYC status", "Missing item request", "Exception queue"],
        tools: ["KYC system", "Document storage", "Audit log"],
        position: { x: 250, y: 96 }
      },
      {
        id: "documents",
        name: "Document Processor",
        category: "Document Intelligence",
        problem: "Teams waste time opening, naming, checking, and re-requesting financial documents.",
        solution: "Classifies, extracts, and checks documents for completeness, quality, and exception flags.",
        inputs: ["Uploaded file", "Application context", "Document rules"],
        outputs: ["Document type", "Extracted fields", "Quality flag"],
        tools: ["OCR", "Document storage", "Loan system"],
        position: { x: 445, y: 170 }
      },
      {
        id: "risk",
        name: "Risk Support",
        category: "Risk",
        problem: "Risk teams need evidence and explainability, not black-box automation.",
        solution: "Organizes risk factors, applies approved rules, explains flags, and prepares review packets.",
        inputs: ["Application data", "Transactions", "Policy rules", "History"],
        outputs: ["Risk report", "Flag rationale", "Evidence list"],
        tools: ["Risk engine", "Analytics", "Audit logs"],
        position: { x: 620, y: 282 }
      },
      {
        id: "claims",
        name: "Claims Processing",
        category: "Insurance",
        problem: "Claims need document collection, validation, status updates, and many handoffs.",
        solution: "Guides claim intake, collects photos/reports, prepares reviewer packets, and updates customers.",
        inputs: ["Claim details", "Policy data", "Photos", "Receipts"],
        outputs: ["Claim file", "Missing item alert", "Reviewer packet"],
        tools: ["Claims system", "Policy admin", "Messaging"],
        position: { x: 445, y: 418 }
      },
      {
        id: "review",
        name: "Authorized Review",
        category: "Governance",
        problem: "Regulated decisions require human authority, rationale, and auditability.",
        solution: "Packages context, evidence, recommendation, and approval actions for authorized staff.",
        inputs: ["Recommendation", "Policy rule", "Risk level", "Evidence"],
        outputs: ["Approval request", "Decision log", "Next action"],
        tools: ["Policy engine", "Audit log", "Notifications"],
        position: { x: 250, y: 418 }
      }
    ]
  },
  {
    id: "automotive",
    name: "Automotive & Dealerships",
    shortName: "Automotive OS",
    accent: "#ea580c",
    headline: "Move every dealership lead from inquiry to sale, delivery, service, and retention.",
    story:
      "A buyer asks about a BMW SUV, has a trade-in, and needs financing. Xizo answers, qualifies the buyer, checks inventory, recommends vehicles, books a test drive, prepares finance documents, tracks the deal, and later keeps the customer in service workflows.",
    problem:
      "Dealerships lose value through slow responses, manual inventory search, test-drive friction, finance document delays, and disconnected service follow-up.",
    promise: "AI handles the volume. Dealership employees close the deals.",
    metrics: [
      ["New leads", "428"],
      ["Test drives", "71"],
      ["Vehicles sold", "19"],
      ["Service bookings", "143"]
    ],
    workflow: ["Lead", "Response", "Qualification", "Vehicle match", "Test drive", "Finance", "Deal desk", "Delivery", "Service"],
    agents: [
      {
        id: "response",
        name: "Lead Response",
        category: "Sales",
        problem: "Vehicle buyers contact multiple dealerships and expect immediate answers.",
        solution: "Responds instantly across marketplace, website, WhatsApp, email, SMS, and voice.",
        inputs: ["Marketplace inquiry", "Website lead", "WhatsApp message", "Campaign source"],
        outputs: ["First response", "Lead record", "Buyer context"],
        tools: ["CRM", "WhatsApp", "Email", "Voice"],
        position: { x: 70, y: 170 }
      },
      {
        id: "qualification",
        name: "Buyer Qualification",
        category: "Sales",
        problem: "Sales teams cannot separate ready buyers from casual vehicle research.",
        solution: "Qualifies vehicle preference, budget, financing, trade-in, timeline, location, and features.",
        inputs: ["Vehicle preference", "Budget", "Timeline", "Trade-in", "Finance need"],
        outputs: ["Buyer score", "Requirement profile", "Sales alert"],
        tools: ["CRM", "DMS", "Calendar"],
        position: { x: 250, y: 96 }
      },
      {
        id: "vehicle",
        name: "Vehicle Recommendation",
        category: "Inventory",
        problem: "Inventory complexity slows down the right recommendation.",
        solution: "Ranks available vehicles by budget, body type, features, seating, fuel, and use case.",
        inputs: ["Buyer profile", "Inventory", "Vehicle specs", "Availability"],
        outputs: ["Shortlist", "Match reasons", "Alternatives"],
        tools: ["Inventory", "DMS", "CRM"],
        position: { x: 445, y: 170 }
      },
      {
        id: "test-drive",
        name: "Test Drive Scheduler",
        category: "Appointments",
        problem: "Test-drive booking takes too many calls and availability checks.",
        solution: "Coordinates customer, vehicle, salesperson, dealership location, and reminders.",
        inputs: ["Customer availability", "Vehicle availability", "Sales calendar"],
        outputs: ["Booked test drive", "Reminder", "Salesperson brief"],
        tools: ["Calendar", "CRM", "Inventory"],
        position: { x: 620, y: 282 }
      },
      {
        id: "finance",
        name: "Finance Application",
        category: "Finance",
        problem: "Finance questions and missing documents slow purchase momentum.",
        solution: "Explains options, collects documents, tracks status, and routes to finance staff.",
        inputs: ["Buyer data", "Vehicle price", "Down payment", "Documents"],
        outputs: ["Finance packet", "Missing docs", "Status update"],
        tools: ["Finance system", "Documents", "CRM"],
        position: { x: 445, y: 418 }
      },
      {
        id: "service",
        name: "Service Retention",
        category: "Service",
        problem: "After-sale value is lost when service reminders and customer care are disconnected.",
        solution: "Books service, sends maintenance reminders, tracks repair status, and escalates feedback.",
        inputs: ["Vehicle history", "Service interval", "Customer request"],
        outputs: ["Service booking", "Maintenance reminder", "Retention task"],
        tools: ["Service scheduler", "DMS", "SMS"],
        position: { x: 250, y: 418 }
      }
    ]
  }
];

export const storyChapters = [
  {
    title: "The old business stack was built in pieces.",
    body:
      "A company buys a CRM, a phone system, a calendar, a helpdesk, spreadsheets, and document tools. Each tool helps a little, but the work between them still depends on people remembering what to do next."
  },
  {
    title: "Xizo sits above the stack.",
    body:
      "Xizo becomes the operating layer that watches requests, understands intent, assigns the right AI employee, moves data between systems, and asks humans for approval when judgment matters."
  },
  {
    title: "The brand promise is control, not chaos.",
    body:
      "Xizo is not a box of chatbots. It is a visible AI workforce with clear responsibilities, workflow maps, audit trails, and human control points."
  }
];
