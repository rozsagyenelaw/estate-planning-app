/**
 * Single Living Trust Template
 * California Law - Revocable Living Trust
 * Supports both new trusts and restatements
 */

export const singleLivingTrustTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.6;
      margin: 0.5in;
      color: #000;
    }
    .title-page {
      text-align: center;
      margin-top: 3in;
    }
    .title {
      font-size: 18pt;
      font-weight: bold;
      margin-bottom: 0.5in;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 14pt;
      margin-bottom: 0.25in;
    }
    .toc {
      margin-top: 1in;
    }
    .toc-title {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 0.5in;
    }
    .toc-item {
      margin-left: 0.5in;
      margin-bottom: 0.15in;
    }
    .article-title {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      margin-top: 0.5in;
      margin-bottom: 0.3in;
      text-transform: uppercase;
    }
    .section-title {
      font-weight: bold;
      margin-top: 0.3in;
      margin-bottom: 0.15in;
    }
    .subsection-title {
      font-weight: bold;
      margin-left: 0.5in;
      margin-top: 0.2in;
      margin-bottom: 0.1in;
    }
    .paragraph {
      text-align: justify;
      margin-bottom: 0.15in;
      text-indent: 0.5in;
    }
    .list-item {
      margin-left: 1in;
      margin-bottom: 0.1in;
    }
    .signature-block {
      margin-top: 1in;
      page-break-inside: avoid;
    }
    .signature-line {
      border-bottom: 1px solid #000;
      width: 3in;
      display: inline-block;
      margin-left: 0.5in;
    }
    .notary-section {
      margin-top: 1in;
      border: 2px solid #000;
      padding: 0.3in;
      page-break-inside: avoid;
    }
    .schedule {
      margin-top: 0.5in;
    }
    .page-break {
      page-break-after: always;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.2in;
    }
    th, td {
      border: 1px solid #000;
      padding: 0.1in;
      text-align: left;
    }
    th {
      background-color: #f0f0f0;
      font-weight: bold;
    }
  </style>
</head>
<body>

<!-- TITLE PAGE -->
<div class="title-page">
  <div class="title">
    {{#IF_RESTATEMENT}}
    FIRST RESTATEMENT<br/>
    OF THE<br/>
    {{ORIGINAL_TRUST_NAME}}
    {{/IF_RESTATEMENT}}
    {{#IF_NOT_RESTATEMENT}}
    {{TRUST_NAME}}
    {{/IF_NOT_RESTATEMENT}}
  </div>

  <div class="subtitle">
    {{#IF_RESTATEMENT}}
    Originally dated {{ORIGINAL_TRUST_DATE}}<br/>
    Restated on {{CURRENT_DATE}}
    {{/IF_RESTATEMENT}}
    {{#IF_NOT_RESTATEMENT}}
    Dated {{CURRENT_DATE}}
    {{/IF_NOT_RESTATEMENT}}
  </div>

  <div class="subtitle">
    {{CLIENT_NAME}}, Trustor and Trustee
  </div>
</div>

<div class="page-break"></div>

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <div class="toc-title">TABLE OF CONTENTS</div>

  <div class="toc-item">ARTICLE ONE: DECLARATION OF TRUST</div>
  <div class="toc-item">ARTICLE TWO: FAMILY INFORMATION</div>
  <div class="toc-item">ARTICLE THREE: TRUSTEES</div>
  <div class="toc-item">ARTICLE FOUR: POWERS OF TRUSTEES</div>
  <div class="toc-item">ARTICLE FIVE: TRUSTEE COMPENSATION AND BOND</div>
  <div class="toc-item">ARTICLE SIX: SPECIFIC DISTRIBUTIONS</div>
  <div class="toc-item">ARTICLE SEVEN: RESIDUARY DISTRIBUTION</div>
  <div class="toc-item">ARTICLE EIGHT: DISTRIBUTION TO MINORS</div>
  <div class="toc-item">ARTICLE NINE: DISTRIBUTION PROVISIONS</div>
  <div class="toc-item">ARTICLE TEN: AMENDMENT AND REVOCATION</div>
  <div class="toc-item">ARTICLE ELEVEN: INCAPACITY</div>
  <div class="toc-item">ARTICLE TWELVE: DEFINITIONS</div>
  <div class="toc-item">ARTICLE THIRTEEN: GENERAL PROVISIONS</div>
  <div class="toc-item">SCHEDULE A: INITIAL TRUST ASSETS</div>
</div>

<div class="page-break"></div>

<!-- ARTICLE ONE: DECLARATION -->
<div class="article-title">ARTICLE ONE<br/>DECLARATION OF TRUST</div>

<div class="section-title">1.1 Creation of Trust</div>
<div class="paragraph">
{{#IF_RESTATEMENT}}
This document represents the First Restatement of the {{ORIGINAL_TRUST_NAME}}, originally created on {{ORIGINAL_TRUST_DATE}}. {{CLIENT_NAME}} ("Trustor") hereby completely restates and supersedes the original trust document in its entirety. All property and assets previously held in the original trust shall continue to be held in this restated trust under the terms and conditions set forth herein.
{{/IF_RESTATEMENT}}
{{#IF_NOT_RESTATEMENT}}
{{CLIENT_NAME}} ("Trustor"), hereby declares that he/she has set aside and is holding, and will hold, all property described in Schedule A attached hereto, and any other property that may be added to this trust, in trust according to the terms and conditions set forth in this trust agreement.
{{/IF_NOT_RESTATEMENT}}
</div>

<div class="section-title">1.2 Trust Name</div>
<div class="paragraph">
This trust shall be known as the "{{TRUST_NAME}}."
</div>

<div class="section-title">1.3 Trustor and Initial Trustee</div>
<div class="paragraph">
{{CLIENT_NAME}}, residing at {{CLIENT_ADDRESS}}, {{CLIENT_CITY}}, {{CLIENT_STATE}} {{CLIENT_ZIP}}, is the Trustor and initial Trustee of this trust. As used in this trust, "Trustor" refers to {{CLIENT_NAME}}.
</div>

<div class="section-title">1.4 Revocable Trust</div>
<div class="paragraph">
This is a revocable trust. The Trustor reserves the right to amend, modify, or revoke this trust at any time during the Trustor's lifetime, provided the Trustor is competent. Upon the death of the Trustor, this trust shall become irrevocable and may not be amended or revoked.
</div>

<div class="page-break"></div>

<!-- ARTICLE TWO: FAMILY INFORMATION -->
<div class="article-title">ARTICLE TWO<br/>FAMILY INFORMATION</div>

<div class="section-title">2.1 Marital Status</div>
<div class="paragraph">
The Trustor's marital status is: {{CLIENT_MARITAL_STATUS}}.
</div>

<div class="section-title">2.2 Children</div>
<div class="paragraph">
The Trustor has the following children:
</div>

{{#EACH_CHILDREN}}
<div class="list-item">
{{INDEX}}. {{NAME}}, born {{BIRTHDAY}}
</div>
{{/EACH_CHILDREN}}

<div class="paragraph">
Any reference in this trust to "child" or "children" shall refer only to the individuals named above and their lawful descendants, unless otherwise specifically stated. The term "child" or "children" does not include stepchildren unless specifically named as beneficiaries.
</div>

<div class="page-break"></div>

<!-- ARTICLE THREE: TRUSTEES -->
<div class="article-title">ARTICLE THREE<br/>TRUSTEES</div>

<div class="section-title">3.1 Initial Trustee</div>
<div class="paragraph">
{{CLIENT_NAME}} is the initial Trustee of this trust. The Trustee shall serve without bond unless required by law.
</div>

<div class="section-title">3.2 Successor Trustees</div>
<div class="paragraph">
Upon the death, resignation, or incapacity of the Trustee, or if the Trustee is unable or unwilling to serve, the following persons shall serve as successor Trustees, in the order named:
</div>

{{#EACH_SUCCESSOR_TRUSTEES}}
<div class="list-item">
{{INDEX}}. {{NAME}}, residing at {{ADDRESS}}, Phone: {{PHONE}} {{JOINTLY}}
</div>
{{/EACH_SUCCESSOR_TRUSTEES}}

<div class="section-title">3.3 Acceptance of Trusteeship</div>
<div class="paragraph">
Any successor Trustee may accept the trusteeship by signing a written acceptance and filing it with the trust records. No successor Trustee shall be liable for any act or omission of any predecessor Trustee.
</div>

<div class="section-title">3.4 Resignation of Trustee</div>
<div class="paragraph">
Any Trustee may resign at any time by giving 30 days written notice to the Trustor (if living and competent) or to all current income beneficiaries. Upon resignation, the resigning Trustee shall deliver all trust property and records to the successor Trustee.
</div>

<div class="section-title">3.5 Removal of Trustee</div>
<div class="paragraph">
During the Trustor's lifetime, while competent, the Trustor may remove any Trustee with or without cause by written notice delivered to that Trustee. After the Trustor's death or incapacity, a Trustee may be removed only for cause by a court of competent jurisdiction.
</div>

<div class="page-break"></div>

<!-- ARTICLE FOUR: POWERS OF TRUSTEES -->
<div class="article-title">ARTICLE FOUR<br/>POWERS OF TRUSTEES</div>

<div class="section-title">4.1 General Powers</div>
<div class="paragraph">
The Trustee shall have all powers necessary to manage and protect the trust property, including but not limited to the following powers, to be exercised in a fiduciary capacity consistent with the purposes of this trust:
</div>

<div class="list-item">
(a) To retain, sell, exchange, partition, or divide any trust property;
</div>
<div class="list-item">
(b) To invest and reinvest trust property in any type of property or investment, without being limited by any statute restricting investments by fiduciaries;
</div>
<div class="list-item">
(c) To borrow money and to encumber trust property by mortgage, deed of trust, pledge, or otherwise;
</div>
<div class="list-item">
(d) To lease trust property for any period, including periods extending beyond the duration of the trust;
</div>
<div class="list-item">
(e) To make ordinary or extraordinary repairs or alterations in buildings or other structures;
</div>
<div class="list-item">
(f) To vote shares of stock, to consent to corporate reorganizations, and to exercise any other rights of a stockholder;
</div>
<div class="list-item">
(g) To commence or defend litigation with respect to the trust or any property of the trust estate;
</div>
<div class="list-item">
(h) To employ and compensate agents, attorneys, accountants, and other professionals;
</div>
<div class="list-item">
(i) To make distributions in cash or in kind, or partly in each, at fair market value;
</div>
<div class="list-item">
(j) To allocate items of income or expense to either trust income or principal;
</div>
<div class="list-item">
(k) To execute and deliver any instruments necessary to exercise the powers granted in this trust.
</div>

<div class="section-title">4.2 Real Property Powers</div>
<div class="paragraph">
The Trustee shall have full power to manage, control, grant options on, sell (for cash or on terms), convey, exchange, partition, divide, improve, and repair any real property held in the trust.
</div>

<div class="section-title">4.3 Investment Powers</div>
<div class="paragraph">
The Trustee may invest and reinvest the trust estate in every kind of property, real, personal, or mixed, and every kind of investment, including but not limited to bonds, debentures, notes, secured or unsecured, stocks of corporations, mutual funds, and real estate, without being limited by any statute or rule of law concerning investments by fiduciaries.
</div>

<div class="page-break"></div>

<!-- ARTICLE FIVE: TRUSTEE COMPENSATION -->
<div class="article-title">ARTICLE FIVE<br/>TRUSTEE COMPENSATION AND BOND</div>

<div class="section-title">5.1 Compensation</div>
<div class="paragraph">
A Trustee who is not a beneficiary of this trust shall be entitled to reasonable compensation for services rendered. A Trustee who is also a beneficiary of this trust may elect to receive reasonable compensation or may waive compensation. Reasonable compensation shall be determined according to the statutory fee schedule for trustees under California law, or as otherwise agreed upon in writing.
</div>

<div class="section-title">5.2 Bond</div>
<div class="paragraph">
No Trustee named in this trust shall be required to post a bond or other security for the faithful performance of duties as Trustee, unless required by a court of competent jurisdiction.
</div>

<div class="section-title">5.3 Reimbursement of Expenses</div>
<div class="paragraph">
All Trustees shall be entitled to reimbursement from the trust estate for all reasonable expenses incurred in the administration of the trust, including but not limited to attorneys' fees, accountants' fees, court costs, and other professional fees.
</div>

<div class="page-break"></div>

<!-- ARTICLE SIX: SPECIFIC DISTRIBUTIONS -->
<div class="article-title">ARTICLE SIX<br/>SPECIFIC DISTRIBUTIONS</div>

<div class="section-title">6.1 Specific Bequests</div>
<div class="paragraph">
Upon the death of the Trustor, the Trustee shall distribute the following specific bequests from the trust estate:
</div>

{{#EACH_SPECIFIC_DISTRIBUTIONS}}
<div class="subsection-title">6.1.{{INDEX}} {{BENEFICIARY_NAME}}</div>
<div class="paragraph">
The Trustee shall distribute to {{BENEFICIARY_NAME}} the following: {{DESCRIPTION}}.
</div>

<div class="paragraph">
{{#IF_AGE_BASED}}
This distribution shall be made in the following installments based on age:
{{#EACH_AGE_DISTRIBUTIONS}}
<div class="list-item">
When {{BENEFICIARY_NAME}} reaches age {{AGE}}: {{PERCENTAGE}}% of the distribution
</div>
{{/EACH_AGE_DISTRIBUTIONS}}
{{/IF_AGE_BASED}}
{{#IF_OUTRIGHT}}
This distribution shall be made outright and free of trust.
{{/IF_OUTRIGHT}}
</div>

<div class="paragraph">
If {{BENEFICIARY_NAME}} does not survive the Trustor, this bequest shall lapse and become part of the residuary estate{{#IF_LAPSE_TO}}, except that it shall instead pass to {{LAPSE_TO}}{{/IF_LAPSE_TO}}.
</div>
{{/EACH_SPECIFIC_DISTRIBUTIONS}}

<div class="section-title">6.2 Payment of Expenses</div>
<div class="paragraph">
Specific bequests shall be distributed subject to any encumbrances or liens on the property. The Trustee shall pay all debts, expenses of last illness, funeral expenses, expenses of administration, and all estate and inheritance taxes from the residuary estate, unless otherwise specifically provided.
</div>

<div class="page-break"></div>

<!-- ARTICLE SEVEN: RESIDUARY DISTRIBUTION -->
<div class="article-title">ARTICLE SEVEN<br/>RESIDUARY DISTRIBUTION</div>

<div class="section-title">7.1 Distribution of Residuary Estate</div>
<div class="paragraph">
After payment of all debts, expenses, taxes, and specific bequests, the Trustee shall distribute the remaining trust estate (the "residuary estate") as follows:
</div>

{{#EACH_RESIDUARY_BENEFICIARIES}}
<div class="list-item">
{{INDEX}}. {{NAME}}: {{SHARE}}%
</div>
{{/EACH_RESIDUARY_BENEFICIARIES}}

<div class="section-title">7.2 Distribution Provisions for Residuary Beneficiaries</div>
{{#EACH_RESIDUARY_BENEFICIARIES}}
<div class="subsection-title">7.2.{{INDEX}} {{NAME}}</div>
<div class="paragraph">
{{#IF_OUTRIGHT}}
The share for {{NAME}} shall be distributed outright and free of trust.
{{/IF_OUTRIGHT}}
{{#IF_NEEDS_TRUST}}
The share for {{NAME}} shall be held in a separate trust (the "{{NAME}} Special Needs Trust") to be administered according to the provisions of Article Nine of this trust document.
{{/IF_NEEDS_TRUST}}
{{#IF_GUARDIAN}}
The share for {{NAME}} (born {{BIRTHDAY}}) shall be held in trust and distributed in installments as follows:
<div class="list-item">- 1/3 when {{NAME}} reaches age 25</div>
<div class="list-item">- 1/2 of the remainder when {{NAME}} reaches age 30</div>
<div class="list-item">- The balance when {{NAME}} reaches age 35</div>
Until the age-based distributions are complete, the Trustee may distribute income and principal for {{NAME}}'s health, education, maintenance, and support.
{{/IF_GUARDIAN}}
</div>
{{/EACH_RESIDUARY_BENEFICIARIES}}

<div class="section-title">7.3 Per Stirpes Distribution</div>
<div class="paragraph">
If any beneficiary named in this Article does not survive the Trustor, that beneficiary's share shall pass to that beneficiary's living descendants, per stirpes. If a beneficiary has no living descendants, that share shall be divided among the other named beneficiaries in proportion to their shares.
</div>

<div class="page-break"></div>

<!-- ARTICLE EIGHT: DISTRIBUTION TO MINORS -->
<div class="article-title">ARTICLE EIGHT<br/>DISTRIBUTION TO MINORS</div>

<div class="section-title">8.1 Distribution Standards</div>
<div class="paragraph">
If any beneficiary is under the age of 25 at the time of distribution, the Trustee shall hold that beneficiary's share in trust and distribute income and principal as needed for the beneficiary's health, education, maintenance, and support (HEMS standard).
</div>

<div class="section-title">8.2 Education Expenses</div>
<div class="paragraph">
The Trustee is specifically authorized to pay for all educational expenses, including tuition, books, fees, room, and board at any accredited college, university, graduate school, or vocational training program that the beneficiary wishes to attend.
</div>

<div class="section-title">8.3 Final Distribution</div>
<div class="paragraph">
Any trust held for a minor beneficiary under this Article shall terminate when the beneficiary reaches age 25, at which time the remaining trust property shall be distributed outright to the beneficiary, unless otherwise specifically provided in this trust document.
</div>

<div class="page-break"></div>

<!-- ARTICLE NINE: DISTRIBUTION PROVISIONS -->
<div class="article-title">ARTICLE NINE<br/>DISTRIBUTION PROVISIONS</div>

<div class="section-title">9.1 Spendthrift Provision</div>
<div class="paragraph">
No beneficiary shall have the power to anticipate, encumber, or dispose of any interest in the trust prior to its actual distribution. No interest in the trust shall be subject to the claims of creditors of any beneficiary or to attachment, execution, or other legal process. This spendthrift provision shall not restrict the exercise of any power of appointment or withdrawal right granted to a beneficiary.
</div>

<div class="section-title">9.2 No Contest Clause</div>
<div class="paragraph">
If any beneficiary contests the validity of this trust or any of its provisions, or seeks to obtain an award in excess of the distributions provided in this trust, that beneficiary shall forfeit all benefits under this trust, and the trust shall be administered as if that beneficiary had predeceased the Trustor without descendants.
</div>

<div class="section-title">9.3 Simultaneous Death</div>
<div class="paragraph">
If any beneficiary and the Trustor die under circumstances where it is difficult to determine who died first, or if they die within 120 hours of each other, the beneficiary shall be deemed to have predeceased the Trustor for purposes of this trust.
</div>

<div class="section-title">9.4 Tax Provisions</div>
<div class="paragraph">
All estate, inheritance, and other death taxes (including interest and penalties) payable by reason of the Trustor's death shall be paid from the residuary estate and shall not be apportioned among the beneficiaries. The Trustee shall not seek reimbursement from any person for any such taxes paid from the trust estate.
</div>

<div class="page-break"></div>

<!-- ARTICLE TEN: AMENDMENT AND REVOCATION -->
<div class="article-title">ARTICLE TEN<br/>AMENDMENT AND REVOCATION</div>

<div class="section-title">10.1 Amendment During Lifetime</div>
<div class="paragraph">
During the Trustor's lifetime, while competent, the Trustor may amend or modify this trust in whole or in part by a written instrument delivered to the Trustee. Any amendment must be signed by the Trustor and notarized.
</div>

<div class="section-title">10.2 Revocation During Lifetime</div>
<div class="paragraph">
During the Trustor's lifetime, while competent, the Trustor may revoke this trust in whole or in part by a written instrument delivered to the Trustee. Upon revocation, the Trustee shall deliver all trust property to the Trustor, and the trust shall terminate.
</div>

<div class="section-title">10.3 Irrevocable Upon Death</div>
<div class="paragraph">
Upon the death of the Trustor, this trust shall become irrevocable and may not be amended or revoked by any person.
</div>

<div class="page-break"></div>

<!-- ARTICLE ELEVEN: INCAPACITY -->
<div class="article-title">ARTICLE ELEVEN<br/>INCAPACITY</div>

<div class="section-title">11.1 Determination of Incapacity</div>
<div class="paragraph">
The Trustor shall be considered incapacitated if two (2) licensed physicians (or one physician if two are not reasonably available) examine the Trustor and certify in writing that the Trustor is unable to manage financial affairs by reason of physical or mental impairment. The certification shall be provided to the acting Trustee.
</div>

<div class="section-title">11.2 Distribution During Incapacity</div>
<div class="paragraph">
During any period of incapacity of the Trustor, the Trustee shall pay to or apply for the benefit of the Trustor such amounts of income and principal as the Trustee deems necessary or advisable for the Trustor's health, education, maintenance, and support, and for the care, comfort, and welfare of the Trustor.
</div>

<div class="section-title">11.3 Restoration of Capacity</div>
<div class="paragraph">
If the Trustor regains capacity, as certified in writing by two licensed physicians (or one if two are not reasonably available), the Trustor shall resume serving as Trustee if the Trustor had been serving in that capacity before the incapacity.
</div>

<div class="page-break"></div>

<!-- ARTICLE TWELVE: DEFINITIONS -->
<div class="article-title">ARTICLE TWELVE<br/>DEFINITIONS</div>

<div class="section-title">12.1 Children and Descendants</div>
<div class="paragraph">
As used in this trust, "children" and "descendants" include persons legally adopted but do not include stepchildren or foster children unless specifically named as beneficiaries.
</div>

<div class="section-title">12.2 Per Stirpes</div>
<div class="paragraph">
A distribution "per stirpes" means that if a beneficiary predeceases the Trustor, that beneficiary's share passes to that beneficiary's descendants by right of representation. Each living descendant in the nearest generation to the deceased beneficiary receives an equal share.
</div>

<div class="section-title">12.3 Surviving</div>
<div class="paragraph">
A person "survives" the Trustor only if that person is living 120 hours after the Trustor's death. If it cannot be established that a person survived the Trustor by 120 hours, that person shall be deemed to have predeceased the Trustor.
</div>

<div class="page-break"></div>

<!-- ARTICLE THIRTEEN: GENERAL PROVISIONS -->
<div class="article-title">ARTICLE THIRTEEN<br/>GENERAL PROVISIONS</div>

<div class="section-title">13.1 Governing Law</div>
<div class="paragraph">
This trust shall be governed by and construed according to the laws of the State of California. The validity and effect of this trust shall be determined by California law.
</div>

<div class="section-title">13.2 Severability</div>
<div class="paragraph">
If any provision of this trust is held to be invalid or unenforceable, the remaining provisions shall continue to be fully effective.
</div>

<div class="section-title">13.3 Titles and Headings</div>
<div class="paragraph">
The titles and headings in this trust are for convenience only and shall not affect the interpretation of this trust.
</div>

<div class="section-title">13.4 Number and Gender</div>
<div class="paragraph">
Throughout this trust, the masculine gender includes the feminine and neuter, the singular includes the plural, and the plural includes the singular, as the context requires.
</div>

<div class="section-title">13.5 Execution</div>
<div class="paragraph">
This trust may be executed in counterparts, each of which shall be deemed an original and all of which together shall constitute one and the same instrument.
</div>

<div class="page-break"></div>

<!-- SCHEDULE A: INITIAL TRUST ASSETS -->
<div class="schedule">
  <div class="article-title">SCHEDULE A<br/>INITIAL TRUST ASSETS</div>

  <div class="paragraph">
  The following assets are initially transferred to the {{TRUST_NAME}}:
  </div>

  <table>
    <tr>
      <th>Description of Property</th>
      <th>Approximate Value</th>
    </tr>
    <tr>
      <td>Real Property located at:<br/>{{CLIENT_ADDRESS}}, {{CLIENT_CITY}}, {{CLIENT_STATE}} {{CLIENT_ZIP}}</td>
      <td>$______________</td>
    </tr>
    <tr>
      <td>Bank Accounts and Investment Accounts</td>
      <td>$______________</td>
    </tr>
    <tr>
      <td>Personal Property and Household Items</td>
      <td>$______________</td>
    </tr>
    <tr>
      <td>Other Assets (to be listed):</td>
      <td>$______________</td>
    </tr>
  </table>

  <div class="paragraph">
  Additional assets may be added to this trust at any time by transferring title to the Trustee of this trust or by executing a written assignment.
  </div>
</div>

<div class="page-break"></div>

<!-- SIGNATURE SECTION -->
<div class="signature-block">
  <div class="paragraph">
  IN WITNESS WHEREOF, {{CLIENT_NAME}}, as Trustor and Trustee, has executed this trust document on the date first written above.
  </div>

  <div style="margin-top: 0.5in;">
    <div>Date: <span class="signature-line"></span></div>
  </div>

  <div style="margin-top: 0.5in;">
    <div><span class="signature-line"></span></div>
    <div>{{CLIENT_NAME}}, Trustor and Trustee</div>
  </div>
</div>

<!-- NOTARY SECTION -->
<div class="notary-section">
  <div style="font-weight: bold; text-align: center; margin-bottom: 0.2in;">
    ACKNOWLEDGMENT
  </div>

  <div class="paragraph" style="text-indent: 0;">
  State of California
  </div>
  <div class="paragraph" style="text-indent: 0;">
  County of {{CLIENT_COUNTY}}
  </div>

  <div class="paragraph" style="text-indent: 0; margin-top: 0.2in;">
  On <span class="signature-line"></span> before me, <span class="signature-line"></span>,
  Notary Public, personally appeared {{CLIENT_NAME}}, who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to the within instrument and acknowledged to me that he/she executed the same in his/her authorized capacity, and that by his/her signature on the instrument the person, or the entity upon behalf of which the person acted, executed the instrument.
  </div>

  <div class="paragraph" style="text-indent: 0; margin-top: 0.2in;">
  I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.
  </div>

  <div style="margin-top: 0.3in;">
    <div>WITNESS my hand and official seal.</div>
  </div>

  <div style="margin-top: 0.5in;">
    <div><span class="signature-line"></span></div>
    <div>Signature of Notary Public</div>
  </div>

  <div style="margin-top: 0.3in; border: 2px solid #000; width: 2in; height: 2in; text-align: center; padding-top: 0.8in;">
    [NOTARY SEAL]
  </div>
</div>

</body>
</html>
`;

export default singleLivingTrustTemplate;
