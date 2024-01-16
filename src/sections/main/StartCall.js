import React from 'react'
import { Dialog, DialogContent, DialogTitle, Slide, Stack } from '@mui/material'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import { MagnifyingGlass } from 'phosphor-react';
import { CallElement } from '../../components/CallElement';
import { MembersList } from '../../data';


// TODO => Create a reusable component
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const StartCall = ({ open, handleClose }) => {
    return (
        <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted sx={{ p: 4 }}>
            {/* Title */}
            <DialogTitle sx={{ mb: 3 }}>Start Call</DialogTitle>
            {/* Content */}
            <DialogContent>
                <Stack alignItems="center" spacing={2}>
                    <Stack sx={{ width: "100%" }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color='#709CE6' />
                            </SearchIconWrapper>
                            <StyledInputBase placeholder='Search...' />
                        </Search>
                    </Stack>
                    {/* Call List */}
                    {MembersList.map((el) => <CallElement {...el} />)}
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default StartCall;