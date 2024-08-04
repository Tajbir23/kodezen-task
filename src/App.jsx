import { useState } from 'react';
import CustomSelect from './CustomSelect';

const options = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
  {
    label: 'Desserts',
    options: [
      { value: 'cake', label: 'Cake' },
      { value: 'ice_cream', label: 'Ice Cream' },
      { value: 'cookies', label: 'Cookies' },
    ],
  },
  {
    label: 'Beverages',
    options: [
      { value: 'coffee', label: 'Coffee' },
      { value: 'tea', label: 'Tea' },
      { value: 'juice', label: 'Juice' },
    ],
  },
];


const App = () => {
  const [value, setValue] = useState([]);

  const handleChange = (selectedOptions) => {
    setValue(selectedOptions);
  };

  const handleMenuOpen = () => {
    console.log('Menu opened');
  };

  const handleSearch = (searchTerm) => {
    console.log('Searching:', searchTerm);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Custom Select Component</h1>
      <CustomSelect
        isClearable
        isSearchable
        isMulti
        isGrouped
        options={options}
        value={value}
        placeholder="Select..."
        onChangeHandler={handleChange}
        onMenuOpen={handleMenuOpen}
        onSearchHandler={handleSearch}
      />
    </div>
  );
};

export default App;
