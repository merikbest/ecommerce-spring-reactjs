export const getCrystalByQuery = (id: string) => `
    {
        crystal(id: ${id}) {
            id
            crystalTitle
            year
            country
            crystalGender
            fragranceTopNotes
            fragranceMiddleNotes
            fragranceBaseNotes
            filename
            price
            volume
            type
            crystalRating
            reviews {
                id
                author
                message
                date
                rating
            }
        }
    }
`;