import React from 'react';
import logo from './logo.svg';
import './App.css';
import {put, select, call, takeLatest} from 'redux-saga/effects';
import useSagaReducer from 'use-saga-reducer';

function* dataFetcher() {
  yield put({type: 'TEST', payload: {foo: 'blah'}})
  const foo = yield select(s => s.foo);
  // expected: 'blah'
  // actual: undefined (on first click on the button)
  console.log('foo', foo);
}

function* dataFetchingSaga() {
  yield takeLatest('FETCH', dataFetcher)
}

function reducer(state = {}, action: any) {
  if (action.type === 'TEST') {
    return action.payload
  }

  return state
}

const DataFetchingComponent: React.FC = () => {
  const [state, dispatch] = useSagaReducer(dataFetchingSaga, reducer)

  return (
    <>
      <pre>{JSON.stringify(state)}</pre>
      <button onClick={() => dispatch({type: 'FETCH'})}>Fetch Data</button>
    </>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <DataFetchingComponent />
      </header>
    </div>
  );
}

export default App;
