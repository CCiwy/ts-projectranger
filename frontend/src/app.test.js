const calc = (spin, numSlices) => {
    spin = spin < 360 ? spin : spin % 360;
    const anglePerSlice = (360 / numSlices)
    return numSlices - Math.floor(spin/anglePerSlice)  
}

test('gets easy bits right' , () => {
    expect(calc(0, 4)).toBe(4);
    expect(calc(90, 4)).toBe(3);
    expect(calc(180, 4)).toBe(2);
    expect(calc(270, 4)).toBe(1);
});


test('gets more than 360 right' , () => {
    expect(calc(360, 4)).toBe(4);
    expect(calc(450, 4)).toBe(3);
    expect(calc(540, 4)).toBe(2);
    expect(calc(630, 4)).toBe(1);
});


test('gets hard bits right' , () => {
    expect(calc(180, 6)).toBe(3);
    expect(calc(240, 6)).toBe(2);
    expect(calc(300, 6)).toBe(1);
});
