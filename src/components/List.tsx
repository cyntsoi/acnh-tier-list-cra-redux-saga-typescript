import React, { PropsWithChildren} from "react";
import {Box, BoxProps, Heading, HStack} from "@chakra-ui/react";

export interface ListPropsWithoutChildren {
    title: string;
    bodyBoxProps?: BoxProps
}

export type ListProps = PropsWithChildren<ListPropsWithoutChildren>

export const List = React.memo<ListProps>(({children, title, bodyBoxProps = {}}) => {
    return <HStack>
        <Box flexBasis={24} flexShrink={0} textAlign="center">
            <Heading size="sm" as="span">
                {title}
            </Heading>
        </Box>
        <Box {...bodyBoxProps} borderRadius={3} p={10} flexGrow={1}>{children}</Box>
    </HStack>
})