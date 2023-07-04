import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";

const CourtDetailsPopup = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* {item.courtNumber} */}
            <Text style={styles.courtText}>Court #86855</Text>

            {/* {item.available ? "AVAILABLE" : "WAITLIST"} */}
            <Text style={styles.statusText}>AVAILABLE</Text>

            {/* {item.waitingListParties} */}
            <Text style={styles.waitListText}>0 PARTIES IN WAITING LIST</Text>

            {/* {item.estimatedWaitTime} */}
            <Text style={styles.waitTimeText}>ESTIMATED TIME: 0</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPressIn={() => navigation.navigate("Check In")}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>CHECK IN </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
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
  button: {
    padding: 10,
    elevation: 2,
    alignSelf: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
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
});

// if (!isVisible || !court) {
//   return null;
// }

// const handleCheckIn = () => {
//   // Handle check-in logic here
//   console.log(`Checking in for Court #${court.courtNumber}`);
//   onClose();
// };

// const handleJoinWaitlist = () => {
//   // Handle join waitlist logic here
//   console.log(`Joining waitlist for Court #${court.courtNumber}`);
//   onClose();
// };

// return (
//   <Text>test</Text>
// <Modal
//   visible={isVisible}
//   transparent
//   animationType="fade"
//   onRequestClose={onClose}
// >
//   <View style={styles.popupContainer}>
//     <Text style={styles.courtNumber}>Court #{court.courtNumber}</Text>
//     <Text style={styles.waitingListParties}>
//       {court.waitingListParties} PARTIES IN WAITING LIST
//     </Text>
//     <Text style={styles.estimatedWaitTime}>
//       ESTIMATED TIME: {court.estimatedWaitTime}
//     </Text>
//     <View style={styles.buttonsContainer}>
//       {court.available ? (
//         <TouchableOpacity
//           style={[styles.button, styles.checkInButton]}
//           onPress={handleCheckIn}
//         >
//           <Text style={styles.buttonText}>CHECK IN</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity
//           style={[styles.button, styles.waitlistButton]}
//           onPress={handleJoinWaitlist}
//         >
//           <Text style={styles.buttonText}>JOIN WAITLIST</Text>
//         </TouchableOpacity>
//       )}
//       <TouchableOpacity
//         style={[styles.button, styles.closeButton]}
//         onPress={onClose}
//       >
//         <Text style={styles.buttonText}>CLOSE</Text>
//       </TouchableOpacity>
//     </View>
//   </View>
// </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   popupContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   courtNumber: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 8,
//   },
//   waitingListParties: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   estimatedWaitTime: {
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   buttonsContainer: {
//     flexDirection: "row",
//   },
//   button: {
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//     borderRadius: 4,
//     marginHorizontal: 8,
//   },
//   checkInButton: {
//     backgroundColor: "#B9EF37",
//   },
//   waitlistButton: {
//     backgroundColor: "#EFBB37",
//   },
//   closeButton: {
//     backgroundColor: "#FF0000",
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
// });

export default CourtDetailsPopup;
