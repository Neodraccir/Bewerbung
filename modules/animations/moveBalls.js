function moveBalls(ballArray, ballProp, y) {
  // if(y){
  //     //console.log(ballArray[3].position.x)
  // }
  ballArray.forEach((ball, index) => {
    let bp = ball.position;
    ballProp[index].thetaX += ballProp[index].dtheta;
    ballProp[index].thetaY += ballProp[index].dtheta;
    bp.x = ballProp[index].r * Math.cos(ballProp[index].thetaX);
    if (y) bp.y = ballProp[index].r * Math.cos(ballProp[index].thetaZ);
    bp.z = ballProp[index].r * Math.sin(ballProp[index].thetaY);
    if (y) {
      let br = ball.rotation;
      br.x = ballProp[index].r * 0.01 * Math.cos(ballProp[index].thetaX);
      br.y = ballProp[index].r * 0.01 * Math.cos(ballProp[index].thetaZ);
      br.z = ballProp[index].r * 0.01 * Math.sin(ballProp[index].thetaY);
    }
  });
}

export { moveBalls };
