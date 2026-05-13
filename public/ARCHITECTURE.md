# Enterprise Vendor Portal Platform
**Architecture & Design Specification**

---

## SECTION 1 — PLATFORM OVERVIEW

### Business Objectives
To establish a centralized, scalable, and secure "Vendor Portal" that bridges the gap between procurement, accounts payable (AP), and third-party vendors. The platform replaces fragmented email threads, manual PDF invoice processing, and opaque approval matrices with a streamlined, AI-assisted, and tightly governed digital ecosystem.

### Enterprise Use Cases
-   **Vendor Onboarding:** Self-service portal for vendors to upload tax documents, bank details, and compliance certifications.
-   **Invoice AP Automation:** Automated ingestion, OCR extraction, PO matching, and dynamic approval routing for vendor invoices.
-   **Procurement Collaboration:** Shared space for RFQ/RFP bidding, contract negotiation, and SLA tracking.
-   **Supply Chain Intelligence:** Real-time dashboards identifying vendor concentration risk, spend analytics, and performance KPIs.

### Operational Workflow & Lifecycle
1.  **Vendor Lifecycle:** Registration -> Risk Screening -> Activation -> Performance Monitoring -> SLA Enforcement -> Renewal/Offboarding.
2.  **AP Automation Lifecycle:** Invoice Receipt (Drag & drop/Email) -> Google Document AI (OCR) -> 3-Way Match (PO > GRR > Invoice) -> Exception Handling -> Dynamic Approval -> ERP Sync -> Payment.

### Document Management Strategy
Instead of storing heavy binary blobs in the relational database, **Google Drive** acts as the immutable enterprise document vault. Folders are programmatically created (e.g., `/Vendors/{ID}/Invoices/2023/`), while the database stores metadata and URIs.

---

## SECTION 2 — TECHNOLOGY ARCHITECTURE

### Architecture Diagram
```text
[ Vendors / Users ] ---> [ Cloud HTTPS Load Balancer ] ---> [ API Gateway / Reverse Proxy ]
                                                                 |
    +------------------------------------------------------------+
    | 
[ Frontend: ReactJS SPA ]  (SAP Fiori/AdminLTE styling, Tailwind, Vite)
    |
[ Backend: NestJS / Node.js ] (Microservice-ready, REST/GraphQL, Queue Processors)
    |
    +--- [ Google Cloud Ecosystem ]
    |      |-- Google Drive API (Doc Repositories)
    |      |-- Google Document AI (Invoice OCR)
    |      |-- Google Sheets API (Dynamic Rules Engine)
    |      |-- Google Docs API (Contract Generation)
    |      |-- Gmail API (Workflow Notifications)
    |      |-- Google OAuth / Workspace SSO (IAM)
    |
    +--- [ Databases & Caching ]
           |-- PostgreSQL (Primary Relational DB)
           |-- Redis (Session caching, Rate limiting, Queue management)
           |-- BigQuery (Data Warehouse for historical AP analytics)
```

---

## SECTION 3 — UI/UX DESIGN (SAP BUSINESS ONE / ADMINLTE STYLE)

**Design Philosophy:**
Merging the structural density of **AdminLTE** (sidebars, info boxes, structured menus) with the modern, clean aesthetics of **SAP Fiori 3 / SAP Business One 10 Web Client** (Quartz theme, rounded analytical cards, spacious grid layouts).

**Layout System:**
-   **Top Navbar:** Unified global search, user profile, notification center (bell icon with unread counts), branch/company toggle.
-   **Left Sidebar:** Collapsible, dark-mode (`#343a40`) or SAP Fiori light gray (`#f2f2f2`). Multi-level accordions for distinct modules.
-   **Content Workspace:** Breadcrumbs, page-level action bar (Export, New, Filters), and dashboard grid.

**Color Palette:**
-   **Primary (Brand):** SAP Blue `#0a6ed1` — used for primary buttons and active states.
-   **Secondary:** `#6c757d` — supporting text, borders.
-   **Success/Status:** `#107e3e` (Approved/Active), **Warning:** `#e9730c` (Pending/Review), **Danger:** `#bb0000` (Rejected/Blocked).
-   **Background:** `#f4f6f9` (AdminLTE standard body background).

**Dashboards:**
-   **Executive:** High-level metrics (Total Output, YTD Spend, Top 5 Vendor Risks).
-   **AP Dashboard:** Aging analysis, OCR exception queue, pending approvals.

---

## SECTION 4 — COMPLETE MODULE ARCHITECTURE

### A. Vendor Management
-   **Features:** Self-service registration forms, TIN/Tax validation workflows, automated compliance checklists, multi-tier vendor categorization (Strategic, Operational, Tactical), and Blacklist auditing.

### B. Vendor Clustering & Intelligence
-   **Vendor Scoring Engine:** Dynamic calculation based on Delivery On-Time (40%), Quality (30%), Price Variance (20%), and Responsive Ticketing (10%).
-   **Clustering:** AI-driven grouping identifying high-dependency risks (e.g., "70% of packaging comes from a single Tier-2 vendor").

### C. Procurement Collaboration
-   **Features:** RFQ dashboard, multi-vendor bid comparison matrix, PO issuance, and a centralized audit-logged chat context attached to specific POs.

### D. Invoice Management & AP Automation
-   **Features:** Bulk upload, real-time Google Document AI extraction, visual side-by-side verification (PDF viewer on left, Extracted fields on right), automated 3-way matching, and exception queues.

### E. Contract & SLA Management
-   **Features:** Integration with Google Docs for dynamic contract template population, e-signature status tracking, and 30/60/90-day expiration alerts via Calendar/Gmail.

### F. Ticketing & Vendor Support
-   **Features:** Standardized SLA ticketing, complaint routing to internal departments, and resolution time tracking affecting vendor scores.

---

## SECTION 5 — GOOGLE ECOSYSTEM OPTIMIZATION

1.  **Google Drive:** The primary data lake for physical documents. NestJS uses Service Accounts to create strict ACL folder structures per vendor.
2.  **Google Sheets (Rules Engine):** Instead of building a complex form-builder UI for approval workflows, we link specific Google Sheets to the backend. Finance managers can modify matrix rules (e.g., `If Invoice > $50,000 AND Dept = IT -> Route to CIO`) directly in Sheets. NestJS caches this sheet into Redis dynamically.
3.  **Google Docs:** Contract templates utilize `{{vendor_name}}` merge tags. The backend duplicates the template, injects DB data, and exports as PDF to Drive.
4.  **Gmail API:** Custom branded HTML notification emails for approvals, containing deep links and actionable "Approve/Reject" mailto buttons or portal links.
5.  **Google Calendar:** Approved PO delivery dates and Contract renewals are injected directly into procurement officers' calendars.
6.  **BigQuery & Looker Studio:** Historical invoice data is synced to BigQuery hourly. Looker Studio connects directly to provide an embedded, read-only Enterprise Executive Dashboard without taxing the operational PostgreSQL database.
7.  **Google Document AI:** The backbone of Invoice automation. Utilizing pre-trained Invoice Parsers to extract Line Items, Tax, Total, and Vendor details with confidence scoring.

---

## SECTION 6 — SECURITY ARCHITECTURE

1.  **Authentication:** Google Workspace SSO ensures seamless access for internal employees. Vendors authenticate via Identity Platform (email/password with mandatory MFA via SMS/Authy).
2.  **Authorization (RBAC):** Token-based (JWT). Roles include `SuperAdmin`, `AP_Clerk`, `AP_Manager`, `Procurement_Officer`, and `Vendor_Admin`. Permissions are validated at the API Gateway and DB Row-level securely.
3.  **Data Security:** TLS 1.3 for transit. AES-256 for at-rest DB fields (Tax IDs, Bank Accounts).
4.  **Fraud Prevention:** System checks for "Duplicate Invoice Number + Vendor ID" collisions. Monitors for sudden jumps in invoice amounts exceeding historical standard deviations (Flagged for AP Manager review).

---

## SECTION 7 — USER MANAGEMENT & SETTINGS
-   **Hierarchical Access:** Users are bound to specific `Company_Codes` and `Cost_Centers`. An AP clerk for "Branch A" cannot view invoices for "Branch B".
-   **Delegation:** Users can configure "Out of Office" mappings, temporarily delegating approval authority to a peer.

---

## SECTION 8 — DATABASE ARCHITECTURE (PostgreSQL)

**Simplified ERD:**
```text
[ Users ] 1-----M [ UserRules ]
   |
   +-----M [ ApprovalWorkflows ] ----M [ Invoices ]

[ Vendors ] 1---M [ VendorContacts ]
    |
    +---- 1---M [ Contracts ]
    |
    +---- 1---M [ PurchaseOrders ] 1---M [ POLineItems ]
    |
    +---- 1---M [ Invoices ] 1---M [ InvoiceLineItems ]
                       |
                       +--- 1---1 [ OCR_Metadata ]
```
*Note: Google Sheets complements PostgreSQL by acting as a lightweight, user-editable Configuration Table (e.g., for `ApprovalMatrix` structures) which the NestJS backend syncs via Cron Job.*

---

## SECTION 9 — WORKFLOW & APPROVAL ENGINE

**State Machine Diagram (Invoice):**
```text
(Draft) -> [OCR Processing] -> (Extraction Validation)
                                      |
                            <Confidence > 85% & 3-Way Match?>
                               /                   \
                            [YES]                 [NO]
                              |                     |
                              v                     v
                        (Auto-Approved)    (Exception Queue / AP Review)
                              |                     |
                              +---------> (Pending Manager Approval) ---> (Approved for Payment)
```

---

## SECTION 10 — VENDOR CLUSTERING ENGINE

**Risk & SLA Scoring Formula Pseudo-code:**
```javascript
const calculateVendorScore = (vendorDetails, historicalInvoices, activeTickets) => {
   const qS = calculateQualityScore(historicalInvoices); // e.g. Defect rate
   const dS = calculateDeliveryScore(historicalInvoices); // PO Date vs GR Date
   const cS = calculateCostVariance(historicalInvoices); // PO Price vs Invoice Price
   
   let totalScore = (qS * 0.4) + (dS * 0.4) + (cS * 0.2);
   if (activeTickets.filter(t => t.severity === 'CRITICAL').length > 0) {
       totalScore -= 15; // Penalty
   }
   return mapScoreToTier(totalScore); // returns 'Strategic', 'Preferred', 'At-Risk'
}
```

---

## SECTION 11 — INVOICE MANAGEMENT & AP AUTOMATION

-   **Tolerance Matrix:** Configurable rules (e.g., "Allow $50 or 2% variance between PO and Invoice before requiring explicit Manager approval").
-   **Reconciliation:** End-of-month AP aging reports generated dynamically, tracking days outstanding vs payment terms (Net 30, Net 60).

---

## SECTION 12 — FRONTEND ARCHITECTURE

**Tech Stack:** ReactJS 18+, Vite, Tailwind CSS, TypeScript, Context API / Zustand, React Router, Recharts.
**Component Structure:**
```text
/src
  /components
    /layout
       Sidebar.tsx
       Header.tsx
       Breadcrumbs.tsx
    /ui
       DataGrid.tsx (Wrapper around AG Grid or custom Tailwind table)
       InfoCard.tsx (AdminLTE style widget)
       StatusBadge.tsx (SAP Fiori pill style)
  /pages
    /dashboard
    /vendors
    /invoices
    ...
```

---

## SECTION 13 — BACKEND ARCHITECTURE

**Tech Stack:** Node.js, NestJS (Modular Architecture).
1.  **Transport Layer:** Controllers (REST APIs).
2.  **Domain Layer:** Services (Business Logic, 3-Way Matching logic).
3.  **Infrastructure Layer:** Repositories (TypeORM/Prisma for Postgres), Google API wrappers (DriveService, DocumentAIService).
4.  **Queue Workers:** BullMQ/Redis for processing long OCR jobs asynchronously so the frontend doesn't timeout.

---

## SECTION 14 — ANALYTICS & REPORTING

Data flowing to **BigQuery** daily.
-   **Spend Analytics:** Drill down by Cost Center, Region, or Vendor Category.
-   **Approval Bottleneck Analytics:** Tracking average time taken at each approval node to identify slow middle-managers in the procurement chain.

---

## SECTION 15 — SCALABILITY & DEVOPS

-   **Containerization:** Fully Dockerized architecture.
-   **Deployment:** Google Cloud Run (Serverless, scales to zero, handles massive spikes during month-end invoice processing) or GKE (Kubernetes) for dedicated workloads.
-   **CI/CD:** GitHub Actions -> Run tests -> Build Docker Image -> Push to Google Artifact Registry -> Deploy to Cloud Run.
-   **Monitoring:** Google Cloud Logging integrated with alerting policies (e.g., "Alert if Document AI API fails > 5% of requests in 5 mins").

---

## SECTION 16 — TECHNICAL DELIVERABLES
*Note: The accompanying React Application serves as the Interactive Technical Prototype (Section 3 & 12).*
