var isMobile = false;
if (navigator?.userAgentData?.mobile) {
  isMobile = true;
}
if (navigator?.maxTouchPoints >= 1 && matchMedia("(pointer:coarse)").matches) {
  isMobile = true;
}
if (
  /Android|webOS|i(Pad|Pod|Phone)|BlackBerry|IEMobile|Opera Mini|mobile/i.test(
    navigator.userAgent
  )
) {
  isMobile = true;
}

export {isMobile}