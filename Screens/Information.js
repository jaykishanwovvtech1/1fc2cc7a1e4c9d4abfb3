import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'native-base';

export default class Information extends Component {
  render() {
    const data = this.props.route.params.storeData;

    return (
      <View style={styles.mainView}>
        <Card style={styles.cardStyle}>
          <Text style={styles.titleText}>
            Name :
            <Text style={styles.commonText}>
              {''} {data.name}
            </Text>
          </Text>

          <Text style={styles.titleText}>
            Nasa_jpl_url :
            <Text style={styles.commonText}>
              {''} {data.nasa_jpl_url}
            </Text>
          </Text>
          <Text style={styles.titleText}>
            Is_potentially_hazardous_asteroid :
            <Text style={styles.commonText}>
              {''} {data.is_potentially_hazardous_asteroid.toString()}
            </Text>
          </Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {padding: 15, backgroundColor: 'white', height: '100%'},
  cardStyle: {
    margin: 10,
    padding: 10,
    elevation: 7,
  },
  titleText: {fontWeight: 'bold'},
  commonText: {
    fontWeight: 'normal',
    padding: 2,
  },
});
