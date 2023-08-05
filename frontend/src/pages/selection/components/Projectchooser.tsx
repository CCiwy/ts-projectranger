import React, { useContext} from 'react';

import {Wheel, WheelProps} from '../widgets/wheel'


import {SelectionContext} from './../SelectionContext';

interface Props {
    state: Any, // todo: import after done in parent and also put into seperate file 
}

const wheelprops: WheelProps = {
    ident: 'svg',
    parentIdent: 'wheel',
    values: ["twichtchat", "typescript", "Quesnok", "Ino", "Mr_Sharpton", "Gannel", "newtech21", "zaion19"],
    size: 400,
}
interface LnProps {
    languages: string[]
    descr: string
}

const LanguagesSelected = ({languages, descr} : LnProps) => {
    if (languages.length === 0) return (<></>)

    return (
        <>
            <h2> { descr } </h2>
            <ul>
                { languages.map(ln => <li>{ln}</li>) } 
            </ul>
        </>
    )

}


const ProjectChooser: React.FC<Props>  = ( ) => {
    const {state, reduce } = useContext(SelectionContext);
    
    // on mount: call backend with gathered data
    // todo: maye show a loading component before???
    

    // call backend with gathered data -> retrieve possible options for wheel

    return (
        <><h2>Current Selections</h2>
            <LanguagesSelected languages={state.languages.prefered} descr="Prefered"/>
            <LanguagesSelected languages={state.languages.dismissed} descr="Dismissed" />
            <Wheel {...wheelprops}/>
        </>
    )
}
export default ProjectChooser
