import { images } from "@/constants"
import { Image, Text, View } from "react-native"
import CustomButton from "../../components/mycomponents/CustomButton"
import { router } from "expo-router"

const EmptyState=({title,subtitle})=>{
    return(
        <View className="justify-center items-center px-4">
            <Image source={images.empty} className="w-[300px] h-[300px]" resizeMode="contain"/>
            <Text className='font-pmedium text-sm text-gray-100'>{subtitle}</Text>
            <Text className='text-2xl font-psemibold text-white'>{title}</Text>
            <CustomButton title={"Upload Video"} handlePress={()=>router.push("/(tabs)/create")} containerStyle={"w-full my-2"}/>
        </View>
    )
}

export default EmptyState