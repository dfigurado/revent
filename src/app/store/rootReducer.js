import { combineReducers } from "redux";
import testReducer from "./../../features/sandBox/testReducer";
import eventReducer from "./../../features/events/eventReducer";
import ModalReducer from "./../common/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../async/asynchReducer";

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: ModalReducer,
  auth: authReducer,
  async: asyncReducer,
});

export default rootReducer;
