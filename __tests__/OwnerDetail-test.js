import React from 'react';
import renderer from 'react-test-renderer';
import OwnerDetail from '../src/screens/OwnerDetail';
import BoxUser from '../src/components/BoxUserDetail';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';
import { Provider } from 'react-redux';
import store from '../src/store';
import DataSet from '../src/DataSet';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

configure({adapter: new Adapter(), disableLifecycleMethods: true})

const appWrapper = shallow(<Provider store={store}><OwnerDetail /></Provider>)

const data = DataSet;

const route = { params: { data: data } }

function addFavorite(e, fav) {
  const data = [];
  data.push({
    id_user: e,
    favorite: fav
  });
  console.log(data);
}

describe('Owner Detail Screen', () => {
  
  it('should renders correctly', () => {
    expect(renderer.create(<Provider store={store}><OwnerDetail route={route} addFavorite={() => addFavorite(1, true)} /></Provider>).toJSON()).toMatchSnapshot();
  })

  it('should renders `Owner Screen` module correctly', () => {
    expect(appWrapper).toMatchSnapshot()
  })

});

const boxWrapper = shallow(<BoxUser data={data[0]} addFavorite={() => addFavorite(1, true)} />)

describe('BoxUser Component', () => {
  
  it('should renders correctly', () => {
    data.map((item) => {
      expect(renderer.create(<BoxUser data={item} addFavorite={() => addFavorite(1, true)} />).toJSON()).toMatchSnapshot();
    })
    // expect(renderer.create(<BoxUser data={data} addFavorite={() => addFavorite(1, true)} />).toJSON()).toMatchSnapshot();
  })

  it('should click when `Favorite` button Pressed', () => {
    const mockCallBack = jest.fn()
    boxWrapper.find('[testID="btn"]').simulate('press')
    expect(mockCallBack.mock.calls.length)
  })

})