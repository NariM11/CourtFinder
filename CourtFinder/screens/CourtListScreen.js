import React, { useState, useEffect, useContext } from "react";
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
  RefreshControl,
} from "react-native";

// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import CourtDetailsPopup from "./CourtDetailsPopup";

import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";

// const Tab = createBottomTabNavigator();

import AuthContext from "./AuthContext";
import ModalPopUp from "../assets/components/ModalPopup";

const CourtList = ({ navigation }) => {
  const [courts, setCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [availableModalVisible, setAvailableModalVisible] = useState(false);
  const [waitlistModalVisible, setWaitlistModalVisible] = useState(false);
  const [bookingModalVisible, setBookingModalVisible] = useState(false);
  const [noBookingModalVisible, setNoBookingModalVisible] = useState(false);
  const [selectedCourtNumber, setSelectedCourtNumber] = useState(0);

  const [selectedCourtWaitingList, setSelectedCourtWaitingList] = useState(0);
  const [selectedCourtWaitingTime, setSelectedCourtWaitingTime] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const [selectedBookingType, setSelectedBookingType] = useState("");

  const { loginStatus, username, setLatestBooking, latestBooking } =
    useContext(AuthContext);

  const isDisabled = latestBooking !== null;

  const booked_court = latestBooking ? latestBooking.court_id : "N/A";

  const booked_type = latestBooking ? latestBooking.booking_type : "N/A";

  const booked_ending_time = latestBooking
    ? new Date(latestBooking.play_end_time)
    : "N/A";

  const booked_id = latestBooking ? latestBooking.booking_id : "N/A";

  const MINUTESPERPLAY = 60;

  let time_remaining;

  if (booked_ending_time === "N/A") {
    time_remaining = "N/A";
  } else {
    time_remaining = Math.ceil(
      (new Date(booked_ending_time) - new Date()) / 1000 / MINUTESPERPLAY
    );
  }

  let numPartiesWaiting;

  if (time_remaining === "N/A") {
    numPartiesWaiting = 0;
  } else {
    numPartiesWaiting = Math.ceil(time_remaining / MINUTESPERPLAY);
  }

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

        setBooking();

        setCourts(parsedCourts);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourts();
  }, []);

  const addBooking = async (bookingType) => {
    try {
      const user_email = username;
      const court_id = selectedCourtNumber;
      const booking_type = bookingType;

      console.log(user_email);
      console.log(court_id);
      console.log(booking_type);
      const response = await fetch("http://localhost:5000/addbooking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          user_email,
          court_id,
          booking_type,
        }),
      });

      if (response.ok) {
        // Request was successful
        console.log("booking added!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteBooking = async (booking_id) => {
    try {
      const booking_id = booking_id;
      const response = await fetch("http://localhost:5000/deletebooking", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setBooking = async () => {
    const user_email = username;
    const latestBookingResponse = await fetch(
      "http://localhost:5000/getlatestbooking",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_email }),
      }
    );

    let current_time = new Date();
    // const userTimezoneOffset = current_time.getTimezoneOffset(); // Get local timezone offset in minutes

    const latestBookingData = await latestBookingResponse.json();

    if (latestBookingData !== 0) {
      if (new Date(latestBookingData.play_end_time) > current_time) {
        setLatestBooking(latestBookingData);
      } else {
        setLatestBooking(null);
      }
    } else {
      setLatestBooking(null);
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch("http://localhost:5000/getcourts");
      const data = await response.json();

      const parsedCourts = data.map((court) => ({
        courtNumber: court.id,
        available: court.status === "available",
        waitingListParties: court.numPartiesWaiting,
        estimatedWaitTime: `${court.estimatedTimeRemaining} minutes`,
      }));

      setBooking();

      setCourts(parsedCourts);
    } catch (error) {
      console.error(error);
    }
  };

  function handlePress(BookingType) {
    setSelectedBookingType(BookingType);

    console.log(BookingType);

    // let latestBooking = {
    //   selectedCourtNumber: selectedCourtNumber,
    //   bookingDateTime: new Date(),
    // };
    // setLatestBooking(latestBooking);

    addBooking(BookingType);
    console.log(selectedBookingType);

    if (BookingType == "checked in") {
      navigation.navigate("Check In", { selectedCourtNumber });
    } else {
      navigation.navigate("Waitlist", {
        selectedCourtNumber,
        selectedCourtWaitingList,
        selectedCourtWaitingTime,
      });
    }
  }

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
          {item.waitingListParties} PARTIES IN FRONT
        </Text>
        <Text style={styles.estimatedWaitTime}>
          ESTIMATED TIME: {item.estimatedWaitTime}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              if (!isDisabled) {
                if (item.available) {
                  handleAvailableButtonPress(item);
                } else {
                  handleWaitlistButtonPress(item);
                }
              }
            }}
            style={[
              styles.button,
              isDisabled && styles.disabledButton,
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

  const handleBookingButtonPress = () => {
    if (latestBooking !== null) {
      setBookingModalVisible(true);
    } else {
      setNoBookingModalVisible(true);
    }
  };

  const handleCancelButtonPress = () => {
    if (latestBooking !== null) {
      console.log(booked_id);
      deleteBooking(booked_id);
    }
  };

  return (
    // replace with <CourtDetailsPopUp/> and import at top

    <SafeAreaView style={styles.container}>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />

      <View style={styles.centeredView}>
        <ModalPopUp
          visible={availableModalVisible}
          onRequestClose={() => setAvailableModalVisible(false)}
          courtText={`Court ${selectedCourtNumber}`}
          statusText="AVAILABLE"
          waitListText={`${selectedCourtWaitingList} PARTIES IN FRONT`}
          waitTimeText={`ESTIMATED TIME: ${selectedCourtWaitingTime}`}
          buttonText="CHECK IN"
          onPressButton={() => handlePress("checked in")}
          modalView={styles.availableView}
        />
        {/* <Modal
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
                    setAvailableModalVisible(false);
                    console.log("test");
                  }}
                >
                  <Text style={styles.modalHeaderCloseText}>X</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={styles.courtText}
              >{`Court ${selectedCourtNumber}`}</Text>

              <Text style={styles.statusText}>AVAILABLE</Text>

              <Text
                style={styles.waitListText}
              >{`${selectedCourtWaitingList} PARTIES IN THE WAITING LIST`}</Text>

              <Text
                style={styles.waitTimeText}
              >{`ESTIMATED TIME: ${selectedCourtWaitingTime}`}</Text>
              <Pressable
                style={[styles.popupButton, styles.popupButtonClose]}
                onPressIn={() =>
                  // navigation.navigate("Check In", { selectedCourtNumber })
                  handlePress("checked in")
                }
                // onPress={setSelectedBookingType("checked in")}
                // onPress={addBooking}
                onPress={() => setAvailableModalVisible(false)}
              >
                <Text style={styles.textStyle}>CHECK IN </Text>
              </Pressable>
            </View>
          </View>
        </Modal> */}

        <ModalPopUp
          visible={waitlistModalVisible}
          onRequestClose={() => setWaitlistModalVisible(false)}
          courtText={`Court ${selectedCourtNumber}`}
          statusText="WAITLIST"
          waitListText={`${selectedCourtWaitingList} PARTIES IN FRONT`}
          waitTimeText={`ESTIMATED TIME: ${selectedCourtWaitingTime}`}
          buttonText="JOIN WAITLIST"
          onPressButton={() => handlePress("waitlist")}
          modalView={styles.waitlistView}
        />
        {/* <Modal
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
                    setWaitlistModalVisible(false);
                    console.log("test");
                  }}
                >
                  <Text style={styles.modalHeaderCloseText}>X</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={styles.courtText}
              >{`Court ${selectedCourtNumber}`}</Text>

              <Text style={styles.statusText}>WAITLIST</Text>

              <Text
                style={styles.waitListText}
              >{`${selectedCourtWaitingList} PARTIES IN THE WAITING LIST`}</Text>

              <Text
                style={styles.waitTimeText}
              >{`ESTIMATED TIME: ${selectedCourtWaitingTime}`}</Text>
              <Pressable
                style={[styles.popupButton, styles.popupButtonClose]}
                onPressIn={
                  () => handlePress("waitlist")

                  // navigation.navigate("Waitlist", {
                  //   selectedCourtNumber,
                  //   selectedCourtWaitingList,
                  //   selectedCourtWaitingTime,
                  // })
                }
                onPress={() => setWaitlistModalVisible(false)}
              >
                <Text style={styles.textStyle}>JOIN WAITLIST</Text>
              </Pressable>
            </View>
          </View>
        </Modal> */}

        <ModalPopUp
          visible={bookingModalVisible}
          onRequestClose={() => setBookingModalVisible(false)}
          courtText={`Court ${booked_court}`}
          statusText={`Booking Type: ${booked_type.toUpperCase()}`}
          waitListText={`${numPartiesWaiting - 1} PARTIES IN FRONT`}
          waitTimeText={
            time_remaining <= 60
              ? `REMAINING TIME: ${time_remaining} MINUTES`
              : `WAITING TIME: ${time_remaining - 60} MINUTES`
          }
          buttonText="CANCEL"
          onPressButton={() => handleCancelButtonPress()}
          modalView={styles.bookingView}
        />

        <ModalPopUp
          visible={noBookingModalVisible}
          onRequestClose={() => setNoBookingModalVisible(false)}
          // courtText="NO BOOKINGS"
          // statusText={`Booking Type: ${booked_type.toUpperCase()}`}
          // // waitListText={`${selectedCourtWaitingList} PARTIES IN THE WAITING LIST`}
          // waitTimeText={`REMAINING TIME: ${time_remaining} MINUTES`}
          // buttonText="CANCEL"
          // onPressButton={() => handlePress("waitlist")}
          noBookingText="YOU HAVE NO BOOKINGS"
          noBooking={true}
          modalView={styles.noBookingView}
        />

        {/* need to update with correct booking info instead of waitlist info */}
        {/* <Modal
          animationType="none"
          transparent={true}
          visible={bookingModalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setBookingModalVisible(!bookingModalVisible); //
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.bookingView}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}></View>
                <TouchableOpacity
                  onPress={() => {
                    setBookingModalVisible(false);
                    console.log("test");
                  }}
                >
                  <Text style={styles.modalHeaderCloseText}>X</Text>
                </TouchableOpacity>
              </View>
              <Text
                style={styles.courtText}
              >{`Court ${selectedCourtNumber}`}</Text>

              <Text style={styles.statusText}>WAITLIST</Text>

              <Text
                style={styles.waitListText}
              >{`${selectedCourtWaitingList} PARTIES IN THE WAITING LIST`}</Text>

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
        </Modal> */}
      </View>

      <View style={styles.bookingButtonView}>
        <TouchableOpacity
          onPress={() => {
            handleBookingButtonPress();
          }}
          style={[styles.button, styles.bookingButton]}
        >
          <Text style={styles.buttonText}>YOUR BOOKINGS</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginBottom: 0,
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
  },
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

  disabledButton: {
    opacity: 0.5,
  },

  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginTop: 22,
  // },
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

  bookingView: {
    margin: 20,
    backgroundColor: "#F8602F",
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

  noBookingView: {
    margin: 20,
    backgroundColor: "#F8602F",
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

  // modalHeader: {
  //   flexDirection: "row",
  //   marginBottom: 30,
  // },
  /* The header takes up all the vertical space not used by the close button. */
  // modalHeaderContent: {
  //   flexGrow: 1,
  // },
  // modalHeaderCloseText: {
  //   alignItems: "flex-end",
  //   paddingLeft: 5,
  //   paddingRight: 5,
  //   fontWeight: "bold",
  // },

  // popupButton: {
  //   padding: 10,
  //   elevation: 2,
  //   alignSelf: "center",
  // },
  // popupButtonOpen: {
  //   backgroundColor: "#F194FF",
  // },
  // popupButtonClose: {
  //   backgroundColor: "black",
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center",
  // },
  // courtText: {
  //   fontSize: 30,
  //   fontWeight: "bold",
  //   textAlign: "center",
  //   marginBottom: 15,
  // },

  // statusText: {
  //   fontSize: 20,
  //   marginBottom: 50,
  //   textAlign: "center",
  //   color: "white",
  // },

  // waitListText: {
  //   fontSize: 15,
  //   marginBottom: 15,
  //   textAlign: "center",
  //   color: "black",
  // },

  // waitTimeText: {
  //   fontSize: 15,
  //   marginBottom: 60,
  //   textAlign: "center",
  //   color: "black",
  // },

  bookingButtonView: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  bookingButton: {
    backgroundColor: "#F8602F",
  },
};

export default CourtList;
