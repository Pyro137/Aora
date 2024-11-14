import EmptyState from '@/components/mycomponents/EmptyState';
import SearchInput from '@/components/mycomponents/SearchInput';
import Trending from '@/components/mycomponents/Trending';
import { images } from '@/constants';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, View, Image, RefreshControl } from 'react-native';
import { fetchVideosFromFirestore, fetchLatestVideosFromFirestore } from "../../lib/firebasefunctions";
import { VideoPlayer } from '@/components/mycomponents/YoutubeVideo';
import VideoCard from '@/components/mycomponents/VideoCard';

export default function Page() {
  const [data, setData] = useState([]);
  const [latest, setLatest] = useState([]);  // Set as array instead of null
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch videos from Firestore
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetchVideosFromFirestore();
      setData(response);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  // Fetch data on component mount

  // Function to refetch videos
  const refetch = () => fetchData();

  // Function to get latest videos from Firestore
  const getLatest = async () => {
    setIsLoading(true);
    try {
      const response = await fetchLatestVideosFromFirestore();
      setLatest(response);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLatest();  // Fetch latest videos when component mounts
  }, []);  

  // Function to refetch latest videos
  const getLatestAgain = () => getLatest();

  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);

  // Handle pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  console.log(data);  // Debugging log to check data

  return (
    <View>
      <SignedIn>
        <SafeAreaView className='bg-primary h-full'>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}  // Ensure correct unique key
            renderItem={({ item }) => (
              <VideoCard video={item} />
            )}
            ListHeaderComponent={() => (
              <View className='my-6 px-4 space-y-6'>
                <View className='justify-between items-start flex-row mb-6'>
                  <View>
                    <Text className='font-pmedium text-sm text-gray-100'>Welcome Back</Text>
                    <Text className='text-2xl font-psemibold text-white'>{user?.username || "Username"}</Text>
                  </View>
                  <View className='mt-1.5'>
                    <Image source={images.logoSmall} className='w-9 h-10' resizeMode='contain' />
                  </View>
                </View>
                <SearchInput />
                <View className='w-full flex-1 pt-5 pb-7'>
                  <Text className='text-gray-100 text-lg text-pregular mb-3'>Latest Videos</Text>
                  <Trending posts={latest} />  
                </View>
              </View>
            )}
            ListEmptyComponent={() => (
              <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video" />
            )}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
        </SafeAreaView>
      </SignedIn>
    </View>
  );
}
