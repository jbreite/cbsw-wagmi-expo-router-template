import Button from "@/components/Button";
import CoinbaseWalletLogoAndText from "@/components/CoinbaseWalletLogoAndText";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useConnect } from "wagmi";

export default function Index() {
  const { connect, connectors, isPending } = useConnect();
  const { top, bottom } = useSafeAreaInsets();

  const handleConnect = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <View style={[styles.conatiner, { marginTop: top, marginBottom: bottom }]}>
      <View />
      <View style={{ gap: 12, alignItems: "center" }}>
        <CoinbaseWalletLogoAndText />
        <Text style={styles.subHeading}>
          Template for WAGMI and Expo Router. Connect or create a wallet to use
          a smart wallet.
        </Text>
      </View>
      <Button
        label="Connect Wallet"
        isLoading={isPending}
        isLoadingText="Connecting..."
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
    justifyContent: "space-between",
    gap: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "semibold",
    textAlign: "center",
  },
  subHeading: {
    fontSize: 18,
    fontWeight: "medium",
    textAlign: "center",
  },
});
