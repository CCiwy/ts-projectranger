import React from 'react';

export default function ProjectChooser(props) {
    const state = props.state;
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
