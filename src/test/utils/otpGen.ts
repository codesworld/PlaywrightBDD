import * as  OTPAuth from 'otpauth'
import * as dotenv from 'dotenv';

export const createTOTP = (): OTPAuth.TOTP => {
    dotenv.config();
    return new OTPAuth.TOTP({
        issuer: 'ACME',
        label: 'MYTOTP',
        algorithm: 'SHA1',
        digits: 6,
        period: 30,
        secret: process.env.SECRET!,
    });
};