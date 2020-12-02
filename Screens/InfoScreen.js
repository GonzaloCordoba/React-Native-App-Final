import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import {Image} from 'react-native';
import {  Container, Content, Button, Body, Text, InputGroup, Input, Icon, Card, 
          CardItem,List,ListItem} from 'native-base';

const axios = require("axios");

export class InfoScreen extends Component {

    constructor(props) {
        super(props);
        this.handlerButtom = this.handlerButtom.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.state = {
          response: [],
          consulteApi: false,
          data: 0
        };
      }
      
      handlerChange = (text) => {
        var valor = text;
        this.setState({ value: valor });
        console.log(valor);
    
      }
    
      handlerButtom = () => {
        console.log("handleado");
        var nombre = this.state.value;
        axios.get('https://breakingbadapi.com/api/death-count?',{params:{name:nombre}})
          .then( response =>{
            console.log(response);
            if(response.data[0] === undefined || response.data[0] === null || response.data[0] === 0 || response.data[0] === ''){
              console.log(response);
              this.setState({consulteApi:false});
              this.props.data
            }else{
              console.log(response);
              this.setState({consulteApi:true, data: response.data[0]});
            }
            
          })
          .catch(error => {
            // handle error
            console.log(error);
          });
    }

    render(){
        if(this.state.consulteApi === true){
            return(
                <Container>      
                    <Content>
                        <InputGroup borderType="rounded" >
                            <Icon name="md-search" style={{color:'#384850'}}></Icon>
                            <Input  onChangeText={this.handlerChange.bind(this)} style={{color: '#00c497'}} />
                        </InputGroup>
                        <Button onPress={this.handlerButtom.bind(this)} full info>
                            <Text>Count Death</Text>
                        </Button> 
                        <Card style={{flex: 0}}>
                            <CardItem>
                                <Body>
                                    <Text>Nombre: {this.state.data.name}</Text>
                                    <Text>Death Count: {this.state.data.deathCount} </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>  
            );     
        }
        else{
            return(
                <Container>
                    <Content>
                        <InputGroup borderType="rounded" >
                            <Icon name="md-search" style={{color:'#384850'}}></Icon>
                            <Input  onChangeText={this.handlerChange.bind(this)} style={{color: '#00c497'}} />
                        </InputGroup>
                        <Button onPress={this.handlerButtom.bind(this)} full info>
                            <Text>Count Death</Text>
                        </Button> 
                        <Card style={{flex: 0}}>
                            <CardItem>
                            <Body>
                            
                                <Text>Nose encontro nada aun!</Text>
                        
                            </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </Container>   
            );     
        }
    }
    
}


