const qr = require('qrcode');
const fs = require('fs');

// Function to perform RSA encryption
function rsaEncrypt(number, e, n) {
    return (Math.pow(number, e) % n);
}

// Function to perform RSA decryption
function rsaDecrypt(encryptedNumber, d, n) {
    let result = 1;
    for (let i = 0; i < d; i++) {
        result = (result * encryptedNumber) % n;
    }
    return result;
}

const hexString = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const numberArray = Array.from(hexString.slice(2), char => parseInt(char, 16));
console.log("Original Array", numberArray);

const modulus = 91;
const publicKey = 7;
const privateKey = 31;

// Encrypt each number using RSA encryption
const encryptedArray = numberArray.map(number => rsaEncrypt(number, publicKey, modulus));
console.log("Encrypted Array", encryptedArray);

// Transform encrypted array into gibberish
const gibberish = encryptedArray.map(number => String.fromCharCode(number + 65)).join('');
console.log("Gibberish:", gibberish);

// Convert gibberish back to English characters
const englishArray = gibberish.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 65333));
const englishString = englishArray.join('');
console.log("English String:", englishString);

// Generate QR code from the English string
qr.toFile('qrCode.png', englishString, { errorCorrectionLevel: 'H' }, function (err, filename) {
    if (err) {
        console.error(err);
        return;
    }

    // Simulate scanning by using the English string directly

    // Here to input the scanned data
    const scannedData = englishString;

    // Revert the English string back to the gibberish
    const reconstructedGibberish = scannedData.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 65333)).join('');
    console.log("Reconstructed Gibberish:", reconstructedGibberish);

    // Revert the gibberish back to the encrypted array
    const reconstructedEncryptedArray = reconstructedGibberish.split('').map(char => char.charCodeAt(0) - 65);
    console.log("Reconstructed Encrypted Array:", reconstructedEncryptedArray);

    // Decrypt the reconstructed encrypted array
    const reconstructedDecryptedArray = reconstructedEncryptedArray.map(number => rsaDecrypt(number, privateKey, modulus));
    console.log("Reconstructed Decrypted Array:", reconstructedDecryptedArray);

    // Convert the reconstructed decrypted array back to hexadecimal
    const reconstructedHexString = "0x" + reconstructedDecryptedArray.map(num => num.toString(16)).join('');
    console.log("Reconstructed Hexadecimal String:", reconstructedHexString);

    console.log(reconstructedHexString.toLowerCase() === hexString.toLowerCase());
});
