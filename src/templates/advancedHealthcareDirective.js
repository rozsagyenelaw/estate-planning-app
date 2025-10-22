export const advancedHealthcareDirectiveTemplate = (personType = 'client') => {
  const prefix = personType === 'client' ? 'CLIENT' : 'SPOUSE';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 1in; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
    h1 { text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0; }
    h2 { font-size: 12pt; font-weight: bold; margin: 15px 0 10px 0; text-align: center; }
    h3 { font-size: 12pt; font-weight: bold; margin: 10px 0; }
    p { margin: 10px 0; text-align: justify; text-indent: 0.5in; }
    .signature-line { margin: 30px auto 5px auto; width: 300px; border-top: 1px solid #000; text-align: center; }
    .indent-1 { margin-left: 0.5in; text-indent: 0; }
  </style>
</head>
<body>

<h1>Advance Health Care Directive<br/>of<br/>{{${prefix}_FULL_NAME}}</h1>

<p>I, {{${prefix}_FULL_NAME}}, the principal, an adult of sound mind, execute this Advance Health Care Directive freely and voluntarily, with an understanding of its purposes and consequences.  I intend to create a medical durable power of attorney under the laws of the State of California.  I further intend to demonstrate my wishes concerning medical treatment with clear and convincing evidence.  I hereby revoke any Advance Health Care Directive previously granted by me as principal except powers granted by me under any state statutory Advance Health Care Directive.</p>

<h2>Article One</h2>
<h3 style="text-align: center;">Recitals</h3>

<div>
<h3>Section 1.01      Designation of Health Care Agent</h3>
<p>I designate the individual named below to serve as my Health Care Agent.  I give my Health Care Agent the power to make decisions with regard to my health care if I am unable to make my own health care decisions.</p>

{{#IF_JOINT}}
<p style="text-indent: 0; margin-left: 0.5in;">Name:    {{${personType === 'client' ? 'SPOUSE_FULL_NAME' : 'CLIENT_FULL_NAME'}}}<br/>
Address:    {{${personType === 'client' ? 'SPOUSE' : 'CLIENT'}_ADDRESS}}<br/>
Phone:    ____________________</p>

<p>If {{${personType === 'client' ? 'SPOUSE_FULL_NAME' : 'CLIENT_FULL_NAME'}}} is unwilling or unable to serve, I designate the individual listed below as alternate Health Care Agent, to exercise the powers and discretions set forth in this instrument.</p>

<p style="text-indent: 0; margin-left: 0.5in;">Name:    {{HEALTHCARE_SUCCESSOR_NAME}}<br/>
Address:    {{HEALTHCARE_SUCCESSOR_ADDRESS}}<br/>
Phone:    ____________________</p>
{{/IF_JOINT}}

{{#IF_SINGLE}}
<p style="text-indent: 0; margin-left: 0.5in;">Name:    {{HEALTHCARE_AGENT_NAME}}<br/>
Address:    {{HEALTHCARE_AGENT_ADDRESS}}<br/>
Phone:    ____________________</p>

<p>If {{HEALTHCARE_AGENT_NAME}} is unwilling or unable to serve, I designate the individual listed below as alternate Health Care Agent, to exercise the powers and discretions set forth in this instrument.</p>

<p style="text-indent: 0; margin-left: 0.5in;">Name:    {{HEALTHCARE_SUCCESSOR_NAME}}<br/>
Address:    {{HEALTHCARE_SUCCESSOR_ADDRESS}}<br/>
Phone:    ____________________</p>
{{/IF_SINGLE}}
</div>

<div>
<h3>Section 1.02      Duration</h3>
<p>This Advance Health Care Directive expires at the earliest of:</p>
<p class="indent-1">my death (except for post-death matters allowed under California law); or</p>
<p class="indent-1">my revocation of this Advance Health Care Directive.</p>
<p>However, the medical information and medical records provisions described in Section 2.04 continue in effect for an additional 24 months from the date of my death unless revoked.  My Health Care Agent's authority does not terminate if I become disabled or incapacitated.</p>
</div>

<div>
<h3>Section 1.03      General Grant</h3>
<p>My Health Care Agent may determine and implement all actions necessary for my personal care, residential placement, and medical treatment, including the items specifically mentioned in this instrument.  If my Health Care Agent is not available, I intend to guide decisions about my care and treatment with the following statements.</p>
</div>

<div>
<h3>Section 1.04      Effect on Legal Capacity</h3>
<p>A formal adjudication of my incapacity is not required for my Health Care Agent to exercise the authority granted by me under this instrument.</p>
</div>

<h2>Article Two</h2>
<h3 style="text-align: center;">Health and Personal Powers</h3>

<div>
<h3>Section 2.01      Instructions Concerning Medical Evaluations and Treatment</h3>
<p>In exercising the authority granted to my Health Care Agent, I instruct my Health Care Agent to discuss with me the specifics of any proposed decision regarding my medical care and treatment if I am able to communicate in any manner however rudimentary, even by blinking my eyes.  I further instruct my Health Care Agent that if I am unable to give an informed consent to medical treatment, my Health Care Agent shall give or withhold consent based upon any treatment choices I have expressed while competent, whether under this instrument or otherwise.  If my Health Care Agent cannot determine the treatment choice I would want made under the circumstances, then I request that my Health Care Agent make the choice for me based upon what my Health Care Agent believes to be in my best interests.</p>

<p>I want to leave my family, friends, and persons who care about me with assurances of my love, and without the burdens of guilt or conflict.  My purposes in leaving these instructions are to alleviate uncertainty that otherwise may arise in connection with decisions about my medical care, to promote family harmony, and to clarify instructions to my health care providers.  My Health Care Agent's authority to act on my behalf concerning my medical care includes decisions concerning artificial life support, medical treatment, surgery and other medical procedures; artificial nourishment and hydration; resuscitation decisions (including Do Not Resuscitate [DNR] orders and Cardiopulmonary Resuscitation [CPR] directives); amputation of my limbs; blood transfusions; experimental drugs and medical procedures; the administration of pharmaceutical agents; arrangements for my longterm care.</p>

<p>I affirm my belief in the importance and value of my personal dignity, both in living and in dying.</p>
</div>

<div>
<h3>Section 2.02      Longterm or Hospice Care</h3>
<p>My Health Care Agent may select a facility for my nursing, convalescent, or hospice care and establish my residence and placement in a secure unit therein if the facility provides the quality of care appropriate for my medical needs and mental condition.  For the purposes of arranging or providing longterm care, my Health Care Agent has authority to facilitate my transportation and establish my legal residence within or beyond the state of California.</p>
</div>

<div>
<h3>Section 2.03      Maintain Me in My Residence</h3>
<p>I authorize my Health Care Agent to take whatever steps are necessary or advisable to enable me to remain in my personal residence as long as it is reasonable under the circumstances.  I realize that my health may deteriorate so that it becomes necessary to have round-the-clock nursing care if I am to remain in my personal residence, and I direct my Health Care Agent to obtain that care, including any equipment that might assist in my care, as is reasonable under the circumstances.  Specifically, I do not want to be hospitalized or put in a convalescent or similar home as long as it is reasonable to maintain me in my personal residence.</p>
</div>

<div>
<h3>Section 2.04      Medical Information and Medical Records</h3>
<p>Acting on my behalf, my Health Care Agent may have access to all of my medical information and photocopies of my medical records from my health care providers including physicians, dentists, podiatrists, physical therapists, chiropractic physicians and chiropractors, pharmacists, optometrists, psychologists, social workers, hospitals, hospices, and other treatment facilities; may disclose medical and related information concerning my treatment to appropriate health care providers; and may admit or transfer me to such hospitals, hospices, or treatment facilities as my Health Care Agent determines to be in my best interests.</p>
<p>In order for my Health Care Agent to fulfill his or her duties, my treating physician or hospital is to discuss my medical condition with and disclose all medical records to my Health Care Agent.</p>
</div>

<div>
<h3>Section 2.05      Employ and Discharge Health Care Personnel</h3>
<p>My Health Care Agent may employ and discharge medical personnel including physicians, psychiatrists, dentists, nurses, and therapists as my Health Care Agent determines necessary for my physical, mental, and emotional well-being, and pay them reasonable compensation.</p>
</div>

<div>
<h3>Section 2.06      Pain Relief</h3>
<p>I want to ensure that my Health Care Agent and physician protect my comfort and freedom from pain insofar as possible.  I authorize my Health Care Agent to consent on my behalf to the administration of whatever pain-relieving drugs and pain-relieving surgical procedures my Health Care Agent, upon medical advice, believes may provide comfort to me, even though such drugs or procedures may lead to pharmaceutical addictions, lower blood pressure, lower levels of breathing, or hasten my death.  Even if artificial life support or aggressive medical treatment has been withdrawn or refused, I want to be kept as comfortable as possible, and I do not want to be neglected by medical or nursing staff.</p>
</div>

<div>
<h3>Section 2.07      Grant Releases</h3>
<p>My Health Care Agent may grant, in conjunction with any instructions given under this instrument, releases from all liability for damages suffered or to be suffered by me to hospital staff, physicians, nurses, and other medical and hospital administrative personnel who act in reliance on instructions given by my Health Care Agent or who render written opinions to my Health Care Agent in connection with any matter described in this instrument.  My Health Care Agent may sign documents titled or purporting to be a <i>Refusal to Permit Treatment and Leaving Hospital Against Medical Advice</i> as well as any necessary waivers of or releases from liability required by any hospital or physician to implement my wishes regarding medical treatment or nontreatment.</p>
</div>

<div>
<h3>Section 2.08      Living Will</h3>
<p>I have not executed a Living Will and I do not want my Health Care Agent's powers to be limited by the terms or conditions of a Living Will.</p>
<p>If I become unconscious or incompetent in a state where this Advance Health Care Directive is not enforceable, I authorize my Health Care Agent to transport me or arrange for my transportation to a jurisdiction where my medical directives will be enforceable.</p>
</div>

<div>
<h3>Section 2.09      Anatomical Gifts</h3>
{{#IF_ANATOMICAL_GIFTS_NONE}}
<p>I do not authorize my Health Care Agent to make any anatomical gifts on my behalf.</p>
{{/IF_ANATOMICAL_GIFTS_NONE}}

{{#IF_ANATOMICAL_GIFTS_TRANSPLANT_ONLY}}
<p>I authorize my Health Care Agent to make anatomical gifts of my organs and tissues for transplantation purposes only.  Upon my death, I wish to donate any needed organs or tissues for the purpose of transplantation to help save or improve the lives of others.</p>
{{/IF_ANATOMICAL_GIFTS_TRANSPLANT_ONLY}}

{{#IF_ANATOMICAL_GIFTS_RESEARCH_ONLY}}
<p>I authorize my Health Care Agent to make anatomical gifts of my body, organs, and tissues for research purposes only.  Upon my death, I wish to donate my body and/or organs and tissues for the advancement of medical science and education.</p>
{{/IF_ANATOMICAL_GIFTS_RESEARCH_ONLY}}

{{#IF_ANATOMICAL_GIFTS_TRANSPLANT_OR_RESEARCH}}
<p>I authorize my Health Care Agent to make anatomical gifts of my organs and tissues for either transplantation or research purposes.  Upon my death, I wish to donate any needed organs or tissues for transplantation purposes if viable for such use, or alternatively for research and educational purposes.</p>
{{/IF_ANATOMICAL_GIFTS_TRANSPLANT_OR_RESEARCH}}

{{#IF_ANATOMICAL_GIFTS_ANY_PURPOSE}}
<p>I authorize my Health Care Agent to make anatomical gifts of my body, organs, and tissues for any legal purpose including transplantation, research, education, or any other use permitted by law.  Upon my death, I wish to donate my body and/or organs and tissues for any legal purpose that may benefit others or advance medical knowledge.</p>
{{/IF_ANATOMICAL_GIFTS_ANY_PURPOSE}}
</div>

<h2>Article Three</h2>
<h3 style="text-align: center;">Legal and Administrative Powers and Provisions</h3>

<div>
<h3>Section 3.01      Health Insurance Portability and Accountability Act</h3>
<p>I grant my Health Care Agent the power and authority to serve as my authorized recipient for all purposes of the Health Insurance Portability and Accountability Act (HIPAA) of 1996 and its regulations during any time my health care representative is exercising authority under this document.</p>
<p>Pursuant to HIPAA, I specifically authorize my Health Care Agent as my HIPAA-authorized recipient to request, receive, and review any information regarding my physical health, including all HIPAA-protected health information, medical, and hospital records; to execute on my behalf any authorizations, releases, or other documents that may be required to obtain this information; and to consent to the disclosure of this information.  I further authorize my Health Care Agent to execute on my behalf valid authorizations for the release of HIPAA-protected health information.</p>
<p>By signing this Advance Health Care Directive, I specifically authorize my physician, hospital, or health care provider to release any medical records to my Health Care Agent or any person designated in a valid authorization for the release of HIPAA-protected health information executed by my Health Care Agent.  Further, I waive any liability to any physician, hospital, or health care provider that releases any of my medical records to my Health Care Agent and acknowledge that the health information that would otherwise be protected under HIPAA will no longer be protected.</p>
</div>

<div>
<h3>Section 3.02      Guardian</h3>
<p>My Health Care Agent's authority precludes the need for appointment of a Guardian.  But if any proceeding is commenced for the appointment of a Guardian, I nominate my Health Care Agent to serve as Guardian.</p>
</div>

<div>
<h3>Section 3.03      Third-Party Reliance</h3>
<p>My Health Care Agent's instructions and decisions regarding my medical treatment are binding on third parties.  No person, medical facility, or institution will incur any liability to me or to my estate by complying with my Health Care Agent's instructions.  My Health Care Agent is authorized to execute consents, waivers, and releases of liability on my behalf and on behalf of my estate to all medical personnel who comply with my Health Care Agent's instructions.  Furthermore, I authorize my Health Care Agent to indemnify and hold harmless, at my expense, any third party who accepts and acts under this Advance Health Care Directive, and I agree to be bound by any indemnity entered into by my Health Care Agent.</p>
</div>

<div>
<h3>Section 3.04      Enforcement by Health Care Agent</h3>
<p>I authorize my Health Care Agent to seek on my behalf and at my expense:</p>
<p class="indent-1">a declaratory judgment from any court of competent jurisdiction interpreting the validity of this instrument or any of the acts authorized by this instrument, but a declaratory judgment is not required for my Health Care Agent to perform any act authorized by this instrument;</p>
<p class="indent-1">an injunction requiring compliance with my Health Care Agent's instructions by any person providing medical or personal care to me; or</p>
<p class="indent-1">actual and punitive damages against any person responsible for providing medical or personal care to me who willfully fails or refuses to follow my Health Care Agent's instructions.</p>
</div>

<div>
<h3>Section 3.05      Release of Health Care Agent's Personal Liability</h3>
<p>My Health Care Agent will not incur any personal liability to me or my estate arising from the good faith exercise of discretion or performance of acts and duties relating to my medical treatment and personal care.</p>
</div>

<div>
<h3>Section 3.06      Reimbursement of Health Care Agent</h3>
<p>My Health Care Agent is entitled to reimbursement for all reasonable expenses arising from the performance of acts and duties relating to my medical treatment and personal care under this instrument.</p>
</div>

<div>
<h3>Section 3.07      Copies Effective as Originals</h3>
<p>Photocopies of this instrument are effective and enforceable as originals, and third parties are entitled to rely on photocopies of this instrument for the full force and effect of all stated terms.  The word <i>photocopies</i> includes facsimiles, digital, or other reproductions.</p>
</div>

<div>
<h3>Section 3.08      Interstate Enforceability</h3>
<p>My intention is that the terms of this instrument be honored in any jurisdiction, regardless of its conformity to that jurisdiction's technical requirements and legal formalities.</p>
</div>

<div>
<h3>Section 3.09      Amendment and Revocation</h3>
<p>I reserve the right to revoke my Health Care Agent's authority orally or in writing.</p>
</div>

<div>
<h3>Section 3.10      Revocation of Prior Powers</h3>
<p>Unless specifically excepted in this instrument, this Advance Health Care Directive supersedes any prior medical durable power of attorney that I have executed.  But this instrument does not affect any other unrelated powers previously conveyed by me through general or limited powers of attorney; these powers are to continue in full force until revoked by me or otherwise terminated.</p>
</div>

<h2>Article Four</h2>
<h3 style="text-align: center;">Definitions</h3>

<div>
<h3>Section 4.01      Shall and May</h3>
<p>Unless otherwise specifically provided in this document or by the context in which used, I use the word <i>shall</i> in this document to impose a duty, command, direction, or requirement, and the word <i>may</i> to allow or permit, but not require.  In the context of my Health Care Agent, when I use the word <i>shall</i>, I intend to impose a fiduciary duty on my Health Care Agent.  When I use the word <i>may</i>, I intend that my Health Care Agent is empowered to act with sole and absolute discretion unless otherwise stated in this document.</p>
</div>

<div class="signature-block" style="margin-top: 50px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{${prefix}_FULL_NAME}}, Principal
</div>
</div>

<div class="notary-block" style="margin-top: 40px; border: 1px solid #000; padding: 15px;">
<p style="text-indent: 0;"><i>A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.</i></p>

<p style="text-indent: 0;"><b>State of California</b><br/>
<b>County of</b>  {{${prefix}_COUNTY}}</p>

<p style="text-indent: 0;">On {{TRUST_DATE_FORMATTED}} before me, ______________________________ (here insert name and title of the officer), personally appeared {{${prefix}_FULL_NAME}}, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.</p>

<p style="text-indent: 0;">I certify under PENALTY of PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>

<p style="text-indent: 0;">WITNESS my hand and official seal.</p>

<p style="text-indent: 0;">Signature  ________________________________                 (Seal)</p>
</div>

</body>
</html>
  `.trim();
};
