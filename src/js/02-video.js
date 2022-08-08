import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player', {
  width: 640,
});

player.on('timeupdate', throttle(timeSave, 1000, {}));

player
  .setCurrentTime(localStorage.getItem('videoplayer - current - time'))
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        console.log(
          `the time - ${seconds} was less than 0 or greater than the video’s duration`
        );
        break;
      default:
        // some other error occurred
        break;
    }
  });

function timeSave(time) {
  localStorage.setItem('videoplayer - current - time', time.seconds);
}
