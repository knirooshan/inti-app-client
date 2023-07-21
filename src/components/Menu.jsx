import React from "react";
import styled from "styled-components";
import IntiEnt from "../imgs/logo.png";
import HomeIcon from '@mui/icons-material/Home';
//import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../redux/userSlice';
import LogoutOutlined from '@mui/icons-material/LogoutOutlined'



const Container = styled.div`
flex:1;
background-color:${({ theme }) => theme.bgLighter};
height: 100vh;
color:${({ theme }) => theme.text};
font-size:14px;
position: sticky;
top:0;
`;

const Wrapper = styled.div`
padding: 18px 26px;
`;

const Logo = styled.div`
display: flex;
align-items: center;
gap: 5px;
margin-bottom: 25px;
`;

const Img = styled.img`
height:75px;
`;


const Item = styled.div`
display: flex;
align-items: center;
gap: 20px;
cursor: pointer;
padding: 7.5px 0;

&:hover{
    background-color: ${({ theme }) => theme.soft};
}

`;

const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
    
`;

const Logout = styled.div`
    
`;

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items:center;
gap: 5px;
`;


const Menu = ({ setDarkMode, darkMode }) => {

    const { currentUser } = useSelector(state => state.user)

    const dispatch = useDispatch();

    const signOut = async () => {
        try {
            await // your sign out logic here
                dispatch(logout());
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Wrapper>
                <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    <Logo>
                        <Img src={IntiEnt} />
                    </Logo>
                </Link>
                <Item>
                    <HomeIcon />
                    Home
                </Item>
                <Hr />
                {!currentUser && <><Login>
                    Sign in to Like and Subscribe
                    <Link to="signin" style={{ textDecoration: "none" }}>
                        <Button><AccountCircleOutlinedIcon />Sign In</Button>
                    </Link>
                </Login>
                    <Hr /></>}
                <Link to="subscriptions" style={{ textDecoration: "none", color: "inherit" }}>
                    <Item>
                        <SubscriptionsOutlinedIcon />
                        Subscriptions
                    </Item>
                </Link>
                <Item>
                    <GradeOutlinedIcon />
                    Favorites
                </Item>

                <Item>
                    <HistoryOutlinedIcon />
                    History
                </Item>
                <Hr />
                <Item>
                    <SettingsOutlinedIcon />
                    Settings
                </Item>
                <Item onClick={() => setDarkMode(!darkMode)}>
                    <LightModeOutlinedIcon />
                    {darkMode ? "Light" : "Dark"} Mode
                </Item>
                {currentUser && <>
                    <Hr />
                    <Logout>

                        <Button onClick={signOut} style={{ textDecoration: "none" }}><LogoutOutlined />Sign Out</Button>

                    </Logout></>}

            </Wrapper>
        </Container>
    )
}

export default Menu