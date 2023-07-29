import { styled } from "styled-components";

export const Container = styled.div`
    width: 300px;
    height: 300px;
    border: 2px solid silver;
    border-radius: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px;
    h1 {
        text-align: center;
    }
    img {
        width: 40%;
    }
`;
