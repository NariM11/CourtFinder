import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CourtDetailsPopup from "./CourtDetailsPopup";

const CourtList = ({ navigation }) => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [availableModalVisible, setAvailableModalVisible] = useState(false);
  const [waitlistModalVisible, setWaitlistModalVisible] = useState(false);
  const [selectedCourtNumber, setSelectedCourtNumber] = useState(0);

  const [selectedCourtWaitingList, setSelectedCourtWaitingList] = useState(0);
  const [selectedCourtWaitingTime, setSelectedCourtWaitingTime] = useState(0);

  useEffect(() => {
    const fetchCourts = async () => {
      try {
        const response = await fetch("http://localhost:5000/getcourts");
        const data = await response.json();

        // Parse and transform the data to match the desired naming convention
        const parsedCourts = data.map((court) => ({
          courtNumber: court.id,
          available: court.status === "available",
          waitingListParties: court.numPartiesWaiting,
          estimatedWaitTime: `${court.estimatedTimeRemaining} minutes`,
        }));

        setCourts(parsedCourts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourts();
  }, []);

  const renderItem = ({ item }) => {
    const isSelected = selectedCourt === item.courtNumber;

    return (
      <View
        style={[
          styles.courtContainer,
          isSelected && styles.selectedCourtContainer,
        ]}
      >
        <Text
          style={[styles.courtNumber, isSelected && styles.selectedCourtNumber]}
        >
          Court # {item.courtNumber}
        </Text>
        <Text style={styles.waitingListParties}>
          {item.waitingListParties} PARTIES IN WAITING LIST
        </Text>
        <Text style={styles.estimatedWaitTime}>
          ESTIMATED TIME: {item.estimatedWaitTime}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              // navigation.navigate("Court Details");
              if (item.available) {
                handleAvailableButtonPress(item);
                // setSelectedCourtAvailability(item.available);
                // setSelectedCourtNumber(item.courtNumber);
                // setSelectedCourtWaitingList(item.waitingListParties);
                // setSelectedCourtWaitingTime(item.estimatedWaitTime);
              } else {
                handleWaitlistButtonPress(item);
                // setSelectedCourtAvailability(item.available);
                // setSelectedCourtNumber(item.courtNumber);
                // setSelectedCourtWaitingList(item.waitingListParties);
                // setSelectedCourtWaitingTime(item.estimatedWaitTime);
              }
            }}
            style={[
              styles.button,
              item.available ? styles.availableButton : styles.waitlistButton,
            ]}
          >
            <Text style={styles.buttonText}>
              {item.available ? "AVAILABLE" : "WAITLIST"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleAvailableButtonPress = (item) => {
    setAvailableModalVisible(true);
    setSelectedCourtNumber(item.courtNumber);
    setSelectedCourtWaitingList(item.waitingListParties);
    setSelectedCourtWaitingTime(item.estimatedWaitTime);
  };

  const handleWaitlistButtonPress = (item) => {
    setWaitlistModalVisible(true);
    setSelectedCourtNumber(item.courtNumber);
    setSelectedCourtWaitingList(item.waitingListParties);
    setSelectedCourtWaitingTime(item.estimatedWaitTime);
  };

  return (
    // replace with <CourtDetailsPopUp/> and import at top
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../assets/logo_green.png")}
          style={styles.logo}
        />
      </View>
      <Text style={styles.title}>SELECT COURT</Text>
      <View style={styles.titleSpacing} />
      <FlatList
        data={courts}
        renderItem={renderItem}
        keyExtractor={(item) => item.courtNumber.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.centeredView}>
        <Modal
          animationType="none"
          transparent={true}
          visible={availableModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setAvailableModalVisible(!availableModalVisible); //
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.availableView}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}></View>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("Court Details");
                    setAvailableModalVisible(false);
                    console.log("test");
                  }}
                >
                  <Text style={styles.modalHeaderCloseText}>X</Text>
                </TouchableOpacity>
              </View>
              {/* {item.courtNumber} */}
              <Text
                style={styles.courtText}
              >{`Court ${selectedCourtNumber}`}</Text>

              {/* {item.available ? "AVAILABLE" : "WAITLIST"} */}
              <Text style={styles.statusText}>AVAILABLE</Text>

              {/* {item.waitingListParties} */}
              <Text
                style={styles.waitListText}
              >{`${selectedCourtWaitingList} PARTIES IN THE WAITING LIST`}</Text>

              {/* {item.estimatedWaitTime} */}
              <Text
                style={styles.waitTimeText}
              >{`ESTIMATED TIME: ${selectedCourtWaitingTime}`}</Text>
              <Pressable
                style={[styles.popupButton, styles.popupButtonClose]}
                onPressIn={() =>
                  navigation.navigate("Check In", { selectedCourtNumber })
                }
                onPress={() => setAvailableModalVisible(false)}
              >
                <Text style={styles.textStyle}>CHECK IN </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="none"
          transparent={true}
          visible={waitlistModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setWaitlistModalVisible(!waitlistModalVisible); //
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.waitlistView}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}></View>
                <TouchableOpacity
                  onPress={() => {
                    // navigation.navigate("Court Details");
                    setWaitlistModalVisible(false);
                    console.log("test");
                  }}
                >
                  <Text style={styles.modalHeaderCloseText}>X</Text>
                </TouchableOpacity>
              </View>
              {/* {item.courtNumber} */}
              <Text
                style={styles.courtText}
              >{`Court ${selectedCourtNumber}`}</Text>

              {/* {item.available ? "AVAILABLE" : "WAITLIST"} */}
              <Text style={styles.statusText}>WAITLIST</Text>

              {/* {item.waitingListParties} */}
              <Text
                style={styles.waitListText}
              >{`${selectedCourtWaitingList} PARTIES IN THE WAITING LIST`}</Text>

              {/* {item.estimatedWaitTime} */}
              <Text
                style={styles.waitTimeText}
              >{`ESTIMATED TIME: ${selectedCourtWaitingTime}`}</Text>
              <Pressable
                style={[styles.popupButton, styles.popupButtonClose]}
                onPressIn={() =>
                  navigation.navigate("Waitlist", {
                    selectedCourtNumber,
                    selectedCourtWaitingList,
                    selectedCourtWaitingTime,
                  })
                }
                onPress={() => setWaitlistModalVisible(false)}
              >
                <Text style={styles.textStyle}>JOIN WAITLIST</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginRight: 8,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  titleSpacing: {
    marginBottom: 40, // Add spacing between the title and the court list
  },
  listContainer: {
    paddingBottom: 16,
  },
  courtContainer: {
    backgroundColor: "rgba(185, 239, 55, 0.4)", // Set the background color with opacity
    borderRadius: 8,
    padding: 16,
    marginBottom: 50,
    marginRight: 20,
    marginL: 20,
    // TouchableOpacity: 0.5,
  },
  // selectedCourtContainer: {
  //   backgroundColor: "#C0C0C0",
  // },
  courtNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },
  selectedCourtNumber: {
    color: "#FFFFFF",
  },

  waitingListParties: {
    marginTop: 8,
  },
  estimatedWaitTime: {
    marginTop: 8,
  },
  buttonContainer: {
    alignItems: "flex-end", // Align the button to the right
    marginTop: 16,
    marginL: "auto",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  availableButton: {
    backgroundColor: "#B9EF37",
  },
  waitlistButton: {
    backgroundColor: "#EFBB37",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  availableView: {
    margin: 20,
    backgroundColor: "#B9EF37",
    borderRadius: 20,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  waitlistView: {
    margin: 20,
    backgroundColor: "#EFBB37",
    borderRadius: 20,
    padding: 35,
    alignItems: "left",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    marginBottom: 30,
  },
  /* The header takes up all the vertical space not used by the close button. */
  modalHeaderContent: {
    flexGrow: 1,
  },
  modalHeaderCloseText: {
    alignItems: "flex-end",
    paddingLeft: 5,
    paddingRight: 5,
    fontSize: "bold",
  },

  popupButton: {
    padding: 10,
    elevation: 2,
    alignSelf: "center",
  },
  popupButtonOpen: {
    backgroundColor: "#F194FF",
  },
  popupButtonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  courtText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  statusText: {
    fontSize: 20,
    marginBottom: 50,
    textAlign: "center",
    color: "white",
  },

  waitListText: {
    fontSize: 15,
    marginBottom: 15,
    textAlign: "center",
    color: "black",
  },

  waitTimeText: {
    fontSize: 15,
    marginBottom: 60,
    textAlign: "center",
    color: "black",
  },
};

export default CourtList;
