import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const config={
    endpoint: 'https://cloud.appwrite.io/v1',
    platform:"com.metin.aora",
    projectId:"672dfd57003a878462fd",
    databaseId:"672dfe0f003d6a2a83a2",
    userCollectionId:"672dfe2e002a62e1ed41",
    videoCollectionId:"672dfe540009d99966ad",
    storageId:"672dffe1001620579741"
}



// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;
const account = new Account(client);
const avatars = new Avatars(client)
const databases= new Databases(client)

export const createUser= async (email,password,username)=>{
    try{
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if(!newAccount){
            throw new Error('User creation failed')
        }
        const avatarUrl=avatars.getInitials(username)

        await signIn(email,password)
        const newUser= await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId:newAccount.$id,
                email,
                username,
                avatar:avatarUrl
            }
        )
        return newUser;
        
    } catch(error){
        console.log(error)
        throw new Error(error)
    }
}


export async function signIn(email,password){
    try{
        const session=await account.createEmailPasswordSession(email,password)
        return session
    }catch(error){
        throw new Error(error)
    }
}