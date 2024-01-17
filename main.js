function configChangeListener(element, defaultValue, callback) {
  element.value = defaultValue;
  element.addEventListener('change', callback);
}

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
  configChangeListener(branchCountElement, config.tentacles, (ev) => {
    const branchCount = parseInt(ev.target.value);
    config.setTentacles(branchCount);
  });

  const spreadElement = document.getElementById('spread');
  configChangeListener(spreadElement, config.spread, (ev) => {
    const spread = parseFloat(ev.target.value);
    config.setSpread(spread);
  });

  const radiusElement = document.getElementById('radius');
  configChangeListener(radiusElement, config.radius, (ev) => {
    const radius = parseFloat(ev.target.value);
    config.setRadius(radius);
  });
}
