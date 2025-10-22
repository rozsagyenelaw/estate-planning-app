export const estatePlanningCoverPageTemplate = () => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 1in; }
    body {
      font-family: 'Times New Roman', Times, serif;
      font-size: 12pt;
      line-height: 1.5;
      color: #000;
      text-align: center;
    }
    .yellow-line {
      width: 100%;
      height: 3px;
      background-color: #FFD700;
      margin: 15px 0;
    }
    .title {
      font-size: 16pt;
      font-weight: bold;
      margin: 30px 0;
      letter-spacing: 1px;
    }
    .for {
      font-size: 14pt;
      margin: 20px 0;
    }
    .client-names {
      font-size: 14pt;
      font-weight: bold;
      margin: 20px 0;
      text-transform: uppercase;
    }
    .law-firm {
      font-size: 11pt;
      font-weight: normal;
      margin: 5px 0;
      line-height: 1.4;
    }
  </style>
</head>
<body>

<div style="margin-top: 150px;">
<div class="yellow-line"></div>

<div class="title">ESTATE PLANNING PORTFOLIO</div>

<div class="for">FOR</div>

<div class="client-names">
{{CLIENT_FULL_NAME}}{{#IF_JOINT}} AND {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}
</div>

<div class="yellow-line"></div>

<div class="law-firm">
LAW OFFICES OF ROZSA GYENE, PC<br/>
450 N BRAND BLVD. SUITE 623<br/>
GLENDALE, CALIFORNIA 91203
</div>
</div>

</body>
</html>
  `.trim();
};
