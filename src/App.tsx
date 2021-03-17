import React, {useEffect} from 'react';
import {useDispatch, useSelector, shallowEqual} from "react-redux";
import {getAllVillagers} from "./redux/actions/villagers";
import {
    getUnRankedVillagers,
    getVillagerById,
    getVillagersIsLoading,
    getVillagersTiers
} from "./redux/selectors/villagers";
import {HStack, VStack, Box, Heading} from '@chakra-ui/react';
import {TierList} from "./containers/villagers/TierList";
import {VillagerAvatarDraggable} from './containers/villagers/VillagerAvatarDraggable';
import {VillagerAvatar} from "./components/villagers/VillagerAvatar";

function App() {
    const dispatch = useDispatch();
    const villagers = useSelector(getUnRankedVillagers, shallowEqual)
    const zucker = useSelector(getVillagerById(269), shallowEqual)
    const isLoading = useSelector(getVillagersIsLoading)
    const tiers = useSelector(getVillagersTiers, shallowEqual)

    useEffect(() => {
        dispatch(getAllVillagers())
    }, [dispatch])

    if (isLoading) return <p>Loading</p>
    return (
        <VStack bgColor="gray.50" color="gray.800" h="100vh">
            <Box flexGrow={1} w="100%" position="relative">
                <HStack position="absolute" w="100%" h="100%" top={0} left={0} right={0} bottom={0}>
                    <Box h="100%" overflowY="auto" position="relative" flexGrow={1}>
                        {
                            tiers.map(tier => <TierList tier={tier}/>)
                        }
                    </Box>
                    <VStack minW={96} w={96} pl="2rem" h="100%" borderLeftWidth={3} bordrLeftStyle="dotted" borderLeftColor="gray.100" flexWrap="wrap">
                        <Heading  size="sm" my={10} w="100%">Unranked Villagers</Heading>
                        <Box flexGrow={1} w="100%" position="relative" overflowY="auto">
                            <Box position="absolute" top={0} left={0} right={0} bottom={0} overflowY="auto">
                                <HStack w="100%" flexWrap="wrap" pr={5}>
                                    {
                                        villagers.map((villager) => (
                                            <div key={villager.id}>
                                                <VillagerAvatarDraggable villager={villager}/>
                                            </div>
                                        ))
                                    }
                                </HStack>
                            </Box>
                        </Box>
                    </VStack>
                </HStack>
            </Box>
            <HStack w="100%" px={12} flexBasis={24} justifyContent="space-between" bgColor="gray.100" color="gray.500">
                <Heading as="span" display="flex" alignItems="center"
                         size="sm">
                    <span>ACNH Tier List Built with love for{` `}</span>{zucker ?
                    <VillagerAvatar aspectRatioProps={{w: "1.5rem"}} villager={zucker}/> : 'Zucker'}</Heading>
            </HStack>
        </VStack>

    );
}

export default App;
