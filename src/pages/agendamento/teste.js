import React, { useState } from "react";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div>
      <input type='checkbox' />
      {checked ? "Checked" : "Not checked"}
    </div>
  );
};

export default Checkbox;