/**
 * Single Living Trust Template (New Format)
 * California Law - Revocable Living Trust for Individual Grantor
 * Supports both new trusts and restatements
 * Uses {{PLACEHOLDER}} syntax for template engine processing
 */

export const singleLivingTrustTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 0.5in; }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.5;
      margin: 0;
      color: #000;
    }
    .title-page {
      text-align: center;
      margin-top: 2in;
    }
    .title {
      font-size: 16pt;
      font-weight: bold;
      margin-bottom: 0.5in;
      text-transform: uppercase;
      line-height: 1.3;
    }
    .subtitle {
      font-size: 12pt;
      margin-bottom: 0.25in;
    }
    .law-firm {
      font-size: 11pt;
      margin-top: 1in;
      line-height: 1.6;
    }
    .toc {
      margin-top: 0.5in;
    }
    .toc-title {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 0.3in;
      text-transform: uppercase;
    }
    .toc-item {
      margin-left: 0.3in;
      margin-bottom: 0.08in;
      font-size: 10pt;
    }
    .article-title {
      font-size: 13pt;
      font-weight: bold;
      text-align: center;
      margin-top: 0.4in;
      margin-bottom: 0.25in;
      text-transform: uppercase;
    }
    .section-title {
      font-weight: bold;
      margin-top: 0.25in;
      margin-bottom: 0.1in;
      font-size: 11pt;
    }
    .subsection-title {
      font-weight: bold;
      margin-left: 0.3in;
      margin-top: 0.15in;
      margin-bottom: 0.08in;
      font-size: 10pt;
    }
    .paragraph {
      text-align: justify;
      margin-bottom: 0.1in;
      text-indent: 0.3in;
    }
    .list-item {
      margin-left: 0.8in;
      margin-bottom: 0.08in;
      text-indent: -0.3in;
      padding-left: 0.3in;
    }
    .signature-block {
      margin-top: 0.8in;
      page-break-inside: avoid;
    }
    .signature-line {
      border-bottom: 1px solid #000;
      width: 3in;
      display: inline-block;
      margin-left: 0.3in;
    }
    .notary-section {
      margin-top: 0.8in;
      border: 2px solid #000;
      padding: 0.25in;
      page-break-inside: avoid;
    }
    .schedule {
      margin-top: 0.4in;
    }
    .page-break {
      page-break-after: always;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 0.15in;
      font-size: 10pt;
    }
    th, td {
      border: 1px solid #000;
      padding: 0.08in;
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
    THE {{CLIENT_NAME}}<br/>
    LIVING TRUST
    {{/IF_NOT_RESTATEMENT}}
  </div>

  <div class="subtitle">
    {{#IF_RESTATEMENT}}
    Originally dated {{ORIGINAL_TRUST_DATE}}<br/>
    Restated on {{CURRENT_DATE}}
    {{/IF_RESTATEMENT}}
    {{#IF_NOT_RESTATEMENT}}
    {{CURRENT_DATE}}
    {{/IF_NOT_RESTATEMENT}}
  </div>

  <div class="law-firm">
    <strong>LAW OFFICES OF ROZSA GYENE, PC</strong><br/>
    450 N Brand Blvd, Suite 623<br/>
    Glendale, California 91203
  </div>
</div>

<div class="page-break"></div>

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <div class="toc-title">TABLE OF CONTENTS</div>

  <div class="toc-item">Article One: Establishing the Trust</div>
  <div class="toc-item">Article Two: Family Information</div>
  <div class="toc-item">Article Three: Trustee Succession Provisions</div>
  <div class="toc-item">Article Four: Administration During My Incapacity</div>
  <div class="toc-item">Article Five: Administration Upon My Death</div>
  <div class="toc-item">Article Six: Specific Distributions and Tangible Personal Property</div>
  <div class="toc-item">Article Seven: Distribution to My Beneficiaries</div>
  <div class="toc-item">Article Eight: Remote Contingent Distribution</div>
  <div class="toc-item">Article Nine: Distributions to Minors and Incapacitated Beneficiaries</div>
  <div class="toc-item">Article Ten: Retirement Plans and Life Insurance</div>
  <div class="toc-item">Article Eleven: Trust Administration</div>
  <div class="toc-item">Article Twelve: The Trustee's Powers</div>
  <div class="toc-item">Article Thirteen: General Provisions</div>
  <div class="toc-item">Schedule of Assets</div>
</div>

<div class="page-break"></div>

<!-- ARTICLE ONE: ESTABLISHING THE TRUST -->
<div class="article-title">ARTICLE ONE<br/>ESTABLISHING THE TRUST</div>

<div class="paragraph">
I, {{CLIENT_NAME}}, am the Grantor and the Trustee of this trust. I intend to create a valid trust under the laws of California and under the laws of any state in which this trust is administered. The terms of this trust prevail over any provision of California law, except those provisions that are mandatory and may not be waived.
</div>

<div class="section-title">1.01 Identifying the Trust</div>
<div class="paragraph">
For convenience, this trust may be referred to as:
</div>
<div class="paragraph" style="text-align: center; font-weight: bold;">
"The {{CLIENT_NAME}} Living Trust dated {{CURRENT_DATE}}"
</div>

<div class="section-title">1.02 {{#IF_RESTATEMENT}}Restatement of Trust{{/IF_RESTATEMENT}}{{#IF_NOT_RESTATEMENT}}Creation of Trust{{/IF_NOT_RESTATEMENT}}</div>
<div class="paragraph">
{{#IF_RESTATEMENT}}
This document represents the First Restatement of the {{ORIGINAL_TRUST_NAME}}, originally created on {{ORIGINAL_TRUST_DATE}}. I, {{CLIENT_NAME}}, as Grantor, hereby completely restate and supersede the original trust document in its entirety. All property and assets previously held in the original trust shall continue to be held in this restated trust under the terms and conditions set forth herein.
{{/IF_RESTATEMENT}}
{{#IF_NOT_RESTATEMENT}}
I, {{CLIENT_NAME}}, as Grantor, hereby declare that I have set aside and am holding, and will hold, all property described in Schedule A attached hereto, and any other property that may be added to this trust, in trust according to the terms and conditions set forth in this trust agreement.
{{/IF_NOT_RESTATEMENT}}
</div>

<div class="section-title">1.03 Reliance by Third Parties</div>
<div class="paragraph">
No person dealing with the Trustee shall be required to inquire into the validity of this trust, the authority of the Trustee, or the propriety of any action by the Trustee. No person who acts in reliance upon any representations made by the Trustee shall incur any liability to the trust or to any beneficiary.
</div>

<div class="section-title">1.04 Powers Reserved by Me as Grantor</div>
<div class="paragraph">
I reserve the right during my lifetime to:
</div>
<div class="list-item">(a) Amend this trust in any respect by a signed writing delivered to the Trustee;</div>
<div class="list-item">(b) Revoke this trust in whole or in part by a signed writing delivered to the Trustee;</div>
<div class="list-item">(c) Withdraw any or all property from this trust;</div>
<div class="list-item">(d) Add property to this trust;</div>
<div class="list-item">(e) Direct the investment of trust property;</div>
<div class="list-item">(f) Serve as Trustee or remove and replace any Trustee.</div>

<div class="section-title">1.05 Grantor Trust Status</div>
<div class="paragraph">
This trust is intended to be a "grantor trust" under Internal Revenue Code Section 676. During my lifetime, I shall be treated as the owner of all trust property for income tax purposes. All income, deductions, and credits against tax shall be reported on my individual income tax return.
</div>

<div class="page-break"></div>

<!-- ARTICLE TWO: FAMILY INFORMATION -->
<div class="article-title">ARTICLE TWO<br/>FAMILY INFORMATION</div>

<div class="paragraph">
I am {{CLIENT_MARITAL_STATUS}}. {{#IF_HAS_CHILDREN}}I have the following children:{{/IF_HAS_CHILDREN}}
</div>

{{#IF_HAS_CHILDREN}}
<table>
  <tr>
    <th>Name</th>
    <th>Date of Birth</th>
    <th>Relationship</th>
  </tr>
  {{#EACH_CHILDREN}}
  <tr>
    <td>{{CHILD_FULL_NAME}}</td>
    <td>{{CHILD_DOB_FORMATTED}}</td>
    <td>{{CHILD_RELATIONSHIP}}</td>
  </tr>
  {{/EACH_CHILDREN}}
</table>
{{/IF_HAS_CHILDREN}}

<div class="paragraph">
References in this trust to "my children," "my descendants," or similar terms include only the individuals named above and their descendants.
</div>

<div class="page-break"></div>

<!-- ARTICLE THREE: TRUSTEE SUCCESSION PROVISIONS -->
<div class="article-title">ARTICLE THREE<br/>TRUSTEE SUCCESSION PROVISIONS</div>

<div class="section-title">3.01 Initial Trustee</div>
<div class="paragraph">
I, {{CLIENT_NAME}}, shall serve as the initial Trustee of this trust.
</div>

<div class="section-title">3.02 Successor Trustees</div>
<div class="paragraph">
Upon my death, resignation, or incapacity, the following individuals shall serve as Successor Trustees, in the order named:
</div>

{{#EACH_SUCCESSOR_TRUSTEES}}
<div class="list-item">{{INDEX}}. {{SUCCESSOR_TRUSTEE_NAME}}</div>
{{/EACH_SUCCESSOR_TRUSTEES}}

<div class="paragraph">
If none of the named Successor Trustees are willing or able to serve, any adult beneficiary of this trust may petition a court of competent jurisdiction to appoint a successor Trustee.
</div>

<div class="section-title">3.03 Trustee Powers and Duties</div>
<div class="paragraph">
Any Successor Trustee shall have all the powers and duties of the initial Trustee as set forth in this trust agreement.
</div>

<div class="page-break"></div>

<!-- ARTICLE FOUR: ADMINISTRATION DURING INCAPACITY -->
<div class="article-title">ARTICLE FOUR<br/>ADMINISTRATION DURING MY INCAPACITY</div>

<div class="section-title">4.01 Determination of Incapacity</div>
<div class="paragraph">
I shall be considered incapacitated if I am unable to manage my financial affairs, as certified in writing by two licensed physicians. Upon my incapacity, the Successor Trustee shall assume all powers and duties of the Trustee.
</div>

<div class="section-title">4.02 Trust Distributions During My Incapacity</div>
<div class="paragraph">
During my incapacity, the Trustee shall pay to or for my benefit such amounts of income and principal as the Trustee deems necessary or advisable for my health, education, maintenance, and support, and for the payment of my debts and expenses.
</div>

<div class="page-break"></div>

<!-- ARTICLE FIVE: ADMINISTRATION UPON MY DEATH -->
<div class="article-title">ARTICLE FIVE<br/>ADMINISTRATION UPON MY DEATH</div>

<div class="section-title">5.01 Trust Becomes Irrevocable</div>
<div class="paragraph">
Upon my death, this trust shall become irrevocable and may not be amended or revoked by anyone.
</div>

<div class="section-title">5.02 Payment of Expenses and Debts</div>
<div class="paragraph">
Upon my death, the Trustee shall pay from the trust estate:
</div>
<div class="list-item">(a) My funeral and burial expenses;</div>
<div class="list-item">(b) Expenses of my last illness;</div>
<div class="list-item">(c) Expenses of administering this trust and my probate estate, if any;</div>
<div class="list-item">(d) My debts and obligations, except those secured by real property;</div>
<div class="list-item">(e) Estate and inheritance taxes payable by reason of my death.</div>

<div class="section-title">5.03 Coordination with Personal Representative</div>
<div class="paragraph">
If a personal representative is appointed for my probate estate, the Trustee shall cooperate with the personal representative and may make payments directly to the personal representative for distribution according to my will or the laws of intestate succession.
</div>

<div class="page-break"></div>

<!-- ARTICLE SIX: SPECIFIC DISTRIBUTIONS -->
<div class="article-title">ARTICLE SIX<br/>SPECIFIC DISTRIBUTIONS AND TANGIBLE PERSONAL PROPERTY</div>

{{#EACH_SPECIFIC_DISTRIBUTIONS}}
<div class="section-title">6.{{INDEX}} Specific Distribution to {{BENEFICIARY_NAME}}</div>
<div class="paragraph">
I give and bequeath to {{BENEFICIARY_NAME}} the following property: {{DESCRIPTION}}.
{{#IF_LAPSE_TO}}
If {{BENEFICIARY_NAME}} does not survive me, this distribution shall lapse to {{LAPSE_TO}}.
{{/IF_LAPSE_TO}}
</div>
{{/EACH_SPECIFIC_DISTRIBUTIONS}}

<div class="section-title">6.10 Distribution of Tangible Personal Property</div>
<div class="paragraph">
I may leave written instructions for the distribution of items of tangible personal property. The Trustee shall distribute such property in accordance with my written instructions. Any tangible personal property not disposed of by written instructions shall be distributed as part of the residuary estate.
</div>

<div class="page-break"></div>

<!-- ARTICLE SEVEN: DISTRIBUTION TO BENEFICIARIES -->
<div class="article-title">ARTICLE SEVEN<br/>DISTRIBUTION TO MY BENEFICIARIES</div>

<div class="section-title">7.01 Division of Remaining Trust Property</div>
<div class="paragraph">
After making the payments and distributions described in Articles Five and Six, the Trustee shall divide the remaining trust property into separate shares for the following beneficiaries:
</div>

{{#EACH_RESIDUARY_BENEFICIARIES}}
<div class="list-item">{{NAME}} - {{SHARE}}%</div>
{{/EACH_RESIDUARY_BENEFICIARIES}}

<div class="section-title">7.02 Distribution of Beneficiary Shares</div>
<div class="paragraph">
Each beneficiary's share shall be distributed as follows:
</div>

{{#EACH_RESIDUARY_BENEFICIARIES}}
<div class="subsection-title">Distribution to {{NAME}}</div>
<div class="paragraph">
The Trustee shall distribute the share for {{NAME}} {{#IF_OUTRIGHT}}outright and free of trust{{/IF_OUTRIGHT}}{{#IF_IN_TRUST}}in accordance with the trust provisions set forth below{{/IF_IN_TRUST}}.
</div>
{{/EACH_RESIDUARY_BENEFICIARIES}}

<div class="page-break"></div>

<!-- ARTICLE EIGHT: REMOTE CONTINGENT DISTRIBUTION -->
<div class="article-title">ARTICLE EIGHT<br/>REMOTE CONTINGENT DISTRIBUTION</div>

<div class="paragraph">
If all beneficiaries named in this trust predecease me or fail to survive me, the Trustee shall distribute the entire trust estate to my heirs at law, determined as if I had died intestate, domiciled in California.
</div>

<div class="page-break"></div>

<!-- ARTICLE NINE: DISTRIBUTIONS TO MINORS -->
<div class="article-title">ARTICLE NINE<br/>DISTRIBUTIONS TO MINORS AND INCAPACITATED BENEFICIARIES</div>

<div class="section-title">9.01 Custodianship for Minors</div>
<div class="paragraph">
If any beneficiary is a minor, the Trustee may distribute such beneficiary's share:
</div>
<div class="list-item">(a) To the beneficiary directly;</div>
<div class="list-item">(b) To a parent or guardian of the beneficiary;</div>
<div class="list-item">(c) To a custodian under the California Uniform Transfers to Minors Act;</div>
<div class="list-item">(d) By holding the share in trust until the beneficiary reaches age 25.</div>

<div class="section-title">9.02 Incapacitated Beneficiaries</div>
<div class="paragraph">
If any beneficiary is incapacitated, the Trustee may distribute such beneficiary's share to the beneficiary's legal representative, or may retain the share in trust and distribute income and principal for the beneficiary's benefit.
</div>

<div class="page-break"></div>

<!-- ARTICLE TEN: RETIREMENT PLANS AND LIFE INSURANCE -->
<div class="article-title">ARTICLE TEN<br/>RETIREMENT PLANS AND LIFE INSURANCE POLICIES</div>

<div class="section-title">10.01 Retirement Plans</div>
<div class="paragraph">
The Trustee is authorized to receive and hold any death benefits payable to this trust from any retirement plan, IRA, or other tax-deferred account. The Trustee shall distribute such benefits in accordance with the terms of this trust and applicable tax laws.
</div>

<div class="section-title">10.02 Life Insurance Policies</div>
<div class="paragraph">
The Trustee is authorized to receive and hold the proceeds of any life insurance policy payable to this trust. The Trustee shall distribute such proceeds in accordance with the terms of this trust.
</div>

<div class="page-break"></div>

<!-- ARTICLE ELEVEN: TRUST ADMINISTRATION -->
<div class="article-title">ARTICLE ELEVEN<br/>TRUST ADMINISTRATION</div>

<div class="section-title">11.01 No Bond Required</div>
<div class="paragraph">
No Trustee named in this trust shall be required to post a bond or provide other security, regardless of whether the Trustee is serving in this state or another jurisdiction.
</div>

<div class="section-title">11.02 Trustee Compensation</div>
<div class="paragraph">
Any Trustee shall be entitled to reasonable compensation for services rendered. A Trustee who is also a beneficiary may elect to serve without compensation.
</div>

<div class="section-title">11.03 Trust Accounting</div>
<div class="paragraph">
The Trustee shall provide an annual accounting to all current beneficiaries, showing all receipts, disbursements, and distributions during the accounting period.
</div>

<div class="section-title">11.04 Exoneration of Trustee</div>
<div class="paragraph">
No Trustee shall be liable for any act or omission made in good faith and in the exercise of reasonable care. The Trustee shall not be liable for any loss or depreciation in the value of trust property, except to the extent caused by the Trustee's negligence or willful misconduct.
</div>

<div class="page-break"></div>

<!-- ARTICLE TWELVE: TRUSTEE POWERS -->
<div class="article-title">ARTICLE TWELVE<br/>THE TRUSTEE'S POWERS</div>

<div class="section-title">12.01 General Powers</div>
<div class="paragraph">
In addition to any powers conferred by law, the Trustee shall have the following powers, to be exercised in the Trustee's discretion for the benefit of the beneficiaries:
</div>

<div class="list-item">(a) To retain, sell, exchange, or otherwise dispose of any trust property;</div>
<div class="list-item">(b) To invest and reinvest trust property in any kind of property, real or personal;</div>
<div class="list-item">(c) To borrow money and encumber trust property;</div>
<div class="list-item">(d) To manage, operate, or lease any real property;</div>
<div class="list-item">(e) To purchase insurance on trust property or the life of any beneficiary;</div>
<div class="list-item">(f) To employ attorneys, accountants, and other professionals;</div>
<div class="list-item">(g) To commence or defend litigation;</div>
<div class="list-item">(h) To make distributions in cash or in kind;</div>
<div class="list-item">(i) To determine what is principal and what is income;</div>
<div class="list-item">(j) To exercise all powers available to an individual owner of property.</div>

<div class="page-break"></div>

<!-- ARTICLE THIRTEEN: GENERAL PROVISIONS -->
<div class="article-title">ARTICLE THIRTEEN<br/>GENERAL PROVISIONS</div>

<div class="section-title">13.01 Governing Law</div>
<div class="paragraph">
This trust shall be governed by and construed in accordance with the laws of the State of California.
</div>

<div class="section-title">13.02 Severability</div>
<div class="paragraph">
If any provision of this trust is held invalid, the remaining provisions shall continue in full force and effect.
</div>

<div class="section-title">13.03 No Contest Clause</div>
<div class="paragraph">
If any beneficiary contests the validity of this trust or any of its provisions, that beneficiary shall forfeit all benefits under this trust.
</div>

<div class="section-title">13.04 Notices</div>
<div class="paragraph">
All notices required under this trust shall be in writing and shall be effective when personally delivered or mailed by certified mail, return receipt requested.
</div>

<div class="page-break"></div>

<!-- SIGNATURE BLOCK -->
<div class="signature-block">
  <div class="paragraph">
    I have executed this trust agreement on {{CURRENT_DATE}}. This trust instrument is effective when signed by me, whether or not now signed by a Trustee.
  </div>

  <div style="margin-top: 0.8in;">
    <span class="signature-line"></span><br/>
    {{CLIENT_NAME}}, Grantor and Trustee
  </div>
</div>

<!-- NOTARY ACKNOWLEDGMENT -->
<div class="notary-section">
  <div style="text-align: center; font-weight: bold; margin-bottom: 0.15in;">
    ACKNOWLEDGMENT
  </div>

  <div class="paragraph" style="text-indent: 0;">
    A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.
  </div>

  <div class="paragraph" style="text-indent: 0;">
    State of California<br/>
    County of {{CLIENT_COUNTY}}
  </div>

  <div class="paragraph" style="text-indent: 0;">
    On {{NOTARY_DATE}} before me, <span class="signature-line"></span> (name of notary public), personally appeared {{CLIENT_NAME}}, who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to the within instrument and acknowledged to me that he/she executed the same in his/her authorized capacity, and that by his/her signature on the instrument the person, or the entity upon behalf of which the person acted, executed the instrument.
  </div>

  <div class="paragraph" style="text-indent: 0;">
    I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.
  </div>

  <div style="margin-top: 0.3in;">
    WITNESS my hand and official seal.<br/><br/>
    Signature: <span class="signature-line"></span> (Seal)
  </div>
</div>

<div class="page-break"></div>

<!-- SCHEDULE OF ASSETS -->
<div class="schedule">
  <div style="text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 0.3in;">
    SCHEDULE A<br/>
    SCHEDULE OF ASSETS
  </div>

  <div class="paragraph">
    The following property is hereby transferred to and shall be held as part of the trust estate:
  </div>

  <div style="margin-top: 0.3in;">
    <div class="signature-line" style="width: 100%; margin-left: 0;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
    <div class="signature-line" style="width: 100%; margin-left: 0; margin-top: 0.15in;"></div>
  </div>
</div>

</body>
</html>
`;

export default singleLivingTrustTemplate;
