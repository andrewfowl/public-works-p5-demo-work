const mapDecimalToWord = (value, lo = 0, hi = 1) => {
    const normal = (value - lo) / (hi - lo);
    if (normal < .5) {
        return 'Low'
    } else if (normal < 0.75) {
        return 'Medium';
    } else {
        return 'High'
    }
}
export const generateTraits = (prng) => {
    const colorStyle = prng.randomWeighted(new Map([['COMPLIMENT', .5], ["ANALOGOUS", .5], ["TRIADIC", .25]]))
    const numCircles = prng.randomInt(100, 30000);
    const _hue = prng.randomInt(0, 360);
    const _saturation = prng.randomInt(20, 70);
    const _lightness = prng.randomInt(40, 80);

    
    let b = (colorStyle === 'COMPLIMENT') ? 180 : ((colorStyle === 'TRIADIC') ? 120 : 30)
    let c = (colorStyle === 'COMPLIMENT') ? 180 : ((colorStyle === 'TRIADIC') ? 240 : 60)

    const aCol = { hue: _hue, 
        saturation: _saturation, 
        lightness: _lightness };
    
      const bCol = {
        hue: (_hue + b) % 360,
        saturation: Math.min((_saturation + (prng.randomInt(10) - prng.randomInt(10))), 100),
        lightness: Math.min((_lightness + (prng.randomInt(10) - prng.randomInt(10))), 100)
      };
    
      const cCol = {
        hue: (_hue + c) % 360,
        saturation: Math.min((_saturation + (prng.randomInt(10) - prng.randomInt(10))), 100),
        lightness: Math.min((_lightness + (prng.randomInt(10) - prng.randomInt(10))), 100)
      };

   const attributes = {
        'Style': colorStyle,
        'Volume': mapDecimalToWord(numCircles, 100, 30000),
    }
    const traits = {colorStyle, numCircles, aCol, bCol, cCol};
    console.log('attributes', attributes)
    console.log('traits', traits)
    return {attributes, traits}
}
