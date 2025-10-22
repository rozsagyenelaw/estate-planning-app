export const durablePowerOfAttorneyTemplate = (personType = 'client') => {
  const prefix = personType === 'client' ? 'CLIENT' : 'SPOUSE';
  const agentPrefix = personType === 'client' ? (personType === 'client' ? 'DPOA_CLIENT_AGENT' : 'DPOA_SPOUSE_AGENT') : (personType === 'spouse' ? 'DPOA_SPOUSE_AGENT' : 'DPOA_CLIENT_AGENT');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { size: letter; margin: 1in; }
    body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; color: #000; }
    h1 { text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0; }
    h2 { font-size: 12pt; font-weight: bold; margin: 15px 0 10px 0; text-align: center; }
    h3 { font-size: 12pt; font-weight: bold; margin: 10px 0; }
    p { margin: 10px 0; text-align: justify; text-indent: 0.5in; }
    .signature-line { margin: 30px auto 5px auto; width: 300px; border-top: 1px solid #000; text-align: center; }
    .indent-1 { margin-left: 0.5in; text-indent: 0; }
    .indent-2 { margin-left: 1in; text-indent: 0; }
  </style>
</head>
<body>

<h1>General Durable Power of Attorney of {{${prefix}_FULL_NAME}}</h1>

<p>I, {{${prefix}_FULL_NAME}} of {{${prefix}_CITY}}, California, Social Security number _____________________, am creating a Durable Power of Attorney under the laws of the State of California.  I revoke all Powers of Attorney previously granted by me as Principal and terminate all agency relationships created by me except:</p>
<p class="indent-1">powers granted by me under any Advance Health Care Directive;</p>
<p class="indent-1">powers granted by me on forms provided by financial institutions granting the right to write checks on, deposit funds to, and withdraw funds from accounts to which I am a signatory; and</p>
<p class="indent-1">powers granting access to a safe-deposit box.</p>

<p style="text-align: center; font-weight: bold; margin: 20px 0;">MY ATTORNEY IN FACT MAY NOT EXERCISE THE AUTHORITY GRANTED UNDER THIS POWER OF ATTORNEY UNTIL THE EVENTS DESCRIBED IN ARTICLE TWO HAVE OCCURRED.</p>

<h2>Article One</h2>
<h3 style="text-align: center;">Appointment of Attorney in Fact</h3>

<div>
<h3>Section 1.01      Initial Attorney in Fact</h3>
{{#IF_JOINT}}
<p>I appoint {{${personType === 'client' ? 'SPOUSE_FULL_NAME' : 'CLIENT_FULL_NAME'}}} to serve as my Attorney in Fact.</p>
{{/IF_JOINT}}
{{#IF_SINGLE}}
<p>I appoint {{DPOA_AGENT_NAME}} to serve as my Attorney in Fact.</p>
{{/IF_SINGLE}}
</div>

<div>
<h3>Section 1.02      Successor Attorney in Fact</h3>
{{#IF_JOINT}}
<p>If {{${personType === 'client' ? 'SPOUSE_FULL_NAME' : 'CLIENT_FULL_NAME'}}} fails to serve, I appoint {{DPOA_SUCCESSOR_NAME}} to serve as successor Attorney in Fact.</p>
{{/IF_JOINT}}
{{#IF_SINGLE}}
<p>If {{DPOA_AGENT_NAME}} fails to serve, I appoint {{DPOA_SUCCESSOR_NAME}} to serve as successor Attorney in Fact.</p>
{{/IF_SINGLE}}
</div>

<div>
<h3>Section 1.03      No Person under 21 Years of Age May Serve as Attorney in Fact</h3>
<p>No person named as my Attorney in Fact or successor Attorney in Fact may serve until that person has reached 21 years of age.</p>
</div>

<div>
<h3>Section 1.04      Prior or Joint Attorney in Fact Unable to Act</h3>
<p>A successor Attorney in Fact or an Attorney in Fact serving jointly with another Attorney in Fact may establish that the acting Attorney in Fact or joint Attorney in Fact is no longer able to serve as Attorney in Fact by signing an affidavit that states that the Attorney in Fact is not available or is incapable of acting.  The affidavit may be supported by a death certificate of the Attorney in Fact, a certificate showing that a guardian or conservator has been appointed for the Attorney in Fact, a physician's letter stating that the Attorney in Fact is incapable of managing his or her own affairs, or a letter from the Attorney in Fact stating his or her unwillingness to act or delegating his or her power to the successor Attorney in Fact.</p>
</div>

<h2>Article Two</h2>
<h3 style="text-align: center;">Effectiveness of Appointment - Durability Provision</h3>

<div>
<h3>Section 2.01      Effectiveness</h3>
<p>The authority granted to my Attorney in Fact under this power of attorney will only become effective if I am incapacitated.</p>
<p>For all purposes of this power of attorney, I am incapacitated in any one of the following circumstances:</p>

<h4 class="indent-1">(a)      The Opinion of Two Licensed Physicians</h4>
<p>I am incapacitated whenever two licensed physicians provide written opinions that I cannot effectively manage my property or financial affairs due to age; illness; use of prescription medications, drugs or other substances; or any other cause.</p>
<p>I am restored to capacity whenever my personal or attending physician provides a written opinion that I can effectively manage my property and financial affairs.</p>
<p>I voluntarily waive any physician-patient privilege or psychiatrist-patient privilege that may exist in my favor and I authorize physicians and psychiatrists to examine me and disclose my physical or mental condition to my Attorney in Fact for purposes of this power of attorney.</p>

<h4 class="indent-1">(b)      Court Determination</h4>
<p>I am incapacitated if a court of competent jurisdiction declares me disabled, incompetent, or legally incapacitated.</p>

<h4 class="indent-1">(c)      Detention, Disappearance or Absence</h4>
<p>I am incapacitated whenever I cannot effectively manage my property or financial affairs because I have disappeared for more than 30 days or whenever I am detained under duress.</p>
<p>My Attorney in Fact may establish that I have disappeared or that I am detained under duress by an affidavit.  The affidavit must describe the circumstances of my disappearance, absence, or detention.  Any third party dealing in good faith with my Attorney in Fact may rely upon the affidavit.</p>
</div>

<div>
<h3>Section 2.02      Durability</h3>
<p>The authority granted to my Attorney in Fact under this power of attorney will not be affected by my subsequent disability, incompetency, incapacity, or lapse of time.</p>
<p>If this power of attorney becomes operative because of my disability or incapacity and if the authority granted to my Attorney in Fact becomes effective because of my incapacity and I am restored to capacity as evidenced in the manner provided above, this power of attorney is not revoked but my Attorney in Fact's power is no longer effective.  My Attorney in Fact's power will become effective again only upon my subsequent incapacity as provided above.</p>
</div>

<div>
<h3>Section 2.03      Term of Durable Power of Attorney</h3>
<p>This Durable Power of Attorney expires at the earliest of:</p>
<p class="indent-1">my death (except for post-death matters allowed under California law); or</p>
<p class="indent-1">my revocation of this power of attorney.</p>
</div>

<h2>Article Three</h2>
<h3 style="text-align: center;">Powers Granted to My Attorney in Fact</h3>

<p>I grant my Attorney in Fact the powers described in this Article so that my Attorney in Fact may act on my behalf.  In addition, my Attorney in Fact may do everything necessary to exercise the powers listed below.</p>

<div>
<h3>Section 3.01      Power to Fund</h3>
<p>My Attorney in Fact may transfer any of my assets or any interest I have in any property, tangible or intangible, real or personal, to the trustee of any revocable living trust created by me before or after the execution of this power of attorney, and including any trust that may extend beyond my incapacity or beyond my lifetime.</p>
</div>

<div>
<h3>Section 3.02      Power to Sell</h3>
<p>Unless specifically limited by the other provisions of this power of attorney, my Attorney in Fact may sell any interest I own in any kind of property, real or personal, tangible or intangible, including any contingent or expectant interest, any marital right, and any right of survivorship incident to joint tenancy or tenancy by the entirety.  My Attorney in Fact may determine the terms of sale and may grant sales options.</p>
</div>

<div>
<h3>Section 3.03      Power to Buy</h3>
<p>Unless specifically limited by the other provisions of this power of attorney, my Attorney in Fact may buy any kind of property.  My Attorney in Fact may determine the terms for buying property and may obtain options to buy property.  In addition, my Attorney in Fact may insure the purchased property, and otherwise arrange for its safekeeping.</p>
</div>

<div>
<h3>Section 3.04      Power to Invest</h3>
<p>My Attorney in Fact may invest and reinvest all or any part of my property in any other property of whatever type:  real or personal, tangible or intangible, and whether located inside or outside the geographic borders of the United States and its possession or territories.</p>
</div>

<div>
<h3>Section 3.05      Power to Contract</h3>
<p>My Attorney in Fact may enter into contracts of any type and for any purpose.  Unless specifically limited by the other provisions of this power of attorney and the law, my Attorney in Fact may modify and cancel any existing or any new contracts to which I am a party.</p>
</div>

<div>
<h3>Section 3.06      Power to Manage Real Property</h3>
<p>My Attorney in Fact may manage any real property I now own or may acquire in the future including my personal residence.</p>
</div>

<div>
<h3>Section 3.07      Power to Manage Tangible Personal Property</h3>
<p>My Attorney in Fact may manage any tangible personal property I now own or may acquire in the future.</p>
</div>

<div>
<h3>Section 3.08      Power to Manage Digital Assets</h3>
<p>My Attorney in Fact may access, modify, control, archive, transfer, and delete my digital assets.  Digital assets include my sent and received emails, email accounts, digital music, digital photographs, digital videos, gaming accounts, software licenses, social-network accounts, file-sharing accounts, financial accounts, domain registrations, Domain Name System (DNS) service accounts, blogs, listservs, web-hosting accounts, tax-preparation service accounts, online stores and auction sites, online accounts, and any similar digital asset that currently exists or may be developed as technology advances.</p>
</div>

<div>
<h3>Section 3.09      Power to Operate Businesses</h3>
<p>My Attorney in Fact may continue operating and managing any business in which I now or later own an interest for the period of time and in any manner my Attorney in Fact considers appropriate.</p>
</div>

<div>
<h3>Section 3.10      Power to Manage Partnership and Limited Liability Company Interests</h3>
<p>My Attorney in Fact may manage any general, limited, or special partnership interest or any limited liability company interest I own now or in the future.</p>
</div>

<div>
<h3>Section 3.11      Power Regarding Securities</h3>
<p>My Attorney in Fact may exercise all rights regarding securities that I own now or in the future.  Specifically, my Attorney in Fact may buy, sell, and exchange all types of securities and financial instruments including stocks, bonds, mutual funds, and commodity futures contracts and call and put options on stocks and stock indexes.</p>
</div>

<div>
<h3>Section 3.12      Power to Collect and Settle My Obligations</h3>
<p>My Attorney in Fact may collect all rights and benefits to which I am entitled now or in the future, including rights to cash payments, property, debts, accounts, legacies, bequests, devises, dividends, and annuities.</p>
</div>

<div>
<h3>Section 3.13      Power Regarding Governmental Benefits</h3>
<p>I appoint my Attorney in Fact as my Representative Payee for the purposes of receiving Social Security benefits.  My Attorney in Fact may collect all benefits payable to or for my benefit by any governmental agency or body, such as Supplemental Security Income (SSI), Medicaid, Medicare, and Social Security Disability Insurance (SSDI).</p>
</div>

<div>
<h3>Section 3.14      Power Regarding My Retirement Plans and Other Employee Benefits</h3>
<p>My Attorney in Fact may exercise all rights and collect all qualified retirement benefits to which I am entitled now or in the future.</p>
</div>

<div>
<h3>Section 3.15      Power Regarding Bank Accounts</h3>
<p>My Attorney in Fact may establish bank accounts of any type in one or more bank institutions that my Attorney in Fact may choose.  My Attorney in Fact may modify, terminate, make deposits to, write checks on, make withdrawals from, and grant security interests in any account in my name or to which I am an authorized signatory, except accounts held by me in a fiduciary capacity.</p>
</div>

<div>
<h3>Section 3.16      Power Regarding Safe-Deposit Boxes</h3>
<p>My Attorney in Fact may contract with any institution to rent a safe-deposit box in my name.  My Attorney in Fact may have access to any safe-deposit box in my name or for which I am an authorized signer.</p>
</div>

<div>
<h3>Section 3.17      Power to Prosecute and Defend Legal Actions</h3>
<p>My Attorney in Fact may institute, supervise, prosecute, defend, intervene in, abandon, compromise, adjust, arbitrate, settle, dismiss, and appeal from any legal, equitable, judicial, or administrative hearings, actions, suits, or proceedings involving me in any way.</p>
</div>

<div>
<h3>Section 3.18      Power to Loan and Borrow</h3>
<p>My Attorney in Fact may make secured or unsecured loans to any person, entity, trust, or estate on my behalf, for any term or payable on demand, with or without interest.</p>
</div>

<div>
<h3>Section 3.19      Power to Renounce or Resign from Fiduciary Positions</h3>
<p>My Attorney in Fact may resign or renounce any fiduciary position I hold now or in the future including personal representative, trustee, guardian, attorney in fact, and officer or director of a corporation, as well as any governmental or political office or position.</p>
</div>

<div>
<h3>Section 3.20      Power to Disclaim or Release Property Interests</h3>
<p>My Attorney in Fact may renounce and disclaim any property or property interest or power to which I may become entitled by gift, testate succession, or intestate succession.</p>
</div>

<div>
<h3>Section 3.21      Power Regarding Insurance</h3>
<p>My Attorney in Fact may purchase, maintain, surrender, or collect all kinds of life insurance or annuities on my life or the life of any one in whom I have an insurable interest; liability insurance protecting my estate and me against third party claims; hospital insurance, medical insurance, Medicare supplement insurance, custodial care insurance, and disability income insurance for me or my dependents; and casualty insurance insuring my assets against loss or damage due to fire, theft, or other commonly insured risk.</p>
</div>

{{#IF_JOINT}}
<div>
<h3>Section 3.22      Power to Deal with My Spouse</h3>
<p>If I am married, my Attorney in Fact may deal with my spouse on my behalf.  In dealing with my spouse, my Attorney in Fact may partition, transfer, and exchange any of my marital property estate, whether separate or community property between my spouse and me.</p>
</div>
{{/IF_JOINT}}

<h2>Article Four</h2>
<h3 style="text-align: center;">Care and Control of Principal</h3>

<p>My Attorney in Fact may exercise the following powers and pay the associated costs from my assets with respect to the control and management of my person.</p>

<div>
<h3>Section 4.01      Power to Provide for My Support</h3>
<p>My Attorney in Fact may do anything reasonably necessary to maintain my customary standard of living, including: maintain my residence by paying all operating costs; provide normal domestic help; provide clothing, transportation, medicine, food, and incidentals; and make all necessary arrangements for my care at any hospital, hospice, nursing home, convalescent home or similar establishment.</p>
</div>

<div>
<h3>Section 4.02      Power to Provide for Support of Dependents</h3>
{{#IF_JOINT}}
<p>My Attorney in Fact may make payments for the health, education, maintenance, or support of my {{${prefix}_SEX_REF === 'his' ? 'wife' : 'husband'}} and those my Attorney in Fact determines to be dependent on me for support.</p>
{{/IF_JOINT}}
{{#IF_SINGLE}}
<p>My Attorney in Fact may make payments for the health, education, maintenance, or support of those my Attorney in Fact determines to be dependent on me for support.</p>
{{/IF_SINGLE}}
</div>

<div class="signature-block" style="margin-top: 50px;">
<p><b>Dated:</b>  {{TRUST_DATE_FORMATTED}}</p>
<div class="signature-line">
{{${prefix}_FULL_NAME}}, Principal
</div>
</div>

<div class="notary-block" style="margin-top: 40px; border: 1px solid #000; padding: 15px;">
<p style="text-indent: 0;"><i>A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.</i></p>

<p style="text-indent: 0;"><b>State of California</b><br/>
<b>County of</b>  {{${prefix}_COUNTY}}</p>

<p style="text-indent: 0;">On {{TRUST_DATE_FORMATTED}} before me, ______________________________ (here insert name and title of the officer), personally appeared {{${prefix}_FULL_NAME}}, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.</p>

<p style="text-indent: 0;">I certify under PENALTY of PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.</p>

<p style="text-indent: 0;">WITNESS my hand and official seal.</p>

<p style="text-indent: 0;">Signature  ________________________________                 (Seal)</p>
</div>

</body>
</html>
  `.trim();
};
