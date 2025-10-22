/**
 * Joint Living Trust Template
 * California Law - Revocable Living Trust for Married Couples
 * Supports both new trusts and restatements
 */

export const jointLivingTrustTemplate = (formData) => `${formData.isRestatement ? `On ${formData.originalTrustDate}, we, ${formData.client.firstName} ${formData.client.middleName || ''} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.middleName || ''} ${formData.spouse.lastName}, established The ${formData.client.firstName} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.lastName} Living Trust, and reserved the right to amend the trust, in whole or in part. On this day, ${formData.currentDate}, we revoke all prior restatements and amendments to that instrument and now exercise our power to amend that instrument in its entirety, so that after amendment The ${formData.client.firstName} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.lastName} Living Trust now states:

` : ''}Article One
Establishing the Trust

The parties to this ${formData.isRestatement ? 'restated ' : ''}trust are ${formData.client.firstName} ${formData.client.middleName || ''} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.middleName || ''} ${formData.spouse.lastName} (the Grantors), and ${formData.client.firstName} ${formData.client.middleName || ''} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.middleName || ''} ${formData.spouse.lastName} (collectively, the Trustee).

We intend to create a valid trust under the laws of California and under the laws of any state in which any trust created under this trust document is administered. The terms of this trust prevail over any provision of California law, except those provisions that are mandatory and may not be waived.

Section 1.01      Identifying the Trust

For convenience, the trust may be referred to as:

"The ${formData.client.firstName} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.lastName} Living Trust dated ${formData.currentDate}"

To the extent practicable, for the purpose of transferring property to the trust or identifying the trust in any beneficiary or pay-on-death designation, the trust should be identified as:

"${formData.client.firstName} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.lastName}, Trustees, or their successors in interest, of The ${formData.client.firstName} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.lastName} Living Trust, dated ${formData.currentDate}, and any amendments thereto."

For all purposes concerning the identity of the trust or any property titled in or payable to the trust, any description referring to the trust will be effective if it reasonably identifies the trust and indicates that the trust property is held in a fiduciary capacity.

Section 1.02      Reliance by Third Parties

Third parties may require documentation to verify the existence of this trust, or particular provisions of it, including the name of the Trustee or the powers held by the Trustee. To protect the confidentiality of the trust, California Probate Code Section 18100.5, Chapter 530, Statutes of 1993 provides that the Trustee may use a certification of trust that identifies the Trustee and sets forth the authority of the Trustee to transact business on behalf of the trust instead of providing a copy of this instrument to protect the confidentiality of the trust. The certification may include pertinent pages from this instrument, including title or signature pages.

A third party may rely upon a certification of trust that is signed by the Trustee with respect to the representations contained in it. A third party relying upon a certification of trust will be exonerated from any liability for actions the third party takes or does not take in reliance upon the representations contained in the certification of trust.

A third party dealing with the Trustee will not be required to inquire into this trust's terms or the authority of the Trustee, or to see to the application of funds or other property received by the Trustee. The Trustee's receipt of any money or property paid, transferred, or delivered to the Trustee will be a sufficient discharge to the third party from all liability in connection with its application. A written statement by the Trustee is conclusive evidence of the Trustee's authority. Third parties are not liable for any loss resulting from their reliance on a written statement by the Trustee asserting the Trustee's authority or seeking to effect a transfer of property to or from the trust.

California Probate Code Section 18100.5(h) provides that a person making a demand for the trust document in addition to the certification of trust, may be liable for damages, including attorney fees, as a result of the refusal to accept the certification of trust.

Section 1.03      Transferring Property to the Trust

Any person or entity may transfer any property to the trust in any manner authorized by law.

        (a)      Initial Funding of the Trust

By executing this instrument, we transfer to the Trustee the properties listed in the Schedule of Assets.

        (b)      Acceptance by the Trustee

By executing this instrument, the Trustee accepts and agrees to hold the properties listed in the Schedule of Assets as trust property. All property transferred to the trust after the date of this trust must be acceptable to the Trustee. The Trustee may refuse to accept any property. The Trustee shall hold, administer, and dispose of all accepted trust property for our benefit and for the benefit of our beneficiaries, in accordance with the terms of this trust.

Section 1.04      Powers Reserved by Us as Grantors

As Grantors, we retain the powers set forth in this Section in addition to any powers that we reserve in other provisions of this instrument.

        (a)      Action on Behalf of the Trust

Whenever both of us are serving as Trustees, either or both of us may act for and conduct business on behalf of the trust without the consent of the other.

        (b)      Amendment, Restatement, or Revocation

We may jointly amend, restate, or revoke this instrument, in whole or in part, for any purpose. Any amendment, restatement, or revocation must be made in writing and delivered to the then-serving Trustee.

        (c)      Addition or Removal of Trust Property

We may add property to the trust and may remove any property from the trust at any time. If either or both of us is incapacitated, the non-incapacitated Grantor may add or remove property.

        (d)      Control of Income and Principal Distributions

We retain the right to control the distribution of income and principal from the trust. We may direct the Trustee to distribute as much of the net income and principal of the trust property as we consider advisable to ourselves or to other persons or entities. The Trustee may distribute the net income and principal to us or for our unrestricted use and benefit, even to the exhaustion of all trust property. Any undistributed net income is to be added to the principal of the trust.

        (e)      Approval of Investment Decisions

We reserve the absolute right to review and change the Trustee's investment decisions. But the Trustee is not required to seek our approval before making investment decisions.

Section 1.05      Grantor Trust Status and Community Property

By reserving the broad rights and powers set forth in Section 1.04 of this Article, we intend to qualify the trust as a Grantor Trust under Internal Revenue Code Sections 671 to 677. This means that, for federal income tax purposes, each of us will be treated as the owner of one-half of all community property held in the trust and as the owner of our respective separate property.

During any period that the trust is a Grantor Trust, the Taxpayer Identification Number of the trust will be one of our Social Security numbers, in accordance with Treasury Regulation Section 301.6109-1(a)(2).

Any community property transferred to the trust, including the property's income and proceeds from sale or exchange, will retain its character as community property during our lives, to the same extent as if it had not been transferred to the trust.

Article Two
Family Information

${formData.client.firstName} ${formData.client.lastName} is referred to in this trust as "${formData.client.sex === 'male' ? 'he' : 'she'}", and ${formData.spouse.firstName} ${formData.spouse.lastName} is referred to in this trust as "${formData.spouse.sex === 'male' ? 'he' : 'she'}".

${formData.children && formData.children.length > 0 ? `We have the following children:

${formData.children.map((child, i) => `     ${i + 1}. ${child.name}, born on ${child.birthday}`).join('\n')}

All references in this document to our children are references to these children, and any children subsequently born to us or adopted by us by legal proceeding. References to our descendants are to our children and their descendants, including any deceased child's descendants.` : 'We have no children.'}

Article Three
Trustee Succession Provisions

Section 3.01      Resignation of a Trustee

A Trustee may resign by giving written notice to either of us. If we are both incapacitated or deceased, a resigning Trustee must give written notice to the trust's Income Beneficiaries and to any other then-serving Trustee.

Upon the resignation of a Trustee, the resigning Trustee may appoint the resigning Trustee's successor as Trustee in the manner set forth in Section 2.04, concurrent with the written notice described above. If the resigning Trustee fails to make the appointment, the other provisions of this Article regarding Trustee succession upon incapacity or death will govern, and the next named successors to the resigning Trustee will serve in the order listed. Likewise, if no named successors to the resigning Trustees are available to serve and the resigning Trustee fails to designate a successor, the other provisions of this Article regarding the filling of a vacant Trustee office will govern.

Section 3.02      Trustee Succession while Both of Us Are Alive

While we are both alive, this Section governs the removal and replacement of the Trustees.

        (a)      Removal and Replacement by Both of Us

By joint agreement, we may remove any Trustee at any time, with or without cause. If a Trustee is removed, resigns, or cannot continue to serve for any reason, either or both of us may serve as Trustee, we may appoint a Trustee to serve with either or both of us, or we may appoint a successor Trustee.

        (b)      Removal and Replacement by One of Us

If one of us is incapacitated, the non-incapacitated Grantor may remove any Trustee at any time, with or without cause. If a Trustee is removed, resigns, or cannot continue to serve for any reason, the non-incapacitated Grantor may serve as sole Trustee, appoint a Trustee to serve with the non-incapacitated Grantor, or appoint a successor Trustee.

        (c)      Successor Trustee during Incapacity of a Grantor

During the incapacity of a Grantor, the other Grantor may serve as sole Trustee.

If the other Grantor is unable or unwilling to serve for any reason, then we name ${formData.successorTrustees && formData.successorTrustees.length > 0 ? formData.successorTrustees.map((trustee, i) => `${trustee.name}${trustee.jointly && i < formData.successorTrustees.length - 1 ? ' and ' : i < formData.successorTrustees.length - 1 ? ', ' : ''}`).join('') : '[No successor trustees named]'}${formData.successorTrustees && formData.successorTrustees.some(t => t.jointly) ? ', jointly, or the survivor of them,' : ''} to serve as successor Trustee.

        (d)      Removal of Trustee during Incapacity of Both of Us

During any time both of us are incapacitated, a Trustee may be removed only for cause; an interested party must petition a court of competent jurisdiction and receive approval from the court for the Trustee removal to be effective.

        (e)      Designation Default

If the office of Trustee of a trust created under this instrument is vacant and no designated Trustee is able and willing to act during any time that one of us is incapacitated, the other Grantor may appoint a successor Trustee.

The Legal Representative of either of us may petition a court of competent jurisdiction to appoint a successor Trustee to fill any vacancy lasting longer than 30 days. The petitioned court acquires jurisdiction over the trust only to the extent necessary to make the appointment. The trust is not subject to the court's continuing jurisdiction.

If a Trustee vacancy arises due to resignation, the previous provisions apply only if the resigning Trustee fails to appoint a successor Trustee under Section 3.01.

If a Trustee vacancy arises due to resignation, the previous provisions apply only if the resigning Trustee fails to appoint a successor Trustee in the manner more fully set forth in Section 3.01.

All appointments, removals, and revocations must be by signed written instrument.

Section 3.03      Trustee Succession after the Death of Either or Both of Us

After the death of either or both of us, this Section governs the removal and replacement of the Trustees.

        (a)      Upon the Death of a Grantor

Upon the death of a Grantor, the other Grantor may serve as sole Trustee of all trusts created under this instrument.

If the other Grantor is unable or unwilling to serve for any reason, then we name ${formData.successorTrustees && formData.successorTrustees.length > 0 ? formData.successorTrustees.map((trustee, i) => `${trustee.name}${trustee.jointly && i < formData.successorTrustees.length - 1 ? ' and ' : i < formData.successorTrustees.length - 1 ? ', ' : ''}`).join('') : '[No successor trustees named]'}${formData.successorTrustees && formData.successorTrustees.some(t => t.jointly) ? ', jointly, or the survivor of them,' : ''} to serve as successor Trustee.

        (b)      Appointment of Successor Trustees by the Surviving Grantor

After the death of one of us, the surviving Grantor may appoint the current or successor Trustees for any trust created under this instrument. The surviving Grantor may amend or revoke this appointment. Except for the Trustee of the Survivor's Trust, any Trustee appointed by the surviving Grantor to a trust of which the surviving Grantor is a beneficiary must be an individual or corporate fiduciary that is not related or subordinate to the surviving Grantor within the meaning of Internal Revenue Code Section 672(c).

        (c)      Removal of a Trustee

After the death of one of us, the surviving Grantor may remove any Trustee, with or without cause. If the surviving Grantor is incapacitated, a Trustee may be removed only for cause, and only if a court of competent jurisdiction approves the removal upon the petition of an interested party.

After both of our deaths, a Trustee of any trust created under this instrument may be removed by the unanimous decision of all the trust's Income Beneficiaries, with or without cause.

A Trustee may be removed under this Subsection only if the person or persons having the right of removal appoints an individual or corporate fiduciary by the effective removal date and this appointee simultaneously commences service as Trustee. The Trustee appointed to serve as successor Trustee may not be related or subordinate to any person having the right of removal within the meaning of Internal Revenue Code Section 672(c).

The right to remove a Trustee under this Subsection is not to be interpreted to grant the person holding that right any of the powers of that Trustee.

A minor or incapacitated beneficiary's parent or Legal Representative may act on his or her behalf.

        (d)      Default of Designation

If the office of Trustee of a trust created under this instrument is vacant and no designated Trustee is able and willing to act, the surviving Grantor may appoint an individual or corporate fiduciary as successor Trustee.

If the surviving Grantor is unable or unwilling to name a successor Trustee or if both of us are deceased, the trust's Primary Beneficiary may appoint an individual or corporate fiduciary as successor Trustee.

Any beneficiary may petition a court of competent jurisdiction to appoint a successor Trustee to fill any vacancy lasting longer than 30 days. The petition may subject the trust to the jurisdiction of the court only to the extent necessary to make the appointment and may not subject the trust to the continuing jurisdiction of the court.

A minor or incapacitated beneficiary's parent or Legal Representative may act on his or her behalf.

If a Trustee vacancy arises due to resignation, the previous provisions apply only if the resigning Trustee fails to appoint a successor Trustee in the manner more fully set forth in Section 3.01.

Section 3.04      Notice of Removal and Appointment

Notice of removal must be in writing and delivered to the Trustee being removed and to any other then-serving Trustees. The removal becomes effective in accordance with its provisions.

Notice of appointment must be in writing and delivered to the successor Trustee and to any other then-serving Trustees. The appointment becomes effective at the time of acceptance by the successor Trustee. A copy of the notice may be attached to this instrument.

Section 3.05      Appointment of a Co-Trustee

Any individual Trustee may appoint an individual or a corporate fiduciary as a Co-Trustee. This Co-Trustee serves only as long as the appointing Trustee serves, or as long as the last to serve if more than one Trustee appointed the Co-Trustee. This Co-Trustee will not become a successor Trustee upon the death, resignation, or incapacity of the appointing Trustee, unless appointed under the terms of this instrument. Although this Co-Trustee may exercise all the powers of the appointing Trustee, the combined powers of this Co-Trustee and the appointing Trustee may not exceed the powers of the appointing Trustee alone. The Trustee appointing a Co-Trustee may revoke the appointment at any time, with or without cause.

Section 3.06      Corporate Fiduciaries

Any corporate fiduciary serving under this instrument as a Trustee must be a bank, trust company, or public charity that is qualified to act as a fiduciary under applicable federal and state law and that is not related or subordinate to any beneficiary within the meaning of Internal Revenue Code Section 672(c).

Section 3.07      Incapacity of a Trustee

If any individual Trustee becomes incapacitated, the incapacitated Trustee need not resign as Trustee. For Trustees other than us, a written declaration of incapacity by the Co-Trustee or, if none, by the party designated to succeed the incapacitated Trustee, made in good faith and supported by a written opinion of incapacity by a physician who has examined the incapacitated Trustee, will terminate the trusteeship.

Section 3.08      Appointment of Independent Special Trustee

If for any reason the Trustee of any trust created under this instrument is unwilling or unable to act with respect to any trust property or any provision of this instrument, the Trustee shall appoint, in writing, a corporate fiduciary or an individual to serve as an Independent Special Trustee as to this property or with respect to this provision. The Independent Special Trustee appointed may not be related or subordinate to any trust beneficiary within the meaning of Internal Revenue Code Section 672(c).

An Independent Special Trustee will exercise all fiduciary powers granted by this trust unless expressly limited elsewhere in this instrument or by the Trustee in the instrument appointing the Independent Special Trustee. An Independent Special Trustee may resign at any time by delivering written notice of resignation to the Trustee. Notice of resignation will be effective in accordance with the terms of the notice.

Section 3.09      Rights of Successor Trustees

Each successor Trustee serving under this instrument, whether individual or corporate, will have all of the title, rights, powers and privileges granted to the initial Trustees named under this instrument as to the trust of which he or she is named Trustee. In addition, each successor Trustee will be subject to all of the restrictions imposed upon, as well as all obligations and duties, both discretionary and ministerial, given to the original Trustees.

Article Four
Administration of the Trust During a Grantor's Incapacity

Section 4.01      Trust Distributions during a Grantor's Incapacity

For purposes of this Article, incapacitated Grantor's trust property refers to the net income and principal of the incapacitated Grantor's separate property and the net income and principal of the incapacitated Grantor's share of the community property, during any period when a Grantor is incapacitated.

The Trustee shall administer the incapacitated Grantor's trust property as follows.

        (a)      Distributions for the Incapacitated Grantor's Benefit

The Trustee shall regularly and conscientiously make appropriate distributions of income and principal for the benefit of the incapacitated Grantor under the circumstances existing at the time each distribution is made.

Appropriate distributions under this Subsection include the payment of any of the incapacitated Grantor's enforceable legal obligations and premiums for insurance policies owned by the incapacitated Grantor or by the trust, including life, medical, disability, property and casualty, errors and omissions, and longterm health care policies.

The examples included in this Subsection are for purposes of illustration only and are not intended to limit the authority of the Trustee to make any distribution for the incapacitated Grantor's benefit that the Trustee determines appropriate.

        (b)      Manner of Making Distributions

The Trustee may make distributions for the incapacitated Grantor's benefit in any one or more of the following ways:

to the incapacitated Grantor, but only to the extent he or she is able to manage these distributions;

to other persons and entities for the incapacitated Grantor's use and benefit;

to an agent or attorney in fact authorized to act for the incapacitated Grantor under a legally valid durable power of attorney executed by the incapacitated Grantor before his or her incapacity; and

to the incapacitated Grantor's guardian or conservator who has assumed responsibility for the incapacitated Grantor under any court order, decree, or judgment issued by a court of competent jurisdiction.

        (c)      Distributions for the Other Grantor's Benefit

The Trustee may distribute as much of the net income and principal of the incapacitated Grantor's trust as the Trustee considers necessary for the health, education, maintenance and support in reasonable comfort of the other Grantor.

        (d)      Guidance for the Trustee Regarding Distributions

When making distributions under Subsections (a) and (c), the Trustee shall give equal consideration to the incapacitated Grantor's needs and the needs of the other Grantor without any priority between us.

The Trustee may make unequal distributions, distributions to one of us but not the other, or no distributions.

A distribution made to the other Grantor under this Section will not be considered an advancement, and will not be charged against any trust share of the other Grantor that may be distributable to the other Grantor for the other Grantor's benefit under any other provision of this trust.

        (e)      Power to Make Gifts

The Trustee is authorized to make gifts from the incapacitated Grantor's trust as follows.

                 (1)      Continuation of Gifting Program

The Trustee is authorized to honor pledges and to continue to make gifts to charitable organizations that the incapacitated Grantor regularly supported before his or her incapacity in the previously given amounts. The Trustee may continue any gifting program initiated by the incapacitated Grantor before his or her incapacity.

                 (2)      Gifts to Trust Beneficiaries

The Trustee may make gifts on the incapacitated Grantor's behalf, to or for the benefit of any remainder or contingent beneficiary named in this instrument for purposes the Trustee considers to be in the best interest of both the incapacitated Grantor and the beneficiary, including the minimization of income, estate, inheritance, or gift taxes. Any gifts the Trustee makes under this Subsection must be limited to the federal annual gift tax exclusion amount.

                 (3)      Gifts for Tuition

The Trustee may prepay the cost of tuition for any remainder or contingent beneficiary named in this trust. The Trustee may make these payments directly to the educational institution, or by establishing and contributing to a Qualified State Tuition Program established under Internal Revenue Code Section 529.

                 (4)      Gifts for Medical Expenses

The Trustee may pay medical expenses for any remainder or contingent beneficiary named in this trust as permitted under Internal Revenue Code Section 2503(e). The Trustee shall make these payments directly to the medical provider.

                 (5)      Gift Splitting Authorized

The Trustee is authorized to consent to the splitting of gifts under Internal Revenue Code Section 2513 or under similar provisions of any state or local gift tax laws.

                 (6)      Gifts Limited to Ascertainable Standards

An Interested Trustee may only make gifts that are necessary for the health, education, maintenance and support in reasonable comfort of the person to whom a gift is made. The Trustee is not required to consider other income and resources available to the recipient.

                 (7)      Methods of Making Gifts

The Trustee may make gifts of trust property under this Subsection outright, in trust, or in any other manner that the Trustee, in its sole and absolute discretion, considers appropriate.

By way of example and without limiting the Trustee's powers under this Subsection, the Trustee is specifically authorized to make gifts by creating tenancy in common and joint tenancy interests, or by establishing irrevocable trusts (including charitable or noncharitable split interest trusts). The Trustee may make gifts of trust property by establishing and contributing trust property to corporations, family limited partnerships, limited liability partnerships, limited liability companies, or other similar entities, and by making gifts of interests in any of those entities.

To accomplish the objectives described in this Subsection, the Trustee may establish and maintain financial accounts of all types and may execute, acknowledge, seal, and deliver deeds, assignments, agreements, authorizations, checks, and other instruments. The Trustee may prosecute, defend, submit to arbitration, or settle, propose, or accept a compromise with respect to a claim existing in favor of or against the incapacitated Grantor, based on or involving a gift transaction on the incapacitated Grantor's behalf. The Trustee may intervene in any related action or proceeding.

The Trustee may perform any other act the Trustee considers necessary or desirable to complete a gift on the incapacitated Grantor's behalf in accordance with the provisions of this Subsection.

                 (8)      Standard for Making Gifts

We desire that in making gifts on the incapacitated Grantor's behalf, the Trustee consider the history of the incapacitated Grantor's gift making and our estate plan. To the extent reasonably possible, we direct the Trustee to avoid disrupting the dispositive provisions of our estate plan as established by us prior to the Grantor's incapacity.

Article Five
Administration Upon Death of a Grantor

Section 5.01      Surviving Grantor's Trust Property and Deceased Grantor's Trust Property

After the first of us dies, the surviving Grantor's interest in any community property of the trust and the surviving Grantor's separate trust property will be referred to as the surviving Grantor's trust property or the Survivor's Trust.

The deceased Grantor's interest in any community property of the trust and the deceased Grantor's separate trust property will be referred to as the deceased Grantor's trust property.

Section 5.02      Payment of Expenses and Taxes

The Trustee may pay from the deceased Grantor's trust property:

     (a) Expenses of the deceased Grantor's last illness, funeral, and burial or cremation, including expenses of memorials and memorial services;

     (b) Legally enforceable claims against the deceased Grantor or the deceased Grantor's estate;

     (c) Expenses of administering the trust and the deceased Grantor's estate; and

     (d) Court-ordered allowances for those dependent upon the deceased Grantor.

Section 5.03      Payment of Death Taxes

The Trustee shall provide for payment of all death taxes from the trust estate without apportionment. Death taxes may not be allocated to or paid from any assets that are exempt for generation-skipping transfer tax purposes or that qualify for the federal estate tax marital deduction or charitable deduction.

For purposes of this Section, death taxes include all estate, inheritance, succession, and other death taxes, including any interest and penalties, imposed by any jurisdiction by reason of a Grantor's death, except for generation-skipping transfer taxes.

Section 5.04      Notice to Beneficiaries

Upon the death of a Grantor, the Trustee must serve written notice to the trust's beneficiaries as required by California Probate Code Section 16061.7. The notice must include the information specified by statute and must be served not later than 60 days from the date the Trustee acquired knowledge of the trust's existence and the Grantor's death.

Article Six
Specific Distributions and Tangible Personal Property

${formData.specificDistributions && formData.specificDistributions.length > 0 ? formData.specificDistributions.map((dist, i) => {
  return `Section 6.${(i + 1).toString().padStart(2, '0')}      Specific Distribution to ${dist.beneficiary}

As soon as practicable after the death of the surviving Grantor, the Trustee shall distribute the following to ${dist.beneficiary}: ${dist.description}.

${dist.distributionType === 'age' && dist.ageDistributions && dist.ageDistributions.length > 0 ? `This distribution shall be made in the following installments based on age:

${dist.ageDistributions.map(age => `     When ${dist.beneficiary} reaches age ${age.age}: ${age.percentage}% of the distribution`).join('\n')}

Until the final distribution is made, the Trustee shall hold the undistributed portion in trust and may distribute income and principal for ${dist.beneficiary}'s health, education, maintenance, and support.` : 'This distribution shall be made outright and free of trust.'}

${dist.lapse === 'descendants' ? `If ${dist.beneficiary} does not survive the surviving Grantor, this bequest shall lapse and pass to ${dist.beneficiary}'s descendants, per stirpes.` : dist.lapse === 'residuary' ? `If ${dist.beneficiary} does not survive the surviving Grantor, this bequest shall lapse and become part of the residuary estate.` : `If ${dist.beneficiary} does not survive the surviving Grantor, this bequest shall lapse and pass to the other beneficiaries named in this trust.`}
`;
}).join('\n') : ''}
Section 6.${formData.specificDistributions && formData.specificDistributions.length > 0 ? (formData.specificDistributions.length + 1).toString().padStart(2, '0') : '01'}      Distribution of Tangible Personal Property

Each of us may dispose of items of tangible personal property by a signed written memorandum executed after we sign this instrument. The Trustee shall distribute the items of tangible personal property listed in any such memorandum according to its terms.

Any remaining tangible personal property not disposed of by written memorandum shall be distributed to the Survivor's Trust. If we are both deceased, the Trustee shall distribute the property to our children in shares of substantially equal value, to be divided among our children as they agree. If our children cannot agree on a division within six (6) months after the death of the survivor of us, the Trustee shall make the division and distribution in the Trustee's sole discretion.

Article Seven
Creating Trust Shares Upon Death of First Grantor

Section 7.01      Allocation to the Survivor's Trust

The Trustee shall allocate all of the deceased Grantor's remaining trust property to the Survivor's Trust, and shall administer the property as provided in Article Eight.

Section 7.02      Disclaimer by Surviving Grantor

The surviving Grantor may disclaim any portion of any interest in property passing from the deceased Grantor. If the surviving Grantor disclaims any property that would otherwise be allocated to the Survivor's Trust, the Trustee shall allocate the disclaimed property to the Family Trust and administer it as provided in Article Nine.

Any disclaimer must be made in accordance with the requirements of federal and California law governing qualified disclaimers.

Section 7.03      Allocation of Assets

In making allocations between trusts, the Trustee may:

     (a) Allocate assets in kind, in cash, or partly in each;

     (b) Allocate assets disproportionately; and

     (c) Make allocations on a non-pro rata basis, even if the resulting tax basis of property allocated to different trusts differs.

The Trustee's judgment with respect to these matters is conclusive and binding on all persons interested in the trust.

Article Eight
The Survivor's Trust

Section 8.01      Trustee of the Survivor's Trust

The surviving Grantor may serve as sole Trustee of the Survivor's Trust. The surviving Grantor may remove and replace the Trustee of the Survivor's Trust at any time, with or without cause.

Section 8.02      The Surviving Grantor's Right to Amend

The surviving Grantor has the absolute right to amend the Survivor's Trust's terms by restating them in full. The restated Survivor's Trust must be in writing and signed by the surviving Grantor and the Trustee.

The surviving Grantor may not amend the terms of the Family Trust, if any, or any other trust created for the benefit of any person other than the surviving Grantor.

Section 8.03      Distribution of Income and Principal

The Trustee shall distribute all of the net income of the Survivor's Trust to the surviving Grantor at least monthly. The Trustee shall distribute as much of the principal of the Survivor's Trust to the surviving Grantor as he or she directs for any reason.

Section 8.04      General Power of Appointment

The surviving Grantor may appoint all or any portion of the principal and undistributed income remaining in the Survivor's Trust at the surviving Grantor's death among one or more persons or entities, including the creditors of the surviving Grantor's estate.

This power of appointment may be exercised by the surviving Grantor's last will or by a written instrument other than a will, signed by the surviving Grantor and delivered to the Trustee during the surviving Grantor's lifetime. Any exercise of this power must specifically refer to this power of appointment.

Section 8.05      Administration Following Surviving Grantor's Death

The Survivor's Trust becomes irrevocable upon the death of the surviving Grantor. Upon completion of the tasks described in Article Five and Article Six, the Trustee shall administer the unappointed balance or remainder of the Survivor's Trust as provided in Article Ten.

Article Nine
The Family Trust

Section 9.01      Family Trust Beneficiary

The surviving Grantor is the only beneficiary of the Family Trust during the surviving Grantor's lifetime.

Section 9.02      Distribution of Income and Principal

The Trustee shall distribute all of the net income of the Family Trust to the surviving Grantor at least monthly during the surviving Grantor's lifetime.

The Independent Trustee may distribute as much of the principal of the Family Trust to the surviving Grantor as the Independent Trustee may determine advisable for any purpose. If no Independent Trustee is serving, the Trustee shall distribute principal as necessary for the surviving Grantor's health, education, maintenance and support in reasonable comfort.

The surviving Grantor shall not be required to exhaust the Survivor's Trust before receiving distributions from the Family Trust.

Section 9.03      Termination of the Family Trust

The Family Trust will terminate upon the death of the surviving Grantor and the Trustee shall administer the balance or remainder of the Family Trust as provided in Article Ten.

Article Ten
Distribution for Our Beneficiaries

Section 10.01      Division of Remaining Trust Property

Upon the death of the survivor of us, after payment of expenses, taxes, and specific distributions provided in Articles Five and Six, the Trustee shall distribute the remaining trust property as follows:

${formData.residuaryDistributionType === 'individuals' && formData.residuaryBeneficiaries && formData.residuaryBeneficiaries.length > 0 ? formData.residuaryBeneficiaries.map((ben, i) => {
  const letter = String.fromCharCode(97 + i); // a, b, c, etc.
  return `        (${letter})      ${ben.name}

The Trustee shall distribute ${ben.share}% of the remaining trust property to ${ben.name}${ben.relation ? `, our ${ben.relation}` : ''}.

${ben.distributionType === 'outright' ? 'This share shall be distributed outright and free of trust.' : ben.distributionType === 'guardian' && ben.ageMilestones && ben.ageMilestones.length > 0 ? `This share shall be held in trust and distributed in installments:

${ben.ageMilestones.map(milestone => `     When ${ben.name} reaches age ${milestone.age}: ${milestone.percentage}% of the share`).join('\n')}

Until the age-based distributions are complete, the Trustee may distribute income and principal for ${ben.name}'s health, education, maintenance, and support.` : ben.distributionType === 'needsTrust' ? `This share shall be held in a separate trust (the "${ben.name} Special Needs Trust") to be administered for ${ben.name}'s health, education, maintenance, and support.` : 'This share shall be distributed outright and free of trust.'}

${ben.name} has the testamentary general power to appoint all or any portion of the principal and undistributed income remaining in ${ben.sex === 'male' ? 'his' : ben.sex === 'female' ? 'her' : 'their'} trust at death. If ${ben.name} does not effectively exercise this power of appointment, the Trustee shall distribute the remaining balance per stirpes to ${ben.name}'s descendants. If ${ben.name} has no descendants, the Trustee shall distribute per stirpes to our descendants.`;
}).join('\n\n') : formData.residuaryDistributionType === 'descendants' ? `The entire remaining trust property shall be distributed to our descendants, per stirpes.

If any descendant who is entitled to receive a distribution has not reached 25 years of age, the Trustee shall hold that descendant's share in trust and may distribute income and principal for that descendant's health, education, maintenance, and support until the descendant reaches 25 years of age.` : `The remaining trust property shall be distributed equally among our named beneficiaries.`}

Section 10.02      Per Stirpes Distribution

If any beneficiary named in this Article does not survive the surviving Grantor, that beneficiary's share shall pass to that beneficiary's living descendants, per stirpes. If a beneficiary has no living descendants, that share shall be divided among the other named beneficiaries in proportion to their shares.

For purposes of this Section, a person survives the surviving Grantor if the person is living on the date that is 120 hours after the surviving Grantor's death.

Section 10.03      Testamentary General Power of Appointment

Each beneficiary who receives property in a continuing trust under this Article has a testamentary general power to appoint all or any portion of the principal and undistributed income remaining in that beneficiary's trust at the beneficiary's death.

This power may be exercised in favor of the beneficiary's estate, the beneficiary's creditors, the creditors of the beneficiary's estate, or any other person or entity. The power must be exercised by specific reference to this power in the beneficiary's last will.

Article Eleven
Remote Contingent Distribution

If at any time no person or entity is qualified to receive final distribution of any part of our trust estate, this portion of our trust estate must be distributed one-half to those persons who would inherit it had ${formData.client.firstName} ${formData.client.lastName} then died intestate owning this property, and one-half to those persons who would inherit it had ${formData.spouse.firstName} ${formData.spouse.lastName} then died intestate owning this property, as determined under the laws of California then in effect.

Article Twelve
Distributions to Minors and Incapacitated Beneficiaries

Section 12.01      Retention in Trust

If the Trustee is authorized or directed to distribute property to a person who has not yet reached 21 years of age or who is incapacitated, the Trustee may retain and administer the property in a separate trust for that beneficiary's benefit.

The Trustee shall distribute to the beneficiary as much of the net income and principal as the Trustee determines necessary for the beneficiary's health, education, maintenance, or support. Any undistributed net income will be accumulated and added to principal.

When the beneficiary reaches 21 years of age or is no longer incapacitated, the beneficiary may withdraw all or any portion of the accumulated net income and principal from the trust.

Section 12.02      Testamentary Power of Appointment

Each beneficiary whose trust is created under this Article has a testamentary general power to appoint the remaining trust property at the beneficiary's death. If not effectively appointed, the Trustee shall distribute the balance per stirpes to the beneficiary's descendants, or if none, to our descendants.

Section 12.03      Custodial Accounts

As an alternative to retaining property in trust under Section 12.01, the Trustee may distribute the property to a custodian for the minor beneficiary's benefit under the California Uniform Transfers to Minors Act or the corresponding law of any other state.

The custodian may be the Trustee or any other person. Distributions to a custodian discharge the Trustee from all further accountability for the distributed property.

Article Thirteen
Retirement Plans and Life Insurance Policies

Section 13.01      Retirement Plans

The Trustee may exercise the right to determine the manner and timing of qualified retirement plan benefit payments consistent with federal income tax rules regarding required minimum distributions under Internal Revenue Code Section 401(a)(9).

If the Survivor's Trust becomes the beneficiary of death benefits under any qualified retirement plan, each year the Trustee shall withdraw at least the minimum distribution required under Internal Revenue Code Section 401(a)(9) and immediately distribute all amounts withdrawn to the surviving Grantor.

If any other trust created under this instrument becomes entitled to receive benefits from a qualified retirement plan after the death of both of us, the Trustee may elect to withdraw benefits under any method permitted by law, and may withdraw more than the minimum amount required to be distributed in any year. In no event will the Trustee be required to withdraw benefits at a rate faster than the rate required under Internal Revenue Code Section 401(a)(9).

Section 13.02      Life Insurance Policies

During our lives, each of us individually reserves all rights, powers, privileges, and options with respect to any insurance policy owned by or made payable to the trust, including the right to:

     (a) Borrow money on the security of the policy;

     (b) Surrender the policy for its cash value;

     (c) Change the beneficiary designation; and

     (d) Exercise all other rights under the policy.

After the death of a Grantor, the Trustee may make all appropriate elections with respect to these policies and may collect all sums made payable to the trust. The Trustee may hold the proceeds as part of the trust estate or may use the proceeds to pay expenses or taxes.

Article Fourteen
Trust Administration

Section 14.01      Distributions to Beneficiaries

The Trustee may make cash distributions, in-kind distributions, or distributions partly in each, in proportions and at values determined by the Trustee without the consent of any beneficiary.

An in-kind distribution may be made on a non-pro rata basis. The Trustee's selection and valuation of property for in-kind distribution is conclusive and binding on all persons.

Section 14.02      No Bond Required

The Trustee is not required to furnish any bond for the faithful performance of the Trustee's duties unless required by a court of competent jurisdiction.

Even if California law would require a bond, we waive that requirement. But if a bond is required by law despite our waiver, the bond will be furnished without sureties and at nominal cost.

Section 14.03      Trustee Compensation

During any period we or each of us are serving as Trustee, we will receive no fee in connection with our service as Trustee. Any other individual serving as Trustee is entitled to fair and reasonable compensation for services provided as a fiduciary.

A corporate Trustee is entitled to compensation in accordance with its published fee schedule in effect at the time the services are rendered, or as otherwise agreed in writing.

Section 14.04      Trust Accounting

During our lifetimes, as long as at least one of us is serving as Trustee, the Trustee is not required to provide an accounting to any person.

After the death of the first of us to die, the Trustee must provide an annual accounting to the Qualified Beneficiaries as defined by California Probate Code Section 15804, unless the right to an accounting is waived in a writing delivered to the Trustee.

The Trustee's accounting will include the information described in California Probate Code Section 16062 or any successor statute.

Section 14.05      Independent Trustee

For purposes of this trust, an Independent Trustee is a Trustee who is not:

     (a) The Grantor or either of the Grantors;

     (b) The Grantor's spouse or either Grantor's spouse;

     (c) The Grantor's parent, sibling, or descendant; or

     (d) An employee of the Grantor or either of the Grantors.

Section 14.06      Court Proceedings

The Trustee or any trust beneficiary may petition a court of competent jurisdiction for a ruling on any matter concerning the trust, including but not limited to:

     (a) Determining the validity of any trust provision;

     (b) Determining the Trustee's powers or responsibilities;

     (c) Ascertaining beneficiaries;

     (d) Settling the Trustee's accounts;

     (e) Instructing the Trustee;

     (f) Granting powers to the Trustee;

     (g) Fixing or allowing payment of the Trustee's compensation; or

     (h) Appointing or removing a Trustee.

Article Fifteen
The Trustee's Powers

Section 15.01      General Powers

The Trustee has all powers necessary to manage and protect the trust property, including but not limited to the powers described in California Probate Code Sections 16200 through 16249, as amended from time to time, and the following additional powers:

     (a) To invest and reinvest trust property in any type of property or investment, including common or preferred stocks, bonds, notes, debentures, mortgages, limited or general partnership interests, limited liability company interests, options, commodity futures contracts, and real estate located in any state, without regard to whether the investment is authorized by state law for investment by fiduciaries;

     (b) To sell, exchange, lease (for any period, including periods in excess of the term of any trust), grant options affecting, or otherwise dispose of trust property, at public or private sale, for cash or on credit;

     (c) To borrow money for any purpose and encumber trust property by mortgage, deed of trust, pledge, or otherwise;

     (d) To manage real estate, including the power to lease, mortgage, and improve;

     (e) To vote shares of stock in person or by general or limited proxy and exercise stockholder rights;

     (f) To conduct or participate in any business;

     (g) To employ and compensate agents, attorneys, accountants, investment advisors, and other professionals;

     (h) To make distributions in cash or in kind, or partly in each;

     (i) To hold property in nominee name or in any other form;

     (j) To compromise claims and settle disputes;

     (k) To make loans to beneficiaries, with or without security and on terms and conditions the Trustee considers appropriate;

     (l) To deal with digital assets and online accounts, including social media accounts, email accounts, digital photographs, computer files, and data storage systems;

     (m) To take any action with respect to environmental matters, including inspecting property for hazardous substances, responding to actual or threatened violations of environmental law, and settling or otherwise compromising environmental claims;

     (n) To allocate receipts and expenditures between income and principal as the Trustee determines appropriate, notwithstanding any contrary provision of California law;

     (o) To make tax elections the Trustee considers appropriate, including but not limited to elections relating to the marital deduction, the charitable deduction, allocation of generation-skipping transfer tax exemption, and income tax matters;

     (p) To merge or consolidate any trust created under this instrument with another trust, or to divide any trust into separate trusts, if the merger or division does not impair the rights of any beneficiary or adversely affect the trust's tax status;

     (q) To fund any trust share with cash or in-kind property or a combination of both, as the Trustee determines in the Trustee's sole discretion;

     (r) To exercise all further powers appropriate to carry out the purposes of this trust.

Section 15.02      Investment Powers

The Trustee may invest in any type of investment that the Trustee determines is consistent with the investment goals of the trust, taking into account the overall investment portfolio, the potential return, tax consequences, and the trust's need for liquidity.

The Trustee may retain any investment received from us or from any other source without regard to diversification and without liability for any loss.

Section 15.03      Real Estate Powers

The Trustee may sell, convey, purchase, exchange, lease, mortgage, manage, alter, improve, and in general deal in and with real property in the manner and on the terms the Trustee deems appropriate.

The Trustee may hold real property without any duty to sell the property for a period of time the Trustee determines to be in the beneficiaries' best interests, even if this results in a lack of diversification or productivity or an increase in risk.

Section 15.04      Business Interests

The Trustee may continue, operate, or participate in any business held in the trust without any duty to sell or liquidate the business interest. The Trustee may incorporate a business or contribute business assets to a partnership, limited partnership, or limited liability company.

The Trustee is not liable for any loss resulting from the continuation or operation of any business unless the Trustee acts with gross negligence or willful misconduct.

Section 15.05      Discretionary Distributions

When the Trustee is authorized to make distributions according to a standard relating to a beneficiary's health, education, maintenance, or support, the Trustee may consider the beneficiary's other income and resources known to the Trustee, but is not required to inquire about resources not actually known to the Trustee.

The Trustee is not required to equalize distributions among beneficiaries and may make disproportionate or exclusive distributions to one or more beneficiaries when the Trustee considers it appropriate.

Article Sixteen
General Provisions

Section 16.01      Spendthrift Provision

No beneficiary may assign, anticipate, encumber, alienate, or otherwise voluntarily transfer the income or principal of any trust created under this trust. Neither the income nor the principal is subject to attachment, bankruptcy proceedings, creditors' claims, or any involuntary transfer.

This provision does not apply to claims or expenses for the trust's administration or to governmental claims for taxes.

Section 16.02      Contest Provision

If any person attempts to contest or oppose the validity of this trust or any of its provisions, or commences any legal proceeding to set this trust aside or to challenge any distribution made or action taken under this trust, then that person will forfeit his or her interest in this trust and will be considered to have predeceased the last of us to die for purposes of this instrument.

This provision does not apply to any proceeding to determine the validity of this trust or to construe any trust provision if the proceeding is brought in good faith and with probable cause.

Section 16.03      Survivorship Presumption

If we die under circumstances in which the order of our deaths cannot be established, ${formData.spouse.firstName} ${formData.spouse.lastName} will be considered to have survived ${formData.client.firstName} ${formData.client.lastName}.

If any other beneficiary is living at the death of a Grantor but dies within 120 hours after the Grantor's death, the beneficiary will be considered to have predeceased the Grantor for purposes of this trust.

Section 16.04      Governing Law

This trust is governed, construed, and administered according to the laws of California.

If any provision of this trust is determined to be invalid or unenforceable, the remaining provisions will continue in effect.

Section 16.05      Definitions

Children and Descendants: Include persons legally adopted before reaching 18 years of age. Children and descendants do not include stepchildren or foster children unless legally adopted.

Incapacitated: A person is considered incapacitated when two licensed physicians give the opinion in writing that the individual is unable to effectively manage his or her property or financial affairs. A person is also considered incapacitated if a court determines that he or she is unable to manage his or her property and affairs.

Per Stirpes: Whenever a distribution is to be made to a person's descendants per stirpes, the distribution will be divided into as many equal shares as there are:

     (a) Living children of the designated ancestor; and

     (b) Deceased children of the designated ancestor who left descendants then living.

Each living child receives one share and each share of a deceased child's descendants is divided among them in the same manner.

Section 16.06      Use of Words

As used in this trust, the singular includes the plural, the plural includes the singular, and words of one gender include all genders, as the context requires.

Section 16.07      Titles and Headings

The titles and headings in this instrument are for convenience only and do not limit or expand the substantive provisions.

Section 16.08      Severability

If any provision of this trust is determined to be invalid, illegal, or unenforceable, the remaining provisions will continue in full force and effect, and the invalid provision will be modified to the extent necessary to make it valid and enforceable while preserving the intent of the Grantors.


SCHEDULE A
INITIAL TRUST ASSETS

The following assets are initially transferred to The ${formData.client.firstName} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.lastName} Living Trust:

Real Property located at:
${formData.client.address}, ${formData.client.city}, CA ${formData.client.zip}

Bank Accounts and Investment Accounts

Personal Property and Household Items

Other Assets:

Additional assets may be added to this trust at any time by transferring title to the Trustees or by executing a written assignment.


IN WITNESS WHEREOF, we have executed this trust document on ${formData.currentDate}.



_________________________________
${formData.client.firstName} ${formData.client.middleName || ''} ${formData.client.lastName}, Grantor and Trustee

Date: _____________________



_________________________________
${formData.spouse.firstName} ${formData.spouse.middleName || ''} ${formData.spouse.lastName}, Grantor and Trustee

Date: _____________________


ACKNOWLEDGMENT

State of California
County of ${formData.client.county}

On _________________ before me, _________________________________, Notary Public, personally appeared ${formData.client.firstName} ${formData.client.middleName || ''} ${formData.client.lastName}, who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to the within instrument and acknowledged to me that ${formData.client.sex === 'male' ? 'he' : 'she'} executed the same in ${formData.client.sex === 'male' ? 'his' : 'her'} authorized capacity, and that by ${formData.client.sex === 'male' ? 'his' : 'her'} signature on the instrument the person, or the entity upon behalf of which the person acted, executed the instrument.

I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.

WITNESS my hand and official seal.


_________________________________
Signature of Notary Public


[NOTARY SEAL]


ACKNOWLEDGMENT

State of California
County of ${formData.spouse.county || formData.client.county}

On _________________ before me, _________________________________, Notary Public, personally appeared ${formData.spouse.firstName} ${formData.spouse.middleName || ''} ${formData.spouse.lastName}, who proved to me on the basis of satisfactory evidence to be the person whose name is subscribed to the within instrument and acknowledged to me that ${formData.spouse.sex === 'male' ? 'he' : 'she'} executed the same in ${formData.spouse.sex === 'male' ? 'his' : 'her'} authorized capacity, and that by ${formData.spouse.sex === 'male' ? 'his' : 'her'} signature on the instrument the person, or the entity upon behalf of which the person acted, executed the instrument.

I certify under PENALTY OF PERJURY under the laws of the State of California that the foregoing paragraph is true and correct.

WITNESS my hand and official seal.


_________________________________
Signature of Notary Public


[NOTARY SEAL]
`;

export default jointLivingTrustTemplate;
