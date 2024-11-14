import CustomButton from "@/components/mycomponents/CustomButton";
import FormField from "@/components/mycomponents/FormField";
import { images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Image } from "react-native";
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import React from 'react';

const SignIn = () => {
    const { signIn, setActive, isLoaded } = useSignIn();
    const router = useRouter();
    
    // Form state
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Sign-in handler
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return;

        setIsLoading(true);
        setError("");

        try {
            const signInAttempt = await signIn.create({
                identifier: form.email,
                password: form.password,
            });

            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace("/(tabs)/home");
            } else {
                setError("Sign-in attempt was not successful.");
                console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            setError("Invalid email or password. Please try again.");
            console.error(JSON.stringify(err, null, 2));
        } finally {
            setIsLoading(false);
        }
    }, [isLoaded, form]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-full my-6 px-4 min-h-[85vh]">
                    <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
                    <Text className="text-2xl text-white text-semibold font-psemibold mt-10">Log in to Aora</Text>
                    
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                        placeholder={"Email Address"}
                    />

                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                        placeholder={"Password"}
                    />

                    {error ? <Text className="text-red-500 mt-2">{error}</Text> : null}

                    <CustomButton
                        title={isLoading ? "Signing In..." : "Sign In"}
                        handlePress={onSignInPress}
                        containerStyle="mt-7"
                        isLoading={isLoading}
                    />

                    <View className="flex justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
                            Sign up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
