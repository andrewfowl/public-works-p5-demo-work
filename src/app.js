import * as p5 from 'p5';
import {generateTraits} from "./traits";

let devMode = true;
if(devMode){
    /**
     * Enable new hashes on click during development.
     */
    const freshHash = () => {
        window.location = '?hash=' + generateTxHash()
    }
    window.addEventListener('touchend', function () {
        freshHash()
    });
    document.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
            freshHash()
        }
    })
}

let s = (sk) => {
    const {traits, attributes} = generateTraits(createPrng());

    setProperties(attributes, traits);
    let sCol;

    sk.setup = () => {
        const dimensions = getDimensions();
        sk.createCanvas(...dimensions)
        sk.colorMode(sk.HSL)
        sk.noLoop();
    }

    sk.draw = () => {
        sk.background(255)
        let g = 50;
        const prng = createPrng();
        for (let x = 0; x <= sk.width ; x += g) {
          for (let y = 0; y <= sk.width; y += g) {
            sk.push();
            sk.translate(x, y);
            let j = g / Math.floor(prng.randomInt(1, 20)) ;
            for (let sx = -g + j ; sx <= g - j ; sx += j) {
              for (let sy = -g+ j ; sy <= g - j ; sy += j) {
                sCol = (prng.randomInt(0, 2)===0) ? traits.aCol : ((prng.randomInt(0, 2)===2) ? traits.bCol : traits.cCol);
                sk.stroke(sCol.hue, sCol.saturation, sCol.lightness);
                sk.strokeWeight(prng.randomInt(1, j));
                sk.point(sx + prng.randomInt(-g, g), sy + prng.randomInt(-g, g));
              }
            }
            sk.pop();
            sk.push();
            sk.strokeWeight(15);
            sk.stroke(0);
            sk.line(0, 0, sk.width, 0);
            sk.line(0, 0, 0, sk.height);
            sk.line(sk.width, 0, sk.width, sk.height);
            sk.line(0, sk.height, sk.width, sk.height);
            sk.pop();
          }
        }
        setPreviewReady()
    }
    const getDimensions = () => {
        let desiredHeight = sk.windowHeight
        let desiredWidth = sk.windowHeight;
        if (desiredWidth > sk.windowWidth) {
            desiredWidth = sk.windowWidth;
            desiredHeight = sk.windowWidth;
        }
        return [desiredWidth, desiredHeight]
    }
    sk.windowResized = () => {
        if (!isPWPreview()) {
            const dimensions = getDimensions();
            sk.resizeCanvas(...dimensions);
            sk.loop()
        }
    }

}




export const createSketch = () => {
    return new p5(s, document.getElementById('root'));
}
