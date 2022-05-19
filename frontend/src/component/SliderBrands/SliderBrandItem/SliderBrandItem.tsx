import React, {FC, ReactElement} from "react";
import {Link} from "react-router-dom";

import {BrandType} from "../SliderBrandsData";

type PropsType = {
    brands: Array<BrandType>
};

const SliderBrandItem: FC<PropsType> = ({brands}): ReactElement => {
    return (
        <>
            {brands.map((brand: BrandType, index: number) => (
                <div key={index} className="col-2 float-left">
                    <Link to={{pathname: "/menu", state: {id: brand.name}}}>
                        <img className="img-fluid" src={brand.url} alt={brand.name}/>
                    </Link>
                </div>
            ))}
        </>
    );
};

export default SliderBrandItem;