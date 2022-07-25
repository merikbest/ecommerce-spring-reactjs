import React from "react";

import { mockDispatch, mountWithStore } from "../../../../utils/test/testHelper";
import PerfumeCardsSlider from "../PerfumeCardsSlider";
import PerfumeCardsSliderItem from "../PerfumeCardsSliderItem/PerfumeCardsSliderItem";

describe("PerfumeCardsSlider", () => {
    let mockDispatchFn: jest.Mock;

    beforeEach(() => {
        mockDispatchFn = mockDispatch();
    });

    it("should render correctly", () => {
        const wrapper = mountWithStore(<PerfumeCardsSlider />);
        expect(wrapper.text().includes("PERSONALLY RECOMMENDED")).toBe(true);
        expect(wrapper.find(PerfumeCardsSliderItem).length).toEqual(7);
        expect(mockDispatchFn).nthCalledWith(1, expect.any(Function));
    });

    it("should unmount PerfumeCardsSlider", () => {
        const wrapper = mountWithStore(<PerfumeCardsSlider />);
        wrapper.unmount();
        expect(mockDispatchFn).nthCalledWith(2, { type: "perfumes/resetPerfumesState" });
    });
});
