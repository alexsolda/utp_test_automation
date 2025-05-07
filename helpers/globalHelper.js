import dotenv from 'dotenv';
dotenv.config();


export const cometaUTP = process.env.UTP_COMETA;

export const catarinenseUTP = process.env.UTP_CATARINENSE;

export const expressoUTP = process.env.UTP_EXPRESSO;


export const timeout = process.env.TIMEOUT || 10000;