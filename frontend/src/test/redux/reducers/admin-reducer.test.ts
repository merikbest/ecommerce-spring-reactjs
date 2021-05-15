import {createStore} from "redux";
import rootReducer from "../../../redux/reducers/root-reducer";
import adminReducer, {InitialStateType} from "../../../redux/reducers/admin-reducer";
import {
    addPerfumeFailure,
    addPerfumeSuccess,
    getAllUsers,
    getAllUsersByQuery,
    getAllUsersOrders,
    getAllUsersOrdersByQuery,
    getUserInfo,
    getUserInfoByQuery,
    getUserOrders,
    getUserOrdersByQuery,
    loadingData,
    reset,
    updatePerfumeFailure,
    updatePerfumeSuccess
} from "../../../redux/actions/admin-actions";
import {Order, PerfumeErrors, User} from "../../../types/types";
import {perfumeErrorData} from "../../test-data/perfume-test-data";
import {userData, usersData} from "../../test-data/user-test-data";
import {ordersData} from "../../test-data/order-test-data";

let store = createStore(rootReducer);
let errors: PerfumeErrors;
let user: User;
let users: Array<User>;
let orders: Array<Order>;
let userOrders: Array<Order>;

beforeEach(() => {
    errors = perfumeErrorData;
    user = userData;
    users = usersData;
    orders = ordersData;
    userOrders = ordersData;
});

test("Loading Data", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, loadingData());
    expect(state.isLoaded).toBeTruthy();
});


test("Perfume Added Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, addPerfumeSuccess());
    expect(state.isPerfumeAdded).toBeTruthy();
    expect(state.errors).toEqual({});
});

test("Perfume Added Failure", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, addPerfumeFailure(errors));
    expect(state.isPerfumeAdded).toBeFalsy();
    expect(state.errors).toEqual(errors);
});

test("Perfume Updated Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, updatePerfumeSuccess());
    expect(state.isPerfumeEdited).toBeTruthy();
    expect(state.errors).toEqual({});
});

test("Perfume Updated Failure", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, updatePerfumeFailure(errors));
    expect(state.isPerfumeEdited).toBeFalsy();
    expect(state.errors).toEqual(errors);
});

test("Fetch User Info Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getUserInfo(user));
    expect(state.user).toEqual(user);
    expect(state.isLoaded).toBeFalsy();
});

test("Fetch All Users Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getAllUsers(users));
    expect(state.users).toEqual(users);
    expect(state.isLoaded).toBeFalsy();
});

test("Fetch All Users Orders Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getAllUsersOrders(orders));
    expect(state.orders).toEqual(orders);
    expect(state.isLoaded).toBeFalsy();
});

test("Fetch User Orders Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getUserOrders(userOrders));
    expect(state.userOrders).toEqual(userOrders);
});

test("Fetch User Info By Query Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getUserInfoByQuery(user));
    expect(state.user).toEqual(user);
    expect(state.isLoaded).toBeFalsy();
});

test("Fetch All Users By Query Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getAllUsersByQuery(users));
    expect(state.users).toEqual(users);
    expect(state.isLoaded).toBeFalsy();
});

test("Fetch All Users Orders By Query Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getAllUsersOrdersByQuery(orders));
    expect(state.orders).toEqual(orders);
    expect(state.isLoaded).toBeFalsy();
});

test("Fetch User Orders By Query Success", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, getUserOrdersByQuery(userOrders));
    expect(state.userOrders).toEqual(userOrders);
    expect(state.isLoaded).toBeFalsy();
});

test("Form Reset", () => {
    const state: InitialStateType = adminReducer(store.getState().admin, reset());
    expect(state.isPerfumeAdded).toBeFalsy();
    expect(state.isPerfumeEdited).toBeFalsy();
    expect(state.errors).toEqual({});
});
