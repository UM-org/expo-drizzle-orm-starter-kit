import React, { useCallback, useContext, useState } from "react";
import { FlatList, ListRenderItemInfo, StyleSheet, View, ActivityIndicator, Text, TouchableOpacity, Alert } from "react-native";
import { Foundation, Octicons } from '@expo/vector-icons';
import useExport from "../../hooks/useExport";
import usePlayers from "../../hooks/usePlayers";
import { SelectPlayer } from "../../db/schema";
import Colors from "../../constants/Colors";
import CleanPlayersModal from "../../components/settings-components/players/CleanPlayersModal";
import { useIsFocused } from "@react-navigation/native";

export default function PlayersScreen() {
  const isFocused = useIsFocused()
  const [players, setPlayers] = useState<Array<SelectPlayer>>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [isCleanModalOpen, setIsCleanModalOpen] = useState(false)
  const { fetchAllPlayers } = usePlayers();
  const { makeCSV } = useExport();

  const onExport = useCallback(async () => {
    if (players?.length == 0)
      return
    try {
      const _players = players.map((p) => ({ ...p, answers: JSON.stringify(p.answers) }))
      await makeCSV(JSON.stringify(_players))
      Alert.alert("Fichier exporté !", "Fichier exporté avec succès.")
    } catch (error) {
      console.log(error);
      Alert.alert("Erreur !", "Le fichier n'a pas pu être exporté ! Veuillez réessayer ultérieurement.")
    }
  }, [players])

  const fetchPlayers = async () => {
    try {
      setIsLoading(true)
      const results = await fetchAllPlayers();
      if (Array.isArray(results))
        setPlayers(results)
    } catch (error) {
      console.log(error);
    }
    finally {
      setIsLoading(false)
    }

  }
  const renderHeader = useCallback(() => {
    if (players?.length == 0)
      return <></>
    return (
      <View style={[styles.tableRow]}>
        <Text style={[styles.cell, { flex: 0.1, fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>#</Text>
        <Text style={[styles.cell, { fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>Nom</Text>
        <Text style={[styles.cell, { fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>Téléphone</Text>
        <Text style={[styles.cell, { fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>Cadeau</Text>
        <Text style={[styles.cell, { fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>Timestamp</Text>
      </View>
    );
  }, [players])

  const renderFooter = useCallback(() => {
    return (
      <Text style={[{ paddingVertical: 30, fontSize: 16, fontWeight: "700", minHeight: 50 }]}></Text>
    );
  }, [])

  const renderItem = (element: ListRenderItemInfo<SelectPlayer>) => (
    <View key={element?.index} style={[styles.tableRow]}>
      <Text style={[styles.cell, { flex: 0.1, fontSize: 16, fontWeight: "700", }]}>{element?.index + 1}</Text>
      <Text style={[styles.cell, { fontSize: 16, fontWeight: "700" }]}>{element?.item?.first_name} {element?.item?.last_name}</Text>
      <Text style={[styles.cell, { fontSize: 16, fontWeight: "700" }]}>{element?.item?.phone}</Text>
      <Text style={[styles.cell, { fontSize: 16, fontWeight: "700" }]}>{element?.item?.gift ?? "-"}</Text>
      <Text style={[styles.cell, { fontSize: 16, fontWeight: "700" }]}>{element?.item?.created_at}</Text>
    </View>
  )

  React.useEffect(() => {
    fetchPlayers().then().catch(err => console.log(err))
  }, [isFocused])

  const renderEmptyList = () => (
    <View style={{ alignItems: "center" }}>
      {!isLoading && <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontStyle: "italic" }}>Liste vide</Text>
      </View>}
    </View>
  );
  if (isLoading)
    return <View style={{ padding: 20 }}><ActivityIndicator size={40} color={Colors.light.primary} /></View>
  return (
    <View style={[{ padding: 20, flex: 1 }]}>
      <View style={[{ padding: 20, flex: 0.9 }]}>
        <FlatList
          refreshing={isLoading}
          onRefresh={fetchPlayers}
          data={players}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyList}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        />
      </View>
      <View style={{ flex: 0.1 }}>
        <Text style={[{ paddingVertical: 5, fontSize: 16, fontWeight: "700", color: Colors.light.text }]}>Powered by Ulysse.</Text>
        <View style={[styles.floatingActionsWrapper]}>
          <TouchableOpacity style={styles.floatingBtn} onPress={onExport}>
            <Foundation name="page-export-csv" size={34} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.floatingBtn, { backgroundColor: "red", marginLeft: 10 }]} onPress={() => setIsCleanModalOpen(!isCleanModalOpen)}>
            <Octicons name="repo-deleted" size={34} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
      {isCleanModalOpen && <CleanPlayersModal isVisible={isCleanModalOpen} onFinish={async () => { await fetchPlayers(); setIsCleanModalOpen(false) }} onClose={() => setIsCleanModalOpen(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  floatingActionsWrapper: {
    position: "absolute",
    right: 20,
    bottom: 20,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  floatingBtn: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 60
  },
  tableRow: {
    flexDirection: "row",
    flex: 1
  },
  cell: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    flex: 1
  }
})