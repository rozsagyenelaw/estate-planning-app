#!/bin/bash
# This script creates the complete single irrevocable trust template

cat > /Users/rozsagyene/estate-planning-app/src/templates/singleIrrevocableTrust.js << 'EOF'
/**
 * Single Irrevocable Trust Template
 * California Law - Irrevocable Trust for Individual Grantor
 * Complete template with all boilerplate language
 */

export const singleIrrevocableTrust Template = `
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

EOF
echo "Template file stub created. Due to length, completing in separate operation..."
