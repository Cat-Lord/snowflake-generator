function init() {
  const config = new Config();
  const drawer = new Drawer(document.getElementById('canvas'), config);
  const generator = new Generator(config, drawer);
  const shouldEscape = true;

  document.addEventListener('keydown', (ev) => {
    switch (ev.key) {
      case ' ': {
        generator.triggerGeneration();
        break;
      }
      case 'Escape': {
        generator.triggerGeneration(shouldEscape);
        break;
      }
      default: {
        break;
      }
    }
  });

  // generator.generate();
}
