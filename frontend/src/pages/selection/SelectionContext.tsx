import React, { createContext, useReducer } from 'react';

import { Selections, LangSelections } from './interfaces.ts';


type Action = { type: string, payload?: any }


const InitialSelections: Selections = {
    skill: '',
    languages: {
        prefered: [],
        dismissed: [],
    } as LangSelections
}


function reducer(state: typeof InitialSelections, action: Action): Selections {
    switch(action.type){
        case 'language':
            return {
                ...state,
                languages: action.payload
            } as Selections
    
        case 'skill':
            return  {
                ...state,
                skill: action.payload
            } as Selections
    
        default:
            return state as Selections
    }
}

interface SelectionContextType {
    state: Selections;
    dispatch: React.Dispatch<Action>
}

const SelectionContext = createContext<SelectionContextType>({
    state: InitialSelections,
    dispatch: () => {},
});




const SelectionProvider: React.FC = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, InitialSelections);


    return (
    <SelectionContext.Provider value={ {state, dispatch} }>
        { children }
    </SelectionContext.Provider>
    )
}

export {SelectionContext, SelectionProvider}
