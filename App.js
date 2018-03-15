import React from 'react';
import axios from 'axios';
import {AsyncStorage, Image,Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

export default class App extends React.Component {
    constructor() {
        super();
        this.state =
            {
                TextInputValueHolder: 'a'
            }
    }
    getAllData() {
        axios.get('https://community-food2fork.p.mashape.com/search', {
            params: {
                key: '486ed0c9faa8176abb1bdbb8142feb92',
                q: this.state.TextInputValueHolder.toString()
            },
            headers: {
                'X-Mashape-Key': 'dNSOCbIg9hmshP8RMirNls4rJG11p1ZpVjDjsnU3Fout7Ze7Gu',
                Accept: 'application/json'
            }
        }).then(response => {
            //this.props.stopFetchAction();
            console.log(response.data.recipes);
            // this.props.newRecipeList(response.data.recipes);
        });
    }
    saveItem() {
        const object = {
          name : 'scrambled',
          category : 'breakfast',
          recipie : 'blanbla',
          ingredient : 'egg'
        }
        AsyncStorage.setItem('recipie', JSON.stringify(object));
    }
    displayData = async()=>{
      try{
        const recipie = await AsyncStorage.getItem('recipie');
        const parsed = JSON.parse(recipie);
        alert(parsed.name);
      }catch(error){
        alert(error);
      }
    }
    callFun = () =>
    {

        alert("Image Clicked!!!");

    }





    render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.AddStyle} activeOpacity={0.5} onPress={ this.saveItem}>

              <Image source={require('./images/add.png')}
                  style={styles.ImageIconStyle}
              />

              <View style={styles.SeparatorLine} />

              <Text style={styles.TextStyle}> Add recipe </Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={this.displayData}>
            <Text>
              Click me to display
            </Text>
          </TouchableOpacity>

          <TextInput
              underlineColorAndroid = "transparent"
              placeholder="Enter Text Here To Share"
              style = { styles.TextInputStyle }
              onChangeText = { ( TextInputText ) => { this.setState({ TextInputValueHolder: TextInputText })} }
          />
          <Button title="Click Here To Share TextInput Inside Typed Text as Message" onPress={ this.getAllData() } />

          <Text>HAHAH</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    AddStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'green',
        borderWidth: .5,
        borderColor: '#fff',
        height: 40,
        borderRadius: 5 ,
        margin: 5,

    },
    ImageIconStyle: {
        top: 5,
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode : 'stretch',

    },
    TextInputStyle:
        {
            borderWidth: 1,
            borderColor: '#009688',
            width: '100%',
            height: 40,
            borderRadius: 10,
            marginBottom: 10,
            textAlign: 'center'
        },
    TextStyle :{

        color: "#fff",
        marginBottom : 4,
        marginRight :20,

    },

    SeparatorLine :{

        backgroundColor : '#fff',
        width: 1,
        height: 40

    }
});
