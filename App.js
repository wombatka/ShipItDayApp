import React from 'react';
import axios from 'axios';
import {AsyncStorage,ScrollView, WebView, ListView , Image,Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import { List, ListItem } from 'react-native-elements'

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state =
            {
                TextInputValueHolder: '',
                onChangeText: '',
                title: 'no title display',
                newRecipeTitle: '',
                newRecipeHolder: '',
                recipeID: 6666,
                titles: ['example title'],
                objects: [
                            {name:'test',
                                image: 'http://static.food2fork.com/healthy_cookies4ee3.jpg'
                              }
                ],
                images : ['http://static.food2fork.com/healthy_cookies4ee3.jpg']
              }
        this.getAllData();
    }
    getAllData() {
        axios.get('https://community-food2fork.p.mashape.com/search', {
            params: {
                key: '486ed0c9faa8176abb1bdbb8142feb92',
                q: '*'
            },
            headers: {
                'X-Mashape-Key': 'dNSOCbIg9hmshP8RMirNls4rJG11p1ZpVjDjsnU3Fout7Ze7Gu',
                Accept: 'application/json'
            }
        }).then(response => {
            //this.props.stopFetchAction();
              response.data.recipes.map(recipe => {
              AsyncStorage.setItem(recipe['title'], JSON.stringify(recipe));
              console.log(response.data.recipes);
            //  AsyncStorage.setItem('recipes', response.data.recipes);
            });

            // this.props.newRecipeList(response.data.recipes);
        });
    }
    saveItem = async()=>{
        const object2 = {
            "f2f_url": "http://food2fork.com/view/47692",
                "image_url": "http://static.food2fork.com/healthy_cookies4ee3.jpg",
                "publisher": "101 Cookbooks",
                "publisher_url": "http://www.101cookbooks.com",
                "recipe_id": this.state.recipeID.toString(),
                "social_rank": 100,
                "source_url": "http://www.101cookbooks.com/archives/nikkis-healthy-cookies-recipe.html",
                "title": this.state.newRecipeHolder,
        }
        const object = {
          name : 'scrambled',
          category : 'breakfast',
          recipie : 'blanbla',
          ingredient : 'egg'
        }
        AsyncStorage.setItem(this.state.newRecipeHolder, JSON.stringify(object2));
        this.state.recipeID=this.state.recipeID+1;
        this.newTitleInput.clear();

    }

    displayData = async()=>{
      try{
        const pattern = this.state.TextInputValueHolder;
        const keys = await AsyncStorage.getAllKeys();
        const titles = [];
        keys.forEach(elem => {
          if(elem.includes(pattern)){
            titles.push(elem);
            //console.log(titles);// body...console
          }
        });
        const recipies = [];
        const image = [];
        const items= [];
        titles.forEach(async element => {
          const item = await AsyncStorage.getItem(element);
          console.log(item);
          const par = JSON.parse(item);
          const object={name : par.title, image: par.image_url};
          console.log(object)
          items.push(object);
          //console.log('from string in array : ' + par.title);
          recipies.push(par.title);
          image.push(par.image_url)

        });
        this.setState({titles : recipies});
        this.setState({images : image})
        this.setState({objects : items})


      //  alert(parsed.title);

      }catch(error){
        alert(error);
      }
    }


    render() {
    return (
      <View style={styles.container}>
          <TextInput ref={input => { this.newTitleInput = input }}
              underlineColorAndroid = "transparent"
              placeholder="Recipe title"
              style = { styles.TextInputStyle }
              onChangeText = { ( TextInputText ) => { this.setState({ newRecipeHolder: TextInputText })} }
          />
          <TouchableOpacity style={styles.AddStyle} activeOpacity={0.5} onPress={this.saveItem}>

              <Image source={require('./images/add.png')}
                  style={styles.ImageIconStyle}
              />

              <View style={styles.SeparatorLine} />

              <Text style={styles.TextStyle}> Add recipe </Text>

          </TouchableOpacity>
          <TextInput
              underlineColorAndroid = "transparent"
              placeholder="What do you want to eat?"
              style = { styles.TextInputStyle }
              onChangeText = { ( TextInputText ) => { this.setState({ TextInputValueHolder: TextInputText })} }
          />
        <Button title="GET RECIPIE"  onPress={this.displayData}/>
        <ScrollView>
          <List containerStyle={{height: "100%",
              width: 300,marginBottom: 20}}>
              {
                  this.state.objects.map((l, i) => (
                    <ListItem
                          roundAvatar
                          avatar={{uri:l.image}}
                          key={i}
                          title={l.name}
                      />
                  ))
              }
          </List>
          </ScrollView>
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

    },
    ItemsList :{
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
    }
});
