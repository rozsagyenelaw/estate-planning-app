export const hipaaAuthorizationTemplate = (personType = 'client') => {
  const prefix = personType === 'client' ? 'CLIENT' : 'SPOUSE';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 1in; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
    h1 { text-align: center; font-size: 13pt; font-weight: bold; margin: 20px 0; }
    p { margin: 10px 0; text-align: justify; text-indent: 0; }
    .signature-line { margin: 30px auto 5px auto; width: 300px; border-top: 1px solid #000; text-align: center; }
    .indent-1 { margin-left: 0.5in; }
  </style>
</head>
<body>

<h1>Authorization for Release of {{${prefix}_FULL_NAME}}'s Protected Health Information<br/>
(Valid Authorization Under 45 CFR Chapter 164 and the California Confidentiality of Medical Information Act ("CMIA"))</h1>

<p><b>Statement of Intent:</b>  I understand that Congress passed a law entitled the Health Insurance Portability and Accountability Act (HIPAA) that limits use, disclosure, or release of my individually identifiable health information, as HIPAA and the supporting Regulations define that phrase.  I am signing this authorization because it is crucial that my health care providers readily use, release, or disclose my protected medical information to, or as directed by, that person or those persons designated in this authorization.  This authorization allows the designated persons to discuss with and obtain advice from others or to facilitate decisions regarding my health care when I otherwise may not be able to do so without regard to whether any health care provider has certified in writing that I am incompetent for purposes of California Probate Code Sections 4235, 4682 and 4690.</p>

<p><b>1.    Appointment of Authorized Recipients</b></p>

<p>Therefore, I, {{${prefix}_FULL_NAME}}, an individual, appoint the following persons, or either of them, as Authorized Recipients for health care disclosure under the Standards for Privacy of Individually Identifiable Health Care Information (45 CFR Parts 160 and 164) under the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the California Confidentiality of Medical Information Act ("CMIA"):</p>

{{#IF_JOINT}}
<p class="indent-1">{{${personType === 'client' ? 'SPOUSE_FULL_NAME' : 'CLIENT_FULL_NAME'}}};</p>
{{/IF_JOINT}}

{{#EACH_HIPAA_AGENTS}}
<p class="indent-1">{{HIPAA_AGENT_NAME}}; and</p>
{{/EACH_HIPAA_AGENTS}}

<p class="indent-1">the Trustee or Successor Trustee of any trust of which I am a beneficiary or a trustee, for the sole specific purpose of determining my capacity as defined in the trust document.</p>

<p><b>2.    Grant of Authority</b></p>

<p>I authorize all my HIPAA-defined covered entities to use, release, and disclose my individually identifiable health information to my Authorized Recipients under 45 CFR Sec(s). 164.502(a)(1)(i) and (iv), 164.502(a)(2)(i), 164.524 and 164.528, including medical reports and records concerning my medical history, condition, diagnosis, testing, prognosis, treatment, billing information, and identity of health care providers, whether past, present, or future, as well as any other information that is in any way related to my health care except as specifically limited as to any Authorized Recipient named in Paragraph 1 above.</p>

<p>This disclosure includes the authority to ask questions and discuss my individually identifiable health information with the person or entity that has possession of my individually identifiable health information even if I am fully competent to ask questions and discuss this matter at the time.</p>

<p>I intend to give a full authorization for access to, disclosure of, and release of any of my protected medical information that relates directly or indirectly to my capacity to make rational and reasonable decisions regarding my health care by or to the persons named in this authorization as if each person were me.</p>

<p><b>3.    Covered Entity</b></p>

<p><i>Covered entity</i> means any entity specifically defined by HIPAA or the supporting Regulations including any physician, podiatrist, chiropractor, osteopathic physician, health care professional, dentist, hospital, clinic, laboratory, pharmacy, ambulance service, assisted living facility, nursing home or other covered health care provider, any insurance company, and the Medical Information Bureau Inc. or other health care clearinghouse that has provided treatment or services to me, or that has paid for or is seeking payment from me for such services.</p>

<p><b>4.    Termination</b></p>

<p>My subsequent disability or incapacity will neither affect nor terminate this authorization.  This authorization will terminate upon my death or my written revocation expressly referring to this authorization and the date it is actually received by the covered entity.  Proof of receipt of my written revocation may be by certified mail, registered mail, facsimile, or any other receipt evidencing actual receipt by the covered entity.  This revocation is effective upon the actual receipt of the notice by the covered entity except to the extent that the covered entity has taken action in reliance on it.</p>

<p><b>5.    Redisclosure</b></p>

<p>By signing this authorization, I acknowledge that the information used, disclosed, or released under this authorization may be subject to redisclosure by an Authorized Recipient and the information once disclosed will no longer be protected under HIPAA.  No covered entity may require an Authorized Recipient to indemnify the covered entity or agree to perform any act in order for the covered entity to comply with this authorization.</p>

<p><b>6.    Instructions to the Authorized Recipients</b></p>

<p>An Authorized Recipient may bring a legal action in any applicable forum against any covered entity that refuses to recognize and accept this authorization for the purposes that I have expressed.  Additionally, an Authorized Recipient is authorized to sign any documents that the Authorized Recipient considers appropriate to obtain use, disclosure, or release of my individually identifiable health information.</p>

<p><b>7.    Effect of Duplicate Originals or Copies</b></p>

<p>If I have executed this authorization in multiple counterparts, each counterpart original will have equal force and effect.  An Authorized Recipient may make photocopies (photocopies include facsimiles and digital or other reproductions referred to collectively as photocopy) of this authorization and each photocopy will have the same force and effect as the original.</p>

<p><b>8.    My Waiver and Release</b></p>

<p>With regard to information disclosed under this authorization, I waive any right of privacy that I may have under the authority of the Health Insurance Portability and Accountability Act of 1996, Public Law 104-191 (HIPAA), any amendment or successor to that Act, or any similar state or federal act, rule, or regulation.  In addition, I release any covered entity that acts in reliance on this authorization from any liability that may accrue from the use or disclosure of my individually identifiable health information in reliance upon this authorization and for any actions taken by an Authorized Recipient.</p>

<p><b>9.    Severability</b></p>

<p>I intend to create an authorization that conforms to United States and California law.  In the event that any provision of this document is invalid, the remaining provisions remain in full force.</p>

<p>I understand that signing this authorization for disclosure is voluntary. A covered entity may not condition my treatment, payment, enrollment in a health plan, or eligibility for benefits upon my signing of this authorization.</p>

<p>I understand that I have the right to receive a copy of this authorization.  I also understand that I have the right to revoke this authorization and that any revocation of this authorization must be in writing.</p>

<div class="signature-block" style="margin-top: 50px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{${prefix}_FULL_NAME}}, Principal<br/>
DOB: {{${prefix}_DOB_FORMATTED}}
</div>
</div>

<div class="notary-block" style="margin-top: 40px; border: 1px solid #000; padding: 15px;">
<p><i>A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.</i></p>

<p><b>State of California</b><br/>
<b>County of</b>  {{${prefix}_COUNTY}}</p>

<p>On {{TRUST_DATE_FORMATTED}} before me, ______________________________ (here insert name and title of the officer), personally appeared {{${prefix}_FULL_NAME}}, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.</p>

<p>I certify under PENALTY of PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>

<p>WITNESS my hand and official seal.</p>

<p>Signature  ________________________________                 (Seal)</p>
</div>

</body>
</html>
  `.trim();
};
