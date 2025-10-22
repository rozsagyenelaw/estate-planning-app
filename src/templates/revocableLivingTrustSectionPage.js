export const revocableLivingTrustSectionPageTemplate = () => {
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

<h1>REVOCABLE LIVING TRUST</h1>
<div class="yellow-line"></div>

<p>This section contains a signed original of your Revocable Living Trust. You may choose to replace this original with a copy if you prefer to store the original elsewhere for safekeeping, such as in a safe-deposit box or fire-proof cabinet. If you choose to keep it in a safe-deposit box, make sure you have designated a trusted person as "deputy" or co-owner of the box.</p>

<p>Your Revocable Living Trust is the foundation of your estate plan. It contains your instructions for your own care and the care of your family if you become disabled, as well as for the distribution of your assets upon your death. Your Revocable Living Trust allows you to keep your instructions and financial affairs private and ensures that your instructions are carried out efficiently without unnecessary judicial involvement. But it can only accomplish these objectives if you follow the instructions in this portfolio for transferring assets to your Revocable Living Trust. You can find these instructions under the Funding Instructions tab. Once you have transferred assets to your Revocable Living Trust according to these instructions, you should file copies of the transfer documents under the Trust Assets tab of your portfolio.</p>

<p>You may amend or revoke your Revocable Living Trust at any time, but you must do so through a written instrument that complies with all the legal requirements for amendment or revocation. Please do not attempt to modify or revoke any of your documents, especially your Revocable Living Trust, Will, or any power of attorney, by writing on them or destroying them. Your attempt may not be legally effective and may result in confusion and litigation among your prospective heirs. Instead, please call us so that we may assist you.</p>

</body>
</html>
  `.trim();
};
