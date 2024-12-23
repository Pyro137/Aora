import { Tabs ,Redirect} from "expo-router"
import { View,Text,Image } from "react-native"
import { icons } from "../../constants";

const TabIcon=({icon,color,focused,name}) => {
    return(<View className="items-center justify-center gap-2 mt-1">
        <Image  
            source={icon}
            resizeMode="contain"
            tintColor={color}
            className="w-6 h-6"
        />
        <Text className={`${focused ? 'font-psemibold':'font-pregular'} text-xs` } style={{color:color}}>{name}</Text>
    </View>)
}

const TabsLayout=() => {
   
    
    return(
        <>
            <Tabs screenOptions={{
                tabBarShowLabel:false,
                tabBarActiveTintColor:'#FFA001',
                tabBarInactiveTintColor:'#9B9B9B',
                tabBarStyle:{backgroundColor:'#161622',borderTopWidth:1,borderTopColor:"#232533",height:84},
            }}>
                <Tabs.Screen name="home" options={{
                    title: "Home",
                    tabBarIcon: ({ color,focused }) =>(
                        <TabIcon icon={icons.home} color={color} name="Home" focused={focused}  />
                     ),
                    
                     
                }}/>

                <Tabs.Screen name="bookmark" options={{
                    title: "Bookmark",
                    tabBarIcon: ({color,focused }) =>(
                        <TabIcon icon={icons.bookmark} color={color} name="Bookmark" focused={focused}  />
                     )
                }}/>

                <Tabs.Screen name="create" options={{
                    title: "Create",
                    tabBarIcon: ({ color,focused}) =>(
                        <TabIcon icon={icons.plus} color={color} name="Create" focused={focused}  />
                     )
                }}/>

                <Tabs.Screen name="profile" options={{
                    title: "Profile",
                    tabBarIcon: ({ color,focused }) =>(
                        <TabIcon icon={icons.profile} color={color} name="Profile" focused={focused}  />
                     )
                }}/>    
            </Tabs>
        </>
    )
}
export default TabsLayout