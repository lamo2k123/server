import { createCipheriv, createDecipheriv } from 'node:crypto';

const NULL = '\u0000';

export const encipher = (key: string, value: Buffer) => {
    // OpenSSL supported Blowfish Cipher: bf, bf-cbc, bf-cfb, bf-ecb, bf-ofb
    const cipher = createCipheriv('bf-ecb', key + NULL, '').setAutoPadding(false);

    return cipher
        .update(value.swap32())
        .swap32();
};

export const decipher = (key: string, value: Buffer) => {
    // OpenSSL supported Blowfish Cipher: bf, bf-cbc, bf-cfb, bf-ecb, bf-ofb
    const decipher = createDecipheriv('bf-ecb', key + NULL, '').setAutoPadding(false);

    return Buffer
        .concat([
            decipher.update(value.swap32()),
            decipher.final()
        ])
        .swap32();
};