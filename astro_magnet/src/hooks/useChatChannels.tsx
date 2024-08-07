import { useState, useEffect, useCallback, useContext } from "react";
import firestore from "@react-native-firebase/firestore";
import { FireDoc } from "@app/shared/interfaces/firebase";
import type { ChatRoom } from "@app/shared/interfaces/message";
import {UserContext} from "@app/context/user";
import { useFocusEffect } from "@react-navigation/native";

/**
 * hooks to fetch user's chatrooms
 * @param {(error: string)=>void | undefined} onError - callback function to handle network error
 * @returns {channels: ChatRoom[], loading: boolean} - a list of chatrooms and loading state
 */
export default function useChatChannels(
    onError?: (error: string) => void
) {
    const { profile } = useContext(UserContext);
    const [channels, setChannels] = useState<ChatRoom[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useFocusEffect(
        useCallback(()=>{
            if (!profile) {
                setLoading(false);
                return;
            }
            if (profile.messagingFriendList.length === 0) {
                setLoading(false);
                setChannels([]);
                return;
            }
            const chatRoomIds = profile.messagingFriendList.map((friend) => friend.chatRoomId);
            const unsubscribe = firestore()
                .collection("chatRooms")
                .where(firestore.FieldPath.documentId(), "in", chatRoomIds)
                .onSnapshot(
                    (querySnapshot) => {
                        const list: FireDoc[] = [];
                        querySnapshot.forEach((doc) => {
                            list.push({
                                id: doc.id,
                                ...doc.data(),
                            });
                        });
                        setChannels(list as ChatRoom[]);
                        setLoading(false);
                    },
                    (error) => {
                        setLoading(false);
                        onError && onError("Error fetching chatrooms");
                        console.log("[ERROR] error fetching chatrooms:", error);
                    });
            return unsubscribe;
        },[ profile?.messagingFriendList ])
    );
    return {
        channels,
        loading
    }
}