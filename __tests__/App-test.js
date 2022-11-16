import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import { Provider } from 'react-redux';
import store from '../src/store';
// import configureStore from 'redux-mock-store';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

configure({adapter: new Adapter(), disableLifecycleMethods: true})
// const initialState = [1,2,3];
// const store = configureStore(initialState)
const appWrapper = shallow(<Provider store={store}><App /></Provider>)

describe('App Screen', () => {
  
  it('should renders correctly', () => {
    expect(renderer.create(<Provider store={store}><App /></Provider>).toJSON()).toMatchSnapshot();
  })

  it('should renders `App Screen` module correctly', () => {
    expect(appWrapper).toMatchSnapshot()
  })

})