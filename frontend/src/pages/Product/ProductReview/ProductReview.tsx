import React, { FC, ReactElement } from "react";

import { Review } from "../../../types/types";
import usePagination from "../../../component/Pagination/usePagination";
import PaginationItem from "../../../component/Pagination/PaginationItem";
import ProductReviewItem from "./ProductReviewItem";

type PropType = {
    data: Array<Review>;
    itemsPerPage: number;
    startFrom?: number;
};

const ProductReview: FC<PropType> = ({ data, itemsPerPage, startFrom }): ReactElement => {
    const { slicedData, pagination, prevPage, nextPage, changePage } = usePagination({ itemsPerPage, data, startFrom });

    return (
        <div className="container">
            <div className="row mt-3 ml-2">
                <div className="container-fluid">
                    {data.length < 5 ? null : (
                        <PaginationItem
                            pagination={pagination}
                            prevPage={prevPage}
                            changePage={changePage}
                            nextPage={nextPage}
                        />
                    )}
                    {slicedData.length === 0 ? (
                        <p className="text-center">There are no reviews for this perfume.</p>
                    ) : (
                        slicedData.map((review: Review) => <ProductReviewItem key={review.id} review={review} />)
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
