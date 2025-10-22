/**
 * Single Irrevocable Trust Template
 * California Law - Irrevocable Trust for Individual Grantor
 */

export const singleIrrevocableTrustTemplate = `
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
      margin-top: 2in;
    }
    .title {
      font-size: 16pt;
      font-weight: bold;
      margin: 20px 0;
    }
    .subtitle {
      font-size: 12pt;
      margin: 10px 0;
    }
    .law-firm {
      font-size: 11pt;
      margin: 10px 0;
      line-height: 1.4;
    }
    h1 {
      font-size: 12pt;
      font-weight: bold;
      text-align: center;
      margin: 20px 0;
    }
    h2 {
      font-size: 11pt;
      font-weight: bold;
      margin: 15px 0 5px 0;
    }
    h3 {
      font-size: 11pt;
      font-weight: bold;
      margin: 10px 0 5px 0;
    }
    p {
      margin: 5px 0;
      text-align: justify;
      text-indent: 0.5in;
    }
    .no-indent {
      text-indent: 0;
    }
    .signature-block {
      margin-top: 30px;
      page-break-inside: avoid;
    }
    .notary-block {
      margin-top: 20px;
      page-break-inside: avoid;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 10px 0;
    }
    td {
      padding: 5px;
      border: 1px solid #000;
    }
  </style>
</head>
<body>

<!-- Title Page -->
<div class="title-page">
  <div class="title">{{TRUST_NAME}}</div>
  <div class="subtitle">IRREVOCABLE TRUST AGREEMENT</div>
  <div class="law-firm">
    LAW OFFICES OF ROZSA GYENE, PC<br/>
    450 N BRAND BLVD. SUITE 623<br/>
    GLENDALE, CALIFORNIA 91203
  </div>
</div>

<!-- Main Content -->
<div style="page-break-before: always;"></div>

<h1>Article One: Establishing the Trust</h1>

<p>The date of this Irrevocable Trust Agreement is {{TRUST_DATE_FORMATTED}}. The parties to the agreement are {{CLIENT_FULL_NAME}} ("Grantor"), and {{TRUSTEE_NAME}} (the "Trustee").</p>

<p>I intend that this agreement create a valid trust under the laws of California and under the laws of any state in which any trust created under this agreement is administered. The terms of this trust agreement prevail over any provision of California law, except those provisions that are mandatory and may not be waived.</p>

<p>I may not serve as Trustee of any trust created under this agreement at any time.</p>

<h2>Section 1.01      Identifying the Trust</h2>

<p>The Trust may be referred to as {{TRUSTEE_NAME}}, Trustee of {{TRUST_NAME}}, dated {{TRUST_DATE_FORMATTED}}. For the purpose of transferring property to the trust, or identifying the trust in any beneficiary or death designation, any description referring to the trust will be effective if it identifies the trust. Any description that contains the date of the trust, the name of at least one initial Trustee and an indication that the Trustee is holding the trust property in a fiduciary capacity is sufficient to reasonably identify the trust.</p>

<h2>Section 1.02      Reliance by Third Parties</h2>

<p>From time to time, third parties may require documentation to verify the existence of this agreement, or particular provisions of it, such as the name or names of the Trustee or the powers held by the Trustee. To protect the confidentiality of this agreement, the Trustee may use an affidavit or certification of the trust that identifies the Trustee and sets forth the authority of the Trustee to transact business on behalf of the trust in lieu of providing a copy of this agreement. The affidavit or certification may include pertinent pages from this agreement, such as title or signature pages.</p>

<p>A third party may rely upon an affidavit or certification of trust that is signed by the Trustee with respect to the representations contained in the affidavit or certification of trust. A third party relying upon an affidavit or certification of trust shall be exonerated from any liability for actions the third party takes or fails to take in reliance upon the representations contained in the affidavit or certification of trust.</p>

<p>A third party dealing with the Trustee shall not be required to inquire into the terms of this agreement or the authority of the Trustee or to see to the application of funds or other property received by the Trustee.</p>

<p>The receipt from the Trustee for any money or property paid, transferred or delivered to the Trustee will be a sufficient discharge to the person or persons paying, transferring or delivering the money or property from all liability in connection with its application. A written statement by the Trustee is conclusive evidence of the Trustee's authority. Third parties are not liable for any loss resulting from their reliance on a written statement by the Trustee asserting the Trustee's authority or seeking to effectuate a transfer of property to or from the trust.</p>

<h2>Section 1.03      An Irrevocable Trust</h2>

<p>This Trust is irrevocable, and I cannot alter, amend, revoke, or terminate it in any way, except as outlined below. Under Probate Code Section 15404, if the Grantor and all the beneficiaries of this trust consent, they may compel the modification or termination of this trust under Probate Code Section 15404 and no petition to the court is required.</p>

<p>The Grantor retains no beneficial interest in this trust. The Grantor is not a beneficiary and has no right to receive income or principal, to occupy or use trust property (including any residential real property held by the trust), or to direct distributions. The Grantor has no present or future interest in the trust property.</p>

<h2>Section 1.04      Transfers to the Trust</h2>

<p>I transfer to the Trustee the property listed in Schedule A, attached to this agreement, to be held on the terms and conditions set forth in this instrument. I retain no right, title or interest in the income or principal of this trust or any other incident of ownership in any trust property.</p>

<p>By execution of this agreement, the Trustee accepts and agrees to hold the trust property described on Schedule A. All property transferred to the trust after the date of this agreement must be acceptable to the Trustee. The Trustee may refuse to accept any property. The Trustee shall hold, administer and dispose of all trust property accepted by the Trustee for the benefit of the beneficiaries in accordance with the terms of this agreement.</p>

<h2>Section 1.05      Statement of My Intent</h2>

<p>I am creating this trust with the intent that assets transferred to the trust be held for the benefit of my trust beneficiaries on the terms and conditions set forth in this agreement. In order to maximize the benefit to my trust beneficiaries, I give the Trustee broad discretion with respect to the management, distribution and investment of assets in my trust. My specific objectives in creating this trust include, but are not limited to:</p>

<p>Any gift made to the trust be treated as a completed gift for federal estate and gift tax purposes;</p>

<p>The assets of the trust estate be excluded for federal estate tax purposes from my gross estate and the gross estates of my trust beneficiaries except to the extent that the grant or exercise of a power of appointment is treated as a general power of appointment;</p>

<p>The assets in this trust not be subject to the claims of my creditors and any beneficiary's creditors; and</p>

<p>Any transfer of real property to this trust qualify for the parent-child exclusion from reassessment under California Revenue and Taxation Code § 63.1.</p>

<p>All provisions of this agreement are to be construed to accomplish these objectives. Any beneficiary has the right at any time to release, renounce or disclaim any right, power or interest that might be construed or deemed to defeat these objectives.</p>

<h2>Section 1.06      Not a Grantor Trust</h2>

<p>I intend that I not be taxed as owner of any portion of this trust for federal income tax purposes. All provisions of this trust agreement are to be construed consistent with this intent.</p>

<h3>(a)    Transactions for Less than Adequate Consideration</h3>

<p>No one may buy, exchange, or otherwise deal with any trust income or principal for less than full and adequate consideration in money or money's worth.</p>

<h3>(b)    No Power to Borrow without Adequate Interest or Security</h3>

<p>Notwithstanding any other provision of this trust that may seem to the contrary, neither I nor any Trustee nor any entity in which I have a substantial interest may borrow from any trust created under this agreement, either directly or indirectly, without adequate interest or security. Any loan made to me must be made as exclusively determined by an Independent Trustee.</p>

<h3>(c)    Specific Administrative Powers Exercisable Only in Fiduciary Capacity</h3>

<p>If any trust created under this agreement includes corporate shares or other securities in which the holdings of the Grantor and the trust are significant from the viewpoint of voting control, only an Independent Trustee may vote or direct the voting of those corporate shares or other securities. Further, if the trust funds or assets include stocks or securities of entities in which the holdings of the Grantor and the trust are significant from the viewpoint of voting control, only an Independent Trustee—by direction or by veto—may control the investments or reinvestments of the trust.</p>

<p>No one may compel the Trustee to exchange trust property by substituting other property of equivalent value. The Trustee is not required to surrender any trust assets if substitute assets are offered, regardless of the relative value of the assets.</p>

<h3>(d)    No Payment of Life Insurance Premiums from Trust Income</h3>

<p>The Trustee may not use the income of this trust to pay the premiums on any life insurance policies insuring my life. The Trustee may use other assets of the trust to pay such premiums.</p>

<h2>Section 1.07      Property Tax Exclusion Filing</h2>

<p>Within three years of any real property transfer to this trust, or such other time period as may be required by law, the Trustee shall file Form BOE-58-AH (Claim for Reassessment Exclusion for Transfer Between Parent and Child) with the applicable county assessor's office to claim the parent-child exclusion under Revenue and Taxation Code § 63.1.</p>

<p>The Trustee shall provide all necessary documentation to demonstrate that:</p>

<p>The transfer is from parent to child (through the trust mechanism);</p>
<p>The transferor (Grantor) is not a beneficiary of the trust;</p>
<p>The trust is irrevocable; and</p>
<p>All other requirements of Revenue and Taxation Code § 63.1 are satisfied.</p>

<p>The Trustee may consult with qualified tax professionals or legal counsel to ensure proper compliance with all California property tax exclusion requirements.</p>

<h1>Article Two: Children</h1>

{{#IF_HAS_CHILDREN}}
<p class="no-indent">We have {{CHILDREN.length}} child{{#IF_MULTIPLE_CHILDREN}}ren{{/IF_MULTIPLE_CHILDREN}}. {{#IF_MULTIPLE_CHILDREN}}They are{{/IF_MULTIPLE_CHILDREN}}{{#IF_SINGLE_CHILD}}My child is{{/IF_SINGLE_CHILD}}:</p>

{{#EACH_CHILDREN}}
<p class="no-indent">{{CHILD_FULL_NAME}}, born on {{CHILD_DOB_FORMATTED}};</p>
{{/EACH_CHILDREN}}
{{/IF_HAS_CHILDREN}}

{{#IF_NO_CHILDREN}}
<p>I have no children.</p>
{{/IF_NO_CHILDREN}}

<h1>Article Three: Trustee Succession Provisions</h1>

<h2>Section 3.01      Resignation of a Trustee</h2>

<p>A Trustee may resign by submitting a written notice of resignation. If I am incapacitated or deceased, a resigning Trustee shall give written notice to the Income Beneficiaries of the trust and to any other then-serving Trustee.</p>

<h2>Section 3.02      Trustee Succession</h2>

<p>This Section governs the removal and replacement of the Trustees.</p>

<h3>(a)    Appointment of Successor Trustees</h3>

<p>If {{TRUSTEE_NAME}} ceases to serve I name the following, in the order named, to serve as successor Trustee:</p>

{{#EACH_SUCCESSOR_TRUSTEES}}
<p class="no-indent">{{SUCCESSOR_TRUSTEE_NAME}}</p>
{{/EACH_SUCCESSOR_TRUSTEES}}

<h3>(b)    Removal by Beneficiaries</h3>

<p>A Trustee may be removed only for cause, which removal must be approved by a court of competent jurisdiction upon the petition of any beneficiary.</p>

<p>In no event is the court petitioned to approve the removal of a Trustee to acquire any jurisdiction over the trust except to the extent necessary to approve or disapprove removal of a Trustee.</p>

<p>If a beneficiary is a minor or is incapacitated, the beneficiary's parent or Legal Representative, other than me, may act on behalf of the beneficiary.</p>

<h3>(c)    Default of Designation</h3>

<p>If the office of Trustee of a trust created under this agreement is vacant and no designated Trustee is able and willing to act, the Primary Beneficiary may appoint an individual or corporate fiduciary to serve as successor Trustee. In the case of a minor or incapacitated beneficiary, the beneficiary's parent or Legal Representative, other than me, may act on behalf of the beneficiary.</p>

<p>Any beneficiary or the beneficiary's Legal Representative may petition a court of competent jurisdiction to appoint a successor Trustee to fill any vacancy remaining unfilled after a period of 30 days. By making the appointment, the court does not thereby acquire any jurisdiction over the trust, except to the extent necessary for making the appointment.</p>

<p>I may not serve as Trustee of any trust created under this agreement at any time.</p>

<h2>Section 3.03      Notice of Removal and Appointment</h2>

<p>Notice of removal must be in writing and delivered to the Trustee being removed, along with any other then-serving Trustees. The notice of removal will be effective in accordance with its provisions.</p>

<p>Notice of appointment must also be in writing and delivered to the successor Trustee and any other then-serving Trustees. The appointment will become effective at the time of acceptance by the successor Trustee. A copy of the notice should be attached to this agreement.</p>

<h2>Section 3.04      Appointment of a Cotrustee</h2>

<p>Any individual Trustee may appoint an individual or a corporate fiduciary as a Cotrustee. That Cotrustee will serve only as long as the Trustee who appointed the Cotrustee (or, if the Cotrustee was named by more than one Trustee acting together, by the last to serve of those Trustees) serves, and the Cotrustee will not become a successor Trustee upon the death, resignation, or incapacity of the Trustee who appointed the Cotrustee, unless so appointed under the terms of this agreement. Although the Cotrustee may exercise all the powers of the appointing Trustee, the combined powers of the Cotrustee and the appointing Trustee cannot exceed the powers of the appointing Trustee alone. The Trustee appointing a Cotrustee may revoke the appointment at any time with or without cause.</p>

<h1>Article Four: Administration of Trust Property - Distribution for Our Beneficiaries</h1>

<p>Upon the death of the Grantor, the Trustee shall administer and distribute my remaining trust property.</p>

<h2>Section 4.01      Specific Property Distributions</h2>

{{#IF_HAS_SPECIFIC_DISTRIBUTIONS}}
<p>Before making any other distributions, the Trustee shall distribute the following specific property to the named beneficiaries:</p>

{{#EACH_SPECIFIC_DISTRIBUTIONS}}
<h3>Distribution to {{BENEFICIARY_NAME}}</h3>

<p><b>Property Description:</b> {{DESCRIPTION}}</p>

{{#IF_OUTRIGHT}}
<p>The Trustee shall distribute this property to {{BENEFICIARY_NAME}} outright and free of trust.</p>
{{/IF_OUTRIGHT}}

{{#IF_AGE_BASED}}
<p>The Trustee shall distribute this property to {{BENEFICIARY_NAME}} in the following installments:</p>

{{#EACH_AGE_DISTRIBUTIONS}}
<p class="no-indent">{{PERCENTAGE}}% when {{BENEFICIARY_NAME}} reaches age {{AGE}}</p>
{{/EACH_AGE_DISTRIBUTIONS}}

<p>Until distribution, the Trustee shall hold the property in trust and may distribute income and principal for {{BENEFICIARY_NAME}}'s health, education, maintenance and support.</p>
{{/IF_AGE_BASED}}

{{#IF_GUARDIAN}}
<p>The Trustee shall hold this property in trust for {{BENEFICIARY_NAME}} until {{BENEFICIARY_NAME}} reaches age 25. The Trustee may distribute income and principal for {{BENEFICIARY_NAME}}'s health, education, maintenance and support.</p>
{{/IF_GUARDIAN}}

<p>If {{BENEFICIARY_NAME}} does not survive me, this gift shall lapse and be distributed to {{LAPSE_TO}}.</p>

{{/EACH_SPECIFIC_DISTRIBUTIONS}}
{{/IF_HAS_SPECIFIC_DISTRIBUTIONS}}

{{#IF_NO_SPECIFIC_DISTRIBUTIONS}}
<p>I am not making any specific property distributions.</p>
{{/IF_NO_SPECIFIC_DISTRIBUTIONS}}

<h2>Section 4.02      General Needs Trust</h2>

{{#IF_HAS_GENERAL_NEEDS_TRUST}}
<p>I direct the Trustee to establish a General Needs Trust for {{GENERAL_NEEDS_BENEFICIARY_NAME}}. This trust is intended to supplement, not replace, any government benefits for which {{GENERAL_NEEDS_BENEFICIARY_NAME}} may be eligible.</p>

<h3>(a)    Distributions from General Needs Trust</h3>

<p>The Trustee, in its sole discretion, may distribute income and principal from the General Needs Trust for the benefit of {{GENERAL_NEEDS_BENEFICIARY_NAME}} for any purpose the Trustee deems appropriate, including but not limited to:</p>

<p>Medical and dental expenses not covered by insurance or government benefits;</p>
<p>Rehabilitation services, therapies, and equipment;</p>
<p>Education, training, and vocational services;</p>
<p>Personal care attendants and companion services;</p>
<p>Transportation, including specially equipped vehicles;</p>
<p>Recreation, entertainment, and travel;</p>
<p>Home furnishings and personal effects; and</p>
<p>Any other goods or services that enhance {{GENERAL_NEEDS_BENEFICIARY_NAME}}'s quality of life.</p>

<h3>(b)    Protection of Government Benefits</h3>

<p>The Trustee shall not make any distribution that would disqualify {{GENERAL_NEEDS_BENEFICIARY_NAME}} from receiving government benefits, including but not limited to Supplemental Security Income (SSI) and Medi-Cal. The Trustee shall consult with qualified professionals regarding the impact of any proposed distribution on {{GENERAL_NEEDS_BENEFICIARY_NAME}}'s eligibility for government benefits.</p>

<h3>(c)    Special Provisions</h3>

{{#IF_GENERAL_NEEDS_SPECIAL_PROVISIONS}}
<p>{{GENERAL_NEEDS_SPECIAL_PROVISIONS}}</p>
{{/IF_GENERAL_NEEDS_SPECIAL_PROVISIONS}}

<h3>(d)    Termination of General Needs Trust</h3>

<p>Upon the death of {{GENERAL_NEEDS_BENEFICIARY_NAME}}, the Trustee shall first reimburse any state for medical assistance provided to {{GENERAL_NEEDS_BENEFICIARY_NAME}} under its Medicaid plan, to the extent required by law. The Trustee shall then distribute any remaining trust property as provided in Section 4.03.</p>

{{/IF_HAS_GENERAL_NEEDS_TRUST}}

{{#IF_NO_GENERAL_NEEDS_TRUST}}
<p>I am not establishing a General Needs Trust.</p>
{{/IF_NO_GENERAL_NEEDS_TRUST}}

<h2>Section 4.03      Division of Remaining Trust Property</h2>

<p>After making the specific property distributions set forth in Section 4.01 and funding any General Needs Trust set forth in Section 4.02, the Trustee shall divide my remaining trust property into shares as follows:</p>

<table>
<tr>
<td><b>Name</b></td>
<td><b>Relationship</b></td>
<td><b>Share</b></td>
</tr>
{{#EACH_RESIDUARY_BENEFICIARIES}}
<tr>
<td>{{NAME}}</td>
<td>Beneficiary</td>
<td>{{SHARE}}%</td>
</tr>
{{/EACH_RESIDUARY_BENEFICIARIES}}
</table>

<p>The Trustee shall administer the share of each beneficiary as provided in the Sections that follow.</p>

{{#EACH_RESIDUARY_BENEFICIARIES}}
<h2>Section 4.0{{INDEX_PLUS_4}}      Distribution of the Share for {{NAME}}</h2>

{{#IF_OUTRIGHT}}
<p>The Trustee shall distribute the share set aside for {{NAME}} to them outright and free of trust.</p>
{{/IF_OUTRIGHT}}

{{#IF_GUARDIAN}}
<p>The Trustee shall hold the share set aside for {{NAME}} in a separate trust. The Trustee may distribute to {{NAME}} as much of the net income and principal as the Trustee determines is necessary or advisable for {{NAME}}'s health, education, maintenance and support. Any undistributed net income will be accumulated and added to principal.</p>

<p>When {{NAME}} reaches age 25, the Trustee shall distribute the remaining trust property to {{NAME}} outright and free of trust.</p>
{{/IF_GUARDIAN}}

<p>If {{NAME}} is deceased, the Trustee shall distribute {{NAME}}'s share to {{NAME}}'s descendants, per stirpes. If {{NAME}} has no then-living descendants, the Trustee shall distribute {{NAME}}'s share under the terms of Article Five.</p>

{{/EACH_RESIDUARY_BENEFICIARIES}}

<h1>Article Five: Remote Contingent Distribution</h1>

<p>If at any time no person or entity is qualified to receive final distribution of any part of my trust estate, this portion of my trust estate must be distributed to those persons who would inherit it had I then died intestate owning the property, as determined and in the proportions provided by the laws of California then in effect.</p>

<!-- Continue with remaining articles from original template... -->
<!-- Articles Six through Nine remain the same -->

<h1>Article Six: Distributions to Underage and Incapacitated Beneficiaries</h1>

<h2>Section 6.01      Methods of Distribution</h2>

<p>If the Trustee is authorized or directed under any provision of this trust to distribute net income or principal to a person who has not yet reached 18 years of age or who is incapacitated as defined in Section 9.04(f), the Trustee may make the distribution by any one or more of the methods described in this Section. Alternatively, the Trustee may retain the trust property in a separate trust to be administered by the Trustee under Section 6.02.</p>

<p>I request that before making a distribution to a beneficiary, the Trustee consider, to the extent reasonable, the ability the beneficiary has demonstrated in managing prior distributions of trust property.</p>

<p>The Trustee may distribute trust property for any beneficiary's benefit, subject to the provisions of this Article in any one or more of the following methods:</p>

<p>The Trustee may distribute trust property directly to the beneficiary.</p>

<p>The Trustee may distribute trust property to the beneficiary's guardian, conservator, parent, other family member, or any person who has assumed the responsibility of caring for the beneficiary.</p>

<p>The Trustee may distribute trust property to any person or entity, including the Trustee, as custodian for the beneficiary under the Uniform Transfers to Minors Act or similar statute.</p>

<p>The Trustee may distribute trust property to other persons and entities for the beneficiary's use and benefit.</p>

<p>The Trustee may distribute trust property to an agent or attorney in fact authorized to act for the beneficiary under a valid durable power of attorney executed by the beneficiary before becoming incapacitated.</p>

<h2>Section 6.02      Retention in Trust</h2>

<p>The Trustee may retain and administer trust property in a separate trust for any beneficiary's benefit, subject to the provisions of this Article as follows.</p>

<h3>(a)    Distribution of Net Income and Principal</h3>

<p>The Trustee, other than an Interested Trustee, may distribute to the beneficiary as much of the net income and principal of any trust created under this Section as the Trustee may determine advisable for any purpose. If there is no then-serving Trustee that is not an Interested Trustee, the Trustee shall distribute to the beneficiary as much of the net income and principal of the trust created under this Section as the Trustee determines is necessary or advisable for the beneficiary's health, education, maintenance and support. Any undistributed net income will be accumulated and added to principal.</p>

<h3>(b)    Right of Withdrawal</h3>

<p>When the beneficiary whose trust is created under this Section either reaches 18 years of age or is no longer incapacitated, the beneficiary may withdraw all or any portion of the accumulated net income and principal from the trust.</p>

<h3>(c)    Distribution upon the Death of the Beneficiary</h3>

<p>Subject to the terms of the next paragraph, the beneficiary whose trust is created under this Section may appoint all or any portion of the principal and undistributed net income remaining in the beneficiary's trust at the beneficiary's death among one or more persons or entities, and the creditors of the beneficiary's estate. The beneficiary has the exclusive right to exercise this general power of appointment.</p>

<p>The beneficiary may not exercise this power of appointment to appoint to the beneficiary, the beneficiary's estate, the beneficiary's creditors, or creditors of the beneficiary's estate from the limited share of the beneficiary's trust. For purposes of this power of appointment, the limited share of the beneficiary's trust is that portion of the beneficiary's trust that has an inclusion ratio for generation-skipping transfer tax purposes of zero or that without the exercise of the power of appointment, would not constitute a taxable generation-skipping transfer at the beneficiary's death. If the generation-skipping tax does not then apply, the limited share will be the beneficiary's entire trust.</p>

<p>If any part of the beneficiary's trust is not effectively appointed, the Trustee shall distribute the remaining unappointed balance per stirpes to the beneficiary's descendants. If the beneficiary has no then-living descendants, the Trustee shall distribute the unappointed balance per stirpes to the then-living descendants of the beneficiary's nearest lineal ancestor who was a descendant of mine or, if there is no then-living descendant, per stirpes to my descendants.</p>

<p>If I have no then-living descendants, the Trustee shall distribute the balance of the trust property as provided in Article Five.</p>

<h2>Section 6.03      Application of Article</h2>

<p>Any decision made by the Trustee under this Article is final, controlling, and binding upon all beneficiaries subject to the provisions of this Article.</p>

<h1>Article Seven: Trust Administration</h1>

<h2>Section 7.01      Distributions to Beneficiaries</h2>

<p>Whenever this trust authorizes or directs the Trustee to make a net income or principal distribution to a beneficiary, the Trustee may apply any property that otherwise could be distributed directly to the beneficiary for his or her benefit. The Trustee is not required to inquire into the beneficiary's ultimate disposition of the distributed property unless specifically directed otherwise by this trust.</p>

<p>The Trustee may make cash distributions, in-kind distributions, or distributions partly in each, in proportions and at values determined by the Trustee. The Trustee may allocate undivided interests in specific assets to a beneficiary or trust in any proportion or manner that the Trustee determines, even though the property allocated to one beneficiary may be different from that allocated to another beneficiary.</p>

<p>The Trustee may make these determinations without regard to the income tax attributes of the property and without the consent of any beneficiary.</p>

<h2>Section 7.02      Beneficiary's Status</h2>

<p>Until the Trustee receives notice of the incapacity, birth, marriage, death, or other event upon which a beneficiary's right to receive payments may depend, the Trustee will not be held liable for acting or not acting with respect to the event, or for disbursements made in good faith to persons whose interest may have been affected by the event. Unless otherwise provided in this trust, a parent or Legal Representative may act on behalf of a minor or incapacitated beneficiary.</p>

<p>The Trustee may rely on any information provided by a beneficiary with respect to the beneficiary's assets and income. The Trustee will have no independent duty to investigate the status of any beneficiary and will not incur any liability for not doing so.</p>

<h2>Section 7.03      No Court Proceedings</h2>

<p>The Trustee shall administer this trust with efficiency, with attention to the provisions of this trust, and with freedom from judicial intervention. If the Trustee or another interested party institutes a legal proceeding, the court will acquire jurisdiction only to the extent necessary for that proceeding. Any proceeding to seek instructions or a court determination may only be initiated in the court with original jurisdiction over matters relating to the construction and administration of trusts. Seeking instructions or a court determination is not to be construed as subjecting this trust to the court's continuing jurisdiction.</p>

<h2>Section 7.04      No Bond</h2>

<p>The Trustee is not required to furnish any bond for the faithful performance of the Trustee's duties unless required by a court of competent jurisdiction, and only if the court finds that a bond is needed to protect the beneficiaries' interests. No surety will be required on any bond required by any law or court rule, unless the court specifies its necessity.</p>

<h2>Section 7.05      Exoneration of the Trustee</h2>

<p>No successor Trustee is obligated to examine the accounts, records, or actions of any previous Trustee. No successor Trustee may be held responsible for any act, omission, or forbearance by any previous Trustee.</p>

<p>Any Trustee may obtain written agreements from the beneficiaries or their Legal Representatives releasing and indemnifying the Trustee from any liability that may have arisen from the Trustee's acts, omissions, or forbearances. If acquired from all the trust's living beneficiaries or their Legal Representatives, any agreement is conclusive and binding on all parties, born or unborn, who may have or who may later acquire an interest in the trust. The Trustee may require a refunding agreement before making any distribution or allocation of trust income or principal, and may withhold distribution or allocation pending determination or release of a tax or other lien.</p>

<h2>Section 7.06      Limitations on Trustee Liability</h2>

<p>I recognize that some individuals and institutions may be reluctant to serve as Trustee because of a concern about potential liability. Therefore, I direct that any individual or corporate fiduciary that serves as the Trustee will not incur any liability by reason of any error of judgment, mistake of law, or action or inaction of any kind in connection with the administration of any trust created under this trust, unless the Trustee's decision is shown by clear and convincing evidence to have been made in bad faith.</p>

<p>Any individual or corporate fiduciary currently serving as the Trustee may expend any portion of the trust assets to defend any claim brought against the Trustee, even if the Trustee's defense costs would exhaust the trust's value, unless the Trustee is shown to have acted in bad faith by clear and convincing evidence.</p>

<p>Any individual or corporate fiduciary that formerly served as the Trustee is entitled to reimbursement from the trust estate for any expenses, including attorney's fees and litigation costs reasonably incurred to defend any claim brought against the Trustee even if the Trustee's defense costs would exhaust the trust's value, unless the Trustee is shown to have acted in bad faith by clear and convincing evidence.</p>

<h2>Section 7.07      Trustee Compensation</h2>

<p>An individual serving as Trustee is entitled to fair and reasonable compensation for the services provided as a fiduciary. A corporate fiduciary serving as Trustee will be compensated by agreement between an individual serving as Trustee and the corporate fiduciary. In the absence of an individual Trustee or an agreement, a corporate fiduciary will be compensated in accordance with the corporate fiduciary's current published fee schedule. Any Trustee serving as a Trustee under this agreement may from time to time waive all or any amount of compensation in that Trustee's discretion.</p>

<p>A Trustee may charge additional fees for services provided that are beyond the ordinary scope of duties, such as fees for legal services, tax return preparation, and corporate finance or investment banking services.</p>

<p>In addition to receiving compensation, a Trustee may be reimbursed for reasonable costs and expenses incurred in carrying out the Trustee's duties under this trust.</p>

<h2>Section 7.08      Employment of Professionals</h2>

<p>The Trustee may appoint, employ, and remove investment advisors, accountants, auditors, depositories, custodians, brokers, consultants, attorneys, advisors, agents, and employees to advise or assist in the performance of the Trustee's duties. The Trustee may act on the recommendations of the persons or entities employed, with or without independent investigation.</p>

<p>The Trustee may reasonably compensate an individual or entity employed to assist or advise the Trustee, regardless of any other relationship existing between the individual or entity and the Trustee.</p>

<p>The Trustee may compensate providers of contracted services at the usual rate out of the trust's income or principal, as the Trustee deems advisable. The Trustee may compensate an individual or entity employed to assist or advise the Trustee without diminishing the compensation the Trustee is entitled to under this trust. A Trustee who is a partner, stockholder, officer, director, or corporate affiliate in any entity employed to assist or advise the Trustee may still receive the Trustee's share of the compensation paid to the entity.</p>

<h2>Section 7.09      Exercise of Testamentary Power of Appointment</h2>

<p>A testamentary power of appointment granted under this trust may be exercised by a will, living trust or other written instrument specifically referring to the power of appointment. The holder of a testamentary power of appointment may exercise the power to appoint property among the permissible appointees in equal or unequal proportions, and may designate the terms and conditions, whether outright or in trust. The holder of a testamentary power of appointment may grant further powers of appointment to any person to whom principal may be appointed, including a presently exercisable limited or general power of appointment. The Trustee may conclusively presume that any power of appointment granted to any beneficiary of a trust created under this trust has not been exercised by the beneficiary if the Trustee has no knowledge of the existence of a will, living trust or other written instrument exercising the power within three months after the beneficiary's death.</p>

<h2>Section 7.10      Determination of Principal and Income</h2>

<p>The Trustee shall determine how all Trustee fees, disbursements, receipts, and wasting assets will be credited, charged, and apportioned between principal and income in a fair, equitable, and practical manner.</p>

<p>The Trustee may set aside from trust income reasonable reserves for taxes, assessments, insurance premiums, repairs, depreciation, obsolescence, depletion, and the equalization of payments to or for the beneficiaries. The Trustee may select appropriate accounting periods for the trust property.</p>

<h2>Section 7.11      Trust Accounting</h2>

<p>Except to the extent required by law, the Trustee is not required to file accountings in any jurisdiction. The annual accounting must include the receipts, expenditures, and distributions of income and principal and the assets on hand for the accounting period. A copy of the federal fiduciary tax return filed for a trust during the accounting will satisfy this reporting requirement.</p>

<p>In the absence of fraud or obvious error, assent by all Qualified Beneficiaries to a Trustee's accounting will make the matters disclosed in the accounting binding and conclusive upon all persons, including those living on this date and those born in the future who have or will have a vested or contingent interest in the trust property. In the case of a Qualified Beneficiary who is a minor or incapacitated, the beneficiary's natural guardian or Legal Representative may give the assent required under this Section.</p>

<p>In all events, a beneficiary's Legal Representative may receive any notices and take any action on behalf of the beneficiary as to an accounting. If any beneficiary's Legal Representative fails to object to any accounting in writing within 180 days after the Trustee provides the accounting, the beneficiary's Legal Representative will be considered to assent to the accounting.</p>

<h2>Section 7.12      Information to Beneficiaries</h2>

<p>Privacy is an important issue to me. This Section defines the Trustee's duties to inform, account, and report to beneficiaries of various trusts created under this trust, and to other individuals during my lifetime and after my death. Except to the extent required by law, the Trustee is not required to comply with a request to furnish a copy of this trust to a Qualified Beneficiary at any time, and the Trustee is not required to send annual reports or reports upon termination of the trust to any Permissible Distributee or Qualified Beneficiary who requests the report. If the Trustee decides, in the Trustee's sole and absolute discretion, to provide any information to a Permissible Distributee or Qualified Beneficiary, the Trustee may exclude any information that the Trustee determines is not directly applicable to the beneficiary receiving the information. Any decision by the Trustee to make information available to any beneficiary does not constitute an obligation to provide any information to any beneficiary in the future.</p>

<h3>(a)    Providing Information while I Am Alive and Not Incapacitated</h3>

<p>I waive all duties of the Trustee to give notice, information, and reports to any Qualified Beneficiaries other than me while I am alive and able to effectively manage my financial resources. The Trustee is not required to keep Qualified Beneficiaries of any trust created under this trust other than me informed of the trust administration in any manner. Further, the Trustee is not required to respond to any request for information related to the trust administration from anyone who is not a Qualified Beneficiary, other than me.</p>

<h3>(b)    Providing Information If I Am Alive but Incapacitated, and after My Death</h3>

<p>During any period that I am alive but incapacitated and after my death, the Trustee shall deliver any notice, information, or reports which would otherwise be required to be delivered to me or to a Qualified Beneficiary to a person designated by the Trustee. To preserve my privacy and the privacy of Qualified Beneficiaries under the trust, while I am alive, I request that the Trustee not provide any copies of the trust or any other information that may otherwise be required to be distributed to any beneficiary under California law to any beneficiary to whom the information is not directly relevant. The designated person may, in his or her sole and absolute discretion and without waiver, distribute copies of all or any part of the trust or other relevant information about the trust to one or more Qualified Beneficiaries or other interested parties during any period that I am incapacitated.</p>

<h2>Section 7.13      Action of Trustees and Delegation of Trustee Authority</h2>

<p>If two Trustees are eligible to act with respect to a given matter, they must agree unanimously for action to be taken unless the express terms of the Trustees' appointment provide otherwise. If more than two Trustees are eligible to act with respect to a given matter, the Trustees must agree by majority for action to be taken.</p>

<p>A nonconcurring Trustee may dissent or abstain from a decision of the majority. A Trustee will be absolved from personal liability by registering the dissent or abstention in the trust records. After doing so, the dissenting Trustee must then act with the other Trustees in any way necessary or appropriate to effect the majority decision. Subject to the limitations set forth in Section 8.25, any Trustee may, by written instrument, delegate to any other Trustee the right to exercise any power, including a discretionary power, granted to the Trustee in this trust. During the time a delegation under this Section is in effect, the Trustee to whom the delegation is made may exercise the power to the same extent as if the delegating Trustee has personally joined in the exercise of the power. The delegating Trustee may revoke the delegation at any time by giving written notice to the Trustee to whom the power was delegated.</p>

<h2>Section 7.14      Trustee May Disclaim or Release Any Power</h2>

<p>Notwithstanding any provision of this trust to the contrary, any Trustee may relinquish any Trustee power in whole or in part, irrevocably or for any specified period of time, by a written instrument. The Trustee may relinquish a power personally or may relinquish the power for all subsequent Trustees.</p>

<h2>Section 7.15      Trustee May Execute a Power of Attorney</h2>

<p>The Trustee may appoint any individual or entity to serve as the Trustee's agent under a power of attorney to transact any business on behalf of the trust or any other trust created under this trust.</p>

<h2>Section 7.16      Additions to Separate Trusts</h2>

<p>If upon the termination of any trust created under this trust, a final distribution is to be made to a person who is the Primary Beneficiary of another trust established under this trust, and there is no specific indication whether the distribution is to be made in trust or outright, the Trustee shall make the distribution to the second trust instead of distributing the property to the beneficiary outright. For purposes of administration, the distribution will be treated as though it had been an original part of the second trust.</p>

<h2>Section 7.17      Authority to Merge or Sever Trusts</h2>

<p>The Trustee may merge a trust created under this trust with any other trust, if the two trusts contain substantially the same terms for the same beneficiaries and have at least one Trustee in common. The Trustee may administer the merged trust under the provisions of the instrument governing the other trust, and this trust will no longer exist if it merges into another trust. Accordingly, in the event another trust is merged into this trust or a trust created under the provisions of this trust document, the Trustee may shorten the period during which this trust subsists to comply with Section 9.01, if necessary, to effect the merger. But if a merger does not appear feasible, the Trustee may consolidate the trusts' assets for purposes of investment and trust administration while retaining separate records and accounts for each respective trust. The Trustee may sever any trust on a fractional basis into two or more separate and identical trusts, or may segregate a specific amount or asset from the trust property by allocating it to a separate account or trust. The separate trusts may be funded on a non pro rata basis, but the funding must be based on the assets' total fair market value on the funding date. After the segregation, income earned on a segregated amount or specific asset passes with the amount or asset segregated. The Trustee shall hold and administer each severed trust upon terms and conditions identical to those of the original trust.</p>

<p>Subject to the trust's terms, the Trustee may consider differences in federal tax attributes and other pertinent factors in administering the trust property of any separate account or trust, in making applicable tax elections and in making distributions. A separate trust created by severance must be treated as a separate trust for all purposes from the effective severance date; however, the effective severance date may be retroactive to a date before the Trustee exercises the power.</p>

<h2>Section 7.18      Authority to Terminate Trusts</h2>

<p>The Independent Trustee may terminate any trust created under this trust at any time, if the Independent Trustee, in its sole and absolute discretion, determines that administering a trust created under this trust is no longer economical. Once distributed, the Trustee will have no further responsibility with respect to that trust property. The Trustee will distribute the trust property from a terminated trust in this order:</p>

<p>to the beneficiaries then entitled to mandatory distributions of the trust's net income, in the same proportions; and then</p>

<p>if none of the beneficiaries are entitled to mandatory distributions of net income, to the beneficiaries then eligible to receive discretionary distributions of the trust's net income, in the amounts and shares the Independent Trustee determines.</p>

<h2>Section 7.19      Merger of Corporate Fiduciary</h2>

<p>If any corporate fiduciary acting as the Trustee under this trust is merged with or transfers substantially all of its trust assets to another corporation, or if a corporate fiduciary changes its name, the successor will automatically succeed to the trusteeship as if that successor had been originally named a Trustee. No document of acceptance of trusteeship will be required.</p>

<h2>Section 7.20      Funeral and Other Expenses of Beneficiary</h2>

<p>Upon the death of an Income Beneficiary, the Trustee may pay the funeral expenses, burial or cremation expenses, enforceable debts, or other expenses incurred due to the death of the beneficiary from trust property. This Section only applies to the extent the Income Beneficiary has not exercised any testamentary power of appointment granted to the beneficiary under this trust.</p>

<p>The Trustee may rely upon any request by the deceased beneficiary's Legal Representative or family members for payment without verifying the validity or the amounts and without being required to see to the application of the payment. The Trustee may make decisions under this Section without regard to any limitation on payment of expenses imposed by statute or court rule and without obtaining the approval of any court having jurisdiction over the administration of the deceased beneficiary's estate.</p>

<h1>Article Eight: The Trustee's Powers</h1>

<h2>Section 8.01      Introduction to Trustee's Powers</h2>

<p>Except as otherwise specifically provided in this trust, the Trustee may exercise the powers granted by this trust without prior approval from any court, including those powers set forth under the laws of the State of California or any other jurisdiction whose law applies to this trust. The powers set forth in the California Probate Code §§ 16200-16249 are specifically incorporated into this trust.</p>

<p>The Trustee shall exercise the Trustee powers in the manner the Trustee determines to be in the beneficiaries' best interests. The Trustee must not exercise any power inconsistent with the beneficiaries' right to the enjoyment of the trust property in accordance with the general principles of trust law.</p>

<p>The Trustee may have duties and responsibilities in addition to those described in this trust. I encourage any individual or corporate fiduciary serving as Trustee to obtain appropriate legal advice if the Trustee has any questions concerning the duties and responsibilities as Trustee.</p>

<h2>Section 8.02      Execution of Documents by the Trustee</h2>

<p>The Trustee may execute and deliver any written instruments that the Trustee considers necessary to carry out any powers granted in this trust.</p>

<h2>Section 8.03      Investment Powers in General</h2>

<p>The Trustee may invest in any type of investment that the Trustee determines is consistent with the investment goals of the trust, whether inside or outside the geographic borders of the United States of America and its possessions or territories, taking into account the overall investment portfolio of the trust.</p>

<p>I have provided that certain trust beneficiaries receive payments of periodic unitrust amounts. My intent is to allow the Trustee to invest trust assets for total return rather than solely for income. This will allow the Trustee to provide regular payments to current beneficiaries that will keep pace with inflation in future years, while providing for the remainder beneficiaries and preserving the value and purchasing power of their trust interest.</p>

<p>Without limiting the Trustee's investment authority in any way, I request that the Trustee exercise reasonable care and skill in selecting and retaining trust investments. I also request that the Trustee take into account the following factors in choosing investments:</p>

<p>the potential return from the investment, both in income and appreciation; the potential income tax consequences of the investment; the investment's potential for volatility; and the role the investment will play in the trust's portfolio.</p>

<p>I request that the Trustee also consider the possible effects of inflation or deflation, changes in global and US economic conditions, transaction expenses, and the trust's need for liquidity while arranging the trust's investment portfolio.</p>

<p>The Trustee may delegate his or her discretion to manage trust investments to any registered investment advisor or corporate fiduciary.</p>

<h2>Section 8.04      Banking Powers</h2>

<p>The Trustee may establish any type of bank account in any banking institutions that the Trustee chooses. If the Trustee makes frequent disbursements from an account, the account does not need to be interest bearing. The Trustee may authorize withdrawals from an account in any manner. The Trustee may open accounts in the name of the Trustee, with or without disclosing fiduciary capacity, and may open accounts in the name of the trust. When an account is in the name of the trust, checks on that account and authorized signatures need not disclose the account's fiduciary nature or refer to any trust or Trustee.</p>

<h2>Section 8.05      Business Powers</h2>

<p>If the trust owns or acquires an interest in a business entity, whether as a shareholder, partner, general partner, sole proprietor, member, participant in a joint venture, or otherwise, the Trustee may exercise the powers and authority provided for in this Section. The powers granted in this Section are in addition to all other powers granted to the Trustee in this trust.</p>

<p>The Trustee may act personally and independently with any business entity in which the trust has an interest, separate from any duties owed to the trust as the Trustee. This includes serving and receiving compensation for services as an officer, director, general partner, manager, or any other capacity for the business entity. The compensation the Trustee receives from this entity will not affect the compensation the Trustee may be entitled to for serving as the Trustee. The Trustee may exercise any voting power for any matter, whether the voting power is held as the Trustee or independently as a stockholder, officer, director, general partner, member, manager, or other capacity of the business entity. The Trustee may independently own, purchase, and sell an interest in a business entity owned by the trust. Any sale of a nonpublicly traded business interest between the Trustee and the trust must be approved and effected by an Independent Special Trustee.</p>

<h2>Section 8.06      Contract Powers</h2>

<p>The Trustee may sell at public or private sale, transfer, exchange for other property, and otherwise dispose of trust property for consideration and upon terms and conditions that the Trustee deems advisable. The Trustee may grant options of any duration for any sales, exchanges, or transfers of trust property.</p>

<p>The Trustee may enter into contracts, and may deliver deeds or other instruments, that the Trustee considers appropriate.</p>

<h2>Section 8.07      Common Investments</h2>

<p>For purposes of convenience with regard to the trust property's administration and investment, the Trustee may invest part or all of the trust property jointly with property of other trusts for which the Trustee is also serving as a Trustee. A corporate fiduciary acting as the Trustee may use common funds for investment. When trust property is managed and invested in this manner, the Trustee will maintain records that sufficiently identify this trust's portion of the jointly invested assets.</p>

<h2>Section 8.08      Digital Assets</h2>

<p>The Trustee has the authority to access, modify, control, archive, transfer, and delete my digital assets.</p>

<p>Digital assets include my sent and received emails, email accounts, digital music, digital photographs, digital videos, gaming accounts, software licenses, social-network accounts, file-sharing accounts, financial accounts, domain registrations, Domain Name System (DNS) service accounts, blogs, listservs, web-hosting accounts, tax-preparation service accounts, online stores and auction sites, online accounts, and any similar digital asset that currently exists or may be developed as technology advances.</p>

<p>My digital assets may be stored in the cloud or on my own digital devices. The Trustee may access, use, and control my digital devices in order to access, modify, control, archive, transfer, and delete my digital assets—this power is essential for access to my digital assets that are only accessible through my digital devices. Digital devices include desktops, laptops, tablets, peripherals, storage devices, mobile telephones, smartphones, and any similar hardware that currently exists or may be developed as technology advances.</p>

<h2>Section 8.09      Environmental Powers</h2>

<p>The Trustee may inspect trust property to determine compliance with or to respond to any environmental law affecting the property. For purposes of this trust, environmental law means any federal, state, or local law, rule, regulation, or ordinance protecting the environment or human health.</p>

<p>The Trustee may refuse to accept property if the Trustee determines that the property is or may be contaminated by any hazardous substance or is or was used for any purpose involving hazardous substances that could create liability to the trust or to any Trustee.</p>

<p>The Trustee may use trust property to:</p>

<p>conduct environmental assessments, audits, or site monitoring; take remedial action to contain, clean up, or remove any hazardous substance including a spill, discharge, or contamination; institute, contest, or settle legal proceedings brought by a private litigant or any local, state, or federal agency concerned with environmental compliance; comply with any order issued by any court or by any local, state, or federal agency directing an assessment, abatement, or cleanup of any hazardous substance; and employ agents, consultants, and legal counsel to assist the Trustee in these actions.</p>

<p>The Trustee is not liable for any loss or reduction in value sustained by the trust as a result of the Trustee's decision to retain property on which hazardous materials or substances requiring remedial action are discovered, unless the Trustee contributed to that loss through willful misconduct or gross negligence.</p>

<p>The Trustee is not liable to any beneficiary or to any other party for any decrease in the value of property as a result of the Trustee's actions to comply with any environmental law, including any reporting requirement.</p>

<p>The Trustee may release, relinquish, or disclaim any power held by the Trustee that the Trustee determines may cause the Trustee to incur individual liability under any environmental law.</p>

<h2>Section 8.10      Farming and Ranching Operations</h2>

<p>If the trust owns or acquires an interest in a farm, ranch, or other agricultural property or business, the Trustee may exercise the authority and discretion provided in this Section. The powers granted in this Section are in addition to all other powers granted to the Trustee in this trust.</p>

<h3>(a)    Authority to Operate the Farm or Ranch</h3>

<p>Notwithstanding any duty to diversify imposed by state law, the Trustee may retain and continue to operate a farm or ranch, even though the interest may constitute all or a substantial portion of the trust property.</p>

<p>The Trustee may take part in farm or ranch management, or hire a farm manager or a professional farm management service. The Trustee may delegate any of the powers authorized by this Section to a hired farm manager or professional farm management service.</p>

<p>The Trustee may purchase, sell, hold, manage, operate, lease, improve, and maintain the farm or ranch and any of its interests, and in general deal with all things necessary for operation as the Trustee deems advisable.</p>

<p>The Trustee may buy, sell, and raise livestock; plant, cultivate, harvest, and sell cash crops; produce timber or forest products for sale; or lease or rent all or part of the farm or ranch for cash or a crop share.</p>

<p>The Trustee may contract with hired labor, tenants, or sharecroppers. The Trustee may construct, repair, and improve farm buildings, fences, and other farm or ranch structures, including drainage facilities, wells, ponds, and lagoons. The Trustee may participate in cooperative agreements concerning water and ditch rights.</p>

<p>The Trustee may purchase or rent any kind of farm machinery, equipment, feed, and seed necessary to operate the farm or ranch. The Trustee may use approved soil conservation practices in order to conserve, improve, and maintain the soil's productivity. The Trustee may engage in timber or forest conservation practices.</p>

<p>The Trustee may engage in any farm program sponsored by any federal, state, or local governmental agency.</p>

<h3>(b)    Business Liabilities</h3>

<p>If any tort or contract liability arises in connection with the farm or ranch, and if the trust is liable, the Trustee will first satisfy the liability from the assets of the farm or ranch, and only then from other property.</p>

<h3>(c)    Trustee Compensation</h3>

<p>In addition to the compensation set forth in Section 7.07, the Trustee may receive additional reasonable compensation for services in connection with the operation of a farm or ranch. The Trustee may receive this compensation directly from the farm or ranch, the trust, or both.</p>

<h3>(d)    Conflicts of Interest</h3>

<p>The Trustee may exercise all of the powers granted in this trust, even though the Trustee may be involved with or have a personal interest in the farm or ranch.</p>

<h2>Section 8.11      Insurance Powers</h2>

<p>The Trustee may purchase, accept, hold, and deal with as owner, insurance policies on my life, any beneficiary's life, or any person's life in whom any beneficiary has an insurable interest.</p>

<p>The Trustee may purchase disability, medical, liability, longterm health care and other insurance on behalf of and for the benefit of any beneficiary. The Trustee may purchase annuities and similar investments for any beneficiary.</p>

<p>The Trustee may execute or cancel any automatic premium loan agreement with respect to any policy, and may elect or cancel any automatic premium loan provision in a life insurance policy. The Trustee may borrow money to pay premiums due on any policy, either by borrowing from the company issuing the policy or from another source. The Trustee may assign the policy as security for the loan.</p>

<p>The Trustee may exercise any option contained in a policy with regard to any dividend or share of surplus apportioned to the policy to reduce the amount of a policy, to convert or exchange the policy, or to surrender a policy at any time for its cash value.</p>

<p>The Trustee may elect any paid-up insurance or extended-term insurance nonforfeiture option contained in a policy. The Trustee may sell any policy at its fair market value to anyone having an insurable interest in the policy, including the insured.</p>

<p>The Trustee may exercise any other right, option, or benefit contained in a policy or permitted by the issuing insurance company.</p>

<p>Upon termination of the trust, the Trustee may transfer and assign the policies held by the trust as a distribution of trust property.</p>

<h2>Section 8.12      Loans and Borrowing Powers</h2>

<p>The Trustee may make loans to, or guarantee the borrowing of, any person including a beneficiary, as well as an entity, trust, or estate, for any term or payable on demand, and secured or unsecured. But the Trustee may only make loans to me with adequate interest and security.</p>

<p>The Trustee may encumber any trust property by mortgages, pledges, or otherwise, and may negotiate, refinance, or enter into any mortgage or other secured or unsecured financial arrangement, whether as a mortgagee or mortgagor. The term may extend beyond the trust's termination and beyond the period required for an interest created under this trust to vest in order to be valid under the rule against perpetuities.</p>

<p>The Trustee may borrow money at interest rates and on other terms that the Trustee deems advisable from any person, institution, or other source including, in the case of a corporate fiduciary, its own banking or commercial lending department.</p>

<p>The Trustee may purchase, sell at public or private sale, trade, renew, modify, and extend mortgages. The Trustee may accept deeds instead of foreclosing.</p>

<h2>Section 8.13      Nominee Powers</h2>

<p>The Trustee may hold real estate, securities, and any other property in the name of a nominee or in any other form, without disclosing the existence of any trust or fiduciary capacity.</p>

<h2>Section 8.14      Oil, Gas and Mineral Interests</h2>

<p>The Trustee may acquire, maintain, develop, and exploit, either alone or jointly with others, any oil, gas, coal, mineral, or other natural resource rights or interests.</p>

<p>The Trustee may drill, test, explore, mine, develop, extract, remove, convert, manage, retain, store, sell, and exchange any of those rights and interests on terms and for a price that the Trustee deems advisable.</p>

<p>The Trustee may execute leases, pooling, unitization, and other types of agreements in connection with oil, gas, coal, mineral, and other natural resource rights and interests, even though the terms of those arrangements may extend beyond the trust's termination.</p>

<p>The Trustee may execute division orders, transfer orders, releases, assignments, farm outs, and any other instruments that it considers proper. The Trustee may employ the services of consultants and outside specialists in connection with the evaluation, management, acquisition, disposition, and development of any mineral interest, and may pay the cost of the services from the trust's principal and income.</p>

<h2>Section 8.15      Payment of Property Taxes and Expenses</h2>

<p>Except as otherwise provided in this trust, the Trustee may pay any property taxes, assessments, fees, charges, and other expenses incurred in the administration or protection of the trust. All payments will be a charge against the trust property and will be paid by the Trustee out of income. If the income is insufficient, then the Trustee may make any payments of property taxes or expenses out of the trust property's principal. The Trustee's determination with respect to this payment will be conclusive on the beneficiaries.</p>

<h2>Section 8.16      Professional Practice</h2>

<p>If the trust owns or acquires an interest in a professional practice as defined in this Section, the Trustee may exercise the authority and discretion under this Section. The powers granted in this Section are in addition to all other powers granted to the Trustee in this trust.</p>

<h3>(a)    Definition of Professional Practice</h3>

<p>For purposes of this Article, the term professional practice means an interest in a medical, dental, legal, veterinary, accounting, architectural, engineering, or other professional practice in which I participate as a licensed person. The term includes my interest in any corporation, partnership, sole proprietorship, limited liability company, joint venture, or other entity that is engaged in providing the kind of professional services that I am licensed to practice.</p>

<p>Any reference to professional practice also includes all real estate, equipment, furnishings, receivables, client or patient records, office records, and vehicles, but does not include any interest in any retirement plan that is sponsored by the professional practice.</p>

<h3>(b)    Sale of the Practice</h3>

<p>Following my death or in the event of my permanent disability, I prefer that the Trustee sell any interest in a professional practice owned by the trust as quickly as practicable in order to protect the value of the practice. The Trustee may sell my interest in the professional practice on terms the Trustee considers appropriate.</p>

<p>In order to consummate the sale as quickly as practicable, the incoming Trustee may negotiate with potential buyers before formally serving as Trustee, but the sale may not be concluded until the Trustee is formally serving.</p>

<h3>(c)    Appointment of Independent Special Trustee</h3>

<p>Pending a sale of the professional practice, the Trustee may appoint an Independent Special Trustee licensed under the laws that regulate the professional practice. The Trustee may delegate to the Independent Special Trustee the authority to manage, operate, or to wind up the practice in the manner required by law.</p>

<h3>(d)    Client or Patient Records</h3>

<p>The Trustee is forbidden from reading or reviewing client or patient records and files of the professional practice if doing so would violate my professional obligation to the client or patient. The Trustee may employ another licensed professional or professional assistant to read and review client or patient records for any appropriate purpose. The Trustee will ensure that the review is conducted consistent with the best ethical practices of my profession, safeguarding confidentiality and avoiding conflicts of interest.</p>

<h3>(e)    Trustee Compensation</h3>

<p>In addition to the compensation set forth in Section 7.07, the Trustee may receive additional reasonable compensation for services in connection with the operation, sale, or winding up of the professional practice. The Trustee may be compensated directly from the professional practice, the trust, or both.</p>

<h3>(f)    Conflicts of Interest</h3>

<p>Any Trustee, including any Independent Special Trustee, may exercise all of the powers granted in this trust, even though the Trustee may be involved with or have a personal interest in the professional practice.</p>

<h2>Section 8.17      Purchase of Assets from and Loans to My Probate Estate</h2>

<p>Upon my death, the Trustee may purchase at fair market value and retain in the form received any property that is a part of my probate or trust estate as an addition to the trust. In addition, the Trustee may make secured and unsecured loans to my probate or trust estate. The Trustee may not be held liable for any loss suffered by the trust because of the exercise of the powers granted in this Section.</p>

<p>The Trustee may not use any trust property for the benefit of my estate as defined in Code of Federal Regulations Title 26 Section 20.2042-1(b), unless the property is included in my gross estate for federal estate tax purposes.</p>

<h2>Section 8.18      Qualified Tuition Programs</h2>

<p>The Trustee may purchase tuition credits or certificates or make contributions to an account in one or more qualified tuition programs as defined under Internal Revenue Code Section 529 on a beneficiary's behalf for the purpose of meeting the beneficiary's qualified higher education expenses. With respect to an interest in any qualified tuition program, the Trustee may act as contributor, administering the interest by actions including:</p>

<p>designating and changing the designated beneficiary of the interest in the qualified tuition program; requesting both qualified and nonqualified withdrawals; selecting among investment options and reallocating funds among different investment options; making rollovers to another qualified tuition program; and allocating any tax benefits or penalties to the beneficiaries of the trust.</p>

<p>Notwithstanding anything in this provision to the contrary, the designated beneficiary must always be a beneficiary of the trust from which the funds were distributed to establish the interest in the qualified tuition program. Investment in a qualified tuition program will not be considered a delegation of investment responsibility under any applicable statute or other law.</p>

<h2>Section 8.19      Real Estate Powers</h2>

<p>The Trustee may sell at public or private sale, convey, purchase, exchange, lease for any period, mortgage, manage, alter, improve, and in general deal in and with real property in the manner and on the terms and conditions as the Trustee deems appropriate.</p>

<p>The Trustee may grant or release easements in or over, subdivide, partition, develop, raze improvements to, and abandon any real property.</p>

<p>The Trustee may manage real estate in any manner considered best, and may exercise all other real estate powers necessary to effect this purpose. The Trustee may enter into contracts to sell real estate. The Trustee may enter into leases and grant options to lease trust property, even though the term of the agreement extends beyond the termination of any trusts established under this trust and beyond the period that is required for an interest created under this trust to vest in order to be valid under the rule against perpetuities. The Trustee may enter into any contracts, covenants, and warranty agreements that the Trustee deems appropriate.</p>

<h2>Section 8.20      Residences and Tangible Personal Property</h2>

<p>The Trustee may acquire, maintain, and invest in any residence for the beneficiaries' use and benefit, whether or not the residence is income producing and without regard to the proportion that the residence's value may bear to the trust property's total value, even if retaining the residence involves financial risks that Trustees would not ordinarily incur. The Trustee may pay or make arrangements for others to pay all carrying costs of any residence for the beneficiaries' use and benefit, including taxes, assessments, insurance, maintenance, and other related expenses.</p>

<p>The Trustee may acquire, maintain, and invest in articles of tangible personal property, whether or not the property produces income. The Trustee may pay for the repair and maintenance of the property.</p>

<p>The Trustee is not required to convert the property referred to in this Section to income-producing property, except as required by other provisions of this trust. The Trustee may permit any Income Beneficiary of the trust to occupy any real property or use any personal property owned by the trust on terms or arrangements that the Trustee determines, including rent free or in consideration for the payment of taxes, insurance, maintenance, repairs, or other charges.</p>

<p>The Trustee is not liable for any depreciation or loss resulting from any decision to retain or acquire any property as authorized by this Section.</p>

<h2>Section 8.21      Retention and Abandonment of Trust Property</h2>

<p>The Trustee may retain any property constituting the trust at the time of its creation, at the time of my death, or as the result of the exercise of a stock option, without liability for depreciation or loss resulting from retention. The Trustee may retain property, notwithstanding the fact that the property may not be of the character prescribed by law for the investment of assets held by a fiduciary, and notwithstanding the fact that retention may result in inadequate diversification under any applicable Prudent Investor Act or other applicable law.</p>

<p>The Trustee may hold property that is not income producing or is otherwise nonproductive if holding the property is in the best interests of the beneficiaries in the sole and absolute discretion of the Trustee. On the other hand, the Trustee will invest contributions of cash and cash equivalents as soon as reasonably practicable after the assets have been acquired by the trust.</p>

<p>The Trustee may retain a reasonable amount in cash or money market accounts to pay anticipated expenses and other costs, and to provide for anticipated distributions to or for the benefit of a beneficiary.</p>

<p>The Trustee may abandon any property that the Trustee considers of insignificant value.</p>

<h2>Section 8.22      Securities, Brokerage and Margin Powers</h2>

<p>The Trustee may buy, sell, trade, and otherwise deal in stocks, bonds, investment companies, mutual funds, common trust funds, commodities, and other securities of any kind and in any amount, including short sales. The Trustee may write and purchase call or put options, and other derivative securities. The Trustee may maintain margin accounts with brokerage firms, and may pledge securities to secure loans and advances made to the Trustee or to or for a beneficiary's benefit.</p>

<p>The Trustee may place all or any part of the securities held by the trust in the custody of a bank or trust company. The Trustee may have all securities registered in the name of the bank or trust company or in the name of the bank's nominee or trust company's nominee. The Trustee may appoint the bank or trust company as the agent or attorney in fact to collect, receive, receipt for, and disburse any income, and generally to perform the duties and services incident to a custodian of accounts.</p>

<p>The Trustee may employ a broker-dealer as a custodian for securities held by the trust, and may register the securities in the name of the broker-dealer or in the name of a nominee; words indicating that the securities are held in a fiduciary capacity are optional. The Trustee may hold securities in bearer or uncertificated form, and may use a central depository, clearing agency, or book-entry system, such as The Depository Trust Company, Euroclear, or the Federal Reserve Bank of New York.</p>

<p>The Trustee may participate in any reorganization, recapitalization, merger, or similar transaction. The Trustee may exercise or sell conversion or subscription rights for securities of all kinds and descriptions. The Trustee may give proxies or powers of attorney that may be discretionary and with or without powers of substitution, and may vote or refrain from voting on any matter.</p>

<h2>Section 8.23      Settlement Powers</h2>

<p>The Trustee may settle any claims and demands in favor of or against the trust by compromise, adjustment, arbitration, or other means. The Trustee may release or abandon any claim in favor of the trust.</p>

<h2>Section 8.24      Subchapter S Corporation Stock Provisions</h2>

<p>During any period the trust is not treated as a grantor trust for tax purposes under Internal Revenue Code Section 671, this trust or any trust created under this trust may hold any S corporation stock held as a separate Electing Small Business Trust, or as a separate Qualified Subchapter S Trust, as provided in this Section.</p>

<p>For purposes of this Section, S corporation stock means all capital stock issued by a corporation (or other entity taxable as a corporation for federal income tax purposes) that is treated or is intended to be treated under Section 1361(a) as an S corporation for federal income tax purposes.</p>

<h3>(a)    Electing Treatment as an Electing Small Business Trust</h3>

<p>If the Trustee elects under Internal Revenue Code Section 1361(e)(3) to qualify any portion of the trust as an Electing Small Business Trust, the Trustee shall: apportion a reasonable share of the unallocated expenses of all trusts created under this trust to the Electing Small Business Trust under the applicable provisions of the Internal Revenue Code and Treasury Regulations; and administer the trust as an Electing Small Business Trust, under Internal Revenue Code Section 1361(e).</p>

<h3>(b)    Electing Treatment as a Qualified Subchapter S Trust</h3>

<p>If the current Income Beneficiary of the trust makes an election under Section 1361(d)(2) to qualify the trust as a Qualified Subchapter S Trust within the meaning of Section 1361(d)(3), the Trustee shall: refer to the Qualified Subchapter S Trust using the same name as the trust to which the stock was originally allocated, plus the name of the current Income Beneficiary of the trust, followed by the letters QSST; administer the Qualified Subchapter S Trust in accordance with the same provisions contained in the trust to which the Trustee allocated the S corporation stock, as long as the provisions of this Subsection control the trust administration to the extent that they are inconsistent with the provisions of the original trust; and maintain the Qualified Subchapter S Trust as a separate trust held for the benefit of only one beneficiary as required in Section 1361(d)(3).</p>

<p>The Trustee shall recommend that the current Income Beneficiary of the trust make a timely election to cause federal tax treatment of the trust as a Qualified Subchapter S Trust.</p>

<h4>(1)    Current Income Beneficiary</h4>

<p>The current Income Beneficiary of a Qualified Subchapter S Trust is the person who has a present right to receive income distributions from the trust to which the Trustee has allocated the S corporation stock. A Qualified Subchapter S Trust may have only one current Income Beneficiary.</p>

<p>If, under the terms of the trust, more than one person has a present right to receive income distributions from the trust originally holding the S corporation stock, the Trustee shall segregate the S corporation stock into separate Qualified Subchapter S Trusts for each of these people.</p>

<h4>(2)    Distributions</h4>

<p>Until the earlier of the death of the current Income Beneficiary or the date on which the trust no longer holds any S corporation stock (the QSST termination date), the Trustee shall distribute at least annually all of the trust's net income, as defined in Internal Revenue Code Section 643(b) to the current Income Beneficiary.</p>

<p>The terms of the trust to which the S corporation stock was originally allocated govern distributions of principal from the Qualified Subchapter S Trust. But until the QSST termination date, the Trustee may distribute principal only to the current Income Beneficiary of the Qualified Subchapter S Trust and not to any other person or entity.</p>

<p>If the Qualified Subchapter S Trust terminates during the lifetime of the current Income Beneficiary, the Trustee shall distribute all assets of the Qualified Subchapter S Trust to the current Income Beneficiary outright and free of the trust.</p>

<h4>(3)    Allocation of Income and Expenses</h4>

<p>The Trustee shall characterize receipts and expenses of any Qualified Subchapter S Trust in a manner consistent with Internal Revenue Code Section 643(b).</p>

<h4>(4)    Trust Merger or Consolidation</h4>

<p>Notwithstanding any other provision of this trust that may seem to the contrary, the Trustee may not merge any Qualified Subchapter S Trust with another trust's assets if doing so would jeopardize the qualification of either trust as a Qualified Subchapter S Trust.</p>

<h3>(c)    Governance of the Trusts</h3>

<p>The following additional provisions apply to any separate trust created under this Section.</p>

<h4>(1)    Protection of S Corporation Status</h4>

<p>The Trustee must not administer a trust holding S corporation stock in a manner that would cause the termination of the S corporation status of the entity whose stock is held as part of the trust. Therefore, during any period that the trust holds S corporation stock, the Trustee must construe the terms and provisions of this trust in a manner that is consistent with the trust qualifying as an Electing Small Business Trust or as a Qualified Subchapter S Trust. The Trustee must disregard any provision of this trust that cannot be so construed or applied.</p>

<h4>(2)    Methods of Distribution</h4>

<p>The Trustee may not make distributions in a manner that would jeopardize the trust's qualification as an Electing Small Business Trust or as a Qualified Subchapter S Trust.</p>

<h4>(3)    Disposition of S Corporation Stock</h4>

<p>If the Trustee believes the continuation of any trust would result in the termination of the S corporation status of any entity whose stock is held as a part of the trust property, the Trustee, other than an Interested Trustee, in addition to the power to sell or otherwise dispose of the stock, has the power to distribute the stock to the person who is then entitled to receive the income from the trust.</p>

<h2>Section 8.25      Limitation on the Trustee's Powers</h2>

<p>All powers granted to Trustees under this trust or by applicable law are limited as set forth in this Section, unless explicitly excluded by reference to this Section.</p>

<h3>(a)    An Interested Trustee Limited to Ascertainable Standards</h3>

<p>An Interested Trustee may only make discretionary decisions when they pertain to a beneficiary's health, education, maintenance and support as described under Internal Revenue Code Sections 2041 and 2514.</p>

<h3>(b)    Interested Trustee Prohibited from Acting</h3>

<p>Whenever this trust specifically prohibits or limits an Interested Trustee from exercising discretion or performing an act, then any Interested Trustee serving as the Trustee is prohibited from participating in the exercise of that discretion or performance of that act. If there is no Trustee serving who is not an Interested Trustee, then an Independent Special Trustee may be appointed under the provisions of Section 3.07 to exercise the discretion or perform the act.</p>

<h3>(c)    Exclusive Powers of The Independent Trustee</h3>

<p>Whenever a power or discretion is granted exclusively to the Independent Trustee, then any Interested Trustee who is then serving as the Trustee is prohibited from participating in the exercise of the power or discretion. If there is no Independent Trustee then serving, then an Independent Special Trustee may be appointed under the provisions of Section 3.07 to exercise the power or discretion that is exercisable only by the Independent Trustee.</p>

<h3>(d)    No Distributions in Discharge of Certain Legal Obligations</h3>

<p>The Trustee may not exercise or participate in the exercise of discretion with respect to the distribution of income or principal that would in any manner discharge a legal obligation of the Trustee, including the obligation of support.</p>

<p>If a beneficiary or any other person has the power to remove a Trustee, that Trustee may not exercise or participate in the exercise of discretion with respect to the distribution of income or principal that would in any manner discharge a legal obligation of the person having the power to remove the Trustee, including that person's obligation of support.</p>

<h3>(e)    Insurance Policy on the Life of the Trustee</h3>

<p>If the trust holds a policy that insures the life of a Trustee, that Trustee may not exercise any powers or rights with respect to the policy. Instead, a Co-Trustee or an Independent Special Trustee must exercise the powers and rights with respect to the policy.</p>

<p>If any rule of law or court decision construes the ability of the insured Trustee to name an Independent Special Trustee as an incident of ownership of the policy, then a majority of the then current Income Beneficiaries (excluding the insured Trustee if he or she is a beneficiary) will select the Independent Special Trustee.</p>

<h3>(f)    Insurance Policy on a Beneficiary's Life</h3>

<p>If the trust holds a policy that insures a beneficiary's life, the beneficiary, individually or as Trustee, may not exercise any power over the policy, its cash value, or its proceeds. This denial of power is intended to prevent an insured beneficiary from holding any power that would constitute an incident of ownership of the policy.</p>

<p>The limitations of this Subsection do not apply if, upon the beneficiary's death, the policy's proceeds would otherwise be included in the beneficiary's gross estate for federal estate tax purposes.</p>

<h1>Article Nine: General Provisions</h1>

<h2>Section 9.01      Maximum Term for Trusts</h2>

<p>Notwithstanding any contrary provisions or unless terminated earlier under other provisions of this trust, each trust created under this trust document will terminate 21 years after the death of the last to die of the descendants of my paternal and maternal grandparents who are living at the time this agreement is signed.</p>

<p>At that time, the remaining trust property will vest in and be distributed to the persons entitled to receive mandatory distributions of the trust's net income, in the same proportions. If no beneficiary is entitled to mandatory distributions of net income, the remaining trust property will vest in and be distributed to the beneficiaries entitled to receive discretionary distributions of the trust's net income, in equal shares.</p>

<h2>Section 9.02      Spendthrift Provision</h2>

<p>No beneficiary may assign, anticipate, encumber, alienate, or otherwise voluntarily transfer the income or principal of any trust created under this trust. In addition, neither the income nor the principal of any trust created under this trust is subject to attachment, bankruptcy proceedings or any other legal process, the interference or control of creditors or others, or any involuntary transfer.</p>

<p>This Section does not restrict a beneficiary's right to disclaim any interest or exercise of any power of appointment granted in this trust.</p>

<h2>Section 9.03      Changing the Governing Law and Situs of Administration</h2>

<p>At any time, the Trustee may change the governing law of the trust; change the situs of the administration of the trust; and remove all or any part of the property from one jurisdiction to another. The Trustee may elect, by filing an instrument with the trust records, that the trust will then be construed, regulated, and governed by the new jurisdiction's laws. The Trustee may take action under this Section for any purpose the Trustee considers appropriate, including the minimization of any taxes in respect of the trust or any trust beneficiary.</p>

<p>If considered necessary or advisable by the Trustee, the Trustee may appoint an Independent Trustee to serve as Trustee in the new situs. If necessary and if the Trustee does not appoint an Independent Trustee within 30 days of the Trustee's action to change the governing law or situs of the trust, the beneficiaries entitled to receive distributions of the trust's net income may appoint a corporate fiduciary in the new situs by majority consent. If a beneficiary is a minor or is incapacitated, the beneficiary's parent or Legal Representative may act on the beneficiary's behalf.</p>

<h2>Section 9.04      Definitions</h2>

<p>For purposes of this trust, the following terms have these meanings:</p>

<h3>(a)    Adopted and Afterborn Persons</h3>

<p>A person in any generation who is legally adopted before reaching 18 years of age and his or her descendants, including adopted descendants, have the same rights and will be treated in the same manner under this trust as natural children of the adopting parent. A person is considered legally adopted if the adoption was legal at the time when and in the jurisdiction in which it occurred.</p>

<p>A fetus in utero later born alive will be considered a person in being during the period of gestation.</p>

<h3>(b)    Descendants</h3>

<p>The term descendants means persons who directly descend from a person, such as children, grandchildren, or great-grandchildren. The term descendants does not include collateral descendants, such as nieces and nephews.</p>

<h3>(c)    Education</h3>

<p>The term education is intended to be an ascertainable standard under Internal Revenue Code Sections 2041 and 2514 and includes:</p>

<p>enrollment at private elementary, junior, and senior high school, including boarding school;</p>

<p>undergraduate and graduate study in any field at a college or university;</p>

<p>specialized, vocational, or professional training or instruction at any institution, as well as private instruction; and</p>

<p>any other curriculum or activity that the Trustee considers useful for developing a beneficiary's abilities and interests including athletic training, musical instruction, theatrical training, the arts, and travel.</p>

<p>The term education also includes expenses such as tuition, room and board, fees, books, supplies, computers and other equipment, tutoring, transportation, and a reasonable allowance for living expenses.</p>

<h3>(d)    Good Faith</h3>

<p>For the purposes of this trust, a Trustee has acted in good faith if:</p>

<p>an action or inaction is not a result of intentional wrongdoing;</p>

<p>the Trustee did not make the decision to act or not act with reckless indifference to the beneficiaries' interests; and</p>

<p>an action or inaction does not result in an improper personal benefit to the Trustee.</p>

<p>Further, all parties subject to the provisions of this trust will treat any action or inaction made in reliance on information, consent, or directions received from the Personal Representative of my estate as made in good faith for the purposes of this Section, except for cases of willful misconduct or malfeasance on the Trustee's part.</p>

<h3>(e)    Grantor</h3>

<p>Grantor has the same legal meaning as Settlor, Trustor or any other term referring to the maker of a trust.</p>

<h3>(f)    Incapacity</h3>

<p>Except as otherwise provided in this trust, a person is considered incapacitated in any of the following circumstances.</p>

<h4>(1)    The Opinion of Two Licensed Physicians</h4>

<p>An individual is considered to be incapacitated whenever two licensed physicians give the opinion that the individual is unable to effectively manage his or her property or financial affairs, whether as a result of age; illness; use of prescription medications, drugs, or other substances; or any other cause. If an individual whose capacity is in question refuses to provide necessary documentation or otherwise submit to examination by licensed physicians, that individual will be considered incapacitated.</p>

<p>An individual is considered restored to capacity whenever the individual's personal or attending physician provides a written opinion that the individual is able to effectively manage his or her property and financial affairs.</p>

<h4>(2)    Court Determination</h4>

<p>An individual is considered incapacitated if a court of competent jurisdiction has declared the individual to be disabled, incompetent, or legally incapacitated.</p>

<h4>(3)    Detention, Disappearance, or Absence</h4>

<p>An individual is considered to be incapacitated whenever he or she cannot effectively manage his or her property or financial affairs due to the individual's unexplained disappearance or absence for more than 30 days, or whenever he or she is detained under duress.</p>

<p>An individual's disappearance, absence, or detention under duress may be established by an affidavit of the Trustee, or by the affidavit of any beneficiary if no Trustee is then serving. The affidavit must describe the circumstances of the individual's disappearance, absence, or detention, and may be relied upon by any third party dealing in good faith with the Trustee.</p>

<h3>(g)    Include, Includes, Including</h3>

<p>In this document, the words include, includes, and including mean include without limitation, includes without limitation and including without limitation, respectively. Include, includes, and including are words of illustration and enlargement, not words of limitation or exclusivity.</p>

<h3>(h)    Income Beneficiary</h3>

<p>The term Income Beneficiary means any beneficiary who is then entitled to receive distributions of the trust's net income, whether mandatory or discretionary.</p>

<p>Unless otherwise provided in this trust, the phrase majority of the Income Beneficiaries means any combination of Income Beneficiaries who would receive more than 50% of the accrued net income if that income were distributed on the day of a vote. For purposes of this calculation, beneficiaries who are eligible to receive discretionary distributions of net income receive the imputed income in equal shares.</p>

<p>References to a majority refer to a majority of the entire trust collectively until the Trustee allocates property to separate trusts or trust shares. After the Trustee allocates property to separate trusts or trust shares, references to a majority refer to a majority of each separate trust or trust share.</p>

<h3>(i)    Independent Trustee</h3>

<p>The term Independent Trustee means any Trustee who is not an Interested Trustee as defined in Subsection (k) and includes an Independent Special Trustee appointed under the provisions of Section 3.07.</p>

<h3>(j)    Instrument</h3>

<p>The term this instrument means this trust, and includes all trusts created under the terms of this trust.</p>

<h3>(k)    Interested Trustee</h3>

<p>The term Interested Trustee means a Trustee who:</p>

<p>is a transferor or beneficiary;</p>

<p>is related or subordinate to a transferor or beneficiary;</p>

<p>can be removed and replaced by a transferor with either the transferor or a party who is related or subordinate to the transferor; or</p>

<p>can be removed and replaced by a beneficiary with either the beneficiary or a party who is related or subordinate to the beneficiary.</p>

<p>For purposes of this Subsection, transferor means a person who transferred property to the trust during that person's lifetime, including a person whose disclaimer resulted in property passing to the trust. A person is only a transferor during his or her lifetime. Beneficiary means a person who is or may become eligible to receive income or principal from the trust under the terms of the trust, even if this person has only a remote contingent remainder interest in the trust, but not if the person's only interest is as a potential appointee under a power of appointment. Related or subordinate is used as defined in Internal Revenue Code Section 672(c).</p>

<h3>(l)    Internal Revenue Code and Treasury Regulations</h3>

<p>References to the Internal Revenue Code or to its provisions are to the Internal Revenue Code of 1986, as amended, and any corresponding Treasury Regulations. References to the Treasury Regulations, are to the Treasury Regulations under the Internal Revenue Code in effect. If a particular provision of the Internal Revenue Code is renumbered or the Internal Revenue Code is superseded by a subsequent federal tax law, any reference is considered to be made to the renumbered provision or to the corresponding provision of the subsequent law, unless to do so would clearly be contrary to my intent as expressed in this trust. The same rule applies to references to the Treasury Regulations.</p>

<h3>(m)    Legal Representative or Personal Representative</h3>

<p>As used in this trust document, the term Legal Representative or Personal Representative means a person's guardian, conservator, executor, administrator, Trustee, attorney in fact under a Durable Power of Attorney, or any other person or entity representing a person or the person's estate. In the case of a minor beneficiary, the beneficiary's parent or another adult with custody of the beneficiary, except for any transferor to a trust created under this instrument, will be considered the beneficiary's Legal Representative for purposes of this trust.</p>

<h3>(n)    Per Stirpes</h3>

<p>Whenever a distribution is to be made to a person's descendants per stirpes, the distribution will be divided into as many equal shares as there are then-living children and deceased children who left then-living descendants. Each then-living child will receive one share, and the share of each deceased child will be divided among the deceased child's then-living descendants in the same manner.</p>

<h3>(o)    Permissible Distributee</h3>

<p>"Permissible Distributee" means a beneficiary who is currently eligible to receive distributions of trust income or principal, whether the distribution is mandatory or discretionary.</p>

<h3>(p)    Primary Beneficiary</h3>

<p>The Primary Beneficiary of a trust created under this trust is that trust's oldest Income Beneficiary, unless some other individual is specifically designated as the Primary Beneficiary of that separate trust.</p>

<h3>(q)    Qualified Beneficiary</h3>

<p>"Qualified Beneficiary" means a beneficiary who, on the date the beneficiary's qualification is determined:</p>

<p>(1) is a distributee or Permissible Distributee of trust income or principal;</p>

<p>(2) would be a distributee or Permissible Distributee of trust income or principal if the interests of the distributees described in subparagraph (1) terminated on that date; or</p>

<p>(3) would be a distributee or Permissible Distributee of trust income or principal if the trust terminated on that date.</p>

<h3>(r)    Shall and May</h3>

<p>Unless otherwise specifically provided in this trust or by the context in which used, I use the word shall in this trust to impose a duty, command, direct, or require, and the word may to allow or permit, but not require. In the context of the Trustee, when I use the word shall I intend to impose a fiduciary duty on the Trustee. When I use the word may I intend to empower the Trustee to act with the Trustee's sole and absolute discretion unless otherwise stated in this trust. When I use the words may not in reference to the Trustee, I specifically mean the Trustee is not permitted to.</p>

<h3>(s)    Trust</h3>

<p>The terms this trust, this document, instrument, and this trust document refer to this trust and all trusts created under the terms of this trust.</p>

<h3>(t)    Trustee</h3>

<p>The terms the Trustee and Trustee refer to the Initial Trustee named in Article One and to any successor, substitute, replacement, or additional person, corporation, or other entity that ever acts as the Trustee of any trust created under the terms of this trust. The term Trustee refers to singular or plural as the context may require.</p>

<h3>(u)    Trust Property</h3>

<p>The term trust property means all property acquired from any source and held by a Trustee under this trust.</p>

<h2>Section 9.05      General Provisions and Rules of Construction</h2>

<p>The following general provisions and rules of construction apply to this trust.</p>

<h3>(a)    Multiple Originals; Validity of Paper or Electronic Copies</h3>

<p>This trust may be executed in any number of counterparts, each of which will be considered an original.</p>

<p>Any person may rely on a paper or electronic copy of this trust that the Trustee certifies to be a true copy as if it were an original.</p>

<h3>(b)    Singular and Plural; Gender</h3>

<p>Unless the context requires otherwise, singular words may be construed as plural, and plural words may be construed as singular. Words of one gender may be construed as denoting another gender as is appropriate within the context. The word or, when used in a list of more than two items, may function as both a conjunction and a disjunction as the context requires.</p>

<h3>(c)    Headings of Articles, Sections, and Subsections</h3>

<p>The headings of Articles, Sections, and Subsections used within this trust are included solely for the convenience of the reader. They have no significance in the interpretation or construction of this trust.</p>

<h3>(d)    Governing State Law</h3>

<p>This trust is governed, construed, and administered according to the laws of California, as amended except as to trust property required by law to be governed by the laws of another jurisdiction and unless the situs of administration is changed under Section 9.03.</p>

<h3>(e)    Notices</h3>

<p>Unless otherwise stated, any notice required under this trust will be in writing. The notice may be personally delivered with proof of delivery to the party requiring notice and will be effective on the date personally delivered. Notice may also be mailed, postage prepaid, by certified mail with return receipt requested to the last known address of the party requiring notice. Mailed notice is effective on the date of the return receipt. If a party giving notice does not receive the return receipt but has proof that he or she mailed the notice, notice will be effective on the date it would normally have been received via certified mail. If the party requiring notice is a minor or incapacitated individual, notice will be given to the parent or Legal Representative.</p>

<h3>(f)    Severability</h3>

<p>The invalidity or unenforceability of any provision of this trust does not affect the validity or enforceability of any other provision of this trust. If a court of competent jurisdiction determines that any provision is invalid, the remaining provisions of this trust are to be interpreted as if the invalid provision had never been included.</p>

<!-- Signature Blocks -->
<div class="signature-block">
<p class="no-indent">I have executed this trust on {{TRUST_DATE_FORMATTED}}.</p>

<p class="no-indent">This Irrevocable Trust Agreement is effective when signed by me, whether or not now signed by a Trustee.</p>

<p class="no-indent" style="margin-top: 40px;">_______________________________</p>
<p class="no-indent">{{CLIENT_FULL_NAME}}, Grantor</p>

<p class="no-indent" style="margin-top: 40px;">_______________________________</p>
<p class="no-indent">{{TRUSTEE_NAME}}, Trustee</p>
</div>

<!-- Notary Blocks -->
<div class="notary-block" style="page-break-before: always;">
<p class="no-indent"><i>A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.</i></p>

<p class="no-indent">STATE OF CALIFORNIA )</p>
<p class="no-indent" style="margin-left: 2in;">) ss.</p>
<p class="no-indent">COUNTY OF {{CLIENT_COUNTY}} )</p>

<p>On {{TRUST_DATE_FORMATTED}}, before me, ____________________________, a Notary Public, personally appeared {{CLIENT_FULL_NAME}}, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.</p>

<p>I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>

<p class="no-indent">WITNESS my hand and official seal.</p>

<p class="no-indent" style="margin-top: 40px;">_______________________________</p>
<p class="no-indent">Notary Public</p>
<p class="no-indent">(SEAL)</p>
<p class="no-indent">My Commission Expires: ________________</p>
</div>

<div class="notary-block" style="page-break-before: always;">
<p class="no-indent"><i>A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.</i></p>

<p class="no-indent">STATE OF CALIFORNIA )</p>
<p class="no-indent" style="margin-left: 2in;">) ss.</p>
<p class="no-indent">COUNTY OF {{CLIENT_COUNTY}} )</p>

<p>On {{TRUST_DATE_FORMATTED}}, before me, ____________________________, a Notary Public, personally appeared {{TRUSTEE_NAME}}, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.</p>

<p>I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>

<p class="no-indent">WITNESS my hand and official seal.</p>

<p class="no-indent" style="margin-top: 40px;">_______________________________</p>
<p class="no-indent">Notary Public</p>
<p class="no-indent">(SEAL)</p>
<p class="no-indent">My Commission Expires: ________________</p>
</div>

<!-- Schedule A -->
<div style="page-break-before: always;">
<h1>Schedule A</h1>
<h2 style="text-align: center;">Initial Trust Property</h2>

<p class="no-indent"><b>Real Property:</b></p>

<p class="no-indent">Property Address: [INSERT FULL STREET ADDRESS]</p>
<p class="no-indent">Assessor's Parcel Number (APN): [INSERT APN]</p>
<p class="no-indent">Legal Description: [INSERT LEGAL DESCRIPTION OR ATTACH AS EXHIBIT]</p>

<p class="no-indent" style="margin-top: 20px;"><b>Cash/Other Assets:</b></p>

<p class="no-indent">Inheritance Funds: [SPECIFY AMOUNT IF APPLICABLE]</p>
<p class="no-indent">[LIST ANY OTHER INITIAL TRUST PROPERTY]</p>

<p class="no-indent" style="margin-top: 40px;">Date of Transfer: ____________________</p>

<p class="no-indent" style="margin-top: 40px;">Transferor Signature: _______________________________</p>
<p class="no-indent">{{CLIENT_FULL_NAME}}, Grantor</p>
</div>

</body>
</html>
`;
