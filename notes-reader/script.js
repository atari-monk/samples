const fileInput = document.getElementById('fileInput');
const jsonContainer = document.getElementById('jsonContainer');

function parseAnswer(answer) {
  const codeRegex = /```(.*?)```/gs;
  const parts = answer.split(codeRegex);
  const elements = [];
  
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Text outside code block
      const text = parts[i];
      elements.push(document.createTextNode(text));
    } else {
      // Code block
      const codeBlock = document.createElement('pre');
      codeBlock.classList.add('code-block');
      codeBlock.textContent = parts[i];
      elements.push(codeBlock);
    }
  }
  
  return elements;
}

fileInput.addEventListener('change', function () {
  jsonContainer.innerHTML = ''; // Clear previous cards
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const jsonData = JSON.parse(event.target.result);
      jsonData.sections.forEach((section, sectionIndex) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.classList.add('section');
        sectionDiv.innerHTML = `<h2>${section.title}</h2>`;
        section.questions.forEach((item, index) => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `<h3>Question ${index + 1}</h3>`;
          card.innerHTML += `<p><strong>Question:</strong> ${item.question}</p>`;
          card.innerHTML += `<p><strong>Answer:</strong></p>`;
          
          const answerElements = parseAnswer(item.answer);
          answerElements.forEach(element => {
            card.appendChild(element);
          });
          
          sectionDiv.appendChild(card);
        });
        jsonContainer.appendChild(sectionDiv);
      });
    };
    reader.readAsText(file);
  } else {
    jsonContainer.textContent = 'No file selected.';
  }
});