import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Avatar from '../../lib/avatar'; // Assuming Avatar component is in this path
import { icons } from '@/constants';

const VideoCard = ({ video: { title, thumbnailUrl, description, creator, videoUrl } }) => {
    const [play, setPlay] = useState(false);

    return (
        <View className="flex-col items-center px-4 mb-14">
            <View className="flex-row gap-3 items-start">
                <View className="justify-center items-center flex-row flex-1">
                    <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
                        <Avatar creatorName={creator} /> 
                    </View>
                    <View className="justify-center ml-2 gap-y-1 flex-1">
                        <Text className="text-white font-psemibold text-sm" numberOfLines={1}>{title}</Text>
                        <Text className="text-xs text-gray-100 font-pregular" numberOfLines={1}>{creator}</Text>
                    </View>
                </View>
                <View className="pt-5">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            {play ? (
                <Text className='text-white'>Playing</Text>
            ) : (
                <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative flex justify-center items-center"
        >
          <Image
            source={{ uri: thumbnailUrl }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
