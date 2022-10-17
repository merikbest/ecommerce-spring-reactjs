import { useHistory } from "react-router-dom";
import { CART } from "../constants/routeConstants";

interface UseCart {
    addToCart: () => void;
}

export const useCart = (perfumeId: number): UseCart => {
    const history = useHistory();

    const addToCart = (): void => {
        let data: string | null = localStorage.getItem("perfumes");
        let cart: Map<number, any> = data ? new Map(JSON.parse(data as string)) : new Map();

        if (cart.has(perfumeId as number)) {
            cart.set(perfumeId as number, cart.get(perfumeId as number) + 1);
        } else {
            cart.set(perfumeId as number, 1);
        }
        localStorage.setItem("perfumes", JSON.stringify(Array.from(cart.entries())));
        history.push(CART);
    };

    return { addToCart };
};
