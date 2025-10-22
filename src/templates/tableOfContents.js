export const tableOfContentsTemplate = () => {
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
    .section-item {
      margin: 15px 0;
    }
    .section-title {
      font-weight: bold;
      margin-bottom: 5px;
    }
    .section-description {
      margin-left: 20px;
      text-align: justify;
    }
  </style>
</head>
<body>

<h1>TABLE OF CONTENTS</h1>
<div class="yellow-line"></div>

<p style="margin: 20px 0; text-align: justify;">This portfolio serves as a recordkeeping system for your estate plan: it contains every document that your successor Trustees and agents will need to follow your instructions. The portfolio is organized as follows:</p>

<div class="section-item">
  <div class="section-title">Introduction</div>
  <div class="section-description">Information about your estate planning portfolio.</div>
</div>

<div class="section-item">
  <div class="section-title">Overview</div>
  <div class="section-description">A written summary or diagram of your Revocable Living Trust plan.</div>
</div>

<div class="section-item">
  <div class="section-title">Revocable Living Trust</div>
  <div class="section-description">Your Revocable Living Trust, as most recently amended or restated.</div>
</div>

<div class="section-item">
  <div class="section-title">Will</div>
  <div class="section-description">Your Will that transfers to your Revocable Living Trust any assets that you do not transfer to it during your life.</div>
</div>

<div class="section-item">
  <div class="section-title">Nominations</div>
  <div class="section-description">Names of persons appointed to act on your behalf in various capacities.</div>
</div>

<div class="section-item">
  <div class="section-title">Personal Information</div>
  <div class="section-description">The most recent personal and financial information that you have provided to us.</div>
</div>

<div class="section-item">
  <div class="section-title">Funding Instructions</div>
  <div class="section-description">Instructions that explain how to transfer your assets to your Revocable Living Trust and how to name your Revocable Living Trust as your beneficiary.</div>
</div>

<div class="section-item">
  <div class="section-title">Power of Attorney</div>
  <div class="section-description">A document that authorizes your agent to transfer property to your Revocable Living Trust and manage your financial affairs if you become unable to manage them yourself.</div>
</div>

<div class="section-item">
  <div class="section-title">Certificate of Trust</div>
  <div class="section-description">A document that you can give to financial institutions and others when they request a copy of your Revocable Living Trust. This keeps the personal and financial information in your Revocable Living Trust private.</div>
</div>

<div class="section-item">
  <div class="section-title">Trust Assets</div>
  <div class="section-description">Proof of every asset transfer to your Revocable Living Trust and every designation of your Revocable Living Trust as your beneficiary.</div>
</div>

<div class="section-item">
  <div class="section-title">Health Care</div>
  <div class="section-description">Your Authorization for Release of Protected Health Information authorizing release of health information to designated persons.</div>
</div>

<div class="section-item">
  <div class="section-title">Memorial Instructions</div>
  <div class="section-description">A statement of your personal wishes as to burial or cremation services.</div>
</div>

<div class="section-item">
  <div class="section-title">Personal Effects</div>
  <div class="section-description">Your instructions to your Trustee directing the disposition of your personal effects.</div>
</div>

<div class="section-item">
  <div class="section-title">Property Agreements</div>
  <div class="section-description">Agreements that govern the form of ownership of property owned by you{{#IF_JOINT}} and your spouse{{/IF_JOINT}}.</div>
</div>

<div class="section-item">
  <div class="section-title">Other Documents</div>
  <div class="section-description">Any correspondence or other document related to you or your Revocable Living Trust that would be helpful to your successor Trustee.</div>
</div>

</body>
</html>
  `.trim();
};
