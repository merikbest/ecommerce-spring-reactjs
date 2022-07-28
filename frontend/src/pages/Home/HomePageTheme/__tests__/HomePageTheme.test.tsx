import React from "react";
import { createMemoryHistory } from "history";
import { Link } from "react-router-dom";

import {createMockRootState, mountWithStore} from "../../../../utils/test/testHelper";
import { MENU } from "../../../../constants/routeConstants";
import HomePageTheme from "../HomePageTheme";
import {LoadingStatus} from "../../../../types/types";

describe("HomePageTheme", () => {
    const mockRootStore = createMockRootState(LoadingStatus.SUCCESS);

    it("should render correctly", () => {
        const wrapper = mountWithStore(<HomePageTheme />);
        expect(wrapper.find("img").at(0).prop("src")).toBe("https://i.ibb.co/jMmJs60/Them-Woman-ENG.jpg");
        expect(wrapper.find("img").at(1).prop("src")).toBe("https://i.ibb.co/mJGKz8c/Them-Man-ENG.jpg");
    });

    it("should click female Link", () => {
        testClickLink(0, "female");
    });

    it("should click male Link", () => {
        testClickLink(1, "male");
    });
    
    const testClickLink = (linkId: number, stateId: string): void => {
        const history = createMemoryHistory();
        const pushSpy = jest.spyOn(history, "push");
        const wrapper = mountWithStore(<HomePageTheme />, mockRootStore, history);
        wrapper.find(Link).at(linkId).simulate("click", { button: 0 });
        expect(pushSpy).toHaveBeenCalled();
        expect(pushSpy).toHaveBeenCalledWith({ pathname: MENU, state: { id: stateId } });
    };
});
