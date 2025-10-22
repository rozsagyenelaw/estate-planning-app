export const overviewPageTemplate = () => {
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
      margin: 30px 0 20px 0;
    }
    p {
      margin: 12px 0;
      text-align: justify;
    }
    .info-row {
      display: flex;
      margin: 5px 0;
    }
    .info-label {
      font-weight: bold;
      width: 200px;
      flex-shrink: 0;
    }
    .info-value {
      flex-grow: 1;
    }
    .box {
      border: 2px solid #000;
      padding: 15px;
      margin: 20px 0;
    }
    .center {
      text-align: center;
    }
  </style>
</head>
<body>

<h1>OVERVIEW</h1>
<div class="yellow-line"></div>

<p>This section contains an overview of your estate plan that illustrates the most important provisions of your plan. This overview is not a legally binding document.</p>

<h2>The {{TRUST_NAME}} Information Page</h2>

<div class="info-row">
  <div class="info-label">NAME OF THE TRUST:</div>
  <div class="info-value">{{TRUST_NAME}}</div>
</div>

<div class="info-row">
  <div class="info-label">DATE ESTABLISHED:</div>
  <div class="info-value">{{TRUST_DATE_FORMATTED}}</div>
</div>

<div class="info-row">
  <div class="info-label">NAMES OF TRUSTEES:</div>
  <div class="info-value">{{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}</div>
</div>

<div class="yellow-line"></div>

<div class="box">
  <p class="center"><strong>FOR TRUST BUSINESS, ALWAYS SIGN NAME:</strong></p>
  <p class="center">{{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}, Trustees of {{TRUST_NAME}}</p>
</div>

<div class="box">
  <p class="center"><strong>TITLE TO ALL ASSETS IN THIS TRUST IS VESTED IN THE NAME OF:</strong></p>
  <p class="center">{{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}, Trustees, or their successors in interest, of {{TRUST_NAME}} dated {{TRUST_DATE_FORMATTED}}, and any amendments thereto</p>
</div>

<div class="yellow-line"></div>

<p class="center"><strong>ASSETS MAY BE TRANSFERRED TO OR REMOVED FROM THIS TRUST AT ANY TIME</strong></p>

<p class="center"><strong>ALL INCOME OR LOSS FROM TRUST ASSETS SHOULD BE REPORTED ON GRANTOR'S INDIVIDUAL FEDERAL AND STATE INCOME TAX RETURNS</strong></p>

<div class="yellow-line"></div>

<p class="center"><strong>DO NOT WRITE ON YOUR TRUST INSTRUMENT, CHANGE IT, OR REVOKE IT WITHOUT ADVICE FROM YOUR ATTORNEY</strong></p>

<div class="yellow-line"></div>

<p class="center">
<strong>LAW OFFICES OF ROZSA GYENE, PC</strong><br/>
450 N BRAND BLVD. SUITE 623<br/>
GLENDALE, CALIFORNIA 91203
</p>

</body>
</html>
  `.trim();
};
