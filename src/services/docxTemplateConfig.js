/**
 * DOCX Template Configuration
 * Maps trust types to their corresponding DOCX templates
 */

export const DOCX_TEMPLATES = {
  // Living Trust Templates (Trust document only)
  SINGLE_LIVING_TRUST: {
    name: 'Single Living Trust',
    path: '/templates/single_living_trust_template.docx',
    description: 'Single revocable living trust document only'
  },
  JOINT_LIVING_TRUST: {
    name: 'Joint Living Trust',
    path: '/templates/joint_living_trust_template.docx',
    description: 'Joint revocable living trust document only'
  },

  // Irrevocable Trust Templates (Trust document only)
  SINGLE_IRREVOCABLE_TRUST: {
    name: 'Single Irrevocable Trust',
    path: '/templates/single_irrevocable_trust_template.docx',
    description: 'Single irrevocable trust document only'
  },
  JOINT_IRREVOCABLE_TRUST: {
    name: 'Joint Irrevocable Trust',
    path: '/templates/joint_irrevocable_trust_template.docx',
    description: 'Joint irrevocable trust document only'
  },

  // Complete Estate Planning Package Templates (All documents)
  SINGLE_ESTATE_PLAN: {
    name: 'Single Estate Planning Package',
    path: '/templates/single_estate_planning_template.docx',
    description: 'Complete estate planning portfolio for single person'
  },
  JOINT_ESTATE_PLAN: {
    name: 'Joint Estate Planning Package',
    path: '/templates/joint_estate_planning_template.docx',
    description: 'Complete estate planning portfolio for married couple'
  }
};

/**
 * Get the appropriate DOCX template based on form data
 * @param {Object} formData - Form data
 * @param {boolean} isCompletePlan - True for complete package, false for living trust only
 * @returns {Object} Template configuration
 */
export const getDOCXTemplateForFormData = (formData, isCompletePlan = false) => {
  const isJoint = formData.isJoint || formData.trustType === 'joint' || formData.trustType === 'joint_irrevocable';
  const isIrrevocable = formData.isIrrevocable || formData.trustType === 'single_irrevocable' || formData.trustType === 'joint_irrevocable';

  if (isCompletePlan) {
    // Complete Estate Planning Package
    return isJoint ? DOCX_TEMPLATES.JOINT_ESTATE_PLAN : DOCX_TEMPLATES.SINGLE_ESTATE_PLAN;
  } else {
    // Living Trust Only
    if (isIrrevocable) {
      return isJoint ? DOCX_TEMPLATES.JOINT_IRREVOCABLE_TRUST : DOCX_TEMPLATES.SINGLE_IRREVOCABLE_TRUST;
    } else {
      return isJoint ? DOCX_TEMPLATES.JOINT_LIVING_TRUST : DOCX_TEMPLATES.SINGLE_LIVING_TRUST;
    }
  }
};

/**
 * Get DOCX template path for form data
 * @param {Object} formData - Form data
 * @param {boolean} isCompletePlan - True for complete package, false for living trust only
 * @returns {string} Template path
 */
export const getDOCXTemplatePath = (formData, isCompletePlan = false) => {
  const template = getDOCXTemplateForFormData(formData, isCompletePlan);
  return template.path;
};

/**
 * Get DOCX template name for form data
 * @param {Object} formData - Form data
 * @param {boolean} isCompletePlan - True for complete package, false for living trust only
 * @returns {string} Template name
 */
export const getDOCXTemplateName = (formData, isCompletePlan = false) => {
  const template = getDOCXTemplateForFormData(formData, isCompletePlan);
  return template.name;
};
