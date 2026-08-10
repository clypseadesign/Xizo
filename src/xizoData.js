export const industries = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    headline: 'Accelerate Deal Velocity and Broker Productivity',
    description: 'Empower brokerages and agents to handle inquiries 24/7, qualify leads instantly, and manage transactions seamlessly, eliminating lost opportunities and administrative bottlenecks.',
    accent: '#4f6eff',
    problems: [
      'Delayed response to property inquiries leading to lost leads.',
      'Time wasted qualifying unmotivated or unqualified buyers.',
      'Missed follow-ups during evenings and weekends.',
      'Extensive manual data entry into CRM systems.',
      'Poor coordination between buyers, sellers, and escrow agents.',
      'Inefficient scheduling of property viewings.'
    ],
    agents: [
      'Lead Intelligence Agent',
      'Buyer Qualification Agent',
      'Showing Scheduler Agent',
      'Listing Updates Agent',
      'Document Intelligence Agent',
      'Follow-up Agent'
    ],
    workflow: [
      'Inbound inquiry received via website, Zillow, or social media.',
      'Lead Intelligence Agent responds in < 1 minute to gather initial criteria.',
      'Buyer Qualification Agent assesses budget, timeline, and pre-approval status.',
      'Showing Scheduler Agent coordinates viewing times between buyer and current occupant.',
      'CRM is automatically updated with all interactions and next steps.',
      'Follow-up Agent nurtures leads post-viewing based on feedback.'
    ],
    outcomes: [
      'Zero missed leads during off-hours.',
      'Agents spend 60% less time on manual qualification.',
      'Increased conversion rates from inquiry to viewing.',
      'Faster transaction closing times.',
      'Enhanced client experience through immediate responsiveness.'
    ],
    metrics: [
      { label: 'Lead Response Time', before: '4h 15m', after: '< 1 minute' },
      { label: 'Lead Qualification Rate', before: '25%', after: '85%' },
      { label: 'Agent Admin Time/Week', before: '15 hours', after: '3 hours' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    headline: 'Enhance Patient Experience and Operational Efficiency',
    description: 'Streamline patient onboarding, appointment scheduling, and insurance verification to reduce administrative burden on staff and improve care accessibility.',
    accent: '#22c55e',
    problems: [
      'High call volume overwhelming front desk staff.',
      'Complex and manual insurance verification processes.',
      'High no-show rates for appointments.',
      'Lengthy patient onboarding and intake forms.',
      'Difficulty managing post-care follow-ups at scale.'
    ],
    agents: [
      'Patient Triage Agent',
      'Scheduling Agent',
      'Insurance Verification Agent',
      'Onboarding Agent',
      'Post-Care Follow-up Agent',
      'Document Intelligence Agent'
    ],
    workflow: [
      'Patient requests appointment via web or phone.',
      'Scheduling Agent finds optimal slot and books it.',
      'Insurance Verification Agent automatically checks coverage details.',
      'Onboarding Agent sends and processes digital intake forms.',
      'Pre-appointment reminders are sent to minimize no-shows.',
      'Post-Care Agent handles routine follow-up questions.'
    ],
    outcomes: [
      'Drastically reduced hold times for patients.',
      'Lower appointment no-show rates.',
      'Fewer denied claims due to upfront verification.',
      'Staff freed to focus on in-clinic patient experience.'
    ],
    metrics: [
      { label: 'Patient Hold Time', before: '12m', after: '0m (Instant)' },
      { label: 'No-Show Rate', before: '18%', after: '5%' },
      { label: 'Staff Phone Time', before: '6 hours/day', after: '1 hour/day' }
    ]
  },
  {
    id: 'finance-insurance',
    name: 'Finance & Insurance',
    headline: 'Scale Client Acquisition and Policy Management',
    description: 'Automate lead qualification, policy inquiries, and document processing to capture demand instantly and serve clients flawlessly.',
    accent: '#f59e0b',
    problems: [
      'Slow response to quote requests causing drop-offs.',
      'Complex documentation processing for underwriting.',
      'Inefficient routing of specific inquiries to specialized agents.',
      'Lack of proactive policy renewal outreach.',
      'High cost of routine customer service inquiries.',
      'Compliance risks from inconsistent communication.'
    ],
    agents: [
      'Quote Qualification Agent',
      'Document Intelligence Agent',
      'Routing & Triage Agent',
      'Renewal Outreach Agent',
      'Customer Support Agent',
      'Compliance Monitoring Agent'
    ],
    workflow: [
      'Prospect requests a quote online.',
      'Quote Qualification Agent gathers necessary risk profiling data.',
      'Document Agent extracts data from uploaded previous policies.',
      'Triage Agent routes complex cases to human underwriters.',
      'Support Agent handles routine policy questions.',
      'Renewal Agent initiates outreach 60 days before expiration.'
    ],
    outcomes: [
      'Higher quote-to-bind conversion rates.',
      'Faster processing of claims documentation.',
      'Increased client retention through proactive renewals.',
      'Reduced cost to serve for routine inquiries.',
      'Improved compliance through standardized AI interactions.'
    ],
    metrics: [
      { label: 'Quote Turnaround', before: '24-48 hours', after: 'Instant/Minutes' },
      { label: 'Policy Retention', before: '78%', after: '92%' },
      { label: 'Cost per Inquiry', before: '$15.50', after: '$1.20' }
    ]
  },
  {
    id: 'professional-services',
    name: 'Professional Services',
    headline: 'Optimize Utilization and Client Communication',
    description: 'Free up high-value consultants, lawyers, and accountants by automating client intake, scheduling, and routine document analysis.',
    accent: '#7c3aed',
    problems: [
      'Partners spending billable time on administrative tasks.',
      'Inefficient client onboarding and document collection.',
      'Slow response times to new prospect inquiries.',
      'Difficulty scheduling multi-stakeholder meetings.',
      'Manual tracking of project status and deliverables.',
      'Inconsistent formatting of routine reports.'
    ],
    agents: [
      'Client Intake Agent',
      'Scheduling Agent',
      'Document Collection Agent',
      'Status Reporting Agent',
      'CRM Agent',
      'Research & Summarization Agent'
    ],
    workflow: [
      'New prospect contacts the firm.',
      'Intake Agent conducts initial conflict check and gathers requirements.',
      'Scheduling Agent books consultation with appropriate partner.',
      'Document Agent securely collects and organizes required files.',
      'Research Agent drafts initial briefing document for partner.',
      'Status Agent provides automated weekly updates to client.'
    ],
    outcomes: [
      'Increased billable utilization for senior staff.',
      'Faster realization of revenue from new clients.',
      'Enhanced client satisfaction through transparent updates.',
      'Reduced errors in document collection.',
      'Streamlined internal operations.'
    ],
    metrics: [
      { label: 'Partner Admin Time', before: '20%', after: '5%' },
      { label: 'Onboarding Duration', before: '14 days', after: '3 days' },
      { label: 'Proposal Turnaround', before: '5 days', after: '1 day' }
    ]
  },
  {
    id: 'automotive',
    name: 'Automotive & Dealerships',
    headline: 'Drive Sales with Instant Lead Engagement',
    description: 'Capture after-hours leads, schedule test drives automatically, and nurture service customers to maximize dealership revenue.',
    accent: '#ef4444',
    problems: [
      'Leads decaying quickly during off-hours or busy weekends.',
      'Sales team struggling to follow up with long-term prospects.',
      'Service departments missing out on routine maintenance bookings.',
      'Inventory inquiries requiring manual lookups.',
      'Inconsistent customer experience across different sales reps.'
    ],
    agents: [
      'Internet Sales Agent',
      'Inventory Match Agent',
      'Test Drive Scheduler',
      'Service Booking Agent',
      'Long-term Nurture Agent',
      'Trade-in Valuation Agent'
    ],
    workflow: [
      'Customer inquires about specific vehicle online.',
      'Internet Sales Agent responds instantly, confirming availability.',
      'Trade-in Agent provides preliminary valuation based on customer input.',
      'Scheduler books test drive and sends confirmation/directions.',
      'Post-sale, Service Agent reaches out automatically for maintenance.',
      'Nurture Agent keeps in touch with undecided buyers.'
    ],
    outcomes: [
      'Higher appointment show rates.',
      'Increased service department revenue.',
      'Zero lead leakage during nights and weekends.',
      'More efficient floor sales teams.',
      'Better tracking of marketing ROI.'
    ],
    metrics: [
      { label: 'Lead to Appointment Rate', before: '12%', after: '38%' },
      { label: 'Service Bays Utilization', before: '70%', after: '95%' },
      { label: 'After-hours Lead Capture', before: '0%', after: '100%' }
    ]
  },
  {
    id: 'e-commerce',
    name: 'E-commerce',
    headline: 'Automate Support and Boost Conversions',
    description: 'Deploy intelligent agents to handle WISMO (Where Is My Order) queries, facilitate returns, and provide personalized product recommendations.',
    accent: '#06b6d4',
    problems: [
      'High volume of repetitive order status inquiries.',
      'Cart abandonment due to unanswered product questions.',
      'Complex and costly manual return processes.',
      'Inability to provide personalized recommendations at scale.',
      'Customer support team overwhelmed during peak seasons.'
    ],
    agents: [
      'Order Status Agent',
      'Product Recommendation Agent',
      'Returns & Exchanges Agent',
      'Cart Recovery Agent',
      'Customer Support Agent'
    ],
    workflow: [
      'Customer asks about order status via chat.',
      'Order Status Agent retrieves tracking info instantly.',
      'If returning, Returns Agent generates label and processes request.',
      'Cart Recovery Agent engages users before they leave the site.',
      'Support Agent handles sizing and product specification queries.'
    ],
    outcomes: [
      'Drastic reduction in support ticket volume.',
      'Higher conversion rates and average order value.',
      'Smoother returns experience improving customer loyalty.',
      'Scalable support during holiday peaks without extra hiring.'
    ],
    metrics: [
      { label: 'Support Ticket Volume', before: '10,000/mo', after: '3,000/mo' },
      { label: 'Cart Recovery Rate', before: '5%', after: '18%' },
      { label: 'Avg Resolution Time', before: '12 hours', after: '2 minutes' }
    ]
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    headline: 'Streamline Supply Chain and Operations',
    description: 'Optimize inventory management, automate vendor communications, and improve equipment maintenance scheduling through intelligent orchestration.',
    accent: '#f97316',
    problems: [
      'Manual tracking of raw material inventory.',
      'Inefficient communication with suppliers regarding delays.',
      'Reactive maintenance leading to costly downtime.',
      'Complex quoting processes for custom orders.',
      'Siloed data between shop floor and ERP systems.'
    ],
    agents: [
      'Inventory Monitoring Agent',
      'Supplier Communication Agent',
      'Predictive Maintenance Agent',
      'Custom Quoting Agent',
      'ERP Sync Agent'
    ],
    workflow: [
      'Inventory Agent detects low stock on critical component.',
      'Supplier Agent automatically drafts and sends PO to vendor.',
      'Maintenance Agent schedules servicing based on usage data.',
      'Quoting Agent analyzes specs to generate accurate custom pricing.',
      'ERP Sync Agent ensures all systems reflect real-time status.'
    ],
    outcomes: [
      'Reduced equipment downtime.',
      'Optimized inventory levels preventing stockouts.',
      'Faster turnaround on custom quotes.',
      'Better supplier relationship management.'
    ],
    metrics: [
      { label: 'Unplanned Downtime', before: '15%', after: '3%' },
      { label: 'Quote Generation Time', before: '3 days', after: '2 hours' },
      { label: 'Inventory Holding Cost', before: 'High', after: '-22%' }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    headline: 'Enhance Enrollment and Student Support',
    description: 'Automate admissions inquiries, student onboarding, and administrative support to focus resources on educational outcomes.',
    accent: '#8b5cf6',
    problems: [
      'Admissions team swamped with basic program questions.',
      'High drop-off rates during complex application processes.',
      'Students struggling to find resources or campus information.',
      'Inefficient scheduling for advising appointments.',
      'Manual processing of financial aid queries.'
    ],
    agents: [
      'Admissions Intelligence Agent',
      'Application Guide Agent',
      'Student Support Agent',
      'Advising Scheduler Agent',
      'Financial Aid Assistant'
    ],
    workflow: [
      'Prospective student asks about program prerequisites.',
      'Admissions Agent provides precise requirements and deadlines.',
      'Application Guide assists student step-by-step through forms.',
      'Advising Scheduler books meeting with academic counselor.',
      'Student Support Agent answers day-to-day campus queries.'
    ],
    outcomes: [
      'Higher enrollment conversion rates.',
      'Reduced administrative burden on faculty and staff.',
      'Improved student satisfaction and retention.',
      'Faster processing of applications.'
    ],
    metrics: [
      { label: 'Application Completion Rate', before: '45%', after: '72%' },
      { label: 'Response to Inquiry', before: '48 hours', after: 'Immediate' },
      { label: 'Advisor Admin Time', before: '30%', after: '5%' }
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    headline: 'Elevate Guest Experience and Maximize Bookings',
    description: 'Provide 24/7 concierge services, automate reservation management, and streamline pre-arrival communication for hotels and resorts.',
    accent: '#ec4899',
    problems: [
      'Front desk overwhelmed with routine guest questions.',
      'Missed booking opportunities due to delayed email responses.',
      'Inefficient upsell of amenities and services.',
      'Inconsistent pre-arrival and post-stay communication.',
      'Complex coordination for group events and catering.'
    ],
    agents: [
      'Reservation Agent',
      'Digital Concierge Agent',
      'Upsell & Amenities Agent',
      'Guest Feedback Agent',
      'Event Coordination Agent'
    ],
    workflow: [
      'Guest inquiries about room availability and rates.',
      'Reservation Agent handles booking and payment securely.',
      'Pre-arrival, Upsell Agent offers spa or dining reservations.',
      'During stay, Digital Concierge answers FAQs (e.g., wifi, pool hours).',
      'Post-stay, Feedback Agent collects reviews and issues loyalty offers.'
    ],
    outcomes: [
      'Increased direct bookings and reduced OTA commissions.',
      'Higher RevPAR through automated upselling.',
      'Exceptional guest satisfaction scores.',
      'Front desk staff focused on high-touch interactions.'
    ],
    metrics: [
      { label: 'Direct Bookings', before: '35%', after: '55%' },
      { label: 'Ancillary Revenue', before: '$X', after: '+28%' },
      { label: 'Guest Query Resolution', before: '15m', after: 'Instant' }
    ]
  },
  {
    id: 'logistics',
    name: 'Logistics',
    headline: 'Optimize Routing and Customer Visibility',
    description: 'Automate dispatch coordination, real-time tracking updates, and document processing to keep supply chains moving efficiently.',
    accent: '#14b8a6',
    problems: [
      'High volume of "Where is my freight?" inquiries.',
      'Manual processing of Bills of Lading and customs documents.',
      'Inefficient coordination between drivers, dispatch, and warehouses.',
      'Delayed exception handling for weather or traffic issues.',
      'Slow invoicing due to missing proof of delivery.'
    ],
    agents: [
      'Tracking & Visibility Agent',
      'Document Extraction Agent',
      'Dispatch Coordination Agent',
      'Exception Management Agent',
      'Invoicing Agent'
    ],
    workflow: [
      'Customer requests update on shipment status.',
      'Tracking Agent pulls real-time telematics data to respond.',
      'Driver uploads POD; Document Agent verifies and extracts data.',
      'Invoicing Agent automatically generates and sends bill to customer.',
      'Exception Agent alerts stakeholders if delays are detected.'
    ],
    outcomes: [
      'Massive reduction in trace and track calls.',
      'Faster cash flow through automated invoicing.',
      'Reduced errors in document data entry.',
      'Proactive issue resolution improving customer trust.'
    ],
    metrics: [
      { label: 'Track/Trace Calls', before: '400/day', after: '45/day' },
      { label: 'Days Sales Outstanding (DSO)', before: '45 days', after: '28 days' },
      { label: 'Document Processing Time', before: '15 mins/doc', after: '30 seconds' }
    ]
  },
  {
    id: 'construction',
    name: 'Construction',
    headline: 'Streamline Project Management and Procurement',
    description: 'Automate subcontractor communication, material ordering, and compliance tracking to keep projects on time and on budget.',
    accent: '#84cc16',
    problems: [
      'Delays caused by miscommunication with subcontractors.',
      'Manual tracking of material deliveries and inventory.',
      'Complex management of change orders and approvals.',
      'Time-consuming daily reporting from site supervisors.',
      'Risk of compliance issues due to missing documentation.'
    ],
    agents: [
      'Subcontractor Coordination Agent',
      'Procurement Agent',
      'Change Order Management Agent',
      'Site Reporting Agent',
      'Compliance & Safety Agent'
    ],
    workflow: [
      'Site supervisor dictates daily log; Reporting Agent formats and distributes it.',
      'Procurement Agent tracks material delivery ETAs and flags delays.',
      'Subcontractor Agent sends automated schedule reminders.',
      'Change Order Agent routes approvals to necessary stakeholders.',
      'Compliance Agent verifies all workers have current certifications.'
    ],
    outcomes: [
      'Projects completed closer to original timelines.',
      'Reduced idle time on job sites.',
      'Better visibility into project profitability.',
      'Mitigated risk through automated compliance checks.'
    ],
    metrics: [
      { label: 'Schedule Variance', before: '+15%', after: '+4%' },
      { label: 'Admin Time per PM', before: '25 hours/week', after: '8 hours/week' },
      { label: 'Change Order Approval', before: '7 days', after: '2 days' }
    ]
  },
  {
    id: 'saas-technology',
    name: 'SaaS / Technology',
    headline: 'Accelerate Growth and Customer Success',
    description: 'Automate product onboarding, technical support, and account expansion to drive retention and scale efficiently.',
    accent: '#3b82f6',
    problems: [
      'High churn rates due to poor user onboarding.',
      'Support engineering time wasted on routine technical issues.',
      'Missed upsell opportunities within existing accounts.',
      'Inefficient routing of bugs to development teams.',
      'Difficulty maintaining up-to-date knowledge bases.'
    ],
    agents: [
      'Product Onboarding Agent',
      'Technical Support Agent',
      'Customer Success / Upsell Agent',
      'Bug Triage Agent',
      'Knowledge Base Agent'
    ],
    workflow: [
      'New user signs up; Onboarding Agent sends personalized setup sequence.',
      'User encounters issue; Technical Support Agent attempts resolution using docs.',
      'If unresolved, Bug Triage Agent gathers logs and creates Jira ticket.',
      'Success Agent identifies high usage and flags account for upgrade.',
      'Knowledge Agent constantly updates internal docs based on resolved tickets.'
    ],
    outcomes: [
      'Higher trial-to-paid conversion rates.',
      'Reduced time-to-value for new customers.',
      'Increased Net Revenue Retention (NRR).',
      'Engineering resources focused on core product development.'
    ],
    metrics: [
      { label: 'Time to Value', before: '14 days', after: '3 days' },
      { label: 'Tier 1 Support Deflection', before: '20%', after: '65%' },
      { label: 'Net Revenue Retention', before: '105%', after: '118%' }
    ]
  }
];

export const businessProblems = [
  // Revenue Category
  {
    id: 'rev-1', category: 'Revenue', title: 'Slow Lead Response Times', impact: 'High',
    description: 'Taking hours to respond to inbound leads results in lost prospects who move on to competitors.',
    aiOpportunity: 'Deploy agents to respond instantly 24/7, qualify intent, and book meetings.',
    agents: ['Lead Intelligence Agent', 'Scheduling Agent'],
    outcome: 'Increased conversion rates and zero lost leads due to delay.'
  },
  {
    id: 'rev-2', category: 'Revenue', title: 'Inconsistent Follow-up', impact: 'High',
    description: 'Sales reps abandon leads after 1-2 attempts, leaving pipeline value on the table.',
    aiOpportunity: 'Automate personalized, multi-channel follow-up sequences based on prospect behavior.',
    agents: ['Follow-up Agent', 'CRM Agent'],
    outcome: 'Higher contact rates and recovered pipeline value.'
  },
  {
    id: 'rev-3', category: 'Revenue', title: 'Poor Lead Qualification', impact: 'Medium',
    description: 'Sales teams waste time on unqualified leads while high-value prospects wait.',
    aiOpportunity: 'Use AI to score and route leads based on demographic and behavioral data.',
    agents: ['Qualification Agent', 'Routing Agent'],
    outcome: 'Sales reps spend 100% of time on qualified opportunities.'
  },
  {
    id: 'rev-4', category: 'Revenue', title: 'Missed Upsell Opportunities', impact: 'Medium',
    description: 'Account managers fail to identify signals that a client is ready for expansion.',
    aiOpportunity: 'Analyze product usage and interaction data to trigger proactive upsell offers.',
    agents: ['Analytics Agent', 'Customer Success Agent'],
    outcome: 'Increased Net Revenue Retention (NRR) and lifetime value.'
  },
  {
    id: 'rev-5', category: 'Revenue', title: 'Inaccurate Sales Forecasting', impact: 'High',
    description: 'Reps rely on gut feeling rather than data, leading to missed targets and poor planning.',
    aiOpportunity: 'AI analyzes historical win rates, engagement signals, and deal velocity to predict outcomes.',
    agents: ['Analytics & Reporting Agent'],
    outcome: '95%+ forecast accuracy and predictable revenue.'
  },
  {
    id: 'rev-6', category: 'Revenue', title: 'Ineffective Outbound Prospecting', impact: 'Medium',
    description: 'Generic cold outreach yields low response rates and damages brand reputation.',
    aiOpportunity: 'AI generates highly personalized outreach based on deep research of the prospect.',
    agents: ['Lead Intelligence Agent', 'Sales Agent'],
    outcome: '3x higher positive reply rates on outbound campaigns.'
  },

  // Customer Category
  {
    id: 'cust-1', category: 'Customer', title: 'High Support Volume', impact: 'High',
    description: 'Customer service teams are overwhelmed with repetitive, basic questions.',
    aiOpportunity: 'Deploy AI agents to resolve tier-1 queries instantly across all channels.',
    agents: ['Customer Support Agent'],
    outcome: '50-70% reduction in human-handled tickets.'
  },
  {
    id: 'cust-2', category: 'Customer', title: 'Lengthy Resolution Times', impact: 'Medium',
    description: 'Complex issues take days to resolve as they bounce between departments.',
    aiOpportunity: 'Agents gather all necessary context upfront and route to the precise human expert.',
    agents: ['Triage Agent', 'Human Escalation Agent'],
    outcome: 'Drastically reduced mean time to resolution (MTTR).'
  },
  {
    id: 'cust-3', category: 'Customer', title: 'Friction in Onboarding', impact: 'High',
    description: 'Customers drop off during complex setup or documentation phases.',
    aiOpportunity: 'Interactive onboarding agents guide users step-by-step and answer questions in real-time.',
    agents: ['Onboarding Agent', 'Document Intelligence Agent'],
    outcome: 'Faster time-to-value and lower early-stage churn.'
  },
  {
    id: 'cust-4', category: 'Customer', title: 'Lack of 24/7 Availability', impact: 'Medium',
    description: 'Global customers or night-owls receive poor experience outside standard hours.',
    aiOpportunity: 'AI provides consistent, high-quality support at any time of day.',
    agents: ['Customer Support Agent'],
    outcome: 'Improved CSAT scores across all timezones.'
  },
  {
    id: 'cust-5', category: 'Customer', title: 'Inconsistent Customer Experience', impact: 'Medium',
    description: 'Quality of service varies wildly depending on which human rep takes the case.',
    aiOpportunity: 'AI ensures 100% adherence to brand voice and standard operating procedures.',
    agents: ['Compliance Monitoring Agent'],
    outcome: 'Uniform, high-quality customer interactions.'
  },
  {
    id: 'cust-6', category: 'Customer', title: 'Poor Feedback Loop', impact: 'Low',
    description: 'Valuable customer insights are buried in support tickets and never reach product teams.',
    aiOpportunity: 'AI categorizes and summarizes support interactions to identify trending issues.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Data-driven product improvements based on voice-of-customer.'
  },

  // Operations Category
  {
    id: 'ops-1', category: 'Operations', title: 'Manual Data Entry', impact: 'High',
    description: 'Employees spend hours copying data between emails, PDFs, and internal systems.',
    aiOpportunity: 'Agents automatically extract data from unstructured formats and update databases.',
    agents: ['Document Intelligence Agent', 'CRM Agent'],
    outcome: 'Elimination of manual entry errors and hours saved per employee daily.'
  },
  {
    id: 'ops-2', category: 'Operations', title: 'Siloed Software Systems', impact: 'Medium',
    description: 'Critical business tools do not communicate, causing process bottlenecks.',
    aiOpportunity: 'AI orchestrates workflows across multiple APIs and systems seamlessly.',
    agents: ['Orchestration Agent'],
    outcome: 'End-to-end automated processes without replacing legacy software.'
  },
  {
    id: 'ops-3', category: 'Operations', title: 'Inefficient Scheduling', impact: 'Medium',
    description: 'Coordinating meetings between multiple external and internal parties causes email ping-pong.',
    aiOpportunity: 'Scheduling agents negotiate times based on availability and priorities.',
    agents: ['Scheduling Agent'],
    outcome: 'Meetings booked instantly with zero administrative effort.'
  },
  {
    id: 'ops-4', category: 'Operations', title: 'Slow Document Processing', impact: 'High',
    description: 'Contracts, invoices, and forms take days to review and approve.',
    aiOpportunity: 'AI highlights key clauses, checks for compliance, and routes for signature.',
    agents: ['Document Intelligence Agent', 'Workflow Agent'],
    outcome: 'Turnaround times reduced from days to minutes.'
  },
  {
    id: 'ops-5', category: 'Operations', title: 'Lack of Process Visibility', impact: 'Medium',
    description: 'Management cannot see where bottlenecks are occurring in operational workflows.',
    aiOpportunity: 'AI tracks every step of a process and flags delays automatically.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Clear bottleneck identification and continuous process improvement.'
  },
  {
    id: 'ops-6', category: 'Operations', title: 'High Error Rates in Repetitive Tasks', impact: 'High',
    description: 'Human fatigue leads to mistakes in high-volume, routine processes.',
    aiOpportunity: 'AI agents perform repetitive tasks with 100% accuracy and consistency.',
    agents: ['Data Processing Agent'],
    outcome: 'Zero defects in routine operational tasks.'
  },

  // Finance Category
  {
    id: 'fin-1', category: 'Finance', title: 'Delayed Invoicing', impact: 'High',
    description: 'Manual invoice generation leads to delayed sending and slower cash flow.',
    aiOpportunity: 'Agents automatically generate and send invoices when project milestones are hit.',
    agents: ['Finance Agent'],
    outcome: 'Reduced Days Sales Outstanding (DSO) and improved cash flow.'
  },
  {
    id: 'fin-2', category: 'Finance', title: 'Inefficient Expense Management', impact: 'Medium',
    description: 'Reviewing employee receipts and expense reports is tedious and prone to fraud.',
    aiOpportunity: 'AI scans receipts, verifies against policy, and flags anomalies.',
    agents: ['Document Intelligence Agent', 'Finance Agent'],
    outcome: 'Faster reimbursements and strict policy enforcement.'
  },
  {
    id: 'fin-3', category: 'Finance', title: 'Slow Accounts Payable Processing', impact: 'High',
    description: 'Vendor invoices get lost in emails, delaying payments and damaging relationships.',
    aiOpportunity: 'Agents extract invoice data, match against POs, and route for approval.',
    agents: ['Finance Agent', 'Document Intelligence Agent'],
    outcome: 'Capture early payment discounts and avoid late fees.'
  },
  {
    id: 'fin-4', category: 'Finance', title: 'Complex Financial Reporting', impact: 'Medium',
    description: 'End-of-month close takes weeks due to manual data reconciliation.',
    aiOpportunity: 'AI continuously reconciles transactions and drafts preliminary reports.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Month-end close time reduced by 50%.'
  },
  {
    id: 'fin-5', category: 'Finance', title: 'Ineffective Payment Collection', impact: 'High',
    description: 'Following up on past-due invoices requires uncomfortable human effort.',
    aiOpportunity: 'AI executes polite, persistent, multi-channel dunning campaigns.',
    agents: ['Follow-up Agent', 'Finance Agent'],
    outcome: 'Significantly lower bad debt write-offs.'
  },
  {
    id: 'fin-6', category: 'Finance', title: 'Budget Overrun Blindspots', impact: 'Medium',
    description: 'Departments overspend because budget tracking is retrospective.',
    aiOpportunity: 'AI monitors spend in real-time and alerts management before overruns occur.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Proactive cost control and strict budget adherence.'
  },

  // HR Category
  {
    id: 'hr-1', category: 'HR', title: 'Slow Recruitment Process', impact: 'High',
    description: 'Screening hundreds of resumes manually delays hiring top talent.',
    aiOpportunity: 'AI shortlists candidates based on objective criteria and role requirements.',
    agents: ['Document Intelligence Agent', 'Qualification Agent'],
    outcome: 'Time-to-hire reduced by weeks.'
  },
  {
    id: 'hr-2', category: 'HR', title: 'Inconsistent Employee Onboarding', impact: 'High',
    description: 'New hires receive varied experiences, affecting early productivity and retention.',
    aiOpportunity: 'Onboarding agents guide new hires through paperwork, IT setup, and training.',
    agents: ['Onboarding Agent'],
    outcome: 'Faster ramp-up time for new employees.'
  },
  {
    id: 'hr-3', category: 'HR', title: 'HR Helpdesk Overload', impact: 'Medium',
    description: 'HR staff spend hours answering basic questions about benefits and policies.',
    aiOpportunity: 'AI assistants provide instant, accurate answers referencing company handbooks.',
    agents: ['Customer Support Agent (Internal)'],
    outcome: 'HR teams focus on strategic initiatives rather than policy FAQs.'
  },
  {
    id: 'hr-4', category: 'HR', title: 'Poor Performance Tracking', impact: 'Low',
    description: 'Reviews are subjective and happen too infrequently to drive improvement.',
    aiOpportunity: 'AI aggregates continuous feedback and metrics to draft objective reviews.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Fairer, data-driven performance evaluations.'
  },
  {
    id: 'hr-5', category: 'HR', title: 'High Employee Turnover', impact: 'High',
    description: 'Companies fail to detect employee dissatisfaction until they resign.',
    aiOpportunity: 'AI analyzes engagement surveys and communication patterns to predict flight risks.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Proactive retention strategies applied to key personnel.'
  },
  {
    id: 'hr-6', category: 'HR', title: 'Complex Leave Management', impact: 'Low',
    description: 'Tracking PTO, sick leave, and compliance across jurisdictions is error-prone.',
    aiOpportunity: 'Agents automate request routing, balance updates, and compliance checks.',
    agents: ['Workflow Agent'],
    outcome: 'Zero-error leave tracking and instant employee answers.'
  },

  // Knowledge Category
  {
    id: 'knw-1', category: 'Knowledge', title: 'Lost Institutional Knowledge', impact: 'High',
    description: 'Critical information leaves the company when key employees depart.',
    aiOpportunity: 'AI continuously indexes communications, docs, and processes into a searchable brain.',
    agents: ['Document Intelligence Agent'],
    outcome: 'Knowledge becomes a permanent company asset.'
  },
  {
    id: 'knw-2', category: 'Knowledge', title: 'Time Wasted Searching for Information', impact: 'Medium',
    description: 'Employees spend up to 20% of their week just looking for the right files or answers.',
    aiOpportunity: 'Deploy a unified AI search interface across Google Drive, Slack, and CRM.',
    agents: ['Knowledge Search Agent'],
    outcome: 'Instant access to company information, saving hours weekly.'
  },
  {
    id: 'knw-3', category: 'Knowledge', title: 'Outdated Standard Operating Procedures (SOPs)', impact: 'Medium',
    description: 'Process documentation is written once and quickly becomes obsolete.',
    aiOpportunity: 'AI observes actual workflows and automatically drafts or updates SOPs.',
    agents: ['Documentation Agent'],
    outcome: 'Living, always-accurate process documentation.'
  },
  {
    id: 'knw-4', category: 'Knowledge', title: 'Siloed Departmental Data', impact: 'High',
    description: 'Sales doesn\'t know what Support is doing; Product is disconnected from Marketing.',
    aiOpportunity: 'AI synthesizes insights across departments and pushes relevant updates to stakeholders.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'True organizational alignment and cross-functional visibility.'
  },
  {
    id: 'knw-5', category: 'Knowledge', title: 'Inefficient Meeting Summarization', impact: 'Low',
    description: 'Notes are poorly taken, and action items are frequently dropped.',
    aiOpportunity: 'AI joins meetings, transcribes, summarizes, and assigns action items automatically.',
    agents: ['Meeting Intelligence Agent'],
    outcome: 'Perfect meeting recall and accountable execution of next steps.'
  },
  {
    id: 'knw-6', category: 'Knowledge', title: 'Slow Competitive Analysis', impact: 'Medium',
    description: 'Tracking competitor moves requires manual research that is often delayed.',
    aiOpportunity: 'Agents constantly monitor competitor sites, pricing, and news, alerting leadership.',
    agents: ['Research & Summarization Agent'],
    outcome: 'Real-time competitive intelligence driving faster strategic pivots.'
  },
  
  // Management Category
  {
    id: 'mgt-1', category: 'Management', title: 'Lack of Real-time Business Metrics', impact: 'High',
    description: 'Executives rely on outdated dashboards or gut instinct to make decisions.',
    aiOpportunity: 'AI provides real-time, conversational access to all KPI data.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Data-driven decision making at executive speed.'
  },
  {
    id: 'mgt-2', category: 'Management', title: 'Micromanagement Overhead', impact: 'Medium',
    description: 'Managers spend too much time checking on project status rather than leading.',
    aiOpportunity: 'AI agents proactively collect status updates and aggregate them for management.',
    agents: ['Status Reporting Agent'],
    outcome: 'Leaders focus on strategy and coaching, not task tracking.'
  },
  {
    id: 'mgt-3', category: 'Management', title: 'Inconsistent Goal Alignment (OKRs)', impact: 'High',
    description: 'Company goals fail to translate into daily employee activities.',
    aiOpportunity: 'AI tracks project outputs against strategic OKRs and flags misalignments.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Entire organization rows in the exact same direction.'
  },
  {
    id: 'mgt-4', category: 'Management', title: 'Delayed Crisis Response', impact: 'High',
    description: 'Leadership is often the last to know about systemic operational failures.',
    aiOpportunity: 'AI detects anomalies in operations (e.g., spike in support tickets, drop in traffic) and alerts immediately.',
    agents: ['Monitoring & Alert Agent'],
    outcome: 'Rapid crisis mitigation before customer impact.'
  },
  {
    id: 'mgt-5', category: 'Management', title: 'Poor Resource Allocation', impact: 'Medium',
    description: 'Teams are overstaffed or understaffed due to unpredictable demand.',
    aiOpportunity: 'AI predicts workload volumes based on historical and seasonal data.',
    agents: ['Analytics & Reporting Agent'],
    outcome: 'Optimized staffing levels and reduced operational waste.'
  },
  {
    id: 'mgt-6', category: 'Management', title: 'Difficulty Scaling Operations', impact: 'High',
    description: 'Revenue growth requires linear headcount growth, crushing margins.',
    aiOpportunity: 'Implement an AI OS layer to decouple operational execution from human headcount.',
    agents: ['Orchestration Agent'],
    outcome: 'Exponential scaling with flat or declining operational costs.'
  }
];

export const useCases = [
  {
    id: 'uc-1',
    title: 'Lead Response & Qualification',
    problem: 'Inbound leads expect immediate responses, but human sales teams are unavailable nights, weekends, or during busy periods. Delayed responses lead to massive drop-off rates to competitors.',
    scenario: 'A high-value prospect fills out a pricing request form on your website at 11:30 PM on a Friday.',
    agents: ['Lead Intelligence Agent', 'Qualification Agent', 'Scheduling Agent', 'CRM Agent'],
    steps: [
      'Lead Intelligence Agent instantly receives the form data and enriches it with company info (size, industry, tech stack) using external APIs.',
      'Qualification Agent analyzes the enriched data against ideal customer profiles and scores the lead as "High Priority".',
      'Within 30 seconds, the agent emails the prospect a personalized response acknowledging their specific industry and offering available meeting times.',
      'The prospect selects a time. The Scheduling Agent books the calendar invite and sends a confirmation.',
      'The CRM Agent logs the entire interaction, creates the opportunity, and assigns it to the appropriate sales rep with a complete briefing.'
    ],
    outcome: 'The lead is captured, qualified, and booked for a meeting while the sales team is asleep, ensuring zero leakage of marketing-generated demand.',
    metrics: [
      { label: 'Response Time', before: '14 hours', after: '< 1 minute' },
      { label: 'Lead-to-Meeting Rate', before: '12%', after: '45%' },
      { label: 'Cost per Qualified Lead', before: '$150', after: '$12' }
    ]
  },
  {
    id: 'uc-2',
    title: 'Automated Customer Support Resolution',
    problem: 'Support teams are drowning in routine queries (password resets, order status, basic how-tos), causing long wait times for customers with complex, high-stakes issues.',
    scenario: 'A customer submits a support ticket regarding a failed integration between your software and their CRM.',
    agents: ['Triage Agent', 'Knowledge Base Agent', 'Customer Support Agent', 'Human Escalation Agent'],
    steps: [
      'Triage Agent categorizes the ticket intent and assesses sentiment, recognizing frustration.',
      'Knowledge Base Agent instantly queries internal documentation, past resolved tickets, and API logs related to the user.',
      'Customer Support Agent formulates a highly specific response with exact steps to fix the API key configuration error, sending it within minutes.',
      'If the user replies that the issue persists, the Human Escalation Agent seamlessly routes the entire context to a Tier 2 engineer.',
      'Once resolved by the human, the Knowledge Base Agent updates its memory to handle similar edge cases automatically in the future.'
    ],
    outcome: 'Routine tickets are deflected entirely, and complex tickets are resolved faster because humans receive complete, pre-researched context.',
    metrics: [
      { label: 'First Contact Resolution', before: '40%', after: '78%' },
      { label: 'Average Resolution Time', before: '2.5 days', after: '15 minutes' },
      { label: 'Human Ticket Volume', before: '1,000/week', after: '300/week' }
    ]
  },
  {
    id: 'uc-3',
    title: 'Frictionless Customer Onboarding',
    problem: 'New clients experience buyers remorse when post-sale onboarding involves confusing emails, manual data requests, and lack of clear next steps.',
    scenario: 'A B2B client signs a contract and needs to be onboarded onto your enterprise platform.',
    agents: ['Onboarding Agent', 'Document Intelligence Agent', 'Project Management Agent'],
    steps: [
      'Upon contract signature in the CRM, the Onboarding Agent triggers a welcome sequence with a dynamic checklist.',
      'The client uploads their legacy data files in various formats (PDFs, messy CSVs).',
      'The Document Intelligence Agent extracts, cleans, and structures the data automatically, mapping it to the new system format.',
      'The Project Management Agent tracks progress, sends automated nudges for missing items, and schedules the kickoff call.',
      'A complete readiness report is generated for the human Account Manager before the first meeting.'
    ],
    outcome: 'The client experiences a smooth, professional onboarding process, reaching "Aha!" moment faster, leading to higher retention.',
    metrics: [
      { label: 'Time to Value (TTV)', before: '45 days', after: '12 days' },
      { label: 'Onboarding Drop-off', before: '15%', after: '2%' },
      { label: 'Account Manager Capacity', before: '10 accounts', after: '35 accounts' }
    ]
  },
  {
    id: 'uc-4',
    title: 'Intelligent Payment Collection & Dunning',
    problem: 'Finance teams waste valuable time manually chasing overdue invoices, often using rigid templates that damage customer relationships.',
    scenario: 'A key client’s invoice is 15 days past due, triggering the collection process.',
    agents: ['Finance Agent', 'Follow-up Agent', 'Negotiation Agent'],
    steps: [
      'Finance Agent detects the overdue status and reviews the client’s payment history (usually on time, high lifetime value).',
      'Follow-up Agent crafts a highly polite, personalized email checking if the invoice was received and offering a secure payment link.',
      'If unpaid after 30 days, the agent escalates the tone appropriately while maintaining professionalism.',
      'If the client responds indicating cash flow issues, the Negotiation Agent (guided by strict parameters) offers a 2-part payment plan.',
      'Upon agreement, the system automatically updates the ERP and schedules the new payment dates.'
    ],
    outcome: 'Cash flow is accelerated without manual intervention, and sensitive customer relationships are preserved through contextual communication.',
    metrics: [
      { label: 'Days Sales Outstanding', before: '52 days', after: '31 days' },
      { label: 'Collection Success Rate', before: '70%', after: '94%' },
      { label: 'Finance Team Time Saved', before: '20 hrs/week', after: '2 hrs/week' }
    ]
  },
  {
    id: 'uc-5',
    title: 'Automated Reporting & Insight Generation',
    problem: 'Management waits until the end of the month for reports that are out of date the moment they are generated, hindering agile decision-making.',
    scenario: 'The executive team needs a weekly summary of sales performance, marketing ROI, and operational bottlenecks.',
    agents: ['Data Gathering Agent', 'Analytics Agent', 'Presentation Agent'],
    steps: [
      'Data Gathering Agent pulls raw data via APIs from Salesforce, Google Analytics, and Zendesk on Friday evening.',
      'Analytics Agent processes the data, identifies a 15% drop in conversion rate on a specific ad campaign, and cross-references it with an increase in support tickets about a website bug.',
      'Presentation Agent drafts a concise executive summary highlighting this specific correlation and suggesting immediate action.',
      'The formatted report (PDF and Slack message) is delivered to the executive team at 8:00 AM Monday.',
      'Executives can "chat" with the report to drill down into specific data points instantly.'
    ],
    outcome: 'Leaders gain actionable, cross-functional intelligence in real-time, completely eliminating manual spreadsheet work.',
    metrics: [
      { label: 'Report Generation Time', before: '3 days', after: 'Instant' },
      { label: 'Data Accuracy', before: '85%', after: '100%' },
      { label: 'Time to Insight Identification', before: 'Weeks', after: 'Hours' }
    ]
  }
];

export const agentTypes = [
  {
    id: 'agt-1',
    name: 'Lead Intelligence Agent',
    role: 'Top-of-Funnel Research',
    purpose: 'Enriches inbound leads with deep data and conducts research for outbound prospecting.',
    inputs: ['Email Address', 'Company Name', 'LinkedIn URL'],
    actions: ['Scrape company website', 'Query Clearbit/ZoomInfo API', 'Analyze recent news/press releases'],
    connects: ['CRM', 'Marketing Automation', 'Data Providers'],
    humanApproval: false,
    kpi: 'Data Enrichment Completion Rate'
  },
  {
    id: 'agt-2',
    name: 'Qualification Agent',
    role: 'Lead Scoring & Routing',
    purpose: 'Assesses lead quality based on strict parameters to ensure sales only talks to ready buyers.',
    inputs: ['Enriched Lead Data', 'Website Behavior', 'Ideal Customer Profile (ICP) parameters'],
    actions: ['Calculate lead score', 'Assign to sales rep based on territory/expertise', 'Update CRM status'],
    connects: ['CRM', 'Lead Routing Software'],
    humanApproval: false,
    kpi: 'Sales Acceptance Rate'
  },
  {
    id: 'agt-3',
    name: 'Sales Agent',
    role: 'Outbound & Inbound Communication',
    purpose: 'Crafts and sends highly personalized emails to engage prospects and handle initial objections.',
    inputs: ['Lead Profile', 'Product Value Proposition', 'Objection Handling Playbook'],
    actions: ['Draft personalized email', 'Respond to basic pricing questions', 'Suggest meeting times'],
    connects: ['Email Service (Gmail/Outlook)', 'CRM'],
    humanApproval: true, // often true for outbound
    kpi: 'Positive Reply Rate'
  },
  {
    id: 'agt-4',
    name: 'Scheduling Agent',
    role: 'Calendar Management',
    purpose: 'Eliminates back-and-forth emails to find suitable meeting times for all stakeholders.',
    inputs: ['Participant Emails', 'Meeting Duration Requirements', 'Timezone Preferences'],
    actions: ['Analyze calendar availability', 'Propose optimal slots', 'Send calendar invites with Zoom/Meet links'],
    connects: ['Google Calendar/O365', 'Video Conferencing APIs'],
    humanApproval: false,
    kpi: 'Meetings Booked vs Requested'
  },
  {
    id: 'agt-5',
    name: 'CRM Agent',
    role: 'Data Integrity',
    purpose: 'Ensures the CRM is always up-to-date without requiring manual data entry from humans.',
    inputs: ['Email threads', 'Call transcripts', 'Meeting notes'],
    actions: ['Extract action items', 'Update deal stages', 'Log communication history automatically'],
    connects: ['Salesforce', 'HubSpot', 'Gong/Chorus'],
    humanApproval: false,
    kpi: 'CRM Completeness Score'
  },
  {
    id: 'agt-6',
    name: 'Follow-up Agent',
    role: 'Pipeline Nurture',
    purpose: 'Persistently engages stalled deals or unresponsive contacts until they reply.',
    inputs: ['Deal Stage', 'Last Contact Date', 'Previous Context'],
    actions: ['Trigger nurture sequence', 'Vary messaging channels (email, LinkedIn)', 'Alert rep when prospect re-engages'],
    connects: ['CRM', 'Sales Engagement Platform'],
    humanApproval: false,
    kpi: 'Pipeline Reactivation Rate'
  },
  {
    id: 'agt-7',
    name: 'Customer Support Agent',
    role: 'Tier 1 Resolution',
    purpose: 'Instantly resolves common customer issues across chat, email, and social media.',
    inputs: ['Customer Query', 'Knowledge Base', 'User Account Data'],
    actions: ['Provide step-by-step solutions', 'Process refunds/exchanges', 'Update account settings'],
    connects: ['Zendesk/Intercom', 'Internal Databases', 'Stripe'],
    humanApproval: false,
    kpi: 'Ticket Deflection Rate'
  },
  {
    id: 'agt-8',
    name: 'Onboarding Agent',
    role: 'Client Success',
    purpose: 'Guides new users or clients through the setup process to ensure rapid time-to-value.',
    inputs: ['New Client Contract', 'Implementation Checklist'],
    actions: ['Send welcome sequence', 'Request necessary documents', 'Track milestone completion'],
    connects: ['Project Management Tool', 'CRM', 'Email'],
    humanApproval: false,
    kpi: 'Time to First Value (TTFV)'
  },
  {
    id: 'agt-9',
    name: 'Finance Agent',
    role: 'Accounts Receivable/Payable',
    purpose: 'Automates invoicing, expense tracking, and polite payment collection.',
    inputs: ['Completed Projects', 'Vendor Invoices', 'Bank Feeds'],
    actions: ['Generate and send invoices', 'Match POs to invoices', 'Send dunning emails'],
    connects: ['QuickBooks/Xero/NetSuite', 'Stripe/Bank APIs'],
    humanApproval: true, // for large payments
    kpi: 'Days Sales Outstanding (DSO)'
  },
  {
    id: 'agt-10',
    name: 'Analytics & Reporting Agent',
    role: 'Business Intelligence',
    purpose: 'Transforms raw data into actionable executive summaries on a schedule or on demand.',
    inputs: ['Cross-department Data Sources', 'KPI Definitions'],
    actions: ['Aggregate data', 'Identify anomalies or trends', 'Draft natural language summaries'],
    connects: ['Data Warehouse', 'BI Tools', 'Slack/Teams'],
    humanApproval: false,
    kpi: 'Time to Insight'
  },
  {
    id: 'agt-11',
    name: 'Document Intelligence Agent',
    role: 'Unstructured Data Processing',
    purpose: 'Reads PDFs, images, and messy spreadsheets to extract structured data for other systems.',
    inputs: ['PDF Contracts', 'Scanned Receipts', 'CSV files'],
    actions: ['OCR text extraction', 'Semantic mapping to database fields', 'Flag missing information'],
    connects: ['Cloud Storage (Drive/DropBox)', 'ERP/CRM'],
    humanApproval: true, // for low-confidence reads
    kpi: 'Extraction Accuracy Rate'
  },
  {
    id: 'agt-12',
    name: 'Human Escalation Agent',
    role: 'Handoff Coordinator',
    purpose: 'Recognizes when a situation requires empathy, complex judgment, or physical action and routes it flawlessly.',
    inputs: ['Sentiment Analysis', 'Complexity Score', 'System Limitations'],
    actions: ['Compile complete context brief', 'Identify appropriate human expert', 'Transfer conversation seamlessly'],
    connects: ['Routing Systems', 'Slack/Teams', 'Ticketing Systems'],
    humanApproval: false,
    kpi: 'Seamless Handoff Rate'
  }
];

export const resources = [
  {
    id: 'res-1',
    title: 'How to Identify AI Opportunities in Your Business',
    category: 'Strategy',
    readTime: '6 min read',
    excerpt: 'Stop looking for "AI use cases" and start looking for process bottlenecks. Discover the framework for identifying tasks that are ripe for autonomous orchestration.',
    content: 'The most common mistake businesses make when adopting AI is searching for a place to put it. Instead of asking "How can we use AI?", leaders must ask "Where are our current processes breaking down due to human limitations?" The answer to the latter almost always reveals the perfect opportunity for AI intervention. \n\nTo effectively identify these opportunities, map out your core business processes and look for three specific indicators: high volume, high repetition, and high error rates. These are tasks where human cognitive ability is wasted on rote mechanics. For example, manual data entry from PDF invoices into an ERP, or a sales team spending 30% of their day writing follow-up emails. \n\nOnce identified, evaluate these bottlenecks on two axes: Value (how much money/time it saves) and Feasibility (how structured the data is). The tasks in the top right quadrant—high value, highly structured data—are your immediate priorities for AI agent deployment. Start small, prove the ROI on a single workflow, and expand from there.'
  },
  {
    id: 'res-2',
    title: 'AI Agents vs AI Operating Systems — What\'s the Difference?',
    category: 'Technology',
    readTime: '8 min read',
    excerpt: 'An AI agent does a task; an AI Operating System runs a business. Understand why point solutions are giving way to orchestrated AI ecosystems.',
    content: 'The market is currently flooded with "AI Agents" designed to do one specific thing: write a blog post, draft an email, or summarize a meeting. While useful, these are fundamentally point solutions. They operate in silos, requiring humans to stitch their outputs together. This is the equivalent of having a dozen specialized employees who refuse to talk to one another.\n\nAn AI Operating System (AI OS), on the other hand, provides the orchestration layer. It is the managerial intelligence that coordinates multiple specialized agents, handles data passing between them, and connects directly to your existing software stack (CRM, ERP, Billing). \n\nWhen a point solution AI writes an email, a human still has to send it and update the CRM. When an AI OS handles the workflow, Agent A researches the lead, Agent B drafts the email, Agent C sends it via API, and Agent D updates Salesforce. The transition from individual agents to an OS-level architecture is what allows companies to achieve autonomous operations at scale.'
  },
  {
    id: 'res-3',
    title: 'How Agent Orchestration Works',
    category: 'Deep Dive',
    readTime: '10 min read',
    excerpt: 'Look under the hood of modern AI workflows. Learn how supervisor agents delegate tasks, handle errors, and manage complex multi-step processes.',
    content: 'Agent orchestration relies on a hierarchical structure, much like a traditional corporate org chart. At the top sits a "Supervisor" or "Router" agent. When a complex prompt or trigger enters the system (e.g., "Onboard this new client"), the Supervisor doesn\'t do the work itself. Instead, it breaks the massive task down into smaller, actionable sub-tasks.\n\nIt then delegates these sub-tasks to specialized "Worker" agents. The Document Agent is dispatched to process the client\'s uploaded files; the CRM Agent is told to create the new account record; the Email Agent is tasked with sending the welcome packet. Crucially, the Supervisor manages the dependencies. It knows the Email Agent cannot send the packet until the CRM Agent returns the newly generated Account ID.\n\nIf a Worker agent encounters an error—perhaps an API is down or a document is illegible—it reports back to the Supervisor. The Supervisor evaluates the error, decides whether to attempt a retry, try an alternative method, or trigger a "Human-in-the-loop" escalation, ensuring the workflow never silently fails.'
  },
  {
    id: 'res-4',
    title: 'What Is a Business AI Audit?',
    category: 'Implementation',
    readTime: '5 min read',
    excerpt: 'Before implementing AI, you must know where you stand. Learn the 4-step process of auditing your operations for AI readiness.',
    content: 'A Business AI Audit is a diagnostic process designed to evaluate a company\'s technological infrastructure, data hygiene, and operational workflows to determine its readiness for AI integration. Skipping this step often results in failed AI implementations, as organizations attempt to automate broken processes or utilize siloed, unstructured data.\n\nThe audit typically follows four stages. First, System Mapping: cataloging every piece of software used across the organization and identifying API capabilities. Second, Process Mining: interviewing stakeholders to document exactly how work gets done, not just how the manual says it gets done. \n\nThird, Data Assessment: determining if the company\'s data is clean, accessible, and structured enough for an AI to interpret. Finally, Value Leakage Analysis: calculating the specific financial cost of current manual inefficiencies to prioritize which AI deployments will yield the highest immediate ROI.'
  },
  {
    id: 'res-5',
    title: 'The Value Leakage Framework',
    category: 'Strategy',
    readTime: '7 min read',
    excerpt: 'Are you losing millions to invisible inefficiencies? Learn how to spot and quantify the "value leaks" in your daily operations.',
    content: 'Value leakage occurs in the microscopic gaps between processes, systems, and human workers. It\'s rarely a single catastrophic failure; rather, it’s a death by a thousand cuts. A sales rep taking 4 hours to respond to a lead (resulting in a 10% drop in conversion) is a value leak. An invoice sent three days late (extending DSO) is a value leak.\n\nThe Value Leakage Framework categorizes these losses into three buckets: Time Leaks (hours spent on manual, non-creative work), Revenue Leaks (missed upsells, lost leads, churn due to poor support), and Data Leaks (valuable insights generated but never recorded in the CRM or ERP).\n\nBy quantifying these leaks—e.g., "We lose $50k a month in uncollected small invoices because it\'s not worth human time to chase them"—leaders can build a mathematically sound business case for AI automation. AI agents act as the sealant for these leaks, executing the tasks that fall through the cracks of human capacity.'
  },
  {
    id: 'res-6',
    title: 'Building AI-Native Business Operations',
    category: 'Future of Work',
    readTime: '9 min read',
    excerpt: 'AI shouldn\'t just speed up old processes; it should fundamentally change how work is designed. Welcome to AI-Native operations.',
    content: 'Most companies currently practice "AI-bolted-on" operations. They take an existing human process—say, writing a quarterly report—and use an LLM to help the human write it 20% faster. This is incremental improvement. AI-Native operations require tearing the process down to the studs and asking: "If AI existed when we built this company, how would we have designed this?"\n\nIn an AI-Native business, the quarterly report doesn\'t exist. Instead, autonomous agents continuously monitor databases in real-time, instantly answering natural language queries from executives at any moment. The process itself is eliminated.\n\nBuilding AI-Native operations means defaulting to autonomous execution first, and treating human intervention as an exception handling mechanism. It requires re-architecting data pipelines to feed agents directly, bypassing human dashboards entirely. It is a fundamental shift from human-driven, AI-assisted work, to AI-driven, human-supervised work.'
  },
  {
    id: 'res-7',
    title: 'Human + AI: Designing for the Right Balance',
    category: 'Management',
    readTime: '6 min read',
    excerpt: 'AI isn\'t replacing your team; it\'s elevating them. Discover how to design workflows that leverage the strengths of both silicon and carbon.',
    content: 'The fear of total job replacement often stalls AI adoption. However, the most successful implementations design systems where AI and humans work symbiotically. The framework for this balance relies on understanding comparative advantages. AI possesses infinite patience, instant recall, and high processing speed. Humans possess empathy, complex strategic judgment, and physical presence.\n\nEffective workflow design separates tasks accordingly. In customer support, an AI agent should handle the first 80% of interactions—tracking numbers, return policies, simple troubleshooting. This is work that drains human morale. \n\nWhen a customer is highly frustrated, or a situation requires a subjective exception to policy, the AI must seamlessly escalate to a human. Crucially, the AI should provide the human with a complete summary of the interaction so the customer doesn\'t have to repeat themselves. The human is elevated from a data-entry clerk to a high-level problem solver.'
  },
  {
    id: 'res-8',
    title: 'Measuring AI ROI in Business Operations',
    category: 'Finance',
    readTime: '8 min read',
    excerpt: 'Stop measuring AI success by "hours saved." Learn the hard financial metrics you need to prove the value of your autonomous workforce.',
    content: 'The default metric for AI adoption is usually "hours saved per week." While true, this is a soft metric that CFOs often reject, because unless headcount is reduced, hours saved don\'t automatically translate to dollars earned. To accurately measure AI ROI, businesses must focus on hard financial outcomes.\n\nFirst, measure Throughput Velocity. If AI reduces contract turnaround time from 5 days to 1 day, calculate the financial impact of recognizing that revenue 4 days earlier. Second, measure Capacity Expansion. If your support team handles 30% more tickets without new hires, that is avoided cost.\n\nFinally, measure Error Reduction Value. What is the financial cost of a human error in your organization (e.g., a misquoted price, a non-compliant document)? By achieving near-zero error rates in automated processes, you mitigate significant financial risk. True AI ROI is calculated by combining newly unlocked revenue, avoided future costs, and mitigated risk.'
  },
  {
    id: 'res-9',
    title: 'The Future of AI-Native Companies',
    category: 'Vision',
    readTime: '11 min read',
    excerpt: 'What does a $100M company look like with only 10 human employees? Explore the radical economics of the autonomous enterprise.',
    content: 'We are approaching an era where the historical correlation between revenue growth and headcount growth will be completely severed. In the past, scaling a service business or software company from $10M to $100M required hiring hundreds of sales reps, support staff, and middle managers. The AI-Native company will achieve this scale with a fraction of the workforce.\n\nIn this future, companies will be comprised of a small core of human strategic directors managing massive fleets of specialized AI agents. The organizational chart will feature "Digital Workers" alongside human employees. This fundamentally alters unit economics. The marginal cost of serving an additional customer or processing an additional transaction will drop near zero.\n\nThis shift will create hyper-agile businesses capable of pivoting strategies overnight, as changing direction simply requires updating the prompts and parameters of the agent fleet, rather than retraining hundreds of human employees. The competitive moat will shift from scale of workforce to the sophistication of the proprietary AI orchestration.'
  },
  {
    id: 'res-10',
    title: 'Business Process Intelligence — The Foundation of Effective AI',
    category: 'Implementation',
    readTime: '7 min read',
    excerpt: 'You can\'t automate what you don\'t understand. Why mapping your business processes down to the keystroke is the prerequisite for AI.',
    content: 'Before an AI agent can perform a task, the task must be explicitly defined. Most companies operate on tribal knowledge—processes are stored in the heads of long-term employees and are executed slightly differently by everyone. If you apply AI to this chaos, you simply automate the chaos.\n\nBusiness Process Intelligence (BPI) is the rigorous methodology of mapping exactly how work flows through an organization. It requires identifying every input, every decision tree, every software system touched, and every desired output for a specific task. \n\nOnly when a process is documented as a deterministic flowchart can it be effectively handed over to an AI orchestration engine. The companies that will succeed with AI over the next decade are not necessarily the ones with the most advanced models, but the ones with the most rigorously defined operational processes.'
  }
];

export const stagesPipeline = [
  {
    num: '01',
    title: 'Audit & Map',
    description: 'We analyze your existing workflows to uncover invisible inefficiencies.',
    detail: 'Using our Value Leak Scanner, we map your current processes, software stack, and data pipelines to identify exactly where manual tasks are costing you time and revenue.'
  },
  {
    num: '02',
    title: 'Discover & Design',
    description: 'We architect the optimal AI-native workflow for your specific business.',
    detail: 'We design a custom orchestration blueprint, determining exactly which tasks require specialized AI agents, which require human oversight, and how data will flow securely.'
  },
  {
    num: '03',
    title: 'Build & Integrate',
    description: 'We deploy specialized agents connected directly to your systems.',
    detail: 'Our engineers build your custom AI OS, integrating securely via APIs with your existing CRM, ERP, and communication tools. No rip-and-replace required.'
  },
  {
    num: '04',
    title: 'Deploy & Orchestrate',
    description: 'We launch the supervisor agents to manage your new autonomous workforce.',
    detail: 'We flip the switch. Supervisor agents begin routing work, managing agent tasks, handling exceptions, and executing complex multi-step processes autonomously.'
  },
  {
    num: '05',
    title: 'Optimize & Scale',
    description: 'Continuous improvement through data and iterative training.',
    detail: 'The system learns. We monitor analytics, refine agent prompts, reduce human-in-the-loop requirements, and scale the automation across new departments.'
  }
];

export const leakCategories = [
  {
    id: 'lc-1',
    title: 'Revenue Leakage',
    items: [
      { title: 'Delayed Lead Response', metric: 'Lost Conversions', description: 'Leads abandoning due to >5 minute response times.' },
      { title: 'Inconsistent Follow-up', metric: 'Pipeline Decay', description: 'Opportunities lost because reps stop following up after 2 attempts.' },
      { title: 'Missed Upsells', metric: 'Lost NRR', description: 'Failure to identify buying signals in existing accounts.' }
    ]
  },
  {
    id: 'lc-2',
    title: 'Productivity Leakage',
    items: [
      { title: 'Manual Data Entry', metric: 'Wasted Hours', description: 'Employees moving data between emails, PDFs, and CRM.' },
      { title: 'Meeting Overhead', metric: 'Admin Time', description: 'Time spent scheduling, taking notes, and chasing action items.' },
      { title: 'Information Search', metric: 'Lost Output', description: 'Hours lost weekly searching for files and internal answers.' }
    ]
  },
  {
    id: 'lc-3',
    title: 'Customer Experience Leakage',
    items: [
      { title: 'Support Bottlenecks', metric: 'CSAT Drop', description: 'Customers waiting hours for simple password resets or status updates.' },
      { title: 'Friction Onboarding', metric: 'Early Churn', description: 'Clients abandoning software due to complex, manual setup.' },
      { title: 'Inconsistent Service', metric: 'Brand Damage', description: 'Varied support quality depending on which rep handles the ticket.' }
    ]
  },
  {
    id: 'lc-4',
    title: 'Operational Leakage',
    items: [
      { title: 'Process Bottlenecks', metric: 'Delayed Delivery', description: 'Work stalling because it requires a manual human approval.' },
      { title: 'Document Processing', metric: 'SLA Breaches', description: 'Slow turnaround on contracts, invoices, and compliance forms.' },
      { title: 'System Silos', metric: 'Data Errors', description: 'Software tools that don\'t talk, requiring human bridges.' }
    ]
  },
  {
    id: 'lc-5',
    title: 'Decision Leakage',
    items: [
      { title: 'Stale Reporting', metric: 'Reactive Moves', description: 'Making decisions based on month-old data.' },
      { title: 'Forecasting Errors', metric: 'Missed Targets', description: 'Relying on gut feeling rather than predictive data modeling.' },
      { title: 'Resource Misallocation', metric: 'Wasted Budget', description: 'Overstaffing due to inability to predict volume spikes.' }
    ]
  }
];

export const integrations = [
  { name: 'Salesforce', category: 'CRM', icon: 'cloud' },
  { name: 'HubSpot', category: 'Marketing', icon: 'hubspot' },
  { name: 'Zendesk', category: 'Support', icon: 'headphones' },
  { name: 'Slack', category: 'Communication', icon: 'message-square' },
  { name: 'Microsoft Teams', category: 'Communication', icon: 'users' },
  { name: 'Stripe', category: 'Finance', icon: 'credit-card' },
  { name: 'QuickBooks', category: 'Finance', icon: 'file-text' },
  { name: 'Google Workspace', category: 'Productivity', icon: 'mail' },
  { name: 'Shopify', category: 'E-commerce', icon: 'shopping-cart' },
  { name: 'Jira', category: 'Operations', icon: 'trello' }
];
