export const usersByQuery = `
    {
        users {
            id
            email
            firstName
            lastName
            city
            address
            phoneNumber
            postIndex
            activationCode
            passwordResetCode
            active
            provider
            roles
        }
    }
`;

export const userByQuery = (id: string) => `
    {
        user(id: ${id}) {
            id
            email
            firstName
            lastName
            city
            address
            phoneNumber
            postIndex
            activationCode
            passwordResetCode
            active
            provider
            roles
        }
    }
`;
