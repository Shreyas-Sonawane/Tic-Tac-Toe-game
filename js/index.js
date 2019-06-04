var chars = [];
            
            // 1. Split text
            // Read the content of the heading

            function textSplit() {
                var title = document.querySelector('.title');
                var splitText = title.textContent.split('');

                // Write back the seperated characters
                // Store a reference for each character in 'chars'

                title.textContent = '';
                var character;
                for(var i=0, len=splitText.length; i<len; i++) {
                    character = document.createElement('span');
                    character.textContent = splitText[i];
                    character.style.display = 'inline-block';

                    chars.push(character);
                    title.appendChild(character);
                }
            }

            // 2. Create timeline for the wiggle effect
            // Use loop to create multiple random positions
            // Use the cycle property so each char get a different random position

            function textWiggle() {
                var timelineWiggle = new TimelineMax({repeat:-1, yoyo:true}); 
                for(var j=0; j < 10; j++) {
                    timelineWiggle.staggerTo(chars, 0.1, {
                        cycle: {
                            x: function() { return Math.random()*4 - 2; },
                            y: function() { return Math.random()*4 - 2; },
                            rotation: function() { return Math.random()*10 - 5; }
                        },
                        ease: Linear.easeNone
                    }, 0);
                }
            }
            textSplit();
            textWiggle();






            
const TYPING_SPEED = 50;
let $targetList;

const init = () => {

  $targetList = document.querySelectorAll('[data-js="typing"]');

  setup();
  run();

};

const setup = () => {

  for (const $dom of $targetList) {

    const textList = $dom.innerText.split('');
    let html = '';

    for (const char of textList) {
      html += `<span>${char}</span>`;
    }

    $dom.innerHTML = html;

  }

};

const run = () => {

  let delay = 0;

  for (let i = 0; i < $targetList.length; i++) {

    const $target = $targetList[i];
    const $chars = $target.querySelectorAll('span');

    for (let l = 0; l < $chars.length; l++) {

      const $char = $chars[l];
      const text = $char.textContent;

      delay += TYPING_SPEED;
      if (text === ' ') delay += TYPING_SPEED * 2;

      const animate = () => {

        $char.style.display = 'inline-block';

      };

      setTimeout(animate, delay);

      if ($chars.length - 1 <= l) {
        delay += TYPING_SPEED * 4;
        setTimeout(() => $target.style.display = 'block', delay);
      }

    }

  }

};

document.addEventListener('DOMContentLoaded', init, false); 



const FPS = 10;
const DURATION = 600;
const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const TEXT = 'Player VS Player';
const DELAY = ~~(600 / FPS);
const FRAME_COUNT = ~~(DURATION / 600) * FPS

const $Element = document.getElementById('text');
let frameIndex = 0;
let timeoutId = undefined;

function resetText() {
  if (timeoutId !== undefined) clearTimeout(timeoutId);
  frameIndex = 0;
  $Element.innerText = TEXT;
}

function setRandomText() {
  const text = Array.from({length: TEXT.length}).map(() => CHARACTERS[~~(Math.random() * CHARACTERS.length)]);
  $Element.innerText = text.join('');
}

function animate() {
  if (frameIndex >= FRAME_COUNT) {
    resetText();
  } else {
    frameIndex += 1;
    setRandomText();
    timeoutId = setTimeout(animate, DELAY);
  }
}

$Element.addEventListener('mouseenter', animate);
$Element.addEventListener('mouseout', resetText);

resetText();