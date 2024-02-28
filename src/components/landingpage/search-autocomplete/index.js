import React from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import './index.css';

const SearchAutocomplete = ({
    items,
    handleSelect,
    name
}) => {
    const handleOnSelect = (item) => {
        handleSelect(name, item)
    }
    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>{item?.name?.toUpperCase()}</span>
            </>
        )
    }

    return (
        <div className="App">
            <header className="App-header">
                <div style={{ width: '100%' }}>
                    <ReactSearchAutocomplete
                        items={items}
                        onSelect={handleOnSelect}
                        // autoFocus={false}
                        showClear={false}
                        showIcon={false}
                        placeholder='Select'
                        formatResult={formatResult}
                    />
                </div>
            </header>
        </div>
    )
}

export default SearchAutocomplete;