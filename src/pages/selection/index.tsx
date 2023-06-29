import { React, useReducer } from 'react';
import { ProjectChooser } from './components/';
import { ExpSelection } from './components/';
import { LanguageSelection } from './components/';


const LANGUAGES = ["PHP","Python","JS", "TS", "C", "C++", "C#", "GO", "Rust", "Lisp", "OCamel", "Cobol", "Lua", "Julia"].sort();


//todo: refactor as context provider
// https://stackoverflow.com/questions/55055793/react-usereducer-hook-fires-twice-how-to-pass-props-to-reducer

const INITAL_SELECTIONS = {
    skill: '',
    languages: {
        prefered: [],
        dismissed: [],
    }
}

export function SelectionWrapper() {
    
    const reducer = (state, action) =>  {
        console.log(action)
        if (action.type === 'language'){
            return {languages: action.payload}
        
        } else if  (action.type === 'skill' ) {
            return  {skill: action.payload}
        }
        throw Error('Unknown action');
    }

    const [selections, dispatch] = useReducer(reducer, INITAL_SELECTIONS)


    return (<>
        <h1>Get a random Project</h1>
        <ExpSelection setSelection={dispatch}/>
        <LanguageSelection languages={LANGUAGES} selection={selections.languages} setSelection={dispatch}/>
        <ProjectChooser state={selections}/>
    </>)
}
