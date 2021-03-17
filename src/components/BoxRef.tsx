import {BoxProps, Box, forwardRef} from "@chakra-ui/react";

export const BoxRef = forwardRef<BoxProps, "div">((props, ref) => (
    <Box {...props} ref={ref}/>
));
