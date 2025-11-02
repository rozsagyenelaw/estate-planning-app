import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Button, Autocomplete } from '../../common';
import { parseFullName, combineNameParts } from '../../../utils/nameParser';

const GeneralNeedsTrustSection = () => {
  const { formData, addArrayItem, updateArrayItem, removeArrayItem } = useFormContext();

  // Generate suggestions from children
  const childrenSuggestions = (formData.children || []).map(child =>
    combineNameParts(child.firstName, child.middleName, child.lastName)
  ).filter(name => name.length > 0);

  const handleAdd = () => {
    addArrayItem('generalNeedsTrusts', {
      beneficiaryName: '',
      beneficiaryFirstName: '',
      beneficiaryMiddleName: '',
      beneficiaryLastName: '',
      distributions: [],
      specialInstructions: '',
    });
  };

  const handleUpdate = (index, field, value) => {
    updateArrayItem('generalNeedsTrusts', index, { [field]: value });
  };

  // Store raw input without parsing
  const handleUpdateBeneficiaryNameInput = (index, fullName) => {
    updateArrayItem('generalNeedsTrusts', index, {
      beneficiaryName: fullName, // Store raw input
    });
  };

  // Parse name when done typing (on blur or select)
  const parseBeneficiaryName = (index, fullName) => {
    const parsed = parseFullName(fullName);
    updateArrayItem('generalNeedsTrusts', index, {
      beneficiaryName: fullName,
      beneficiaryFirstName: parsed.firstName,
      beneficiaryMiddleName: parsed.middleName,
      beneficiaryLastName: parsed.lastName,
    });
  };

  const handleRemove = (index) => {
    removeArrayItem('generalNeedsTrusts', index);
  };

  const handleAddDistribution = (trustIndex) => {
    const trust = formData.generalNeedsTrusts[trustIndex];
    const currentDistributions = trust.distributions || [];

    const updatedDistributions = [
      ...currentDistributions,
      { age: '', percentage: '', description: '' }
    ];

    const updatedTrust = {
      ...trust,
      distributions: updatedDistributions
    };
    updateArrayItem('generalNeedsTrusts', trustIndex, updatedTrust);
  };

  const handleUpdateDistribution = (trustIndex, distIndex, field, value) => {
    const trust = formData.generalNeedsTrusts[trustIndex];
    const currentDistributions = trust.distributions || [];
    const updatedDistributions = [...currentDistributions];
    updatedDistributions[distIndex] = {
      ...updatedDistributions[distIndex],
      [field]: value
    };

    const updatedTrust = {
      ...trust,
      distributions: updatedDistributions
    };
    updateArrayItem('generalNeedsTrusts', trustIndex, updatedTrust);
  };

  const handleRemoveDistribution = (trustIndex, distIndex) => {
    const trust = formData.generalNeedsTrusts[trustIndex];
    const currentDistributions = trust.distributions || [];
    const updatedDistributions = currentDistributions.filter((_, idx) => idx !== distIndex);

    const updatedTrust = {
      ...trust,
      distributions: updatedDistributions
    };
    updateArrayItem('generalNeedsTrusts', trustIndex, updatedTrust);
  };

  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">General Needs Trust</h3>
          <p className="text-sm text-gray-600 mt-1">
            Create special trusts for beneficiaries who need managed distributions over time (minors, special needs, etc.)
          </p>
        </div>

        {formData.generalNeedsTrusts && formData.generalNeedsTrusts.length > 0 ? (
          <div className="space-y-4">
            {formData.generalNeedsTrusts.map((trust, trustIndex) => (
              <div key={trustIndex} className="p-4 border-2 border-gray-300 rounded-lg space-y-4 bg-white">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-gray-800">Trust {trustIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => handleRemove(trustIndex)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove Trust
                  </button>
                </div>

                <Autocomplete
                  label="Beneficiary Full Name"
                  value={trust.beneficiaryName !== undefined ? trust.beneficiaryName : combineNameParts(trust.beneficiaryFirstName, trust.beneficiaryMiddleName, trust.beneficiaryLastName)}
                  onChange={(e) => handleUpdateBeneficiaryNameInput(trustIndex, e.target.value)}
                  onSelect={(value) => parseBeneficiaryName(trustIndex, value)}
                  onBlur={(e) => parseBeneficiaryName(trustIndex, e.target.value)}
                  suggestions={childrenSuggestions}
                  placeholder="e.g., John Michael Smith"
                  required
                />

                {/* Multiple Distributions */}
                <div className="border-t pt-4">
                  <h5 className="font-medium text-gray-700 mb-3">Age-Based Distributions</h5>

                  <div className="space-y-3">
                    {(trust.distributions || []).map((dist, distIndex) => (
                      <div key={distIndex} className="p-3 bg-gray-50 border border-gray-200 rounded space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600">Distribution {distIndex + 1}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveDistribution(trustIndex, distIndex)}
                            className="text-red-600 hover:text-red-800 text-xs font-medium"
                          >
                            Remove
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                            <input
                              type="number"
                              value={dist.age || ''}
                              onChange={(e) => handleUpdateDistribution(trustIndex, distIndex, 'age', e.target.value)}
                              placeholder="25"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                            <input
                              type="number"
                              value={dist.percentage || ''}
                              onChange={(e) => handleUpdateDistribution(trustIndex, distIndex, 'percentage', e.target.value)}
                              placeholder="33"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                            <input
                              type="text"
                              value={dist.description || ''}
                              onChange={(e) => handleUpdateDistribution(trustIndex, distIndex, 'description', e.target.value)}
                              placeholder="Education expenses"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddDistribution(trustIndex);
                    }}
                    className="mt-3 w-full px-4 py-3 text-sm font-medium text-blue-600 bg-white border-2 border-blue-600 border-dashed rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-blue-100 transition-colors"
                  >
                    + Add Distribution at Specific Age
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={trust.specialInstructions || ''}
                    onChange={(e) => handleUpdate(trustIndex, 'specialInstructions', e.target.value)}
                    placeholder="Enter any special conditions, purposes, or instructions for the trustee (e.g., 'May distribute for education at any time')"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-sm">No general needs trusts added yet</p>
          </div>
        )}

        <Button type="button" onClick={handleAdd} variant="secondary">
          + Add General Needs Trust
        </Button>
      </div>
    </Card>
  );
};

export default GeneralNeedsTrustSection;
