import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../src/components/Button';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

configure({adapter: new Adapter(), disableLifecycleMethods: true})

function setDataMaster() {
  console.log('OK');
}

const appWrapper = shallow(<Button setDataMaster={() => setDataMaster()} />)

describe('Button Component', () => {
  
  it('should renders correctly', () => {
    expect(renderer.create(<Button setDataMaster={() => setDataMaster()} />).toJSON()).toMatchSnapshot();
  })

  it('should renders `Button Component` module correctly', () => {
    expect(appWrapper).toMatchSnapshot()
  })

  it('should click when `Make Master` button Pressed', () => {
    const mockCallBack = jest.fn()
    appWrapper.find('[testID="btn"]').simulate('press')
    expect(mockCallBack.mock.calls.length)
  })
})