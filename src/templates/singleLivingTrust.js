export const singleTrustTemplate = (formData) => `
THE ${formData.client.firstName.toUpperCase()} ${formData.client.lastName.toUpperCase()} LIVING TRUST
DATED ${formData.currentDate}
${formData.isRestatement ? `Restatement of trust originally dated ${formData.originalTrustDate}` : ''}
LAW OFFICES OF ROZSA GYENE, PC
450 N BRAND BLVD. SUITE 623
GLENDALE, CALIFORNIA 91203


${formData.isRestatement ? `
On ${formData.originalTrustDate}, I, ${formData.client.firstName} ${formData.client.lastName}, established The ${formData.client.firstName} ${formData.client.lastName} Living Trust, and reserved the right to amend the trust, in whole or in part. On this day, ${formData.currentDate}, I revoke all prior restatements and amendments to that instrument and now exercise my power to amend that instrument in its entirety, so that after amendment The ${formData.client.firstName} ${formData.client.lastName} Living Trust now states:
` : ''}

Article One
Establishing the Trust
The parties to this ${formData.isRestatement ? 'restated ' : ''}trust are ${formData.client.firstName} ${formData.client.lastName} (the Grantor) and ${formData.client.firstName} ${formData.client.lastName} (the Trustee).
I intend to create a valid trust under the laws of ${formData.client.state} and under the laws of any state in which any trust created under this trust document is administered.  The terms of this trust prevail over any provision of ${formData.client.state} law, except those provisions that are mandatory and may not be waived.
Section 1.01      Identifying the Trust
For convenience, the trust may be referred to as:
"The ${formData.client.firstName} ${formData.client.lastName} Living Trust"
To the extent practicable, for the purpose of transferring property to the trust or identifying the trust in any beneficiary or pay-on-death designation, the trust should be identified as:
"${formData.client.firstName} ${formData.client.lastName}, Trustee, or his successors in interest, of The ${formData.client.firstName} ${formData.client.lastName} Living Trust, and any amendments thereto."
For all purposes concerning the identity of the trust or any property titled in or payable to the trust, any description referring to the trust will be effective if it reasonably identifies the trust and indicates that the trust property is held in a fiduciary capacity.
Section 1.02      Reliance by Third Parties
Third parties may require documentation to verify the existence of this trust, or particular provisions of it, including the name of the Trustee or the powers held by the Trustee.  To protect the confidentiality of the trust, California Probate Code Section 18100.5, Chapter 530, Statutes of 1993 provides that the Trustee may use a certification of trust that identifies the Trustee and sets forth the authority of the Trustee to transact business on behalf of the trust instead of providing a copy of this instrument to protect the confidentiality of the trust.  The certification may include pertinent pages from this instrument, including title or signature pages.
A third party may rely upon a certification of trust that is signed by the Trustee with respect to the representations contained in it.  A third party relying upon a certification of trust will be exonerated from any liability for actions the third party takes or does not take in reliance upon the representations contained in the certification of trust.
A third party dealing with the Trustee will not be required to inquire into this trust's terms or the authority of the Trustee, or to see to the application of funds or other property received by the Trustee.  The Trustee's receipt of any money or property paid, transferred, or delivered to the Trustee will be a sufficient discharge to the third party from all liability in connection with its application.  A written statement by the Trustee is conclusive evidence of the Trustee's authority.  Third parties are not liable for any loss resulting from their reliance on a written statement by the Trustee asserting the Trustee's authority or seeking to effect a transfer of property to or from the trust.
California Probate Code Section 18100.5(h) provides that a person making a demand for the trust document in addition to the certification of trust, may be liable for damages, including attorney fees, as a result of the refusal to accept the certification of trust.
Section 1.03      Transferring Property to the Trust
Any person or entity may transfer any property to the trust in any manner authorized by law.
           (a)      Initial Funding of the Trust
By executing this instrument, I transfer to the Trustee the properties listed in the Schedule of Assets.
           (b)      Acceptance by the Trustee
By executing this instrument, the Trustee accepts and agrees to hold the properties listed in the Schedule of Assets as trust property.  All property transferred to the trust after the date of this trust must be acceptable to the Trustee.  The Trustee may refuse to accept any property.  The Trustee shall hold, administer, and dispose of all accepted trust property for my benefit and for the benefit of my beneficiaries, in accordance with the terms of this trust.
Section 1.04      Powers Reserved by Me as Grantor
As Grantor, I retain the powers set forth in this Section in addition to any powers that I reserve in other provisions of this instrument.
           (a)      Action on Behalf of the Trust
Whenever I am serving as Trustee, I may act for and conduct business on behalf of the trust without the consent of any other Trustee.
           (b)      Amendment, Restatement, or Revocation
I may amend, restate, or revoke this instrument, in whole or in part, for any purpose.
Any amendment, restatement, or revocation must be made in writing and delivered to the then-serving Trustee.
           (c)      Addition or Removal of Trust Property
I may add property to the trust and may remove any property from the trust at any time.
           (d)      Control of Income and Principal Distributions
I retain the right to control the distribution of income and principal from the trust.  I may direct the Trustee to distribute as much of the net income and principal of the trust property as I consider advisable to me or to other persons or entities.  The Trustee may distribute the net income and principal to me or for my unrestricted use and benefit, even to the exhaustion of all trust property.  Any undistributed net income is to be added to the principal of the trust.
           (e)      Approval of Investment Decisions
I reserve the absolute right to review and change the Trustee's investment decisions.  But the Trustee is not required to seek my approval before making investment decisions.
Section 1.05      Grantor Trust Status
By reserving the broad rights and powers set forth in Section 1.04 of this Article, I intend to qualify the trust as a Grantor Trust under Internal Revenue Code Sections 671 to 677.  This means that, for federal income tax purposes, I will be treated as the owner of all the assets held in the trust during my lifetime, as if I held them in my individual capacity.
During any period that the trust is a Grantor Trust, the Taxpayer Identification Number of the trust will be my Social Security number, in accordance with Treasury Regulation Section 301.6109-1(a)(2).
Article Two
Family Information
I am ${formData.client.maritalStatus}.
I have ${formData.children?.length || 'three'} children: ${formData.children?.map((child, i) => `${child.name}, born on ${child.birthday}${i < formData.children.length - 1 ? ';' : '.'}`).join(' ')}.
All references in this document to my children are references to these children, and any children subsequently born to me or adopted by me by legal proceeding.
References to my descendants are to my children and their descendants, including any deceased child's descendants.
Article Three
Trustee Succession Provisions
Section 3.01      Resignation of a Trustee
A Trustee may resign by giving written notice to me.  If I am incapacitated or deceased, a resigning Trustee must give written notice to the trust's Income Beneficiaries and to any other then-serving Trustee.
Upon the resignation of a Trustee, the resigning Trustee may appoint the resigning Trustee's successor as Trustee in the manner set forth in Section 2.04, concurrent with the written notice described above.  If the resigning Trustee fails to make the appointment, the other provisions of this Article regarding Trustee succession upon my incapacity or my death will govern, and the next named successor or successors to the resigning Trustee will serve in the order listed.  Likewise, if no named successors to the resigning Trustees are available to serve and the resigning Trustee fails to designate a successor, the other provisions of this Article regarding the filling of a vacant Trustee office will govern.
Section 3.02      Trustee Succession during My Lifetime
During my lifetime, this Section governs the removal and replacement of the Trustees.
           (a)      Removal and Replacement by Me
I may remove any Trustee with or without cause at any time.  If a Trustee is removed, resigns, or cannot continue to serve for any reason, I may serve as sole Trustee, appoint a Trustee to serve with me, or appoint a successor Trustee.
           (b)      During My Incapacity
During any time that I am incapacitated, the following will replace any then-serving Trustee in this order:
${formData.successorTrustees?.map((t, i) => `${t.name}${i < formData.successorTrustees.length - 1 ? '; then' : '.'}`).join('\n')}.
If I am incapacitated, a Trustee may be removed only for cause, and only if a court of competent jurisdiction approves the removal upon the petition of an interested party.
If I am incapacitated and no named successor Trustee has been designated, the person appointed my conservator may appoint an individual or a corporate fiduciary to serve as the successor Trustee.
If a Trustee vacancy due to resignation arises, the previous provisions apply only if the resigning Trustee fails to appoint a successor Trustee in the manner more fully set forth in Section 2.01.
My Legal Representative may petition a court of competent jurisdiction to appoint a successor Trustee to fill any vacancy lasting longer than 30 days.  The petition may subject the trust to the jurisdiction of the court only to the extent necessary to make the appointment and may not subject the trust to the continuing jurisdiction of the court.
All appointments, removals, and revocations must be by signed written instrument.
Section 3.03      Trustee Succession after My Death
After my death, this Section will govern the removal and replacement of the Trustees.
           (a)      Successor Trustee
I name the following, in this order, to serve as the successor Trustee after my death, replacing any then-serving Trustee:
${formData.successorTrustees?.map((t, i) => `${t.name}${i < formData.successorTrustees.length - 1 ? '; then' : '.'}`).join('\n')}.
           (b)      Removal of a Trustee
A Trustee may be removed only for cause, and a petitioning beneficiary must obtain approval from a court of competent jurisdiction before the removal is effective.  The petition may subject the trust to the jurisdiction of the court only to the extent necessary to review the petition and may not subject the trust to the continuing jurisdiction of the court.
A minor or incapacitated beneficiary's parent or Legal Representative may act on his or her behalf.
           (c)      Default of Designation
If the office of Trustee of a trust created under this instrument is vacant and no designated successor Trustee is able and willing to act as Trustee, the trust's Primary Beneficiary may appoint an individual or corporate fiduciary as successor Trustee.
Any beneficiary may petition a court of competent jurisdiction to appoint a successor Trustee to fill any vacancy lasting longer than 30 days.  The petition may subject the trust to the jurisdiction of the court only to the extent necessary to make the appointment and may not subject the trust to the continuing jurisdiction of the court.
A minor or incapacitated beneficiary's parent or Legal Representative may act on his or her behalf.
If a Trustee vacancy arises due to resignation, the previous provisions apply only if the resigning Trustee fails to appoint a successor Trustee in the manner more fully set forth in Section 3.01.
Section 3.04      Notice of Removal and Appointment
Notice of removal must be in writing and delivered to the Trustee being removed and to any other then-serving Trustees.  The removal becomes effective in accordance with its provisions.
Notice of appointment must be in writing and delivered to the successor Trustee and to any other then-serving Trustees.  The appointment becomes effective at the time of acceptance by the successor Trustee.  A copy of the notice may be attached to this instrument.
Section 3.05      Appointment of a Co-Trustee
Any individual Trustee may appoint an individual or a corporate fiduciary as a Co-Trustee.  This Co-Trustee serves only as long as the appointing Trustee serves, or as long as the last to serve if more than one Trustee appointed the Co-Trustee.  This Co-Trustee will not become a successor Trustee upon the death, resignation, or incapacity of the appointing Trustee, unless appointed under the terms of this instrument.  Although this Co-Trustee may exercise all the powers of the appointing Trustee, the combined powers of this Co-Trustee and the appointing Trustee may not exceed the powers of the appointing Trustee alone.  The Trustee appointing a Co-Trustee may revoke the appointment at any time, with or without cause.
Section 3.06      Corporate Fiduciaries
Any corporate fiduciary serving under this instrument as a Trustee must be a bank, trust company, or public charity that is qualified to act as a fiduciary under applicable federal and state law and that is not related or subordinate to any beneficiary within the meaning of Internal Revenue Code Section 672(c).
Section 3.07      Incapacity of a Trustee
If any individual Trustee becomes incapacitated, the incapacitated Trustee need not resign as Trustee.  For Trustees other than me, a written declaration of incapacity by the Co-Trustee or, if none, by the party designated to succeed the incapacitated Trustee, made in good faith and supported by a written opinion of incapacity by a physician who has examined the incapacitated Trustee, will terminate the trusteeship.
Section 3.08      Appointment of Independent Special Trustee
If for any reason the Trustee of any trust created under this instrument is unwilling or unable to act with respect to any trust property or any provision of this instrument, the Trustee shall appoint, in writing, a corporate fiduciary or an individual to serve as an Independent Special Trustee as to this property or with respect to this provision.  The Independent Special Trustee appointed may not be related or subordinate to any trust beneficiary within the meaning of Internal Revenue Code Section 672(c).
An Independent Special Trustee will exercise all fiduciary powers granted by this trust unless expressly limited elsewhere in this instrument or by the Trustee in the instrument appointing the Independent Special Trustee.  An Independent Special Trustee may resign at any time by delivering written notice of resignation to the Trustee.  Notice of resignation will be effective in accordance with the terms of the notice.
Section 3.09      Rights and Obligations of Successor Trustees
Each successor Trustee serving under this instrument, whether corporate or individual, will have all of the title, rights, powers, and privileges granted to the initial Trustee named under this instrument.  In addition, each successor Trustee will be subject to all of the restrictions imposed upon, as well as to all discretionary and ministerial obligations and duties given to the initial Trustee named under this instrument.
Article Four
Administration of the Trust During My Incapacity
Section 4.01      Trust Distributions during My Incapacity
During any period of time when I am incapacitated, the Trustee shall administer the trust and distribute its net income and principal as provided in this Section.
           (a)      Distributions for My Benefit
The Trustee shall regularly and conscientiously make appropriate distributions of income and principal for my general welfare and comfort under the circumstances existing at the time each distribution is made.
Appropriate distributions under this Subsection include the payment of any of my enforceable legal obligations and premiums for insurance policies owned by me or by the trust, including life, medical, disability, property and casualty, errors and omissions, and longterm health care policies.
The Trustee is authorized to honor pledges and continue to make gifts to charitable organizations that I have regularly supported in the customarily given amounts.
The examples included in this Subsection are for purposes of illustration only and are not intended to limit the authority of the Trustee to make any distribution for my benefit that the Trustee determines appropriate.
           (b)      Manner of Making Distributions
The Trustee may make distributions for my benefit in any one or more of the following ways:
to me, but only to the extent I am able to manage these distributions;
to other persons and entities for my use and benefit;
to an agent or attorney in fact authorized to act for me under a legally valid durable power of attorney executed by me before my incapacity; and
to my guardian or conservator who has assumed responsibility for me under any court order, decree, or judgment issued by a court of competent jurisdiction.
           (c)      Distributions for the Benefit of Persons Dependent on Me
The Trustee also may distribute as much of the net income and principal as the Trustee considers necessary for the health, education, maintenance, or support of persons who the Trustee determines are dependent on me for support.
           (d)      Guidance for the Trustee Regarding Distributions
When making distributions under Subsections (a) and (d), the Trustee shall give consideration first to my needs, and then to the needs of those persons dependent on me.
When making distributions under Subsection (d), I request that the Trustee, in its sole and absolute discretion, consider other income and resources available to the dependents.  The Trustee may make unequal distributions, distributions to some but not all dependents, or no distributions.
A distribution made to a beneficiary under this Section will not be considered an advancement, and will not be charged against the share of the beneficiary that may be distributable under any other provision of this trust.
Article Five
Administration of the Trust Upon My Death
Section 5.01      The Trust Becomes Irrevocable
After my death, the trust is irrevocable and my Social Security number may no longer be used to identify the trust.  The Trustee may need to apply for a separate Taxpayer Identification Number for the trust.
Section 5.02      Administrative Trust
After my death and before the distribution of trust property as provided in the subsequent Articles of this trust, the trust will be an administrative trust, but may continue to be known as The ${formData.client.firstName} ${formData.client.lastName} Living Trust.  The administrative trust will continue for a reasonable period of time necessary to complete the administrative tasks set forth in this Article.
Section 5.03     Payment of Expenses and Taxes
The Trustee may pay from the trust property:
expenses of the last illness, funeral, and burial or cremation, including expenses of memorials and memorial services;
legally enforceable claims against me or the estate;
expenses of administering the trust and the estate; and
court-ordered allowances for those dependent upon me.
These payments are discretionary with the Trustee.  The Trustee may make decisions on these payments without regard to any limitation on payment of the expenses and may make payments without any court's approval.  No third party may enforce any claim or right to payment against the trust by virtue of this discretionary authority.
If payment would decrease the federal estate tax charitable deduction available to the estate, the Trustee may not pay any administrative expenses from assets passing to an organization that qualifies for the federal estate tax charitable deduction.
The Trustee shall pay death taxes out of the trust property's principal, as provided in Section 2.13.  But if a probate estate is opened within six months after the date of the death, the Personal Representative shall pay any outstanding claims and expenses as authorized by the Personal Representative, as well as any death taxes from the probate estate to the extent that the cash and readily marketable assets in the probate estate are sufficient.
Section 5.04     Restrictions on Certain Payments from Retirement Plans
The term designation date means September 30 of the calendar year following the year of the death, or another date as established by Treasury Regulations or other tax law authority as the final date for determining whether this trust meets the requirements for treatment of the trust's oldest beneficiary as if the beneficiary was named individually as beneficiary of any qualified retirement plan payable to this trust.
Notwithstanding any other provision of this trust or state law to the contrary, the Trustee may not distribute any qualified retirement benefit payable to a trust created under this trust to or for the benefit of the estate, any charity, or any beneficiary other than an individual, on or after the designation date.  My intent is that all qualified retirement benefits held by or payable to this trust on or after the designation date be distributed to or held only for individual beneficiaries, within the meaning of Internal Revenue Code Section 401(a)(9).
Qualified retirement benefits payable to the trust may not be used or applied on or after the designation date for payment of the debts, taxes, expenses of administration, or other claims against the estate, or for payment of estate, inheritance, or similar transfer taxes due because of the death, other than those directly attributable to and the legal obligation of a particular qualified retirement plan.  This Section does not apply to any bequest or expense that is specifically directed to be funded with qualified retirement benefits.
Section 5.05     Excluding Life Insurance Proceeds from Creditors
Despite anything to the contrary in this instrument, any life insurance proceeds payable to the Trustee under this instrument must never be or become part of my probate or testamentary estate. Nothing in this instrument directs that these life insurance proceeds be used to pay my debts or expenses.
Section 5.06     Payment of Death Taxes
For the purposes of this Article, the term death taxes refers to any taxes imposed by reason of the death by federal, state, or local authorities, including estate, inheritance, gift, and direct-skip generation-skipping transfer taxes.  For purposes of this Section, death taxes does not include any additional estate tax imposed by Internal Revenue Code Section 2031(c)(5)(C) or Section 2032A(c), or any other comparable recapture tax imposed by any taxing authority.  Nor does the term include any generation-skipping transfer tax, other than a direct-skip generation-skipping transfer tax.
Except as otherwise provided in this Article or elsewhere in this trust, the Trustee shall provide for payment of all death taxes from the administrative trust without apportionment.  The Trustee may not seek contribution toward or recovery of any payments of death taxes from any individual.
           (a)      Protection of Exempt Property
Death taxes may not be allocated to or paid from any assets that are not included in the gross estate for federal estate tax purposes.  To the extent practicable, the Trustee may not pay any death taxes from assets that are exempt from generation-skipping transfer tax purposes.
           (b)      Protection of the Charitable Deduction
Death taxes may not be paid from or allocated to any assets passing to an organization that qualifies for the federal estate tax charitable deduction, or from any assets passing to a split-interest charitable trust, unless the Trustee has first used all other assets available to pay the taxes.
           (c)      Property Passing outside of the Trust
Death taxes imposed with respect to property included in the gross estate for death tax purposes but passing outside of the trust are to be apportioned among the persons and entities benefited.  The proportion attributed to each person or entity is the taxable value of each person or entity's beneficial interest over the total taxable value of all property and interests included in the gross estate for death tax purposes.  The values used for the apportionment are to be the values as finally determined under federal, state, or local law.
Section 5.07     Coordination with The Personal Representative
The following provisions are intended to help facilitate the coordination between the Personal Representative and the Trustee.  These provisions apply even if the Personal Representative and the Trustee are the same person or entity.
           (a)      Reliance on Information from The Personal Representative
The Trustee may rely upon the written request of the Personal Representative for payments authorized under this Article and the amounts included in those payments without computing the sums involved.  If a payment is made under this Article to the Personal Representative, the Trustee will have no duty to inquire into the application of the payment.
           (b)      Receipt of Probate Property
The Trustee may accept or decline any distributions of property tendered to the Trustee by the Personal Representative.  If the Trustee accepts the property, the Trustee may do so without audit, and will not be required to review the Personal Representative's records.
           (c)      Discretionary Distributions to My Personal Representative
The Trustee may distribute cash, accrued income, or other trust property to the probate estate as a beneficiary of this trust, to the extent the Trustee determines that doing so is in the best interests of the trust beneficiaries.
Section 5.08     Authority to Make Tax Elections
After my death, the Trustee may make tax elections as provided in this Section.  But if a Personal Representative is appointed for the probate estate, the discretionary authority granted to the Trustee as to any tax election will be subordinate to the Personal Representative's statutorily delegated authority.
           (a)      Tax Elections
The Trustee may make any tax elections necessary for the efficient administration of the estate, including:
valuing assets according to an alternate valuation date;
electing whether to take administration expenses as estate tax deductions or income tax deductions;
allocating my unused generation-skipping exemption to any portion of the trust property;
electing special-use valuation;
deferring payment of all or any portion of any taxes; and
treating any portion of the administrative trust as part of the estate for federal or state income tax purposes, or both.
The Trustee may make equitable adjustments between income and principal because of any tax elections made by the Trustee.
           (b)      Allocation of GST Exemption
The Trustee may elect to allocate or not allocate any portion of the Available GST Exemption under Internal Revenue Code Section 2631, or a counterpart exemption under any applicable state law to any property of which I am considered the transferor for generation-skipping transfer tax purposes.  This includes any property transferred by me during the life for which I did not make an allocation prior to death.  The exercise of the Trustee's discretion should be based on the transfers, gift tax returns, and other information known to the Trustee, with no requirement that allocations benefit the various transferees or beneficiaries in any particular manner.
           (c)      Qualified Conservation Easements
The Trustee may create a qualified conservation easement, as defined in Internal Revenue Code Section 2031(c)(8)(A), in any land held by the trust and may make the necessary election provided by Section 2031(c)(6).
Article Six
Specific Distributions and Disposition of Tangible Personal Property
${formData.specificDistributions?.map((dist, index) => `
Section 6.0${index + 1}      Specific Distribution to ${dist.beneficiaryName}
As soon as practicable after my death, the Trustee shall distribute ${dist.description} to ${dist.beneficiaryName}.
If ${dist.beneficiaryName} is deceased, then this distribution will lapse${dist.lapseTo ? ` to ${dist.lapseTo}` : ', and this property instead will be distributed under the other provisions of this trust'}.
Property passing under this Section passes free of any administrative expenses or death taxes.
`).join('\n') || ''}

Section 6.05      Distribution of Tangible Personal Property by Memorandum
I may dispose of items of tangible personal property by a signed written memorandum executed after I sign this instrument.  The memorandum must refer to the trust and must reasonably identify the items and the beneficiary designated to receive each item.  If I execute a memorandum, the Trustee shall incorporate the memorandum by reference into this instrument to the extent permitted by law.
The Trustee shall distribute the items of tangible personal property listed in the memorandum as promptly as practicable after my death, together with any insurance policies covering the property and any claims under those policies, as provided in the memorandum.  If I leave multiple written memoranda that conflict as to the disposition of any item of tangible personal property, the memorandum with the most recent date will control as to that item.
If the law does not permit incorporation of the memorandum by reference, the memorandum will then serve as an amendment to the trust, but only to the extent this amendment solely disposes of tangible personal property.  I request that the Trustee follow my wishes and distribute the items of tangible personal property listed in the memorandum according to its terms.
Section 6.06      Distribution of Remaining Tangible Personal Property
The Trustee shall distribute any remaining tangible personal property not disposed of by a written memorandum as provided in the following Articles.
Section 6.07      Definition of Tangible Personal Property
For purposes of this Article, the term tangible personal property includes household furnishings, appliances and fixtures, works of art, motor vehicles, pictures, collectibles, apparel and jewelry, books, sporting goods, and hobby paraphernalia.  The term does not include any property that the Trustee, in its sole and absolute discretion, determines to be part of any business or business interest owned by me or the trust.
After my death, if the Trustee receives property to be distributed under this Article from the probate estate or in any other manner, the Trustee shall distribute the property in accordance with this Article's terms.  The fact that an item of tangible personal property was not received by the trust until after my death does not diminish the validity of the gift.  If property to be distributed under this Article is not part of the trust property upon my death and is not subsequently transferred to the Trustee from the probate estate or in any other manner, then the specific distribution of property made in this Article is null and void, without any legal or binding effect.
Section 6.08      Incidental Expenses and Encumbrances
Until property distributed in accordance with this Article is delivered to the appropriate beneficiary or his or her Legal Representative, the Trustee shall pay the reasonable expenses of securing, storing, insuring, packing, transporting, and otherwise caring for the property as an administration expense.  Except as otherwise provided in the trust, the Trustee shall distribute property under this Article subject to all liens, security interests, and other encumbrances on the property.
Section 6.09      Residuary Distribution
Any property not distributed under this or prior Articles of this instrument will be distributed as provided in the following Articles.
Article Seven
Distribution to My Beneficiaries
The Trustee shall administer and distribute my remaining trust property (not distributed under prior Articles of this instrument) under the terms of this Article.
Section 7.01      Division of Remaining Trust Property
The Trustee shall divide my remaining trust property into shares as follows:
Name    Relationship    Share
${formData.residuaryBeneficiaries?.map(b => `${b.name}    Child    ${b.share}%`).join('\n')}
The Trustee shall administer the share of each beneficiary as provided in the Sections that follow.

${formData.residuaryBeneficiaries?.map((beneficiary, index) => `
Section 7.0${index + 2}      Distribution of the Share for ${beneficiary.name}
The Trustee shall distribute the share set aside for ${beneficiary.name} in trust as provided in this Section.
           (a)      Distributions of Income and Principal
The Independent Trustee may distribute to ${beneficiary.name} as much of the income and principal of ${beneficiary.gender === 'male' ? 'his' : 'her'} trust as the Independent Trustee may determine advisable for any purpose. If no Independent Trustee is then serving, the Trustee shall distribute to ${beneficiary.name} as much of the income and principal of ${beneficiary.gender === 'male' ? 'his' : 'her'} trust as the Trustee determines necessary or advisable for ${beneficiary.gender === 'male' ? 'his' : 'her'} health, education, maintenance, or support.
The Trustee shall add any undistributed net income to principal.
           (b)      Guidelines for Discretionary Distributions
In making discretionary distributions to ${beneficiary.name}, I desire to provide for ${beneficiary.gender === 'male' ? 'his' : 'her'} well-being and happiness.  Although I request that the Trustee consider the other known resources available to ${beneficiary.name} before making distributions, I also request that the Trustee be liberal in making any distributions to, or for ${beneficiary.name}'s benefit.  I acknowledge that the principal of the trust established for ${beneficiary.name} may be exhausted in making these distributions.
           (c)      Right to Withdraw Principal
At the intervals set forth below, ${beneficiary.name} may withdraw from ${beneficiary.gender === 'male' ? 'his' : 'her'} trust, at any time, amounts not to exceed in the aggregate:
${beneficiary.withdrawalAge ? `100% of the accumulated trust income and principal at ${beneficiary.withdrawalAge} years of age;` : '100% of the accumulated trust income and principal at 30 years of age;'}
           (d)      Distribution upon the Death of ${beneficiary.name}
Subject to the terms of the next paragraph, ${beneficiary.name} has the unlimited testamentary general power to appoint all or any portion of the principal and undistributed income remaining in ${beneficiary.gender === 'male' ? 'his' : 'her'} trust at ${beneficiary.gender === 'male' ? 'his' : 'her'} death among one or more persons or entities and ${beneficiary.name}'s estate's creditors. ${beneficiary.name} has the exclusive right to exercise this general power of appointment.
${beneficiary.name} may not exercise this power of appointment to appoint to ${beneficiary.gender === 'male' ? 'himself' : 'herself'}, ${beneficiary.gender === 'male' ? 'his' : 'her'} estate, ${beneficiary.gender === 'male' ? 'his' : 'her'} creditors, or the creditors of ${beneficiary.gender === 'male' ? 'his' : 'her'} estate from the limited share of ${beneficiary.gender === 'male' ? 'his' : 'her'} trust.  For purposes of this power of appointment, the limited share of ${beneficiary.name}'s trust is that portion of ${beneficiary.gender === 'male' ? 'his' : 'her'} trust that has an inclusion ratio of zero for generation-skipping transfer tax purposes, or that would not constitute a taxable generation-skipping transfer at ${beneficiary.gender === 'male' ? 'his' : 'her'} death in the absence of the power of appointment's exercise. If the generation-skipping tax does not then apply, the limited share is ${beneficiary.name}'s entire trust.
If any part of ${beneficiary.name}'s trust is not effectively appointed, the Trustee shall distribute the remaining unappointed balance per stirpes to ${beneficiary.name}'s descendants. If ${beneficiary.name} has no descendants, the Trustee shall distribute the remaining unappointed balance pro rata to the other beneficiaries named in this Article. If no other named beneficiaries exist, the Trustee shall distribute the remaining unappointed balance share under the terms of Article 8.
           (e)      Distribution if ${beneficiary.name} Is Deceased
If ${beneficiary.name} dies before the establishment of ${beneficiary.gender === 'male' ? 'his' : 'her'} trust, the Trustee shall distribute ${beneficiary.name}'s share per stirpes to ${beneficiary.gender === 'male' ? 'his' : 'her'} descendants. If ${beneficiary.name} has no descendants, the Trustee shall distribute ${beneficiary.name}'s share pro rata to the other beneficiaries named in this Article. If no other named beneficiaries exist, the Trustee shall distribute ${beneficiary.name}'s share under the terms of Article 8.
`).join('\n')}

Article Eight
Remote Contingent Distribution
If at any time no person or entity is qualified to receive final distribution of any part of my trust estate, this portion of my trust estate must be distributed to those persons who would inherit it had I then died intestate owning the property, as determined and in the proportions provided by the laws of ${formData.client.state} then in effect.
Article Nine
Distributions to Underage and Incapacitated Beneficiaries
If the Trustee is authorized or directed under any provision of this trust to distribute net income or principal to a person who has not yet reached 21 years of age or who is incapacitated as defined in , the Trustee may make the distribution by any one or more of the methods described in Section 9.01.  Alternatively, the Trustee may retain the trust property in a separate trust to be administered by the Trustee under Section 9.02.
I request that before making a distribution to a beneficiary, the Trustee consider, to the extent reasonable, the ability the beneficiary has demonstrated in managing prior distributions of trust property.
Section 9.01      Methods of Distribution
The Trustee may distribute trust property for any beneficiary's benefit, subject to the provisions of this Article in any one or more of the following methods:
The Trustee may distribute trust property directly to the beneficiary.
The Trustee may distribute trust property to the beneficiary's guardian, conservator, parent, other family member, or any person who has assumed the responsibility of caring for the beneficiary.
The Trustee may distribute trust property to any person or entity, including the Trustee, as custodian for the beneficiary under the Uniform Transfers to Minors Act or similar statute.
The Trustee may distribute trust property to other persons and entities for the beneficiary's use and benefit.
The Trustee may distribute trust property to an agent or attorney in fact authorized to act for the beneficiary under a valid durable power of attorney executed by the beneficiary before becoming incapacitated.
Section 9.02      Retention in Trust
The Trustee may retain and administer trust property in a separate trust for any beneficiary's benefit, subject to the provisions of this Article as follows.
           (a)      Distribution of Net Income and Principal
The Independent Trustee may distribute to the beneficiary as much of the net income and principal of any trust created under this Section as the Independent Trustee may determine advisable for any purpose.  If there is no then-serving Independent Trustee, the Trustee shall distribute to the beneficiary as much of the net income and principal of the trust created under this Section as the Trustee determines is necessary or advisable for the beneficiary's health, education, maintenance, or support.  Any undistributed net income will be accumulated and added to principal.
           (b)      Right of Withdrawal
When the beneficiary whose trust is created under this Section either reaches 21 years of age or is no longer incapacitated, the beneficiary may withdraw all or any portion of the accumulated net income and principal from the trust.
           (c)      Distribution upon the Death of the Beneficiary
Subject to the terms of the next paragraph, the beneficiary whose trust is created under this Section may appoint all or any portion of the principal and undistributed net income remaining in the beneficiary's trust at the beneficiary's death among one or more persons or entities, and the creditors of the beneficiary's estate.  The beneficiary has the exclusive right to exercise this general power of appointment.
The beneficiary may not exercise this power of appointment to appoint to the beneficiary, the beneficiary's estate, the beneficiary's creditors, or creditors of the beneficiary's estate from the limited share of the beneficiary's trust.  For purposes of this power of appointment, the limited share of the beneficiary's trust is that portion of the beneficiary's trust that has an inclusion ratio for generation-skipping transfer tax purposes of zero or that without the exercise of the power of appointment, would not constitute a taxable generation-skipping transfer at the beneficiary's death.  If the generation-skipping tax does not then apply, the limited share will be the beneficiary's entire trust.
If any part of the beneficiary's trust is not effectively appointed, the Trustee shall distribute the remaining unappointed balance per stirpes to the beneficiary's descendants.  If the beneficiary has no then-living descendants, the Trustee shall distribute the unappointed balance per stirpes to the then-living descendants of the beneficiary's nearest lineal ancestor who was a descendant of mine or, if there is no then-living descendant, per stirpes to my descendants.
If I have no then-living descendants, the Trustee shall distribute the balance of the trust property as provided in Article 8.
Section 9.03      Application of Article
Any decision made by the Trustee under this Article is final, controlling, and binding upon all beneficiaries subject to the provisions of this Article.
The provisions of this Article do not apply to distributions to me.
Article Ten
Retirement Plans and Life Insurance Policies
The provisions of this Article apply to qualified retirement plans and insurance policies owned by or made payable to the trust.
Section 10.01      Retirement Plans
Notwithstanding any contrary provision of this trust, the provisions of this Section apply to qualified retirement plans.
           (a)      Rights of the Trustee
The Trustee may exercise the right to determine the manner and timing of qualified retirement plan benefit payments permitted under these plans and consistent with the federal income tax rules regarding required minimum distributions under Internal Revenue Code Section 401(a)(9).
The Trustee may make a qualified disclaimer of any qualified retirement benefits or non-qualified annuity benefits payable to the trust.
The Trustee may not be held liable to any beneficiary for any decision regarding the death benefit election or the disclaimer of any qualified retirement benefits payable to the trust.
The Trustee may not change or designate beneficiaries under any retirement plan.  Any power extended to the Trustee under the terms of a retirement plan that gives or appears to give the Trustee the power to change the identity or rights of any beneficiaries under the plan is void ab initio.
Section 10.02      Life Insurance Policies
The following provisions apply to life insurance policies owned by or made payable to the trust.
           (a)      Provisions during My Life
During my life, I reserve all of the rights, powers, privileges, and options, with respect to any insurance policy, annuity, or any other third-party beneficiary contract owned by or made payable to the trust.  This includes the rights to designate and change beneficiaries, to borrow money, to surrender the policy, to receive any payments as owner, and to make any available elections.
The Trustee will have no duty to exercise or not exercise any rights, powers, privileges, or options with respect to any insurance policy, annuity contract, or other third-party beneficiary contract.  The Trustee will have no obligation to pay premiums or other contractual amounts that may be payable under any policy.
           (b)      Provisions after My Death
After my death, the Trustee may make all appropriate elections with respect to these policies and may collect all sums made payable to the trust or the Trustee under all these policies or contracts.
The Trustee may exercise any settlement options or other options or rights that may be available under the terms of any policy or contract.  The Trustee may not be held liable to any beneficiary on account of any election the Trustee made with respect to any policy or contract.
Section 10.03      Limitation on Liability of Payor
Persons or entities dealing in good faith with the Trustee are not required to see to the proper application of proceeds delivered to the Trustee, or to inquire into any provision of this trust.
A receipt signed by the Trustee for any proceeds or benefits paid will be a sufficient discharge to the person or entity making the payment.
Section 10.04      Collection Efforts
The Trustee shall make reasonable efforts to collect all life insurance policy proceeds and qualified retirement benefits payable to the trust.
The Trustee may commence legal or administrative proceedings to collect any life insurance policy proceeds or qualified retirement benefits to which the trust is entitled.  The Trustee need not commence any proceedings until the Trustee is satisfactorily indemnified for any expenses and liabilities the Trustee may incur in connection with the proceeding.
The Trustee may settle any claims with respect to the collection of any life insurance proceeds or qualified retirement benefits to which the trust may be entitled.  A settlement made by the Trustee will be binding on all beneficiaries.
Section 10.05      No Obligation to Purchase or Maintain Benefits
Nothing in this trust is to be interpreted as imposing any obligation on me or on the Trustee to purchase, invest, or maintain any qualified retirement plan or life insurance policy.
Article Eleven
Trust Administration
Section 11.01      Distributions to Beneficiaries
Whenever this trust authorizes or directs the Trustee to make a net income or principal distribution to a beneficiary, the Trustee may apply any property that otherwise could be distributed directly to the beneficiary for his or her benefit.  The Trustee is not required to inquire into the beneficiary's ultimate disposition of the distributed property unless specifically directed otherwise by this trust.
The Trustee may make cash distributions, in-kind distributions, or distributions partly in each, in proportions and at values determined by the Trustee.  The Trustee may allocate undivided interests in specific assets to a beneficiary or trust in any proportion or manner that the Trustee determines, even though the property allocated to one beneficiary may be different from that allocated to another beneficiary.
The Trustee may make these determinations without regard to the income tax attributes of the property and without the consent of any beneficiary.
Section 11.02      Beneficiary's Status
Until the Trustee receives notice of the incapacity, birth, marriage, death, or other event upon which a beneficiary's right to receive payments may depend, the Trustee will not be held liable for acting or not acting with respect to the event, or for disbursements made in good faith to persons whose interest may have been affected by the event.  Unless otherwise provided in this trust, a parent or Legal Representative may act on behalf of a minor or incapacitated beneficiary.
The Trustee may rely on any information provided by a beneficiary with respect to the beneficiary's assets and income.  The Trustee will have no independent duty to investigate the status of any beneficiary and will not incur any liability for not doing so.
Section 11.03      Mandatory Payments of a Pecuniary Amount
If any person holds the right to receive a pecuniary amount from the trust upon my death, the Trustee must either:
satisfy the entire pecuniary amount or irrevocably set aside property to satisfy the entire pecuniary amount within 15 months of my death; or
pay appropriate interest, as defined in Treasury Regulations Section 26.2642-2(b)(4)(ii)(B), to the person.
If the Trustee satisfies the pecuniary amount with an in-kind distribution, the Trustee will allocate assets to satisfy the pecuniary amount in a manner that fairly reflects net appreciation or depreciation in the value of the available assets, as measured from the valuation date to the payment date.
Section 11.04      No Court Proceedings
The Trustee shall administer this trust with efficiency, with attention to the provisions of this trust, and with freedom from judicial intervention.  If the Trustee or another interested party institutes a legal proceeding, the court will acquire jurisdiction only to the extent necessary for that proceeding.  Any proceeding to seek instructions or a court determination may only be initiated in the court with original jurisdiction over matters relating to the construction and administration of trusts.  Seeking instructions or a court determination is not to be construed as subjecting this trust to the court's continuing jurisdiction.
I request that any questions or disputes that arise during the administration of this trust be resolved by mediation and, if necessary, arbitration in accordance with the Uniform Arbitration Act.  Each interested party involved in the dispute, including any Trustee involved, may select an arbiter and, if necessary to establish a majority decision, these arbiters may select an additional arbiter.  The decision of a majority of the arbiters selected will control with respect to the matter.
Section 11.05      No Bond
The Trustee is not required to furnish any bond for the faithful performance of the Trustee's duties unless required by a court of competent jurisdiction, and only if the court finds that a bond is needed to protect the beneficiaries' interests.  No surety will be required on any bond required by any law or court rule, unless the court specifies its necessity.
Section 11.06      Exoneration of the Trustee
No successor Trustee is obligated to examine the accounts, records, or actions of any previous Trustee or the Personal Representative of my estate.  No successor Trustee may be held responsible for any act, omission, or forbearance by any previous Trustee or of the Personal Representative of my estate.
Any Trustee may obtain written agreements from the beneficiaries or their Legal Representatives releasing and indemnifying the Trustee from any liability that may have arisen from the Trustee's acts, omissions, or forbearances.  If acquired from all the trust's living beneficiaries or their Legal Representatives, any agreement is conclusive and binding on all parties, born or unborn, who may have or who may later acquire an interest in the trust.
The Trustee may require a refunding agreement before making any distribution or allocation of trust income or principal, and may withhold distribution or allocation pending determination or release of a tax or other lien.  This refunding agreement provision will not apply to any distribution that qualifies for the federal estate tax charitable deduction.
Section 11.07      Limitations on Trustee Liability
I recognize that some individuals and institutions may be reluctant to serve as Trustee because of a concern about potential liability.  Therefore, I direct that any individual or corporate fiduciary that serves as the Trustee will not incur any liability by reason of any error of judgment, mistake of law, or action or inaction of any kind in connection with the administration of any trust created under this trust, unless the Trustee's decision is shown by clear and convincing evidence to have been made in bad faith.
Any individual or corporate fiduciary currently serving as the Trustee may expend any portion of the trust assets to defend any claim brought against the Trustee, even if the Trustee's defense costs would exhaust the trust's value, unless the Trustee is shown to have acted in bad faith by clear and convincing evidence.
Any individual or corporate fiduciary that formerly served as the Trustee is entitled to reimbursement from the trust estate for any expenses, including attorney's fees and litigation costs reasonably incurred to defend any claim brought against the Trustee even if the Trustee's defense costs would exhaust the trust's value, unless the Trustee is shown to have acted in bad faith by clear and convincing evidence.
Section 11.08      Trustee Compensation
An individual serving as Trustee is entitled to fair and reasonable compensation for the services provided as a fiduciary.  A corporate fiduciary serving as Trustee will be compensated by agreement between an individual serving as Trustee and the corporate fiduciary.  In the absence of an individual Trustee or an agreement, a corporate fiduciary will be compensated in accordance with the corporate fiduciary's current published fee schedule.  Any Trustee serving as a Trustee under this agreement may from time to time waive all or any amount of compensation in that Trustee's discretion.
A Trustee may charge additional fees for services provided that are beyond the ordinary scope of duties, such as fees for legal services, tax return preparation, and corporate finance or investment banking services.
In addition to receiving compensation, a Trustee may be reimbursed for reasonable costs and expenses incurred in carrying out the Trustee's duties under this trust.
Section 11.09      Employment of Professionals
The Trustee may appoint, employ, and remove investment advisors, accountants, auditors, depositories, custodians, brokers, consultants, attorneys, advisors, agents, and employees to advise or assist in the performance of the Trustee's duties.  The Trustee may act on the recommendations of the persons or entities employed, with or without independent investigation.
The Trustee may reasonably compensate an individual or entity employed to assist or advise the Trustee, regardless of any other relationship existing between the individual or entity and the Trustee.
The Trustee may compensate providers of contracted services at the usual rate out of the trust's income or principal, as the Trustee deems advisable.  The Trustee may compensate an individual or entity employed to assist or advise the Trustee without diminishing the compensation the Trustee is entitled to under this trust.  A Trustee who is a partner, stockholder, officer, director, or corporate affiliate in any entity employed to assist or advise the Trustee may still receive the Trustee's share of the compensation paid to the entity.
Section 11.10      Exercise of Testamentary Power of Appointment
A testamentary power of appointment granted under this trust may be exercised by a written instrument, other than a will or revocable trust, specifically referring to the power of appointment.  The holder of a testamentary power of appointment may exercise the power to appoint property among the permissible appointees in equal or unequal proportions, and may designate the terms and conditions, whether outright or in trust.  The holder of a testamentary power of appointment may grant further powers of appointment to any person to whom principal may be appointed, including a presently exercisable limited or general power of appointment.
The Trustee may conclusively presume that any power of appointment granted to any beneficiary of a trust created under this trust has not been exercised by the beneficiary if the Trustee has no knowledge of the existence of a written instrument, other than a will or revocable trust, exercising the power within three months after the beneficiary's death.
Section 11.11      Determination of Principal and Income
The rights among beneficiaries in matters concerning principal and income are to be determined in accordance with California Uniform Principal and Income Act, Probate Code §§ 16320et seq.  If California Uniform Principal and Income Act, Probate Code §§ 16320et seq does not contain a provision concerning a particular item, the Trustee shall determine what will be credited, charged, and apportioned between principal and income in a fair, equitable, and practical manner with respect to that item.
Section 11.12      Trust Accounting
Except to the extent required by law, the Trustee is not required to file accountings in any jurisdiction.  During my lifetime, if I am not serving as Trustee, the Trustee must provide an accounting to me at least annually.  If I am incapacitated the Trustee must provide the accounting to my Legal Representative, unless waived by my Legal Representative.  After my death, the Trustee must provide an annual accounting to the Qualified Beneficiaries of any trust created under this trust unless waived by the Qualified Beneficiaries.
The annual accounting must include the receipts, expenditures, and distributions of income and principal and the assets on hand for the accounting period.  A copy of the federal fiduciary tax return filed for a trust during the accounting will satisfy this reporting requirement.
In the absence of fraud or obvious error, assent by all Qualified Beneficiaries to a Trustee's accounting will make the matters disclosed in the accounting binding and conclusive upon all persons, including those living on this date and those born in the future who have or will have a vested or contingent interest in the trust property.  In the case of a Qualified Beneficiary who is a minor or incapacitated, the beneficiary's natural guardian or Legal Representative may give the assent required under this Section.
In all events, a beneficiary's Legal Representative may receive any notices and take any action on behalf of the beneficiary as to an accounting.  If any beneficiary's Legal Representative fails to object to any accounting in writing within 180 days after the Trustee provides the accounting, the beneficiary's Legal Representative will be considered to assent to the accounting.
Section 11.13      Information to Beneficiaries
Privacy is an important issue to me.  This Section defines the Trustee's duties to inform, account, and report to beneficiaries of various trusts created under this trust, and to other individuals during my lifetime and after my death.  Except to the extent required by law, the Trustee is not required to comply with a request to furnish a copy of this trust to a Qualified Beneficiary at any time, and the Trustee is not required to send annual reports or reports upon termination of the trust to any Permissible Distributee or Qualified Beneficiary who requests the report.  If the Trustee decides, in the Trustee's sole and absolute discretion, to provide any information to a Permissible Distributee or Qualified Beneficiary, the Trustee may exclude any information that the Trustee determines is not directly applicable to the beneficiary receiving the information.  Any decision by the Trustee to make information available to any beneficiary does not constitute an obligation to provide any information to any beneficiary in the future.
           (a)      Providing Information while I Am Alive and Not Incapacitated
I waive all duties of the Trustee to give notice, information, and reports to any Qualified Beneficiaries other than me while I am alive and able to effectively manage my financial resources.  The Trustee is not required to keep Qualified Beneficiaries of any trust created under this trust other than me informed of the trust administration in any manner.  Further, the Trustee is not required to respond to any request for information related to the trust administration from anyone who is not a Qualified Beneficiary, other than me.
           (b)      Providing Information If I Am Alive but Incapacitated, and after My Death
During any period that I am alive but incapacitated and after my death, the Trustee shall deliver any notice, information, or reports which would otherwise be required to be delivered to me or to a Qualified Beneficiary to a person designated by the Trustee.  To preserve my privacy and the privacy of Qualified Beneficiaries under the trust, while I am alive, I request that the Trustee not provide any copies of the trust or any other information that may otherwise be required to be distributed to any beneficiary under California law to any beneficiary to whom the information is not directly relevant.  The designated person may, in his or her sole and absolute discretion and without waiver, distribute copies of all or any part of the trust or other relevant information about the trust to one or more Qualified Beneficiaries or other interested parties during any period that I am incapacitated.
Section 11.14      Action of Trustees and Delegation of Trustee Authority
When I am not serving as a Trustee, if two Trustees are eligible to act with respect to a given matter, they must agree unanimously for action to be taken unless the express terms of the Trustees' appointment provide otherwise.  If more than two Trustees are eligible to act with respect to a given matter, the Trustees must agree by majority for action to be taken.
If the Trustees are unable to agree on a matter for which they have joint powers, I request that the matter be settled by mediation and then by arbitration, if necessary, in accordance with the Uniform Arbitration Act.  Each of the Trustees may select an arbiter and these arbiters may select an additional arbiter, if necessary to establish a majority decision.  The decision of a majority of the arbiters will control with respect to the matter.
A nonconcurring Trustee may dissent or abstain from a decision of the majority.  A Trustee will be absolved from personal liability by registering the dissent or abstention in the trust records.  After doing so, the dissenting Trustee must then act with the other Trustees in any way necessary or appropriate to effect the majority decision.
Subject to the limitations set forth in Section 15.25, any Trustee may, by written instrument, delegate to any other Trustee the right to exercise any power, including a discretionary power, granted to the Trustee in this trust.  During the time a delegation under this Section is in effect, the Trustee to whom the delegation is made may exercise the power to the same extent as if the delegating Trustee has personally joined in the exercise of the power.  The delegating Trustee may revoke the delegation at any time by giving written notice to the Trustee to whom the power was delegated.
Section 11.15      Trustee May Disclaim or Release Any Power
Notwithstanding any provision of this trust to the contrary, any Trustee may relinquish any Trustee power in whole or in part, irrevocably or for any specified period of time, by a written instrument.  The Trustee may relinquish a power personally or may relinquish the power for all subsequent Trustees.
Section 11.16      Trustee May Execute a Power of Attorney
The Trustee may appoint any individual or entity to serve as the Trustee's agent under a power of attorney to transact any business on behalf of the trust or any other trust created under this trust.
Section 11.17      Additions to Separate Trusts
If upon my death, or upon the termination of any trust created under this trust, a final distribution is to be made to a person who is the Primary Beneficiary of another trust established under this trust, and there is no specific indication whether the distribution is to be made in trust or outright, the Trustee shall make the distribution to the second trust instead of distributing the property to the beneficiary outright.  For purposes of administration, the distribution will be treated as though it had been an original part of the second trust.
Section 11.18      Authority to Merge or Sever Trusts
The Trustee may merge a trust created under this trust with any other trust, if the two trusts contain substantially the same terms for the same beneficiaries and have at least one Trustee in common.  The Trustee may administer the merged trust under the provisions of the instrument governing the other trust, and this trust will no longer exist if it merges into another trust.  Accordingly, in the event another trust is merged into this trust or a trust created under the provisions of this trust document, the Trustee may shorten the period during which this trust subsists to comply with , if necessary, to effect the merger.  But if a merger does not appear feasible, the Trustee may consolidate the trusts' assets for purposes of investment and trust administration while retaining separate records and accounts for each respective trust.
The Trustee may sever any trust on a fractional basis into two or more separate and identical trusts, or may segregate a specific amount or asset from the trust property by allocating it to a separate account or trust.  The separate trusts may be funded on a non pro rata basis, but the funding must be based on the assets' total fair market value on the funding date.  After the segregation, income earned on a segregated amount or specific asset passes with the amount or asset segregated.  The Trustee shall hold and administer each severed trust upon terms and conditions identical to those of the original trust.
Subject to the trust's terms, the Trustee may consider differences in federal tax attributes and other pertinent factors in administering the trust property of any separate account or trust, in making applicable tax elections and in making distributions.  A separate trust created by severance must be treated as a separate trust for all purposes from the effective severance date; however, the effective severance date may be retroactive to a date before the Trustee exercises the power.
Section 11.19      Authority to Terminate Trusts
The Independent Trustee may terminate any trust created under this trust at any time, if the Independent Trustee, in its sole and absolute discretion, determines that administering a trust created under this trust is no longer economical.  Once distributed, the Trustee will have no further responsibility with respect to that trust property.  The Trustee will distribute the trust property from a terminated trust in this order:
to me, if I am then living;
to the beneficiaries then entitled to mandatory distributions of the trust's net income, in the same proportions; and then
if none of the beneficiaries are entitled to mandatory distributions of net income, to the beneficiaries then eligible to receive discretionary distributions of the trust's net income, in the amounts and shares the Independent Trustee determines.
Section 11.20      Discretionary Distribution to Fully Utilize Basis Increase upon Death of Beneficiary
To the extent I have permitted the Trustee to make distributions of principal to a trust beneficiary, the Independent Trustee may distribute as much of the trust's principal to the beneficiary as the Independent Trustee determines advisable so that, upon the beneficiary's death, his or her estate may utilize the basis increase allowed under Internal Revenue Code Section 1014 without causing an increase in the federal estate tax.
Before making a distribution of property under this Section, I request that the Trustee determine whether or not a good reason exists to retain the property in trust, such as whether the Trustee or the beneficiary might sell the property in the near future, as well as protection of the beneficiary from creditors, protection of the beneficiary from failed marriages, and protection of the asset for future generations.  The Trustee has no liability to any beneficiary for any action or inaction by the Trustee under this Section, if made in good faith.
Section 11.21     Merger of Corporate Fiduciary
If any corporate fiduciary acting as the Trustee under this trust is merged with or transfers substantially all of its trust assets to another corporation, or if a corporate fiduciary changes its name, the successor will automatically succeed to the trusteeship as if that successor had been originally named a Trustee.  No document of acceptance of trusteeship will be required.
Section 11.22      Funeral and Other Expenses of Beneficiary
Upon the death of an Income Beneficiary, the Trustee may pay the funeral expenses, burial or cremation expenses, enforceable debts, or other expenses incurred due to the death of the beneficiary from trust property.  This Section only applies to the extent the Income Beneficiary has not exercised any testamentary power of appointment granted to the beneficiary under this trust.
The Trustee may rely upon any request by the deceased beneficiary's Legal Representative or family members for payment without verifying the validity or the amounts and without being required to see to the application of the payment.  The Trustee may make decisions under this Section without regard to any limitation on payment of expenses imposed by statute or court rule and without obtaining the approval of any court having jurisdiction over the administration of the deceased beneficiary's estate.
Article Twelve
The Trustee's Powers
Section 12.01      Introduction to Trustee's Powers
Except as otherwise specifically provided in this trust, the Trustee may exercise the powers granted by this trust without prior approval from any court, including those powers set forth under the laws of the State of California or any other jurisdiction whose law applies to this trust.  The powers set forth in the California Probate Code §§ 16200-16249 are specifically incorporated into this trust.
The Trustee shall exercise the Trustee powers in the manner the Trustee determines to be in the beneficiaries' best interests.  The Trustee must not exercise any power inconsistent with the beneficiaries' right to the enjoyment of the trust property in accordance with the general principles of trust law.
The Trustee may have duties and responsibilities in addition to those described in this trust.  I encourage any individual or corporate fiduciary serving as Trustee to obtain appropriate legal advice if the Trustee has any questions concerning the duties and responsibilities as Trustee.
Section 12.02      Execution of Documents by the Trustee
The Trustee may execute and deliver any written instruments that the Trustee considers necessary to carry out any powers granted in this trust.
Section 12.03      Investment Powers in General
The Trustee may invest in any type of investment that the Trustee determines is consistent with the investment goals of the trust, whether inside or outside the geographic borders of the United States of America and its possessions or territories, taking into account the overall investment portfolio of the trust.
Without limiting the Trustee's investment authority in any way, I request that the Trustee exercise reasonable care and skill in selecting and retaining trust investments.  I also request that the Trustee take into account the following factors in choosing investments:
the potential return from the investment, both in income and appreciation;
the potential income tax consequences of the investment;
the investment's potential for volatility; and
the role the investment will play in the trust's portfolio.
I request that the Trustee also consider the possible effects of inflation or deflation, changes in global and US economic conditions, transaction expenses, and the trust's need for liquidity while arranging the trust's investment portfolio.
The Trustee may delegate his or her discretion to manage trust investments to any registered investment advisor or corporate fiduciary.
Section 12.04      Banking Powers
The Trustee may establish any type of bank account in any banking institutions that the Trustee chooses.  If the Trustee makes frequent disbursements from an account, the account does not need to be interest bearing.  The Trustee may authorize withdrawals from an account in any manner.
The Trustee may open accounts in the name of the Trustee, with or without disclosing fiduciary capacity, and may open accounts in the name of the trust.  When an account is in the name of the trust, checks on that account and authorized signatures need not disclose the account's fiduciary nature or refer to any trust or Trustee.
Section 12.05      Business Powers
If the trust owns or acquires an interest in a business entity, whether as a shareholder, partner, general partner, sole proprietor, member, participant in a joint venture, or otherwise, the Trustee may exercise the powers and authority provided for in this Section.  The powers granted in this Section are in addition to all other powers granted to the Trustee in this trust.
The Trustee may act personally and independently with any business entity in which the trust has an interest, separate from any duties owed to the trust as the Trustee.  This includes serving and receiving compensation for services as an officer, director, general partner, manager, or any other capacity for the business entity.  The compensation the Trustee receives from this entity will not affect the compensation the Trustee may be entitled to for serving as the Trustee.  The Trustee may exercise any voting power for any matter, whether the voting power is held as the Trustee or independently as a stockholder, officer, director, general partner, member, manager, or other capacity of the business entity.  The Trustee may independently own, purchase, and sell an interest in a business entity owned by the trust.  Any sale of a nonpublicly traded business interest between the Trustee and the trust must be approved and effected by an Independent Special Trustee.
Section 12.06      Contract Powers
The Trustee may sell at public or private sale, transfer, exchange for other property, and otherwise dispose of trust property for consideration and upon terms and conditions that the Trustee deems advisable.  The Trustee may grant options of any duration for any sales, exchanges, or transfers of trust property.
The Trustee may enter into contracts, and may deliver deeds or other instruments, that the Trustee considers appropriate.
Section 12.07      Common Investments
For purposes of convenience with regard to the trust property's administration and investment, the Trustee may invest part or all of the trust property jointly with property of other trusts for which the Trustee is also serving as a Trustee.  A corporate fiduciary acting as the Trustee may use common funds for investment.  When trust property is managed and invested in this manner, the Trustee will maintain records that sufficiently identify this trust's portion of the jointly invested assets.
Section 12.08      Environmental Powers
The Trustee may inspect trust property to determine compliance with or to respond to any environmental law affecting the property.  For purposes of this trust, environmental law means any federal, state, or local law, rule, regulation, or ordinance protecting the environment or human health.
The Trustee may refuse to accept property if the Trustee determines that the property is or may be contaminated by any hazardous substance or is or was used for any purpose involving hazardous substances that could create liability to the trust or to any Trustee.
The Trustee may use trust property to:
conduct environmental assessments, audits, or site monitoring;
take remedial action to contain, clean up, or remove any hazardous substance including a spill, discharge, or contamination;
institute, contest, or settle legal proceedings brought by a private litigant or any local, state, or federal agency concerned with environmental compliance;
comply with any order issued by any court or by any local, state, or federal agency directing an assessment, abatement, or cleanup of any hazardous substance; and
employ agents, consultants, and legal counsel to assist the Trustee in these actions.
The Trustee is not liable for any loss or reduction in value sustained by the trust as a result of the Trustee's decision to retain property on which hazardous materials or substances requiring remedial action are discovered, unless the Trustee contributed to that loss through willful misconduct or gross negligence.
The Trustee is not liable to any beneficiary or to any other party for any decrease in the value of property as a result of the Trustee's actions to comply with any environmental law, including any reporting requirement.
The Trustee may release, relinquish, or disclaim any power held by the Trustee that the Trustee determines may cause the Trustee to incur individual liability under any environmental law.
Section 12.09      Farm, Ranch, and Other Agricultural Powers
The Trustee may retain, acquire, and sell any farm or ranching operation, whether as a sole proprietorship, partnership, or corporation.
The Trustee may engage in the production, harvesting, and marketing of farm and ranch products, either by operating directly or indirectly with management agencies, hired labor, tenants, or sharecroppers.
The Trustee may engage and participate in any government farm program, whether state or federally sponsored.
The Trustee may purchase or rent machinery, equipment, livestock, poultry, feed, and seed.
The Trustee may improve and repair all farm and ranch properties; construct buildings, fences, and drainage facilities; and acquire, retain, improve, and dispose of wells, water rights, ditch rights, and priorities of any nature.
The Trustee may do all things customary or desirable to operate a farm or ranch operation for the benefit of the beneficiaries.
Section 12.10      Insurance Powers
The Trustee may purchase, accept, hold, and deal with as owner, insurance policies on my life, any beneficiary's life, or any person's life in whom any beneficiary has an insurable interest.
The Trustee may purchase disability, medical, liability, longterm health care and other insurance on behalf of and for the benefit of any beneficiary.  The Trustee may purchase annuities and similar investments for any beneficiary.
The Trustee may execute or cancel any automatic premium loan agreement with respect to any policy, and may elect or cancel any automatic premium loan provision in a life insurance policy.  The Trustee may borrow money to pay premiums due on any policy, either by borrowing from the company issuing the policy or from another source.  The Trustee may assign the policy as security for the loan.
The Trustee may exercise any option contained in a policy with regard to any dividend or share of surplus apportioned to the policy to reduce the amount of a policy, to convert or exchange the policy, or to surrender a policy at any time for its cash value.
The Trustee may elect any paid-up insurance or extended-term insurance nonforfeiture option contained in a policy.
The Trustee may sell any policy at its fair market value to anyone having an insurable interest in the policy, including the insured.
The Trustee may exercise any other right, option, or benefit contained in a policy or permitted by the issuing insurance company.
Upon termination of the trust, the Trustee may transfer and assign the policies held by the trust as a distribution of trust property.
Section 12.11      Loans and Borrowing Powers
The Trustee may make loans to, or guarantee the borrowing of, any person including a beneficiary, as well as an entity, trust, or estate, for any term or payable on demand, and secured or unsecured.
The Trustee may encumber any trust property by mortgages, pledges, or otherwise, and may negotiate, refinance, or enter into any mortgage or other secured or unsecured financial arrangement, whether as a mortgagee or mortgagor.  The term may extend beyond the trust's termination and beyond the period required for an interest created under this trust to vest in order to be valid under the rule against perpetuities.
The Trustee may enter into, negotiate, or modify the terms of any mortgage or any other secured or unsecured agreement granted in connection with any loan entered into by me individually or by any Trustee, and may release or foreclose on any mortgage or security interest payable to me or to the trust.
The Trustee may borrow money at interest rates and on other terms that the Trustee deems advisable from any person, institution, or other source including, in the case of a corporate fiduciary, its own banking or commercial lending department.
The Trustee may purchase, sell at public or private sale, trade, renew, modify, and extend mortgages.  The Trustee may accept deeds instead of foreclosing.
Section 12.12      Nominee Powers
The Trustee may hold real estate, securities, and any other property in the name of a nominee or in any other form, without disclosing the existence of any trust or fiduciary capacity.
Section 12.13      Oil, Gas and Mineral Interests
The Trustee may acquire, maintain, develop, and exploit, either alone or jointly with others, any oil, gas, coal, mineral, or other natural resource rights or interests.
The Trustee may drill, test, explore, mine, develop, extract, remove, convert, manage, retain, store, sell, and exchange any of those rights and interests on terms and for a price that the Trustee deems advisable.
The Trustee may execute leases, pooling, unitization, and other types of agreements in connection with oil, gas, coal, mineral, and other natural resource rights and interests, even though the terms of those arrangements may extend beyond the trust's termination.
The Trustee may execute division orders, transfer orders, releases, assignments, farm outs, and any other instruments that it considers proper.
The Trustee may employ the services of consultants and outside specialists in connection with the evaluation, management, acquisition, disposition, and development of any mineral interest, and may pay the cost of the services from the trust's principal and income.
Section 12.14      Payment of Property Taxes and Expenses
Except as otherwise provided in this trust, the Trustee may pay any property taxes, assessments, fees, charges, and other expenses incurred in the administration or protection of the trust.  All payments will be a charge against the trust property and will be paid by the Trustee out of income.  If the income is insufficient, then the Trustee may make any payments of property taxes or expenses out of the trust property's principal.  The Trustee's determination with respect to this payment will be conclusive on the beneficiaries.
Section 12.15      Purchase of Assets from and Loans to My Probate Estate
Upon my death, the Trustee may purchase at fair market value and retain in the form received any property that is a part of my probate or trust estate as an addition to the trust.  In addition, the Trustee may make secured and unsecured loans to my probate or trust estate.  The Trustee may not be held liable for any loss suffered by the trust because of the exercise of the powers granted in this Section.
The Trustee may not use any trust property for the benefit of my estate as defined in Code of Federal Regulations Title 26 Section 20.2042-1(b), unless the property is included in my gross estate for federal estate tax purposes.
Section 12.16      Qualified Real Property Valuation
The Independent Trustee has the power to amend the terms of a trust holding qualified real property as defined in Internal Revenue Code Section 2032A, in order to permit the qualified real property to qualify for special use valuation permitted under Section 2032A, even if the amendment changes beneficial interests and that directs the segregation of trust property into more than one trust.
Section 12.17      Qualified Tuition Programs
The Trustee may purchase tuition credits or certificates or make contributions to an account in one or more qualified tuition programs as defined under Internal Revenue Code Section 529 on a beneficiary's behalf for the purpose of meeting the beneficiary's qualified higher education expenses.  With respect to an interest in any qualified tuition program, the Trustee may act as contributor, administering the interest by actions including:
designating and changing the designated beneficiary of the interest in the qualified tuition program;
requesting both qualified and nonqualified withdrawals;
selecting among investment options and reallocating funds among different investment options;
making rollovers to another qualified tuition program; and
allocating any tax benefits or penalties to the beneficiaries of the trust.
Notwithstanding anything in this provision to the contrary, the designated beneficiary must always be a beneficiary of the trust from which the funds were distributed to establish the interest in the qualified tuition program.  Investment in a qualified tuition program will not be considered a delegation of investment responsibility under any applicable statute or other law.
Section 12.18      Real Estate Powers
The Trustee may sell at public or private sale, convey, purchase, exchange, lease for any period, mortgage, manage, alter, improve, and in general deal in and with real property in the manner and on the terms and conditions as the Trustee deems appropriate.
The Trustee may grant or release easements in or over, subdivide, partition, develop, raze improvements to, and abandon any real property.
The Trustee may manage real estate in any manner considered best, and may exercise all other real estate powers necessary to effect this purpose.
The Trustee may enter into contracts to sell real estate.  The Trustee may enter into leases and grant options to lease trust property, even though the term of the agreement extends beyond the termination of any trusts established under this trust and beyond the period that is required for an interest created under this trust to vest in order to be valid under the rule against perpetuities.  The Trustee may enter into any contracts, covenants, and warranty agreements that the Trustee deems appropriate.
Section 12.19      Residences and Tangible Personal Property
The Trustee may acquire, maintain, and invest in any residence for the beneficiaries' use and benefit, whether or not the residence is income producing and without regard to the proportion that the residence's value may bear to the trust property's total value, even if retaining the residence involves financial risks that Trustees would not ordinarily incur.  The Trustee may pay or make arrangements for others to pay all carrying costs of any residence for the beneficiaries' use and benefit, including taxes, assessments, insurance, maintenance, and other related expenses.
The Trustee may acquire, maintain, and invest in articles of tangible personal property, whether or not the property produces income.  The Trustee may pay for the repair and maintenance of the property.
The Trustee is not required to convert the property referred to in this Section to income-producing property, except as required by other provisions of this trust.
The Trustee may permit any Income Beneficiary of the trust to occupy any real property or use any personal property owned by the trust on terms or arrangements that the Trustee determines, including rent free or in consideration for the payment of taxes, insurance, maintenance, repairs, or other charges.
The Trustee is not liable for any depreciation or loss resulting from any decision to retain or acquire any property as authorized by this Section.
Section 12.20      Retention and Abandonment of Trust Property
The Trustee may retain any property constituting the trust at the time of its creation, at the time of my death, or as the result of the exercise of a stock option, without liability for depreciation or loss resulting from retention.  The Trustee may retain property, notwithstanding the fact that the property may not be of the character prescribed by law for the investment of assets held by a fiduciary, and notwithstanding the fact that retention may result in inadequate diversification under any applicable Prudent Investor Act or other applicable law.
The Trustee may hold property that is not income producing or is otherwise nonproductive if holding the property is in the best interests of the beneficiaries in the sole and absolute discretion of the Trustee.  On the other hand, the Trustee will invest contributions of cash and cash equivalents as soon as reasonably practicable after the assets have been acquired by the trust.
The Trustee may retain a reasonable amount in cash or money market accounts to pay anticipated expenses and other costs, and to provide for anticipated distributions to or for the benefit of a beneficiary.
The Trustee may abandon any property that the Trustee considers of insignificant value.
Section 12.21      Securities, Brokerage and Margin Powers
The Trustee may buy, sell, trade, and otherwise deal in stocks, bonds, investment companies, mutual funds, common trust funds, commodities, and other securities of any kind and in any amount, including short sales.  The Trustee may write and purchase call or put options, and other derivative securities.  The Trustee may maintain margin accounts with brokerage firms, and may pledge securities to secure loans and advances made to the Trustee or to or for a beneficiary's benefit.
The Trustee may place all or any part of the securities held by the trust in the custody of a bank or trust company.  The Trustee may have all securities registered in the name of the bank or trust company or in the name of the bank's nominee or trust company's nominee.  The Trustee may appoint the bank or trust company as the agent or attorney in fact to collect, receive, receipt for, and disburse any income, and generally to perform the duties and services incident to a custodian of accounts.
The Trustee may employ a broker-dealer as a custodian for securities held by the trust, and may register the securities in the name of the broker-dealer or in the name of a nominee; words indicating that the securities are held in a fiduciary capacity are optional.  The Trustee may hold securities in bearer or uncertificated form, and may use a central depository, clearing agency, or book-entry system, such as The Depository Trust Company, Euroclear, or the Federal Reserve Bank of New York.
The Trustee may participate in any reorganization, recapitalization, merger, or similar transaction.  The Trustee may exercise or sell conversion or subscription rights for securities of all kinds and descriptions.  The Trustee may give proxies or powers of attorney that may be discretionary and with or without powers of substitution, and may vote or refrain from voting on any matter.
Section 12.22      Settlement Powers
The Trustee may settle any claims and demands in favor of or against the trust by compromise, adjustment, arbitration, or other means.  The Trustee may release or abandon any claim in favor of the trust.
Section 12.23      Subchapter S Corporation Stock Provisions
During any period the trust is not treated as a grantor trust for tax purposes under Internal Revenue Code Section 671, this trust or any trust created under this trust may hold any S corporation stock held as a separate Electing Small Business Trust, or as a separate Qualified Subchapter S Trust, as provided in this Section.
For purposes of this Section, S corporation stock means all capital stock issued by a corporation (or other entity taxable as a corporation for federal income tax purposes) that is treated or is intended to be treated under Section 1361(a) as an S corporation for federal income tax purposes.
           (a)      Electing Treatment as an Electing Small Business Trust
If the Trustee elects under Internal Revenue Code Section 1361(e)(3) to qualify any portion of the trust as an Electing Small Business Trust, the Trustee shall:
apportion a reasonable share of the unallocated expenses of all trusts created under this trust to the Electing Small Business Trust under the applicable provisions of the Internal Revenue Code and Treasury Regulations; and
administer the trust as an Electing Small Business Trust, under Internal Revenue Code Section 1361(e).
           (b)      Electing Treatment as a Qualified Subchapter S Trust
If the current Income Beneficiary of the trust makes an election under Section 1361(d)(2) to qualify the trust as a Qualified Subchapter S Trust within the meaning of Section 1361(d)(3), the Trustee shall:
refer to the Qualified Subchapter S Trust using the same name as the trust to which the stock was originally allocated, plus the name of the current Income Beneficiary of the trust, followed by the letters QSST;
administer the Qualified Subchapter S Trust in accordance with the same provisions contained in the trust to which the Trustee allocated the S corporation stock, as long as the provisions of this Subsection control the trust administration to the extent that they are inconsistent with the provisions of the original trust; and
maintain the Qualified Subchapter S Trust as a separate trust held for the benefit of only one beneficiary as required in Section 1361(d)(3).
The Trustee shall recommend that the current Income Beneficiary of the trust make a timely election to cause federal tax treatment of the trust as a Qualified Subchapter S Trust.
                      (1)      Current Income Beneficiary
The current Income Beneficiary of a Qualified Subchapter S Trust is the person who has a present right to receive income distributions from the trust to which the Trustee has allocated the S corporation stock.  A Qualified Subchapter S Trust may have only one current Income Beneficiary.
If, under the terms of the trust, more than one person has a present right to receive income distributions from the trust originally holding the S corporation stock, the Trustee shall segregate the S corporation stock into separate Qualified Subchapter S Trusts for each of these people.
                      (2)      Distributions
Until the earlier of the death of the current Income Beneficiary or the date on which the trust no longer holds any S corporation stock (the QSST termination date), the Trustee shall distribute at least annually all of the trust's net income, as defined in Internal Revenue Code Section 643(b) to the current Income Beneficiary.
The terms of the trust to which the S corporation stock was originally allocated govern distributions of principal from the Qualified Subchapter S Trust.  But until the QSST termination date, the Trustee may distribute principal only to the current Income Beneficiary of the Qualified Subchapter S Trust and not to any other person or entity.
If the Qualified Subchapter S Trust terminates during the lifetime of the current Income Beneficiary, the Trustee shall distribute all assets of the Qualified Subchapter S Trust to the current Income Beneficiary outright and free of the trust.
                      (3)      Allocation of Income and Expenses
The Trustee shall characterize receipts and expenses of any Qualified Subchapter S Trust in a manner consistent with Internal Revenue Code Section 643(b).
                      (4)      Trust Merger or Consolidation
Notwithstanding any other provision of this trust that may seem to the contrary, the Trustee may not merge any Qualified Subchapter S Trust with another trust's assets if doing so would jeopardize the qualification of either trust as a Qualified Subchapter S Trust.
           (c)      Governance of the Trusts
The following additional provisions apply to any separate trust created under this Section.
                      (1)      Protection of S Corporation Status
The Trustee must not administer a trust holding S corporation stock in a manner that would cause the termination of the S corporation status of the entity whose stock is held as part of the trust.  Therefore, during any period that the trust holds S corporation stock, the Trustee must construe the terms and provisions of this trust in a manner that is consistent with the trust qualifying as an Electing Small Business Trust or as a Qualified Subchapter S Trust.  The Trustee must disregard any provision of this trust that cannot be so construed or applied.
                      (2)      Methods of Distribution
The Trustee may not make distributions in a manner that would jeopardize the trust's qualification as an Electing Small Business Trust or as a Qualified Subchapter S Trust.
                      (3)      Disposition of S Corporation Stock
If the Trustee believes the continuation of any trust would result in the termination of the S corporation status of any entity whose stock is held as a part of the trust property, the Trustee, other than an Interested Trustee, in addition to the power to sell or otherwise dispose of the stock, has the power to distribute the stock to the person who is then entitled to receive the income from the trust.
Section 12.24      Limitation on the Trustee's Powers
All powers granted to Trustees under this trust or by applicable law are limited as set forth in this Section, unless explicitly excluded by reference to this Section.
           (a)      An Interested Trustee Limited to Ascertainable Standards
An Interested Trustee may only make discretionary decisions when they pertain to a beneficiary's health, education, maintenance, or support as described under Internal Revenue Code Sections 2041 and 2514.
           (b)      Interested Trustee Prohibited from Acting
Whenever this trust specifically prohibits or limits an Interested Trustee from exercising discretion or performing an act, then any Interested Trustee serving as the Trustee is prohibited from participating in the exercise of that discretion or performance of that act.  If there is no Trustee serving who is not an Interested Trustee, then an Independent Special Trustee may be appointed under the provisions of  to exercise the discretion or perform the act.
           (c)      Exclusive Powers of The Independent Trustee
Whenever a power or discretion is granted exclusively to the Independent Trustee, then any Interested Trustee who is then serving as the Trustee is prohibited from participating in the exercise of the power or discretion.  If there is no Independent Trustee then serving, then an Independent Special Trustee may be appointed under the provisions of  to exercise the power or discretion that is exercisable only by the Independent Trustee.
           (d)      No Distributions in Discharge of Certain Legal Obligations
The Trustee may not exercise or participate in the exercise of discretion with respect to the distribution of income or principal that would in any manner discharge a legal obligation of the Trustee, including the obligation of support.
If a beneficiary or any other person has the power to remove a Trustee, that Trustee may not exercise or participate in the exercise of discretion with respect to the distribution of income or principal that would in any manner discharge a legal obligation of the person having the power to remove the Trustee, including that person's obligation of support.
           (e)      Insurance Policy on the Life of the Trustee
If the trust holds a policy that insures the life of a Trustee, that Trustee may not exercise any powers or rights with respect to the policy.  Instead, a Co-Trustee or an Independent Special Trustee must exercise the powers and rights with respect to the policy.
If any rule of law or court decision construes the ability of the insured Trustee to name an Independent Special Trustee as an incident of ownership of the policy, then a majority of the then current Income Beneficiaries (excluding the insured Trustee if he or she is a beneficiary) will select the Independent Special Trustee.
           (f)      Insurance Policy on a Beneficiary's Life
If the trust holds a policy that insures a beneficiary's life, the beneficiary, individually or as Trustee, may not exercise any power over the policy, its cash value, or its proceeds.  This denial of power is intended to prevent an insured beneficiary from holding any power that would constitute an incident of ownership of the policy.
In addition, no distribution of income or principal to the insured beneficiary may be satisfied out of the policy's proceeds, cash value, or other economic benefit of the policy.
The limitations of this Subsection do not apply if, upon the beneficiary's death, the policy's proceeds would otherwise be included in the beneficiary's gross estate for federal estate tax purposes.
Article Thirteen
General Provisions
Section 13.01      Maximum Term for Trusts
Notwithstanding any contrary provisions or unless terminated earlier under other provisions of this trust, each trust created under this trust document will terminate 21 years after the death of the last to die of the descendants of my paternal and maternal grandparents who are living at the time of my death.
At that time, the remaining trust property will vest in and be distributed to the persons entitled to receive mandatory distributions of the trust's net income, in the same proportions.  If no beneficiary is entitled to mandatory distributions of net income, the remaining trust property will vest in and be distributed to the beneficiaries entitled to receive discretionary distributions of the trust's net income, in equal shares.
Section 13.02      Spendthrift Provision
No beneficiary may assign, anticipate, encumber, alienate, or otherwise voluntarily transfer the income or principal of any trust created under this trust.  In addition, neither the income nor the principal of any trust created under this trust is subject to attachment, bankruptcy proceedings or any other legal process, the interference or control of creditors or others, or any involuntary transfer.
This Section does not restrict a beneficiary's right to disclaim any interest or exercise of any power of appointment granted in this trust.
Section 13.03      Contest Provision
If any person attempts to contest or oppose the validity of this trust or any amendment to this trust, or commences, continues, or prosecutes any legal proceedings to set this trust aside, then that person will forfeit his or her share, cease to have any right or interest in the trust property, and will be considered to have predeceased me for purposes of this instrument.
But during any period in which the laws of the State of California govern the applicability or validity of this provision, California Probate Code Section 21311 will apply, and the Trustee may only enforce this provision against any of these types of contests:
a direct contest brought by any beneficiary without probable cause;
a pleading by any beneficiary to challenge a property transfer on the grounds that the transferor did not own the property at the transfer time; and
any filing of a creditor's claim or prosecution of any action based on the filing of a claim of this kind.
The terms direct contest, and pleading have the same meanings as set forth in California Probate Code Section 21310.  This trust and any trusts created in this instrument are protected instruments as provided in California Probate Code Section 21310(e).
Section 13.04      Survivorship Presumption
If any beneficiary is living at my death, but dies within 45 days after my death, then the beneficiary will be considered to have predeceased me for this trust's purposes.
Section 13.05      Changing the Governing Law and Situs of Administration
At any time, the Trustee may change the governing law of the trust; change the situs of the administration of the trust; and remove all or any part of the property from one jurisdiction to another.  The Trustee may elect, by filing an instrument with the trust records, that the trust will then be construed, regulated, and governed by the new jurisdiction's laws.  The Trustee may take action under this Section for any purpose the Trustee considers appropriate, including the minimization of any taxes in respect of the trust or any trust beneficiary.
If considered necessary or advisable by the Trustee, the Trustee may appoint an Independent Trustee to serve as Trustee in the new situs.
If necessary and if the Trustee does not appoint an Independent Trustee within 30 days of the Trustee's action to change the governing law or situs of the trust, the beneficiaries entitled to receive distributions of the trust's net income may appoint a corporate fiduciary in the new situs by majority consent.  If a beneficiary is a minor or is incapacitated, the beneficiary's parent or Legal Representative may act on the beneficiary's behalf.
Section 13.06      Definitions
For purposes of this trust, the following terms have these meanings:
           (a)      Adopted and Afterborn Persons
A person in any generation who is legally adopted before reaching 18 years of age and his or her descendants, including adopted descendants, have the same rights and will be treated in the same manner under this trust as natural children of the adopting parent.  A person is considered legally adopted if the adoption was legal at the time when and in the jurisdiction in which it occurred.
A fetus in utero later born alive will be considered a person in being during the period of gestation.
           (b)      Descendants
The term descendants means persons who directly descend from a person, such as children, grandchildren, or great-grandchildren.  The term descendants does not include collateral descendants, such as nieces and nephews.
           (c)      Education
The term education is intended to be an ascertainable standard under Internal Revenue Code Sections 2041 and 2514 and includes:
enrollment at private elementary, junior, and senior high school, including boarding school;
undergraduate and graduate study in any field at a college or university;
specialized, vocational, or professional training or instruction at any institution, as well as private instruction; and
any other curriculum or activity that the Trustee considers useful for developing a beneficiary's abilities and interests including athletic training, musical instruction, theatrical training, the arts, and travel.
The term education also includes expenses such as tuition, room and board, fees, books, supplies, computers and other equipment, tutoring, transportation, and a reasonable allowance for living expenses.
           (d)      Good Faith
For the purposes of this trust, a Trustee has acted in good faith if:
an action or inaction is not a result of intentional wrongdoing;
the Trustee did not make the decision to act or not act with reckless indifference to the beneficiaries' interests; and
an action or inaction does not result in an improper personal benefit to the Trustee.
Further, all parties subject to the provisions of this trust will treat any action or inaction made in reliance on information, consent, or directions received from the Personal Representative of my estate as made in good faith for the purposes of this Section, except for cases of willful misconduct or malfeasance on the Trustee's part.
           (e)      Grantor
Grantor has the same legal meaning as Settlor, Trustor or any other term referring to the maker of a trust.
           (f)      Incapacity
Except as otherwise provided in this trust, a person is considered incapacitated in any of the following circumstances.
                      (1)      The Opinion of Two Licensed Physicians
An individual is considered to be incapacitated whenever two licensed physicians give the opinion that the individual is unable to effectively manage his or her property or financial affairs, whether as a result of age; illness; use of prescription medications, drugs, or other substances; or any other cause.  If an individual whose capacity is in question refuses to provide necessary documentation or otherwise submit to examination by licensed physicians, that individual will be considered incapacitated.
An individual is considered restored to capacity whenever the individual's personal or attending physician provides a written opinion that the individual is able to effectively manage his or her property and financial affairs.
                      (2)      Court Determination
An individual is considered incapacitated if a court of competent jurisdiction has declared the individual to be disabled, incompetent, or legally incapacitated.
                      (3)      Detention, Disappearance, or Absence
An individual is considered to be incapacitated whenever he or she cannot effectively manage his or her property or financial affairs due to the individual's unexplained disappearance or absence for more than 30 days, or whenever he or she is detained under duress.
An individual's disappearance, absence, or detention under duress may be established by an affidavit of the Trustee, or by the affidavit of any beneficiary if no Trustee is then serving.  The affidavit must describe the circumstances of the individual's disappearance, absence, or detention, and may be relied upon by any third party dealing in good faith with the Trustee.
           (g)      Include, Includes, Including
In this document, the words include, includes, and including mean include without limitation, includes without limitation and including without limitation, respectively.  Include, includes, and including are words of illustration and enlargement, not words of limitation or exclusivity.
           (h)      Income Beneficiary
The term Income Beneficiary means any beneficiary who is then entitled to receive distributions of the trust's net income, whether mandatory or discretionary.
Unless otherwise provided in this trust, the phrase majority of the Income Beneficiaries means any combination of Income Beneficiaries who would receive more than 50% of the accrued net income if that income were distributed on the day of a vote.  For purposes of this calculation, beneficiaries who are eligible to receive discretionary distributions of net income receive the imputed income in equal shares.
References to a majority refer to a majority of the entire trust collectively until the Trustee allocates property to separate trusts or trust shares.  After the Trustee allocates property to separate trusts or trust shares, references to a majority refer to a majority of each separate trust or trust share.
           (i)      Independent Trustee
The term Independent Trustee means any Trustee who is not an Interested Trustee as defined in Subsection (aa) and includes an Independent Special Trustee appointed under the provisions of Section 3.08.
           (j)      Instrument
The term this instrument means this trust, and includes all trusts created under the terms of this trust.
           (k)      Interested Trustee
The term Interested Trustee means a Trustee who:
is a transferor or beneficiary;
is related or subordinate to a transferor or beneficiary;
can be removed and replaced by a transferor with either the transferor or a party who is related or subordinate to the transferor; or
can be removed and replaced by a beneficiary with either the beneficiary or a party who is related or subordinate to the beneficiary.
For purposes of this Subsection, transferor means a person who transferred property to the trust during that person's lifetime, including a person whose disclaimer resulted in property passing to the trust.  A person is only a transferor during his or her lifetime.  Beneficiary means a person who is or may become eligible to receive income or principal from the trust under the terms of the trust, even if this person has only a remote contingent remainder interest in the trust, but not if the person's only interest is as a potential appointee under a power of appointment.  Related or subordinate is used as defined in Internal Revenue Code Section 672(c).
           (l)      Internal Revenue Code and Treasury Regulations
References to the Internal Revenue Code or to its provisions are to the Internal Revenue Code of 1986, as amended, and any corresponding Treasury Regulations.  References to the Treasury Regulations, are to the Treasury Regulations under the Internal Revenue Code in effect.  If a particular provision of the Internal Revenue Code is renumbered or the Internal Revenue Code is superseded by a subsequent federal tax law, any reference is considered to be made to the renumbered provision or to the corresponding provision of the subsequent law, unless to do so would clearly be contrary to my intent as expressed in this trust.  The same rule applies to references to the Treasury Regulations.
           (m)      Legal Representative or Personal Representative
As used in this trust document, the term Legal Representative or Personal Representative means a person's guardian, conservator, executor, administrator, Trustee, attorney in fact under a Durable Power of Attorney, or any other person or entity representing a person or the person's estate.  In the case of a minor beneficiary, the beneficiary's parent or another adult with custody of the beneficiary, except for any transferor to a trust created under this instrument, will be considered the beneficiary's Legal Representative for purposes of this trust.
           (n)      Per Stirpes
Whenever a distribution is to be made to a person's descendants per stirpes, the distribution will be divided into as many equal shares as there are then living children and deceased children who left then-living descendants.  Each then-living child will receive one share, and the share of each deceased child will be divided among the deceased child's then-living descendants in the same manner.
           (o)      Permissible Distributee
Permissible Distributee means a beneficiary who is currently eligible to receive distributions of trust income or principal, whether the distribution is mandatory or discretionary.
           (p)      Primary Beneficiary
The Primary Beneficiary of a trust created under this trust is that trust's oldest Income Beneficiary, unless some other individual is specifically designated as the Primary Beneficiary of that separate trust.
           (q)      Qualified Beneficiary
Qualified Beneficiary means a beneficiary who, on the date the beneficiary's qualification is determined:
(1)    is a distributee or Permissible Distributee of trust income or principal;
(2)    would be a distributee or Permissible Distributee of trust income or principal if the interests of the distributees described in subparagraph (1) terminated on that date; or
(3)    would be a distributee or Permissible Distributee of trust income or principal if the trust terminated on that date.
           (r)      Qualified Retirement Benefits
The term qualified retirement plan means a plan qualified under Internal Revenue Code Section 401, an individual retirement arrangement under Section 408 or Section 408A, or a tax-sheltered annuity under Section 403.  The term qualified retirement benefits means the amounts held in or distributed pursuant to a plan qualified under Section 401, an individual retirement arrangement under Section 408 or Section 408A, a tax-sheltered annuity under Section 403, or any other benefit subject to the distribution rules of Section 401(a)(9).
           (s)      Shall and May
Unless otherwise specifically provided in this trust or by the context in which used, I use the word shall in this trust to impose a duty, command, direct, or require, and the word may to allow or permit, but not require.  In the context of the Trustee, when I use the word shall I intend to impose a fiduciary duty on the Trustee.  When I use the word may I intend to empower the Trustee to act with the Trustee's sole and absolute discretion unless otherwise stated in this trust.  When I use the words may not in reference to the Trustee, I specifically mean the Trustee is not permitted to.
           (t)      Trust
The terms this trust, this document, instrument, and this trust document refer to this trust and all trusts created under the terms of this trust.
           (u)      Trustee
The terms the Trustee and Trustee refer to the Initial Trustee named in Article One and to any successor, substitute, replacement, or additional person, corporation, or other entity that ever acts as the Trustee of any trust created under the terms of this trust.  The term Trustee refers to singular or plural as the context may require.
           (v)      Trust Property
The term trust property means all property acquired from any source and held by a Trustee under this trust.
Section 13.07      General Provisions and Rules of Construction
The following general provisions and rules of construction apply to this trust.
           (a)      Multiple Originals; Validity of Paper or Electronic Copies
This trust may be executed in any number of counterparts, each of which will be considered an original.
Any person may rely on a paper or electronic copy of this trust that the Trustee certifies to be a true copy as if it were an original.
           (b)      Singular and Plural; Gender
Unless the context requires otherwise, singular words may be construed as plural, and plural words may be construed as singular.  Words of one gender may be construed as denoting another gender as is appropriate within the context.  The word or, when used in a list of more than two items, may function as both a conjunction and a disjunction as the context requires.
           (c)      Headings of Articles, Sections, and Subsections
The headings of Articles, Sections, and Subsections used within this trust are included solely for the convenience of the reader.  They have no significance in the interpretation or construction of this trust.
           (d)      Governing State Law
This trust is governed, construed, and administered according to the laws of California, as amended except as to trust property required by law to be governed by the laws of another jurisdiction and unless the situs of administration is changed under Section 13.05.
           (e)      Notices
Unless otherwise stated, any notice required under this trust will be in writing.  The notice may be personally delivered with proof of delivery to the party requiring notice and will be effective on the date personally delivered.  Notice may also be mailed, postage prepaid, by certified mail with return receipt requested to the last known address of the party requiring notice.  Mailed notice is effective on the date of the return receipt.  If a party giving notice does not receive the return receipt but has proof that he or she mailed the notice, notice will be effective on the date it would normally have been received via certified mail.  If the party requiring notice is a minor or incapacitated individual, notice will be given to the parent or Legal Representative.
           (f)      Severability
The invalidity or unenforceability of any provision of this trust does not affect the validity or enforceability of any other provision of this trust.  If a court of competent jurisdiction determines that any provision is invalid, the remaining provisions of this trust are to be interpreted as if the invalid provision had never been included.
I have executed this trust on ${formData.currentDate}.  This trust instrument is effective when signed by me, whether or not now signed by a Trustee.


    ____________________________
    ${formData.client.firstName} ${formData.client.lastName}, Grantor and Trustee
A notary public or other officer completing this certificate verifies only the identity of the individual who signed the document to which this certificate is attached, and not the truthfulness, accuracy, or validity of that document.

State of ${formData.client.state}
County of ${formData.client.county}
On ${formData.currentDate} before me, ______________________________ (here insert name and title of the officer), personally appeared ${formData.client.firstName} ${formData.client.lastName}, who proved to me on the basis of satisfactory evidence to be the person(s) whose name(s) is/are subscribed to the within instrument and acknowledged to me that he/she/they executed the same in his/her/their authorized capacity(ies), and that by his/her/their signature(s) on the instrument the person(s), or the entity upon behalf of which the person(s) acted, executed the instrument.
I certify under PENALTY of PERJURY under the laws of the State of ${formData.client.state} that the foregoing paragraph is true and correct.
    WITNESS my hand and official seal.

Signature ____________________________               (Seal)

Schedule of Assets

${formData.scheduleOfAssets || 'The real property located at [ADDRESS]'}
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
______________________________________________________________________________
`;

// Export with both names for compatibility
export { singleTrustTemplate as singleLivingTrustTemplate };
export default singleTrustTemplate;
