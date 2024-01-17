function init() {
  const config = new Config();
  const drawer = new Drawer(document.getElementById('canvas'), config);
  const generator = new Generator(config, drawer);

  document.addEventListener('keydown', (ev) => {
    switch (ev.key) {
      case ' ': {
        generator.triggerGeneration();
        break;
      }
      case 'Escape': {
        generator.resetGeneration();
        break;
      }
      default: {
        break;
      }
    }
  });

  const branchCountElement = document.getElementById('branch-count');
  branchCountElement.value = config.tentacles;
  branchCountElement.addEventListener('change', (ev) => {
    const branchCount = parseInt(ev.target.value);
    config.setTentacles(branchCount);
  });

  const spreadElement = document.getElementById('spread');
  spreadElement.value = config.spread;
  spreadElement.addEventListener('change', (ev) => {
    const spread = parseFloat(ev.target.value);
    config.setSpread(spread);
  });
}
