export const getAllPerfumesByQuery = `
    {
        perfumes {
            id
            perfumeTitle
            perfumer
            price
            filename
            perfumeRating
        }
    }
`;

export const getPerfumeByQuery = (id: string) => `
    {
        perfume(id: ${id}) {
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
`;

export const gePerfumesByIdsQuery = (ids: Array<number>) => `
    {
        perfumesIds(ids: [${ids}]) {
            id
            perfumeTitle
            perfumer
            price
            filename
            perfumeRating
        }
    }
`;
