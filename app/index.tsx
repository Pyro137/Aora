import { StatusBar } from "expo-status-bar";
import { ScrollView,Image, Text,View } from "react-native";
import { Redirect,router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomButton from "@/components/mycomponents/CustomButton";
import { useAuth } from '@clerk/clerk-expo'

export default function App() {

    const { isSignedIn } = useAuth()

    if (isSignedIn) {
      return <Redirect href={'/(tabs)/home'} />
    }
  
    return(
        <SafeAreaView className="bg-primary h-full ">
            <ScrollView contentContainerStyle={{height:"100%"}}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image className="w-[130px] h-[84px]" resizeMode="contain"source={images.logo}/>
                    <Image className="max-w-[380px] w-full h-[300px]" source={images.cards} resizeMode="contain"/>
                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">Discover Endless Possibilities with <Text className="text-secondary-200">Aora</Text></Text>
                    </View>
                    <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on journey limitless exploration with Aora</Text>
                    <CustomButton title="Continue With Email" handlePress={ ()=>{router.push("/(auth)/sign-in")} } containerStyle="w-full mt-7"/>
                </View>

                
            </ScrollView>
            <StatusBar backgroundColor="#161622" style="light"/>
        </SafeAreaView>
    )}