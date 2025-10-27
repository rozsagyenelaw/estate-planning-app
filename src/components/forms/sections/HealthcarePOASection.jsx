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

const HealthcarePOASection = () => {
  const { formData, updateFormData } = useFormContext();
  const isJoint = formData.isJoint || formData.trustType === 'joint';

  const nameSuggestions = getNameSuggestions();
  const addressSuggestions = getAddressSuggestions();
  const phoneSuggestions = getPhoneSuggestions();

  const handleAddClientAgent = () => {
    const updated = {
      healthcarePOA: {
        ...formData.healthcarePOA,
        client: [
          ...(formData.healthcarePOA?.client || []),
          { firstName: '', lastName: '', address: '', phone: '', email: '' }
        ]
      }
    };
    updateFormData(updated);
  };

  const handleAddSpouseAgent = () => {
    const updated = {
      healthcarePOA: {
        ...formData.healthcarePOA,
        spouse: [
          ...(formData.healthcarePOA?.spouse || []),
          { firstName: '', lastName: '', address: '', phone: '', email: '' }
        ]
      }
    };
    updateFormData(updated);
  };

  const handleUpdateClientAgent = (index, field, value) => {
    const agents = [...(formData.healthcarePOA?.client || [])];
    agents[index] = { ...agents[index], [field]: value };
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        client: agents
      }
    });

    // Add to autocomplete suggestions
    if ((field === 'firstName' || field === 'lastName') && value) addNameSuggestion(value);
    if (field === 'address' && value) addAddressSuggestion(value);
    if (field === 'phone' && value) addPhoneSuggestion(value);
  };

  const handleUpdateSpouseAgent = (index, field, value) => {
    const agents = [...(formData.healthcarePOA?.spouse || [])];
    agents[index] = { ...agents[index], [field]: value };
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        spouse: agents
      }
    });

    // Add to autocomplete suggestions
    if ((field === 'firstName' || field === 'lastName') && value) addNameSuggestion(value);
    if (field === 'address' && value) addAddressSuggestion(value);
    if (field === 'phone' && value) addPhoneSuggestion(value);
  };

  const handleRemoveClientAgent = (index) => {
    const agents = [...(formData.healthcarePOA?.client || [])];
    agents.splice(index, 1);
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        client: agents
      }
    });
  };

  const handleRemoveSpouseAgent = (index) => {
    const agents = [...(formData.healthcarePOA?.spouse || [])];
    agents.splice(index, 1);
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        spouse: agents
      }
    });
  };

  const clientAgents = formData.healthcarePOA?.client || [];
  const spouseAgents = formData.healthcarePOA?.spouse || [];

  return (
    <>
      {/* Client Agents */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {isJoint ? 'Client 1 ' : ''}Healthcare Power of Attorney - Agents
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Designate agents for healthcare decisions (successor agents serve if primary is unable)
            </p>
          </div>

          {clientAgents.length > 1 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                How should healthcare agents serve?
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="healthcarePOAClientServeType"
                    value="together"
                    checked={formData.healthcarePOAClientServeType === 'together'}
                    onChange={(e) => updateFormData({ healthcarePOAClientServeType: e.target.value })}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>Together (Co-Agents)</strong> - All agents serve jointly and must agree on decisions
                  </span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="healthcarePOAClientServeType"
                    value="sequential"
                    checked={formData.healthcarePOAClientServeType === 'sequential'}
                    onChange={(e) => updateFormData({ healthcarePOAClientServeType: e.target.value })}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    <strong>In Order (Sequential)</strong> - Agents serve one at a time in the order listed
                  </span>
                </label>
              </div>
            </div>
          )}

          {clientAgents.length > 0 ? (
            <div className="space-y-4">
              {clientAgents.map((agent, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-gray-700">
                      Agent {index + 1} {index === 0 ? '(Primary)' : '(Successor)'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveClientAgent(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Autocomplete
                      label="First Name"
                      value={agent.firstName || ''}
                      onChange={(e) => handleUpdateClientAgent(index, 'firstName', e.target.value)}
                      onSelect={(value) => handleUpdateClientAgent(index, 'firstName', value)}
                      suggestions={nameSuggestions}
                    />
                    <Autocomplete
                      label="Last Name"
                      value={agent.lastName || ''}
                      onChange={(e) => handleUpdateClientAgent(index, 'lastName', e.target.value)}
                      onSelect={(value) => handleUpdateClientAgent(index, 'lastName', value)}
                      suggestions={nameSuggestions}
                    />
                  </div>

                  <Autocomplete
                    label="Address (Optional)"
                    value={agent.address || ''}
                    onChange={(e) => handleUpdateClientAgent(index, 'address', e.target.value)}
                    onSelect={(value) => handleUpdateClientAgent(index, 'address', value)}
                    suggestions={addressSuggestions}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Autocomplete
                      label="Phone"
                      value={agent.phone || ''}
                      onChange={(e) => handleUpdateClientAgent(index, 'phone', e.target.value)}
                      onSelect={(value) => handleUpdateClientAgent(index, 'phone', value)}
                      suggestions={phoneSuggestions}
                    />
                    <Input
                      label="Email"
                      type="email"
                      value={agent.email || ''}
                      onChange={(e) => handleUpdateClientAgent(index, 'email', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-sm">No agents added yet</p>
            </div>
          )}

          <Button type="button" onClick={handleAddClientAgent} variant="secondary">
            + Add Healthcare Agent
          </Button>
        </div>
      </Card>

      {/* Spouse Agents (for Joint Trusts) */}
      {isJoint && (
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Client 2 (Spouse) Healthcare Power of Attorney - Agents
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Designate agents for spouse's healthcare decisions
              </p>
            </div>

            {spouseAgents.length > 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  How should healthcare agents serve?
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="healthcarePOASpouseServeType"
                      value="together"
                      checked={formData.healthcarePOASpouseServeType === 'together'}
                      onChange={(e) => updateFormData({ healthcarePOASpouseServeType: e.target.value })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      <strong>Together (Co-Agents)</strong> - All agents serve jointly and must agree on decisions
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="healthcarePOASpouseServeType"
                      value="sequential"
                      checked={formData.healthcarePOASpouseServeType === 'sequential'}
                      onChange={(e) => updateFormData({ healthcarePOASpouseServeType: e.target.value })}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">
                      <strong>In Order (Sequential)</strong> - Agents serve one at a time in the order listed
                    </span>
                  </label>
                </div>
              </div>
            )}

            {spouseAgents.length > 0 ? (
              <div className="space-y-4">
                {spouseAgents.map((agent, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium text-gray-700">
                        Agent {index + 1} {index === 0 ? '(Primary)' : '(Successor)'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpouseAgent(index)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Autocomplete
                        label="First Name"
                        value={agent.firstName || ''}
                        onChange={(e) => handleUpdateSpouseAgent(index, 'firstName', e.target.value)}
                        onSelect={(value) => handleUpdateSpouseAgent(index, 'firstName', value)}
                        suggestions={nameSuggestions}
                      />
                      <Autocomplete
                        label="Last Name"
                        value={agent.lastName || ''}
                        onChange={(e) => handleUpdateSpouseAgent(index, 'lastName', e.target.value)}
                        onSelect={(value) => handleUpdateSpouseAgent(index, 'lastName', value)}
                        suggestions={nameSuggestions}
                      />
                    </div>

                    <Autocomplete
                      label="Address (Optional)"
                      value={agent.address || ''}
                      onChange={(e) => handleUpdateSpouseAgent(index, 'address', e.target.value)}
                      onSelect={(value) => handleUpdateSpouseAgent(index, 'address', value)}
                      suggestions={addressSuggestions}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Autocomplete
                        label="Phone"
                        value={agent.phone || ''}
                        onChange={(e) => handleUpdateSpouseAgent(index, 'phone', e.target.value)}
                        onSelect={(value) => handleUpdateSpouseAgent(index, 'phone', value)}
                        suggestions={phoneSuggestions}
                      />
                      <Input
                        label="Email"
                        type="email"
                        value={agent.email || ''}
                        onChange={(e) => handleUpdateSpouseAgent(index, 'email', e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500 text-sm">No agents added yet</p>
              </div>
            )}

            <Button type="button" onClick={handleAddSpouseAgent} variant="secondary">
              + Add Healthcare Agent
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default HealthcarePOASection;
