import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-web';

export default function Operacao({ route }) {
    const [operacao, setOperacao] = useState([]);
    const [at, setAt] = useState()

    useEffect(() => {
        listarOperacao();
    }, [at])

    const listarOperacao = () => {
        fetch("http://192.168.115.1:3000/operacao")
            .then(response => { return response.json(); })
            .then(data => {
                setOperacao(data);
            })
    }

    const finalizar = (idOp) => {
        fetch("http://localhost:5000/operacao/" + idOp, {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": '{"dataRetorno":null}'
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
                <Text style={styles.text} >Operações</Text>
                {
                    operacao.reverse().map((operacao, index) => {
                        var dateIn = new Date(operacao.dataSaida)
                        var dateF = new Date(operacao.dataRetorno)
                        var dtI = dateIn.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                        var dtF = dateF.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                        if (operacao.data_retorno !== null) {
                            return (
                                <View style={styles.veic} key={index}>
                                    <View style={styles.veicL} >
                                        <Text style={styles.info}>Id Da Operacao : {operacao.id}</Text>
                                        <Text style={styles.info}>Placa Do Veiculo : {operacao.frota.placa}</Text>
                                        <Text style={styles.info}>Nome do Motorista : {operacao.motorista.nome}</Text>
                                        <Text style={styles.info}>Data de Saida : {dtI}</Text>
                                        <Text style={styles.info}>Data de Retorno : {dtF}</Text>
                                        <Text style={styles.info}>Descrição : {operacao.descricao}</Text>

                                    </View>
                                </View>
                            )
                        } else {


                            return (
                                <View style={styles.veic} key={index}>
                                    <View style={styles.veicL} >
                                        <Text style={styles.info}>Id Da Operacao : {operacao.id}</Text>
                                        <Text style={styles.info}>Placa Do Veiculo : {operacao.frota.placa}</Text>
                                        <Text style={styles.info}>Nome do Motorista : {operacao.motorista.nome}</Text>
                                        <Text style={styles.info}>Data de Saida : {dtI}</Text>
                                        <Text style={styles.info}>Data de Retorno : Ainda Não Retornou</Text>
                                        <Text style={styles.info}>Descrição : {operacao.descricao}</Text>
                                        <View style={styles.viBTN} >
                                            <TouchableOpacity style={styles.btn} onPress={() => {
                                                finalizar(operacao.id)
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
        backgroundColor: "white",
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

