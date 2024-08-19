import CButton from "@/components/Button";
import { CoinbaseWalletLogo } from "@/components/CoinbaseWalletLogo";
import CopyAddress from "@/components/CopyAddress";
import WalletAction from "@/components/WalletAction";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import { useCapabilities } from "wagmi/experimental";

const PADDING_HORIZONTAL = 16;

export default function Index() {
  const { disconnect, isPending: isPendingDisconnect } = useDisconnect();
  const { address } = useAccount();
  console.log("address", address);

  const handleDisconnect = () => {
    disconnect();
  };

  const {
    data: signMessageHash,
    error: signMessageError,
    signMessage,
    reset,
    isPending: isPendingMessage,
  } = useSignMessage();

  const handleSignMessage = () => {
    signMessage({ message: "Hello world" });
  };

  const { data: capabilitiesData, error: capabilitiesError } =
    useCapabilities();

  return (
    <View style={styles.conatiner}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 12,
          borderBottomWidth: 1, // Add this to make the border visible
          borderBottomColor: "#000", // Changed from bottomBorderColor
          marginHorizontal: -PADDING_HORIZONTAL,
          paddingHorizontal: PADDING_HORIZONTAL,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <CoinbaseWalletLogo fill="#000" />
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>Smart Wallet</Text>
        </View>
        <CButton
          label="Disconnect"
          isLoading={isPendingDisconnect}
          onPress={handleDisconnect}
          disabled={isPendingDisconnect}
          style={{ flex: 3 / 4, paddingVertical: 12 }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24, gap: 24 }}
      >
        <CopyAddress address={address} />
        <WalletAction
          title="Sign Message"
          result={signMessageHash ?? signMessageError}
          onPress={handleSignMessage}
          buttonLabel="Sign Message"
        />
        <WalletAction
          title="Use Capabilities"
          result={JSON.stringify(
            capabilitiesData ?? capabilitiesError,
            null,
            2
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: PADDING_HORIZONTAL,
  },
});
