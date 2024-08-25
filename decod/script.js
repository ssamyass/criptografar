let lastCopiedText = '';

function normalizeAndFilterText(text) {
    if (!text) {
        return '';
    }
    return text
        .toLowerCase() 
        .normalize('NFD') 
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z\s]/g, ''); 
}

function encryptText(text) {
    const filteredText = normalizeAndFilterText(text);
    if (!filteredText) {
        return '';
    }
    return filteredText.split('').map(char => {
        if (char === ' ') {
            return ' '; 
        }
        let charCode = char.charCodeAt(0) + 5;
        if (charCode > 122) { 
            charCode -= 26; 
        }
        return String.fromCharCode(charCode);
    }).join('');
}

function decryptText(text) {
    if (!text) {
        return '';
    }
    
    return text.split('').map(char => {
        if (char === ' ') {
            return ' '; 
        }
        let charCode = char.charCodeAt(0) - 5;
        if (charCode < 97) { 
            charCode += 26; 
        }
        return String.fromCharCode(charCode);
    }).join('');
}

document.getElementById('inputText').addEventListener('input', function() {
    const inputText = normalizeAndFilterText(this.value);
    document.getElementById('inputText').value = inputText;

    document.getElementById('fifthImage').style.display = 'block';
    document.getElementById('sixthImage').style.display = 'block';

    document.getElementById('encryptButton').style.display = 'block';
    document.getElementById('decryptButton').style.display = 'block';
    document.getElementById('copyButton').style.display = 'none'; 
    document.getElementById('outputSection').style.display = 'none';

    document.getElementById('outputText').textContent = '';
});

document.getElementById('encryptButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const encryptedText = encryptText(inputText);

    document.getElementById('outputText').textContent = encryptedText;

    lastCopiedText = encryptedText;

    document.getElementById('fifthImage').style.display = 'none';
    document.getElementById('sixthImage').style.display = 'none';
    document.getElementById('outputSection').style.display = 'block';
    document.getElementById('copyButton').style.display = 'block'; 
});

document.getElementById('decryptButton').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;
    const outputText = document.getElementById('outputText').textContent;

    const decryptedText = decryptText(outputText || inputText);

    document.getElementById('outputText').textContent = decryptedText;

    lastCopiedText = decryptedText;

    document.getElementById('fifthImage').style.display = 'none';
    document.getElementById('sixthImage').style.display = 'none';
    document.getElementById('outputSection').style.display = 'block';
    document.getElementById('copyButton').style.display = 'block'; 
});

document.getElementById('copyButton').addEventListener('click', function() {
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = lastCopiedText; 
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);

    alert('Texto copiado para a área de transferência!');
});
