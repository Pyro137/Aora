
import CustomButton from "@/components/mycomponents/CustomButton";
import FormField from "@/components/mycomponents/FormField";
import { images } from "@/constants";
import { Link, router , useRouter} from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text,View,Image } from "react-native";
import { useSignUp, } from '@clerk/clerk-expo'
import ReactNativeModal from "react-native-modal";
import { addUser } from "../../lib/firebasefunctions";

const SignIn=() =>{
    const { isLoaded, signUp, setActive } = useSignUp()

    //
    const [form,setForm]= useState({
        username:"",
        email: "",
        password: "",
        
    })
    
    const onSignUpPress = async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          if(form.email!='' || form.password!=''){
            await signUp.create({
              username:form.username,
              emailAddress:form.email,
              password:form.password,
            })}else{
              alert("Please fill blanks correctly")
            }
    
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
    
          setVerification({
            ...verification,
            state:"pending"
          })
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2))
        }
      }
      
      const [verification,setVerification]=useState({
        state:"default",
        error:"",
        code:""
      })

      const onPressVerify = async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          const completeSignUp = await signUp.attemptEmailAddressVerification({
            code:verification.code,
          })
    
          if (completeSignUp.status === 'complete') {
            await setActive({ session: completeSignUp.createdSessionId })
            setVerification({...verification, state:"success"})
            
            addUser(form.username,form.email,form.password)

            router.replace("/(tabs)/home")
          } else {
            console.error(JSON.stringify(completeSignUp, null, 2))
            setVerification({...verification, error:"Verification Failed",state:"failed"})
          }
        } catch (err: any) {
        
            setVerification({...verification, error:err.errors[0].longMessage,state:"failed"})
        }
      }
    const [isSubmitting,setisSubmitting]=useState(false)
    
    return(
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-full my-6 px-4 min-h-[85vh]">
                    <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
                    <Text className="text-2xl text-white text-semibold font-psemibold mt-10">Log in to Aora</Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) => setForm({ ...form, username: e })}
                        otherStyles="mt-7"
                        placeholder={"Name"}
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                        placeholder={"Email"}
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                        placeholder={"Password"}
                    />
                    <CustomButton
                        title="Sign Up"
                        handlePress={onSignUpPress}
                        containerStyle="mt-7"
                        isLoading={isSubmitting}
                    />
                              <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have Already Account
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign in
            </Link>
          </View>
          <ReactNativeModal isVisible={verification.state==="pending"} onModalHide={()=>{setVerification({...verification,state:"success"})}}>
            <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                <Text className="text-2xl font-psemibold text-bold mb-2">
                    Verification
                </Text>
                <Text className="mb-5 ">
                    We've sent a verification code. Please check your email and enter the code below.
                </Text>
                <FormField title="Code" placeholder={"12345"} value={verification.code} handleChangeText={(code)=>{setVerification({...verification,code:code})}} otherStyles={"bg-white"}/>
                    {verification.error && (<Text>{verification.error}</Text>)}
                    <CustomButton title={"Verify Email"}  handlePress={onPressVerify}/>
            </View>
          </ReactNativeModal>

            <ReactNativeModal isVisible={verification.state==="success"}>
                <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px] items-center justify-center ">
                    <Text className="text-center text-3xl">Verification Successful</Text>
                    <CustomButton title={"Go to Home Page"} handlePress={()=>router.replace("/(tabs)/home")} containerStyle={"mt-10 "} />
                </View>
            </ReactNativeModal>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )}

export default SignIn;