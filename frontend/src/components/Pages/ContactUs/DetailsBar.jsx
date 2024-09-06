//DetailsBar.js
import styled from 'styled-components';
import * as Icon from 'react-feather';

const DetailsBarWrapper = styled.div`
  background-color: #5ee0df; /* Matches the button color */
  border-radius: 7px;
  position: relative;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
  padding-bottom: 100px;
  color: black; /* Adjusted to contrast with the background */
  @media (max-width: 768px) {
    padding-bottom: 80px;
    grid-row: 2;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextOne = styled.p`
  text-align: center;
  color: black;
  font-size: 18px;
  font-weight: bold;
`;

const TextTwo = styled.p`
  text-align: center;
  color: black;
  font-size: 12px;
  line-height: 18px;
`;

const BigCircle = styled.div`
  height: 50px;
  margin-top: 30px;
  width: 50px;
  background-color: rgb(252, 113, 137); /* Accent color */
  border-radius: 100%;
  z-index: 22;
  margin-left: 10px;
`;

const SmallCircle = styled.div`
  position: absolute;
  margin-left: 10px;
  background-color: rgb(100, 21, 173); /* Secondary accent color */
  border-radius: 100%;
  height: 30px;
  width: 30px;
`;

const ContactsWrapper = styled.a`
  display: flex;
  width: 200px;
  height: 10px;
  margin-top: 50px;
  cursor: pointer;
  text-decoration: none;
  justify-content: center;
  items-align: center;
`;

const ContactText = styled.div`
  color: black;
  font-size: 15px;
  margin-left: 10px;
`;

const SocialsWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 10px;
  bottom: 30px;
  position: absolute;
  cursor: pointer;
`;

const SocialIconWrapper = styled.a`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: rgb(252, 113, 137); /* Hover color */
  }
`;
const DetailsBar = () => {
  return (
    <DetailsBarWrapper>
      <TextWrapper>
        <TextOne>Contact Information</TextOne>
        <TextTwo>Fill up the form and our team will get back to you within 24 hours</TextTwo>
      </TextWrapper>
      <div>
        <ContactsWrapper href="tel:+233543201893">
          <Icon.Phone size={18} color="rgb(252, 113, 137)" />
          <ContactText>+8801770821121</ContactText>
        </ContactsWrapper>

        <ContactsWrapper href="mailto:aljay3334@gmail.com">
          <Icon.Mail size={18} color="rgb(252, 113, 137)" />
          <ContactText>srreza1999@gmail.com</ContactText>
        </ContactsWrapper>
      </div>

      <div>
        <BigCircle></BigCircle>
        <SmallCircle></SmallCircle>
      </div>

      <SocialsWrapper>
        <SocialIconWrapper href="https://www.facebook.com/srreza1999/">
          <Icon.Facebook color="#fff" size={20} />
        </SocialIconWrapper>
        <SocialIconWrapper href="https://github.com/mohammadSelimReza">
          <Icon.GitHub color="#fff" size={20} />
        </SocialIconWrapper>
        <SocialIconWrapper href="https://www.linkedin.com/in/selim-reza-11903a194/">
          <Icon.Linkedin color="#fff" size={20} />
        </SocialIconWrapper>
      </SocialsWrapper>
    </DetailsBarWrapper>
  );
};

export default DetailsBar;