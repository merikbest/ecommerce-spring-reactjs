import React from "react";
import {Col} from "antd";

import { mountWithStore } from "../../../../../utils/test/testHelper";
import SliderBrandsItem from "../SliderBrandsItem";
import { brandsItem } from "../../SliderBrandsData";

describe("SliderBrandsItem", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<SliderBrandsItem brands={brandsItem.slice(0, 6)} />);
        expect(wrapper.find(Col).length).toEqual(6);
    });
});
