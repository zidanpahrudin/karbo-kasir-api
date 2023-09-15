module.exports = {
    clientObject: {
        type: 'object',

        properties: {
            client_name: { type: 'string', minLength: 3, maxLength: 50 },
            address: { type: 'string', minLength: 3, maxLength: 50 },
            phone: { type: 'string', minLength: 8, maxLength: 15 },
            business_type: { type: 'string' },
            account_type: { type: 'string' }
        },
        required: ['client_name', 'address', 'phone', 'business_type'],
        additionalProperties: false,
    },

    approval: {
        type: 'object',

        properties: {
            type: { type: 'string'},
            client_id: { type: 'string', minLength: 24, maxLength: 24 },
            start_date: { type: 'string' },
            end_date: { type: 'string' } ,
            remarks: { type: 'string' }
        },
        required: ['start_date', 'end_date'],
        additionalProperties: false,
    }
}
