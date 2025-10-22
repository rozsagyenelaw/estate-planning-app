export const personalPropertyAssignmentTemplate = (personType = 'client') => {
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
    p { margin: 10px 0; text-align: justify; text-indent: 0; }
    .signature-line { margin: 30px auto 5px auto; width: 300px; border-top: 1px solid #000; text-align: center; }
  </style>
</head>
<body>

<h1>Assignment of Personal Property</h1>

<p>For value received I, {{${prefix}_FULL_NAME}} of {{${prefix}_CITY}}, California, assign, transfer, and convey to:</p>

<p style="margin-left: 0.5in;">{{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}, Trustees, or their successors in interest, of {{TRUST_NAME}} dated {{TRUST_DATE_FORMATTED}}, and any amendments thereto</p>

<p>all of my right, title, and interest in all of my tangible personal property.  My tangible personal property includes all of my jewelry, clothing, household furniture, furnishings and fixtures, chinaware, silver, photographs, works of art, books, boats, automobiles, sporting goods, electronic equipment, musical instruments, artifacts relating to my hobbies, and all other tangible articles of personal property that I now own or later acquire, regardless of how they are acquired or the record title in which they are held.</p>

<div class="signature-block" style="margin-top: 50px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{${prefix}_FULL_NAME}}, Assignor
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
