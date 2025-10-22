export const introductionPageTemplate = () => {
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
    .indent {
      margin-left: 40px;
    }
    .section-title {
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
</head>
<body>

<h1>INTRODUCTION</h1>
<div class="yellow-line"></div>

<p>Your estate planning portfolio is a recordkeeping system for your estate plan.</p>

<p>The best way to ensure that your estate avoids probate and minimizes fees and taxes is to keep your portfolio records accurate and current. Maintaining these records will save your family and friends considerable time and expense later on. In addition, you will have peace of mind knowing that your plan will do what you designed it to do---protect you, your family, your beneficiaries, and your estate.</p>

<p><span class="section-title">Storing Your Originals and Sharing Copies with Others.</span> You are responsible for your original documents. You may want to substitute photocopies for the originals in this portfolio and keep the originals in another safe place. We also recommend that you give copies of these documents to the people you have appointed as your successor Trustees or agents. If you do store your originals outside this portfolio or share copies with others, please list the location of the originals and the persons who have copies below.</p>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr>
    <td style="vertical-align: top; width: 200px; padding-right: 20px;"><strong>Location of Originals</strong></td>
    <td style="border-bottom: 1px solid #000; padding: 5px;">_________________________________________</td>
  </tr>
  <tr>
    <td></td>
    <td style="border-bottom: 1px solid #000; padding: 5px;">_________________________________________</td>
  </tr>
  <tr>
    <td></td>
    <td style="border-bottom: 1px solid #000; padding: 5px;">_________________________________________</td>
  </tr>
</table>

<table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
  <tr>
    <td style="vertical-align: top; width: 200px; padding-right: 20px;"><strong>People Who Have Copies</strong></td>
    <td style="border-bottom: 1px solid #000; padding: 5px;">_________________________________________</td>
  </tr>
  <tr>
    <td></td>
    <td style="border-bottom: 1px solid #000; padding: 5px;">_________________________________________</td>
  </tr>
  <tr>
    <td></td>
    <td style="border-bottom: 1px solid #000; padding: 5px;">_________________________________________</td>
  </tr>
</table>

<p><span class="section-title">Upon Death, Consider Using Qualified Disclaimers:</span></p>

<p>Qualified disclaimers are among the most powerful and effective post-mortem tax and estate planning tools. A qualified disclaimer is the written irrevocable and unqualified refusal to accept an interest in property from which no benefits have been accepted, and because of this refusal, the interest passes without any direction by the disclaimant to the decedent's spouse or to a person other than the disclaimant. A disclaimer is most often used when the estate tax exclusion was not fully utilized by the decedent. A qualified disclaimer must be made prior to acceptance of any benefit from the property by the disclaimant. The successor Trustee, particularly a surviving spouse, must review the decedent's estate plan with counsel before accepting the benefits of any property passing from the decedent.</p>

<p>The following are just two of the many potential uses of disclaimers:</p>

<p class="indent">surviving spouse disclaims property (separate, joint tenancy, insurance proceeds, or qualified retirement assets) otherwise passing from the deceased spouse to ensure full use of the deceased spouse's exclusion from estate tax; and</p>

<p class="indent">successor Trustee disclaims property from the decedent's marital trust to family trust if the surviving spouse is also close to death, thus lowering the overall effective estate tax rate.</p>

</body>
</html>
  `.trim();
};
