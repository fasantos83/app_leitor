import React from 'react'
import { StyleSheet, View, TextInput} from 'react-native';
import ListaFlex from './ListaFlex';
import If from './If';

export default class Leitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: "",
            mostrarLista: false,
            adicionou: false,
            mapaTag: new Map()
        }
    }

    onChangeText = texto => {
        let { mapaTag, adicionou } = this.state;
        let mostrarLista = String(texto).length === 10;
        if(mostrarLista){
            let lista = mapaTag.has(texto) ? mapaTag.get(texto) : new Array();
            let novaData = new Date();
            if(lista.length === 0 || lista[0].hora.getTime() - novaData.getTime() > 360000){
                lista.unshift({hora: novaData});
                mapaTag.set(texto, lista);
                adicionou = true;
            }else{
                adicionou = false;
            }
        }
        this.setState({ texto, mostrarLista, mapaTag, adicionou });
    }

    render(){
        const { texto, mostrarLista, mapaTag, adicionou } = this.state;
        return (
            <View style={{flex: 1}}>
                <View ref={this.viewRef} style={{...styles.container, backgroundColor: mostrarLista ? (adicionou ? 'green' : 'red') : 'white' }}>
                    <TextInput style={styles.ex} autoFocus={true} onChangeText={this.onChangeText} value={texto} maxLength={10}/>
                    <If test={mostrarLista}>
                        <ListaFlex data={mapaTag.get(texto)}/>
                    </If>
                </View> 
            </View>
        )
    }
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ex: {
        paddingHorizontal: 15,
        marginVertical: 25,
        borderWidth: 1,
        borderColor: 'black',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
