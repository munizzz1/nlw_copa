import { Button as ButtonNativeBase, Text, IButtonProps } from 'native-base';

interface ButtonProps extends IButtonProps {
    type?: 'PRIMARY' | 'SECONDARY';
    title: string;
}

export function Button(props: ButtonProps) {
    return (
        <ButtonNativeBase 
            _pressed={{
                bg: props.type === 'SECONDARY' ? 'red.600' : 'yellow.600'
            }}
            bg={props.type === 'SECONDARY' ? 'red.500' : 'yellow.500'}
            _loading={{
                _spinner: { color: 'black' }
            }}
            textTransform='uppercase'
            fontSize='md'
            rounded='sm'
            {...props}
            w='full'
            h={14}
        >
            <Text 
                color={props.type === 'SECONDARY' ? 'white' : 'black'}
                fontFamily='heading'
                fontSize='sm'
            >
                {props.title}
            </Text>
        </ButtonNativeBase>
    )
}