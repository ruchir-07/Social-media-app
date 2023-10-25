import Navbar from "scenes/navbar"
import React from "react";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";

const { Box, useMediaQuery } = require("@mui/material")

const HomePage = () => {

    const isNonMobileScreens = useMediaQuery("(mion-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
            <Box
                display={isNonMobileScreens ? "flex" : "block"}
                justifyContent="space-between"
                width="100%"
                padding="2rem 6%"
                gap="0.5rem"
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined} >
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined : "2rem"} >
                    {/* <PostWidget /> */}
                </Box>

                {isNonMobileScreens && (
                    <Box flexBasis="26%" >
                        {/* <FriendsWidget /> */}
                    </Box>
                
                )}
            </Box>

        </Box>
    );
}

export default HomePage