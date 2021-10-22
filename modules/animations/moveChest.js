let movement = 0;
let base = "wait";

function moveChest(chest) {
  if (base == "wait") base = chest.position.y;
  movement += 0.03;
  if (Math.random < 0.98) movement = movement * Math.random();
  chest.rotation.y -= 0.003;
  chest.position.y = base + 3 * Math.cos(movement);
}

export { moveChest };
