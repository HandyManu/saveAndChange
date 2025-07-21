import {TouchableOpacity , Text, StyleSheet}from "react-native"

const Buttons = ({texto,action}) =>{
    return <TouchableOpacity onPress={action}
    style={styles.boton}>
        <Text style={styles.texto}>
            {texto}

        </Text>
    </TouchableOpacity>
};

const styles = StyleSheet.create({
    boton:{
        padding: 10,
        backgroundColor:'#EAD8C0',
        borderRadius: 10,
        marginVertical: 10,
        marginHorizontal: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#B99873',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
        
    },
    texto:{

        textAlign:'center',
        fontSize:20,
        fontWeight: "semibold",
        color: '#5C3D2E',
        textTransform: 'uppercase',
        letterSpacing: 1,
        textShadowColor: '#B99873',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
        textDecorationLine: 'none',
        textDecorationStyle: 'solid',
        textDecorationColor: '#B99873',
        textAlignVertical: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#B99873'


    }
})

export default Buttons