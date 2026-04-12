# Giving Readiness Checklist

This document outlines the requirements that must be fulfilled before IIITL / Axios can accept donations through the `/giving` page.

## Overview

Before enabling the donations feature, the organization must establish proper financial infrastructure, legal compliance, and governance processes to ensure:
- Legal compliance with Indian charity regulations
- Proper financial accountability and audit trails
- Tax benefits for donors
- Transparent use of funds

---

## 1. Banking Infrastructure

### Requirements

- [ ] **Dedicated Bank Account**
  - Open a separate bank account specifically for donation receipts
  - Account should be in the organization's legal name (IIITL / Axios)
  - Preferably with a bank that provides good online banking and API access for reconciliation

- [ ] **Payment Gateway Integration**
  - Select and register with a payment gateway (e.g., Razorpay, Instamojo, PayU)
  - Ensure gateway supports:
    - Credit/Debit cards
    - UPI payments
    - Net banking
    - International payments (if applicable)
  - Complete KYC requirements for the payment gateway

- [ ] **Transaction Limits & Controls**
  - Set up appropriate transaction limits
  - Configure multi-signature approval for large withdrawals
  - Implement dual authorization for fund transfers

### Documentation Needed
- Bank account opening documents
- Payment gateway agreement and credentials
- Banking resolution authorizing signatories

---

## 2. Legal & Regulatory Compliance

### 80G Registration (Tax Exemption Certificate)

- [ ] **Eligibility Verification**
  - Confirm organization qualifies as a charitable institution under Section 80G
  - Verify current registration status (if any existing exemptions)

- [ ] **80G Application Process**
  - File Form 10G with the Income Tax Department
  - Provide required documents:
    - Trust deed / Memorandum of Association
    - Registration certificate
    - Audited financial statements
    - Details of charitable activities
  - Obtain 80G certificate (allows donors to claim tax deductions)

- [ ] **12A Registration** (if not already obtained)
  - Required for income tax exemption for the trust/organization itself
  - File Form 10A

- [ ] **FCRA Registration** (if accepting foreign donations)
  - Foreign Contribution Regulation Act compliance
  - Required only if planning to accept donations from foreign sources
  - More complex process with Ministry of Home Affairs

### Other Legal Requirements

- [ ] **CSR-1 Registration** (if applicable)
  - Register on MCA portal if receiving CSR funds from companies
  - Required if soliciting Corporate Social Responsibility donations

- [ ] **GST Registration** (if applicable)
  - Determine if activities require GST registration
  - Most charitable donations are exempt, but confirm with CA

### Documentation Needed
- 80G certificate (once obtained)
- 12A registration certificate
- PAN card of the organization
- Registration certificate under relevant acts (Trust Act, Societies Act, etc.)

---

## 3. Financial Reporting & Audit Trail

### Accounting System

- [ ] **Set Up Proper Bookkeeping**
  - Implement double-entry accounting system
  - Use accounting software (Tally, QuickBooks, Zoho Books, etc.)
  - Maintain separate ledgers for:
    - Donation receipts
    - Project-wise utilization
    - Administrative expenses

- [ ] **Chart of Accounts**
  - Define account categories:
    - Income (donations by type/source)
    - Expenses (program vs. administrative)
    - Assets and liabilities

- [ ] **Donation Tracking**
  - Unique receipt number for each donation
  - Donor information storage (name, PAN for 80G receipts, contact details)
  - Purpose/designation of donation (general/specific project)
  - Payment method and transaction ID

### Audit Requirements

- [ ] **Annual Audit**
  - Engage a qualified Chartered Accountant (CA)
  - Annual financial audit as per applicable acts
  - Ensure auditor is familiar with charitable organization requirements

- [ ] **Audit Documentation**
  - Maintain complete records:
    - Bank statements
    - Payment gateway reports
    - Donation receipts (copies)
    - Expense vouchers with supporting documents
    - Board meeting minutes approving expenditures

- [ ] **Statutory Filings**
  - Annual Income Tax Return (ITR-7 for trusts)
  - Form 10B/10BB (annual certification by CA for 80G compliance)
  - FCRA returns (if applicable - FC-4 form annually)

### Documentation Needed
- Accounting policy document
- Audit engagement letter
- Previous years' audited statements (if available)

---

## 4. Governance & Transparency

### Internal Policies

- [ ] **Donation Acceptance Policy**
  - Define what types of donations are accepted
  - Minimum donation amounts (if any)
  - Refund policy
  - Anonymous donation policy
  - Conflict of interest guidelines

- [ ] **Fund Utilization Policy**
  - Clear guidelines on how donations are used
  - Percentage allocated to programs vs. administrative costs
  - Project approval process
  - Spending authorization limits

- [ ] **Donor Privacy Policy**
  - GDPR/data protection compliance
  - How donor information is stored and used
  - Opt-in/opt-out for communications

### Board/Committee Oversight

- [ ] **Finance Committee**
  - Establish a committee to oversee donations
  - Define roles and responsibilities
  - Meeting frequency (quarterly recommended)

- [ ] **Documentation of Decisions**
  - Maintain minutes of all financial decisions
  - Board resolutions for major expenditures
  - Approval process for fund allocation

### Public Transparency

- [ ] **Public Reporting**
  - Publish annual reports showing:
    - Total donations received
    - Major donors (with consent)
    - Fund utilization by project/category
    - Impact metrics
  - Consider publishing audited financials

- [ ] **Donation Receipts**
  - Automated receipt generation
  - Must include for 80G compliance:
    - Organization name and 80G registration number
    - Donor PAN (for donations >₹2,000)
    - Amount and date
    - Unique receipt number
  - Email delivery system

### Documentation Needed
- Board resolution adopting policies
- Documented approval workflows
- Template donation receipts

---

## 5. Technical & Operational Requirements

### Website Integration

- [ ] **Secure Payment Infrastructure**
  - SSL certificate (HTTPS)
  - PCI-DSS compliant payment processing
  - Webhook handling for payment confirmations

- [ ] **Donation Form**
  - Collect required information:
    - Name, email, phone
    - PAN (optional but needed for 80G receipt if >₹2,000)
    - Donation amount
    - Purpose/project selection
  - Terms and conditions acceptance
  - Privacy policy acknowledgment

- [ ] **Receipt Generation System**
  - Automated PDF generation with 80G details
  - Email delivery
  - Download option
  - Receipt archival system

### Data Management

- [ ] **Donor Database**
  - CRM or database to track donors
  - Segmentation capabilities
  - Communication preferences

- [ ] **Backup & Security**
  - Regular backups of transaction data
  - Secure storage with access controls
  - Data retention policy

- [ ] **Reconciliation Process**
  - Daily/weekly reconciliation of:
    - Payment gateway settlements
    - Bank deposits
    - Accounting entries
  - Automated alerts for discrepancies

### Documentation Needed
- Technical architecture document
- Data security policy
- Disaster recovery plan

---

## 6. Communication & Donor Relations

### Pre-Launch Requirements

- [ ] **Donor Communication Templates**
  - Welcome email
  - Thank you email with receipt
  - Impact updates
  - Annual summary for tax filing

- [ ] **FAQ Section**
  - How donations are used
  - Tax benefit information
  - Refund policy
  - Contact information for queries

- [ ] **Impact Reporting Plan**
  - How impact will be measured
  - Frequency of updates to donors
  - Storytelling strategy

### Ongoing Operations

- [ ] **Donor Support**
  - Dedicated email/phone for donation queries
  - Response time commitments
  - Escalation process

- [ ] **Acknowledgment Process**
  - Timeline for receipt delivery (immediate for online)
  - Personal thank you for major donations
  - Recognition options (public vs. anonymous)

---

## Timeline & Next Steps

### Immediate (Before Launch)
1. Open dedicated bank account
2. Engage CA for 80G application process
3. Set up basic accounting system
4. Draft donation acceptance and fund utilization policies

### Short-term (0-3 months)
1. Submit 80G application
2. Select and integrate payment gateway
3. Implement donation form and receipt system
4. Establish board oversight processes

### Medium-term (3-6 months)
1. Receive 80G certification
2. Complete first financial audit (if timing allows)
3. Launch public transparency reporting
4. Build donor communication workflows

---

## Responsible Parties

| Area | Owner | Status |
|------|-------|--------|
| Banking | [TBD] | Not Started |
| 80G Application | [TBD] | Not Started |
| Accounting Setup | [TBD] | Not Started |
| Legal Compliance | [TBD] | Not Started |
| Technical Integration | [TBD] | Not Started |
| Governance Policies | [TBD] | Not Started |

---

## External Resources Needed

- **Chartered Accountant**: For 80G application, audit, and tax compliance
- **Legal Advisor**: For trust/society compliance and policy drafting
- **Payment Gateway**: Razorpay/Instamojo/PayU partnership
- **Banking Partner**: Business account with good online features

---

## Risk Assessment

### Risks of Launching Without Proper Setup
- ❌ Legal penalties for non-compliance with tax regulations
- ❌ Inability to provide tax benefits to donors (reduces donation likelihood)
- ❌ Financial mismanagement or fraud risk
- ❌ Reputational damage from lack of transparency
- ❌ Operational chaos from poor record-keeping

### Mitigation
- ✅ Complete this checklist before launch
- ✅ Engage professional advisors (CA, lawyer)
- ✅ Start small with pilot phase
- ✅ Regular reviews and audits

---

## Conclusion

This document serves as a comprehensive checklist for donation readiness. The `/giving` page should remain as "Coming Soon" until AT MINIMUM the following critical items are complete:

1. ✅ Dedicated bank account opened
2. ✅ 80G registration obtained (or application in process with clear timeline)
3. ✅ Accounting system established
4. ✅ Payment gateway integrated and tested
5. ✅ Governance policies documented and board-approved
6. ✅ Receipt generation system functional

**The issue should remain open as a tracker until all requirements are met and verified.**

---

## Document Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 12-04-2026 | 1.0 | Initial document creation | [@Abhishek-Dige](https://github.com/Abhishek-Dige) |

---

**Last Updated**: 12-04-2026

**Next Review Date**: [Set based on organization timeline]