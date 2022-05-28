import React from 'react';

export const ListContext = React.createContext();
export function ListProvider(props) {
    const [list, setList] = React.useState([]);
    return <ListContext.Provider value={[list,setList]}>{props.children}</ListContext.Provider>
}