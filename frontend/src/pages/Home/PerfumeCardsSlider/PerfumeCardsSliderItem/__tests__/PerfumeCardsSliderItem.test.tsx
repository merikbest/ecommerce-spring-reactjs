import React from "react";

import { mountWithStore } from "../../../../../utils/test/testHelper";
import PerfumeCardsSliderItem from "../PerfumeCardsSliderItem";
import { mockPerfumesResponse } from "../../../../../utils/test/__mocks__/perfumes-mock";
import PerfumeCard from "../../../../../components/PerfumeCard/PerfumeCard";

describe("PerfumeCardsSliderItem", () => {
    it("should render correctly", () => {
        const wrapper = mountWithStore(<PerfumeCardsSliderItem perfumes={mockPerfumesResponse} />);
        expect(wrapper.find(PerfumeCard).length).toEqual(3);
    });
});
