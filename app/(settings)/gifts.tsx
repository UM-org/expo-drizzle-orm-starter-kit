import { ActivityIndicator, FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import React, { useCallback } from 'react';
import { SelectGift } from '@/db/schema';
import useGifts from '../../hooks/useGifts';
import { Entypo, FontAwesome, Ionicons, Octicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import CleanGiftsModal from '../../components/settings-components/gifts/CleanGiftsModal';
import DeleteGiftModal from '../../components/settings-components/gifts/DeleteGiftModal';
import AddEditGiftModal from '../../components/settings-components/gifts/AddEditGiftModal';
import { useIsFocused } from '@react-navigation/native';

export default function GiftsScreen() {
  const [gifts, setGifts] = React.useState<Array<SelectGift>>([])
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false)
  const [updateModal, setUpdateModal] = React.useState(false)
  const [gift, setGift] = React.useState<SelectGift | null>(null)
  const [isCleanModalOpen, setIsCleanModalOpen] = React.useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const { fetchAllGifts } = useGifts()
  const isFocused = useIsFocused()

  const fetchGifts = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await fetchAllGifts()
      setGifts(res || [])
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    if (isFocused) fetchGifts().then().catch(e => console.log(e))
  }, [isFocused])

  const renderHeader = useCallback(() => {
    if (gifts?.length == 0)
      return <></>
    return (
      <View style={[styles.tableRow]}>
        <Text style={[styles.cell, { flex: 0.1, fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>#</Text>
        <Text style={[styles.cell, { fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>Nom</Text>
        <Text style={[styles.cell, { fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>Quantité initiale</Text>
        <Text style={[styles.cell, { fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>Quantité actuelle</Text>
        <Text style={[styles.cell, { fontSize: 16, fontWeight: "700", color: Colors.light.primary }]}>Actions</Text>
      </View>
    );
  }, [gifts])

  const renderFooter = useCallback(() => {
    return (
      <Text style={[{ paddingVertical: 30, fontSize: 16, fontWeight: "700", color: Colors.light.text, minHeight: 50 }]}></Text>
    );
  }, [])
  const renderItem = (element: ListRenderItemInfo<SelectGift>) => (
    <View key={element?.index} style={[styles.tableRow]}>
      <Text style={[styles.cell, { flex: 0.1, fontSize: 16, fontWeight: "700", }]}>{element?.index + 1}</Text>
      <Text style={[styles.cell, { fontSize: 16, fontWeight: "700" }]}>{element?.item?.name}</Text>
      <Text style={[styles.cell, { fontSize: 16, fontWeight: "700" }]}>{element?.item?.initial_qty}</Text>
      <Text style={[styles.cell, { fontSize: 16, fontWeight: "700" }]}>{element?.item?.actual_qty}</Text>
      <View style={[styles.cell]}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around", gap: 20 }}>
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => { setUpdateModal(true); setGift(element.item) }}>
            <FontAwesome name="edit" size={24} color={"black"} />
          </TouchableOpacity>
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => { setIsDeleteModalOpen(true); setGift(element.item) }}>
            <Ionicons name="trash-bin" size={24} color={Colors.light.error} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

  const renderEmptyList = () => (
    <View style={{ alignItems: "center" }}>
      {!isLoading && <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={{ fontStyle: "italic" }}>Liste vide</Text>
      </View>}
    </View>
  );
  if (isLoading)
    return <View style={[{ padding: 20 }]}><ActivityIndicator size={40} color={Colors.light.primary} /></View>
  return (
    <View style={[{ padding: 20, flex: 1 }]}>
      <View style={[{ padding: 20, flex: 0.9 }]}>
        <FlatList
          refreshing={isLoading}
          onRefresh={fetchGifts}
          data={gifts}
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
          <TouchableOpacity style={[styles.floatingBtn, { marginLeft: 10 }]} onPress={() => setIsAddModalOpen(!isAddModalOpen)}>
            <Entypo name="plus" size={24} color={"#fff"} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.floatingBtn, { backgroundColor: "red", marginLeft: 10 }]} onPress={() => setIsCleanModalOpen(!isCleanModalOpen)}>
            <Octicons name="repo-deleted" size={34} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
      {isAddModalOpen && <AddEditGiftModal gift={null} isVisible={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAdd={() => { fetchGifts(); setIsAddModalOpen(false) }} />}
      {updateModal && gift && <AddEditGiftModal update gift={gift} isVisible={updateModal} onClose={() => setUpdateModal(false)} onAdd={() => { fetchGifts(); setUpdateModal(false) }} />}
      {isCleanModalOpen && <CleanGiftsModal isVisible={isCleanModalOpen} onFinish={async () => { await fetchGifts(); setIsCleanModalOpen(false) }} onClose={() => setIsCleanModalOpen(false)} />}
      {isDeleteModalOpen && <DeleteGiftModal gift={gift} isVisible={isDeleteModalOpen} onFinish={async () => { await fetchGifts(); setIsDeleteModalOpen(false); setGift(null); }} onClose={() => setIsDeleteModalOpen(false)} />}
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
