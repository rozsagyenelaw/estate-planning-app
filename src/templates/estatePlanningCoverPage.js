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
    .horizontal-line {
      width: 100%;
      height: 2px;
      background: repeating-linear-gradient(
        to right,
        #000 0px,
        #000 2px,
        transparent 2px,
        transparent 6px
      );
      margin: 20px 0;
    }
    .title {
      font-size: 18pt;
      font-weight: bold;
      margin: 40px 0 20px 0;
      letter-spacing: 2px;
    }
    .for {
      font-size: 14pt;
      margin: 20px 0;
    }
    .client-names {
      font-size: 16pt;
      font-weight: bold;
      margin: 20px 0;
      text-transform: uppercase;
    }
    .law-firm {
      font-size: 12pt;
      font-weight: bold;
      margin: 10px 0;
      line-height: 1.6;
    }
  </style>
</head>
<body>

<div style="margin-top: 100px;">
<div class="horizontal-line"></div>

<div class="title">ESTATE PLANNING PORTFOLIO</div>

<div class="for">FOR</div>

<div class="client-names">
{{CLIENT_FULL_NAME}}{{#IF_JOINT}} AND {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}
</div>

<div class="horizontal-line"></div>

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
