# Security Specification — Sam K. Socials

## 1. Data Invariants
- **Inquiries**: Anyone can submit a client consultation enquiry (`create`), provided strict schema validation passes (valid email format, length constraints on name, studio, service, message, initial status is `'new'`, and server timestamp). Inquiries can only be read (`get`/`list`) and updated by verified Admins. Clients cannot read or mutate other clients' inquiries.
- **SiteContent**: Can be read publicly (`allow get, list: if true`) so that visitors see live studio updates. Can ONLY be modified (`create`, `update`) by an authenticated, verified Admin whose UID exists in `/databases/$(database)/documents/admins/$(request.auth.uid)` or matches the bootstrapped owner email.
- **Admins**: Read/write restricted to authenticated admins. Prevents privilege escalation and self-assignment.

## 2. The "Dirty Dozen" Threat Payloads
1. **Unauthenticated Read on Inquiries**: Attempting to list `/inquiries` without admin role -> `PERMISSION_DENIED`.
2. **Inquiry Status Tampering on Create**: Submitting an inquiry with status `'contacted'` or `'archived'` instead of `'new'` -> `PERMISSION_DENIED`.
3. **Ghost Field Injection in Inquiry**: Adding `isAdmin: true` or `verified: true` to an inquiry submission -> `PERMISSION_DENIED` via `hasOnly()`.
4. **Invalid Email Injection**: Submitting an inquiry with a malformed email or 1MB string -> `PERMISSION_DENIED`.
5. **Unauthorized Content Overwrite**: Anonymous visitor attempting to overwrite `/content/main` -> `PERMISSION_DENIED`.
6. **Privilege Escalation in Admins**: Regular user attempting to write themselves into `/admins/{uid}` -> `PERMISSION_DENIED`.
7. **Client ID Poisoning**: Creating an inquiry with invalid characters in path variable (e.g., path traversal or 10KB string) -> `PERMISSION_DENIED`.
8. **Inquiry Update by Anonymous**: Attempting to change an inquiry's status without admin auth -> `PERMISSION_DENIED`.
9. **Content Deletion**: Attempting to delete `/content/main` -> `PERMISSION_DENIED`.
10. **Timestamp Manipulation**: Submitting client-generated timestamps in the future -> `PERMISSION_DENIED` via `request.time`.
11. **Non-Owner Inquiry Access**: User B trying to `get` User A's consultation message -> `PERMISSION_DENIED`.
12. **Denial of Wallet Buffer Overrun**: Submitting message fields exceeding 3000 chars -> `PERMISSION_DENIED`.

## 3. Test Invariants Summary
All write actions strictly gated by `isValidInquiry()`, `isValidContent()`, and role-based checks.
