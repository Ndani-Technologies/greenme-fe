import { combineReducers } from "redux";

//my reducers
import userDetailReducer from "./usermanagement/reducer";

// Front
import LayoutReducer from "./layouts/reducer";

// Authentication
import LoginReducer from "./auth/login/reducer";
import AccountReducer from "./auth/register/reducer";
import ForgetPasswordReducer from "./auth/forgetpwd/reducer";
import ProfileReducer from "./auth/profile/reducer";

//Crm
import CrmReducer from "./crm/reducer";

// API Key
import APIKeyReducer from "./apiKey/reducer";

//Benchmark
import BenchmarkReducer from "./BenchmarkingUser/reducer";
import ChatReducer from "./chat/reducer";

import FileManager from "./fileManager/reducer";

const rootReducer = combineReducers({
  Benchmark: BenchmarkReducer,
  Layout: LayoutReducer,
  Login: LoginReducer,
  Chat: ChatReducer,
  Account: AccountReducer,
  ForgetPassword: ForgetPasswordReducer,
  Profile: ProfileReducer,
  Crm: CrmReducer,
  APIKey: APIKeyReducer,
  UserDetail: userDetailReducer,
  FileManager: FileManager,
});

export default rootReducer;
