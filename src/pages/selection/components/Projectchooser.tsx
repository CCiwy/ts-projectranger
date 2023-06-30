import React from 'react';

interface Props {
    state: Any, // todo: import after done in parent and also put into seperate file 
}


const ProjectChooser: React.FC<Props>  = ( {state} ) => {
    const runGenerator = () =>{
        // needs state
        console.log("state run gen", state);
    }

    return (
        <>
            <hr/>
            <div>
                <button onClick={(e) =>  {e.preventDefault(); runGenerator()} }>GO</button>
            </div>
        </>
    )
}
export default ProjectChooser
