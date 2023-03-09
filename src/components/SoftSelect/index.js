import SoftSelectRoot from "components/SoftSelect/SoftSelectRoot";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import { useSoftUIController } from "context";

const SoftSelect = forwardRef(
  ({ options, placeholder, handleChange, error, size, disabled, ...rest }, ref) => {
    const [controller] = useSoftUIController();
    const { direction } = controller;
    const isRtl = direction === "rtl" ?? false;

    return (
      <SoftSelectRoot
        {...rest}
        ref={ref}
        options={options}
        isRtl={isRtl}
        placeholder={placeholder}
        handleChange={handleChange}
        error={error}
        size={size}
        disabled={disabled}
      />
    );
  }
);

// Typechecking props for the SoftSelect
SoftSelect.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.bool,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};

export default SoftSelect;
