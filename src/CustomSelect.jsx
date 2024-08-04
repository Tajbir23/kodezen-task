import { useState } from 'react';
import PropTypes from 'prop-types';
import './CustomSelect.css';

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  options,
  value,
  placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || (isMulti ? [] : null));
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleClear = (option) => {
    if (isMulti) {
      const newValue = selectedValue.filter((val) => val !== option);
      setSelectedValue(newValue);
      onChangeHandler(newValue);
    } else {
      setSelectedValue(null);
      onChangeHandler(null);
    }
  };

  const handleSelect = (option) => {
    if (isMulti) {
      const newValue = selectedValue.includes(option)
        ? selectedValue.filter((val) => val !== option)
        : [...selectedValue, option];
      setSelectedValue(newValue);
      onChangeHandler(newValue);
    } else {
      setSelectedValue(option);
      onChangeHandler(option);
    }
    setMenuOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearchHandler(e.target.value);
  };

  const filteredOptions = options.filter((option) => {
    if (isGrouped && option.options) {
      return option.options.some((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return option.label.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className={`kzui-select ${isDisabled ? 'kzui-select--disabled' : ''}`}>
      <div
        className="kzui-select__control"
        onClick={() => {
          if (!isDisabled) {
            setMenuOpen(!menuOpen);
            onMenuOpen();
          }
        }}
      >
        <div className="kzui-select__value">
          {isMulti ? (
            selectedValue.length > 0 ? (
              selectedValue.map((val) => (
                <span key={val.value} className="kzui-select__multi-value">
                  {val.label}
                  {isClearable && (
                    <span
                      className="kzui-select__clear"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClear(val);
                      }}
                    >
                      &times;
                    </span>
                  )}
                </span>
              ))
            ) : (
              <span className="kzui-select__placeholder">{placeholder}</span>
            )
          ) : (
            <span className="kzui-select__single-value">
              {selectedValue?.label || <span className="kzui-select__placeholder">{placeholder}</span>}
              {isClearable && selectedValue && (
                <span
                  className="kzui-select__clear"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear(selectedValue);
                  }}
                >
                  &times;
                </span>
              )}
            </span>
          )}
        </div>
        <div className="kzui-select__indicator">&#9662;</div>
      </div>
      {menuOpen && (
        <div className="kzui-select__menu">
          {isSearchable && (
            <input
              type="text"
              className="kzui-select__search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
            />
          )}
          {filteredOptions.map((option) => {
            if (isGrouped && option.options) {
              return (
                <div key={option.label} className="kzui-select__group">
                  <div className="kzui-select__group-label">{option.label}</div>
                  {option.options.map((item) => (
                    <div
                      key={item.value}
                      className={`kzui-select__option ${
                        isMulti
                          ? selectedValue.includes(item)
                            ? 'kzui-select__option--selected'
                            : ''
                          : selectedValue === item
                          ? 'kzui-select__option--selected'
                          : ''
                      }`}
                      onClick={() => handleSelect(item)}
                    >
                      {item.label}
                    </div>
                  ))}
                </div>
              );
            }
            return (
              <div
                key={option.value}
                className={`kzui-select__option ${
                  isMulti
                    ? selectedValue.includes(option)
                      ? 'kzui-select__option--selected'
                      : ''
                    : selectedValue === option
                    ? 'kzui-select__option--selected'
                    : ''
                }`}
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

CustomSelect.propTypes = {
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  options: PropTypes.array.isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.string,
  isGrouped: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChangeHandler: PropTypes.func.isRequired,
  onMenuOpen: PropTypes.func.isRequired,
  onSearchHandler: PropTypes.func.isRequired,
};

CustomSelect.defaultProps = {
  isClearable: false,
  isSearchable: false,
  isDisabled: false,
  value: null,
  placeholder: 'Select...',
  isGrouped: false,
  isMulti: false,
};

export default CustomSelect;
