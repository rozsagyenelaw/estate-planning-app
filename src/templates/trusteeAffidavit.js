export const trusteeAffidavitTemplate = () => {
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
    .indent-1 { margin-left: 0.5in; }
  </style>
</head>
<body>

<h1>Trustee Affidavit</h1>

<p>{{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}} being first duly sworn upon oath, depose and say:</p>

<p>1.    Affiant is the Trustee of the Revocable Living Trust named below and as such has the authority to execute this Trustee Affidavit.</p>

<p>2.    This Trustee Affidavit relates to {{TRUST_NAME}}, dated {{TRUST_DATE_FORMATTED}}.</p>

<p>3.    The names of the currently serving Trustees of the above-described trust are {{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}.</p>

<p>4.    Selected provisions of the trust, including the pages naming the initial Trustee, creating the trust, stating the relevant trustee powers, stating the revocability of the trust, designating successor Trustees, as well as a copy of the signature pages, may be attached to this Trustee Affidavit or are available upon request.</p>

<p>5.    Under the terms of the trust, any person may rely upon this Trustee Affidavit as evidence of the existence of the trust and is relieved of any obligation to verify that any transaction entered into by a Trustee or successor Trustee is consistent with the terms and conditions of the trust.</p>

<p>6.    The other provisions of the trust are of a personal nature and set forth the distribution of trust property.  They do not modify the powers of the Trustee.</p>

<p>7.    The trust has not been revoked.</p>

<div class="signature-block" style="margin-top: 50px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{CLIENT_FULL_NAME}}, Trustee
</div>
</div>

<div class="notary-block" style="margin-top: 40px; border: 1px solid #000; padding: 15px;">
<p><i>A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.</i></p>

<p><b>State of California</b><br/>
<b>County of</b>  {{CLIENT_COUNTY}}</p>

<p>Subscribed and sworn to (or affirmed) before me this day {{TRUST_DATE_FORMATTED}}, by {{CLIENT_FULL_NAME}}, proved to me on the basis of satisfactory evidence to be the person(s) who appeared before me.</p>

<p>I certify under PENALTY of PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>

<p>WITNESS my hand and official seal.</p>

<p>Signature  ________________________________                 (Seal)</p>
</div>

{{#IF_JOINT}}
<div class="signature-block" style="margin-top: 50px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{SPOUSE_FULL_NAME}}, Trustee
</div>
</div>

<div class="notary-block" style="margin-top: 40px; border: 1px solid #000; padding: 15px;">
<p><i>A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.</i></p>

<p><b>State of California</b><br/>
<b>County of</b>  {{SPOUSE_COUNTY}}</p>

<p>Subscribed and sworn to (or affirmed) before me this day {{TRUST_DATE_FORMATTED}}, by {{SPOUSE_FULL_NAME}}, proved to me on the basis of satisfactory evidence to be the person(s) who appeared before me.</p>

<p>I certify under PENALTY of PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>

<p>WITNESS my hand and official seal.</p>

<p>Signature  ________________________________</p>
</div>
{{/IF_JOINT}}

</body>
</html>
  `.trim();
};
