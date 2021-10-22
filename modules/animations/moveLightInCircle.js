let r = 90,
  theta = 0.1,
  dtheta = (2 * Math.PI) / 1000;

function moveLightInCircle(pointLight) {
  let pLp = pointLight.position;
  theta += dtheta * 1.1;
  pLp.x = r * Math.cos(theta);
  pLp.z = r * Math.sin(theta);
}

export { moveLightInCircle };
