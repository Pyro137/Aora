import { Client } from 'react-native-appwrite';


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