import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../src/components/Header';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import DataSet from '../src/DataSet';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

configure({adapter: new Adapter(), disableLifecycleMethods: true})

// const appWrapper = shallow(<BoxUser />)

const data = DataSet;

describe('BoxUser Component', () => {
  
  it('should renders correctly', () => {
    expect(renderer.create(<Header master={1} data={data} />).toJSON()).toMatchSnapshot();
  })

})