import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Select, Button, Autocomplete } from '../../common';
import {
  getNameSuggestions,
  getAddressSuggestions,
  getPhoneSuggestions,
  addNameSuggestion,
  addAddressSuggestion,
  addPhoneSuggestion,
} from '../../../services/autocompleteService';

const DurablePOASection = () => {
  const { formData, updateFormData } = useFormContext();
  const isJoint = formData.isJoint || formData.trustType === 'joint';

  const nameSuggestions = getNameSuggestions();
  const addressSuggestions = getAddressSuggestions();
  const phoneSuggestions = getPhoneSuggestions();

  const handleAddClientAgent = () => {
    const updated = {
      durablePOA: {
        ...formData.durablePOA,
        client: [
          ...(formData.durablePOA?.client || []),
          { firstName: '', lastName: '', sex: '', address: '', phone: '', email: '' }
        ]
      }
    };
    updateFormData(updated);
  };

  const handleAddSpouseAgent = () => {
    const updated = {
      durablePOA: {
        ...formData.durablePOA,
        spouse: [
          ...(formData.durablePOA?.spouse || []),
          { firstName: '', lastName: '', sex: '', address: '', phone: '', email: '' }
        ]
      }
    };
    updateFormData(updated);
  };

  const handleUpdateClientAgent = (index, field, value) => {
    const agents = [...(formData.durablePOA?.client || [])];
    agents[index] = { ...agents[index], [field]: value };
    updateFormData({
      durablePOA: {
        ...formData.durablePOA,
        client: agents
      }
    });

    // Add to autocomplete suggestions
    if ((field === 'firstName' || field === 'lastName') && value) addNameSuggestion(value);
    if (field === 'address' && value) addAddressSuggestion(value);
    if (field === 'phone' && value) addPhoneSuggestion(value);
  };

  const handleUpdateSpouseAgent = (index, field, value) => {
    const agents = [...(formData.durablePOA?.spouse || [])];
    agents[index] = { ...agents[index], [field]: value };
    updateFormData({
      durablePOA: {
        ...formData.durablePOA,
        spouse: agents
      }
    });

    // Add to autocomplete suggestions
    if ((field === 'firstName' || field === 'lastName') && value) addNameSuggestion(value);
    if (field === 'address' && value) addAddressSuggestion(value);
    if (field === 'phone' && value) addPhoneSuggestion(value);
  };

  const handleRemoveClientAgent = (index) => {
    const agents = [...(formData.durablePOA?.client || [])];
    agents.splice(index, 1);
    updateFormData({
      durablePOA: {
        ...formData.durablePOA,
        client: agents
      }
    });
  };

  const handleRemoveSpouseAgent = (index) => {
    const agents = [...(formData.durablePOA?.spouse || [])];
    agents.splice(index, 1);
    updateFormData({
      durablePOA: {
        ...formData.durablePOA,
        spouse: agents
      }
    });
  };

  const clientAgents = formData.durablePOA?.client || [];
  const spouseAgents = formData.durablePOA?.spouse || [];

  return (
    <>
      {/* Client Agents */}
      <Card>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {isJoint ? 'Client 1 ' : ''}Durable Power of Attorney - Agents
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Designate agents for financial and legal matters (successor agents serve if primary is unable)
            </p>
          </div>

          {clientAgents.length > 1 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <label className="block text-sm font-semibold text-gray-800 mb-3">
                Agent Grouping
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Use the "Group Type" dropdown to create joint groups. Select "Joint with following agents" to start/continue a group. Select "Stop group here" to end the current group.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div><strong>Example 1:</strong> Agent 1 (Joint) + Agent 2 (Stop) = Agents 1 &amp; 2 serve jointly, then Agent 3 (Stop) = Agent 3 serves alone</div>
                <div><strong>Example 2:</strong> Agent 1 (Joint) + Agent 2 (Joint) + Agent 3 (Stop) = All 3 serve jointly together</div>
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

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                    <Select
                      label="Sex"
                      value={agent.sex || ''}
                      onChange={(e) => handleUpdateClientAgent(index, 'sex', e.target.value)}
                      options={[
                        { value: '', label: 'Select...' },
                        { value: 'Male', label: 'Male' },
                        { value: 'Female', label: 'Female' }
                      ]}
                    />
                  </div>

                  {clientAgents.length > 1 && (
                    <Select
                      label="Group Type"
                      value={agent.groupType || 'individual'}
                      onChange={(e) => handleUpdateClientAgent(index, 'groupType', e.target.value)}
                      options={[
                        {
                          value: 'individual',
                          label: index === clientAgents.length - 1
                            ? 'Last agent (automatically ends group)'
                            : 'Stop group here (end joint group or serve alone)'
                        },
                        {
                          value: 'joint',
                          label: index === clientAgents.length - 1
                            ? 'Last agent (automatically ends group)'
                            : 'Joint with following agents'
                        }
                      ]}
                      disabled={index === clientAgents.length - 1}
                    />
                  )}

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
            + Add Agent
          </Button>
        </div>
      </Card>

      {/* Spouse Agents (for Joint Trusts) */}
      {isJoint && (
        <Card>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Client 2 (Spouse) Durable Power of Attorney - Agents
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Designate agents for spouse's financial and legal matters
              </p>
            </div>

            {spouseAgents.length > 1 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                  Agent Grouping
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Use the "Group Type" dropdown to create joint groups. Select "Joint with following agents" to start/continue a group. Select "Stop group here" to end the current group.
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div><strong>Example 1:</strong> Agent 1 (Joint) + Agent 2 (Stop) = Agents 1 &amp; 2 serve jointly, then Agent 3 (Stop) = Agent 3 serves alone</div>
                  <div><strong>Example 2:</strong> Agent 1 (Joint) + Agent 2 (Joint) + Agent 3 (Stop) = All 3 serve jointly together</div>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                      <Select
                        label="Sex"
                        value={agent.sex || ''}
                        onChange={(e) => handleUpdateSpouseAgent(index, 'sex', e.target.value)}
                        options={[
                          { value: '', label: 'Select...' },
                          { value: 'Male', label: 'Male' },
                          { value: 'Female', label: 'Female' }
                        ]}
                      />
                    </div>

                    {spouseAgents.length > 1 && (
                      <Select
                        label="Group Type"
                        value={agent.groupType || 'individual'}
                        onChange={(e) => handleUpdateSpouseAgent(index, 'groupType', e.target.value)}
                        options={[
                          {
                            value: 'individual',
                            label: index === spouseAgents.length - 1
                              ? 'Last agent (automatically ends group)'
                              : 'Stop group here (end joint group or serve alone)'
                          },
                          {
                            value: 'joint',
                            label: index === spouseAgents.length - 1
                              ? 'Last agent (automatically ends group)'
                              : 'Joint with following agents'
                          }
                        ]}
                        disabled={index === spouseAgents.length - 1}
                      />
                    )}

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
              + Add Agent
            </Button>
          </div>
        </Card>
      )}
    </>
  );
};

export default DurablePOASection;
