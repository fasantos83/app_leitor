import React from 'react'
import { ScrollView, View, FlatList, Text } from 'react-native'

const itemEstilo = {
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: '#DDD',
    borderWidth: 0.5,
    borderColor: '#222',
    
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
}

Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
}

const formatarData = (hora) => {
    return hora.toLocaleDateString('pt-BR') + " " + hora.getHours().pad() + ":" + hora.getMinutes().pad() + ":" + hora.getSeconds().pad()
}

export const Item = props =>
    <View style={itemEstilo}>
        <Text>{formatarData(props.hora)}</Text>
    </View>

export default props => {
    const renderItem = ({ item }) => {
        return <Item {...item} />
    }

    return (
        <ScrollView >
            <FlatList data={props.data} renderItem={renderItem}
                keyExtractor={(_, index) => index.toString()} />
        </ScrollView>
    )
}