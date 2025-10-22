/**
 * Joint Living Trust Template
 * California Law - Revocable Living Trust for Married Couples
 * Supports both new trusts and restatements
 */

export const jointLivingTrustTemplate = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.5;
      margin: 0.5in;
      color: #000;
    }
    .title-page {
      text-align: center;
      margin-top: 3in;
    }
    .title {
      font-size: 16pt;
      font-weight: bold;
      margin-bottom: 0.5in;
      text-transform: uppercase;
    }
    .subtitle {
      font-size: 12pt;
      margin-bottom: 0.25in;
    }
    .toc {
      margin-top: 0.5in;
    }
    .toc-title {
      font-size: 14pt;
      font-weight: bold;
      text-align: center;
      margin-bottom: 0.3in;
    }
    .toc-item {
      margin-left: 0.3in;
      margin-bottom: 0.1in;
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
    THE {{CLIENT_NAME}} AND {{SPOUSE_NAME}}<br/>
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
</div>

<div class="page-break"></div>

<!-- TABLE OF CONTENTS -->
<div class="toc">
  <div class="toc-title">TABLE OF CONTENTS</div>

  <div class="toc-item">Article One: Establishing the Trust</div>
  <div class="toc-item">Article Two: Family Information</div>
  <div class="toc-item">Article Three: Trustee Succession Provisions</div>
  <div class="toc-item">Article Four: Administration During Incapacity</div>
  <div class="toc-item">Article Five: Administration Upon Death of a Grantor</div>
  <div class="toc-item">Article Six: Specific Distributions and Tangible Personal Property</div>
  <div class="toc-item">Article Seven: Creating Trust Shares Upon Death of First Grantor</div>
  <div class="toc-item">Article Eight: The Survivor's Trust</div>
  <div class="toc-item">Article Nine: The Family Trust</div>
  <div class="toc-item">Article Ten: Distribution for Our Beneficiaries</div>
  <div class="toc-item">Article Eleven: Remote Contingent Distribution</div>
  <div class="toc-item">Article Twelve: Distributions to Minors and Incapacitated Beneficiaries</div>
  <div class="toc-item">Article Thirteen: Retirement Plans and Life Insurance</div>
  <div class="toc-item">Article Fourteen: Trust Administration</div>
  <div class="toc-item">Article Fifteen: The Trustee's Powers</div>
  <div class="toc-item">Article Sixteen: General Provisions</div>
  <div class="toc-item">Schedule of Assets</div>
</div>

<div class="page-break"></div>

<!-- ARTICLE ONE: ESTABLISHING THE TRUST -->
<div class="article-title">ARTICLE ONE<br/>ESTABLISHING THE TRUST</div>

<div class="paragraph">
The parties to this trust are {{CLIENT_NAME}} and {{SPOUSE_NAME}} (the Grantors), and {{CLIENT_NAME}} and {{SPOUSE_NAME}} (collectively, the Trustee).
</div>

<div class="paragraph">
We intend to create a valid trust under the laws of California and under the laws of any state in which any trust created under this trust document is administered. The terms of this trust prevail over any provision of California law, except those provisions that are mandatory and may not be waived.
</div>

<div class="section-title">1.01 Identifying the Trust</div>
<div class="paragraph">
For convenience, the trust may be referred to as:
</div>
<div class="paragraph" style="text-align: center; font-weight: bold;">
"The {{CLIENT_NAME}} and {{SPOUSE_NAME}} Living Trust dated {{CURRENT_DATE}}"
</div>

<div class="section-title">1.02 {{#IF_RESTATEMENT}}Restatement of Trust{{/IF_RESTATEMENT}}{{#IF_NOT_RESTATEMENT}}Creation of Trust{{/IF_NOT_RESTATEMENT}}</div>
<div class="paragraph">
{{#IF_RESTATEMENT}}
This document represents the First Restatement of the {{ORIGINAL_TRUST_NAME}}, originally created on {{ORIGINAL_TRUST_DATE}}. We, {{CLIENT_NAME}} and {{SPOUSE_NAME}}, as Grantors, hereby completely restate and supersede the original trust document in its entirety. All property and assets previously held in the original trust shall continue to be held in this restated trust under the terms and conditions set forth herein.
{{/IF_RESTATEMENT}}
{{#IF_NOT_RESTATEMENT}}
We, {{CLIENT_NAME}} and {{SPOUSE_NAME}}, as Grantors, hereby declare that we have set aside and are holding, and will hold, all property described in Schedule A attached hereto, and any other property that may be added to this trust, in trust according to the terms and conditions set forth in this trust agreement.
{{/IF_NOT_RESTATEMENT}}
</div>

<div class="section-title">1.03 Grantor Trust Status and Community Property</div>
<div class="paragraph">
By reserving broad rights and powers, we intend to qualify this trust as a Grantor Trust under Internal Revenue Code Sections 671 to 677. For federal income tax purposes, each of us will be treated as the owner of one-half of all community property held in the trust and as the owner of our respective separate property.
</div>

<div class="paragraph">
Any community property transferred to the trust, including the property's income and proceeds from sale or exchange, will retain its character as community property during our lives, to the same extent as if it had not been transferred to the trust.
</div>

<div class="page-break"></div>

<!-- ARTICLE TWO: FAMILY INFORMATION -->
<div class="article-title">ARTICLE TWO<br/>FAMILY INFORMATION</div>

<div class="paragraph">
{{CLIENT_NAME}} is referred to in this trust as {{CLIENT_SEX}}, and {{SPOUSE_NAME}} is referred to in this trust as {{SPOUSE_SEX}}.
</div>

<div class="paragraph">
We have the following children:
</div>

{{#EACH_CHILDREN}}
<div class="list-item">
{{INDEX}}. {{NAME}}, born on {{BIRTHDAY}}
</div>
{{/EACH_CHILDREN}}

<div class="paragraph">
All references in this document to our children are references to these children, and any children subsequently born to us or adopted by us by legal proceeding. References to our descendants are to our children and their descendants, including any deceased child's descendants.
</div>

<div class="page-break"></div>

<!-- ARTICLE THREE: TRUSTEE SUCCESSION -->
<div class="article-title">ARTICLE THREE<br/>TRUSTEE SUCCESSION PROVISIONS</div>

<div class="section-title">3.01 Initial Trustees</div>
<div class="paragraph">
{{CLIENT_NAME}} and {{SPOUSE_NAME}} are the initial Trustees of this trust. While we are both alive and serving as Trustees, either or both of us may act for and conduct business on behalf of the trust without the consent of the other.
</div>

<div class="section-title">3.02 Trustee Succession While Both Grantors Are Alive</div>
<div class="paragraph">
By joint agreement, we may remove any Trustee at any time, with or without cause. If one of us is incapacitated, the non-incapacitated Grantor may serve as sole Trustee.
</div>

<div class="paragraph">
If neither of us is able to serve as Trustee, then we name the following to serve as successor Trustees:
</div>

{{#EACH_SUCCESSOR_TRUSTEES}}
<div class="list-item">
{{INDEX}}. {{NAME}}, residing at {{ADDRESS}}, Phone: {{PHONE}} {{JOINTLY}}
</div>
{{/EACH_SUCCESSOR_TRUSTEES}}

<div class="section-title">3.03 Trustee Succession After Death of First Grantor</div>
<div class="paragraph">
Upon the death of the first of us to die, the surviving Grantor may serve as sole Trustee of all trusts created under this instrument.
</div>

<div class="paragraph">
If the surviving Grantor is unable or unwilling to serve, then the successor Trustees named in Section 3.02 shall serve in the order listed.
</div>

<div class="page-break"></div>

<!-- ARTICLE FOUR: ADMINISTRATION DURING INCAPACITY -->
<div class="article-title">ARTICLE FOUR<br/>ADMINISTRATION DURING INCAPACITY</div>

<div class="section-title">4.01 Trust Distributions During a Grantor's Incapacity</div>
<div class="paragraph">
During any period when a Grantor is incapacitated, the Trustee shall regularly and conscientiously make appropriate distributions of income and principal for the benefit of the incapacitated Grantor under the circumstances existing at the time each distribution is made.
</div>

<div class="paragraph">
The Trustee may also distribute as much of the net income and principal of the incapacitated Grantor's trust as the Trustee considers necessary for the health, education, maintenance and support in reasonable comfort of the other Grantor.
</div>

<div class="paragraph">
When making distributions, the Trustee shall give equal consideration to the incapacitated Grantor's needs and the needs of the other Grantor without any priority between us.
</div>

<div class="subsection-title">(a) Determination of Incapacity</div>
<div class="paragraph">
A Grantor shall be considered incapacitated if two (2) licensed physicians examine the Grantor and certify in writing that the Grantor is unable to manage financial affairs by reason of physical or mental impairment.
</div>

<div class="page-break"></div>

<!-- ARTICLE FIVE: ADMINISTRATION UPON DEATH -->
<div class="article-title">ARTICLE FIVE<br/>ADMINISTRATION UPON DEATH OF A GRANTOR</div>

<div class="section-title">5.01 Surviving Grantor's Trust Property and Deceased Grantor's Trust Property</div>
<div class="paragraph">
After the first of us dies, the surviving Grantor's interest in any community property of the trust and the surviving Grantor's separate trust property will be referred to as the surviving Grantor's trust property or the Survivor's Trust.
</div>

<div class="paragraph">
The deceased Grantor's interest in any community property of the trust and the deceased Grantor's separate trust property will be referred to as the deceased Grantor's trust property.
</div>

<div class="section-title">5.02 Payment of Expenses and Taxes</div>
<div class="paragraph">
The Trustee may pay from the deceased Grantor's trust property:
</div>

<div class="list-item">
(a) Expenses of the deceased Grantor's last illness, funeral, and burial or cremation, including expenses of memorials and memorial services;
</div>
<div class="list-item">
(b) Legally enforceable claims against the deceased Grantor or the deceased Grantor's estate;
</div>
<div class="list-item">
(c) Expenses of administering the trust and the deceased Grantor's estate; and
</div>
<div class="list-item">
(d) Court-ordered allowances for those dependent upon the deceased Grantor.
</div>

<div class="section-title">5.03 Payment of Death Taxes</div>
<div class="paragraph">
The Trustee shall provide for payment of all death taxes from the administrative trust without apportionment. Death taxes may not be allocated to or paid from any assets that are exempt from generation-skipping transfer tax purposes or that qualify for the federal estate tax marital deduction or charitable deduction.
</div>

<div class="page-break"></div>

<!-- ARTICLE SIX: SPECIFIC DISTRIBUTIONS -->
<div class="article-title">ARTICLE SIX<br/>SPECIFIC DISTRIBUTIONS AND TANGIBLE PERSONAL PROPERTY</div>

{{#EACH_SPECIFIC_DISTRIBUTIONS}}
<div class="section-title">6.{{INDEX}} Specific Distribution to {{BENEFICIARY_NAME}}</div>
<div class="paragraph">
As soon as practicable after the death of the surviving Grantor, the Trustee shall distribute the following to {{BENEFICIARY_NAME}}: {{DESCRIPTION}}.
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
If {{BENEFICIARY_NAME}} does not survive the surviving Grantor, this bequest shall lapse and {{#IF_LAPSE_TO}}pass to {{LAPSE_TO}}{{/IF_LAPSE_TO}}{{#IF_NO_LAPSE}}become part of the residuary estate{{/IF_NO_LAPSE}}.
</div>
{{/EACH_SPECIFIC_DISTRIBUTIONS}}

<div class="section-title">6.{{NEXT_SECTION}} Distribution of Tangible Personal Property</div>
<div class="paragraph">
Each of us may dispose of items of tangible personal property by a signed written memorandum executed after we sign this instrument. The Trustee shall distribute the items of tangible personal property listed in any such memorandum according to its terms.
</div>

<div class="paragraph">
Any remaining tangible personal property not disposed of by written memorandum shall be distributed to the Survivor's Trust. If we are both deceased, the Trustee shall distribute the property to our children in shares of substantially equal value, to be divided among our children as they agree.
</div>

<div class="page-break"></div>

<!-- ARTICLE SEVEN: CREATING TRUST SHARES -->
<div class="article-title">ARTICLE SEVEN<br/>CREATING TRUST SHARES UPON DEATH OF FIRST GRANTOR</div>

<div class="section-title">7.01 Allocation to the Survivor's Trust</div>
<div class="paragraph">
The Trustee shall allocate all of the deceased Grantor's remaining trust property to the Survivor's Trust, and shall administer the property as provided in Article Eight.
</div>

<div class="section-title">7.02 Disclaimer by Surviving Grantor</div>
<div class="paragraph">
The surviving Grantor may disclaim any portion of any interest in property passing from the deceased Grantor. If the surviving Grantor disclaims any property that would otherwise be allocated to the Survivor's Trust, the Trustee shall allocate the disclaimed property to the Non-Marital Share (Family Trust) and administer it as provided in Article Nine.
</div>

<div class="page-break"></div>

<!-- ARTICLE EIGHT: SURVIVOR'S TRUST -->
<div class="article-title">ARTICLE EIGHT<br/>THE SURVIVOR'S TRUST</div>

<div class="section-title">8.01 Trustee of the Survivor's Trust</div>
<div class="paragraph">
The surviving Grantor may serve as sole Trustee of the Survivor's Trust. The surviving Grantor may remove and replace the Trustee of the Survivor's Trust at any time, with or without cause.
</div>

<div class="section-title">8.02 The Surviving Grantor's Right to Amend</div>
<div class="paragraph">
The surviving Grantor has the absolute right to amend the Survivor's Trust's terms by restating them in full. The restated Survivor's Trust must be in writing and signed by the surviving Grantor and the Trustee.
</div>

<div class="section-title">8.03 Distribution of Income and Principal</div>
<div class="paragraph">
The Trustee shall distribute all of the net income of the Survivor's Trust to the surviving Grantor at least monthly. The Trustee shall distribute as much of the principal of the Survivor's Trust to the surviving Grantor as he or she directs for any reason.
</div>

<div class="section-title">8.04 General Power of Appointment</div>
<div class="paragraph">
The surviving Grantor may appoint all or any portion of the principal and undistributed income remaining in the Survivor's Trust at the surviving Grantor's death among one or more persons or entities, including the creditors of the surviving Grantor's estate.
</div>

<div class="section-title">8.05 Administration Following Surviving Grantor's Death</div>
<div class="paragraph">
The Survivor's Trust becomes irrevocable upon the death of the surviving Grantor. Upon completion of administrative tasks, the Trustee shall administer the unappointed balance or remainder of the Survivor's Trust as provided in Article Ten.
</div>

<div class="page-break"></div>

<!-- ARTICLE NINE: FAMILY TRUST -->
<div class="article-title">ARTICLE NINE<br/>THE FAMILY TRUST</div>

<div class="section-title">9.01 Family Trust Beneficiary</div>
<div class="paragraph">
The surviving Grantor is the only beneficiary of the Family Trust during the surviving Grantor's lifetime.
</div>

<div class="section-title">9.02 Distribution of Income and Principal</div>
<div class="paragraph">
The Trustee shall distribute all of the net income of the Family Trust to the surviving Grantor at least monthly during the surviving Grantor's lifetime.
</div>

<div class="paragraph">
The Independent Trustee may distribute as much of the principal of the Family Trust to the surviving Grantor as the Independent Trustee may determine advisable for any purpose. If no Independent Trustee is serving, the Trustee shall distribute principal as necessary for the surviving Grantor's health, education, maintenance and support in reasonable comfort.
</div>

<div class="section-title">9.03 Termination of the Family Trust</div>
<div class="paragraph">
The Family Trust will terminate upon the death of the surviving Grantor and the Trustee shall administer the balance or remainder of the Family Trust as provided in Article Ten.
</div>

<div class="page-break"></div>

<!-- ARTICLE TEN: DISTRIBUTION FOR BENEFICIARIES -->
<div class="article-title">ARTICLE TEN<br/>DISTRIBUTION FOR OUR BENEFICIARIES</div>

<div class="section-title">10.01 Division of Remaining Trust Property</div>
<div class="paragraph">
Upon the death of the survivor of us, the Trustee shall distribute the remaining trust property as follows:
</div>

{{#EACH_RESIDUARY_BENEFICIARIES}}
<div class="subsection-title">10.01({{LETTER}}) {{NAME}}</div>
<div class="paragraph">
The Trustee shall distribute {{SHARE}}% of the remaining trust property to {{NAME}}.
</div>

<div class="paragraph">
{{#IF_OUTRIGHT}}
This share shall be distributed outright and free of trust.
{{/IF_OUTRIGHT}}
{{#IF_NEEDS_TRUST}}
This share shall be held in a separate trust (the "{{NAME}} Special Needs Trust") to be administered for {{NAME}}'s health, education, maintenance, and support.
{{/IF_NEEDS_TRUST}}
{{#IF_GUARDIAN}}
This share shall be held in trust and distributed in installments:
<div class="list-item">- 1/3 when {{NAME}} reaches age 25</div>
<div class="list-item">- 1/2 of the remainder when {{NAME}} reaches age 30</div>
<div class="list-item">- The balance when {{NAME}} reaches age 35</div>
Until the age-based distributions are complete, the Trustee may distribute income and principal for {{NAME}}'s health, education, maintenance, and support.
{{/IF_GUARDIAN}}
</div>

<div class="paragraph">
{{NAME}} has the testamentary general power to appoint all or any portion of the principal and undistributed income remaining in his or her trust at death. If {{NAME}} does not effectively exercise this power of appointment, the Trustee shall distribute the remaining balance per stirpes to {{NAME}}'s descendants. If {{NAME}} has no descendants, the Trustee shall distribute per stirpes to our descendants.
</div>
{{/EACH_RESIDUARY_BENEFICIARIES}}

<div class="section-title">10.02 Per Stirpes Distribution</div>
<div class="paragraph">
If any beneficiary named in this Article does not survive the surviving Grantor, that beneficiary's share shall pass to that beneficiary's living descendants, per stirpes. If a beneficiary has no living descendants, that share shall be divided among the other named beneficiaries in proportion to their shares.
</div>

<div class="page-break"></div>

<!-- ARTICLE ELEVEN: REMOTE CONTINGENT DISTRIBUTION -->
<div class="article-title">ARTICLE ELEVEN<br/>REMOTE CONTINGENT DISTRIBUTION</div>

<div class="paragraph">
If at any time no person or entity is qualified to receive final distribution of any part of our trust estate, this portion of our trust estate must be distributed one-half to those persons who would inherit it had {{CLIENT_NAME}} then died intestate owning this property, and one-half to those persons who would inherit it had {{SPOUSE_NAME}} then died intestate owning this property, as determined under the laws of California then in effect.
</div>

<div class="page-break"></div>

<!-- ARTICLE TWELVE: MINORS AND INCAPACITATED BENEFICIARIES -->
<div class="article-title">ARTICLE TWELVE<br/>DISTRIBUTIONS TO MINORS AND INCAPACITATED BENEFICIARIES</div>

<div class="section-title">12.01 Retention in Trust</div>
<div class="paragraph">
If the Trustee is authorized or directed to distribute property to a person who has not yet reached 21 years of age or who is incapacitated, the Trustee may retain and administer the property in a separate trust for that beneficiary's benefit.
</div>

<div class="paragraph">
The Trustee shall distribute to the beneficiary as much of the net income and principal as the Trustee determines necessary for the beneficiary's health, education, maintenance, or support. Any undistributed net income will be accumulated and added to principal.
</div>

<div class="paragraph">
When the beneficiary reaches 21 years of age or is no longer incapacitated, the beneficiary may withdraw all or any portion of the accumulated net income and principal from the trust.
</div>

<div class="section-title">12.02 Testamentary Power of Appointment</div>
<div class="paragraph">
Each beneficiary whose trust is created under this Article has a testamentary general power to appoint the remaining trust property at the beneficiary's death. If not effectively appointed, the Trustee shall distribute the balance per stirpes to the beneficiary's descendants, or if none, to our descendants.
</div>

<div class="page-break"></div>

<!-- ARTICLE THIRTEEN: RETIREMENT PLANS AND LIFE INSURANCE -->
<div class="article-title">ARTICLE THIRTEEN<br/>RETIREMENT PLANS AND LIFE INSURANCE POLICIES</div>

<div class="section-title">13.01 Retirement Plans</div>
<div class="paragraph">
The Trustee may exercise the right to determine the manner and timing of qualified retirement plan benefit payments consistent with federal income tax rules regarding required minimum distributions under Internal Revenue Code Section 401(a)(9).
</div>

<div class="paragraph">
If the Survivor's Trust becomes the beneficiary of death benefits under any qualified retirement plan, each year the Trustee shall withdraw at least the minimum distribution required under Internal Revenue Code Section 401(a)(9) and immediately distribute all amounts withdrawn to the surviving Grantor.
</div>

<div class="section-title">13.02 Life Insurance Policies</div>
<div class="paragraph">
During our lives, each of us individually reserves all rights, powers, privileges, and options with respect to any insurance policy owned by or made payable to the trust.
</div>

<div class="paragraph">
After the death of a Grantor, the Trustee may make all appropriate elections with respect to these policies and may collect all sums made payable to the trust.
</div>

<div class="page-break"></div>

<!-- SUMMARY OF KEY ADMINISTRATIVE PROVISIONS -->
<div class="article-title">ARTICLE FOURTEEN<br/>TRUST ADMINISTRATION</div>

<div class="section-title">14.01 Distributions to Beneficiaries</div>
<div class="paragraph">
The Trustee may make cash distributions, in-kind distributions, or distributions partly in each, in proportions and at values determined by the Trustee without the consent of any beneficiary.
</div>

<div class="section-title">14.02 No Bond Required</div>
<div class="paragraph">
The Trustee is not required to furnish any bond for the faithful performance of the Trustee's duties unless required by a court of competent jurisdiction.
</div>

<div class="section-title">14.03 Trustee Compensation</div>
<div class="paragraph">
During any period we or each of us are serving as Trustee, we will receive no fee in connection with our service as Trustee. Any other individual serving as Trustee is entitled to fair and reasonable compensation for services provided as a fiduciary.
</div>

<div class="section-title">14.04 Trust Accounting</div>
<div class="paragraph">
During our lifetimes, as long as at least one of us is serving as Trustee, the Trustee is not required to provide an accounting to any person. After the death of the first of us to die, the Trustee must provide an annual accounting to the Qualified Beneficiaries unless waived.
</div>

<div class="page-break"></div>

<!-- ARTICLE FIFTEEN: TRUSTEE POWERS (Summary) -->
<div class="article-title">ARTICLE FIFTEEN<br/>THE TRUSTEE'S POWERS</div>

<div class="section-title">15.01 General Powers</div>
<div class="paragraph">
The Trustee has all powers necessary to manage and protect the trust property, including but not limited to:
</div>

<div class="list-item">(a) To invest and reinvest trust property in any type of property or investment;</div>
<div class="list-item">(b) To sell, exchange, lease, or otherwise dispose of trust property;</div>
<div class="list-item">(c) To borrow money and encumber trust property;</div>
<div class="list-item">(d) To manage real estate, including the power to lease, mortgage, and improve;</div>
<div class="list-item">(e) To vote shares of stock and exercise stockholder rights;</div>
<div class="list-item">(f) To conduct or participate in any business;</div>
<div class="list-item">(g) To employ and compensate agents, attorneys, accountants, and other professionals;</div>
<div class="list-item">(h) To make distributions in cash or in kind;</div>
<div class="list-item">(i) To hold property in nominee name or in any other form;</div>
<div class="list-item">(j) To compromise claims and settle disputes;</div>
<div class="list-item">(k) To make loans to beneficiaries;</div>
<div class="list-item">(l) To deal with digital assets and online accounts;</div>
<div class="list-item">(m) To take any action with respect to environmental matters;</div>
<div class="list-item">(n) To allocate receipts and expenditures between income and principal.</div>

<div class="section-title">15.02 Investment Powers</div>
<div class="paragraph">
The Trustee may invest in any type of investment that the Trustee determines is consistent with the investment goals of the trust, taking into account the overall investment portfolio, the potential return, tax consequences, and the trust's need for liquidity.
</div>

<div class="section-title">15.03 Real Estate Powers</div>
<div class="paragraph">
The Trustee may sell, convey, purchase, exchange, lease, mortgage, manage, alter, improve, and in general deal in and with real property in the manner and on the terms the Trustee deems appropriate.
</div>

<div class="page-break"></div>

<!-- ARTICLE SIXTEEN: GENERAL PROVISIONS -->
<div class="article-title">ARTICLE SIXTEEN<br/>GENERAL PROVISIONS</div>

<div class="section-title">16.01 Spendthrift Provision</div>
<div class="paragraph">
No beneficiary may assign, anticipate, encumber, alienate, or otherwise voluntarily transfer the income or principal of any trust created under this trust. Neither the income nor the principal is subject to attachment, bankruptcy proceedings, creditors' claims, or any involuntary transfer.
</div>

<div class="section-title">16.02 Contest Provision</div>
<div class="paragraph">
If any person attempts to contest or oppose the validity of this trust or commences legal proceedings to set this trust aside, then that person will forfeit his or her share and will be considered to have predeceased the last of us to die for purposes of this instrument.
</div>

<div class="section-title">16.03 Survivorship Presumption</div>
<div class="paragraph">
If we die under circumstances in which the order of our deaths cannot be established, {{SPOUSE_NAME}} will be considered to have survived {{CLIENT_NAME}}.
</div>

<div class="paragraph">
If any other beneficiary is living at the death of a Grantor but dies within 120 hours after the Grantor's death, the beneficiary will be considered to have predeceased the Grantor for purposes of this trust.
</div>

<div class="section-title">16.04 Governing Law</div>
<div class="paragraph">
This trust is governed, construed, and administered according to the laws of California.
</div>

<div class="section-title">16.05 Definitions</div>
<div class="paragraph">
<strong>Children and Descendants:</strong> Include persons legally adopted before reaching 18 years of age.
</div>

<div class="paragraph">
<strong>Incapacitated:</strong> A person is considered incapacitated when two licensed physicians give the opinion that the individual is unable to effectively manage his or her property or financial affairs.
</div>

<div class="paragraph">
<strong>Per Stirpes:</strong> Whenever a distribution is to be made to a person's descendants per stirpes, the distribution will be divided into as many equal shares as there are living children and deceased children who left living descendants.
</div>

<div class="page-break"></div>

<!-- SCHEDULE OF ASSETS -->
<div class="schedule">
  <div class="article-title">SCHEDULE A<br/>INITIAL TRUST ASSETS</div>

  <div class="paragraph">
  The following assets are initially transferred to The {{CLIENT_NAME}} and {{SPOUSE_NAME}} Living Trust:
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
      <td>Other Assets:</td>
      <td>$______________</td>
    </tr>
  </table>

  <div class="paragraph">
  Additional assets may be added to this trust at any time by transferring title to the Trustees or by executing a written assignment.
  </div>
</div>

<div class="page-break"></div>

<!-- SIGNATURE SECTION -->
<div class="signature-block">
  <div class="paragraph">
  IN WITNESS WHEREOF, we have executed this trust document on {{CURRENT_DATE}}.
  </div>

  <div style="margin-top: 0.5in;">
    <div><span class="signature-line"></span></div>
    <div>{{CLIENT_NAME}}, Grantor and Trustee</div>
  </div>

  <div style="margin-top: 0.5in;">
    <div><span class="signature-line"></span></div>
    <div>{{SPOUSE_NAME}}, Grantor and Trustee</div>
  </div>
</div>

<!-- NOTARY SECTION FOR CLIENT -->
<div class="notary-section">
  <div style="font-weight: bold; text-align: center; margin-bottom: 0.2in;">
    ACKNOWLEDGMENT
  </div>

  <div class="paragraph" style="text-indent: 0;">
  State of California<br/>
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

<div class="page-break"></div>

<!-- NOTARY SECTION FOR SPOUSE -->
<div class="notary-section">
  <div style="font-weight: bold; text-align: center; margin-bottom: 0.2in;">
    ACKNOWLEDGMENT
  </div>

  <div class="paragraph" style="text-indent: 0;">
  State of California<br/>
  County of {{SPOUSE_COUNTY}}
  </div>

  <div class="paragraph" style="text-indent: 0; margin-top: 0.2in;">
  On <span class="signature-line"></span> before me, <span class="signature-line"></span>,
  Notary Public, personally appeared {{SPOUSE_NAME}}, who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to the within instrument and acknowledged to me that he/she executed the same in his/her authorized capacity, and that by his/her signature on the instrument the person, or the entity upon behalf of which the person acted, executed the instrument.
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

export default jointLivingTrustTemplate;
