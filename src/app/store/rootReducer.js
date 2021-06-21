import { combineReducers } from "redux";
import testReducer from "./../../features/sandBox/testReducer";
import eventReducer from "./../../features/events/eventReducer";
import ModalReducer from "./../common/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";

const rootReducer = combineReducers({
  test: testReducer,
  event: eventReducer,
  modals: ModalReducer,
  auth: authReducer,
});

export default rootReducer;
