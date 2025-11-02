import { useFormContext } from '../../../context/FormContext';
import { Card, Input, Select, Button, Autocomplete } from '../../common';
import { parseFullName, combineNameParts } from '../../../utils/nameParser';

const HealthcarePOASection = () => {
  const { formData, updateFormData } = useFormContext();
  const isJoint = formData.isJoint || formData.trustType === 'joint';

  const handleAddClientAgent = () => {
    const updated = {
      healthcarePOA: {
        ...formData.healthcarePOA,
        client: [
          ...(formData.healthcarePOA?.client || []),
          { firstName: '', middleName: '', lastName: '', address: '', phone: '', email: '' }
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
          { firstName: '', middleName: '', lastName: '', address: '', phone: '', email: '' }
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
  };

  // Store raw input without parsing - client agents
  const handleUpdateClientAgentFullNameInput = (index, fullName) => {
    const agents = [...(formData.healthcarePOA?.client || [])];
    agents[index] = {
      ...agents[index],
      fullName: fullName, // Store raw input
    };
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        client: agents
      }
    });
  };

  // Parse name when done typing (on blur or select) - client agents
  const parseClientAgentFullName = (index, fullName) => {
    const parsed = parseFullName(fullName);
    const agents = [...(formData.healthcarePOA?.client || [])];
    agents[index] = {
      ...agents[index],
      fullName: fullName,
      firstName: parsed.firstName,
      middleName: parsed.middleName,
      lastName: parsed.lastName,
    };
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        client: agents
      }
    });
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
  };

  // Store raw input without parsing - spouse agents
  const handleUpdateSpouseAgentFullNameInput = (index, fullName) => {
    const agents = [...(formData.healthcarePOA?.spouse || [])];
    agents[index] = {
      ...agents[index],
      fullName: fullName, // Store raw input
    };
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        spouse: agents
      }
    });
  };

  // Parse name when done typing (on blur or select) - spouse agents
  const parseSpouseAgentFullName = (index, fullName) => {
    const parsed = parseFullName(fullName);
    const agents = [...(formData.healthcarePOA?.spouse || [])];
    agents[index] = {
      ...agents[index],
      fullName: fullName,
      firstName: parsed.firstName,
      middleName: parsed.middleName,
      lastName: parsed.lastName,
    };
    updateFormData({
      healthcarePOA: {
        ...formData.healthcarePOA,
        spouse: agents
      }
    });
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
                Agent Grouping
              </label>
              <p className="text-xs text-gray-600 mb-3">
                Use the "Group Type" dropdown to create joint groups. Select "Joint with following agents" to start/continue a group. Select "Stop group here" to end the current group.
              </p>
              <div className="text-xs text-gray-500 space-y-1">
                <div><strong>Example 1:</strong> Agent 1 (Joint) + Agent 2 (Stop) = Agents 1 &amp; 2 serve jointly or the survivor of them, then Agent 3 (Stop) = Agent 3 serves alone</div>
                <div><strong>Example 2:</strong> Agent 1 (Joint) + Agent 2 (Joint) + Agent 3 (Stop) = All 3 serve jointly or the survivor of them</div>
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

                  <Autocomplete
                    label="Full Name"
                    value={agent.fullName !== undefined ? agent.fullName : combineNameParts(agent.firstName, agent.middleName, agent.lastName)}
                    onChange={(e) => handleUpdateClientAgentFullNameInput(index, e.target.value)}
                    onSelect={(value) => parseClientAgentFullName(index, value)}
                    onBlur={(e) => parseClientAgentFullName(index, e.target.value)}
                    placeholder="e.g., John Michael Smith"
                  />

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
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Autocomplete
                      label="Phone"
                      value={agent.phone || ''}
                      onChange={(e) => handleUpdateClientAgent(index, 'phone', e.target.value)}
                      onSelect={(value) => handleUpdateClientAgent(index, 'phone', value)}
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
                  Agent Grouping
                </label>
                <p className="text-xs text-gray-600 mb-3">
                  Use the "Group Type" dropdown to create joint groups. Select "Joint with following agents" to start/continue a group. Select "Stop group here" to end the current group.
                </p>
                <div className="text-xs text-gray-500 space-y-1">
                  <div><strong>Example 1:</strong> Agent 1 (Joint) + Agent 2 (Stop) = Agents 1 &amp; 2 serve jointly or the survivor of them, then Agent 3 (Stop) = Agent 3 serves alone</div>
                  <div><strong>Example 2:</strong> Agent 1 (Joint) + Agent 2 (Joint) + Agent 3 (Stop) = All 3 serve jointly or the survivor of them</div>
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

                    <Autocomplete
                      label="Full Name"
                      value={agent.fullName !== undefined ? agent.fullName : combineNameParts(agent.firstName, agent.middleName, agent.lastName)}
                      onChange={(e) => handleUpdateSpouseAgentFullNameInput(index, e.target.value)}
                      onSelect={(value) => parseSpouseAgentFullName(index, value)}
                      onBlur={(e) => parseSpouseAgentFullName(index, e.target.value)}
                      placeholder="e.g., Jane Marie Johnson"
                    />

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
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <Autocomplete
                        label="Phone"
                        value={agent.phone || ''}
                        onChange={(e) => handleUpdateSpouseAgent(index, 'phone', e.target.value)}
                        onSelect={(value) => handleUpdateSpouseAgent(index, 'phone', value)}
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
