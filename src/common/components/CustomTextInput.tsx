import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native'

import { palettes } from 'common/theme'

export const CustomTextInput = ({...textInputProps }: TextInputProps) => {
    return (
        <TextInput
            style={{
                borderWidth: 1,
                borderColor: palettes.lightgrey,
                borderRadius: 10,
                marginTop: 20,
                paddingHorizontal: 10
            }}
            {...textInputProps}
        />
    )
}