import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Alert, SafeAreaView, Pressable, Vibration} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// import Toast from 'react-native-toast-message';

var theme = "#37474F";
var themeText = "white";
var buttonBackground = "#19202A";
var buttonText = "white";
var specButton = "#FE6631";
var buttonsBackground = "#19202A"

export default function App() {

  const [screen, setScreen] = useState("0");
  const [secScreen, setSecScreen] = useState("");
  const [flag, setFlag] = useState(0);

  const appendData = (data) => {
    if (screen == "0" || flag == 1) {
      if (data == "00") {
        Vibration.vibrate();
        Alert.alert("Not Allowed When 0 !");
      }else {
        setScreen(data);
        setSecScreen("");
        setFlag(0);
      }
    } else {
      setScreen(screen + data);
    }
  }

  const validateBeforeEval = () => {
    let last = screen[screen.length - 1];

    if (last == "+" || last == "-" || last == "*" || last == "/" || last == "%") {
      return false;
    } else {
      return true;
    }
  }

  const equalResult = () => {
    if (validateBeforeEval()) {
      setSecScreen(screen);

      let result = (eval(screen)).toString();

      if (result.length > 10) {
        setScreen(result.slice(0, 11));
      } else {
        setScreen(result);
      }

      setFlag(1);
    } else {
      Vibration.vibrate();
      Alert.alert("Invalid Expression !");
    }
  }

  const addArithmetic = (operation) => {
    let last = screen[screen.length - 1]; 

    if(last == operation || last == "+" || last == "-" || last == "*" || last == "/" || last == "%" || last == "."){
      Vibration.vibrate();
      Alert.alert("Not Allowed !");
    }else{
      setScreen(screen + operation);
      setFlag(0);
    }
  }

  const eraseScreen = () => {
    let last = screen[screen.length - 1];

    if (last == undefined || screen.length == 1) {
      clearScreen();
    } else {
      setScreen(screen.slice(0, screen.length - 1));
    }
  }

  const clearScreen = () => {
    setScreen("0");
    setSecScreen("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <Text style={styles.secScreen}>{secScreen}</Text>
        <Text style={styles.screenText}>{screen}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={() => { clearScreen() }}>
            <Text style={styles.buttonText}>C</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => {
            eraseScreen();
          }}>
            <Text style={styles.buttonText}>
              <Icon name="arrow-left" size={26} />
            </Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { addArithmetic("%") }}>
            <Text style={styles.buttonText}>%</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.specBtn]} onPress={() => { addArithmetic("/") }}>
            <Text style={[styles.buttonText, styles.specBtnText]}>/</Text>
          </Pressable>
        </View>
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={() => { appendData("7") }}>
            <Text style={styles.buttonText} >7</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { appendData("8") }}>
            <Text style={styles.buttonText} >8</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { appendData("9") }}>
            <Text style={styles.buttonText}>9</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.specBtn]} onPress={() => { addArithmetic("*") }}>
            <Text style={[styles.buttonText, styles.specBtnText]}>*</Text>
          </Pressable>
        </View>
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={() => { appendData("4") }}>
            <Text style={styles.buttonText}>4</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { appendData("5") }}>
            <Text style={styles.buttonText}>5</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { appendData("6") }}>
            <Text style={styles.buttonText}>6</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.specBtn]} onPress={() => { addArithmetic("-") }}>
            <Text style={[styles.buttonText, styles.specBtnText]}>-</Text>
          </Pressable>
        </View>
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={() => { appendData("1") }}>
            <Text style={styles.buttonText}>1</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { appendData("2") }}>
            <Text style={styles.buttonText}>2</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { appendData("3") }}>
            <Text style={styles.buttonText}>3</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.specBtn]} onPress={() => { addArithmetic("+") }}>
            <Text style={[styles.buttonText, styles.specBtnText]}>+</Text>
          </Pressable>
        </View>
        <View style={styles.buttonRow}>
          <Pressable style={styles.button} onPress={() => { appendData("00") }}>
            <Text style={styles.buttonText}>00</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { appendData("0") }}>
            <Text style={styles.buttonText}>0</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => { addArithmetic(".") }}>
            <Text style={styles.buttonText}>.</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.equalButton]} onPress={() => { equalResult() }}>
            <Text style={[styles.buttonText, styles.equalButtonText]}>=</Text>
          </Pressable>
        </View>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme
  },
  screen: {
    padding: 20,
    paddingBottom: 30,
    flex: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  secScreen: {
    color: "darkgrey",
    fontSize: 30,
    marginBottom: 30
  },
  screenText: {
    color: themeText,
    fontSize: 54,
  },
  buttons: {
    flex: 3,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: buttonsBackground,
    shadowRadius:30,
    shadowColor:"black",
    shadowOpacity:0.55,
    // borderTopLeftRadius:30,
    // borderTopRightRadius:30
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row"
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: buttonBackground,
    margin: 15
  },
  buttonText: {
    color: buttonText,
    fontSize: 30,
    fontWeight: 400
  },
  equalButton: {
    backgroundColor: specButton
  },
  equalButtonText: {
    color: themeText
  },
  specBtn: {
    backgroundColor: "white"
  },
  specBtnText: {
    color: "black"
  }
});
