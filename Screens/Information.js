import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Input, Button, Card} from 'native-base';

export default class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {input: '', datasource: []};
  }

  render() {
    const data = this.props.route.params.storeData;
    console.log('navi', data);
    return (
      <View style={{padding: 5, backgroundColor: 'white', height: '100%'}}>
        <Card>
          <Text style={{fontWeight: 'bold'}}>
            Name :
            <Text style={{fontWeight: 'normal', paddingLeft: 5}}>
              {data.name}
            </Text>
          </Text>

          <Text style={{fontWeight: 'bold'}}>
            Nasa_jpl_url :
            <Text style={{fontWeight: 'normal', paddingLeft: 5}}>
              {data.nasa_jpl_url}
            </Text>
          </Text>
          <Text style={{fontWeight: 'bold'}}>
            Is_potentially_hazardous_asteroid :
            <Text style={{fontWeight: 'normal', paddingLeft: 5}}>
              {data.is_potentially_hazardous_asteroid.toString()}
            </Text>
          </Text>
        </Card>
      </View>
    );
  }
}
