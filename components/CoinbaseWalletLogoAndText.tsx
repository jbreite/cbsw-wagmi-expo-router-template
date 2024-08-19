import { StyleSheet, View, Text } from "react-native";
import { CoinbaseWalletLogo } from "./CoinbaseWalletLogo";

export default function CoinbaseWalletLogoAndText() {
  return (
    <View style={styles.headerTextConatiner}>
      <CoinbaseWalletLogo fill="#000" />
      <Text style={styles.headerFont}>Smart Wallet</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerTextConatiner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerFont: { fontSize: 24, fontWeight: "bold" },
});
