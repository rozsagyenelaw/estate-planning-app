export const memorialInstructionsTemplate = (personType = 'client') => {
  const prefix = personType === 'client' ? 'CLIENT' : 'SPOUSE';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 1in; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
    h1 { text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0; }
    p { margin: 10px 0; text-align: left; text-indent: 0; }
    .form-line { margin: 15px 0; }
    .underline { display: inline-block; border-bottom: 1px solid #000; min-width: 300px; }
  </style>
</head>
<body>

<h1>Funeral Arrangements for {{${prefix}_FULL_NAME}}</h1>

<div class="form-line">
<p><b>Religious memberships and beliefs are as follows:</b></p>
<p>________________________________________________________________________</p>
<p>________________________________________________________________________</p>
<p>________________________________________________________________________</p>
</div>

<div class="form-line">
<p><b>I desire that services be:</b>  ____ for friends and relatives, or ____ private.</p>
</div>

<div class="form-line">
<p><b>Description of any pre-purchased plans or description of wishes:</b></p>
<p>________________________________________________________________________</p>
<p>________________________________________________________________________</p>
</div>

<div class="form-line">
<p><b>Clergy:</b> _________________________________________________________________</p>
</div>

<div class="form-line">
<p><b>Pallbearers:</b> ______________________________________________________________</p>
<p>________________________________________________________________________</p>
</div>

<div class="form-line">
<p><b>Scripture selections:</b> _______________________________________________________</p>
<p>________________________________________________________________________</p>
</div>

<div class="form-line">
<p><b>Music selections:</b> _________________________________________________________</p>
<p>________________________________________________________________________</p>
</div>

<div class="form-line">
<p><b>Other readings:</b> ___________________________________________________________</p>
<p>________________________________________________________________________</p>
</div>

<div class="form-line">
<p><b>Viewing wishes (open or closed casket):</b> ________________________________</p>
</div>

<div class="form-line" style="margin-top: 30px;">
<p><b>I have made the following arrangements for anatomical gifts:</b></p>
<p>1.    <b>Driver's License Designation:</b>  ___________________</p>
<p>2.    <b>Other:</b>  ___________________________________________________________</p>
<p>________________________________________________________________________</p>
</div>

</body>
</html>
  `.trim();
};
