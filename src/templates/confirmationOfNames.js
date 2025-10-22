export const confirmationOfNamesTemplate = () => {
  return `Confirmation of Names and Fiduciaries{{#IF_JOINT}} for {{CLIENT_FULL_NAME}}{{/IF_JOINT}}

Client Information

Grantor Name:       {{CLIENT_FULL_NAME}}
{{#IF_JOINT}}
Grantor Name:       {{SPOUSE_FULL_NAME}}
{{/IF_JOINT}}
Address:            {{CLIENT_ADDRESS}}
                    {{CLIENT_CITY}}, {{CLIENT_STATE}} {{CLIENT_ZIP}}

{{#IF_HAS_CHILDREN}}

Family Information
_______________________________________________________________________
Name                          Relationship           Date of Birth
_______________________________________________________________________
{{#EACH_CHILDREN}}
{{CHILD_FULL_NAME}}           {{CHILD_RELATIONSHIP}} {{CHILD_DOB_FORMATTED}}
{{/EACH_CHILDREN}}
_______________________________________________________________________
{{/IF_HAS_CHILDREN}}

{{#IF_HAS_MINOR_CHILDREN}}

Guardian for Minor Children

{{GUARDIAN_NAME}}
{{/IF_HAS_MINOR_CHILDREN}}


Trust Information

Name of Trust:        {{TRUST_NAME}}, dated {{TRUST_DATE_FORMATTED}}
Initial Trustees:     {{CLIENT_FULL_NAME}}{{#IF_JOINT}} and {{SPOUSE_FULL_NAME}}{{/IF_JOINT}}

Successor Trustees:
    Upon Incapacity or Death:
{{#IF_JOINT}}
    The non-incapacitated or surviving spouse will serve as sole Trustee.  If he or she is unable to serve or to continue to serve for any reason, then the following will serve as successor Trustee, in the order named:
{{/IF_JOINT}}
{{#EACH_SUCCESSOR_TRUSTEES}}
    {{SUCCESSOR_TRUSTEE_NAME}}{{#IF_NEEDS_AGE_18}} (at age 18){{/IF_NEEDS_AGE_18}}
{{/EACH_SUCCESSOR_TRUSTEES}}


Durable Power of Attorney for {{CLIENT_FULL_NAME}}
{{#IF_JOINT}}
Initial Agent:    {{SPOUSE_FULL_NAME}}
{{/IF_JOINT}}
{{#IF_SINGLE}}
Initial Agent:    {{DPOA_AGENT_NAME}}
{{/IF_SINGLE}}
Successor Agent:    {{DPOA_SUCCESSOR_NAME}}

{{#IF_JOINT}}

Durable Power of Attorney for {{SPOUSE_FULL_NAME}}

Initial Agent:    {{CLIENT_FULL_NAME}}
Successor Agent:    {{DPOA_SUCCESSOR_NAME}}
{{/IF_JOINT}}


HIPAA Agent for {{CLIENT_FULL_NAME}}
{{#IF_JOINT}}
{{SPOUSE_FULL_NAME}} and
{{/IF_JOINT}}
{{#EACH_HIPAA_AGENTS}}
{{HIPAA_AGENT_NAME}}
{{/EACH_HIPAA_AGENTS}}

{{#IF_JOINT}}

HIPAA Agent for {{SPOUSE_FULL_NAME}}

{{CLIENT_FULL_NAME}} and
{{#EACH_HIPAA_AGENTS}}
{{HIPAA_AGENT_NAME}}
{{/EACH_HIPAA_AGENTS}}
{{/IF_JOINT}}


Advance Health Care Directive for {{CLIENT_FULL_NAME}}
{{#IF_JOINT}}
Initial Agent:    {{SPOUSE_FULL_NAME}}
{{/IF_JOINT}}
{{#IF_SINGLE}}
Initial Agent:    {{HEALTHCARE_AGENT_NAME}}
{{/IF_SINGLE}}
Successor Agent:    {{HEALTHCARE_SUCCESSOR_NAME}}

{{#IF_JOINT}}

Advance Health Care Directive for {{SPOUSE_FULL_NAME}}

Initial Agent:    {{CLIENT_FULL_NAME}}
Successor Agent:    {{HEALTHCARE_SUCCESSOR_NAME}}
{{/IF_JOINT}}


Personal Representative for {{CLIENT_FULL_NAME}}
{{#IF_JOINT}}
{{SPOUSE_FULL_NAME}}, then
{{/IF_JOINT}}
{{POUROVER_SUCCESSOR_REP}}

{{#IF_JOINT}}

Personal Representative for {{SPOUSE_FULL_NAME}}

{{CLIENT_FULL_NAME}}, then
{{POUROVER_SUCCESSOR_REP}}
{{/IF_JOINT}}`.trim();
};
