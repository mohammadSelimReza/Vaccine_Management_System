import styled from "styled-components";
import Swal from "sweetalert2";

const InputSideWrapper = styled.form`
  height: auto;
  padding-bottom: 100px;
  position: relative;
  padding: 10px 10px 100px 10px;
  width: 100%;
`;

const InputWrapper = styled.div`
  border: 2px solid transparent;
  width: 90%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  color: #333;
  width: 100%;
  font-size: 15px;
  padding: 8px;
  border-bottom: 1px solid rgb(100, 21, 173);
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  outline: 0px transparent !important;
`;

const MessageInput = styled.textarea`
  width: 100%;
  color: #333;
  font-size: 15px;
  padding: 10px;
  border-bottom: 1px solid rgb(100, 21, 173);
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  border-top: 1px solid transparent;
  outline: 0px transparent !important;
`;

const SubMitButton = styled.input`
  background-color: #5ee0df; /* Use the same color as Tailwind bg-blue-900 */
  color: #fff; /* Matches text-white */
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

const InputSide = () => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const name = event.target[0].value.trim();
    const email = event.target[1].value.trim();
    const phone = event.target[2].value.trim();
    const message = event.target[3].value.trim();

    if (!name || !email || !phone || !message) {
      Swal.fire({
        title: "Error!",
        text: "You have to provide all information to send a message",
        icon: "error",
      });
      return;
    }

    Swal.fire({
      title: "Your message has been sent!",
      text: "Thanks for being with us.",
      icon: "success",
    });

    // Optionally, reset the form after successful submission
    event.target.reset();
  };

  return (
    <InputSideWrapper onSubmit={handleSubmit}>
      <InputWrapper>
        <p>Name</p>
        <Input type="text" placeholder="Enter your name..." required />
      </InputWrapper>
      <InputWrapper>
        <p>Email</p>
        <Input type="email" placeholder="Enter a valid email" required />
      </InputWrapper>
      <InputWrapper>
        <p>Phone</p>
        <Input type="number" placeholder="Enter your contact no." required />
      </InputWrapper>
      <InputWrapper>
        <p>Message</p>
        <MessageInput placeholder="Write your message" required />
      </InputWrapper>
      <SubMitButton type="submit" value="Send Message" />
    </InputSideWrapper>
  );
};

export default InputSide;
