import { icons } from "@/constants";
import { useState } from "react";
import { View , Text, TextInput, TouchableOpacity,Image} from "react-native";



const SearchInput = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
  }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (

  
        <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center space-x-4">
          <TextInput
            className="flex-1 text-white font-pregular text-base"
            value={value}
            placeholder={"Search for video topic"}
            placeholderTextColor="#7B7B8B"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
            {...props}
          />
  
          <TouchableOpacity>
            <Image source={icons.search} className="w-5 h-5" resizeMode="contain"/>
          </TouchableOpacity>
        </View>

    );
  };
  
  export default SearchInput;