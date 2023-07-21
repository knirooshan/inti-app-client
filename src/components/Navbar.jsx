import React, { useState } from 'react';
import styled from "styled-components";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import Upload from "./Upload"

const Container = styled.div`
    position:sticky;
    top:0;
    background-color: ${({ theme }) => theme.bgLighter};
`;
const Wrapper = styled.div`
    display:flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px 20px;
    position: relative;
    height: 100%;

`;
const Search = styled.div`
    position: absolute;
    width: 40%;
    left: 0px;
    right: 0px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    color: ${({ theme }) => theme.text};
    width: 100%;
`;
const Button = styled.button`
    padding: 5px 15px;
    background-color: transparent;
    border: 1px solid #3ea6ff;  
    color: #3ea6ff;
    border-radius: 3px;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items:center;
    gap: 5px;
`;

const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-weight: 500;
color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`;

const Navbar = () => {

    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [q, setQ] = useState("");

    const { currentUser } = useSelector(state => state.user)

    return (
        <>
            <Container>
                <Wrapper>
                    <Search>
                        <Input placeholder='Search' onChange={e => setQ(e.target.value)} />
                        <SearchOutlinedIcon onClick={() => navigate(`/search?q=${q}`)} style={{ cursor: "pointer" }} />
                    </Search>
                    {currentUser ? (
                        <User>
                            <VideoCallOutlinedIcon onClick={() => setOpen(true)} style={{ cursor: "pointer" }} />
                            <Avatar src={currentUser.img} />
                            {currentUser.name}
                        </User>
                    ) : <Link to="signin" style={{ textDecoration: "none" }}>
                        <Button>
                            <AccountCircleOutlinedIcon />Sign In
                        </Button>
                    </Link>}
                </Wrapper>
            </Container >
            {open && <Upload setOpen={setOpen} />}
        </>
    )
}

export default Navbar