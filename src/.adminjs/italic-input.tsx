import { BasePropertyComponentProps } from 'adminjs';
import React, { FC, useState } from 'react';

const ItalicInput: FC<BasePropertyComponentProps> = (props) => {
  const { record, onChange } = props;
  const [title, setDescription] = useState<string>(record!.params.title);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    setDescription(value);
    onChange('title', value);
  };

  return (
    <>
      <label>Title</label>
      <input
        id="title"
        name="title"
        style={{ fontStyle: 'italic' }}
        value={title}
        onChange={handleChange}
      />
    </>
  );
};

export default ItalicInput;
