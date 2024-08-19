import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import CButton from "./Button";

type SectionProps = {
  title: string;
  result?: string | Error | null;
  onPress?: () => Promise<string | void> | string | void;
  buttonLabel?: string;
};

export default function WalletAction(props: SectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{props.title}</Text>
        {props.onPress && (
          <CButton
            label={props.buttonLabel || "Submit"}
            onPress={props.onPress}
          />
        )}
      </View>
      {props.result && (
        <View
          style={[
            styles.resultContainer,
            {
              backgroundColor:
                props.result instanceof Error ? "#ff000012" : "#00000008",
            },
          ]}
        >
          <Text
            style={{
              fontFamily: Platform.select({
                ios: "Courier",
                default: "monospace",
              }),
              color: props.result instanceof Error ? "#ff0000" : "#000000",
            }}
          >
            {props.result instanceof Error
              ? props.result.message
              : props.result}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: "#E5E5E5",
    borderRadius: 16,
    borderWidth: 1,
    padding: 8,
    flexDirection: "column",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultContainer: {
    borderRadius: 8,
    padding: 8,
  },
});
