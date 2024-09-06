import styled from 'styled-components';
import DetailsBar from './DetailsBar';
import InputSide from './InputSide';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  background-color: whitesmoke;
  padding-bottom: 50px;
`;

const PageHeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const FormContainer = styled.div`
  width: 70%;
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  height: 70vh;
  display: flex;
  @media (max-width: 768px) {
    width: 90%;
    flex-direction: column; /* Stack vertically on smaller screens */
    height: auto; /* Auto height on smaller screens */
  }
`;

const StyledDetailsBar = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
    margin-bottom: 20px; /* Add spacing between sections */
  }
`;

const StyledInputSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 768px) {
    width: 100%; /* Full width on smaller screens */
  }
`;

const TextOne = styled.b`
  font-size: 30px;
  color: rgb(4, 4, 59);
  text-align: center;
  @media (max-width: 768px) {
    font-size: 24px; /* Smaller font size on smaller screens */
  }
`;

const TextTwo = styled.p`
  color: rgb(4, 4, 34);
  font-size: 15px;
  text-align: center;
  @media (max-width: 768px) {
    font-size: 13px; /* Smaller font size on smaller screens */
  }
`;

const ContactUs = () => {
  return (
    <PageWrapper>
      <PageHeadingWrapper>
        <TextOne>Contact Us</TextOne>
        <TextTwo>Any Question or remarks? Just write us a message</TextTwo>
      </PageHeadingWrapper>
      <FormContainer>
        <StyledDetailsBar>
          <DetailsBar />
        </StyledDetailsBar>
        <StyledInputSide>
          <InputSide />
        </StyledInputSide>
      </FormContainer>
    </PageWrapper>
  );
};

export default ContactUs;
