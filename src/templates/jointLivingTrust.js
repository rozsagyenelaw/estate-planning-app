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
Administration of the Trust Upon the Death of a Grantor

Section 5.01      Surviving Grantor's Trust Property and Deceased Grantor's Trust Property

After the first of us dies, the surviving Grantor's interest in any community property of the trust and the surviving Grantor's separate trust property will be referred to as the surviving Grantor's trust property. The surviving Grantor's trust property will be referred to as the Survivor's Trust, and the Trustees shall administer the Survivor's Trust as provided in Article Eight.

The deceased Grantor's interest in any community property of the trust and the deceased Grantor's separate trust property will be referred to as the deceased Grantor's trust property.

Section 5.02      Administrative Trust

Upon a Grantor's death, the trust will become irrevocable as it pertains to the administration and distribution of the deceased Grantor's trust property. The Trustee may need to apply for a separate Taxpayer Identification Number for the deceased Grantor's trust property.

Before the distribution of the deceased Grantor's trust property as provided in this trust, the deceased Grantor's trust property will be referred to as the administrative trust, but may continue to be known as The ${formData.client.firstName} ${formData.client.lastName} and ${formData.spouse.firstName} ${formData.spouse.lastName} Living Trust during the administration period. The administrative trust will exist for the period reasonably necessary to complete the administrative tasks set forth in this Article.

Section 5.03      Payment of Expenses and Taxes

The Trustee may pay from the deceased Grantor's trust property:

expenses of the deceased Grantor's last illness, funeral, and burial or cremation, including expenses of memorials and memorial services;

legally enforceable claims against the deceased Grantor or the deceased Grantor's estate;

expenses of administering the trust and the deceased Grantor's estate; and

court-ordered allowances for those dependent upon the deceased Grantor.

These payments are discretionary with the Trustee. The Trustee may make decisions on these payments without regard to any limitation on payment of the expenses and may make payments without any court's approval. No third party may enforce any claim or right to payment against the trust by virtue of this discretionary authority.

If payment would decrease the federal estate tax charitable deduction available to the deceased Grantor's estate, the Trustee may not pay any administrative expenses from assets passing to an organization that qualifies for the federal estate tax charitable deduction.

If payment would decrease the federal estate tax marital deduction available to the deceased Grantor's estate or violate the provisions of Treasury Regulation Section 20.2056(b)-4(d), the Trustee may not pay any administrative expenses from the net income of property qualifying for the federal estate tax marital deduction.

The Trustee shall pay death taxes out of the trust property's principal, as provided in Section 5.05. But if a probate estate is opened within six months after the date of the deceased Grantor's death, the deceased Grantor's Personal Representative shall pay any outstanding claims and expenses as authorized by the Personal Representative, as well as any death taxes from the deceased Grantor's probate estate to the extent that the cash and readily marketable assets in the deceased Grantor's probate estate are sufficient.

Section 5.04      Excluding Life Insurance Proceeds from Creditors

Despite anything to the contrary in this instrument, any life insurance proceeds payable to the Trustee under this instrument must never be or become part of our probate or testamentary estate. Nothing in this instrument directs that these life insurance proceeds be used to pay our debts or expenses.

Section 5.05      Payment of Death Taxes

For the purposes of this Article, the term death taxes refers to any taxes imposed by reason of the deceased Grantor's death by federal, state, or local authorities, including estate, inheritance, gift, and direct-skip generation-skipping transfer taxes. For purposes of this Section, death taxes does not include any additional estate tax imposed by Internal Revenue Code Section 2031(c)(5)(C) or Section 2032A(c), or any other comparable recapture tax imposed by any taxing authority. Nor does the term include any generation-skipping transfer tax, other than a direct-skip generation-skipping transfer tax.

Except as otherwise provided in this Article or elsewhere in this trust, the Trustee shall provide for payment of all death taxes from the administrative trust without apportionment. The Trustee may not seek contribution toward or recovery of any payments of death taxes from any individual.

        (a)      Protection of Exempt Property

Death taxes may not be allocated to or paid from any assets that are not included in the deceased Grantor's gross estate for federal estate tax purposes. To the extent practicable, the Trustee may not pay any death taxes from assets that are exempt from generation-skipping transfer tax purposes.

        (b)      Protection of the Marital Deduction

Death taxes may not be paid from or allocated to any property that qualifies for the federal estate tax marital deduction.

        (c)      Protection of the Charitable Deduction

Death taxes may not be paid from or allocated to any assets passing to an organization that qualifies for the federal estate tax charitable deduction, or from any assets passing to a split-interest charitable trust, unless the Trustee has first used all other assets available to pay the taxes.

        (d)      Property Passing outside of the Trust

Death taxes imposed with respect to property included in the deceased Grantor's gross estate for death tax purposes but passing outside of the trust are to be apportioned among the persons and entities benefited. The proportion attributed to each person or entity is the taxable value of each person or entity's beneficial interest over the total taxable value of all property and interests included in the deceased Grantor's gross estate for death tax purposes. The values used for the apportionment are to be the values as finally determined under federal, state, or local law.

        (e)      QTIP Property

If the Trustee or the surviving Grantor's Personal Representative waives any right of recovery granted by Section 2207A and corresponding provisions of applicable state law, no death taxes paid as a result of including property held in a qualified terminable interest property (QTIP) trust created by the first Grantor to die and included in the taxable estate of the second Grantor to die will be apportioned to or collected from the assets of the QTIP as provided in Internal Revenue Code Section 2207A.

Section 5.06      Coordination with the Personal Representative

The following provisions are intended to help facilitate the coordination between the deceased Grantor's Personal Representative and the Trustee. These provisions apply even if the Personal Representative and the Trustee are the same person or entity.

        (a)      Reliance on Information from The Personal Representative

The Trustee may rely upon the written request of the deceased Grantor's Personal Representative for payments authorized under this Article and the amounts included in those payments without computing the sums involved. If a payment is made under this Article to the deceased Grantor's Personal Representative, the Trustee will have no duty to inquire into the application of the payment.

        (b)      Receipt of Probate Property

The Trustee may accept or decline any distributions of property tendered to the Trustee by the deceased Grantor's Personal Representative. If the Trustee accepts the property, the Trustee may do so without audit, and will not be required to review the Personal Representative's records.

        (c)      Discretionary Distributions to the Deceased Grantor's Personal Representative

The Trustee may distribute cash, accrued income, or other trust property to the deceased Grantor's probate estate as a beneficiary of this trust, to the extent the Trustee determines that doing so is in the best interests of the trust beneficiaries.

Section 5.07      Authority to Make Tax Elections

After a Grantor's death, the Trustee may make tax elections as provided in this Section. But if a Personal Representative is appointed for the deceased Grantor's probate estate, the discretionary authority granted to the Trustee as to any tax election will be subordinate to the Personal Representative's statutorily delegated authority.

        (a)      Tax Elections

The Trustee may make any tax elections necessary for the efficient administration of the deceased Grantor's estate, including:

valuing assets according to an alternate valuation date;

electing whether to take administration expenses as estate tax deductions or income tax deductions;

allocating a Grantor's unused generation-skipping exemption to any portion of the trust property;

electing special-use valuation;

deferring payment of all or any portion of any taxes; and

treating any portion of the deceased Grantor's administrative trust as part of the deceased Grantor's estate for federal or state income tax purposes, or both.

In addition, the Trustee, in its sole and absolute discretion, may elect to waive, in whole or in part, the surviving Grantor's right to have the surviving Grantor's estate reimbursed for any tax paid as a result of the inclusion in the surviving Grantor's taxable estate of property held in a qualified terminable interest property (QTIP) trust created for the surviving Grantor by the deceased Grantor.

The Trustee may make equitable adjustments between income and principal because of any tax elections made by the Trustee.

        (b)      Allocation of GST Exemption

The Trustee may elect to allocate or not allocate any portion of the Available GST Exemption under Internal Revenue Code Section 2631, or a counterpart exemption under any applicable state law to any property of which the deceased Grantor is considered the transferor for generation-skipping transfer tax purposes. This includes any property transferred by the deceased Grantor during the deceased Grantor's life for which the deceased Grantor did not make an allocation prior to death. The exercise of the Trustee's discretion should be based on the transfers, gift tax returns, and other information known to the Trustee, with no requirement that allocations benefit the various transferees or beneficiaries in any particular manner.

        (c)      Qualified Conservation Easements

The Trustee may create a qualified conservation easement, as defined in Internal Revenue Code Section 2031(c)(8)(A), in any land held by the trust and may make the necessary election provided by Section 2031(c)(6).

Section 5.08      Authority to Elect Portability

The applicable exclusion amount is defined in Internal Revenue Code Section 2010(c)(2). After the death of one of us, if the deceased Grantor's applicable exclusion amount cannot be fully used, and the deceased Grantor does not have a duly appointed Personal Representative for the deceased Grantor's estate, then we nominate the Trustee to serve as the deceased Grantor's executor or administrator for purposes of Internal Revenue Code Section 2203.

We authorize the Trustee, in its sole and absolute discretion, when acting as the deceased Grantor's executor or administrator for purposes of Internal Revenue Code Section 2203, to make a timely election under Internal Revenue Code Section 2010(c)(5)(A) so that the surviving Grantor may take the deceased Grantor's deceased spousal unused exclusion amount (DSUE) as defined in Internal Revenue Code Section 2010(c)(4), if any, into account in calculating the surviving Grantor's applicable exclusion amount.

In determining whether or not a DSUE election should be made, the Trustee, acting as the deceased Grantor's executor or administrator for purposes of Internal Revenue Code Section 2203, may take into account the overall size of the surviving Grantor's estate, the projected inclusion of the deceased Grantor's trust estate due to the use of QTIP elections, and general powers of appointment granted by the deceased Grantor to the surviving Grantor.

The Trustee, acting as executor or administrator for purposes of Internal Revenue Code Section 2203, will not be liable to the beneficiaries of our Trust or the beneficiaries of the surviving Grantor's estate for the failure to make a DSUE election under Internal Revenue Code Section 2010(c)(5)(A).

Article Six
Specific Distributions and Disposition of Tangible Personal Property

${formData.specificDistributions && formData.specificDistributions.length > 0 ? formData.specificDistributions.map((dist, i) => {
  return `Section 6.${(i + 1).toString().padStart(2, '0')}      Specific Distribution to ${dist.beneficiary}

As soon as practicable after the death of the surviving Grantor, the Trustee shall distribute ${dist.description} to ${dist.beneficiary}.${dist.noSale ? ' The Trustee is not allowed to sell this property.' : ''}

If ${dist.beneficiary} is deceased, then this distribution will lapse, and this property instead will be distributed under the other provisions of this trust.

Property passing under this Section passes free of any administrative expenses or death taxes.
`;
}).join('\n') : ''}
Section 6.${formData.specificDistributions && formData.specificDistributions.length > 0 ? (formData.specificDistributions.length + 1).toString().padStart(2, '0') : '01'}      Specific Gift of Residence

When the first Grantor dies, the Trustee shall distribute any real property, including buildings and improvements, used by the surviving Grantor as his or her principal residence, to the Survivor's Trust. This gift includes insurance policies on the property and claims under those policies. The Trustee shall distribute the property subject to all liens and encumbrances against the property that exist at the death of the first Grantor to die.

If the surviving Grantor disclaims any interest in the property distributed under this provision, the interest will be distributed as provided in the Articles that follow.

Section 6.${formData.specificDistributions && formData.specificDistributions.length > 0 ? (formData.specificDistributions.length + 2).toString().padStart(2, '0') : '02'}      Distribution of Tangible Personal Property by Memorandum

Each of us may dispose of items of tangible personal property by a signed written memorandum executed after we sign this instrument. The memorandum must refer to the trust and must reasonably identify the items and the beneficiary designated to receive each item. If either or both of us executes a memorandum, the Trustee shall incorporate the memorandum by reference into this instrument to the extent permitted by law.

The Trustee shall distribute the items of tangible personal property listed in the memorandum as promptly as practicable after the death of a Grantor who completed the memorandum, together with any insurance policies covering the property and any claims under those policies, as provided in the memorandum. If either or both of us leave multiple written memoranda that conflict as to the disposition of any item of tangible personal property, the memorandum with the most recent date will control as to that item.

If the law does not permit incorporation of the memorandum by reference, the memorandum will then serve as an amendment to the trust, but only to the extent this amendment solely disposes of tangible personal property. We request that the Trustee follow our wishes and distribute the items of tangible personal property listed in the memorandum according to its terms.

Section 6.${formData.specificDistributions && formData.specificDistributions.length > 0 ? (formData.specificDistributions.length + 3).toString().padStart(2, '0') : '03'}      Distribution of Remaining Tangible Personal Property

The Trustee shall distribute any of the deceased Grantor's remaining tangible personal property not disposed of by a written memorandum to the Survivor's Trust to be administered as provided in Article Eight. If we are both deceased, the Trustee shall distribute the property to our children but not to their descendants, in shares of substantially equal value, to be divided among our children as they agree. If the Trustee determines that a child is incapable of acting in his or her own best interest, the Trustee shall appoint a person to represent the child in the division of the property. If our children are unable to agree upon the division of the property within six months after the death of the surviving Grantor, the Trustee shall make the division according to the Trustee's discretion. The Trustee may use a lottery, rotation system, or any other method of allocation to determine the order of selection and distribution of the property. As an alternative, the Trustee may sell all or any portion of the property and distribute the net proceeds equally among our then-living children. The Trustee will not incur any liability to any party for decisions made by the Trustee with respect to the division or sale of tangible personal property. Any decision made by the Trustee will be final and binding on all beneficiaries.

Section 6.${formData.specificDistributions && formData.specificDistributions.length > 0 ? (formData.specificDistributions.length + 4).toString().padStart(2, '0') : '04'}      Definition of Tangible Personal Property

For purposes of this Article, the term tangible personal property includes household furnishings, appliances and fixtures, works of art, motor vehicles, pictures, collectibles, apparel and jewelry, books, sporting goods, and hobby paraphernalia. The term does not include any property that the Trustee, in its sole and absolute discretion, determines to be part of any business or business interest owned by the deceased Grantor or the trust.

After the death of a Grantor, if the Trustee receives property to be distributed under this Article from the deceased Grantor's probate estate or in any other manner, the Trustee shall distribute the property in accordance with this Article's terms. The fact that an item of tangible personal property was not received by the trust until after the death of a Grantor does not diminish the validity of the gift. If property to be distributed under this Article is not part of the trust property upon the death of a Grantor and is not subsequently transferred to the Trustee from the deceased Grantor's probate estate or in any other manner, then the specific distribution of property made in this Article is null and void, without any legal or binding effect.

Section 6.${formData.specificDistributions && formData.specificDistributions.length > 0 ? (formData.specificDistributions.length + 5).toString().padStart(2, '0') : '05'}      Incidental Expenses and Encumbrances

Until property distributed in accordance with this Article is delivered to the appropriate beneficiary or his or her Legal Representative, the Trustee shall pay the reasonable expenses of securing, storing, insuring, packing, transporting, and otherwise caring for the property as an administration expense. Except as otherwise provided in the trust, the Trustee shall distribute property under this Article subject to all liens, security interests, and other encumbrances on the property.

Section 6.${formData.specificDistributions && formData.specificDistributions.length > 0 ? (formData.specificDistributions.length + 6).toString().padStart(2, '0') : '06'}      Residuary Distribution

Any property not distributed under this or prior Articles of this instrument will be distributed as provided in the following Articles.

Article Seven
Creating Trust Shares upon the Death of a Grantor

The Trustee shall administer the deceased Grantor's remaining trust property as provided in this Article.

Section 7.01      Allocation to the Survivor's Trust

The Trustee shall allocate all of the deceased Grantor's remaining trust property to the Survivor's Trust, and shall administer the property as provided in Article Eight.

Section 7.02      Disposition of Property upon Disclaimer by the Surviving Grantor

The surviving Grantor, his or her fiduciary, or his or her agent serving under a power of attorney may disclaim any portion of any interest in or power over property passing from the deceased Grantor to or for the surviving Grantor's benefit under this instrument. If the surviving Grantor disclaims any property that would otherwise be allocated to the Survivor's Trust, the Trustee shall allocate the disclaimed property to the Non-Marital Share. The Trustee shall administer the Non-Marital Share as provided in Article Nine.

If the surviving Grantor disclaims his or her interest in any portion of the Non-Marital Share, the Trustee shall dispose of the disclaimed interest as though the surviving Grantor had predeceased the deceased Grantor.

Section 7.03      Option to Allocate Deceased Grantor Trust Property to the Survivor's Trust

The Trustee may waive any allocation to the Marital and Non-Marital Shares and administer all of the trust assets under the provisions of the Survivor's Trust if:

the combined value of the deceased and surviving Grantors' assets is less than the exemption equivalent for the deceased Grantor allowed by the Internal Revenue Service; and

all of the then-living current and remainder beneficiaries entitled to the assets of any trusts that would otherwise be created from the Marital Share, Non-Marital Share, or both agree to waive any allocation to those shares or trusts or both in writing.

If any of the beneficiaries is a minor, the minor's parent or guardian may waive the allocation on behalf of the minor in writing.

Article Eight
The Survivor's Trust

The Trustee shall administer the Survivor's Trust as provided in this Article.

Section 8.01      Trustee of the Survivor's Trust

The surviving Grantor may serve as sole Trustee of the Survivor's Trust. The surviving Grantor may remove and replace the Trustee of the Survivor's Trust at any time, with or without cause. Notwithstanding any other provision in this instrument, the surviving Grantor may appoint any individual or corporate fiduciary to serve as Trustee of the Survivor's Trust.

Section 8.02      The Surviving Grantor's Right to Amend

The surviving Grantor also has the absolute right to amend the Survivor's Trust's terms by restating them in full. The restated Survivor's Trust must be in writing and signed by the surviving Grantor and the Trustee of the restated Survivor's Trust.

The right to amend by restatement may be exercised only by the surviving Grantor.

Section 8.03      Survivor's Trust As Only Trust

If the Survivor's Trust is the only trust established on the death of the deceased Grantor, a transfer to that trust need not be evidenced by a change of title.

Section 8.04      Separate Share for Deceased Grantor's Trust Property

If the Survivor's Trust becomes the beneficiary of death benefits under any qualified retirement plan, the Trustee shall hold this property in a separate share of the Survivor's Trust during the surviving Grantor's lifetime. The Trustee shall administer the separate share in accordance with all of this Article's provisions. But the surviving Grantor may not amend the terms of the separate share.

The purpose of the separate share is to keep the deceased Grantor's trust property and its accumulated income separate from the main share during the lifetime of the surviving Grantor, in order to qualify the separate share as a designated beneficiary under qualified retirement plans.

The Trustee shall distribute as much of the principal and accumulated income of the separate share to the main share of the Survivor's Trust as the surviving Grantor directs. This right to direct distribution from the separate share to the main account may be exercised only by the surviving Grantor.

Section 8.05      Distribution of Income

The Trustee shall distribute all of the net income of the Survivor's Trust to the surviving Grantor at least monthly. Nothing contained in this instrument may limit the right of the surviving Grantor to receive the Survivor's Trust's entire net income.

Section 8.06      Distributions of Principal

The Trustee shall distribute as much of the principal of the Survivor's Trust to the surviving Grantor as he or she directs for any reason.

The Trustee may also distribute as much of the principal of the Survivor's Trust to the surviving Grantor as the Trustee determines necessary or advisable for any purpose.

Section 8.07      Unproductive Property

At the direction of the surviving Grantor, the Trustee shall convert any nonproductive property held in the Survivor's Trust to productive property.

Section 8.08      Trust Distributions during the Incapacity of the Surviving Grantor

During any time the surviving Grantor is incapacitated, the Trustee shall administer the Survivor's Trust according to the provisions of Section 4.01.

Section 8.09      General Power of Appointment

The surviving Grantor may appoint all or any portion of the principal and undistributed income remaining in the Survivor's Trust at the surviving Grantor's death among one or more persons or entities, including the creditors of the surviving Grantor's estate. The surviving Grantor has the exclusive right to exercise this general power of appointment.

Section 8.10      Administration following the Surviving Grantor's Death

The Survivor's Trust becomes irrevocable upon the death of the surviving Grantor, and the Trustee shall administer the Survivor's Trust consistent with the provisions of Article Five for administration following the death of the first of us to die.

Upon completion of the administrative tasks, the Trustee shall administer the unappointed balance or remainder of the Survivor's Trust as provided in Article Ten.

Article Nine
The Family Trust

The Trustee shall hold and administer the Non-Marital Share in a separate trust as provided in this Article. This document refers to the trust as the Family Trust.

Section 9.01      Family Trust Beneficiary

The surviving Grantor is the only beneficiary of the Family Trust during the surviving Grantor's lifetime.

Section 9.02      Distribution of Income

The Trustee shall distribute all of the net income of the Family Trust to the surviving Grantor at least monthly during the surviving Grantor's lifetime.

Section 9.03      Distribution of Principal

The Independent Trustee may distribute as much of the principal of the Family Trust to the surviving Grantor as the Independent Trustee may determine advisable for any purpose. If no Independent Trustee is then serving, the Trustee shall distribute as much principal to the surviving Grantor as the Trustee determines necessary or advisable for the surviving Grantor's health, education, maintenance and support in reasonable comfort.

Section 9.04      Guidelines to the Trustee

The surviving Grantor is the only beneficiary of the Family Trust. In making discretionary distributions under this Article, the Trustee should bear in mind that our primary concern and objective is to provide for the well-being of the surviving Grantor, and the preservation of principal is not as important as this objective.

Without limiting the Trustee's discretion, we recommend that the Trustee not distribute principal from the Family Trust to the surviving Grantor until the principal of the Survivor's Trust is substantially exhausted.

Section 9.05      Termination of the Family Trust

The Family Trust will terminate upon the death of the surviving Grantor and the Trustee shall administer the balance or remainder of the Family Trust as provided in Article Ten.

Article Ten
Distribution for Our Beneficiaries

Upon the death of the survivor of us, the Trustee shall administer and distribute our remaining trust property (not distributed under prior Articles of this instrument), or other property allocated to this Article under the terms of this Article${formData.residuaryBeneficiaries && formData.residuaryBeneficiaries.length > 0 ? ` to ${formData.residuaryBeneficiaries.map(b => b.name).join(', ')}` : ' to our beneficiaries'}.

Section 10.01      Division of Remaining Trust Property

The Trustee shall distribute the remaining trust property in trust as provided in this Section.

${formData.residuaryBeneficiaries && formData.residuaryBeneficiaries.length > 0 ? formData.residuaryBeneficiaries.map((ben, i) => {
  const letter = String.fromCharCode(97 + i); // a, b, c, etc.
  const pronoun = ben.sex === 'male' ? 'his' : ben.sex === 'female' ? 'her' : 'their';
  const pronounCap = ben.sex === 'male' ? 'His' : ben.sex === 'female' ? 'Her' : 'Their';
  const himHer = ben.sex === 'male' ? 'him' : ben.sex === 'female' ? 'her' : 'them';
  return `        (${letter})      Distributions of Income and Principal for ${ben.name}

The Independent Trustee may distribute to ${ben.relation ? `our ${ben.relation}, ` : ''}${ben.name}, ${pronoun} descendants, or both as much of the income and principal of ${pronoun} trust as the Independent Trustee may determine advisable for any purpose. If no Independent Trustee is then serving, the Trustee shall distribute to ${ben.name}, ${pronoun} descendants, or both as much of the income and principal of ${pronoun} trust as the Trustee determines necessary or advisable for ${pronoun} health, education, maintenance, or support.

The Trustee shall add any undistributed net income to principal.

        (${letter})      Guidelines for Discretionary Distributions

In making discretionary distributions to ${ben.name}, we desire to provide for ${pronoun} well-being and happiness. Although we request that the Trustee consider the other known resources available to ${ben.name} before making distributions, we also request that the Trustee be liberal in making any distributions to, or for ${pronoun} benefit. We acknowledge that the principal of the trust established for ${ben.name} may be exhausted in making these distributions.

${ben.ageMilestones && ben.ageMilestones.length > 0 ? `        (${letter})      Right to Withdraw Principal

At the intervals set forth below, ${ben.name} may withdraw from ${pronoun} trust, at any time, amounts not to exceed in the aggregate:

${ben.ageMilestones.map(milestone => `${milestone.percentage}% of the accumulated trust income and principal, after reaching ${milestone.age} years of age;`).join('\n')}
` : ''}
        (${letter})      Distribution upon the Death of ${ben.name}

Subject to the terms of the next paragraph, ${ben.name} has the unlimited testamentary general power to appoint all or any portion of the principal and undistributed income remaining in ${pronoun} trust at ${pronoun} death among one or more persons or entities and ${ben.name}'s estate's creditors. ${ben.name} has the exclusive right to exercise this general power of appointment.

${ben.name} may not exercise this power of appointment to appoint to ${himHer}self, ${pronoun} estate, ${pronoun} creditors, or the creditors of ${pronoun} estate from the limited share of ${pronoun} trust. For purposes of this power of appointment, the limited share of ${ben.name}'s trust is that portion of ${pronoun} trust that has an inclusion ratio of zero for generation-skipping transfer tax purposes, or that would not constitute a taxable generation-skipping transfer at ${pronoun} death in the absence of the power of appointment's exercise. If the generation-skipping tax does not then apply, the limited share is ${ben.name}'s entire trust.

If any part of ${ben.name}'s trust is not effectively appointed, the Trustee shall distribute the remaining unappointed balance per stirpes to ${ben.name}'s descendants. If ${ben.name} has no descendants, the Trustee shall distribute the remaining unappointed balance per stirpes to our descendants. If we have no then-living descendants, the Trustee shall distribute the remaining unappointed balance under the terms of Article Eleven.

        (${letter})      Distribution if ${ben.name} Is Deceased

If ${ben.name} dies before the establishment of ${pronoun} trust, the Trustee shall distribute the remaining trust property per stirpes to ${pronoun} descendants. If ${ben.name} has no descendants, the Trustee shall distribute the remaining trust property per stirpes to our descendants. If we have no then-living descendants, the Trustee shall distribute the remaining trust property under the terms of Article Eleven.
`;
}).join('\n') : `The Trustee shall distribute the remaining trust property to our descendants, per stirpes.`}

Article Eleven
Remote Contingent Distribution

If at any time no person or entity is qualified to receive final distribution of any part of our trust estate, this portion of our trust estate must be distributed one-half to those persons who would inherit it had ${formData.client.firstName} ${formData.client.lastName} then died intestate owning this property, and one-half to those persons who would inherit it had ${formData.spouse.firstName} ${formData.spouse.lastName} then died intestate owning this property. This distribution will be as determined and proportioned under the laws of California then in effect.

Article Twelve
Distributions to Underage and Incapacitated Beneficiaries

If the Trustee is authorized or directed under any provision of this trust to distribute net income or principal to a person who has not yet reached 18 years of age or who is incapacitated as defined in Section 16.07(g), the Trustee may make the distribution by any one or more of the methods described in Section 12.01. Alternatively, the Trustee may retain the trust property in a separate trust to be administered by the Trustee under Section 12.02.

We request that before making a distribution to a beneficiary, the Trustee consider, to the extent reasonable, the ability the beneficiary has demonstrated in managing prior distributions of trust property.

Section 12.01      Methods of Distribution

The Trustee may distribute trust property for any beneficiary's benefit, subject to the provisions of this Article in any one or more of the following methods:

The Trustee may distribute trust property directly to the beneficiary.

The Trustee may distribute trust property to the beneficiary's guardian, conservator, parent, other family member, or any person who has assumed the responsibility of caring for the beneficiary.

The Trustee may distribute trust property to any person or entity, including the Trustee, as custodian for the beneficiary under the Uniform Transfers to Minors Act or similar statute.

The Trustee may distribute trust property to other persons and entities for the beneficiary's use and benefit.

The Trustee may distribute trust property to an agent or attorney in fact authorized to act for the beneficiary under a valid durable power of attorney executed by the beneficiary before becoming incapacitated.

Section 12.02      Retention in Trust

The Trustee may retain and administer trust property in a separate trust for any beneficiary's benefit, subject to the provisions of this Article as follows.

        (a)      Distribution of Net Income and Principal

The Independent Trustee may distribute to the beneficiary as much of the net income and principal of any trust created under this Section as the Independent Trustee may determine advisable for any purpose. If there is no then-serving Independent Trustee, the Trustee shall distribute to the beneficiary as much of the net income and principal of the trust created under this Section as the Trustee determines is necessary or advisable for the beneficiary's health, education, maintenance, or support. Any undistributed net income will be accumulated and added to principal.

        (b)      Right of Withdrawal

When the beneficiary whose trust is created under this Section either reaches 21 years of age or is no longer incapacitated, the beneficiary may withdraw all or any portion of the accumulated net income and principal from the trust.

        (c)      Distribution upon the Death of the Beneficiary

Subject to the terms of the next paragraph, the beneficiary whose trust is created under this Section may appoint all or any portion of the principal and undistributed net income remaining in the beneficiary's trust at the beneficiary's death among one or more persons or entities, and the creditors of the beneficiary's estate. The beneficiary has the exclusive right to exercise this general power of appointment.

The beneficiary may not exercise this power of appointment to appoint to the beneficiary, the beneficiary's estate, the beneficiary's creditors, or creditors of the beneficiary's estate from the limited share of the beneficiary's trust. For purposes of this power of appointment, the limited share of the beneficiary's trust is that portion of the beneficiary's trust that has an inclusion ratio for generation-skipping transfer tax purposes of zero or that without the exercise of the power of appointment, would not constitute a taxable generation-skipping transfer at the beneficiary's death. If the generation-skipping tax does not then apply, the limited share will be the beneficiary's entire trust.

If any part of the beneficiary's trust is not effectively appointed, the Trustee shall distribute the remaining unappointed balance per stirpes to the beneficiary's descendants. If the beneficiary has no then-living descendants, the Trustee shall distribute the unappointed balance per stirpes to the then-living descendants of the beneficiary's nearest lineal ancestor who was a descendant of ours or, if there is no then-living descendant, per stirpes to our descendants.

If we have no then-living descendants, the Trustee shall distribute the balance of the trust property as provided in Article Eleven.

Section 12.03      Application of Article

Any decision made by the Trustee under this Article is final, controlling, and binding upon all beneficiaries subject to the provisions of this Article.

The provisions of this Article do not apply to distributions to either of us from any trust established under this trust.

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

Whenever this trust authorizes or directs the Trustee to make a net income or principal distribution to a beneficiary, the Trustee may apply any property that otherwise could be distributed directly to the beneficiary for his or her benefit. The Trustee is not required to inquire into the beneficiary's ultimate disposition of the distributed property unless specifically directed otherwise by this trust.

The Trustee may make cash distributions, in-kind distributions, or distributions partly in each, in proportions and at values determined by the Trustee. The Trustee may allocate undivided interests in specific assets to a beneficiary or trust in any proportion or manner that the Trustee determines, even though the property allocated to one beneficiary may be different from that allocated to another beneficiary.

The Trustee may make these determinations without regard to the income tax attributes of the property and without the consent of any beneficiary.

Section 14.02      Beneficiary's Status

Until the Trustee receives notice of the incapacity, birth, marriage, death, or other event upon which a beneficiary's right to receive payments may depend, the Trustee will not be held liable for acting or not acting with respect to the event, or for disbursements made in good faith to persons whose interest may have been affected by the event. Unless otherwise provided in this trust, a parent or Legal Representative may act on behalf of a minor or incapacitated beneficiary.

The Trustee may rely on any information provided by a beneficiary with respect to the beneficiary's assets and income. The Trustee will have no independent duty to investigate the status of any beneficiary and will not incur any liability for not doing so.

Section 14.03      Mandatory Payments of a Pecuniary Amount

If any person holds the right to receive a pecuniary amount from the trust upon our death, the Trustee must either:

satisfy the entire pecuniary amount or irrevocably set aside property to satisfy the entire pecuniary amount within 15 months of our death; or

pay appropriate interest, as defined in Treasury Regulations Section 26.2642-2(b)(4)(ii)(B), to the person.

If the Trustee satisfies the pecuniary amount with an in-kind distribution, the Trustee will allocate assets to satisfy the pecuniary amount in a manner that fairly reflects net appreciation or depreciation in the value of the available assets, as measured from the valuation date to the payment date.

Section 14.04      No Court Proceedings

The Trustee shall administer this trust with efficiency, with attention to the provisions of this trust, and with freedom from judicial intervention. If the Trustee or another interested party institutes a legal proceeding, the court will acquire jurisdiction only to the extent necessary for that proceeding. Any proceeding to seek instructions or a court determination may only be initiated in the court with original jurisdiction over matters relating to the construction and administration of trusts. Seeking instructions or a court determination is not to be construed as subjecting this trust to the court's continuing jurisdiction.

I request that any questions or disputes that arise during the administration of this trust be resolved by mediation and, if necessary, arbitration in accordance with the Uniform Arbitration Act. Each interested party involved in the dispute, including any Trustee involved, may select an arbiter and, if necessary to establish a majority decision, these arbiters may select an additional arbiter. The decision of a majority of the arbiters selected will control with respect to the matter.

Section 14.05      No Bond

The Trustee is not required to furnish any bond for the faithful performance of the Trustee's duties unless required by a court of competent jurisdiction, and only if the court finds that a bond is needed to protect the beneficiaries' interests. No surety will be required on any bond required by any law or court rule, unless the court specifies its necessity.

Section 14.06      Exoneration of the Trustee

No successor Trustee is obligated to examine the accounts, records, or actions of any previous Trustee or the Personal Representative of a deceased Grantor. No successor Trustee may be held responsible for any act, omission, or forbearance by any previous Trustee or of the Personal Representative of a deceased Grantor.

Any Trustee may obtain written agreements from the beneficiaries or their Legal Representatives releasing and indemnifying the Trustee from any liability that may have arisen from the Trustee's acts, omissions, or forbearances. If acquired from all the trust's living beneficiaries or their Legal Representatives, any agreement is conclusive and binding on all parties, born or unborn, who may have or who may later acquire an interest in the trust.

The Trustee may require a refunding agreement before making any distribution or allocation of trust income or principal, and may withhold distribution or allocation pending determination or release of a tax or other lien. This refunding agreement provision will not apply to any distribution that qualifies for the federal estate tax charitable deduction.

Section 14.07      Limitations on Trustee Liability

We recognize that some individuals and institutions may be reluctant to serve as Trustee because of a concern about potential liability. Therefore, we direct that any individual or corporate fiduciary that serves as the Trustee will not incur any liability by reason of any error of judgment, mistake of law, or action or inaction of any kind in connection with the administration of any trust created under this trust, unless the Trustee's decision is shown by clear and convincing evidence to have been made in bad faith.

Any individual or corporate fiduciary currently serving as the Trustee may expend any portion of the trust assets to defend any claim brought against the Trustee, even if the Trustee's defense costs would exhaust the trust's value, unless the Trustee is shown to have acted in bad faith by clear and convincing evidence.

Any individual or corporate fiduciary that formerly served as the Trustee is entitled to reimbursement from the trust estate for any expenses, including attorney's fees and litigation costs reasonably incurred to defend any claim brought against the Trustee even if the Trustee's defense costs would exhaust the trust's value, unless the Trustee is shown to have acted in bad faith by clear and convincing evidence.

Section 14.08      Trustee Compensation

During any period we or each of us are serving as Trustee under this agreement, we will receive no fee in connection with our service as Trustee.

Any other individual serving as Trustee is entitled to fair and reasonable compensation for the services provided as a fiduciary. A corporate fiduciary serving as Trustee will be compensated by agreement between an individual serving as Trustee and the corporate fiduciary. In the absence of an individual Trustee or an agreement, a corporate fiduciary will be compensated in accordance with the corporate fiduciary's current published fee schedule.

A Trustee entitled to compensation may charge additional fees for services provided that are beyond the ordinary scope of duties, such as fees for legal services, tax return preparation, and corporate finance or investment banking services.

In addition to receiving compensation, a Trustee may be reimbursed for reasonable costs and expenses incurred in carrying out the Trustee's duties under this trust.

Section 14.09      Employment of Professionals

The Trustee may appoint, employ, and remove investment advisors, accountants, auditors, depositories, custodians, brokers, consultants, attorneys, advisors, agents, and employees to advise or assist in the performance of the Trustee's duties. The Trustee may act on the recommendations of the persons or entities employed, with or without independent investigation.

The Trustee may reasonably compensate an individual or entity employed to assist or advise the Trustee, regardless of any other relationship existing between the individual or entity and the Trustee.

The Trustee may compensate providers of contracted services at the usual rate out of the trust's income or principal, as the Trustee deems advisable. The Trustee may compensate an individual or entity employed to assist or advise the Trustee without diminishing the compensation the Trustee is entitled to under this trust. A Trustee who is a partner, stockholder, officer, director, or corporate affiliate in any entity employed to assist or advise the Trustee may still receive the Trustee's share of the compensation paid to the entity.

Section 14.10      Exercise of Testamentary Power of Appointment

A testamentary power of appointment granted under this trust may be exercised by a will, living trust or other written instrument specifically referring to the power of appointment. The holder of a testamentary power of appointment may exercise the power to appoint property among the permissible appointees in equal or unequal proportions, and may designate the terms and conditions, whether outright or in trust. The holder of a testamentary power of appointment may grant further powers of appointment to any person to whom principal may be appointed, including a presently exercisable limited or general power of appointment.

The Trustee may conclusively presume that any power of appointment granted to any beneficiary of a trust created under this trust has not been exercised by the beneficiary if the Trustee has no knowledge of the existence of a will, living trust or other written instrument exercising the power within three months after the beneficiary's death.

Section 14.11      Determination of Principal and Income

The rights among beneficiaries in matters concerning principal and income are to be determined in accordance with California Uniform Principal and Income Act, Probate Code §§ 16320 et seq. If California Uniform Principal and Income Act, Probate Code §§ 16320 et seq does not contain a provision concerning a particular item, the Trustee shall determine what will be credited, charged, and apportioned between principal and income in a fair, equitable, and practical manner with respect to that item.

Notwithstanding any provision of California Uniform Principal and Income Act, Probate Code §§ 16320 et seq or California law to the contrary, the Trustee shall treat distributions from any qualified retirement account to any trust established under this trust in any given year as income to the extent the distribution represents income generated or treated as generated by any qualified retirement account for that year.

           (a)      Annuity and Other Periodic Payments

Annuity and other periodic payments refers to distributions made to the Trustee over a fixed number of years or during the life of one or more individuals because of services provided or property transferred to the payor in exchange for future payments. This includes payments made in money or property from the payor's general assets or from a separate fund created by the payor, including a private or commercial annuity, individual retirement annuity, pension, profit-sharing plan, stock-bonus plan, stock-ownership plan, or similar arrangement. The Trustee shall treat annuity and other periodic payments to any trust established under this trust in any given year as income to the extent the distribution represents income generated and treated as generated by the annuity or other periodic payment for that year. If income information is not available, then the Trustee shall apportion the annuity and other periodic payments between principal and income in a fair, equitable and practical manner under the guidelines set forth in this Section.

To the extent an annuity or other periodic payment is characterized as interest, dividend, or other item of income, or an annuity or other periodic payment is made instead of interest, dividend, or other item of income, the Trustee shall allocate the payment to income. The Trustee shall allocate to principal the balance of the annuity or other periodic payment as well as any other payment received in the same accounting period that is not characterized as interest, dividend, or other item of income.

To the extent annuity and other periodic payments are made and no part of the payments are characterized as interest, dividend, or other item of income, the Trustee shall use the present value of the annuity and other periodic payments as finally determined for federal estate tax purposes, and the Internal Revenue Code Section 7520 rate used to determine the value for federal estate tax purposes to prepare an annuitization table to allocate the payments between income and principal.

If the amounts of annuity and other periodic payments change because of changes in the investment markets or other changes, the Trustee shall allocate the change in the amount of the payments between income and principal in a fair, equitable, and practical manner.

           (b)      Protection of Estate Tax Marital Deduction

If, to obtain an estate tax marital deduction for a trust established under this trust, the Trustee must allocate more of a payment to income than provided for by this Section, then the Trustee shall allocate to income the additional amount necessary to obtain the marital deduction.

Section 14.12      Trust Accounting

Except to the extent required by law, the Trustee is not required to file accountings in any jurisdiction. During our lifetimes or the lifetime of the survivor of us, and as long as at least one of us is serving as a Trustee, the Trustee is not required to provide an accounting to any person. If neither of us is serving as Trustee, the Trustee must provide an accounting to us at least annually unless waived. If both of us are incapacitated, or if one of us is deceased and the other is incapacitated, then the Trustee must provide the accounting to our Legal Representatives, unless waived by our Legal Representatives. After the death of the first of us to die, the Trustee must provide an annual accounting to the Qualified Beneficiaries of any trust created under this trust unless waived by the Qualified Beneficiaries.

The annual accounting must include the receipts, expenditures, and distributions of income and principal and the assets on hand for the accounting period. A copy of the federal fiduciary tax return filed for a trust during the accounting will satisfy this reporting requirement.

In the absence of fraud or obvious error, assent by all Qualified Beneficiaries to a Trustee's accounting will make the matters disclosed in the accounting binding and conclusive upon all persons, including those living on this date and those born in the future who have or will have a vested or contingent interest in the trust property. In the case of a Qualified Beneficiary who is a minor or incapacitated, the beneficiary's natural guardian or Legal Representative may give the assent required under this Section.

In all events, a beneficiary's Legal Representative may receive any notices and take any action on behalf of the beneficiary as to an accounting. If any beneficiary's Legal Representative fails to object to any accounting in writing within 180 days after the Trustee provides the accounting, the beneficiary's Legal Representative will be considered to assent to the accounting.

Section 14.13      Information to Beneficiaries

Privacy is an important issue to us. This Section defines the Trustee's duties to inform, account, and report to beneficiaries of various trusts created under this trust, and to other individuals during our lifetime and after our death. Except to the extent required by law, the Trustee is not required to comply with a request to furnish a copy of this trust to a Qualified Beneficiary at any time, and the Trustee is not required to send annual reports or reports upon termination of the trust to any Permissible Distributee or Qualified Beneficiary who requests the report. If the Trustee decides, in the Trustee's sole and absolute discretion, to provide any information to a Permissible Distributee or Qualified Beneficiary, the Trustee may exclude any information that the Trustee determines is not directly applicable to the beneficiary receiving the information. Any decision by the Trustee to make information available to any beneficiary does not constitute an obligation to provide any information to any beneficiary in the future.

           (a)      Providing Information while Either of Us Is Alive and Not Incapacitated

We waive all the Trustee's duties to give notice, information, and reports to any Qualified Beneficiaries other than us while either of us is alive and able to manage our financial resources effectively. The Trustee is not required to keep Qualified Beneficiaries of any trust created under this trust other than us informed of the administration of the trust in any manner. Further, the Trustee is not required to respond to any request for information related to the administration of the trust from anyone who is not a Qualified Beneficiary, other than us.

           (b)      Providing Information while Both of Us Are Incapacitated and after Our Deaths

The Trustee shall deliver any notice, information, or reports which would otherwise be required to be delivered to either of us or to a Qualified Beneficiary to a person designated by the Trustee during any period that both of us are alive but incapacitated, during any period when one of us is deceased and the other is incapacitated, and after the death of both us. To preserve our privacy and the privacy of Qualified Beneficiaries under the trust, we request that while either of us is alive, the Trustee not provide any copies of the trust or any other information which may otherwise be required to be distributed to any beneficiary under California law to any beneficiary to whom the information is not directly relevant. The designated person may, in his or her sole and absolute discretion and without waiver, distribute copies of all or any part of the trust or other relevant information about the trust to one or more Qualified Beneficiaries or other interested parties during any period that we are both incapacitated or one of us is deceased and the other is incapacitated.

Section 14.14      Action of Trustees and Delegation of Trustee Authority

When neither of us is serving as a Trustee, if two Trustees are eligible to act with respect to a given matter, they must agree unanimously for action to be taken unless the express terms of the Trustees' appointment provide otherwise. If more than two Trustees are eligible to act with respect to a given matter, the Trustees must agree by majority for action to be taken.

If the Trustees are unable to agree on a matter for which they have joint powers, we request that the matter be settled by mediation and then by arbitration, if necessary, in accordance with the Uniform Arbitration Act. Each of the Trustees may select an arbiter and these arbiters may select an additional arbiter, if necessary to establish a majority decision. The decision of a majority of the arbiters will control with respect to the matter.

A nonconcurring Trustee may dissent or abstain from a decision of the majority. A Trustee will be absolved from personal liability by registering the dissent or abstention in the trust records. After doing so, the dissenting Trustee must then act with the other Trustees in any way necessary or appropriate to effect the majority decision.

Subject to the limitations set forth in Section 15.25, any Trustee may, by written instrument, delegate to any other Trustee the right to exercise any power, including a discretionary power, granted to the Trustee in this trust. During the time a delegation under this Section is in effect, the Trustee to whom the delegation is made may exercise the power to the same extent as if the delegating Trustee has personally joined in the exercise of the power. The delegating Trustee may revoke the delegation at any time by giving written notice to the Trustee to whom the power was delegated.

Section 14.15      Trustee May Disclaim or Release Any Power

Notwithstanding any provision of this trust to the contrary, any Trustee may relinquish any Trustee power in whole or in part, irrevocably or for any specified period of time, by a written instrument. The Trustee may relinquish a power personally or may relinquish the power for all subsequent Trustees.

Section 14.16      Trustee May Execute a Power of Attorney

The Trustee may appoint any individual or entity to serve as the Trustee's agent under a power of attorney to transact any business on behalf of the trust or any other trust created under this trust.

Section 14.17      Additions to Separate Trusts

If upon the death of the survivor of us, or upon the termination of any trust created under this trust, a final distribution is to be made to a person who is the Primary Beneficiary of another trust established under this trust, and there is no specific indication whether the distribution is to be made in trust or outright, the Trustee shall make the distribution to the second trust instead of distributing the property to the beneficiary outright. For purposes of administration, the distribution will be treated as though it had been an original part of the second trust.

Section 14.18      Authority to Merge or Sever Trusts

The Trustee may merge a trust created under this trust with any other trust, if the two trusts contain substantially the same terms for the same beneficiaries and have at least one Trustee in common. The Trustee may administer the merged trust under the provisions of the instrument governing the other trust, and this trust will no longer exist if it merges into another trust. Accordingly, in the event another trust is merged into this trust or a trust created under the provisions of this trust document, the Trustee may shorten the period during which this trust subsists to comply with, if necessary, to effect the merger. But if a merger does not appear feasible, the Trustee may consolidate the trusts' assets for purposes of investment and trust administration while retaining separate records and accounts for each respective trust.

The Trustee may sever any trust on a fractional basis into two or more separate and identical trusts, or may segregate a specific amount or asset from the trust property by allocating it to a separate account or trust. The separate trusts may be funded on a non pro rata basis including a non pro rata division of the community property under California Probate Code Section 100, but the funding must be based on the assets' total fair market value on the funding date. After the segregation, income earned on a segregated amount or specific asset passes with the amount or asset segregated. The Trustee shall hold and administer each severed trust upon terms and conditions identical to those of the original trust.

Subject to the trust's terms, the Trustee may consider differences in federal tax attributes and other pertinent factors in administering the trust property of any separate account or trust, in making applicable tax elections and in making distributions. A separate trust created by severance must be treated as a separate trust for all purposes from the effective severance date; however, the effective severance date may be retroactive to a date before the Trustee exercises the power.

Section 14.19      Authority to Terminate Trusts

The Independent Trustee may terminate any trust created under this trust at any time, if the Independent Trustee, in its sole and absolute discretion, determines that administering a trust created under this trust is no longer economical. Once distributed, the Trustee will have no further responsibility with respect to that trust property. The Trustee will distribute the trust property from a terminated trust in this order:

to us, if we are both then living;

if one of us is deceased, to the surviving Grantor, if the surviving Grantor is then a trust beneficiary;

if we are both deceased or the surviving Grantor is not a trust beneficiary, to the beneficiaries then entitled to mandatory distributions of the trust's net income, in the same proportions; and then

if none of the beneficiaries are entitled to mandatory distributions of net income, to the beneficiaries then eligible to receive discretionary distributions of the trust's net income, in the amounts and shares the Independent Trustee determines.

Section 14.20      Discretionary Distribution to Fully Utilize Basis Increase upon Death of Beneficiary

To the extent we have permitted the Trustee to make distributions of principal to a trust beneficiary, the Independent Trustee may distribute as much of the trust's principal to the beneficiary as the Independent Trustee determines advisable so that, upon the beneficiary's death, his or her estate may utilize the basis increase allowed under Internal Revenue Code Section 1014 without causing an increase in the federal estate tax.

Before making a distribution of property under this Section, we request that the Trustee determine whether or not a good reason exists to retain the property in trust, such as whether the Trustee or the beneficiary might sell the property in the near future, as well as protection of the beneficiary from creditors, protection of the beneficiary from failed marriages, and protection of the asset for future generations. The Trustee has no liability to any beneficiary for any action or inaction by the Trustee under this Section, if made in good faith.

Section 14.21      Merger of Corporate Fiduciary

If any corporate fiduciary acting as the Trustee under this trust is merged with or transfers substantially all of its trust assets to another corporation, or if a corporate fiduciary changes its name, the successor will automatically succeed to the trusteeship as if that successor had been originally named a Trustee. No document of acceptance of trusteeship will be required.

Section 14.22      Funeral and Other Expenses of Beneficiary

Upon the death of an Income Beneficiary, the Trustee may pay the funeral expenses, burial or cremation expenses, enforceable debts, or other expenses incurred due to the death of the beneficiary from trust property. This Section only applies to the extent the Income Beneficiary has not exercised any testamentary power of appointment granted to the beneficiary under this trust.

The Trustee may rely upon any request by the deceased beneficiary's Legal Representative or family members for payment without verifying the validity or the amounts and without being required to see to the application of the payment. The Trustee may make decisions under this Section without regard to any limitation on payment of expenses imposed by statute or court rule and without obtaining the approval of any court having jurisdiction over the administration of the deceased beneficiary's estate.

Section 14.23      Marital Deduction Qualification

The marital gift as described in Article Seven of this trust is intended to qualify for the federal estate tax marital deduction, and the provisions of this trust are to be construed to reflect this intent. To the extent that exercising a provision of this trust would disqualify the marital gift from the federal estate tax unlimited marital deduction, that provision is void.

Section 14.24      Generation-Skipping Transfer Tax Provisions

If any trust created under this trust would be partially exempt from generation-skipping transfer tax after the intended allocation of Available GST Exemption to the trust, then the Trustee may divide the partially exempt trust so that the allocation of Available GST Exemption can be made to a trust that will be entirely exempt from generation-skipping transfer tax. If the Trustee chooses to divide a trust that would otherwise be a partially exempt trust, the Trustee must create and administer the separate trusts as provided in this Section.

           (a)      Division into Exempt and Non-Exempt Trusts

The Trustee shall divide the property of the otherwise partially-exempt trust into two separate trusts, the exempt trust and the nonexempt trust. The exempt trust will consist of the largest fractional share of the otherwise partially exempt trust's total assets that will permit the exempt trust to be entirely exempt from generation-skipping transfer tax. The nonexempt trust will consist of the balance of the otherwise partially exempt trust's total assets.

To compute the fractional share, the Trustee will use asset values as finally determined for transfer tax purposes. The Trustee must then apply the fraction to the assets at their actual value on the effective date or dates of distribution so that the actual value of the fractional share resulting from the application of the fraction will include fluctuations in the trust property's value. We request that the Trustee allocate the value of any Roth IRAs payable to the trust to the exempt trust to the extent possible.

           (b)      Administration of the Trusts

The Trustee shall administer the exempt and nonexempt trusts created under this Section as separate and independent trusts, but under the same terms as the original trust. To the extent possible, the Trustee should make distributions to a non-skip person as defined by Internal Revenue Code Section 2613 from the nonexempt trust and distributions to a skip person as defined by Section 2613 from an exempt trust. The Trustee may designate names for the exempt and nonexempt trusts.

If an exempt trust and a nonexempt trust are further divided under the terms of this trust, the Trustee may allocate property from the exempt trust first to the trust from which a generation-skipping transfer is more likely to occur.

           (c)      Expression of Our Intent

Our intent is to minimize the application of the generation-skipping transfer tax to the trust property, but not to affect the total amount of trust property to which any beneficiary may be entitled under this trust. This trust must be construed and interpreted to give effect to this intent.

           (d)      Additions of Property to Exempt and Non-Exempt Trusts

If at any time any property that has an inclusion ratio greater than zero for generation-skipping transfer tax purposes would be added to a trust with property that has an inclusion ratio of zero, then the Trustee will instead hold the property in a separate trust on the same terms and conditions as the original trust.

           (e)      Re-Allocation

If the Trustee's determination of whether a trust in this trust is partially, entirely, or not exempt from GST taxes is later incorrect (for example, if the Congress by law or the Service by regulation or ruling applies the generation-skipping transfer tax retroactively to the trust), the Trustee may re-allocate the assets as of the initial division date, as provided in this Section.

Section 14.25      Independent Trustee May Confer Testamentary Power of Appointment

During the Primary Beneficiary's lifetime, the Independent Trustee may grant the Primary Beneficiary a testamentary power to appoint all or part of the Primary Beneficiary's trust or trust share to the creditors of the Primary Beneficiary's estate. The Independent Trustee may require that the Primary Beneficiary obtain the consent of the Independent Trustee granting the power, as a condition for the exercise of the power. Any testamentary power of appointment granted by the Independent Trustee may only be exercised personally by the beneficiary, must be exercised in writing and may be revoked at any time during the lifetime of the Primary Beneficiary to whom the power was given. We suggest that the Independent Trustee exercise this authority to subject trust property to estate tax instead of the generation-skipping transfer tax or when it may reduce overall taxes.

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
