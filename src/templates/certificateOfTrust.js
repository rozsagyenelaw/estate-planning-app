export const certificateOfTrustTemplate = () => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 1in; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
    h1 { text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0; }
    p { margin: 10px 0; text-align: justify; text-indent: 0; }
    .signature-line { margin: 30px auto 5px auto; width: 300px; border-top: 1px solid #000; text-align: center; }
  </style>
</head>
<body>

<h1>Certification of Trust for<br/>{{TRUST_NAME}} dated {{TRUST_DATE_FORMATTED}}</h1>

<p>{{TRUST_NAME}} (the Trust) was established on {{TRUST_DATE_FORMATTED}}.  The Grantor{{#IF_JOINT}}s{{/IF_JOINT}} of the Trust {{#IF_JOINT}}are{{/IF_JOINT}}{{#IF_SINGLE}}is{{/IF_SINGLE}} {{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}.  {{#IF_REVOCABLE}}The Trustee{{#IF_JOINT}}s are{{/IF_JOINT}}{{#IF_SINGLE}} is{{/IF_SINGLE}} {{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}} (referred to collectively as the Trustee).{{/IF_REVOCABLE}}{{#IF_IRREVOCABLE}}The Trustee is {{TRUSTEE_NAME}}.{{/IF_IRREVOCABLE}}</p>

{{#IF_IRREVOCABLE}}
<p>This Trust is irrevocable and cannot be amended or revoked by the Grantor{{#IF_JOINT}}s{{/IF_JOINT}}.</p>
{{/IF_IRREVOCABLE}}

{{#IF_REVOCABLE}}
{{#IF_JOINT}}
<p>This Trust is revocable and amendable by {{CLIENT_FULL_NAME}} and {{SPOUSE_FULL_NAME}}, acting jointly</p>
{{/IF_JOINT}}
{{#IF_SINGLE}}
<p>This Trust is revocable and amendable by {{CLIENT_FULL_NAME}}</p>
{{/IF_SINGLE}}
{{/IF_REVOCABLE}}

{{#IF_IRREVOCABLE}}
<p>The Trustee{{#IF_JOINT}}s are{{/IF_JOINT}}{{#IF_SINGLE}} is{{/IF_SINGLE}} {{TRUSTEE_NAME}}. {{#IF_JOINT}}Neither Grantor{{/IF_JOINT}}{{#IF_SINGLE}}The Grantor{{/IF_SINGLE}} may not serve as Trustee.</p>
{{/IF_IRREVOCABLE}}

{{#IF_REVOCABLE}}
<p>The address of {{CLIENT_FULL_NAME}},Trustee, is {{CLIENT_ADDRESS}}.</p>

{{#IF_JOINT}}
<p>The address of {{SPOUSE_FULL_NAME}},Trustee, is {{SPOUSE_ADDRESS}}.</p>
{{/IF_JOINT}}
{{/IF_REVOCABLE}}

{{#IF_REVOCABLE}}
<p>The tax identification number of the Trust is the Social Security number of {{#IF_JOINT}}either Grantor{{/IF_JOINT}}{{#IF_SINGLE}}the Grantor{{/IF_SINGLE}}.</p>
{{/IF_REVOCABLE}}

{{#IF_IRREVOCABLE}}
<p>The tax identification number of the Trust is: Trust Tax ID (EIN): __________</p>
{{/IF_IRREVOCABLE}}

<p>Title to assets in the Trust will be taken as follows:</p>

<p style="margin-left: 0.5in;">{{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}, Trustees, or their successors in interest, of {{TRUST_NAME}} dated {{TRUST_DATE_FORMATTED}}, and any amendments thereto.</p>

<p>In addition, for titling purposes, any description referring to the Trust is effective if it includes the name of the Trust, the name of at least one initial or successor Trustee, and any reference indicating that property is being held by my Trustee in a fiduciary capacity.</p>

<p>The Trustee under the trust is authorized to acquire, sell, convey, encumber, lease, borrow, manage, and otherwise deal with interests in real and personal property in trust name.</p>

<p>{{TRUST_NAME}} has not been revoked, modified, or amended in any way that would cause the representations in this Certification of Trust to be incorrect.</p>

<p>By signing below, {{#IF_REVOCABLE}}{{#IF_JOINT}}we each{{/IF_JOINT}}{{#IF_SINGLE}}I{{/IF_SINGLE}}{{/IF_REVOCABLE}}{{#IF_IRREVOCABLE}}the undersigned Trustee{{/IF_IRREVOCABLE}} declare{{#IF_REVOCABLE}}{{#IF_SINGLE}}s{{/IF_SINGLE}}{{/IF_REVOCABLE}} under penalty of perjury under the laws of the State of California that the foregoing declarations are true.</p>

<p style="margin-top: 30px; font-weight: bold;">RELIANCE ON THIS CERTIFICATION</p>

<p>This certification is made under California Probate Code Section 18100.5 and California Commercial Code Section 8402(a)(2)-(5) and is signed by all the currently acting Trustees.  Any transaction entered into by a person acting in reliance on this certification is enforceable against the trust assets.</p>

<p style="font-weight: bold;">PROBATE CODE SECTION 18100.5(H) PROVIDES THAT ANY PERSON WHO REFUSES TO ACCEPT THIS CERTIFICATION IN LIEU OF THE ORIGINAL TRUST DOCUMENT WILL BE LIABLE FOR DAMAGES, INCLUDING ATTORNEYS' FEES, INCURRED AS A RESULT OF THAT REFUSAL, IF THE COURT DETERMINES THAT THE PERSON ACTED IN BAD FAITH IN REQUESTING THE TRUST DOCUMENT.</p>

{{#IF_REVOCABLE}}
<div class="signature-block" style="margin-top: 50px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{CLIENT_FULL_NAME}}, Trustee
</div>
</div>

{{#IF_JOINT}}
<div class="signature-block" style="margin-top: 30px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{SPOUSE_FULL_NAME}}, Trustee
</div>
</div>
{{/IF_JOINT}}
{{/IF_REVOCABLE}}

{{#IF_IRREVOCABLE}}
<div class="signature-block" style="margin-top: 50px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{TRUSTEE_NAME}}, Trustee
</div>
</div>
{{/IF_IRREVOCABLE}}

<div class="notary-block" style="margin-top: 40px; border: 1px solid #000; padding: 15px;">
<p><i>A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.</i></p>

<p><b>State of California</b><br/>
<b>County of</b>  {{CLIENT_COUNTY}}</p>

<p>On {{TRUST_DATE_FORMATTED}} before me, ______________________________ (here insert name and title of the officer), personally appeared {{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.</p>

<p>I certify under PENALTY of PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>

<p>WITNESS my hand and official seal.</p>

<p>Signature  ________________________________                 (Seal)</p>
</div>

</body>
</html>
  `.trim();
};
