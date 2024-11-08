
import CustomButton from "@/components/mycomponents/CustomButton";
import FormField from "@/components/mycomponents/FormField";
import { images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text,View,Image } from "react-native";
import { useSignIn } from '@clerk/clerk-expo'
import { useRouter,router } from 'expo-router'
import {  TextInput, Button } from 'react-native'
import React from 'react'

const SignIn=() =>{
    const { signIn, setActive, isLoaded } = useSignIn()

    //
    const [form,setForm]= useState({
        email: "",
        password: "",
        
    })
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) {
          return
        }
    
        try {
          const signInAttempt = await signIn.create({
            identifier:form.email,
            password:form.password,
          })
    
          if (signInAttempt.status === 'complete') {
            await setActive({ session: signInAttempt.createdSessionId })
            router.replace("/(tabs)/home")
          } else {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(signInAttempt, null, 2))
          }
        } catch (err: any) {
          console.error(JSON.stringify(err, null, 2))
        }
      }, [isLoaded, form])
    //

    //
    const [isSubmitting,setisSubmitting]=useState(false)

    return(
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-full my-6 px-4 min-h-[85vh]">
                    <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]"/>
                    <Text className="text-2xl text-white text-semibold font-psemibold mt-10">Log in to Aora</Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                    />
                    <CustomButton
                        title="Sign In"
                        handlePress={onSignInPress}
                        containerStyle="mt-7"
                        isLoading={isSubmitting}
                    />
                              <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    )}

export default SignIn;