import React, { FC, ReactElement } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { Perfume } from "../../types/types";
import "./DeleteModal.css";

type PropTypes = {
    perfume?: Perfume;
    deletePerfumeHandler: (id: number) => void;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteModal: FC<PropTypes> = ({ perfume, deletePerfumeHandler, setModalActive }): ReactElement => {
    return (
        <>
            <div className="modal-open">
                <div className="modal fade show delete_modal_wrapper">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Delete perfume</h5>
                                <button className="close" onClick={() => setModalActive(false)}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="row modal-body">
                                <div className="col-md-6 d-flex justify-content-center">
                                    <LazyLoadImage
                                        className="delete_modal_image"
                                        src={perfume?.filename}
                                        effect="blur"
                                    />
                                </div>
                                <div className="col-md-6 text-center">
                                    <p> Are you sure too delete?</p>
                                    <h6>{perfume?.perfumer}</h6>
                                    <h6>{perfume?.perfumeTitle}</h6>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" onClick={() => deletePerfumeHandler(perfume?.id!)}>
                                    Delete
                                </button>
                                <button className="btn btn-secondary" onClick={() => setModalActive(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    );
};

export default DeleteModal;
