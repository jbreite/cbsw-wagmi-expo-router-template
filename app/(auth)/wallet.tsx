import Button from "@/components/Button";
import CoinbaseWalletLogoAndText from "@/components/CoinbaseWalletLogoAndText";
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

  const handleDisconnect = () => {
    disconnect();
  };

  const {
    data: signMessageHash,
    error: signMessageError,
    signMessage,
  } = useSignMessage();

  const handleSignMessage = () => {
    signMessage({ message: "Hello world" });
  };

  const { data: capabilitiesData, error: capabilitiesError } =
    useCapabilities();

  return (
    <View style={styles.conatiner}>
      <View style={styles.header}>
        <CoinbaseWalletLogoAndText />
        <Button
          label="Disconnect"
          isLoading={isPendingDisconnect}
          onPress={handleDisconnect}
          disabled={isPendingDisconnect}
          style={{ flex: 3 / 4, paddingVertical: 12 }}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 24, gap: 24 }}
      >
        {address && <CopyAddress address={address} />}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    marginHorizontal: -PADDING_HORIZONTAL,
    paddingHorizontal: PADDING_HORIZONTAL,
  },
  headerTextConatiner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerFont: { fontSize: 24, fontWeight: "bold" },
});
