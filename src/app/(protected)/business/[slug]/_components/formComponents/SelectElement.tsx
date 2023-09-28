import React from "react";

const SelectElement = ({
  name,
  value,
  array,
  handleChange,
}: {
  name: string;
  value: string;
  array: { name?: string; label?: string; value?: string }[];
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}) => {
  return (
    <div className="flex flex-col" style={{ margin: 0 }}>
      <label htmlFor={name} className="capitalize">
        {name}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        className="border border-neutral-400 hover:border-black focus:outline-none p-2 mt-2 capitalize text-center"
      >
        <option hidden>{value || `--${name}--`}</option>
        {array.map((e, i) => (
          <option value={e.value ? e.label : e.name} key={i}>
            {e?.label || e.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectElement;
