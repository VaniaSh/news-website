import React, { createContext, useState } from 'react';

interface DataTypeContext {
    method: string;
    updateString: (newString: string) => void;
}

export const StringContext = createContext<DataTypeContext>({
    method: '',
    updateString: () => {},
});

interface StringProviderProps {
    children: React.ReactNode;
}

export const StringProvider: React.FC<StringProviderProps> = ({ children }) => {
    const [method, updateMethod] = useState('application/json');

   const updateString = (newString: string) => {
        updateMethod(newString);
    };

    const contextValue: DataTypeContext = {
        method,
        updateString,
    };

    return (
        <StringContext.Provider value={contextValue}>
            {children}
        </StringContext.Provider>
    );
};
