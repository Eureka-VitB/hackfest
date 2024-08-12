const terminal = document.getElementById('terminal');
        let commandHistory = [];
        let historyIndex = -1;

        terminal.addEventListener('keydown', function (event) {
            const input = document.querySelector('.input');

            if (event.key === 'Enter') {
                event.preventDefault();

                const command = input.innerText.trim();
                let output = '';

                if (command !== '') {
                    commandHistory.push(command);
                    historyIndex = commandHistory.length;
                }

                switch (command.toLowerCase()) {
                    case 'hackfest':
                        output = '$ <span>Welcome Choose<br> &emsp; ├───Problem Statement 1<br> &emsp; └───Problem Statement 2</span>';
                        break;
                    case 'problem statement 1':
                        output = '$ <span>Make A FullStack Website for Any Daily life problem that are faced by students within university</span>';
                        break;
                    case 'problem statement 2':
                        output = '$ <span>Make A FullStack Website for A Comprehensive University Management Platform</span>';
                        break;
                    case 'submission link':
                        output = '$ <span><a href="https://docs.google.com/forms/d/e">Link</a></span>';
                        break;
                    case 'clear':
                        terminal.innerHTML = '<p>Eureka$ <span class="input" contenteditable="true"></span></p>';
                        terminal.querySelector('.input').focus();
                        return;
                    default:
                        output = `$ <span>Command not recognized: ${command}</span>`;
                }

                const commandLine = document.createElement('p');
                commandLine.innerHTML = `Eureka$ <span>${command}</span>`;
                terminal.insertBefore(commandLine, input.parentElement);

                if (output) {
                    const outputLine = document.createElement('p');
                    outputLine.innerHTML = output;
                    terminal.insertBefore(outputLine, input.parentElement);
                }

                input.innerText = '';

                terminal.appendChild(input.parentElement);

                input.focus();

                terminal.scrollTop = terminal.scrollHeight;
            }

            if (event.key === 'ArrowUp') {
                if (historyIndex > 0) {
                    historyIndex--;
                    input.innerText = commandHistory[historyIndex];
                    placeCaretAtEnd(input);
                }
            }

            if (event.key === 'ArrowDown') {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.innerText = commandHistory[historyIndex];
                    placeCaretAtEnd(input);
                } else {
                    historyIndex = commandHistory.length;
                    input.innerText = '';
                }
            }
        });

        terminal.addEventListener('click', function () {
            const input = document.querySelector('.input');
            input.focus();
        });

        function placeCaretAtEnd(el) {
            el.focus();
            if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
                var range = document.createRange();
                range.selectNodeContents(el);
                range.collapse(false);
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            } else if (typeof document.body.createTextRange != "undefined") {
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(el);
                textRange.collapse(false);
                textRange.select();
            }
        }
