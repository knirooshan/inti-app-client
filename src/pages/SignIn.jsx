import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from "styled-components";
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';
import { auth, provider } from '../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import { async } from '@firebase/util';


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: calc(100vh - 56px);
color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: ${({ theme }) => theme.bgLighter};
border: 1px solid ${({ theme }) => theme.soft};
padding: 20px 50px;
gap: 10px;
`;

const Title = styled.h1`
font-size: 24px;
`;

const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
`;

const Input = styled.input`
border: 1px solid ${({ theme }) => theme.soft};
border-radius: 3px;
padding: 10px;
background-color: transparent;
width: 100%;
color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
border: none;
border-radius: 3px;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: ${({ theme }) => theme.soft};
color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
display: flex;
font-size: 12px;
margin-top: 10px;
color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
margin-left: 50px;
`;

const Link = styled.span`
margin-left: 22px;
`;

const SignIn = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(loginStart());
        try {
            const res = await axios.post("/auth/signin", { name, password, email });
            dispatch(loginSuccess(res.data));
        } catch (err) {
            dispatch(loginFailure());
        }
    }

    const signInWithGoogle = async () => {
        dispatch(loginStart())
        signInWithPopup(auth, provider).then((result) => {
            axios.post("/auth/google", {
                name: result.user.displayName,
                email: result.user.email,
                img: result.user.photoURL,
            }).then((res) => {
                dispatch(loginSuccess(res.data))
            })
        }).catch((error) => {
            dispatch(loginFailure())
        })
    }

    const handleSignIn = async () => {

    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign In</Title>
                <SubTitle>to continue to IntiEnt</SubTitle>
                <Input placeholder='Username' onChange={e => setName(e.target.value)} />
                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleLogin}>Sign In</Button>
                <Title>Or</Title>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
                <Title>Or</Title>
                <Input placeholder='Username' onChange={e => setName(e.target.value)} />
                <Input placeholder='Email' onChange={e => setEmail(e.target.value)} />
                <Input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <Button onClick={handleSignIn}>Sign Up</Button>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    )
}

export default SignIn