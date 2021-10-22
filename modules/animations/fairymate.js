function fairymate(mixer, clock) {
  var delta;
  if (clock?.getDelta) delta = clock.getDelta();
  if (mixer?.update) mixer.update(delta);
  requestAnimationFrame(() => fairymate(mixer, clock));
}

export { fairymate };
