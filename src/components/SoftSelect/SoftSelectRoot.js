import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

export default function SoftSelectRoot({
  options,
  isRtl,
  placeholder,
  handleChange,
  error,
  size,
  disabled,
  ...rest
}) {
  const theme = useTheme();
  const { palette, boxShadows, functions, typography, borders } = theme;

  const { inputColors, grey, white, transparent } = palette;
  const { inputBoxShadow } = boxShadows;
  const { pxToRem, boxShadow } = functions;
  const { size: fontSize } = typography;
  const { borderRadius } = borders;

  const smallStyles = () => ({
    fontSize: fontSize.xs,
  });

  // styles for the input with size="large"
  const largeStyles = () => ({
    padding: pxToRem(12),
  });

  // styles for the input with error={true}
  const errorStyles = () => ({
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23fd5c70' viewBox='0 0 12 12'%3E%3Ccircle cx='6' cy='6' r='4.5'/%3E%3Cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3E%3Ccircle cx='6' cy='8.2' r='.6' fill='%23fd5c70' stroke='none'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,
    borderColor: inputColors.error,
  });

  // styles for the input with success={true}
  const successStyles = () => ({
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 8'%3E%3Cpath fill='%2366d432' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `right ${pxToRem(12)} center`,
    backgroundSize: `${pxToRem(16)} ${pxToRem(16)}`,
    borderColor: inputColors.success,
  });

  let focusedBorderColorValue = inputColors.borderColor.focus;
  if (error) {
    focusedBorderColorValue = inputColors.error;
  }

  return (
    <ReactSelect
      {...rest}
      options={options}
      menuPortalTarget={document.body}
      isRtl={isRtl}
      placeholder={placeholder}
      onChange={handleChange}
      // noOptionsMessage="No Data Found"
      styles={{
        control: (baseStyles, state) => {
          return {
            ...baseStyles,
            ...(size === "small" && smallStyles()),
            ...(size === "large" && largeStyles()),
            borderRadius: borderRadius.md,
            borderColor: state.isFocused ? focusedBorderColorValue : baseStyles.borderColor,
            ...(error && errorStyles()),
          };
        },
        menuPortal: (base) => ({ ...base, zIndex: 9999, ...(size === "small" && smallStyles()) }),
      }}
    />
  );
}

SoftSelectRoot.defaultProps = {
  options: [],
  isRtl: false,
  size: "small",
  icon: {
    component: false,
    direction: "none",
  },
  error: false,
  disabled: false,
  placeholder: "Select",
};

SoftSelectRoot.propTypes = {
  options: PropTypes.array,
  isRtl: PropTypes.bool,
  placeholder: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.bool,
  size: PropTypes.string,
  disabled: PropTypes.bool,
};
