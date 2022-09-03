import { legacy_createStore as createStore} from 'redux'
import scoreReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
const store=createStore(scoreReducer,composeWithDevTools())
export default store