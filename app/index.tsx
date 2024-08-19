import CButton from "@/components/Button";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useConnect, useDisconnect } from "wagmi";

export default function Index() {
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <View style={styles.conatiner}>
      <View style={{ gap: 12 }}>
        <Text style={styles.title}>
          CBSW with WAGMI and Expo Router Template{" "}
        </Text>
        <Text style={styles.subHeading}>
          Connect or create a wallet to see smart wallet capabilities
        </Text>
      </View>
      <CButton
        label="Connect Wallet"
        isLoading={isPending}
        onPress={handleConnect}
        disabled={isPending}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "semibold",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "medium",
    textAlign: "center",
  },
});
