export const pourOverWillTemplate = (personType = 'client') => {
  // personType can be 'client' or 'spouse' for joint trusts
  const prefix = personType === 'client' ? 'CLIENT' : 'SPOUSE';
  const otherPrefix = personType === 'client' ? 'SPOUSE' : 'CLIENT';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 1in; }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #000;
    }
    .yellow-line {
      width: 100%;
      height: 3px;
      background-color: #FFD700;
      margin: 15px 0;
    }
    h1 {
      text-align: center;
      font-size: 14pt;
      font-weight: bold;
      margin: 20px 0;
    }
    h2 {
      text-align: center;
      font-size: 12pt;
      font-weight: bold;
      margin: 20px 0;
    }
    h3 {
      font-size: 11pt;
      font-weight: bold;
      margin: 15px 0 10px 0;
      text-indent: 0;
    }
    p {
      margin: 10px 0;
      text-align: justify;
    }
    .no-indent {
      text-indent: 0;
    }
    .section {
      margin: 15px 0;
    }
    .signature-area {
      margin-top: 40px;
      text-align: center;
    }
    .signature-line {
      margin: 30px auto 5px auto;
      width: 400px;
      border-bottom: 1px solid #000;
      text-align: center;
    }
    .witness-block {
      margin-top: 40px;
    }
    .indent { margin-left: 40px; }
  </style>
</head>
<body>

<h1>WILL</h1>
<div class="yellow-line"></div>

<p>This section contains an unsigned copy of your Will with COPY stamped on each page. This copy has your name and the names and addresses of your witnesses clearly printed in the places that were signed on the original. The copy also includes the date the Will was signed. This is called a conformed copy of your Will. It prevents a copy from passing as an original, yet lets your survivors know the contents of your Will and the witnesses to your Will.</p>

<p>Upon your death, your Will leaves any property that was not transferred to your Revocable Living Trust before your death to your Revocable Living Trust. This is why it is named a Will. The Will functions as a safety net to ensure that the property owned in your individual name rather than in the name of your Revocable Living Trust at the time of your death is ultimately managed by your successor Trustees as provided in your Revocable Living Trust. This is a second best case scenario, though. Your goal is to avoid probate altogether by transferring all of your assets to your Revocable Living Trust during your life. This Will is merely a backup document to ensure that your Revocable Living Trust ultimately controls all your assets.</p>

<p>Since you have only one original Will, you should store the original Will in a very safe place such as a safe, vault, or safe-deposit box. If you choose to keep the original Will in a safe-deposit box, make sure you have designated a trusted person as "deputy" or as co-owner of the box.</p>

<p>Your Will performs a very important additional function. It names guardians that a court will appoint to take care of your children in the event that you die while they are still minors or under a disability.</p>

<div style="page-break-before: always;"></div>

<h2>Will of {{${prefix}_FULL_NAME}}</h2>

<p>I, {{${prefix}_FULL_NAME}}, a resident of {{${prefix}_COUNTY}} County, California, revoke any prior Wills and codicils made by me and declare this to be my Will.</p>

<h2>Article One</h2>
<h3 style="text-align: center; margin: 20px 0;">Family Information</h3>

{{#IF_JOINT}}
<p>I am married to {{${otherPrefix}_FULL_NAME}}. Any reference in this document to my {{${prefix}_SEX_REF === 'his' ? 'wife' : 'husband'}} is a reference to {{${otherPrefix}_FULL_NAME}}.</p>
{{/IF_JOINT}}

{{#IF_HAS_CHILDREN}}
<p>I have {{CHILDREN_COUNT}} {{CHILDREN_COUNT_WORD}}. Their names are:</p>
{{#EACH_CHILDREN}}
<p class="indent">{{CHILD_FULL_NAME}}, born on {{CHILD_DOB_FORMATTED}};</p>
{{/EACH_CHILDREN}}
<p>All references in my Will to my children are to these children.</p>
{{/IF_HAS_CHILDREN}}

<h2>Article Two</h2>
<h3 style="text-align: center; margin: 20px 0;">Distribution of My Property</h3>

<div class="section">
<h3>Section 2.01      Disposition of Tangible Personal Property</h3>
<p>I direct that my Personal Representative distribute my tangible personal possessions according to a separate Personal Property Memorandum or other similar writing signed by me and kept with my personal records. The writing will qualify to distribute my tangible personal possessions under applicable state law. If the writing is not found at the time of my death, or is ruled an improper disposition, this bequest will lapse and my tangible personal possessions will become part of my Revocable Living Trust. If any items of tangible personal property I own are not mentioned in the writing, those items will become part of my Revocable Living Trust. If any gift of tangible personal property lapses, then the items comprising the lapsed gift will become part of my Revocable Living Trust.</p>
</div>

<div class="section">
<h3>Section 2.02      Pour-Over to My Revocable Living Trust</h3>
<p>I give all of my probate estate, excluding any property over which I have a power of appointment, after expenses and taxes are paid under this Will, to the then-acting Trustee of the {{TRUST_NAME}} dated {{TRUST_DATE_FORMATTED}} and executed before this Will, to be added to the property of that trust. I direct that the Trustee administer the property according to the trust and any amendments made prior to my death.</p>
</div>

<div class="section">
<h3>Section 2.03      Alternate Disposition</h3>
<p>If the trust referred to in Section 2.02 is not in effect at my death, or if for any other reason the pour over fails, I specifically incorporate by reference all the terms of the trust into this Will. I direct my Personal Representative to then establish a new trust under the provisions of that trust and distribute the remainder of my estate, excluding any property over which I have a power of appointment, to that Trustee to administer as provided in the trust.</p>
<p>If incorporation by reference fails for any reason, I direct my Personal Representative to distribute the remainder of my estate, excluding any property over which I have a power of appointment to those persons who would inherit it had I then died intestate owning the property, as determined and in the proportions provided by the laws of California then in effect.</p>
</div>

<h2>Article Three</h2>
<h3 style="text-align: center; margin: 20px 0;">Designation and Succession of Fiduciaries</h3>

<div class="section">
<h3>Section 3.01      Personal Representative</h3>
{{#IF_JOINT}}
<p>I nominate {{${otherPrefix}_FULL_NAME}} as my Personal Representative. If {{${otherPrefix}_FULL_NAME}} is unwilling or unable to act as my Personal Representative, I nominate {{POUROVER_${prefix}_SUCCESSOR_REP}} as my successor Personal Representative.</p>
{{/IF_JOINT}}
{{#IF_SINGLE}}
<p>I nominate {{POUROVER_${prefix}_SUCCESSOR_REP}} as my Personal Representative.</p>
{{/IF_SINGLE}}
</div>

{{#IF_HAS_MINOR_CHILDREN}}
<div class="section">
<h3>Section 3.02      Guardian</h3>
<p>I appoint {{GUARDIAN_NAME}} as guardian of each child of mine who needs a guardian.</p>
<p>I direct that no guardian be required to give any bond in any jurisdiction. But if a guardian's bond is required by law or by court determination, no sureties will be required on the bond.</p>
</div>

<div class="section">
<h3>Section 3.03      Conservator</h3>
<p>If it becomes necessary to appoint a conservator for the estate of any child of mine, I nominate the child's guardian to serve as conservator of that child's estate.</p>
</div>
{{/IF_HAS_MINOR_CHILDREN}}

<h2>Article Four</h2>
<h3 style="text-align: center; margin: 20px 0;">Powers of Fiduciaries</h3>

<div class="section">
<h3>Section 4.01      Grant of Powers</h3>
<p>My Personal Representative may perform every act reasonably necessary to administer my estate and any trust established under my Will. In addition to this general grant of powers, my Personal Representative is specifically authorized to:</p>
<p class="indent">hold, retain, invest, reinvest, sell, and manage any real or personal property, including interests in any form of business entity including limited partnerships and limited liability companies, and life, health, and disability insurance policies, without diversification as to kind, amount, or risk of non-productivity and without limitation by statute or rule of law;</p>
<p class="indent">partition, sell, exchange, grant, convey, deliver, assign, transfer, lease, option, mortgage, pledge, abandon, borrow, loan, and contract;</p>
<p class="indent">distribute assets of my estate in cash or in kind, or partly in each, at fair market value on the distribution date, without requiring pro rata distribution of specific assets and without requiring pro rata allocation of the tax bases of those assets;</p>
<p class="indent">hold any interest in nominee form, continue businesses, carry out agreements, and deal with itself, other fiduciaries, and business organizations in which my Personal Representative may have an interest;</p>
<p class="indent">access, modify, control, archive, transfer, and delete my digital assets;</p>
<p class="indent">establish reserves, release powers, and abandon, settle, or contest claims; and</p>
<p class="indent">employ attorneys, accountants, custodians for trust assets, and other agents or assistants as my Personal Representative deems advisable to act with or without discretionary powers, and compensate them and pay their expenses from income or principal.</p>
</div>

<div class="section">
<h3>Section 4.02      Powers Granted by State Law</h3>
<p>In addition to the above powers, my Personal Representative may, without prior authority from any court, exercise all powers conferred by my Will, by common law, or by the California Probate Code, Division 7, Part 5, beginning with Section 9600 or other statute of the State of California or any other jurisdiction whose law applies to my Will. My Personal Representative has absolute discretion in exercising these powers. Except as specifically limited by my Will, these powers extend to all property held by my fiduciaries until the actual distribution of the property.</p>
</div>

<div class="section">
<h3>Section 4.03      Distribution Alternatives</h3>
<p>My Personal Representative may make any payments under my Will:</p>
<p class="indent">directly to a beneficiary;</p>
<p class="indent">in any form allowed by applicable state law for gifts or transfers to minors or persons under disability;</p>
<p class="indent">to a beneficiary's guardian, conservator, or caregiver for the beneficiary's benefit; or</p>
<p class="indent">by direct payment of the beneficiary's expenses.</p>
<p>A receipt by the recipient for any distribution will fully discharge my Personal Representative if the distribution is consistent with the proper exercise of my Personal Representative's duties under my Will.</p>
</div>

<h2>Article Five</h2>
<h3 style="text-align: center; margin: 20px 0;">Administrative Provisions</h3>

<div class="section">
<h3>Section 5.01      Court Proceedings</h3>
<p>Any trust established under my Will will be administered in a timely manner; consistent with its terms; free of active judicial intervention; and without order, approval, or other action by any court. The trust will be subject only to the jurisdiction of a court being invoked by the Trustees or by other interested parties, or as otherwise required by law.</p>
</div>

<div class="section">
<h3>Section 5.02      No Bond</h3>
<p>I direct that no Personal Representative be required to give any bond in any jurisdiction. But if a bond is required by law or by court determination, no sureties will be required on the bond.</p>
</div>

<div class="section">
<h3>Section 5.03      Compensation and Reimbursement</h3>
<p>Any fiduciary serving under my Will is entitled to reasonable compensation commensurate with services actually performed. In addition, any fiduciary serving under my Will is entitled to reimbursement for reasonable expenses incurred.</p>
</div>

<div class="section">
<h3>Section 5.04      Ancillary Fiduciary</h3>
<p>If any ancillary administration is required or desired, and my domiciliary Personal Representative is unable or unwilling to act as an Ancillary Fiduciary, my domiciliary Personal Representative may have power to designate, compensate, direct, and remove an Ancillary Fiduciary. The Ancillary Fiduciary may either be a person or a corporation. My domiciliary Personal Representative may delegate to the Ancillary Fiduciary any powers granted to my domiciliary Personal Representative as my domiciliary Personal Representative considers to be proper, including the right to serve without bond or without surety on bond. The net proceeds of the ancillary estate will be paid over to the domiciliary Personal Representative.</p>
</div>

<h2>Article Six</h2>
<h3 style="text-align: center; margin: 20px 0;">Taxes, Claims, and Expenses</h3>

<div class="section">
<h3>Section 6.01      Payment of Death Taxes, Claims, and Expenses</h3>
<p>The Trustee of {{TRUST_NAME}} is authorized to pay expenses incurred for my funeral and for the disposition of my remains, claims against my estate, and expenses of estate administration. Accordingly, I direct my Personal Representative to consult with the Trustee to determine which expenses and claims should be paid by my Personal Representative from property passing under my Will, and which expenses and claims should be paid by the Trustee from {{TRUST_NAME}}.</p>
<p>I direct my Personal Representative to follow any instructions contained in {{TRUST_NAME}} in making any tax elections, including the allocation of my GST Exemption and any elections relative to the deceased spousal unused exclusion amount as defined and to the extent and amount allowable under Sections 2010(c)(4) and (5) of the Internal Revenue Code, all as my Personal Representative deems appropriate under then prevailing circumstances. My Personal Representative will suffer no liability for making or not making any tax election in good faith to any person, including any person not yet in being, whose interest may have been affected.</p>
<p>Any taxes imposed on property passing under and outside my Will because of my death will be apportioned and paid under the provisions of {{TRUST_NAME}}, and I incorporate the tax apportionment provisions of {{TRUST_NAME}} as part of my Will.</p>
<p>No death taxes may be allocated to or paid from property that is not included in my gross estate for federal estate tax purposes, or that qualifies for the federal estate tax marital or charitable deductions.</p>
</div>

<div class="section">
<h3>Section 6.02      Tax and Administrative Elections</h3>
<p>My Personal Representative may exercise any available elections under any applicable income, inheritance, estate, succession, or gift tax law.</p>
<p>This authority includes the power to select any alternate valuation date for death tax purposes and the power to determine whether to use any estate administration expenses as estate or income tax deductions. No compensating adjustments are required between income and principal as a result of those determinations unless my Personal Representative determines otherwise, or unless required by law.</p>
<p>My Personal Representative may elect to have any part of the property in my estate qualify for the federal estate tax marital deduction as qualified terminable interest property under Internal Revenue Code Section 2056(b)(7) (the QTIP Election).</p>
{{#IF_JOINT}}
<p>Any tax paid as a result of the inclusion in my taxable estate of property held in a qualified terminable interest property (QTIP) trust created for me by my {{${prefix}_SEX_REF === 'his' ? 'wife' : 'husband'}} will be apportioned to and collected from the qualified terminable interest property (QTIP) as provided in Section 2207A. But my Personal Representative may waive this right of recovery. To the extent my {{${prefix}_SEX_REF === 'his' ? 'wife\'s' : 'husband\'s'}} Will or other governing instrument provides for payment of the tax, my Personal Representative will pursue any right of reimbursement in a manner consistent with that provision.</p>
{{/IF_JOINT}}
<p>My Personal Representative is not liable to any beneficiary of my estate for tax consequences that arise as a result of the exercise or nonexercise of any tax elections, or for decisions made concerning the distribution of property in kind in full or partial satisfaction of any beneficiary's interest in my estate.</p>
</div>

<h2>Article Seven</h2>
<h3 style="text-align: center; margin: 20px 0;">General Provisions</h3>

<div class="section">
<h3>Section 7.01      Adopted and Afterborn Persons</h3>
<p>A legally adopted person in any generation and that person's descendants, including adopted descendants, have the same rights and will be treated in the same manner under this Will as natural children of the adopting parent if the person is legally adopted before turning 18 years old. If an adoption was legal in the jurisdiction it occurred in at that time, then the adoption is considered legal.</p>
<p>A fetus in utero that is later born alive will be considered a person in being during the period of gestation.</p>
</div>

<div class="section">
<h3>Section 7.02      Applicable Law</h3>
<p>The validity and construction of my Will will be determined by the laws of California.</p>
</div>

<div class="section">
<h3>Section 7.03      No Contract to Make Will</h3>
<p>I have not entered into any contract, actual or implied, to make a Will.</p>
</div>

<div class="section">
<h3>Section 7.04      Contest Provision</h3>
<p>If any person directly or indirectly attempts to oppose the validity of my Will or my Revocable Living Trust, including any amendments to my trust, or commences, continues, or prosecutes any legal proceedings to set my Will or Revocable Living Trust aside, then that person will forfeit his or her share, will cease to have any right or interest in my property, and will be considered to have predeceased me for the purposes of my Will.</p>
<p>But during any period in which the laws of the State of California govern the applicability or validity of this provision, Section 21311 of the California Probate Code will apply, and my Personal Representative may only enforce this provision against any of the following types of contests:</p>
<p class="indent">a direct contest brought by any beneficiary without probable cause;</p>
<p class="indent">any pleading by any beneficiary to challenge a transfer of property on the grounds that the transferor did not own the property at the time of the transfer; and</p>
<p class="indent">any filing of a creditor's claim or prosecution of any action based on the filing of such a claim.</p>
<p>The terms <i>direct contest</i>, and <i>pleading</i> have the same meanings as set forth in Section 21310 of the California Probate Code. My Will and any trusts created under my Will are protected instruments as provided in Section 21310(e) of the California Probate Code.</p>
</div>

<div class="section">
<h3>Section 7.05      Construction</h3>
<p>Unless the context requires otherwise, words denoting the singular may denote the plural, and words indicating the plural may denote the singular. As the context requires, words of one gender may denote another gender.</p>
</div>

<div class="section">
<h3>Section 7.06      Headings and Titles</h3>
<p>The headings and paragraph titles are for reference only.</p>
</div>

<div class="section">
<h3>Section 7.07      Internal Revenue Code, IRC, or Code</h3>
<p>References to the Internal Revenue Code, the IRC or the Code refer to the Internal Revenue Code of the United States. References to specific sections of the Code apply to any sections of similar import that replace the specific sections due to changes to the Internal Revenue Code made after the date of my Will.</p>
</div>

<div class="section">
<h3>Section 7.08      Shall and May</h3>
<p>Unless otherwise specifically provided in this document or by the context in which used, the word <i>shall</i> is used to impose a duty or to command, direct, or require, and the word <i>may</i> is used to allow or permit, but not require. In the context of the Trustee or my Personal Representative, the word <i>shall</i> is used to impose a fiduciary duty on the Trustee or my Personal Representative. When I use the word <i>may</i>, I intend to empower the Trustee or my Personal Representative to act with sole and absolute discretion unless otherwise stated in this document.</p>
</div>

<div class="section">
<h3>Section 7.09      Other Definitions</h3>
<p>Except as otherwise provided in my Will, terms will be interpreted as defined in the California Probate Code as amended after the date of my Will and after my death.</p>
</div>

<div class="section">
<h3>Section 7.10      Survivorship</h3>
{{#IF_JOINT}}
<p>For purposes of this Will, if my {{${prefix}_SEX_REF === 'his' ? 'wife' : 'husband'}} survives me by any period of time, or if the order of our deaths is unknown, then my {{${prefix}_SEX_REF === 'his' ? 'wife' : 'husband'}} will be considered to have survived me. Any other beneficiary will be considered to have predeceased me if the beneficiary dies within 45 days after my death.</p>
{{/IF_JOINT}}
{{#IF_SINGLE}}
<p>Any beneficiary will be considered to have predeceased me if the beneficiary dies within 45 days after my death.</p>
{{/IF_SINGLE}}
</div>

<div class="section">
<h3>Section 7.11      Severability</h3>
<p>If any part of this instrument is determined to be void or invalid, the remaining provisions will continue in full force and effect.</p>
</div>

<div class="signature-area">
<p>I, {{${prefix}_FULL_NAME}}, sign my name to this instrument on {{TRUST_DATE_FORMATTED}} and do declare that I sign and execute this instrument as my Will, that I sign it willingly, that I execute it as my free and voluntary act for the purposes therein expressed, and that I am eighteen years of age or older, of sound mind, and under no constraint or undue influence. I ask the persons who sign below to be my witnesses.</p>

<div style="margin-top: 40px;">
_______________________________<br/>
{{${prefix}_FULL_NAME}}
</div>
</div>

<div class="witness-block">
<p>Each of us declares under penalty of perjury under the laws of the State of California that on the day and year written below, {{${prefix}_FULL_NAME}}, published and declared this instrument to be {{${prefix}_SEX_REF}} Will, that {{${prefix}_SEX_REF === 'his' ? 'he' : 'she'}} signed this Will in our presence, that each of us, in {{${prefix}_SEX_REF}} presence and at {{${prefix}_SEX_REF}} request, and in the presence of each other, have signed our names as attesting witnesses. We also declare that each of us is now more than eighteen years of age, is a competent witness, and resides at the address set forth after his or her name.</p>

<p>We also declare that at the time of our attestation of this Will, {{${prefix}_FULL_NAME}} was, to our best knowledge and belief, of sound mind and memory, eighteen years of age or older, and that this Will was not procured by duress, menace, fraud, misrepresentation, constraint or undue influence.</p>

<p>Executed on {{TRUST_DATE_FORMATTED}} in the County of ___________________________, California.</p>

<div style="margin-top: 40px;">
<table width="100%" style="border-collapse: collapse;">
<tr>
<td width="50%" style="vertical-align: top; padding-right: 20px;">
_________________________________<br/>
__________________________, Witness<br/>
_________________________________<br/>
</td>
<td width="50%" style="vertical-align: top; padding-left: 20px;">
_________________________________<br/>
__________________________, Witness<br/>
_________________________________<br/>
</td>
</tr>
</table>
</div>
</div>

</body>
</html>
  `.trim();
};
