import { useState } from "react";
import { Text, View } from "react-native"


const Create=()=>{
  const [form,setForm]= useState({
    creator:"",
    description: "",
    thumbnailUrl: "",
    title: "",
    videoUrl: "", 
})


  return(
  <View>
      <Text className="text-3xl">Create</Text>
    </View>
  )
}

export default Create;