import React, {useEffect, useState} from 'react';


const SVG_NS = "http://www.w3.org/2000/svg"

//  --------------- MATH STUFF  --------------- 
interface Vec2 {
    x: number,
    y: number,
}


function getCirclePoint(m: Vec2, radius: number, alpha: number) {
    // only works for svg
    //in SVG, 0 degrees points to the right, while in trigonometry, 0 degrees points upward
    const radians = (alpha - 90) * Math.PI / 180

    const result: Vec2 = {
        x: m.x + Math.cos(radians) * radius,
        y: m.y + Math.sin(radians) * radius
    }
    return result
}



//  --------------- SLICE CREATION  --------------- 
function createSlice(m: Vec2, radius: number, startAngle: number, endAngle: number) {
    const slice = document.createElementNS(SVG_NS, "path")

    //in SVG, 0 degrees points to the right, while in trigonometry, 0 degrees points upward
    const p1: Vec2 = getCirclePoint(m, radius, startAngle)
    const p2: Vec2 = getCirclePoint(m, radius, endAngle)
  

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'; // should always be zero?!
    const d = `
        M ${m.x},${m.y}
        L ${p1.x} ${p1.y}
        A ${radius},${radius} 0 ${largeArcFlag} 1 ${p2.x},${p2.y}
        Z
        `;

    slice.setAttribute('d', d)
    return slice
}


function createSliceText(m: Vec2, radius: number, text: string, angle: number) {
        const p = getCirclePoint(m, radius, angle)
        const textElem = document.createElementNS(SVG_NS, "text");
        textElem.textContent = text

        textElem.setAttribute('x', p.x.toString())
        textElem.setAttribute('y', p.y.toString())
        textElem.setAttribute('transform',`rotate(${-90 + angle} ${p.x} ${p.y})`)
        // todo: get color from const?
        textElem.setAttribute('fill','white')
        return textElem
    }


const calculateCurrentSlice = (spinDegree: number, numSlices: number) => {
    spinDegree = spinDegree < 360 ? spinDegree : spinDegree % 360;
    const anglePerSlice = (360 / numSlices)
    return numSlices - Math.floor(spinDegree/anglePerSlice)  
}

//  --------------- WHEEL WIDGET  --------------- 

interface WheelProps {
    ident: string,
    parentIdent: string,
    values: string[],
    size: number,
}

const Wheel: React.FC = (props: WheelProps) => {
    const svgIdent = props.ident // get from context
    const parentIdent = props.parentIdent
    const wheel = document.getElementById(parentIdent)
    const size = props.size;
    const radius = size * 0.5
    const values = props.values

    const [current, setCurrent] = useState('')

    const [loaded, setLoaded] = useState(false);
   
    //rename spin degre
    const [offsetDegree, setOffsetDegree] = useState(0);
    const [hasSpun, setHasSpun] = useState(false)


    // CALLED ON MOUNT
    function createSlices() {
        const m: Vec2 = {x: radius, y: radius}
        const numSlices = values.length;
        const svgElem = document.getElementById(svgIdent)
         
        values.forEach((value, idx)  => {
            const start = (360/numSlices) * idx
            const end = (360/numSlices) * (idx + 1)
            
            const slice = createSlice(m, radius, start, end);

            //todo: can we use css?
            slice.classList.add('wheel__slice')
            slice.setAttribute('fill', 'currentColor');
            slice.setAttribute('stroke', 'darkgrey');
            slice.setAttribute('stroke-width', '2')
            slice.setAttribute('id', value)
            svgElem?.appendChild(slice);
            
            const angleBetween = (start + end) * 0.5 
                     
            const textElem = createSliceText(m, radius * 0.5, value, angleBetween)
            svgElem?.appendChild(textElem)
            

        })
        setLoaded(true)
    }


    // ON MOUNT   
    useEffect(() => {
        if (!loaded){
            createSlices()
        }
    }, [])


    // AFTER SPIN
    useEffect(() => {
        if (hasSpun) {
            const idx = calculateCurrentSlice(offsetDegree, values.length) - 1;
            markCurrentSlice(idx); 
            setHasSpun(false)
            // wait before reset but reset immediately
            setCurrent(values[idx])
            reset(idx)
        }
    }, [hasSpun])




    // reset before next run
    function reset(current: number) {
        setTimeout(() => {
            wheel.classList.remove('wheel_spinning')
            wheel.classList.add('wheel_not_spinning')
            wheel.style.transform = 'rotate(0)'
            markCurrentSlice(current, true) 
        }, 3000)
            
    }


    function markCurrentSlice(idx: number, reset?: boolean){
        const ident = values[idx]
        const slice = document.getElementById(ident)
        if (reset){
            slice.classList.remove('wheel__slice_active')
        } else {
            slice.classList.add('wheel__slice_active')
        }
                
    }

    function toggleSpin(e: Event){
        e.preventDefault();


        const spinAmount = Math.random() * 10;
        const spinDegree =  360 + spinAmount * Math.floor(Math.random() * 360);

        wheel?.style.setProperty('--spin-degree',`${spinDegree}deg`)
        wheel?.classList.remove('wheel_not_spinning')
        wheel?.classList.add('wheel_spinning')

        setTimeout(() => {
            const offset = spinDegree <= 360 ? spinDegree : spinDegree % 360;
            
            wheel.style.transform = `rotate(${offset}deg)`
            
            setOffsetDegree(offset);
            setHasSpun(true)    
        }, 1900)
 
    } 

    

    return (
        <>
        <div id="wheel__wrapper">
            <h2> SPIN THE WHEEL </h2>
            <h4>{current ? `Last spin: ${current}` : ''} </h4>
            <div id="wheel__marker"></div>
                <div className="wheel" id={parentIdent}>
                    <svg className="svg_wrapper" id={svgIdent} xmlns={SVG_NS} width={size} height={size}>
                    </svg>
                </div>
            <button onClick={(e) => toggleSpin(e)} > GO </button>
        </div>
        </>
    )
}


export {Wheel, WheelProps}

