// Function to open a specific tab content
function openTab(evt, tabName) {
    // Hide all tab content
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    
    // Deactivate all tab links
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
    
    // Show the specific tab content
    document.getElementById(tabName).style.display = "block";
    
    // Activate the clicked tab link
    evt.currentTarget.classList.add("active");
}
  

//tab1 content
document.addEventListener('DOMContentLoaded', () => {
    const deniableInput = document.querySelector('.deniable');
    const bigButton = document.getElementById('big_button');
    const newButtonsContainer = document.getElementById('newbuttons');
    let isDenied = false;

    function toggleDeny() {
        const currentContent = deniableInput.value;
        const lines = currentContent.split('\n');

        if (!isDenied) {
            const contentWithNo = lines.map(line => {
                if (!line.trim() || line.startsWith(' '.repeat(33)) || line.startsWith('interface')) { // Skip empty lines or lines with 32 or more spaces at the beginning
                    return line;
                }
                if (!line.startsWith('no ')) {
                    return 'no ' + line;
                }
                return line;
            }).join('\n');
            deniableInput.value = contentWithNo;
            bigButton.textContent = 'Undeny';
            bigButton.classList.remove(`deny`);
            bigButton.classList.add(`undeny`);
        } else {
            const contentWithoutNo = lines.map(line => {
                if (line.startsWith('no ')) {
                    return line.slice(3);
                }
                return line;
            }).join('\n');
            deniableInput.value = contentWithoutNo;
            bigButton.textContent = 'Deny';
            bigButton.classList.remove(`undeny`);
            bigButton.classList.add(`deny`);
        }

        isDenied = !isDenied;
        deniableInput.dispatchEvent(new Event('input')); // Update the textarea height
        createButtons(); // Update buttons based on the change in content
    }

    bigButton.addEventListener('click', () => {
        toggleDeny();
    });

    deniableInput.addEventListener('input', () => {
        deniableInput.style.height = 'auto';
        deniableInput.style.height = deniableInput.scrollHeight + 'px';

        if (!isDenied) {
            newButtonsContainer.innerHTML = '';
            createButtons();
        }
    });

    function createButtons() {
        newButtonsContainer.innerHTML = '';

        const lines = deniableInput.value.split('\n');
        lines.forEach((line, index) => {
            
            const button = document.createElement('button');
            button.textContent = '-';
            button.classList.add('dynamic-button');

            button.addEventListener('click', () => {
                console.log(`Button ${index + 1} clicked for line: ${line}`);
                
                const lineIndex = index;
                const currentContent = deniableInput.value;
                const lines = currentContent.split('\n');
    
                if (button.textContent === '-') {
                    const contentWithNo = lines.map((item, i) => {
                        if (i === lineIndex && !item.startsWith('no ')) {
                            return 'no ' + item;
                        }
                        return item;
                    }).join('\n');
                    deniableInput.value = contentWithNo;
                    button.textContent = '+';
                    
                    button.classList.remove(`deny`);
                    button.classList.add(`undeny`);
                } else {
                    const contentWithoutNo = lines.map((item, i) => {
                        if (i === lineIndex && item.startsWith('no ')) {
                            return item.slice(3);
                        }
                        return item;
                    }).join('\n');
                    deniableInput.value = contentWithoutNo;
                    button.textContent = '-';
                    button.classList.remove(`undeny`);
                    button.classList.add(`deny`);
                    
                }
    
                isDenied = !isDenied;
                deniableInput.dispatchEvent(new Event('input')); // Update the textarea height
            });
    
            newButtonsContainer.appendChild(button);
        });
    }
});
