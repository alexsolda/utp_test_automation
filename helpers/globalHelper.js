import dotenv from 'dotenv';
dotenv.config();

export const timeout = process.env.TIMEOUT || 10000;

export const brandConfig = {
    catarinense: {
        name: 'Catarinense',
        url: 'catarinense.html?wcmmode=disabled',
        login: '60824030028',
        password: 'teste123'
    },
    cometa: {
        name: 'Cometa',
        url: 'cometa.html?wcmmode=disabled',
        login: '31274324025',
        password: 'teste123'
    },
    expresso: {
        name: 'Expresso do Sul',
        url: 'expressosul.html?wcmmode=disabled',
        login: '47909726074',
        password: 'teste123'
    },
    rr: {
        name: 'Rápido Ribeirão',
        url: 'rapidoribeirao.html?wcmmode=disabled',
        login: '05440014004',
        password: 'teste123'
    },
    viacao1001: {
        name: '1001',
        url: 'viacao1001.html?wcmmode=disabled',
        login: '30306496011',
        password: 'teste123'
    },

    giro: {
        name: 'Giro',
        url: 'clubegiro.html?wcmmode=disabled',
        login: '35807888090',
        password: 'teste123'
    },
    outlet: {
        name: 'Outlet',
        url: 'outlet.html?wcmmode=disabled',
        login: '71252431007',
        password: 'teste123'
    },
    wemobi: {
        name: 'Wemobi',
        url: 'wemobi.html?wcmmode=disabled',
        login: '96079761009',
        password: 'teste123'
    },
};