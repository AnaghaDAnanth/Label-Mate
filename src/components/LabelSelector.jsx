import { useState } from 'react';

const LabelSelector = ({ labels, onSelectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (labelName) => {
    const updated = selectedLabels.includes(labelName)
      ? selectedLabels.filter(name => name !== labelName)
      : [...selectedLabels, labelName];

    setSelectedLabels(updated);
    onSelectionChange(updated);
  };

  const filteredLabels = labels.filter(label =>
    label.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-80">
      <button
        className="w-full bg-white border rounded px-4 py-2 shadow"
        onClick={toggleDropdown}
      >
        {selectedLabels.length > 0
          ? `${selectedLabels.length} label(s) selected`
          : 'Select labels'}
      </button>

      {isOpen && (
        <div className="absolute z-10 bg-white border mt-1 rounded shadow max-h-64 overflow-y-auto w-full">
          <input
            type="text"
            placeholder="Search labels..."
            className="w-full px-3 py-2 border-b outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="p-2">
            {filteredLabels.map(label => (
              <li key={label.id} className="flex items-center space-x-2 py-1">
                <input
                  type="checkbox"
                  checked={selectedLabels.includes(label.name)}
                  onChange={() => handleCheckboxChange(label.name)}
                />
                <span className="text-sm">{label.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LabelSelector;