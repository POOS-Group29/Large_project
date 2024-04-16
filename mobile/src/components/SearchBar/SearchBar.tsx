import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

// Debounce function
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const SearchBar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    useEffect(() => {
        if (onSearch) {
            onSearch(debouncedSearchQuery);
        }
    }, [debouncedSearchQuery, onSearch]);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search..."
                clearButtonMode="while-editing"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
    },
    input: {
        fontSize: 16
    }
});

export default SearchBar;
