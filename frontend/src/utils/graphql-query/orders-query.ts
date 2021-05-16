export const ordersByQuery = `
    {
        orders {
            id
            totalPrice
            date
            firstName
            lastName
            city
            address
            email
            phoneNumber
            postIndex
            orderItems {
                id
                amount
                quantity
                perfume {
                    id
                    perfumeTitle
                    perfumer
                    year
                    country
                    perfumeGender
                    fragranceTopNotes
                    fragranceMiddleNotes
                    fragranceBaseNotes
                    filename
                    price
                    volume
                    type
                    perfumeRating
                    reviews {
                        id
                        author
                        message
                        date
                        rating
                    }
                }
            }
        }
    }
`;

export const ordersByEmailQuery = (email: string | undefined) => `
    {
        ordersByEmail(email: \"${email}\") {
            id
            totalPrice
            date
            firstName
            lastName
            city
            address
            email
            phoneNumber
            postIndex
            orderItems {
                id
                amount
                quantity
                perfume {
                    id
                    perfumeTitle
                    perfumer
                    year
                    country
                    perfumeGender
                    fragranceTopNotes
                    fragranceMiddleNotes
                    fragranceBaseNotes
                    filename
                    price
                    volume
                    type
                    perfumeRating
                    reviews {
                        id
                        author
                        message
                        date
                        rating
                    }
                }
            }
        }
    }
`;
