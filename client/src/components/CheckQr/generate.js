const forge = require('node-forge');

// Function to generate a new RSA key pair
function generateKeyPair(keySize) {
    return new Promise((resolve, reject) => {
        forge.pki.rsa.generateKeyPair({ bits: keySize, workers: -1 }, function(err, keypair) {
            if (err) {
                reject(err);
            } else {
                resolve(keypair);
            }
        });
    });
}

// Example usage
(async () => {
    try {
        // Generate a 2048-bit key pair
        const keyPair = await generateKeyPair(2048);

        // Extract the public key and private key in PEM format
        const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey);
        const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey);

        console.log('Public Key:', publicKeyPem);
        console.log('Private Key:', privateKeyPem);
    } catch (error) {
        console.error('Error generating RSA key pair:', error);
    }
})();
