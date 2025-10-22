export const overviewPageTemplate = () => {
  return `OVERVIEW
_______________________________________________________________________

This section contains an overview of your estate plan that illustrates the most important provisions of your plan. This overview is not a legally binding document.

The {{TRUST_NAME}} Information Page

NAME OF THE TRUST:      {{TRUST_NAME}}

DATE ESTABLISHED:       {{TRUST_DATE_FORMATTED}}

NAMES OF TRUSTEES:      {{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}

_______________________________________________________________________

═══════════════════════════════════════════════════════════════════════
FOR TRUST BUSINESS, ALWAYS SIGN NAME:

{{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}, Trustees of {{TRUST_NAME}}
═══════════════════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════════════════
TITLE TO ALL ASSETS IN THIS TRUST IS VESTED IN THE NAME OF:

{{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}, Trustees, or their successors in interest, of {{TRUST_NAME}} dated {{TRUST_DATE_FORMATTED}}, and any amendments thereto
═══════════════════════════════════════════════════════════════════════

_______________________________________________________________________

ASSETS MAY BE TRANSFERRED TO OR REMOVED FROM THIS TRUST AT ANY TIME

ALL INCOME OR LOSS FROM TRUST ASSETS SHOULD BE REPORTED ON GRANTOR'S INDIVIDUAL FEDERAL AND STATE INCOME TAX RETURNS

_______________________________________________________________________

DO NOT WRITE ON YOUR TRUST INSTRUMENT, CHANGE IT, OR REVOKE IT WITHOUT ADVICE FROM YOUR ATTORNEY

_______________________________________________________________________

LAW OFFICES OF ROZSA GYENE, PC
450 N BRAND BLVD. SUITE 623
GLENDALE, CALIFORNIA 91203`;
};
