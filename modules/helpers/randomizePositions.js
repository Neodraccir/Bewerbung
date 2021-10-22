let negaOrPosi = () => (Math.random() > 0.5 ? -1 : 1),
  randomR = (min, max) => min + max * Math.random(),
  randomX = (r) => r * Math.cos(360 * Math.random()),
  randomY = (r) => r * Math.sin(360 * Math.random());

export {negaOrPosi,randomR, randomX, randomY}