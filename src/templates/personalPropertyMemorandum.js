export const personalPropertyMemorandumTemplate = (personType = 'client') => {
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
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { border-bottom: 1px solid #000; padding: 8px; text-align: left; font-weight: bold; }
    td { border-bottom: 1px solid #ccc; padding: 8px; vertical-align: top; }
    .signature-line { margin: 30px 0 5px 0; width: 300px; border-top: 1px solid #000; }
  </style>
</head>
<body>

<h1>Personal Property Memorandum of {{${prefix}_FULL_NAME}}</h1>

<p>On {{TRUST_DATE_FORMATTED}}, I, {{${prefix}_FULL_NAME}}, signed the document that established {{TRUST_NAME}}.  The trust refers to the disposition at my death of certain items of tangible personal property in accordance with a memorandum signed by me.  I make this memorandum for that purpose.</p>

{{#IF_JOINT}}
<p>If an item is marked with an asterisk, it is to be distributed to the designated recipient only if my {{${prefix}_SEX_REF === 'his' ? 'wife' : 'husband'}} predeceases me.</p>
{{/IF_JOINT}}

<p>If the designated recipient of a particular item of personal property does not survive me, that item will be disposed of as though it had not been listed in this memorandum.</p>

<h2 style="text-align: center; font-size: 12pt; margin: 30px 0 15px 0;">Personal Property Distributions<br/>for {{${prefix}_FULL_NAME}}</h2>

<table>
<thead>
<tr>
<th style="width: 45%;">Description of Tangible<br/>Personal Property</th>
<th style="width: 45%;">Person to Receive Property<br/>Address and Relationship</th>
<th style="width: 10%; text-align: center;">( * )</th>
</tr>
</thead>
<tbody>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
</tbody>
</table>

<div style="margin-top: 40px;">
<p>Dated: ___________________</p>
<div class="signature-line">
{{${prefix}_FULL_NAME}}
</div>
</div>

<div style="page-break-before: always;"></div>

<h2 style="text-align: center; font-size: 12pt; margin: 30px 0 15px 0;">Personal Property Distributions<br/>for {{${prefix}_FULL_NAME}}</h2>

<table>
<thead>
<tr>
<th style="width: 45%;">Description of Tangible<br/>Personal Property</th>
<th style="width: 45%;">Person to Receive Property<br/>Address and Relationship</th>
<th style="width: 10%; text-align: center;">( * )</th>
</tr>
</thead>
<tbody>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
</tbody>
</table>

<div style="margin-top: 40px;">
<p>Dated: ___________________</p>
<div class="signature-line">
{{${prefix}_FULL_NAME}}
</div>
</div>

<div style="page-break-before: always;"></div>

<h2 style="text-align: center; font-size: 12pt; margin: 30px 0 15px 0;">Personal Property Distributions<br/>for {{${prefix}_FULL_NAME}}</h2>

<table>
<thead>
<tr>
<th style="width: 45%;">Description of Tangible<br/>Personal Property</th>
<th style="width: 45%;">Person to Receive Property<br/>Address and Relationship</th>
<th style="width: 10%; text-align: center;">( * )</th>
</tr>
</thead>
<tbody>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
<tr>
<td>_______________________________</td>
<td>_______________________________</td>
<td style="text-align: center;">____</td>
</tr>
</tbody>
</table>

<div style="margin-top: 40px;">
<p>Dated: ___________________</p>
<div class="signature-line">
{{${prefix}_FULL_NAME}}
</div>
</div>

</body>
</html>
  `.trim();
};
