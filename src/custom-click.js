const breakpoints = {
  sm: '28em',
};

const debug = (...args) =>
  /debug/.test(window.location.search) && console.log(...args);

export const onCustomClick = cb => {
  let timer = null;
  let interval = null;
  let firstTap = null;
  let secondTap = null;

  const start = e => {
    // TODO: There's an issue when user taps on trackpad,
    // listener doesn't detect second tap
    if (firstTap) {
      secondTap = true;
    }
    debug(`down`, e);
    const startTime = Date.now();
    interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      debug(`elapsed:`, elapsed);
      if (!firstTap) {
        debug('first click');
        secondTap = false;
        clearInterval(interval);
      }
      if (elapsed > 1000) {
        cb();
        firstTap = false;
        secondTap = false;
        clearInterval(interval);
      }
    }, 50);
  };

  const end = e => {
    debug(`up`, e);
    if (secondTap) {
      firstTap = false;
    } else {
      firstTap = true;
    }
    timer = setTimeout(() => {
      debug('timed out');
      if (!secondTap) {
        clearInterval(interval);
        firstTap = false;
      }
    }, 100);
  };

  const listener = window.matchMedia
    ? window.matchMedia(`(min-width: ${breakpoints.sm})`)
    : { matches: false };

  if (listener.matches) {
    document.addEventListener('mousedown', () => start('click'));
    document.addEventListener('mouseup', () => end('click'));
  } else {
    document.addEventListener('touchstart', () => start('touch'));
    document.addEventListener('touchend', () => end('touch'));
  }
  return () => {
    document.removeEventListener('touchstart', start);
    document.removeEventListener('touchend', end);
    document.removeEventListener('mousedown', start);
    document.removeEventListener('mouseup', end);
  };
};
