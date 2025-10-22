export const confirmationOfNamesTemplate = () => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 1in; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 11pt; line-height: 1.4; color: #000; }
    h1 { text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0; }
    h2 { font-size: 12pt; font-weight: bold; margin: 15px 0 5px 0; }
    p { margin: 5px 0; text-align: left; text-indent: 0; }
    .section { margin: 20px 0; }
    .indent { margin-left: 0.5in; }
  </style>
</head>
<body>

<h1>Confirmation of Names and Fiduciaries{{#IF_JOINT}} for {{CLIENT_FULL_NAME}}{{/IF_JOINT}}</h1>

<div class="section">
<h2>Client Information</h2>
<p>Grantor Name:       {{CLIENT_FULL_NAME}}</p>
{{#IF_JOINT}}
<p>Grantor Name:       {{SPOUSE_FULL_NAME}}</p>
{{/IF_JOINT}}
<p>Address:            {{CLIENT_ADDRESS}}</p>
<p class="indent">{{CLIENT_CITY}}, {{CLIENT_STATE}} {{CLIENT_ZIP}}</p>
</div>

{{#IF_HAS_CHILDREN}}
<div class="section">
<h2>Family Information</h2>
<table style="width: 100%; border-collapse: collapse;">
<thead>
<tr style="border-bottom: 1px solid #000;">
<th style="text-align: left; padding: 5px;">Name</th>
<th style="text-align: left; padding: 5px;">Relationship</th>
<th style="text-align: left; padding: 5px;">Date of Birth</th>
</tr>
</thead>
<tbody>
{{#EACH_CHILDREN}}
<tr>
<td style="padding: 5px;">{{CHILD_FULL_NAME}}</td>
<td style="padding: 5px;">{{CHILD_RELATIONSHIP}}</td>
<td style="padding: 5px;">{{CHILD_DOB_FORMATTED}}</td>
</tr>
{{/EACH_CHILDREN}}
</tbody>
</table>
</div>
{{/IF_HAS_CHILDREN}}

{{#IF_HAS_MINOR_CHILDREN}}
<div class="section">
<h2>Guardian for Minor Children</h2>
<p>{{GUARDIAN_NAME}}</p>
</div>
{{/IF_HAS_MINOR_CHILDREN}}

<div class="section">
<h2>Trust Information</h2>
<p><b>Name of Trust:</b>        {{TRUST_NAME}}, dated {{TRUST_DATE_FORMATTED}}</p>
<p><b>Initial Trustees:</b>    {{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}</p>

<p><b>Successor Trustees:</b></p>
<p class="indent"><u>Upon Incapacity or Death:</u></p>
{{#IF_JOINT}}
<p class="indent">The non-incapacitated or surviving spouse will serve as sole Trustee.  If he or she is unable to serve or to continue to serve for any reason, then the following will serve as successor Trustee, in the order named:</p>
{{/IF_JOINT}}
{{#EACH_SUCCESSOR_TRUSTEES}}
<p class="indent">{{SUCCESSOR_TRUSTEE_NAME}}{{#IF_NEEDS_AGE_18}} (at age 18){{/IF_NEEDS_AGE_18}}</p>
{{/EACH_SUCCESSOR_TRUSTEES}}
</div>

<div class="section">
<h2>Durable Power of Attorney for {{CLIENT_FULL_NAME}}</h2>
{{#IF_JOINT}}
<p><b>Initial Agent:</b>    {{SPOUSE_FULL_NAME}}</p>
{{/IF_JOINT}}
{{#IF_SINGLE}}
<p><b>Initial Agent:</b>    {{DPOA_AGENT_NAME}}</p>
{{/IF_SINGLE}}
<p><b>Successor Agent:</b>    {{DPOA_SUCCESSOR_NAME}}</p>
</div>

{{#IF_JOINT}}
<div class="section">
<h2>Durable Power of Attorney for {{SPOUSE_FULL_NAME}}</h2>
<p><b>Initial Agent:</b>    {{CLIENT_FULL_NAME}}</p>
<p><b>Successor Agent:</b>    {{DPOA_SUCCESSOR_NAME}}</p>
</div>
{{/IF_JOINT}}

<div class="section">
<h2>HIPAA Agent for {{CLIENT_FULL_NAME}}</h2>
{{#IF_JOINT}}
<p>{{SPOUSE_FULL_NAME}} and</p>
{{/IF_JOINT}}
{{#EACH_HIPAA_AGENTS}}
<p>{{HIPAA_AGENT_NAME}}</p>
{{/EACH_HIPAA_AGENTS}}
</div>

{{#IF_JOINT}}
<div class="section">
<h2>HIPAA Agent for {{SPOUSE_FULL_NAME}}</h2>
<p>{{CLIENT_FULL_NAME}} and</p>
{{#EACH_HIPAA_AGENTS}}
<p>{{HIPAA_AGENT_NAME}}</p>
{{/EACH_HIPAA_AGENTS}}
</div>
{{/IF_JOINT}}

<div class="section">
<h2>Advance Health Care Directive for {{CLIENT_FULL_NAME}}</h2>
{{#IF_JOINT}}
<p><b>Initial Agent:</b>    {{SPOUSE_FULL_NAME}}</p>
{{/IF_JOINT}}
{{#IF_SINGLE}}
<p><b>Initial Agent:</b>    {{HEALTHCARE_AGENT_NAME}}</p>
{{/IF_SINGLE}}
<p><b>Successor Agent:</b>    {{HEALTHCARE_SUCCESSOR_NAME}}</p>
</div>

{{#IF_JOINT}}
<div class="section">
<h2>Advance Health Care Directive for {{SPOUSE_FULL_NAME}}</h2>
<p><b>Initial Agent:</b>    {{CLIENT_FULL_NAME}}</p>
<p><b>Successor Agent:</b>    {{HEALTHCARE_SUCCESSOR_NAME}}</p>
</div>
{{/IF_JOINT}}

<div class="section">
<h2>Personal Representative for {{CLIENT_FULL_NAME}}</h2>
{{#IF_JOINT}}
<p>{{SPOUSE_FULL_NAME}}, then</p>
{{/IF_JOINT}}
<p>{{POUROVER_SUCCESSOR_REP}}</p>
</div>

{{#IF_JOINT}}
<div class="section">
<h2>Personal Representative for {{SPOUSE_FULL_NAME}}</h2>
<p>{{CLIENT_FULL_NAME}}, then</p>
<p>{{POUROVER_SUCCESSOR_REP}}</p>
</div>
{{/IF_JOINT}}

</body>
</html>
  `.trim();
};
