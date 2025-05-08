import dotenv from 'dotenv';
dotenv.config();


export const cometaUTP = process.env.UTP_COMETA || 'cometa';

export const catarinenseUTP = process.env.UTP_CATARINENSE || 'catarinense';

export const expressoUTP = process.env.UTP_EXPRESSO || 'expressosul';

export const rrUTP = process.env.UTP_RR || 'rapidoribeirao';

export const milEUmUTP = process.env.UTP_1001 || 'viacao1001';


export const timeout = process.env.TIMEOUT || 30000;