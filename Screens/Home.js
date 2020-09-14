import React, {Component} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Input, Button} from 'native-base';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {input: '', datasource: []};
  }

  searching() {
    const {input} = this.state;
    fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${input}?api_key=K6z2wT7k03qvSSGbzXx4AEFmcSWYku3VerABfNgs`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          datasource: responseJson,
        });
        var storeData = this.state.datasource;
        //console.log('data', storeData);
        this.props.navigation.navigate('Information', {storeData: storeData});
      })
      .catch((error) => alert('no'));
  }

  render() {
    return (
      <View style={{padding: 15, backgroundColor: 'white', height: '100%'}}>
        <TextInput
          style={{
            borderWidth: 1,
            marginBottom: 20,
          }}
          placeholder="Enter Asteroid ID"
          onChangeText={(input) => this.setState({input})}
        />

        <Button block onPress={() => this.searching()}>
          <Text>Submit</Text>
        </Button>
      </View>
    );
  }
}
