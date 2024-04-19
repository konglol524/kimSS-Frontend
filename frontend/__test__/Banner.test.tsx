import {render, screen} from "@testing-library/react";
import Banner from "@/components/Banner";
import React from 'react';
import { SessionProvider } from "next-auth/react"

interface WrapperProps {
    children: React.ReactNode;
    session: any;
}

const Wrapper = ({ children, session }: WrapperProps) => (
    <SessionProvider session={session}>{children}</SessionProvider>
);

const mockSession = {
    user: {
        data: {
            _id: '123',
            name: 'Tester',
            email: '123',
            role: 'user',
            token: '123'                
        }
    }
};

describe('Banner', ()=>{

    beforeEach(()=>{
        render(
            <Wrapper session={mockSession}>
               <Banner/> 
            </Wrapper>
        );        
    })

    it('should have an image', async ()=>{
        const bannerImage = screen.getByRole('img');
        expect(bannerImage).toBeInTheDocument();
    })

    it("should display user's name", ()=>{
        const userText = screen.getByTestId("welcome");
        expect(userText).toHaveTextContent("Welcome Tester");
    })

    it("should have a button", ()=>{
        const button = screen.getByText("Make Your Reservation");
        expect(button).toBeInTheDocument();
    })

})

