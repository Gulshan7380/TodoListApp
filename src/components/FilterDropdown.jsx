import React, {memo, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const FilterDropdown = ({placeholder, value, onChange, items, onFilter}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFilter = selectedValue => {
    setIsDropdownOpen(false);
    onChange(selectedValue);
    onFilter(selectedValue);
  };

  return (
    <View>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.dropdownselect}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Text style={styles.selectLeave}>{value || placeholder}</Text>
          {isDropdownOpen ? (
            <Image source={require('../assets/icons/arrowdown.png')} />
          ) : (
            <Image source={require('../assets/icons/arrowdown.png')} />
          )}
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={styles.dropDownArea}>
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.selectitems,
                  {
                    backgroundColor: value === item.value ? '#D98880' : '#fff',
                    overflow: 'hidden',
                  },
                ]}
                onPress={() => handleFilter(item.value)}>
                <Text
                  style={[
                    styles.name,
                    value === item.value && styles.selectedValue,
                  ]}>
                  {item.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownselect: {
    width: '62%',
    borderWidth: 1.5,
    borderColor: '#000',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  dropDownArea: {
    width: '62%',
    borderWidth: 1.5,
    borderColor: '#000',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,

    paddingTop: 5,
    paddingBottom: 5,
  },
  selectLeave: {
    fontSize: 17,
    color: '#000',
  },
  name: {
    fontSize: 16,
    color: '#000',
    alignSelf: 'center',
    margin: 5,
  },
  selectedValue: {
    color: '#fff',
  },
});

export default memo(FilterDropdown);
