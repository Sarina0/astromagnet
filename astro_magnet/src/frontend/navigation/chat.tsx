import {createNativeStackNavigator} from "@react-navigation/native-stack";
import { Dispatch, SetStateAction } from "react";
import { ColorPalette } from "@app/theme/colors";
import Room from "@app/frontend/screens/chat/room";
import Rooms from "@app/frontend/screens/chat/rooms";

export type ChatStackParamList = {
    rooms: undefined;
    room: {
        id: string;
        name: string;
        profilePic: string;
    }
}

const Stack = createNativeStackNavigator<ChatStackParamList>();

interface Props {
    setMenuVisible: Dispatch<SetStateAction<boolean>>;
};

export default function ChatNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                animation:"none",
                animationDuration: 300,
                headerStyle:{
                    backgroundColor: ColorPalette.DARK_VIOLET_2,
                },
                headerTintColor: ColorPalette.SOFT_MAGENTA,
                headerTitleStyle: {
                    fontWeight: "bold",
                },   
            }}       
            initialRouteName="rooms"
        >
            <Stack.Screen
                name="rooms"
                component={Rooms}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="room"
                children={
                    (props) => <Room {...props} />
                }
                options={({ route }) => ({
                    title: route.params.name,
                    headerBackTitleVisible: false,
                })}
            />
        </Stack.Navigator>
    )
}