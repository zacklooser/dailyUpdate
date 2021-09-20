import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import {WebView} from 'react-native-webview';
import moment from 'moment';
import {THEME} from '../../utils/colors';
import {HorizontalLine} from '../../components/horizontalLine/horizontalLine';
import newsData from '../../store/news.json';

const news = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newsURL, setnewsURL] = useState('');
  const [isNewsLoaded, setNewsLoaded] = useState(false);

  const onNewsPress = url => {
    setModalVisible(!modalVisible);
    setnewsURL(url);
  };

  const renderNews = ({item}) => (
    <TouchableOpacity onPress={() => onNewsPress(item.url)}>
      <View style={{flexDirection: 'row', margin: 10}}>
        <View>
          <Image
            style={{height: 80, width: 80}}
            source={{
              uri: item.image,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: 10,
            width: '80%',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {item.title.substring(0, 60)}
          </Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#7c90c3'}}>
            {item.source}
            {'    '}
            <Text style={{color: '#d3d3d3'}}>
              {moment(
                moment(item.published_at).format('YYYY-MM-DD').split('-'),
              ).fromNow()}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center', marginTop: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Headlines</Text>
        <HorizontalLine />
        <View>
          <FlatList
            style={{marginBottom: '18%'}}
            data={newsData}
            renderItem={renderNews}
          />
        </View>
      </View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {!isNewsLoaded && <ActivityIndicator size="small" color={THEME} />}
        <WebView
          source={{uri: newsURL}}
          onLoad={() => {
            setNewsLoaded(!isNewsLoaded);
          }}
        />
      </Modal>
    </View>
  );
};

export default news;
