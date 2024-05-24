import { jsonToCSV, readRemoteFile } from 'react-native-csv';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { useCallback } from 'react';
import { Alert } from 'react-native';

const useExport = () => {
    const makeCSV = useCallback(async (jsonData: string) => {
        const CSV = jsonToCSV(`${jsonData}`);
        const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
        if (!permissions?.granted) {
            Alert.alert("Permission non accordée !")
            console.log("Permission not Granted!")
            return;
        }
        // Write the file to system
        await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, `${process.env.EXPO_PUBLIC_APP_NAME || "export"}-${Date.now()}.csv`, "text/csv")
            .then(async (uri) => {
                await FileSystem.writeAsStringAsync(uri, CSV, { encoding: FileSystem.EncodingType.UTF8 });
                console.log("CSV File exported !");
            })
            .catch((e) => {
                console.log(e);
            });

    }, [])
    return {
        makeCSV
    }
}
export default useExport;