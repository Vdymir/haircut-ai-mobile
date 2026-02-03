import { Typography } from "@/src/core/components/typography";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, TouchableOpacity } from "react-native";

const FacebookAuthButton = () => {
  return (
    <TouchableOpacity style={styles.googleButton}>
      <Ionicons name="logo-facebook" size={18} color={"#fff"} />
      <Typography style={styles.googleButtonText}>
        Continue with Facebook
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    backgroundColor: "#3b5998",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 25,
    gap: 4,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
export default FacebookAuthButton;
