function makeStuffAppear() {
  let L_R = -1;
  let howCloseToPageBottom = () => {
    let hCTPB =
      document.body.scrollHeight -
      (window.pageYOffset +
        Math.max(
          document.documentElement.clientHeight,
          window.innerHeight || 0
        ));
    if (hCTPB <= 0) hCTPB = 0;
    return hCTPB;
  };
  let pageBottomRatio = () => {
    return (200 - howCloseToPageBottom()) / 200;
  };
  function appearInTheMiddleOfScreen({
    selector: selector,
    element: element,
    flying: flying,
  }) {
    let elem;
    if (element) elem = element;
    if (selector) elem = document.querySelector(selector);
    let style = elem.style;
    if (style.opacity > 1) style.opacity = 1;
    if (style.opacity < 0) style.opacity = 0;
    let windowHeight = document.documentElement.clientHeight;
    let elemPos = elem.getBoundingClientRect().top;

    let calculatedOpacity = (-1 * (elemPos - windowHeight + 100)) / 400;
    if (calculatedOpacity <= 0) calculatedOpacity = 0;
    if (calculatedOpacity >= 1) calculatedOpacity = 1;
    style.opacity = calculatedOpacity;

    let calculatedDistance = (-1 * (elemPos - windowHeight - 50)) / 250;
    if (calculatedDistance <= 0) calculatedDistance = 0;
    if (calculatedDistance >= 1) calculatedDistance = 1;

    if (flying) {
      style.transform = `translateX(${
        (20 - calculatedDistance * 20) * L_R
      }rem)`;
      L_R = L_R * -1;
    }

    if (howCloseToPageBottom() < 200 && style.opacity < pageBottomRatio()) {
      let translateX = style.transform.slice(11, style.transform.length-4)
      style.transform = `translateX(${translateX*(1-pageBottomRatio())}rem)`
      style.opacity = (style.opacity*(1-pageBottomRatio()))+pageBottomRatio();
    }
  }
  let scrollstate = Math.abs(document.body.getBoundingClientRect().top),
    achievementStyle = document.querySelector("#achievements").style;

  if (sessionStorage.getItem("notPlayingYet") == "true") {
    if (Number(achievementStyle.opacity) <= -1 + scrollstate / 100 / 2) {
      achievementStyle.opacity = -1 + scrollstate / 100 / 2;
    }
  }



  appearInTheMiddleOfScreen({ selector: ".fastInfo" });
  appearInTheMiddleOfScreen({ selector: ".timeline" });
  document
    .querySelectorAll("#QandA>*")
    .forEach((e) => appearInTheMiddleOfScreen({ element: e, flying: true }));
}

export { makeStuffAppear };
