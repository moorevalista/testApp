import React from 'react';
import renderer from 'react-test-renderer';
import BoxUser from '../src/components/BoxUserDetail';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import DataSet from '../src/DataSet';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

configure({adapter: new Adapter(), disableLifecycleMethods: true})

const data = DataSet;

function addFavorite(e, fav) {
  const data = [];
  data.push({
    id_user: e,
    favorite: fav
  });
  console.log(data);
}

const appWrapper = shallow(<BoxUser data={data[0]} addFavorite={() => addFavorite(1, true)} />)

describe('BoxUser Component', () => {
  
  it('should renders correctly', () => {
    data.map((item) => {
      expect(renderer.create(<BoxUser data={item} addFavorite={() => addFavorite(1, true)} />).toJSON()).toMatchSnapshot();
    })
    // expect(renderer.create(<BoxUser data={data} addFavorite={() => addFavorite(1, true)} />).toJSON()).toMatchSnapshot();
  })

  it('should click when `Favorite` button Pressed', () => {
    const mockCallBack = jest.fn()
    appWrapper.find('[testID="btn"]').simulate('press')
    expect(mockCallBack.mock.calls.length)
  })

})