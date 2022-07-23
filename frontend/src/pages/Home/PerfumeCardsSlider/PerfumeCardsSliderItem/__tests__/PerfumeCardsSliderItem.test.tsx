import React from "react";

import { mountWithStore } from "../../../../../utils/testHelper";
import PerfumeCardsSliderItem from "../PerfumeCardsSliderItem";
import { perfumesData } from "../../../../../utils/test-data/perfume-test-data";
import PerfumeCard from "../../../../../components/PerfumeCard/PerfumeCard";

describe("PerfumeCardsSliderItem", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<PerfumeCardsSliderItem perfumes={perfumesData} />);
        expect(wrapper.find(PerfumeCard).length).toEqual(3);
    });
});
