import { useQuery } from "@tanstack/react-query";
import * as MediaLibrary from "expo-media-library";

const getRecentSelfies = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status !== "granted") {
    console.error("Permiso denegado");
    return;
  }

  const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
    includeSmartAlbums: true,
  });

  const filterSelfies = fetchedAlbums.find(
    (album) => album.title === "Selfies",
  );

  const fetchAssets = await MediaLibrary.getAssetsAsync({
    album: filterSelfies,
    mediaType: [MediaLibrary.MediaType.photo],
  });

  return fetchAssets;
};

export default function useGetAlbum() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["selfie-albums"],
    queryFn: getRecentSelfies,
  });

  return {
    albums: data?.assets ?? [],
    isLoading: isLoading,
    error: error,
  };
}
