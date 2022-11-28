import { Input, Icon, Box } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
    value: string;
    onChangeText: (text: string) => void;
    placeholder: string;
    onSend: () => void;
}

export default function InputComponent(props: Props) {
    return (
        <Box
            safeArea
            p={2}
            alignItems="center"
            flexDirection="row"
        >
            <Input
                bgColor="onSecondary"
                color="secondary"
                placeholder={props.placeholder}
                placeholderTextColor="indigo.900"
                onChangeText={props.onChangeText}
                value={props.value}
                borderRadius={10}
                fontSize={18}
                InputRightElement={
                    <Icon
                        as={<MaterialCommunityIcons name="send" />}
                        size="sm"
                        mr={2}
                        color="indigo.900"
                        onPress={props.onSend}
                    />
                }
            />
        </Box>
        
    )
}