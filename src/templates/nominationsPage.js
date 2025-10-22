export const nominationsPageTemplate = () => {
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
    p {
      margin: 12px 0;
      text-align: justify;
    }
  </style>
</head>
<body>

<h1>NOMINATIONS</h1>
<div class="yellow-line"></div>

<p>This section contains a Confirmation of Names and Fiduciaries that lists the persons appointed to act on your behalf in various fiduciary capacities.</p>

<p>We have included your nomination of a conservator for you or your property in your Power of Attorney, in a document contained in this section, or in both. Your nomination of a conservator may be important if someone other than your successor Trustees or agents petition a court for appointment to take care of you or handle your affairs. As with the other original documents contained in this portfolio, you may choose to replace this original with a copy if you prefer to store the original elsewhere.</p>

</body>
</html>
  `.trim();
};
