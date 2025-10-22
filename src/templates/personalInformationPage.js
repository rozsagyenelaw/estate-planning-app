export const personalInformationPageTemplate = () => {
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

<h1>PERSONAL INFORMATION</h1>
<div class="yellow-line"></div>

<p>This section contains copies of the most recent personal and financial information that you have provided to us. If we do additional planning for you in the future, you will need to complete a new questionnaire or update this one.</p>

</body>
</html>
  `.trim();
};
