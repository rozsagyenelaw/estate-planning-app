import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Button, Autocomplete } from '../../common';
import {
  getNameSuggestions,
  getAddressSuggestions,
  getPhoneSuggestions,
  addNameSuggestion,
  addAddressSuggestion,
  addPhoneSuggestion,
} from '../../../services/autocompleteService';

const PourOverWillSection = () => {
  const { formData, updateFormData } = useFormContext();
  const isJoint = formData.isJoint || formData.trustType === 'joint';

  const nameSuggestions = getNameSuggestions();
  const addressSuggestions = getAddressSuggestions();
  const phoneSuggestions = getPhoneSuggestions();

  const handleAddClientRep = () => {
    const updated = {
      pourOverWill: {
        ...formData.pourOverWill,
        client: {
          ...(formData.pourOverWill?.client || {}),
          personalRepresentatives: [
            ...(formData.pourOverWill?.client?.personalRepresentatives || []),
            { firstName: '', lastName: '', address: '', phone: '' }
          ]
        }
      }
    };
    updateFormData(updated);
  };

  const handleAddSpouseRep = () => {
    const updated = {
      pourOverWill: {
        ...formData.pourOverWill,
        spouse: {
          ...(formData.pourOverWill?.spouse || {}),
          personalRepresentatives: [
            ...(formData.pourOverWill?.spouse?.personalRepresentatives || []),
            { firstName: '', lastName: '', address: '', phone: '' }
          ]
        }
      }
    };
    updateFormData(updated);
  };

  const handleUpdateClientRep = (index, field, value) => {
    const reps = [...(formData.pourOverWill?.client?.personalRepresentatives || [])];
    reps[index] = { ...reps[index], [field]: value };
    updateFormData({
      pourOverWill: {
        ...formData.pourOverWill,
        client: { ...formData.pourOverWill?.client, personalRepresentatives: reps }
      }
    });

    // Add to autocomplete suggestions
    if ((field === 'firstName' || field === 'lastName') && value) addNameSuggestion(value);
    if (field === 'address' && value) addAddressSuggestion(value);
    if (field === 'phone' && value) addPhoneSuggestion(value);
  };

  const handleUpdateSpouseRep = (index, field, value) => {
    const reps = [...(formData.pourOverWill?.spouse?.personalRepresentatives || [])];
    reps[index] = { ...reps[index], [field]: value };
    updateFormData({
      pourOverWill: {
        ...formData.pourOverWill,
        spouse: { ...formData.pourOverWill?.spouse, personalRepresentatives: reps }
      }
    });

    // Add to autocomplete suggestions
    if ((field === 'firstName' || field === 'lastName') && value) addNameSuggestion(value);
    if (field === 'address' && value) addAddressSuggestion(value);
    if (field === 'phone' && value) addPhoneSuggestion(value);
  };

  const handleRemoveClientRep = (index) => {
    const reps = [...(formData.pourOverWill?.client?.personalRepresentatives || [])];
    reps.splice(index, 1);
    updateFormData({
      pourOverWill: {
        ...formData.pourOverWill,
        client: { ...formData.pourOverWill?.client, personalRepresentatives: reps }
      }
    });
  };

  const handleRemoveSpouseRep = (index) => {
    const reps = [...(formData.pourOverWill?.spouse?.personalRepresentatives || [])];
    reps.splice(index, 1);
    updateFormData({
      pourOverWill: {
        ...formData.pourOverWill,
        spouse: { ...formData.pourOverWill?.spouse, personalRepresentatives: reps }
      }
    });
  };

  const clientReps = formData.pourOverWill?.client?.personalRepresentatives || [];
  const spouseReps = formData.pourOverWill?.spouse?.personalRepresentatives || [];

  return (
    <>
      {/* Client Representatives */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {isJoint ? 'Client 1 ' : ''}Pour-Over Will - Personal Representatives
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Designate individuals to serve as personal representative (executor) of the pour-over will
            </p>
          </div>

          {clientReps.length > 1 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                How should personal representatives serve?
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="executorsServeType"
                    value="together"
                    checked={formData.executorsServeType === 'together'}
                    onChange={(e) => updateFormData({ executorsServeType: e.target.value })}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>Together (Co-Executors)</strong> - All representatives serve jointly and must agree on decisions
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="executorsServeType"
                    value="sequential"
                    checked={formData.executorsServeType === 'sequential'}
                    onChange={(e) => updateFormData({ executorsServeType: e.target.value })}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>In Order (Sequential)</strong> - Representatives serve one at a time in the order listed
                  </span>
                </label>
              </div>
            </div>
          )}

          {clientReps.length > 0 ? (
            <div className="space-y-4">
              {clientReps.map((rep, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">Representative {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveClientRep(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Autocomplete
                      label="First Name"
                      value={rep.firstName || ''}
                      onChange={(e) => handleUpdateClientRep(index, 'firstName', e.target.value)}
                      onSelect={(value) => handleUpdateClientRep(index, 'firstName', value)}
                      suggestions={nameSuggestions}
                    />
                    <Autocomplete
                      label="Last Name"
                      value={rep.lastName || ''}
                      onChange={(e) => handleUpdateClientRep(index, 'lastName', e.target.value)}
                      onSelect={(value) => handleUpdateClientRep(index, 'lastName', value)}
                      suggestions={nameSuggestions}
                    />
                  </div>

                  <Autocomplete
                    label="Address (Optional)"
                    value={rep.address || ''}
                    onChange={(e) => handleUpdateClientRep(index, 'address', e.target.value)}
                    onSelect={(value) => handleUpdateClientRep(index, 'address', value)}
                    suggestions={addressSuggestions}
                  />

                  <Autocomplete
                    label="Phone (Optional)"
                    value={rep.phone || ''}
                    onChange={(e) => handleUpdateClientRep(index, 'phone', e.target.value)}
                    onSelect={(value) => handleUpdateClientRep(index, 'phone', value)}
                    suggestions={phoneSuggestions}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">No personal representatives added yet</p>
            </div>
          )}

          <Button type="button" onClick={handleAddClientRep} variant="secondary">
            + Add Personal Representative
          </Button>
        </div>
      </Card>

      {/* Spouse Representatives (for Joint Trusts) */}
      {isJoint && (
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Client 2 (Spouse) Pour-Over Will - Personal Representatives
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Designate personal representatives for spouse's pour-over will
              </p>
            </div>

            {spouseReps.length > 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  How should personal representatives serve?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="executorsSpouseServeType"
                      value="together"
                      checked={formData.executorsSpouseServeType === 'together'}
                      onChange={(e) => updateFormData({ executorsSpouseServeType: e.target.value })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      <strong>Together (Co-Executors)</strong> - All representatives serve jointly and must agree on decisions
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="executorsSpouseServeType"
                      value="sequential"
                      checked={formData.executorsSpouseServeType === 'sequential'}
                      onChange={(e) => updateFormData({ executorsSpouseServeType: e.target.value })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      <strong>In Order (Sequential)</strong> - Representatives serve one at a time in the order listed
                    </span>
                  </label>
                </div>
              </div>
            )}

            {spouseReps.length > 0 ? (
              <div className="space-y-4">
                {spouseReps.map((rep, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-700">Representative {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpouseRep(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Autocomplete
                        label="First Name"
                        value={rep.firstName || ''}
                        onChange={(e) => handleUpdateSpouseRep(index, 'firstName', e.target.value)}
                        onSelect={(value) => handleUpdateSpouseRep(index, 'firstName', value)}
                        suggestions={nameSuggestions}
                      />
                      <Autocomplete
                        label="Last Name"
                        value={rep.lastName || ''}
                        onChange={(e) => handleUpdateSpouseRep(index, 'lastName', e.target.value)}
                        onSelect={(value) => handleUpdateSpouseRep(index, 'lastName', value)}
                        suggestions={nameSuggestions}
                      />
                    </div>

                    <Autocomplete
                      label="Address (Optional)"
                      value={rep.address || ''}
                      onChange={(e) => handleUpdateSpouseRep(index, 'address', e.target.value)}
                      onSelect={(value) => handleUpdateSpouseRep(index, 'address', value)}
                      suggestions={addressSuggestions}
                    />

                    <Autocomplete
                      label="Phone (Optional)"
                      value={rep.phone || ''}
                      onChange={(e) => handleUpdateSpouseRep(index, 'phone', e.target.value)}
                      onSelect={(value) => handleUpdateSpouseRep(index, 'phone', value)}
                      suggestions={phoneSuggestions}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">No personal representatives added yet</p>
              </div>
            )}

            <Button type="button" onClick={handleAddSpouseRep} variant="secondary">
              + Add Personal Representative
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default PourOverWillSection;
