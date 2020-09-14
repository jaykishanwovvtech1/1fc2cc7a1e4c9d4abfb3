import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Button, Card, Spinner} from 'native-base';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      datasource: [],
      ActivityLoader: false,
      notFound: false,
    };
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
          notFound: false,
        });
        var storeData = this.state.datasource;

        this.props.navigation.navigate('Information', {storeData: storeData});
      })
      .catch((error) => this.setState({notFound: true}));
  }

  randomList() {
    this.setState({ActivityLoader: true, notFound: false});
    fetch(
      'https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=K6z2wT7k03qvSSGbzXx4AEFmcSWYku3VerABfNgs',
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          datasource: responseJson.near_earth_objects,
          ActivityLoader: false,
        });
      })
      .catch((error) => console.log(error));
  }

  getAsteroidID(Id) {
    this.setState({ActivityLoader: true});
    fetch(
      `https://api.nasa.gov/neo/rest/v1/neo/${Id}?api_key=K6z2wT7k03qvSSGbzXx4AEFmcSWYku3VerABfNgs`,
    )
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          datasource: responseJson,
          ActivityLoader: false,
        });
        var storeData = this.state.datasource;

        this.props.navigation.navigate('Information', {storeData: storeData});
      })
      .catch((error) => console.log(error));
  }

  renderItems(data) {
    return (
      <TouchableOpacity onPress={() => this.getAsteroidID(data.item.id)}>
        <Card style={styles.cardStyle}>
          <Text style={styles.idText}>{data.item.id}</Text>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.mainView}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter Asteroid ID"
          placeholderTextColor="black"
          onChangeText={(input) => this.setState({input, notFound: false})}
        />

        <Button
          style={{
            backgroundColor:
              this.state.input.length > 0 ? 'orange' : 'lightgrey',
          }}
          block
          onPress={() => this.searching()}
          disabled={this.state.input.length > 0 ? false : true}>
          <Text style={styles.buttonText}>Submit</Text>
        </Button>

        <Button
          block
          onPress={() => this.randomList()}
          style={styles.randomButton}>
          <Text style={styles.buttonText}>Random ID</Text>
        </Button>
        {this.state.ActivityLoader && <Spinner color="orange" />}

        {this.state.notFound ? (
          this.state.input.length == 0 ? null : (
            <Text style={styles.dataText}>
              Data Not Found Please Enter Valid Asteroid ID
            </Text>
          )
        ) : (
          <FlatList
            data={this.state.datasource}
            renderItem={(item) => this.renderItems(item)}
            keyExtractor={(id, item) => item.toString()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {padding: 15, backgroundColor: 'white', height: '100%'},
  inputText: {
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  randomButton: {marginTop: 15, backgroundColor: 'orange'},
  dataText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 25,
  },
  buttonText: {color: 'white', fontWeight: 'bold'},
  cardStyle: {
    margin: 10,
    marginTop: 10,
    elevation: 5,
    borderColor: 'grey',
    borderWidth: 1,
  },
  idText: {
    alignSelf: 'center',
    fontSize: 16,
    padding: 10,
    fontWeight: '600',
  },
});
