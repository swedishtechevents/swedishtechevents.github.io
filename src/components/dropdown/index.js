import React from 'react';
import Select from 'react-select';

export default ({ label, onChange, options, placeholder, value }) => {
  const selected = options.filter(o => o.value === value).pop();
  return (
    <Select
      aria-label={label}
      placeholder={placeholder}
      value={selected}
      onChange={selected => onChange(selected ? selected.value : null)}
      isSearchable={true}
      isClearable={true}
      options={options}
    />
  )
};
