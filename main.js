function init() {
  const config = new Config();
  const drawer = new Drawer(document.getElementById('canvas'));
  const generator = new Generator(config, drawer);
  const shouldEscape = true;

  document.addEventListener('keydown', (ev) => {
    switch (ev.key) {
      case ' ': {
        generator.triggerGeneration();
        console.log('trigger');
        break;
      }
      case 'Escape': {
        console.log('trigger - stop');
        generator.triggerGeneration(shouldEscape);
        break;
      }
      default: {
        console.log('Key: "' + ev.key + '"');
        break;
      }
    }
  });

  generator.generate();
}
