import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-web';

export default function Manutencao({ route }) {
    const [manutencao, setManutencao] = useState([]);
    const [at, setAt] = useState()

    useEffect(() => {
        listarManutencao();
    }, [at])

    const listarManutencao = () => {
        fetch("http://localhost:3000/manutencao")
            .then(response => { return response.json(); })
            .then(data => {
                setManutencao(data);
            })
    }

    const finalizar = (idM, idVeic) => {
        fetch("http://localhost:3000/manutencao/" + idM, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": '{"dataFim":null}'
        })
            .then(response =>response.json())
            .then(response => {
                console.log(response);
                setAt(response.id)
            })

    }

    return (
        <View style={styles.v} >
            <ScrollView>
                <Text style={styles.text} >Manutenções</Text>
                {
                    manutencao.map((manutencao, index) => {
                        var dateIn = new Date(manutencao.dataInicio)
                        var dateF = new Date(manutencao.dataFim)
                        var dtI = dateIn.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                        var dtF = dateF.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                        if(manutencao.dataFim !== null ){
                            return (
                                <View style={styles.veic} key={index}>
                                    <View style={styles.veicL} >
                                        <Text style={styles.info}>Id da Manutencao : {manutencao.id}</Text>
                                        <Text style={styles.info}>Data de Inicio : {dtI}</Text>
                                        <Text style={styles.info}>Data de Fim : {dtF}</Text>
                                        <Text style={styles.info}>Valor : {manutencao.valor}</Text>
                                        <Text style={styles.info}>Descrição : {manutencao.descricao}</Text>
                                    </View>
                                </View>
                            )
                        }else{
                        
                        return (
                            <View style={styles.veic} key={index}>
                                <View style={styles.veicL} >
                                    <Text style={styles.info}>Id da Manutencao : {manutencao.id}</Text>
                                    <Text style={styles.info}>Data de Inicio : {dtI}</Text>
                                    <Text style={styles.info}>Data de Fim : {dtF}</Text>
                                    <Text style={styles.info}>Valor : {manutencao.valor}</Text>
                                    <Text style={styles.info}>Descrição : {manutencao.descricao}</Text>
                                    <View style={styles.viBTN} >
                                            <TouchableOpacity style={styles.btn} onPress={() => {
                                                finalizar(manutencao.id)
                                            }}>
                                                <Text style={styles.textBt}>Finalizar</Text>
                                            </TouchableOpacity>
                                        </View>
                                </View>
                            </View>
                        )
                    }
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    viBTN: {
        display: "flex",
        flexDirection: "row",
        gap: "30px"
    },
    v: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#555b60",
        width: "100%",
        flex: 1,
        padding: 20
    },
    sv: {
        height: "100%",
        backgroundColor: "#46589c",
        width: "100%",
    },
    btn: {
        marginTop: 5,
        height: 40,
        width: 100,
        backgroundColor: "#2f8f5b",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "Black",
        borderWidth: "1px",
        borderRadius: "10px"
    },
    te: {
        fontSize: "10pt"
    },
    veic: {
        width: "100%",
        height: "250px",
        backgroundColor: "#ffffff",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        padding: "20px",
        alignItems: "center",
        borderRadius: "10px",
        marginBottom: "30px"
    },
    veicL: {
        maxWidth: "78%"
    },
    info: {
        fontSize: "13pt",
        fontWeight: "bold",
        color: "#000000"
    },
    infoP: {
        fontSize: "11pt",
        fontWeight: "normal",
        color: "#000"
    },
    text: {
        fontSize: "30pt",
        color: "white"
    },
    textBt: {
        color: "#fff"
    }

});