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
